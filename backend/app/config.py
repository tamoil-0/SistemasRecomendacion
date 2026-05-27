from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Sistema de Recomendacion de Salud Preventiva - Puno"
    api_prefix: str = "/api/v1"
    database_url: str = "postgresql+asyncpg://salud_user:salud_pass@db:5432/salud_puno"
    secret_key: str = "cambiar_esto_en_produccion"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    senamhi_api_url: str = "https://senamhi.gob.pe/api/"
    renipress_csv_url: str = "https://www.susalud.gob.pe/registro-nacional/"
    cors_origins: str = "http://localhost:3000,http://localhost:5173"
    cors_origin_regex: str = r"https://.*\.vercel\.app"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def async_database_url(self) -> str:
        if self.database_url.startswith("postgres://"):
            return self.database_url.replace("postgres://", "postgresql+asyncpg://", 1)
        if self.database_url.startswith("postgresql://"):
            return self.database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return self.database_url


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

