from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.payout import Payout
from app.schemas.payout import PayoutCreate, PayoutStatusUpdate


class PayoutService:
    async def list_payouts(
        self,
        db: AsyncSession,
        *,
        artisan_id=None,
        order_id=None,
        payout_status=None,
    ):
        query = select(Payout).order_by(Payout.created_at.desc())

        if artisan_id is not None:
            query = query.where(Payout.artisan_id == artisan_id)

        if order_id is not None:
            query = query.where(Payout.order_id == order_id)

        if payout_status is not None:
            query = query.where(Payout.status == payout_status)

        result = await db.execute(query)
        return list(result.scalars().all())

    async def get_payout(
        self,
        db: AsyncSession,
        payout_id: int,
    ):
        result = await db.execute(
            select(Payout).where(Payout.id == payout_id)
        )
        return result.scalar_one_or_none()

    async def create_payout(
        self,
        db: AsyncSession,
        data: PayoutCreate,
    ):
        payout = Payout(
            artisan_id=data.artisan_id,
            order_id=data.order_id,
            gross_amount=data.gross_amount,
            commission_amount=data.commission_amount,
            net_amount=data.net_amount,
            payment_gateway=data.payment_gateway,
        )

        db.add(payout)
        await db.commit()
        await db.refresh(payout)

        return payout

    async def update_status(
        self,
        db: AsyncSession,
        payout_id: int,
        data: PayoutStatusUpdate,
    ):
        payout = await self.get_payout(db, payout_id)

        if payout is None:
            return None

        payout.status = data.status

        if data.payout_reference is not None:
            payout.payout_reference = data.payout_reference

        if data.transaction_id is not None:
            payout.transaction_id = data.transaction_id

        if data.failure_reason is not None:
            payout.failure_reason = data.failure_reason

        await db.commit()
        await db.refresh(payout)

        return payout


payout_service = PayoutService()
