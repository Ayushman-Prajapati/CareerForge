from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.job_schema import JobCreate

from app.services.job_service import JobService


router = APIRouter(
    prefix="/jobs",
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


@router.get("/{job_id}")
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    return JobService.get_job_by_id(
        db,
        job_id
    )


@router.put("/{job_id}")
def update_job(
    job_id: int,
    job: JobCreate,
    db: Session = Depends(get_db)
):

    return JobService.update_job(
        db,
        job_id,
        job
    )


@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    return JobService.delete_job(
        db,
        job_id
    )