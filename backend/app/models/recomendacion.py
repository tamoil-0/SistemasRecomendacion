from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Consulta(Base):
    __tablename__ = "consultas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), index=True)
    lat_usuario: Mapped[float] = mapped_column(Float, nullable=False)
    lon_usuario: Mapped[float] = mapped_column(Float, nullable=False)
    tipo_atencion: Mapped[str] = mapped_column(String(100), nullable=False)
    edad: Mapped[int] = mapped_column(Integer, nullable=False)
    max_distancia: Mapped[int] = mapped_column(Integer, default=30)
    top_n: Mapped[int] = mapped_column(Integer, default=5)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    usuario: Mapped["Usuario"] = relationship(back_populates="consultas")
    recomendaciones: Mapped[list["Recomendacion"]] = relationship(
        back_populates="consulta", cascade="all, delete-orphan", lazy="selectin"
    )


class Recomendacion(Base):
    __tablename__ = "recomendaciones"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    consulta_id: Mapped[int] = mapped_column(ForeignKey("consultas.id", ondelete="CASCADE"), index=True)
    establecimiento_id: Mapped[int] = mapped_column(ForeignKey("establecimientos.id"), index=True)
    score_similitud: Mapped[float] = mapped_column(Float, nullable=False)
    penalidad_clima: Mapped[float] = mapped_column(Float, default=0.0)
    score_final: Mapped[float] = mapped_column(Float, nullable=False)
    distancia_km: Mapped[float] = mapped_column(Float, nullable=False)
    rank_posicion: Mapped[int] = mapped_column(Integer, nullable=False)
    visitado: Mapped[bool] = mapped_column(Boolean, default=False)

    consulta: Mapped[Consulta] = relationship(back_populates="recomendaciones")
    establecimiento: Mapped["Establecimiento"] = relationship(lazy="selectin")

