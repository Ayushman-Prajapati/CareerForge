from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.job_schema import JobCreate

from app.services.job_service import JobService


router = APIRouter(
    tags=["Jobs"]
)


@router.post("/create")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db)
):

    return JobService.create_job(
        db,
        job
    )


@router.get("/all")
def get_jobs(
    db: Session = Depends(get_db)
):

    return JobService.get_all_jobs(db)