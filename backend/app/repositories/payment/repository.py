from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.payment import Payment


class PaymentRepository:

    async def get_by_id(
        self,
        db: AsyncSession,
        payment_id: int,
    ) -> Payment | None:

        result = await db.execute(
            select(Payment).where(
                Payment.id == payment_id
            )
        )

        return result.scalar_one_or_none()

    async def get_by_order_id(
        self,
        db: AsyncSession,
        order_id: int,
    ) -> Payment | None:

        result = await db.execute(
            select(Payment).where(
                Payment.order_id == order_id
            )
        )

        return result.scalar_one_or_none()

    async def create(
        self,
        db: AsyncSession,
        payment: Payment,
    ) -> Payment:

        db.add(payment)

        await db.flush()
        await db.refresh(payment)

        return payment

    async def update(
        self,
        db: AsyncSession,
        payment: Payment,
    ) -> Payment:

        await db.flush()
        await db.refresh(payment)

        return payment


payment_repository = PaymentRepository()
