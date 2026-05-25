from pydantic import BaseModel

from typing import Optional


class JobCreate(BaseModel):

    title: str

    company: str

    location: str

    salary: Optional[str] = None

    description: str

    # NEW FIELDS

    eligibility: Optional[str] = None

    skills_required: Optional[str] = None

    experience_level: Optional[str] = None

    job_type: Optional[str] = None

    recruiter_name: Optional[str] = None

    company_website: Optional[str] = None


class JobResponse(BaseModel):

    id: int

    title: str

    company: str

    location: str

    salary: Optional[str]

    description: str

    eligibility: Optional[str]

    skills_required: Optional[str]

    experience_level: Optional[str]

    job_type: Optional[str]

    recruiter_name: Optional[str]

    company_website: Optional[str]

    class Config:

        from_attributes = True