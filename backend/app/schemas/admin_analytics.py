from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class AnalyticsPeriod(BaseModel):
    days: int
    start: datetime
    end: datetime


class AnalyticsSummary(BaseModel):
    revenue: Decimal
    orders: int
    customers: int
    products_sold: int
    average_order_value: Decimal
    revenue_change: float
    orders_change: float
    customers_change: float
    products_sold_change: float


class SalesTrendItem(BaseModel):
    date: datetime
    revenue: Decimal
    orders: int


class TopProductAnalytics(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    revenue: Decimal


class CategoryAnalytics(BaseModel):
    category_id: str
    category_name: str
    revenue: Decimal
    quantity: int
    percentage: Decimal


class CustomerAnalytics(BaseModel):
    new_customers: int
    returning_customers: int
    total_customers: int
    returning_rate: Decimal


class AdminAnalyticsResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    period: AnalyticsPeriod
    summary: AnalyticsSummary
    sales_trend: list[SalesTrendItem]
    top_products: list[TopProductAnalytics]
    categories: list[CategoryAnalytics]
    customers: CustomerAnalytics
