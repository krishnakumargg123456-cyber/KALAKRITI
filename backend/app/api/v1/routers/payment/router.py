from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.core.database.session import get_db
from app.dependencies import get_current_user, require_admin
from app.models.order import Order
from app.models.payment import Payment
from app.models.user import User
from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    PaymentStatusUpdate,
    RazorpayOrderCreate,
    RazorpayOrderResponse,
    RazorpayVerifyRequest,
    RazorpayVerifyResponse,
)
from app.services.payment import (
    create_payment,
    create_razorpay_payment,
    get_payment,
    get_payment_by_order,
    update_payment_status,
    verify_razorpay_payment,
)


router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


async def require_order_owner(
    order_id: int,
    current_user: User,
    db: AsyncSession,
) -> Order:
    result = await db.execute(
        select(Order).where(
            Order.id == order_id,
        )
    )

    order = result.scalar_one_or_none()

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    if (
        current_user.role != "admin"
        and order.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to access this order",
        )

    return order


@router.post(
    "",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_payment_endpoint(
    data: PaymentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await require_order_owner(
        data.order_id,
        current_user,
        db,
    )

    return await create_payment(
        db,
        data,
    )


@router.post(
    "/razorpay/order",
    response_model=RazorpayOrderResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_razorpay_order_endpoint(
    data: RazorpayOrderCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    order = await require_order_owner(
        data.order_id,
        current_user,
        db,
    )

    payment, razorpay_order = await create_razorpay_payment(
        db,
        order,
    )

    return RazorpayOrderResponse(
        payment=payment,
        razorpay_order_id=razorpay_order["id"],
        razorpay_key_id=settings.RAZORPAY_KEY_ID,
        amount=int(razorpay_order["amount"]),
        currency=razorpay_order.get("currency", "INR"),
    )


@router.post(
    "/razorpay/verify",
    response_model=RazorpayVerifyResponse,
)
async def verify_razorpay_payment_endpoint(
    data: RazorpayVerifyRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    payment = await get_payment(
        db,
        data.payment_id,
    )

    await require_order_owner(
        payment.order_id,
        current_user,
        db,
    )

    payment = await verify_razorpay_payment(
        db=db,
        payment=payment,
        razorpay_order_id=data.razorpay_order_id,
        razorpay_payment_id=data.razorpay_payment_id,
        razorpay_signature=data.razorpay_signature,
    )

    return RazorpayVerifyResponse(
        payment=payment,
        verified=True,
    )


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
async def get_payment_endpoint(
    payment_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    payment = await get_payment(
        db,
        payment_id,
    )

    if current_user.role != "admin":
        await require_order_owner(
            payment.order_id,
            current_user,
            db,
        )

    return payment


@router.get(
    "/orders/{order_id}",
    response_model=PaymentResponse | None,
)
async def get_order_payment_endpoint(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await require_order_owner(
        order_id,
        current_user,
        db,
    )

    return await get_payment_by_order(
        db,
        order_id,
    )


@router.patch(
    "/{payment_id}/status",
    response_model=PaymentResponse,
)
async def update_payment_status_endpoint(
    payment_id: int,
    data: PaymentStatusUpdate,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await update_payment_status(
        db,
        payment_id,
        data,
    )
