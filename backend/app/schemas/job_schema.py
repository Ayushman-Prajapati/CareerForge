from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class JobBase(BaseModel):
    title: str
    description: str
    company: str
    location: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    job_type: str
    experience_level: str


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None


class JobResponse(JobBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
