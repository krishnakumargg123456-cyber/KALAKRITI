from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database.session import get_db
from app.dependencies import require_admin
from app.models.user import User
from app.schemas.settings import (
    AdminSettingsResponse,
    AdminSettingsUpdate,
)
from app.services.settings.service import admin_settings_service


router = APIRouter(
    prefix="/settings",
    tags=["Admin Settings"],
)


@router.get(
    "",
    response_model=AdminSettingsResponse,
)
async def get_admin_settings(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminSettingsResponse:
    settings = await admin_settings_service.get_settings(db)

    return AdminSettingsResponse.model_validate(settings)


@router.patch(
    "",
    response_model=AdminSettingsResponse,
)
async def update_admin_settings(
    data: AdminSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> AdminSettingsResponse:
    settings = await admin_settings_service.update_settings(
        db,
        data,
    )

    return AdminSettingsResponse.model_validate(settings)
