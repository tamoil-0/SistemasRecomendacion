from datetime import date
from pydantic import BaseModel


class ServicioRead(BaseModel):
    id: int
    tipo_servicio: str
    disponible: bool

    model_config = {"from_attributes": True}


class AlertaRead(BaseModel):
    ubigeo: str
    fecha: date
    temp_minima: float | None = None
    precipitacion_mm: float | None = None
    nivel_alerta: int
    fuente: str

    model_config = {"from_attributes": True}


class EstablecimientoRead(BaseModel):
    id: int
    codigo_renipress: str
    nombre: str
    categoria: str
    ubigeo: str
    distrito: str | None
    provincia: str | None
    latitud: float
    longitud: float
    horario: str | None
    estado_operativo: bool
    capacidad_camas: int
    servicios: list[ServicioRead] = []

    model_config = {"from_attributes": True}


class EstablecimientoDetalle(EstablecimientoRead):
    alerta_actual: AlertaRead | None = None

