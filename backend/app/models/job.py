from sqlalchemy import Column, Integer, String, Text

from app.core.database import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    company = Column(String, nullable=False)

    location = Column(String, nullable=False)

    salary = Column(String, nullable=True)

    description = Column(Text, nullable=False)