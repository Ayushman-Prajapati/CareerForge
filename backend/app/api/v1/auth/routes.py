from fastapi import (
    APIRouter,
    Depends
)

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from sqlalchemy.orm import Session

from app.schemas.auth_schema import (
    RegisterUser
)

from app.services.auth_service import (
    AuthService
)

from app.services.email_service import (
    send_welcome_email,
    send_otp_email
)

from app.core.database import (
    get_db
)

import random


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# REGISTER
@router.post("/register")
async def register(
    user: RegisterUser,
    db: Session = Depends(get_db)
):

    response = AuthService.register_user(
        db,
        user
    )

    if "error" not in response:

        await send_welcome_email(
            user.email,
            user.username
        )

    return response


# LOGIN SEND OTP
@router.post("/login")
async def login(
    form_data:
    OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    response = AuthService.login_user(
        db,
        form_data.username,
        form_data.password
    )

    if "error" in response:

        return response

    otp = str(
        random.randint(100000, 999999)
    )

    await send_otp_email(
        form_data.username,
        otp
    )

    return {
        "message":
        "OTP sent successfully",
        "otp": otp
    }