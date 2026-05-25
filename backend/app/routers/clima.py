from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.clima import AlertaClimatica
from app.schemas.clima import AlertaClimaticaRead


router = APIRouter(prefix="/clima", tags=["clima"])


@router.get("/{ubigeo}", response_model=AlertaClimaticaRead)
async def get_clima(ubigeo: str, db: AsyncSession = Depends(get_db)) -> AlertaClimatica:
    alerta = await db.scalar(
        select(AlertaClimatica)
        .where(AlertaClimatica.ubigeo == ubigeo, AlertaClimatica.fecha == date.today())
        .order_by(AlertaClimatica.id.desc())
    )
    if not alerta:
        raise HTTPException(status_code=404, detail="No hay alerta climatica para el UBIGEO solicitado")
    return alerta

