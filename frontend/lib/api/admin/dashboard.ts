import api from "../client";

export type DashboardSummary = {
  total_users: number;
  active_users: number;
  total_customers: number;
  total_artisans: number;
  verified_artisans: number;
  total_products: number;
  active_products: number;
  featured_products: number;
  total_categories: number;
  total_orders: number;
  pending_orders: number;
  processing_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  returned_orders: number;
  total_revenue: string | number;
  paid_revenue: string | number;
  low_stock_products: number;
};

export type AdminDashboard = {
  summary: DashboardSummary;
  order_status: {
    status: string;
    count: number;
  }[];
  sales: {
    total_orders: number;
    total_revenue: string | number;
    paid_revenue: string | number;
    average_order_value: string | number;
  };
  recent_orders: {
    id: number;
    order_number: string;
    user_id: string;
    status: string;
    payment_status: string;
    total_amount: string | number;
    created_at: string;
  }[];
  inventory: {
    total_products_with_inventory: number;
    low_stock_products: number;
    out_of_stock_products: number;
    total_quantity: number;
    reserved_quantity: number;
    available_quantity: number;
  };
};

export const adminApi = {
  dashboard: () =>
    api.get<AdminDashboard>("/admin/dashboard"),
};
