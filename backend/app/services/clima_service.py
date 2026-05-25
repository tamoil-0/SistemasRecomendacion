from __future__ import annotations

from datetime import date
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.clima import AlertaClimatica


SENAMHI_SEED = [
    {"ubigeo": "210101", "temp_minima": 1.8, "precipitacion_mm": 2.0, "nivel_alerta": 1},
    {"ubigeo": "210201", "temp_minima": -3.5, "precipitacion_mm": 0.0, "nivel_alerta": 3},
    {"ubigeo": "210901", "temp_minima": 2.5, "precipitacion_mm": 8.0, "nivel_alerta": 2},
    {"ubigeo": "211101", "temp_minima": 4.0, "precipitacion_mm": 1.0, "nivel_alerta": 0},
    {"ubigeo": "210401", "temp_minima": -1.0, "precipitacion_mm": 3.0, "nivel_alerta": 2},
]


async def sync_senamhi(db: AsyncSession) -> dict[str, int | list[str]]:
    today = date.today()
    count = 0
    for row in SENAMHI_SEED:
        dialect = db.bind.dialect.name if db.bind is not None else ""
        if dialect == "postgresql":
            stmt = pg_insert(AlertaClimatica).values(fecha=today, fuente="SENAMHI", **row)
            stmt = stmt.on_conflict_do_update(
                index_elements=["ubigeo", "fecha"],
                set_={
                    "temp_minima": row["temp_minima"],
                    "precipitacion_mm": row["precipitacion_mm"],
                    "nivel_alerta": row["nivel_alerta"],
                },
            )
            await db.execute(stmt)
        else:
            existing = await db.scalar(
                select(AlertaClimatica).where(
                    AlertaClimatica.ubigeo == row["ubigeo"], AlertaClimatica.fecha == today
                )
            )
            if existing:
                existing.temp_minima = row["temp_minima"]
                existing.precipitacion_mm = row["precipitacion_mm"]
                existing.nivel_alerta = row["nivel_alerta"]
            else:
                db.add(AlertaClimatica(fecha=today, fuente="SENAMHI", **row))
        count += 1
    await db.commit()
    return {"registros_actualizados": count, "registros_nuevos": 0, "errores": []}

