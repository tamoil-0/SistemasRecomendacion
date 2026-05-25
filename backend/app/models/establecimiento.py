from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Establecimiento(Base):
    __tablename__ = "establecimientos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    codigo_renipress: Mapped[str] = mapped_column(String(20), unique=True, nullable=False, index=True)
    nombre: Mapped[str] = mapped_column(String(255), nullable=False)
    categoria: Mapped[str] = mapped_column(String(10), nullable=False, index=True)
    ubigeo: Mapped[str] = mapped_column(String(6), nullable=False, index=True)
    distrito: Mapped[str | None] = mapped_column(String(100))
    provincia: Mapped[str | None] = mapped_column(String(100), index=True)
    latitud: Mapped[float] = mapped_column(Float, nullable=False)
    longitud: Mapped[float] = mapped_column(Float, nullable=False)
    horario: Mapped[str | None] = mapped_column(String(50))
    estado_operativo: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    capacidad_camas: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    servicios: Mapped[list["Servicio"]] = relationship(
        back_populates="establecimiento", cascade="all, delete-orphan", lazy="selectin"
    )


class Servicio(Base):
    __tablename__ = "servicios"
    __table_args__ = (UniqueConstraint("establecimiento_id", "tipo_servicio", name="uq_servicio_establecimiento"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    establecimiento_id: Mapped[int] = mapped_column(ForeignKey("establecimientos.id", ondelete="CASCADE"), index=True)
    tipo_servicio: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    disponible: Mapped[bool] = mapped_column(Boolean, default=True)

    establecimiento: Mapped[Establecimiento] = relationship(back_populates="servicios")

