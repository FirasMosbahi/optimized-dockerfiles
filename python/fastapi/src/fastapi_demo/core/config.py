from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "FastAPI Professional Project"
    debug: bool = True

    model_config = {
        "env_file": ".env"
    }

settings = Settings()
