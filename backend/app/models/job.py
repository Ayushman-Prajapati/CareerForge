from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String, Text
from app.core.database import Base


class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, default='')
    description = Column(Text, nullable=False, default='')
    company_name = Column(String(255), nullable=False, default='')
    location = Column(String(255), nullable=False, default='')
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    job_type = Column(String(100), nullable=False, default='')
    experience_level = Column(String(100), nullable=False, default='')
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def company(self):
        return self.company_name

    def __repr__(self):
        return f"<Job id={self.id} title={self.title!r} company={self.company_name!r}>"
