from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from app.core.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    company = Column(
        String,
        nullable=False
    )

    location = Column(
        String,
        nullable=False
    )

    salary = Column(
        String,
        nullable=True
    )

    description = Column(
        Text,
        nullable=False
    )

    # NEW FIELDS

    eligibility = Column(
        Text,
        nullable=True
    )

    skills_required = Column(
        Text,
        nullable=True
    )

    experience_level = Column(
        String,
        nullable=True
    )

    job_type = Column(
        String,
        nullable=True
    )

    recruiter_name = Column(
        String,
        nullable=True
    )

    company_website = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )