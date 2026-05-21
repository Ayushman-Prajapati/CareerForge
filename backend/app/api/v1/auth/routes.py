from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth_schema import (
    RegisterUser,
    LoginUser
)

from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: RegisterUser,
    db: Session = Depends(get_db)
):

    response = AuthService.register_user(
        db=db,
        user_data=user
    )

    return response


@router.post("/login")
def login(
    user: LoginUser,
    db: Session = Depends(get_db)
):

    response = AuthService.login_user(
        db=db,
        user_data=user
    )

    return response