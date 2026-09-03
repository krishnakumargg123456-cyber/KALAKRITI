from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.user import User
from app.schemas.admin_analytics import AdminAnalyticsResponse
from app.services.admin.analytics_service import admin_analytics_service


router = APIRouter(
    prefix="/analytics",
    tags=["Admin Analytics"],
)


@router.get(
    "",
    response_model=AdminAnalyticsResponse,
)
async def get_admin_analytics(
    days: int = Query(
        default=30,
        ge=7,
        le=365,
        description="Analytics period in days",
    ),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminAnalyticsResponse:
    data = await admin_analytics_service.get_analytics(
        db,
        days=days,
    )

    return AdminAnalyticsResponse.model_validate(data)
