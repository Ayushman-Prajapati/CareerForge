from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.application import Application

router = APIRouter(
    tags=["Applications"]
)


@router.post("/apply/{job_id}")
def apply_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    application = Application(
        user_id=1,
        job_id=job_id
    )

    db.add(application)

    db.commit()

    db.refresh(application)

    return {
        "message": "Applied successfully"
    }


@router.get("/my-applications")
def my_applications(
    db: Session = Depends(get_db)
):

    applications = db.query(
        Application
    ).all()

    return applications