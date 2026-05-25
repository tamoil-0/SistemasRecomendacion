from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.database import get_db
from app.models.clima import AlertaClimatica
from app.models.establecimiento import Establecimiento
from app.schemas.establecimiento import EstablecimientoDetalle, EstablecimientoRead


router = APIRouter(prefix="/establecimientos", tags=["establecimientos"])


@router.get("", response_model=list[EstablecimientoRead])
async def list_establecimientos(
    provincia: str | None = None,
    categoria: str | None = None,
    estado_operativo: bool | None = None,
    db: AsyncSession = Depends(get_db),
) -> list[Establecimiento]:
    stmt = select(Establecimiento).options(selectinload(Establecimiento.servicios))
    if provincia:
        stmt = stmt.where(Establecimiento.provincia.ilike(f"%{provincia}%"))
    if categoria:
        stmt = stmt.where(Establecimiento.categoria == categoria)
    if estado_operativo is not None:
        stmt = stmt.where(Establecimiento.estado_operativo.is_(estado_operativo))
    return list((await db.scalars(stmt.order_by(Establecimiento.nombre))).all())


@router.get("/{establecimiento_id}", response_model=EstablecimientoDetalle)
async def get_establecimiento(establecimiento_id: int, db: AsyncSession = Depends(get_db)) -> EstablecimientoDetalle:
    est = await db.scalar(
        select(Establecimiento)
        .options(selectinload(Establecimiento.servicios))
        .where(Establecimiento.id == establecimiento_id)
    )
    if not est:
        raise HTTPException(status_code=404, detail="Establecimiento no encontrado")
    alerta = await db.scalar(
        select(AlertaClimatica)
        .where(AlertaClimatica.ubigeo == est.ubigeo, AlertaClimatica.fecha == date.today())
        .order_by(AlertaClimatica.id.desc())
    )
    data = EstablecimientoRead.model_validate(est).model_dump()
    return EstablecimientoDetalle(**data, alerta_actual=alerta)

