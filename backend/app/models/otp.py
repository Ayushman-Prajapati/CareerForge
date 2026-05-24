from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class OTP(Base):

    __tablename__ = "otp_codes"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, nullable=False)

    otp = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )