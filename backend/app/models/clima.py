from datetime import date, datetime
from sqlalchemy import Date, DateTime, Float, Integer, String, UniqueConstraint, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class AlertaClimatica(Base):
    __tablename__ = "alertas_climaticas"
    __table_args__ = (
        UniqueConstraint("ubigeo", "fecha", name="uq_alerta_ubigeo_fecha"),
        CheckConstraint("nivel_alerta >= 0 AND nivel_alerta <= 3", name="ck_nivel_alerta_rango"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    ubigeo: Mapped[str] = mapped_column(String(6), nullable=False, index=True)
    fecha: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    temp_minima: Mapped[float | None] = mapped_column(Float)
    precipitacion_mm: Mapped[float | None] = mapped_column(Float)
    nivel_alerta: Mapped[int] = mapped_column(Integer, default=0)
    fuente: Mapped[str] = mapped_column(String(50), default="SENAMHI")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

