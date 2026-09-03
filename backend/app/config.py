import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "KALAKRITI")
    APP_ENV: str = os.getenv("APP_ENV", "development")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:password@localhost:5432/kalakriti",
    )

    SECRET_KEY: str = os.getenv(
        "SECRET_KEY",
        "change-this-in-production",
    )

    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    CORS_ORIGINS: str = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000",
    )

    FRONTEND_URL: str = os.getenv(
        "FRONTEND_URL",
        "http://localhost:3000",
    )

    RAZORPAY_KEY_ID: str = os.getenv(
        "RAZORPAY_KEY_ID",
        "",
    )

    RAZORPAY_KEY_SECRET: str = os.getenv(
        "RAZORPAY_KEY_SECRET",
        "",
    )

    RAZORPAY_WEBHOOK_SECRET: str = os.getenv(
        "RAZORPAY_WEBHOOK_SECRET",
        "",
    )

    REDIS_URL: str = os.getenv(
        "REDIS_URL",
        "redis://localhost:6379/0",
    )

    CELERY_BROKER_URL: str = os.getenv(
        "CELERY_BROKER_URL",
        REDIS_URL,
    )

    CELERY_RESULT_BACKEND: str = os.getenv(
        "CELERY_RESULT_BACKEND",
        REDIS_URL,
    )


settings = Settings()
