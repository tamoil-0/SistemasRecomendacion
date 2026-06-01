from __future__ import annotations

from dataclasses import dataclass
from datetime import date
import numpy as np
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sklearn.metrics.pairwise import cosine_similarity
from app.models.clima import AlertaClimatica
from app.models.establecimiento import Establecimiento
from app.schemas.recomendacion import ConsultaCreate, RecomendacionItem
from app.utils.haversine import haversine_km
from app.utils.penalidad import penalidad_climatica


CATEGORIAS = ["I-1", "I-2", "I-3", "I-4", "II-1", "II-2", "BOTICA", "FARMACIA", "CLINICA", "ODONTO", "CONSULT"]
SERVICIOS = [
    "vacunacion",
    "control prenatal",
    "control cred",
    "tamizaje",
    "odontologia",
    "psicologia",
    "nutricion",
    "planificacion familiar",
    "botica",
    "farmacia",
    "clinica general",
    "medicina general",
    "emergencia",
    "laboratorio",
    "pediatria",
    "ginecologia",
]

SERVICIO_ALIASES = {
    "vacuna": "vacunacion",
    "vacunas": "vacunacion",
    "vacunacion covid": "vacunacion",
    "boticas": "botica",
    "farmacias": "farmacia",
    "medicamentos": "farmacia",
    "clinica": "clinica general",
    "clinicas": "clinica general",
    "consulta general": "medicina general",
    "medicina": "medicina general",
    "odontologico": "odontologia",
    "odontologica": "odontologia",
    "odontologias": "odontologia",
    "dental": "odontologia",
}


@dataclass(frozen=True)
class Candidate:
    establecimiento: Establecimiento
    distancia_km: float
    nivel_alerta: int


def cosine_score(user_vector: np.ndarray, item_vector: np.ndarray) -> float:
    return float(cosine_similarity([user_vector], [item_vector])[0][0])


def _one_hot(value: str, catalog: list[str]) -> list[float]:
    normalized = normalize_service(value)
    return [1.0 if normalized == item.lower() else 0.0 for item in catalog]


def normalize_service(value: str) -> str:
    normalized = value.strip().lower()
    return SERVICIO_ALIASES.get(normalized, normalized)


def _available_services(est: Establecimiento) -> list[str]:
    return [normalize_service(s.tipo_servicio) for s in est.servicios if s.disponible]


def service_match_score(tipo_atencion: str, servicios: list[str]) -> float:
    requested = normalize_service(tipo_atencion)
    available = {normalize_service(servicio) for servicio in servicios}
    if requested in available:
        return 1.0
    if requested == "clinica general" and {"medicina general", "emergencia", "laboratorio"} & available:
        return 0.8
    if requested in {"botica", "farmacia"} and {"botica", "farmacia"} & available:
        return 0.85
    if requested == "odontologia" and "clinica general" in available:
        return 0.35
    return 0.0


def build_user_vector(consulta: ConsultaCreate) -> np.ndarray:
    service_part = _one_hot(consulta.tipo_atencion, SERVICIOS)
    category_part = [0.0] * len(CATEGORIAS)
    edad_norm = min(consulta.edad, 120) / 120
    distance_preference = consulta.max_distancia_km / 100
    return np.array(category_part + service_part + [0.0, edad_norm, distance_preference, 1.0], dtype=float)


def build_item_vector(est: Establecimiento, distancia_km: float, max_distancia: int, penalidad: float) -> np.ndarray:
    servicios = _available_services(est)
    service_part = [1.0 if servicio in servicios else 0.0 for servicio in SERVICIOS]
    category_part = _one_hot(est.categoria, CATEGORIAS)
    distancia_norm = min(distancia_km / max(max_distancia, 1), 1.0)
    capacidad_norm = min(est.capacidad_camas / 40, 1.0)
    return np.array(category_part + service_part + [distancia_norm, capacidad_norm, 1 - penalidad, 1.0], dtype=float)


def rank_candidates(consulta: ConsultaCreate, candidates: list[Candidate]) -> list[RecomendacionItem]:
    user_vector = build_user_vector(consulta)
    scored: list[RecomendacionItem] = []
    for candidate in candidates:
        penalty = penalidad_climatica(candidate.nivel_alerta)
        item_vector = build_item_vector(
            candidate.establecimiento, candidate.distancia_km, consulta.max_distancia_km, penalty
        )
        similarity = cosine_score(user_vector, item_vector)
        service_score = service_match_score(consulta.tipo_atencion, _available_services(candidate.establecimiento))
        proximity_score = max(0.0, 1.0 - (candidate.distancia_km / max(consulta.max_distancia_km, 1)))
        final = ((similarity * 0.5) + (proximity_score * 0.35) + (service_score * 0.15)) * (1 - penalty)
        est = candidate.establecimiento
        scored.append(
            RecomendacionItem(
                rank=0,
                establecimiento_id=est.id,
                nombre=est.nombre,
                categoria=est.categoria,
                distancia_km=round(candidate.distancia_km, 2),
                score_similitud=round(similarity, 4),
                penalidad_clima=penalty,
                score_final=round(final, 4),
                nivel_alerta=candidate.nivel_alerta,
                horario=est.horario,
                servicios=[s.tipo_servicio for s in est.servicios if s.disponible],
                lat=est.latitud,
                lon=est.longitud,
            )
        )
    scored.sort(key=lambda item: (item.score_final, -item.distancia_km), reverse=True)
    for index, item in enumerate(scored[: consulta.top_n], start=1):
        item.rank = index
    return scored[: consulta.top_n]


async def recomendar(consulta: ConsultaCreate, db: AsyncSession) -> list[RecomendacionItem]:
    establecimientos = (
        await db.scalars(
            select(Establecimiento)
            .options(selectinload(Establecimiento.servicios))
            .where(Establecimiento.estado_operativo.is_(True))
        )
    ).all()
    today = date.today()
    alertas = (
        await db.scalars(select(AlertaClimatica).where(AlertaClimatica.fecha == today))
    ).all()
    alerta_por_ubigeo = {alerta.ubigeo: alerta.nivel_alerta for alerta in alertas}
    candidates: list[Candidate] = []
    for est in establecimientos:
        distance = haversine_km(consulta.lat, consulta.lon, est.latitud, est.longitud)
        if distance <= consulta.max_distancia_km:
            candidates.append(Candidate(est, distance, alerta_por_ubigeo.get(est.ubigeo, 0)))
    return rank_candidates(consulta, candidates)

