"""Configuration utilities for Streamlit app."""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration."""
    APP_NAME = os.getenv("APP_NAME", "Streamlit Demo")
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    PORT = int(os.getenv("PORT", "8501"))
    HOST = os.getenv("HOST", "0.0.0.0")
