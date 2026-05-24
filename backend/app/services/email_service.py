from fastapi_mail import (
    FastMail,
    MessageSchema,
    ConnectionConfig
)

from app.core.config import settings


conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True
)


async def send_welcome_email(
    email: str,
    username: str
):

    message = MessageSchema(
        subject="Welcome to CareerForge 🚀",
        recipients=[email],
        body=f"""
Hello {username},

Welcome to CareerForge!

Your account has been created successfully.

Start exploring jobs and building your future today.

— Team CareerForge
        """,
        subtype="plain"
    )

    fm = FastMail(conf)

    await fm.send_message(message)


async def send_otp_email(
    email: str,
    otp: str
):

    message = MessageSchema(
        subject="CareerForge Login OTP 🔐",
        recipients=[email],
        body=f"""
Your CareerForge OTP is:

{otp}

This OTP expires in 5 minutes.

— Team CareerForge
        """,
        subtype="plain"
    )

    fm = FastMail(conf)

    await fm.send_message(message)