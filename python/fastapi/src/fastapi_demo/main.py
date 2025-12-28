from fastapi import FastAPI
from fastapi_demo.api.routes import router
from fastapi_demo.core.config import settings

app = FastAPI(title=settings.app_name, debug=settings.debug)

app.include_router(router)
