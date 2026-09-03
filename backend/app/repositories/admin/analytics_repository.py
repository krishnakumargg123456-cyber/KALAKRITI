from __future__ import annotations

from datetime import datetime, timedelta, timezone
from decimal import Decimal

from sqlalchemy import case, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category
from app.models.order import Order, OrderItem, PaymentStatus
from app.models.product import Product
from app.models.user import User


class AdminAnalyticsRepository:
    @staticmethod
    def _paid_order_filter():
        return Order.payment_status == PaymentStatus.PAID

    async def period_summary(
        self,
        db: AsyncSession,
        start: datetime,
        end: datetime,
    ) -> dict:
        revenue_result = await db.execute(
            select(
                func.coalesce(func.sum(Order.total_amount), Decimal("0.00")),
                func.count(Order.id),
                func.count(func.distinct(Order.user_id)),
            )
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
        )

        revenue, orders, customers = revenue_result.one()

        products_result = await db.execute(
            select(
                func.coalesce(func.sum(OrderItem.quantity), 0)
            )
            .join(Order, Order.id == OrderItem.order_id)
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
        )

        products_sold = int(products_result.scalar_one() or 0)
        revenue = Decimal(str(revenue or "0.00"))
        orders = int(orders or 0)
        customers = int(customers or 0)

        return {
            "revenue": revenue,
            "orders": orders,
            "customers": customers,
            "products_sold": products_sold,
            "average_order_value": (
                revenue / orders if orders else Decimal("0.00")
            ),
        }

    async def sales_trend(
        self,
        db: AsyncSession,
        start: datetime,
        end: datetime,
    ) -> list[dict]:
        result = await db.execute(
            select(
                func.date_trunc("day", Order.created_at).label("period"),
                func.coalesce(func.sum(Order.total_amount), Decimal("0.00")).label(
                    "revenue"
                ),
                func.count(Order.id).label("orders"),
            )
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
            .group_by(func.date_trunc("day", Order.created_at))
            .order_by(func.date_trunc("day", Order.created_at))
        )

        return [
            {
                "date": period.isoformat(),
                "revenue": Decimal(str(revenue or "0.00")),
                "orders": int(orders),
            }
            for period, revenue, orders in result.all()
        ]

    async def top_products(
        self,
        db: AsyncSession,
        start: datetime,
        end: datetime,
        limit: int = 10,
    ) -> list[dict]:
        result = await db.execute(
            select(
                OrderItem.product_id,
                OrderItem.product_name,
                func.coalesce(func.sum(OrderItem.quantity), 0).label("quantity"),
                func.coalesce(
                    func.sum(OrderItem.total_price),
                    Decimal("0.00"),
                ).label("revenue"),
            )
            .join(Order, Order.id == OrderItem.order_id)
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
            .group_by(
                OrderItem.product_id,
                OrderItem.product_name,
            )
            .order_by(
                func.sum(OrderItem.total_price).desc()
            )
            .limit(limit)
        )

        return [
            {
                "product_id": str(product_id),
                "product_name": product_name,
                "quantity": int(quantity),
                "revenue": Decimal(str(revenue or "0.00")),
            }
            for product_id, product_name, quantity, revenue in result.all()
        ]

    async def category_sales(
        self,
        db: AsyncSession,
        start: datetime,
        end: datetime,
    ) -> list[dict]:
        result = await db.execute(
            select(
                Category.id,
                Category.name,
                func.coalesce(
                    func.sum(OrderItem.total_price),
                    Decimal("0.00"),
                ).label("revenue"),
                func.coalesce(
                    func.sum(OrderItem.quantity),
                    0,
                ).label("quantity"),
            )
            .join(Product, Product.category_id == Category.id)
            .join(OrderItem, OrderItem.product_id == Product.id)
            .join(Order, Order.id == OrderItem.order_id)
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
            .group_by(Category.id, Category.name)
            .order_by(func.sum(OrderItem.total_price).desc())
        )

        rows = result.all()
        total_revenue = sum(
            (Decimal(str(row.revenue or "0.00")) for row in rows),
            Decimal("0.00"),
        )

        return [
            {
                "category_id": str(category_id),
                "category_name": category_name,
                "revenue": Decimal(str(revenue or "0.00")),
                "quantity": int(quantity),
                "percentage": (
                    (Decimal(str(revenue or "0.00")) / total_revenue) * 100
                    if total_revenue
                    else Decimal("0.00")
                ),
            }
            for category_id, category_name, revenue, quantity in rows
        ]

    async def customer_metrics(
        self,
        db: AsyncSession,
        start: datetime,
        end: datetime,
    ) -> dict:
        new_customers_result = await db.execute(
            select(func.count(User.id))
            .join(Order, Order.user_id == User.id)
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
                User.created_at >= start,
                User.created_at < end,
            )
            .distinct()
        )

        new_customers = int(new_customers_result.scalar_one() or 0)

        period_customers = (
            select(Order.user_id)
            .where(
                Order.created_at >= start,
                Order.created_at < end,
                self._paid_order_filter(),
            )
            .distinct()
            .subquery()
        )

        returning_result = await db.execute(
            select(func.count())
            .select_from(period_customers)
            .where(
                period_customers.c.user_id.in_(
                    select(Order.user_id)
                    .where(
                        Order.created_at < start,
                        self._paid_order_filter(),
                    )
                )
            )
        )

        returning_customers = int(returning_result.scalar_one() or 0)
        total_customers = int(
            (await db.execute(
                select(func.count())
                .select_from(period_customers)
            )).scalar_one()
            or 0
        )

        return {
            "new_customers": new_customers,
            "returning_customers": returning_customers,
            "total_customers": total_customers,
            "returning_rate": (
                (Decimal(returning_customers) / Decimal(total_customers)) * 100
                if total_customers
                else Decimal("0.00")
            ),
        }


admin_analytics_repository = AdminAnalyticsRepository()
