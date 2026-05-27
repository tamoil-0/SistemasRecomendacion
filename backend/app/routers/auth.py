from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.usuario import Usuario
from app.schemas.usuario import LoginRequest, RegisterResponse, Token, UsuarioCreate
from app.security import create_access_token, hash_password, verify_password


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: UsuarioCreate, db: AsyncSession = Depends(get_db)) -> RegisterResponse:
    existing = await db.scalar(select(Usuario).where(Usuario.email == payload.email))
    if existing:
        raise HTTPException(status_code=400, detail="El email ya esta registrado")
    user = Usuario(email=payload.email, nombre=payload.nombre, hashed_password=hash_password(payload.password))
    db.add(user)
    await db.commit()
    await db.refresh(user)
    token = create_access_token(user.email, extra_claims={"nombre": user.nombre, "is_admin": user.is_admin})
    return RegisterResponse(id=user.id, email=user.email, nombre=user.nombre, token=token)


@router.post("/login", response_model=Token)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)) -> Token:
    user = await db.scalar(select(Usuario).where(Usuario.email == payload.email))
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales invalidas")
    token = create_access_token(user.email, extra_claims={"nombre": user.nombre, "is_admin": user.is_admin})
    return Token(access_token=token)

