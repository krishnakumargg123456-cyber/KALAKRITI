from celery import Celery

from app.config import settings


celery_app = Celery(
    "kalakriti",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=True,
    task_track_started=True,
    task_ignore_result=False,

    beat_schedule={
        "monitor-low-stock-every-5-minutes": {
            "task": "kalakriti.inventory.monitor_low_stock",
            "schedule": 300.0,
        },
    },
)

import app.workers.tasks
