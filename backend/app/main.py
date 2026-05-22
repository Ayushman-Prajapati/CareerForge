from fastapi import FastAPI

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


@app.get("/")
def root():

    return {
        "message": "CareerForge API running"
    }