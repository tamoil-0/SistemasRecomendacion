from datetime import datetime
from pydantic import BaseModel, Field


class ConsultaCreate(BaseModel):
    lat: float = Field(ge=-17.5, le=-13.0)
    lon: float = Field(ge=-71.5, le=-68.0)
    tipo_atencion: str = Field(min_length=3, max_length=100)
    edad: int = Field(ge=1, le=120)
    max_distancia_km: int = Field(default=30, ge=5, le=100)
    top_n: int = Field(default=5, ge=1, le=10)


class RecomendacionItem(BaseModel):
    rank: int
    establecimiento_id: int
    nombre: str
    categoria: str
    distancia_km: float
    score_similitud: float
    penalidad_clima: float
    score_final: float
    nivel_alerta: int
    horario: str | None
    servicios: list[str]
    lat: float
    lon: float


class RecomendacionResponse(BaseModel):
    consulta_id: int
    recomendaciones: list[RecomendacionItem]


class HistorialItem(BaseModel):
    consulta_id: int
    created_at: datetime
    tipo_atencion: str
    edad: int
    max_distancia_km: int
    recomendaciones: list[RecomendacionItem]

