from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.settings import AdminSettings
from app.schemas.settings import AdminSettingsUpdate


class AdminSettingsService:
    async def get_settings(
        self,
        db: AsyncSession,
    ) -> AdminSettings:
        result = await db.execute(
            select(AdminSettings)
            .order_by(AdminSettings.id.asc())
            .limit(1)
        )
        settings = result.scalar_one_or_none()

        if settings is not None:
            return settings

        settings = AdminSettings(
            marketplace_name="KALAKRITI",
            support_email="support@kalakriti.in",
            support_phone=None,
            currency="INR",
            language="English",
            timezone="Asia/Kolkata",
            order_confirmation=True,
            shipping_updates=True,
            customer_reviews=True,
            artisan_notifications=True,
            email_notifications=True,
            sms_notifications=False,
            tax_enabled=True,
            tax_rate=5,
            commission_rate=15,
            cod_enabled=True,
            razorpay_enabled=True,
            maintenance_mode=False,
            new_registrations=True,
            admin_approval=True,
        )

        db.add(settings)
        await db.commit()
        await db.refresh(settings)

        return settings

    async def update_settings(
        self,
        db: AsyncSession,
        data: AdminSettingsUpdate,
    ) -> AdminSettings:
        settings = await self.get_settings(db)

        update_data = data.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(settings, field, value)

        await db.commit()
        await db.refresh(settings)

        return settings


admin_settings_service = AdminSettingsService()
