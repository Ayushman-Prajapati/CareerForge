from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.job import Job
from app.schemas.job_schema import JobCreate, JobResponse
from app.core.database import get_db

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("/", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    """Create a new job listing"""
    new_job = Job(
        title=job.title,
        description=job.description,
        company_name=job.company,
        location=job.location,
        salary_min=job.salary_min,
        salary_max=job.salary_max,
        job_type=job.job_type,
        experience_level=job.experience_level,
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job


@router.get("/", response_model=list[JobResponse])
def get_jobs(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
    ):
    """Get all job listings"""
    jobs = db.query(Job).offset(skip).limit(limit).all()
    return jobs


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    """Get a job listing by ID"""
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
