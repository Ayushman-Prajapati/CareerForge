from sqlalchemy import Column, Integer, String, Text, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Job(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False, default='')
    description = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    salary = Column(Float, nullable=True, default=0.0)
    company_name = Column(String(255), nullable=False, default='')

    def __repr__(self):
        return f"<Job id={self.id} title={self.title!r} company={self.company_name!r}>"
