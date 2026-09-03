from fastapi import APIRouter

from app.api.v1.routers.auth.router import router as auth_router
from app.api.v1.routers.cart.router import router as cart_router
from app.api.v1.routers.wishlist.router import router as wishlist_router
from app.api.v1.routers.orders.router import router as orders_router
from app.api.v1.routers.categories.router import router as categories_router
from app.api.v1.routers.coupons import router as coupons_router
from app.api.v1.routers.products import product_router, product_image_router
from app.api.v1.routers.artisan import artisan_router
from app.api.v1.routers.artisan.stories import router as artisan_stories_router
from app.api.v1.routers.reviews.router import router as reviews_router
from app.api.v1.routers.inventory.router import router as inventory_router
from app.api.v1.routers.payment.router import router as payment_router
from app.api.v1.routers.users import router as users_router
from app.api.v1.routers.addresses import router as addresses_router
from app.api.v1.routers.notifications.router import router as notifications_router
from app.api.v1.routers.search.router import router as search_router
from app.api.v1.routers.storage.router import router as storage_router
from app.api.v1.routers.admin import router as admin_router
from app.api.v1.routers.stories import router as stories_router


api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(cart_router)
api_router.include_router(wishlist_router)
api_router.include_router(orders_router)
api_router.include_router(categories_router)
api_router.include_router(coupons_router)
api_router.include_router(product_router)
api_router.include_router(product_image_router)
api_router.include_router(artisan_router)
api_router.include_router(artisan_stories_router)
api_router.include_router(reviews_router)
api_router.include_router(inventory_router)
api_router.include_router(payment_router)
api_router.include_router(users_router)
api_router.include_router(addresses_router)
api_router.include_router(notifications_router)
api_router.include_router(search_router)
api_router.include_router(storage_router)
api_router.include_router(stories_router)
api_router.include_router(admin_router)
