from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.core.database import (
    Base,
    engine
)

from app.api.v1.auth.routes import (
    router as auth_router
)

from app.api.v1.test_routes import (
    router as test_router
)

from app.api.v1.jobs.routes import (
    router as jobs_router
)


# Create database tables
Base.metadata.create_all(bind=engine)


# FastAPI App
app = FastAPI(
    title="CareerForge API",
    version="1.0.0"
)


# CORS Middleware
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Authentication Routes
app.include_router(
    auth_router,

    prefix="/auth",

    tags=["Authentication"]
)


# Protected Test Routes
app.include_router(
    test_router,

    tags=["Testing"]
)


# Job Routes
app.include_router(
    jobs_router,

    tags=["Jobs"]
)


# Root Route
@app.get("/")
def root():

    return {
        "message": "CareerForge API running"
    }