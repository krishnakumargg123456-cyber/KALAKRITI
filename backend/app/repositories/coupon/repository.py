from __future__ import annotations

from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.coupon import Coupon


async def get_coupon_by_id(
    db: AsyncSession,
    coupon_id: int,
) -> Coupon | None:
    result = await db.execute(
        select(Coupon).where(Coupon.id == coupon_id)
    )
    return result.scalar_one_or_none()


async def get_coupon_by_code(
    db: AsyncSession,
    code: str,
) -> Coupon | None:
    result = await db.execute(
        select(Coupon).where(Coupon.code == code.strip().upper())
    )
    return result.scalar_one_or_none()


async def list_coupons(
    db: AsyncSession,
) -> list[Coupon]:
    result = await db.execute(
        select(Coupon)
        .order_by(Coupon.created_at.desc())
    )
    return list(result.scalars().all())


async def create_coupon(
    db: AsyncSession,
    coupon: Coupon,
) -> Coupon:
    db.add(coupon)
    await db.flush()
    await db.refresh(coupon)
    return coupon


async def update_coupon(
    db: AsyncSession,
    coupon: Coupon,
    data: dict,
) -> Coupon:
    for field, value in data.items():
        setattr(coupon, field, value)

    await db.flush()
    await db.refresh(coupon)

    return coupon


async def delete_coupon(
    db: AsyncSession,
    coupon: Coupon,
) -> None:
    await db.delete(coupon)
    await db.flush()


async def increment_coupon_usage(
    db: AsyncSession,
    coupon: Coupon,
) -> Coupon:
    coupon.used_count += 1

    await db.flush()
    await db.refresh(coupon)

    return coupon
