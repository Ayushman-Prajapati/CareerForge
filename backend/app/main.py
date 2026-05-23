from fastapi import FastAPI

from app.core.database import Base, engine

from app.models.user import User
from app.models.job import Job

from app.api.v1.auth.routes import (
    router as auth_router
)
from app.api.v1.jobs.routes import router as jobs_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CareerForge API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(jobs_router)


@app.get("/")
def root():
    return {
        "message": "CareerForge API running"
    }