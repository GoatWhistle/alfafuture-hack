from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel
from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

env_files = (".env.app_config",)

BASE_DIR = Path(__file__).resolve().parent.parent

for file in env_files:
    load_dotenv(BASE_DIR / file)


class RunConfig(BaseModel):
    host: str
    port: int


class DbConfig(BaseModel):
    url: PostgresDsn
    sync_url: PostgresDsn
    echo: bool = False
    echo_pool: bool = False
    max_overflow: int = 10
    pool_size: int = 50

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_N_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }


class ApiV1Prefix(BaseModel):
    prefix: str = "/v1"


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    v1: ApiV1Prefix = ApiV1Prefix()


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=env_files,
        env_file_encoding="utf-8",
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",
    )
    run: RunConfig
    api: ApiPrefix = ApiPrefix()


settings = Settings()
