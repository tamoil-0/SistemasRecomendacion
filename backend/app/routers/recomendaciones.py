from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models.establecimiento import Establecimiento
from app.models.recomendacion import Consulta, Recomendacion
from app.models.usuario import Usuario
from app.schemas.recomendacion import ConsultaCreate, HistorialItem, RecomendacionItem, RecomendacionResponse
from app.security import get_current_user
from app.services.recommender import recomendar as recomendar_service


router = APIRouter(tags=["recomendaciones"])


@router.post("/recomendar", response_model=RecomendacionResponse)
async def recomendar(
    payload: ConsultaCreate,
    db: AsyncSession = Depends(get_db),
    user: Usuario = Depends(get_current_user),
) -> RecomendacionResponse:
    resultados = await recomendar_service(payload, db)
    consulta = Consulta(
        usuario_id=user.id,
        lat_usuario=payload.lat,
        lon_usuario=payload.lon,
        tipo_atencion=payload.tipo_atencion,
        edad=payload.edad,
        max_distancia=payload.max_distancia_km,
        top_n=payload.top_n,
    )
    db.add(consulta)
    await db.flush()
    for item in resultados:
        db.add(
            Recomendacion(
                consulta_id=consulta.id,
                establecimiento_id=item.establecimiento_id,
                score_similitud=item.score_similitud,
                penalidad_clima=item.penalidad_clima,
                score_final=item.score_final,
                distancia_km=item.distancia_km,
                rank_posicion=item.rank,
            )
        )
    await db.commit()
    return RecomendacionResponse(consulta_id=consulta.id, recomendaciones=resultados)


@router.get("/historial", response_model=list[HistorialItem])
async def historial(
    db: AsyncSession = Depends(get_db), user: Usuario = Depends(get_current_user)
) -> list[HistorialItem]:
    consultas = (
        await db.scalars(
            select(Consulta)
            .options(
                selectinload(Consulta.recomendaciones)
                .selectinload(Recomendacion.establecimiento)
                .selectinload(Establecimiento.servicios)
            )
            .where(Consulta.usuario_id == user.id)
            .order_by(Consulta.created_at.desc())
        )
    ).all()
    items: list[HistorialItem] = []
    for consulta in consultas:
        recs: list[RecomendacionItem] = []
        for rec in sorted(consulta.recomendaciones, key=lambda r: r.rank_posicion):
            est = rec.establecimiento
            recs.append(
                RecomendacionItem(
                    rank=rec.rank_posicion,
                    establecimiento_id=est.id,
                    nombre=est.nombre,
                    categoria=est.categoria,
                    distancia_km=rec.distancia_km,
                    score_similitud=rec.score_similitud,
                    penalidad_clima=rec.penalidad_clima,
                    score_final=rec.score_final,
                    nivel_alerta=int(round(rec.penalidad_clima / 0.3)) if rec.penalidad_clima else 0,
                    horario=est.horario,
                    servicios=[s.tipo_servicio for s in est.servicios if s.disponible],
                    lat=est.latitud,
                    lon=est.longitud,
                )
            )
        items.append(
            HistorialItem(
                consulta_id=consulta.id,
                created_at=consulta.created_at,
                tipo_atencion=consulta.tipo_atencion,
                edad=consulta.edad,
                max_distancia_km=consulta.max_distancia,
                recomendaciones=recs,
            )
        )
    return items
