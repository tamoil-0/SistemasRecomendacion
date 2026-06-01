from __future__ import annotations

from pathlib import Path
import pandas as pd
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.establecimiento import Establecimiento, Servicio


SEED_PATH = Path(__file__).resolve().parents[2] / "data" / "renipress_puno_seed.csv"


async def sync_renipress(db: AsyncSession, csv_path: Path | None = None) -> dict[str, int | list[str]]:
    path = csv_path or SEED_PATH
    df = pd.read_csv(path, dtype={"codigo_renipress": str, "ubigeo": str})
    nuevos = 0
    actualizados = 0
    errores: list[str] = []
    for row in df.to_dict(orient="records"):
        try:
            codigo = str(row["codigo_renipress"]).strip()
            codigo_alt = codigo.lstrip("0") if codigo.isdigit() else codigo
            existing = await db.scalar(
                select(Establecimiento).where(
                    or_(Establecimiento.codigo_renipress == codigo, Establecimiento.codigo_renipress == codigo_alt)
                )
            )
            servicios = [s.strip().lower() for s in str(row["servicios"]).split("|") if s.strip()]
            if existing:
                est = existing
                actualizados += 1
            else:
                est = Establecimiento(codigo_renipress=codigo)
                db.add(est)
                nuevos += 1
            est.codigo_renipress = codigo
            est.nombre = row["nombre"]
            est.categoria = row["categoria"]
            est.ubigeo = str(row["ubigeo"]).zfill(6)
            est.distrito = row.get("distrito")
            est.provincia = row.get("provincia")
            est.latitud = float(row["latitud"])
            est.longitud = float(row["longitud"])
            est.horario = row.get("horario", "No especificado")
            est.estado_operativo = bool(row.get("estado_operativo", True))
            est.capacidad_camas = int(row.get("capacidad_camas", 0))
            await db.flush()
            for servicio in servicios:
                found = await db.scalar(
                    select(Servicio).where(
                        Servicio.establecimiento_id == est.id,
                        Servicio.tipo_servicio == servicio,
                    )
                )
                if not found:
                    db.add(Servicio(establecimiento_id=est.id, tipo_servicio=servicio, disponible=True))
        except Exception as exc:  # pragma: no cover - surfaced in response
            errores.append(f"{row.get('codigo_renipress')}: {exc}")
    await db.commit()
    return {"registros_actualizados": actualizados, "registros_nuevos": nuevos, "errores": errores}

