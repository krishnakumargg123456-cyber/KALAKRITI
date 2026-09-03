from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.repositories.admin.analytics_repository import admin_analytics_repository


class AdminAnalyticsService:
    async def get_analytics(self, db, days: int = 30) -> dict:
        end = datetime.now(timezone.utc)
        start = end - timedelta(days=days)

        previous_end = start
        previous_start = previous_end - timedelta(days=days)

        current = await admin_analytics_repository.period_summary(
            db, start, end
        )
        previous = await admin_analytics_repository.period_summary(
            db, previous_start, previous_end
        )

        def percentage_change(current_value, previous_value) -> float:
            if not previous_value:
                return 100.0 if current_value else 0.0
            return float(
                ((current_value - previous_value) / previous_value) * 100
            )

        sales_trend = await admin_analytics_repository.sales_trend(
            db, start, end
        )
        top_products = await admin_analytics_repository.top_products(
            db, start, end
        )
        category_sales = await admin_analytics_repository.category_sales(
            db, start, end
        )
        customer_metrics = await admin_analytics_repository.customer_metrics(
            db, start, end
        )

        return {
            "period": {
                "days": days,
                "start": start,
                "end": end,
            },
            "summary": {
                **current,
                "revenue_change": percentage_change(
                    current["revenue"],
                    previous["revenue"],
                ),
                "orders_change": percentage_change(
                    current["orders"],
                    previous["orders"],
                ),
                "customers_change": percentage_change(
                    current["customers"],
                    previous["customers"],
                ),
                "products_sold_change": percentage_change(
                    current["products_sold"],
                    previous["products_sold"],
                ),
            },
            "sales_trend": sales_trend,
            "top_products": top_products,
            "categories": category_sales,
            "customers": customer_metrics,
        }


admin_analytics_service = AdminAnalyticsService()
