from app.models.job import Job


class JobService:

    @staticmethod
    def create_job(db, job_data):

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
            "job": new_job
        }

    @staticmethod
    def get_all_jobs(db):

        jobs = db.query(Job).all()

        return jobs

    @staticmethod
    def get_job_by_id(
        db,
        job_id: int
    ):

        job = db.query(Job).filter(
            Job.id == job_id
        ).first()

        if not job:

            return {
                "error": "Job not found"
            }

        return job

    @staticmethod
    def update_job(
        db,
        job_id: int,
        job_data
    ):

        job = db.query(Job).filter(
            Job.id == job_id
        ).first()

        if not job:

            return {
                "error": "Job not found"
            }

        job.title = job_data.title
        job.company = job_data.company
        job.location = job_data.location
        job.salary = job_data.salary
        job.description = job_data.description

        db.commit()

        db.refresh(job)

        return {
            "message": "Job updated successfully",
            "job": job
        }

    @staticmethod
    def delete_job(
        db,
        job_id: int
    ):

        job = db.query(Job).filter(
            Job.id == job_id
        ).first()

        if not job:

            return {
                "error": "Job not found"
            }

        db.delete(job)

        db.commit()

        return {
            "message": "Job deleted successfully"
        }