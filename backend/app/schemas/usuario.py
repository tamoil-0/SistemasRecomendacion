from pydantic import BaseModel, EmailStr, Field


class UsuarioCreate(BaseModel):
    email: EmailStr
    nombre: str = Field(min_length=2, max_length=150)
    password: str = Field(min_length=8, max_length=128)


class UsuarioRead(BaseModel):
    id: int
    email: EmailStr
    nombre: str
    is_admin: bool = False

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class RegisterResponse(BaseModel):
    id: int
    email: EmailStr
    nombre: str
    token: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

