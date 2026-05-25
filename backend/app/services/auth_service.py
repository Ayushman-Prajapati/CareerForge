import random

from app.models.otp import OTP

from sqlalchemy.orm import Session

from app.models.user import User

from app.auth.password_handler import (
    hash_password,
    verify_password
)

from app.auth.jwt_handler import (
    create_access_token
)


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        user_data
    ):

        existing_user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if existing_user:

            return {
                "error": "Email already registered"
            }

        hashed_pw = hash_password(
            user_data.password
        )

        new_user = User(
            username=user_data.username,
            email=user_data.email,
            password=hashed_pw
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User registered successfully",
            "user_id": new_user.id
        }

    @staticmethod
    def login_user(
        db: Session,
        email: str,
        password: str
    ):

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:

            return {
                "error": "Invalid email"
            }

        valid_password = verify_password(
            password,
            user.password
        )

        if not valid_password:

            return {
                "error": "Invalid password"
            }

        otp_code = str(
            random.randint(100000, 999999)
        )

        otp_entry = OTP(
            email=user.email,
            otp=otp_code
        )

        db.add(otp_entry)
        db.commit()

        return {
            "message": "OTP sent",
            "email": user.email,
            "otp": otp_code
        }