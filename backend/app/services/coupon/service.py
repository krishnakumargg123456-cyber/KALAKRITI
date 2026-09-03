from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.coupon import Coupon
from app.repositories.coupon import (
    create_coupon,
    delete_coupon,
    get_coupon_by_code,
    get_coupon_by_id,
    increment_coupon_usage,
    list_coupons,
    update_coupon,
)
from app.schemas.coupon import (
    CouponApplyRequest,
    CouponCreate,
    CouponUpdate,
)


def _validate_discount(
    discount_type: str,
    discount_value: Decimal,
) -> None:
    if discount_type == "percentage" and discount_value > Decimal("100"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Percentage discount cannot exceed 100",
        )


async def get_all_coupons(
    db: AsyncSession,
) -> list[Coupon]:
    return await list_coupons(db)


async def get_coupon(
    db: AsyncSession,
    coupon_id: int,
) -> Coupon:
    coupon = await get_coupon_by_id(db, coupon_id)

    if coupon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Coupon not found",
        )

    return coupon


async def create_new_coupon(
    db: AsyncSession,
    data: CouponCreate,
) -> Coupon:
    code = data.code.strip().upper()

    existing = await get_coupon_by_code(db, code)

    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Coupon code already exists",
        )

    _validate_discount(
        data.discount_type,
        data.discount_value,
    )

    coupon = Coupon(
        code=code,
        description=data.description,
        discount_type=data.discount_type,
        discount_value=data.discount_value,
        minimum_order_amount=data.minimum_order_amount,
        maximum_discount_amount=data.maximum_discount_amount,
        usage_limit=data.usage_limit,
        used_count=0,
        starts_at=data.starts_at,
        expires_at=data.expires_at,
        is_active=data.is_active,
    )

    await create_coupon(db, coupon)
    await db.commit()
    await db.refresh(coupon)

    return coupon


async def update_existing_coupon(
    db: AsyncSession,
    coupon_id: int,
    data: CouponUpdate,
) -> Coupon:
    coupon = await get_coupon_by_id(db, coupon_id)

    if coupon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Coupon not found",
        )

    values = data.model_dump(exclude_unset=True)

    discount_type = values.get(
        "discount_type",
        coupon.discount_type,
    )

    discount_value = values.get(
        "discount_value",
        coupon.discount_value,
    )

    _validate_discount(
        discount_type,
        discount_value,
    )

    if discount_type == "fixed":
        values["maximum_discount_amount"] = None

    starts_at = values.get(
        "starts_at",
        coupon.starts_at,
    )

    expires_at = values.get(
        "expires_at",
        coupon.expires_at,
    )

    if (
        starts_at is not None
        and expires_at is not None
        and expires_at <= starts_at
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="expires_at must be later than starts_at",
        )

    await update_coupon(db, coupon, values)
    await db.commit()
    await db.refresh(coupon)

    return coupon


async def remove_coupon(
    db: AsyncSession,
    coupon_id: int,
) -> None:
    coupon = await get_coupon_by_id(db, coupon_id)

    if coupon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Coupon not found",
        )

    await delete_coupon(db, coupon)
    await db.commit()


async def apply_coupon(
    db: AsyncSession,
    data: CouponApplyRequest,
) -> tuple[str, Decimal, Decimal]:
    code = data.code.strip().upper()

    coupon = await get_coupon_by_code(db, code)

    if coupon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid coupon code",
        )

    if not coupon.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coupon is inactive",
        )

    now = datetime.now(timezone.utc)

    if coupon.starts_at is not None and now < coupon.starts_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coupon is not active yet",
        )

    if coupon.expires_at is not None and now >= coupon.expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coupon has expired",
        )

    if (
        coupon.usage_limit is not None
        and coupon.used_count >= coupon.usage_limit
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Coupon usage limit reached",
        )

    if data.order_amount < coupon.minimum_order_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Minimum order amount is "
                f"{coupon.minimum_order_amount}"
            ),
        )

    if coupon.discount_type == "percentage":
        discount = (
            data.order_amount
            * coupon.discount_value
            / Decimal("100")
        )

        if coupon.maximum_discount_amount is not None:
            discount = min(
                discount,
                coupon.maximum_discount_amount,
            )
    else:
        discount = coupon.discount_value

    discount = min(discount, data.order_amount)

    final_amount = data.order_amount - discount

    return (
        coupon.code,
        discount.quantize(Decimal("0.01")),
        final_amount.quantize(Decimal("0.01")),
    )


__all__ = [
    "get_all_coupons",
    "get_coupon",
    "create_new_coupon",
    "update_existing_coupon",
    "remove_coupon",
    "apply_coupon",
]
