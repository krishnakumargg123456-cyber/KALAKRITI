from app.api.v1.routers.products.router import router as product_router
from app.api.v1.routers.products.image_router import router as product_image_router

__all__ = [
    "product_router",
    "product_image_router",
]
