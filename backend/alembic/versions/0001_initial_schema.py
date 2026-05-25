"""initial schema

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-05-18
"""
from alembic import op
import sqlalchemy as sa


revision = "0001_initial_schema"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "establecimientos",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("codigo_renipress", sa.String(20), nullable=False, unique=True),
        sa.Column("nombre", sa.String(255), nullable=False),
        sa.Column("categoria", sa.String(10), nullable=False),
        sa.Column("ubigeo", sa.String(6), nullable=False),
        sa.Column("distrito", sa.String(100)),
        sa.Column("provincia", sa.String(100)),
        sa.Column("latitud", sa.Float(), nullable=False),
        sa.Column("longitud", sa.Float(), nullable=False),
        sa.Column("horario", sa.String(50)),
        sa.Column("estado_operativo", sa.Boolean(), server_default=sa.text("true")),
        sa.Column("capacidad_camas", sa.Integer(), server_default="0"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_index("ix_establecimientos_ubigeo", "establecimientos", ["ubigeo"])
    op.create_table(
        "servicios",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("establecimiento_id", sa.Integer(), sa.ForeignKey("establecimientos.id", ondelete="CASCADE")),
        sa.Column("tipo_servicio", sa.String(100), nullable=False),
        sa.Column("disponible", sa.Boolean(), server_default=sa.text("true")),
        sa.UniqueConstraint("establecimiento_id", "tipo_servicio", name="uq_servicio_establecimiento"),
    )
    op.create_table(
        "alertas_climaticas",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("ubigeo", sa.String(6), nullable=False),
        sa.Column("fecha", sa.Date(), nullable=False),
        sa.Column("temp_minima", sa.Float()),
        sa.Column("precipitacion_mm", sa.Float()),
        sa.Column("nivel_alerta", sa.Integer(), server_default="0"),
        sa.Column("fuente", sa.String(50), server_default="SENAMHI"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
        sa.CheckConstraint("nivel_alerta >= 0 AND nivel_alerta <= 3", name="ck_nivel_alerta_rango"),
        sa.UniqueConstraint("ubigeo", "fecha", name="uq_alerta_ubigeo_fecha"),
    )
    op.create_table(
        "usuarios",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("nombre", sa.String(150), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("is_admin", sa.Boolean(), server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_table(
        "consultas",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("usuario_id", sa.Integer(), sa.ForeignKey("usuarios.id")),
        sa.Column("lat_usuario", sa.Float(), nullable=False),
        sa.Column("lon_usuario", sa.Float(), nullable=False),
        sa.Column("tipo_atencion", sa.String(100), nullable=False),
        sa.Column("edad", sa.Integer(), nullable=False),
        sa.Column("max_distancia", sa.Integer(), server_default="30"),
        sa.Column("top_n", sa.Integer(), server_default="5"),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now()),
    )
    op.create_table(
        "recomendaciones",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("consulta_id", sa.Integer(), sa.ForeignKey("consultas.id", ondelete="CASCADE")),
        sa.Column("establecimiento_id", sa.Integer(), sa.ForeignKey("establecimientos.id")),
        sa.Column("score_similitud", sa.Float(), nullable=False),
        sa.Column("penalidad_clima", sa.Float(), server_default="0"),
        sa.Column("score_final", sa.Float(), nullable=False),
        sa.Column("distancia_km", sa.Float(), nullable=False),
        sa.Column("rank_posicion", sa.Integer(), nullable=False),
        sa.Column("visitado", sa.Boolean(), server_default=sa.text("false")),
    )


def downgrade() -> None:
    op.drop_table("recomendaciones")
    op.drop_table("consultas")
    op.drop_table("usuarios")
    op.drop_table("alertas_climaticas")
    op.drop_table("servicios")
    op.drop_table("establecimientos")

