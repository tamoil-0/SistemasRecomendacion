from datetime import date
from pydantic import BaseModel, Field


class AlertaClimaticaRead(BaseModel):
    ubigeo: str
    fecha: date
    temp_minima: float | None = None
    precipitacion_mm: float | None = None
    nivel_alerta: int = Field(ge=0, le=3)
    fuente: str

    model_config = {"from_attributes": True}

