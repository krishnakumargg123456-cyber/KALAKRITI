from sqlalchemy import select

from app.core.database.session import AsyncSessionLocal
from app.models.artisan import Artisan
from app.models.inventory import Inventory
from app.models.product import Product
from app.models.notification import Notification
from app.workers.celery_app import celery_app


@celery_app.task(
    name="kalakriti.inventory.check_stock"
)
def check_stock(
    product_id: str,
    current_stock: int,
    low_stock_threshold: int = 5,
) -> dict:
    """
    Background stock monitoring task.
    """

    is_low_stock = current_stock <= low_stock_threshold

    return {
        "product_id": product_id,
        "current_stock": current_stock,
        "low_stock_threshold": low_stock_threshold,
        "is_low_stock": is_low_stock,
        "status": "low_stock" if is_low_stock else "stock_available",
    }


@celery_app.task(
    name="kalakriti.inventory.sync_stock"
)
def sync_stock(
    product_id: str,
    quantity: int,
) -> dict:
    """
    Background inventory synchronization task.
    """

    return {
        "status": "synced",
        "product_id": product_id,
        "quantity": quantity,
    }


@celery_app.task(
    name="kalakriti.inventory.monitor_low_stock"
)
def monitor_low_stock() -> dict:
    """
    Periodically scans inventory and creates low-stock
    notifications for the owning artisan.

    This task is intended to be triggered by Celery Beat.
    """

    import asyncio

    return asyncio.run(_monitor_low_stock())


async def _monitor_low_stock() -> dict:
    checked = 0
    low_stock = 0
    notifications_created = 0

    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(
                Inventory,
                Product,
                Artisan,
            )
            .join(
                Product,
                Product.id == Inventory.product_id,
            )
            .join(
                Artisan,
                Artisan.id == Product.artisan_id,
            )
            .where(
                Product.is_active.is_(True),
                Artisan.is_active.is_(True),
            )
        )

        rows = result.all()

        for inventory, product, artisan in rows:
            checked += 1

            available_quantity = max(
                0,
                inventory.quantity - inventory.reserved_quantity,
            )

            if available_quantity > inventory.low_stock_threshold:
                continue

            low_stock += 1

            existing = await db.execute(
                select(Notification.id)
                .where(
                    Notification.user_id == artisan.user_id,
                    Notification.type == "low_stock",
                    Notification.message == (
                        f"Low stock alert: {product.name} "
                        f"has only {available_quantity} items available."
                    ),
                    Notification.is_read.is_(False),
                )
                .limit(1)
            )

            if existing.scalar_one_or_none() is not None:
                continue

            notification = Notification(
                user_id=artisan.user_id,
                title="Low Stock Alert",
                message=(
                    f"Low stock alert: {product.name} "
                    f"has only {available_quantity} items available."
                ),
                type="low_stock",
            )

            db.add(notification)
            notifications_created += 1

        await db.commit()

    return {
        "status": "completed",
        "checked": checked,
        "low_stock": low_stock,
        "notifications_created": notifications_created,
    }