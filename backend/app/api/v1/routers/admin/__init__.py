from app.api.v1.routers.admin.router import router
from app.api.v1.routers.admin.moderation import router as moderation_router
from app.api.v1.routers.admin.payouts import router as payouts_router
from app.api.v1.routers.admin.reviews import router as reviews_router
from app.api.v1.routers.admin.settings import router as settings_router
from app.api.v1.routers.admin.analytics import router as analytics_router
from app.api.v1.routers.admin.stories import router as stories_router
from app.api.v1.routers.admin.products import router as products_router


router.include_router(moderation_router)
router.include_router(payouts_router)
router.include_router(reviews_router)
router.include_router(settings_router)
router.include_router(analytics_router)
router.include_router(stories_router)
router.include_router(products_router)


__all__ = ["router"]
