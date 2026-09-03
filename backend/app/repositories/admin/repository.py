from __future__ import annotations

from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artisan import Artisan
from app.models.category import Category
from app.models.inventory import Inventory
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.product import Product
from app.models.user import User


class AdminDashboardRepository:

    async def count_users(
        self,
        db: AsyncSession,
        *,
        active_only: bool = False,
    ) -> int:
        stmt = select(func.count(User.id))

        if active_only:
            stmt = stmt.where(User.is_active.is_(True))

        result = await db.execute(stmt)
        return int(result.scalar_one())

    async def count_customers(
        self,
        db: AsyncSession,
    ) -> int:
        result = await db.execute(
            select(func.count(User.id)).where(
                User.role == "customer"
            )
        )
        return int(result.scalar_one())

    async def count_artisans(
        self,
        db: AsyncSession,
        *,
        verified_only: bool = False,
    ) -> int:
        stmt = select(func.count(Artisan.id))

        if verified_only:
            stmt = stmt.where(
                Artisan.is_verified.is_(True)
            )

        result = await db.execute(stmt)
        return int(result.scalar_one())

    async def count_products(
        self,
        db: AsyncSession,
        *,
        active_only: bool = False,
        featured_only: bool = False,
    ) -> int:
        stmt = select(func.count(Product.id))

        if active_only:
            stmt = stmt.where(
                Product.is_active.is_(True)
            )

        if featured_only:
            stmt = stmt.where(
                Product.is_featured.is_(True)
            )

        result = await db.execute(stmt)
        return int(result.scalar_one())

    async def count_categories(
        self,
        db: AsyncSession,
    ) -> int:
        result = await db.execute(
            select(func.count(Category.id))
        )
        return int(result.scalar_one())

    async def count_orders(
        self,
        db: AsyncSession,
    ) -> int:
        result = await db.execute(
            select(func.count(Order.id))
        )
        return int(result.scalar_one())

    async def count_orders_by_status(
        self,
        db: AsyncSession,
        status: OrderStatus,
    ) -> int:
        result = await db.execute(
            select(func.count(Order.id)).where(
                Order.status == status
            )
        )
        return int(result.scalar_one())

    async def revenue(
        self,
        db: AsyncSession,
    ) -> Decimal:
        result = await db.execute(
            select(
                func.coalesce(
                    func.sum(Order.total_amount),
                    Decimal("0.00"),
                )
            )
        )
        return Decimal(str(result.scalar_one()))

    async def paid_revenue(
        self,
        db: AsyncSession,
    ) -> Decimal:
        result = await db.execute(
            select(
                func.coalesce(
                    func.sum(Order.total_amount),
                    Decimal("0.00"),
                )
            ).where(
                Order.payment_status == PaymentStatus.PAID
            )
        )
        return Decimal(str(result.scalar_one()))

    async def order_status_counts(
        self,
        db: AsyncSession,
    ) -> list[tuple[str, int]]:
        result = await db.execute(
            select(
                Order.status,
                func.count(Order.id),
            )
            .group_by(Order.status)
            .order_by(Order.status)
        )

        return [
            (str(status), int(count))
            for status, count in result.all()
        ]

    async def recent_orders(
        self,
        db: AsyncSession,
        *,
        limit: int = 10,
    ) -> list[Order]:
        result = await db.execute(
            select(Order)
            .order_by(Order.created_at.desc())
            .limit(limit)
        )

        return list(result.scalars().all())

    async def inventory_summary(
        self,
        db: AsyncSession,
    ) -> dict[str, int]:
        total_products_result = await db.execute(
            select(func.count(Inventory.product_id))
        )

        total_quantity_result = await db.execute(
            select(
                func.coalesce(
                    func.sum(Inventory.quantity),
                    0,
                )
            )
        )

        reserved_quantity_result = await db.execute(
            select(
                func.coalesce(
                    func.sum(Inventory.reserved_quantity),
                    0,
                )
            )
        )

        low_stock_result = await db.execute(
            select(func.count(Inventory.product_id)).where(
                Inventory.quantity
                - Inventory.reserved_quantity
                <= Inventory.low_stock_threshold
            )
        )

        out_of_stock_result = await db.execute(
            select(func.count(Inventory.product_id)).where(
                Inventory.quantity
                - Inventory.reserved_quantity
                <= 0
            )
        )

        total_quantity = int(total_quantity_result.scalar_one())
        reserved_quantity = int(
            reserved_quantity_result.scalar_one()
        )

        return {
            "total_products_with_inventory": int(
                total_products_result.scalar_one()
            ),
            "low_stock_products": int(
                low_stock_result.scalar_one()
            ),
            "out_of_stock_products": int(
                out_of_stock_result.scalar_one()
            ),
            "total_quantity": total_quantity,
            "reserved_quantity": reserved_quantity,
            "available_quantity": max(
                total_quantity - reserved_quantity,
                0,
            ),
        }


admin_dashboard_repository = AdminDashboardRepository()
