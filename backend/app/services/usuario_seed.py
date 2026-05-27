from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.usuario import Usuario
from app.security import hash_password


DEMO_USERS = [
    {
        "email": "demo@puno.pe",
        "nombre": "Usuario Demo",
        "password": "password123",
        "is_admin": False,
    },
    {
        "email": "admin@puno.pe",
        "nombre": "Administrador Puno",
        "password": "admin12345",
        "is_admin": True,
    },
]


async def seed_demo_users(db: AsyncSession) -> None:
    for item in DEMO_USERS:
        existing = await db.scalar(select(Usuario).where(Usuario.email == item["email"]))
        if existing:
            continue
        db.add(
            Usuario(
                email=item["email"],
                nombre=item["nombre"],
                hashed_password=hash_password(item["password"]),
                is_admin=item["is_admin"],
            )
        )
    await db.commit()
