import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration."""
    APP_NAME = os.getenv("APP_NAME", "Flask Demo")
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
