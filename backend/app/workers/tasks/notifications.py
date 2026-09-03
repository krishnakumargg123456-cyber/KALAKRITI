from app.workers.celery_app import celery_app


@celery_app.task(
    name="kalakriti.notifications.send_notification"
)
def send_notification(
    user_id: str,
    title: str,
    message: str,
    notification_type: str = "general",
) -> dict:
    """
    Background notification task.

    Database notification creation can be connected here to the
    existing NotificationService/repository without changing the API layer.
    """
    return {
        "status": "queued",
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": notification_type,
    }
