from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import require_admin
from app.core.database.session import get_db
from app.models.user import User
from app.schemas.admin_dashboard import DashboardResponse
from app.services.admin.service import admin_dashboard_service


router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"],
)


@router.get(
    "/dashboard",
    response_model=DashboardResponse,
)
async def get_admin_dashboard(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
) -> DashboardResponse:

    data = await admin_dashboard_service.get_dashboard(db)

    return DashboardResponse.model_validate(data)
