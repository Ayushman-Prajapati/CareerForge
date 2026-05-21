from sqlalchemy.orm import Session

from app.models.user import User

from app.auth.password_handler import (
    hash_password,
    verify_password
)


class AuthService:

    @staticmethod
    def register_user(db: Session, user_data):

        existing_user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if existing_user:
            return {
                "error": "Email already registered"
            }

        hashed_pw = hash_password(user_data.password)

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
    def login_user(db: Session, user_data):

        user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if not user:
            return {
                "error": "Invalid email"
            }

        valid_password = verify_password(
            user_data.password,
            user.password
        )

        if not valid_password:
            return {
                "error": "Invalid password"
            }

        return {
            "message": "Login successful",
            "user_id": user.id
        }