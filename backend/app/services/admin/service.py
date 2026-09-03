from __future__ import annotations

from decimal import Decimal

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import OrderStatus
from app.repositories.admin.repository import (
    admin_dashboard_repository,
)


class AdminDashboardService:

    async def get_dashboard(
        self,
        db: AsyncSession,
    ) -> dict:

        total_users = await admin_dashboard_repository.count_users(
            db
        )

        active_users = await admin_dashboard_repository.count_users(
            db,
            active_only=True,
        )

        total_customers = (
            await admin_dashboard_repository.count_customers(db)
        )

        total_artisans = (
            await admin_dashboard_repository.count_artisans(db)
        )

        verified_artisans = (
            await admin_dashboard_repository.count_artisans(
                db,
                verified_only=True,
            )
        )

        total_products = (
            await admin_dashboard_repository.count_products(db)
        )

        active_products = (
            await admin_dashboard_repository.count_products(
                db,
                active_only=True,
            )
        )

        featured_products = (
            await admin_dashboard_repository.count_products(
                db,
                featured_only=True,
            )
        )

        total_categories = (
            await admin_dashboard_repository.count_categories(db)
        )

        total_orders = (
            await admin_dashboard_repository.count_orders(db)
        )

        pending_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.PENDING,
            )
        )

        processing_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.PROCESSING,
            )
        )

        shipped_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.SHIPPED,
            )
        )

        delivered_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.DELIVERED,
            )
        )

        cancelled_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.CANCELLED,
            )
        )

        returned_orders = (
            await admin_dashboard_repository.count_orders_by_status(
                db,
                OrderStatus.RETURNED,
            )
        )

        total_revenue = (
            await admin_dashboard_repository.revenue(db)
        )

        paid_revenue = (
            await admin_dashboard_repository.paid_revenue(db)
        )

        average_order_value = (
            total_revenue / total_orders
            if total_orders > 0
            else Decimal("0.00")
        )

        status_counts = (
            await admin_dashboard_repository.order_status_counts(db)
        )

        recent_orders = (
            await admin_dashboard_repository.recent_orders(
                db,
                limit=10,
            )
        )

        inventory = (
            await admin_dashboard_repository.inventory_summary(db)
        )

        return {
            "summary": {
                "total_users": total_users,
                "active_users": active_users,
                "total_customers": total_customers,
                "total_artisans": total_artisans,
                "verified_artisans": verified_artisans,
                "total_products": total_products,
                "active_products": active_products,
                "featured_products": featured_products,
                "total_categories": total_categories,
                "total_orders": total_orders,
                "pending_orders": pending_orders,
                "processing_orders": processing_orders,
                "shipped_orders": shipped_orders,
                "delivered_orders": delivered_orders,
                "cancelled_orders": cancelled_orders,
                "returned_orders": returned_orders,
                "total_revenue": total_revenue,
                "paid_revenue": paid_revenue,
                "low_stock_products": inventory[
                    "low_stock_products"
                ],
            },
            "order_status": [
                {
                    "status": status,
                    "count": count,
                }
                for status, count in status_counts
            ],
            "sales": {
                "total_orders": total_orders,
                "total_revenue": total_revenue,
                "paid_revenue": paid_revenue,
                "average_order_value": average_order_value,
            },
            "recent_orders": [
                {
                    "id": order.id,
                    "order_number": order.order_number,
                    "user_id": str(order.user_id),
                    "status": order.status.value,
                    "payment_status": order.payment_status.value,
                    "total_amount": order.total_amount,
                    "created_at": order.created_at,
                }
                for order in recent_orders
            ],
            "inventory": inventory,
        }


admin_dashboard_service = AdminDashboardService()
