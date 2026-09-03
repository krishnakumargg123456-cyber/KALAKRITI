from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.artisan import Artisan
from app.models.category import Category
from app.models.product import Product
from app.repositories.product.repository import ProductRepository
from app.schemas.product.product import ProductCreate, ProductUpdate


class ProductService:

    def __init__(self):
        self.repository = ProductRepository()

    async def list_products(
        self,
        db: AsyncSession,
        *,
        skip: int = 0,
        limit: int = 20,
        category_id: UUID | None = None,
        artisan_id: UUID | None = None,
        min_price=None,
        max_price=None,
        is_active: bool | None = True,
        is_featured: bool | None = None,
        status_value: str | None = "Approved",
    ):
        products = await self.repository.list(
            db,
            skip=skip,
            limit=limit,
            category_id=category_id,
            artisan_id=artisan_id,
            is_active=is_active,
            is_featured=is_featured,
            status=status_value,
        )

        total = await self.repository.count(
            db,
            category_id=category_id,
            artisan_id=artisan_id,
            is_active=is_active,
            is_featured=is_featured,
            status=status_value,
        )

        if min_price is not None:
            products = [
                product for product in products
                if product.price >= min_price
            ]

        if max_price is not None:
            products = [
                product for product in products
                if product.price <= max_price
            ]

        return products, total

    async def get_product(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> Product:
        product = await self.repository.get_by_id(db, product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        return product

    async def get_product_by_slug(
        self,
        db: AsyncSession,
        slug: str,
    ) -> Product:
        product = await self.repository.get_by_slug(db, slug)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        if product.status != "Approved" or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        return product

    async def _validate_category(
        self,
        db: AsyncSession,
        category_id: UUID,
    ) -> None:
        result = await db.execute(
            select(Category).where(
                Category.id == category_id,
                Category.is_active.is_(True),
            )
        )

        category = result.scalar_one_or_none()

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found or inactive",
            )

    async def _get_current_artisan(
        self,
        db: AsyncSession,
        user_id: UUID,
    ) -> Artisan:
        result = await db.execute(
            select(Artisan).where(
                Artisan.user_id == user_id,
                Artisan.is_active.is_(True),
            )
        )

        artisan = result.scalar_one_or_none()

        if artisan is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Active artisan profile required",
            )

        return artisan

    async def create_product(
        self,
        db: AsyncSession,
        current_user,
        data: ProductCreate,
    ) -> Product:

        artisan = await self._get_current_artisan(
            db,
            current_user.id,
        )

        await self._validate_category(
            db,
            data.category_id,
        )

        existing_slug = await self.repository.get_by_slug(
            db,
            data.slug,
        )

        if existing_slug:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Product slug already exists",
            )

        existing_sku = await self.repository.get_by_sku(
            db,
            data.sku,
        )

        if existing_sku:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Product SKU already exists",
            )

        if (
            data.compare_at_price is not None
            and data.compare_at_price <= data.price
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Compare-at price must be greater than product price",
            )

        product = Product(
            artisan_id=artisan.id,
            category_id=data.category_id,
            name=data.name,
            slug=data.slug,
            description=data.description,
            price=data.price,
            compare_at_price=data.compare_at_price,
            sku=data.sku,
            material=data.material,
            dimensions=data.dimensions,
            craft_region=data.craft_region,
            status="Draft",
            is_active=False,
            is_featured=False,
        )

        return await self.repository.create(
            db,
            product,
        )

    async def list_my_products(
        self,
        db: AsyncSession,
        current_user,
        *,
        skip: int = 0,
        limit: int = 50,
        status_value: str | None = None,
    ):
        artisan = await self._get_current_artisan(
            db,
            current_user.id,
        )

        products = await self.repository.list_by_artisan(
            db,
            artisan_id=artisan.id,
            skip=skip,
            limit=limit,
            status=status_value,
        )

        total = await self.repository.count_by_artisan(
            db,
            artisan_id=artisan.id,
            status=status_value,
        )

        return products, total

    async def update_product(
        self,
        db: AsyncSession,
        product_id: UUID,
        data: ProductUpdate,
    ) -> Product:

        product = await self.get_product(
            db,
            product_id,
        )

        if product.status == "Pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Pending product cannot be edited until moderation is completed",
            )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if "category_id" in update_data:
            await self._validate_category(
                db,
                update_data["category_id"],
            )

        if "slug" in update_data:
            existing_slug = await self.repository.get_by_slug(
                db,
                update_data["slug"],
            )

            if existing_slug and existing_slug.id != product.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Product slug already exists",
                )

        if "sku" in update_data:
            existing_sku = await self.repository.get_by_sku(
                db,
                update_data["sku"],
            )

            if existing_sku and existing_sku.id != product.id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Product SKU already exists",
                )

        new_price = update_data.get(
            "price",
            product.price,
        )

        new_compare_price = update_data.get(
            "compare_at_price",
            product.compare_at_price,
        )

        if (
            new_compare_price is not None
            and new_compare_price <= new_price
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Compare-at price must be greater than product price",
            )

        for field, value in update_data.items():
            setattr(product, field, value)

        # Any artisan edit requires another review.
        if product.status in {"Approved", "Rejected"}:
            product.status = "Draft"
            product.is_active = False
            product.is_featured = False

        return await self.repository.update(
            db,
            product,
        )

    async def delete_product(
        self,
        db: AsyncSession,
        product_id: UUID,
    ) -> None:

        product = await self.get_product(
            db,
            product_id,
        )

        await self.repository.delete(
            db,
            product,
        )
    async def submit_product(
        self,
        db: AsyncSession,
        product_id: UUID,
        current_user,
    ) -> Product:
        from app.models.moderation import ModerationItem
        from app.models.product_image import ProductImage
        from app.services.moderation.service import moderation_service
        from app.schemas.moderation import (
            ModerationContentType,
            ModerationCreate,
            ModerationPriority,
        )

        artisan = await self._get_current_artisan(
            db,
            current_user.id,
        )

        product = await self.get_product(
            db,
            product_id,
        )

        if product.artisan_id != artisan.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this product",
            )

        if product.status == "Pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product is already pending approval",
            )

        if product.status == "Approved":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Approved product does not need submission",
            )

        image_result = await db.execute(
            select(ProductImage.id).where(
                ProductImage.product_id == product.id
            ).limit(1)
        )

        if image_result.scalar_one_or_none() is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least one product image is required before submission",
            )

        existing_moderation = await db.execute(
            select(ModerationItem).where(
                ModerationItem.content_type == ModerationContentType.PRODUCT.value,
                ModerationItem.content_id == str(product.id),
                ModerationItem.status == "Pending",
            )
        )

        if existing_moderation.scalar_one_or_none() is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Product already has a pending moderation request",
            )

        product.status = "Pending"
        product.is_active = False
        product.is_featured = False

        moderation_data = ModerationCreate(
            content_type=ModerationContentType.PRODUCT,
            content_id=str(product.id),
            submitted_by=current_user.id,
            title=product.name,
            description=product.description,
            image_url=(
                product.images[0].image_url
                if product.images
                else None
            ),
            priority=ModerationPriority.NORMAL,
        )

        await moderation_service.create_item(
            db,
            moderation_data,
        )

        await db.refresh(product)

        return product




