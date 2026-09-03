from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import get_current_user, require_admin
from app.models.user import User
from app.schemas.coupon import (
    CouponApplyRequest,
    CouponApplyResponse,
    CouponCreate,
    CouponResponse,
    CouponUpdate,
)
from app.services.coupon import (
    apply_coupon,
    create_new_coupon,
    get_all_coupons,
    get_coupon,
    remove_coupon,
    update_existing_coupon,
)


router = APIRouter(
    prefix="/coupons",
    tags=["Coupons"],
)


@router.get(
    "",
    response_model=list[CouponResponse],
)
async def get_coupons(
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await get_all_coupons(db)


@router.get(
    "/{coupon_id}",
    response_model=CouponResponse,
)
async def get_single_coupon(
    coupon_id: int,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await get_coupon(
        db=db,
        coupon_id=coupon_id,
    )


@router.post(
    "",
    response_model=CouponResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_coupon(
    data: CouponCreate,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await create_new_coupon(
        db=db,
        data=data,
    )


@router.patch(
    "/{coupon_id}",
    response_model=CouponResponse,
)
async def update_coupon(
    coupon_id: int,
    data: CouponUpdate,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await update_existing_coupon(
        db=db,
        coupon_id=coupon_id,
        data=data,
    )


@router.delete(
    "/{coupon_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_coupon(
    coupon_id: int,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await remove_coupon(
        db=db,
        coupon_id=coupon_id,
    )


@router.post(
    "/apply",
    response_model=CouponApplyResponse,
    status_code=status.HTTP_200_OK,
)
async def apply_coupon_code(
    data: CouponApplyRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    code, discount_amount, final_amount = await apply_coupon(
        db=db,
        data=data,
    )

    return CouponApplyResponse(
        code=code,
        discount_amount=discount_amount,
        final_amount=final_amount,
    )
