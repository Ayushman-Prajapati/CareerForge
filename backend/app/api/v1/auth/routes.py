from fastapi import (
    APIRouter,
    Depends
)

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from sqlalchemy.orm import Session

from app.core.database import (
    get_db
)

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

from app.models.otp import OTP

from app.models.user import User

from app.auth.jwt_handler import (
    create_access_token
)

import random


router = APIRouter(
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


# LOGIN + SEND OTP
@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # REMOVE await here
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

    existing_otp = db.query(OTP).filter(
        OTP.email == form_data.username
    ).first()

    if existing_otp:

        existing_otp.otp = otp

    else:

        otp_record = OTP(
            email=form_data.username,
            otp=otp
        )

        db.add(otp_record)

    db.commit()

    await send_otp_email(
        form_data.username,
        otp
    )

    return {
        "message": "OTP sent successfully"
    }


# VERIFY OTP
@router.post("/verify-otp")
def verify_otp(
    email: str,
    otp: str,
    db: Session = Depends(get_db)
):

    otp_record = db.query(OTP).filter(
        OTP.email == email,
        OTP.otp == otp
    ).first()

    if not otp_record:

        return {
            "error": "Invalid OTP"
        }

    user = db.query(User).filter(
        User.email == email
    ).first()

    token = create_access_token({

        "user_id": user.id,

        "email": user.email,

        "role": user.role
    })

    db.delete(otp_record)

    db.commit()

    return {

        "message": "OTP verified successfully",

        "access_token": token,

        "token_type": "bearer"
    }