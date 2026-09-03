from __future__ import annotations

from decimal import Decimal
from typing import Any

from pydantic import BaseModel, ConfigDict


class DashboardSummary(BaseModel):
    total_users: int
    active_users: int
    total_customers: int
    total_artisans: int
    verified_artisans: int
    total_products: int
    active_products: int
    featured_products: int
    total_categories: int
    total_orders: int
    pending_orders: int
    processing_orders: int
    shipped_orders: int
    delivered_orders: int
    cancelled_orders: int
    returned_orders: int
    total_revenue: Decimal
    paid_revenue: Decimal
    low_stock_products: int


class SalesSummary(BaseModel):
    total_orders: int
    total_revenue: Decimal
    paid_revenue: Decimal
    average_order_value: Decimal


class StatusCount(BaseModel):
    status: str
    count: int


class RecentOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_number: str
    user_id: str
    status: str
    payment_status: str
    total_amount: Decimal
    created_at: Any


class InventorySummary(BaseModel):
    total_products_with_inventory: int
    low_stock_products: int
    out_of_stock_products: int
    total_quantity: int
    reserved_quantity: int
    available_quantity: int


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    order_status: list[StatusCount]
    sales: SalesSummary
    recent_orders: list[RecentOrder]
    inventory: InventorySummary
