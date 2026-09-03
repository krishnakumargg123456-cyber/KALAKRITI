import api from "./client";

export type AnalyticsPeriod = {
  days: number;
  start: string;
  end: string;
};

export type AnalyticsSummary = {
  revenue: string | number;
  orders: number;
  customers: number;
  products_sold: number;
  average_order_value: string | number;
  revenue_change: number;
  orders_change: number;
  customers_change: number;
  products_sold_change: number;
};

export type SalesTrendItem = {
  date: string;
  revenue: string | number;
  orders: number;
};

export type TopProductAnalytics = {
  product_id: string;
  product_name: string;
  quantity: number;
  revenue: string | number;
};

export type CategoryAnalytics = {
  category_id: string;
  category_name: string;
  revenue: string | number;
  quantity: number;
  percentage: string | number;
};

export type CustomerAnalytics = {
  new_customers: number;
  returning_customers: number;
  total_customers: number;
  returning_rate: string | number;
};

export type AdminAnalytics = {
  period: AnalyticsPeriod;
  summary: AnalyticsSummary;
  sales_trend: SalesTrendItem[];
  top_products: TopProductAnalytics[];
  categories: CategoryAnalytics[];
  customers: CustomerAnalytics;
};

export const adminAnalyticsApi = {
  get: (days = 30) =>
    api.get<AdminAnalytics>("/admin/analytics", {
      params: { days },
    }),
};
