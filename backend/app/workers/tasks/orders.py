from app.workers.celery_app import celery_app


@celery_app.task(
    name="kalakriti.orders.process_order"
)
def process_order(
    order_id: str,
    user_id: str,
) -> dict:
    """
    Background order processing task.

    Reserved for post-order background work such as:
    - order confirmation notification
    - inventory synchronization
    - fulfillment processing
    - future email/SMS integration
    """
    return {
        "status": "processed",
        "order_id": order_id,
        "user_id": user_id,
    }


@celery_app.task(
    name="kalakriti.orders.send_order_notification"
)
def send_order_notification(
    order_id: str,
    user_id: str,
    status: str,
) -> dict:
    """
    Background task for order-status notifications.
    """
    return {
        "status": "queued",
        "order_id": order_id,
        "user_id": user_id,
        "order_status": status,
    }
