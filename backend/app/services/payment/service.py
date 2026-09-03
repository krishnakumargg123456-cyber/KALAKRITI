from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.order import Order, PaymentStatus
from app.models.payment import Payment, PaymentTransactionStatus
from app.repositories.payment import payment_repository
from app.schemas.payment import PaymentCreate, PaymentStatusUpdate


async def get_order_or_404(
    db: AsyncSession,
    order_id: int,
) -> Order:
    result = await db.execute(
        select(Order).where(Order.id == order_id)
    )

    order = result.scalar_one_or_none()

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    return order


async def get_payment(
    db: AsyncSession,
    payment_id: int,
) -> Payment:
    payment = await payment_repository.get_by_id(
        db,
        payment_id,
    )

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    return payment


async def get_payment_by_order(
    db: AsyncSession,
    order_id: int,
) -> Payment | None:
    await get_order_or_404(
        db,
        order_id,
    )

    return await payment_repository.get_by_order_id(
        db,
        order_id,
    )


async def create_payment(
    db: AsyncSession,
    data: PaymentCreate,
) -> Payment:
    order = await get_order_or_404(
        db,
        data.order_id,
    )

    existing = await payment_repository.get_by_order_id(
        db,
        data.order_id,
    )

    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payment already exists for this order",
        )

    if data.amount != order.total_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment amount does not match order total",
        )

    if order.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Order is already paid",
        )

    payment = Payment(
        order_id=data.order_id,
        amount=data.amount,
        method=data.method,
        gateway=data.gateway,
        status=PaymentTransactionStatus.CREATED,
    )

    try:
        return await payment_repository.create(
            db,
            payment,
        )

    except IntegrityError:
        await db.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payment already exists for this order",
        )


async def update_payment_status(
    db: AsyncSession,
    payment_id: int,
    data: PaymentStatusUpdate,
) -> Payment:
    payment = await get_payment(
        db,
        payment_id,
    )

    order = await get_order_or_404(
        db,
        payment.order_id,
    )

    current_status = payment.status
    new_status = data.status

    if current_status == PaymentTransactionStatus.REFUNDED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Refunded payment cannot be updated",
        )

    if (
        current_status == PaymentTransactionStatus.SUCCESS
        and new_status
        not in {
            PaymentTransactionStatus.SUCCESS,
            PaymentTransactionStatus.REFUNDED,
        }
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Successful payment cannot move to this status",
        )

    if (
        new_status == PaymentTransactionStatus.SUCCESS
        and order.payment_status == PaymentStatus.PAID
        and current_status != PaymentTransactionStatus.SUCCESS
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Order is already marked as paid",
        )

    payment.status = new_status

    if data.transaction_id is not None:
        payment.transaction_id = data.transaction_id

    if data.gateway_order_id is not None:
        payment.gateway_order_id = data.gateway_order_id

    if data.gateway_payment_id is not None:
        payment.gateway_payment_id = data.gateway_payment_id

    if data.failure_reason is not None:
        payment.failure_reason = data.failure_reason

    if new_status == PaymentTransactionStatus.SUCCESS:
        order.payment_status = PaymentStatus.PAID

    elif new_status == PaymentTransactionStatus.FAILED:
        order.payment_status = PaymentStatus.FAILED

    elif new_status in {
        PaymentTransactionStatus.CREATED,
        PaymentTransactionStatus.PENDING,
    }:
        order.payment_status = PaymentStatus.PENDING

    elif new_status == PaymentTransactionStatus.REFUNDED:
        order.payment_status = PaymentStatus.PENDING

    await db.flush()
    await db.refresh(payment)

    return payment

# =========================================================
# Razorpay integration
# =========================================================

from app.config import settings
from app.integrations.payments.razorpay import (
    create_razorpay_order,
    verify_razorpay_signature,
)
from app.models.payment import PaymentMethod


async def create_razorpay_payment(
    db: AsyncSession,
    order: Order,
) -> tuple[Payment, dict]:
    if order.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Order is already paid",
        )

    if order.total_amount <= Decimal("0.00"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order amount must be greater than zero",
        )

    existing = await payment_repository.get_by_order_id(
        db,
        order.id,
    )

    if existing is not None:
        if (
            existing.gateway == "razorpay"
            and existing.gateway_order_id
        ):
            return existing, {
                "id": existing.gateway_order_id,
                "amount": int(
                    existing.amount * Decimal("100")
                ),
                "currency": "INR",
            }

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payment already exists for this order",
        )

    razorpay_order = create_razorpay_order(
        amount=order.total_amount,
        receipt=order.order_number,
        currency="INR",
    )

    gateway_order_id = razorpay_order.get("id")

    if not gateway_order_id:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Razorpay did not return an order ID",
        )

    payment = Payment(
        order_id=order.id,
        amount=order.total_amount,
        method=PaymentMethod.UPI,
        gateway="razorpay",
        gateway_order_id=gateway_order_id,
        status=PaymentTransactionStatus.CREATED,
    )

    try:
        db.add(payment)

        await db.flush()
        await db.refresh(payment)

    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payment already exists for this order",
        )

    return payment, razorpay_order


async def verify_razorpay_payment(
    db: AsyncSession,
    payment: Payment,
    razorpay_order_id: str,
    razorpay_payment_id: str,
    razorpay_signature: str,
) -> Payment:
    if payment.gateway != "razorpay":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment is not a Razorpay payment",
        )

    if payment.gateway_order_id != razorpay_order_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Razorpay order ID does not match payment",
        )

    if payment.status == PaymentTransactionStatus.SUCCESS:
        if payment.gateway_payment_id == razorpay_payment_id:
            return payment

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Payment is already marked successful",
        )

    order = await get_order_or_404(
        db,
        payment.order_id,
    )

    try:
        verify_razorpay_signature(
            razorpay_order_id=razorpay_order_id,
            razorpay_payment_id=razorpay_payment_id,
            razorpay_signature=razorpay_signature,
        )

    except Exception:
        payment.status = PaymentTransactionStatus.FAILED
        payment.failure_reason = "Razorpay signature verification failed"
        order.payment_status = PaymentStatus.FAILED

        await db.commit()
        await db.refresh(payment)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Razorpay payment signature",
        )

    payment.status = PaymentTransactionStatus.SUCCESS
    payment.gateway_payment_id = razorpay_payment_id
    payment.transaction_id = razorpay_payment_id
    payment.failure_reason = None

    order.payment_status = PaymentStatus.PAID

    await db.commit()
    await db.refresh(payment)

    return payment
