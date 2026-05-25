from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.usuario import Usuario
from app.security import require_admin
from app.services.clima_service import sync_senamhi
from app.services.renipress_service import sync_renipress
from app.ml.train import train_model


router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/sync-renipress")
async def sync_renipress_endpoint(
    db: AsyncSession = Depends(get_db), _: Usuario = Depends(require_admin)
) -> dict:
    return await sync_renipress(db)


@router.post("/sync-senamhi")
async def sync_senamhi_endpoint(
    db: AsyncSession = Depends(get_db), _: Usuario = Depends(require_admin)
) -> dict:
    return await sync_senamhi(db)


@router.post("/retrain")
async def retrain(_: Usuario = Depends(require_admin)) -> dict[str, str | int]:
    return train_model()

