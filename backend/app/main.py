from fastapi import FastAPI

from app.core.database import (
    Base,
    engine
)

# Models
from app.models.user import User
from app.models.job import Job

# Auth Routes
from app.api.v1.auth.routes import (
    router as auth_router
)

# Test Routes
from app.api.v1.test_routes import (
    router as test_router
)

# Job Routes
from app.api.v1.jobs.routes import (
    router as jobs_router
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CareerForge API",
    version="1.0.0"
)

# Authentication routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

# Protected test routes
app.include_router(
    test_router,
    tags=["Testing"]
)

# Jobs routes
app.include_router(
    jobs_router,
    tags=["Jobs"]
)


@app.get("/")
def root():

    return {
        "message": "CareerForge API running"
    }