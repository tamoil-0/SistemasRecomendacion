from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import AsyncSessionLocal, Base, engine
from app.ml.predict import load_model
from app.routers import admin, auth, clima, establecimientos, recomendaciones
from app.services.clima_service import sync_senamhi
from app.services.renipress_service import sync_renipress
from app.services.usuario_seed import seed_demo_users


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    load_model()
    async with AsyncSessionLocal() as db:
        await seed_demo_users(db)
        await sync_renipress(db)
        await sync_senamhi(db)
    scheduler = AsyncIOScheduler()

    async def refresh_climate() -> None:
        async with AsyncSessionLocal() as db:
            await sync_senamhi(db)

    scheduler.add_job(refresh_climate, "interval", hours=6, id="sync_senamhi")
    scheduler.start()
    yield
    scheduler.shutdown(wait=False)


app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_origin_regex=settings.cors_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_prefix)
app.include_router(establecimientos.router, prefix=settings.api_prefix)
app.include_router(recomendaciones.router, prefix=settings.api_prefix)
app.include_router(clima.router, prefix=settings.api_prefix)
app.include_router(admin.router, prefix=settings.api_prefix)


@app.get("/")
async def root() -> dict[str, str]:
    return {"status": "ok", "docs": "/docs"}

