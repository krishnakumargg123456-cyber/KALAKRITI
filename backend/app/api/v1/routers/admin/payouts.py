from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.payout import PayoutStatus
from app.models.user import User
from app.schemas.payout import (
    PayoutCreate,
    PayoutResponse,
    PayoutStatusUpdate,
)
from app.services.payout.service import payout_service


router = APIRouter(
    prefix="/payouts",
    tags=["Admin Payouts"],
)


@router.get("", response_model=list[PayoutResponse])
async def list_payouts(
    artisan_id: UUID | None = None,
    order_id: int | None = None,
    payout_status: PayoutStatus | None = Query(
        default=None,
        alias="status",
    ),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> list[PayoutResponse]:
    payouts = await payout_service.list_payouts(
        db,
        artisan_id=artisan_id,
        order_id=order_id,
        payout_status=payout_status,
    )

    return [
        PayoutResponse.model_validate(payout)
        for payout in payouts
    ]


@router.get("/{payout_id}", response_model=PayoutResponse)
async def get_payout(
    payout_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> PayoutResponse:
    payout = await payout_service.get_payout(
        db,
        payout_id,
    )

    if payout is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payout not found",
        )

    return PayoutResponse.model_validate(payout)


@router.post(
    "",
    response_model=PayoutResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_payout(
    data: PayoutCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> PayoutResponse:
    payout = await payout_service.create_payout(
        db,
        data,
    )

    return PayoutResponse.model_validate(payout)


@router.patch(
    "/{payout_id}/status",
    response_model=PayoutResponse,
)
async def update_payout_status(
    payout_id: int,
    data: PayoutStatusUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> PayoutResponse:
    payout = await payout_service.update_status(
        db,
        payout_id,
        data,
    )

    if payout is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payout not found",
        )

    return PayoutResponse.model_validate(payout)
