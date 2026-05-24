from sqlalchemy.orm import Session

from app.models.job import Job


class JobService:

    @staticmethod
    def create_job(
        db: Session,
        job_data
    ):

        new_job = Job(
            title=job_data.title,
            company=job_data.company,
            location=job_data.location,
            salary=job_data.salary,
            description=job_data.description
        )

        db.add(new_job)

        db.commit()

        db.refresh(new_job)

        return {
            "message": "Job created successfully",
            "job_id": new_job.id
        }

    @staticmethod
    def get_all_jobs(
        db: Session
    ):

        jobs = db.query(Job).all()

        return jobs