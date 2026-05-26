from app.models.job import Job


class JobService:

    @staticmethod
    def create_job(
        db,
        job_data
    ):

        new_job = Job(

            title=job_data.title,

            company=job_data.company,

            location=job_data.location,

            salary=job_data.salary,

            description=job_data.description,

            # NEW FIELDS
            eligibility=job_data.eligibility,

            skills_required=job_data.skills_required,

            experience_level=job_data.experience_level,

            job_type=job_data.job_type,

            recruiter_name=job_data.recruiter_name,

            company_website=job_data.company_website
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

        # BASIC FIELDS
        job.title = job_data.title

        job.company = job_data.company

        job.location = job_data.location

        job.salary = job_data.salary

        job.description = job_data.description

        # NEW FIELDS
        job.eligibility = job_data.eligibility

        job.skills_required = (
            job_data.skills_required
        )

        job.experience_level = (
            job_data.experience_level
        )

        job.job_type = (
            job_data.job_type
        )

        job.recruiter_name = (
            job_data.recruiter_name
        )

        job.company_website = (
            job_data.company_website
        )

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