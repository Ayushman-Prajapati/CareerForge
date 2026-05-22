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

        token = create_access_token({
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        })

        return {
            "message": "Login successful",
            "access_token": token,
            "token_type": "bearer"
        }