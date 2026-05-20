from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME = "CareerForge"

    SECRET_KEY = os.getenv("SECRET_KEY")

    ALGORITHM = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    DATABASE_URL = os.getenv("DATABASE_URL")

    REDIS_URL = os.getenv("REDIS_URL")

settings = Settings()