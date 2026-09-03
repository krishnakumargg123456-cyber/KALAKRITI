"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  IndianRupee,
  Package,
  RefreshCw,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  adminAnalyticsApi,
  type AdminAnalytics,
} from "@/lib/api/admin-analytics";

const periods = [7, 30, 90, 365];

function money(value: string | number) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

function number(value: number) {
  return Number(value || 0).toLocaleString("en-IN");
}

function changeText(value: number) {
  const rounded = Math.abs(value).toFixed(1);
  return `${value >= 0 ? "+" : "-"}${rounded}%`;
}

function Change({ value }: { value: number }) {
  const positive = value >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        positive ? "text-green-700" : "text-red-700"
      }`}
    >
      {positive ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
      {changeText(value)}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: typeof IndianRupee;
  label: string;
  value: string;
  change: number;
}) {
  return (
    <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#725f4a]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#4b1720]">{value}</p>
        </div>

        <div className="rounded-xl border border-[#d9c8a4] bg-[#f5ead2] p-3 text-[#7d2431]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4">
        <Change value={change} />
        <span className="ml-1 text-xs text-[#8a7965]">vs previous period</span>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAnalytics(selectedDays = days) {
    try {
      setLoading(true);
      setError("");

      const response = await adminAnalyticsApi.get(selectedDays);
      setData(response.data);
    } catch (err) {
      console.error("Analytics loading error:", err);
      setError("Unable to load analytics right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAnalytics(days);
  }, [days]);

  const maxRevenue = useMemo(() => {
    if (!data?.sales_trend.length) return 0;

    return Math.max(
      ...data.sales_trend.map((item) => Number(item.revenue || 0)),
      1,
    );
  }, [data]);

  const topCategoryRevenue = useMemo(() => {
    if (!data?.categories.length) return 0;

    return Math.max(
      ...data.categories.map((item) => Number(item.revenue || 0)),
      1,
    );
  }, [data]);

  return (
    <main className="min-h-screen bg-[#f4ecd9] px-4 py-8 text-[#3f3028] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a6b25]">
              Kalakriti Administration
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-[#4b1720]">
              Analytics
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#725f4a]">
              Real marketplace performance from orders, customers and product
              sales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {periods.map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setDays(period)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  days === period
                    ? "border-[#7d2431] bg-[#7d2431] text-white"
                    : "border-[#cdbb98] bg-[#fffaf0] text-[#5e4638] hover:border-[#7d2431]"
                }`}
              >
                {period} days
              </button>
            ))}

            <button
              type="button"
              onClick={() => void loadAnalytics(days)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-[#cdbb98] bg-[#fffaf0] px-4 py-2 text-sm font-semibold text-[#5e4638] disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            {error}
            <button
              type="button"
              onClick={() => void loadAnalytics(days)}
              className="ml-3 font-bold underline"
            >
              Try again
            </button>
          </div>
        ) : null}

        {loading && !data ? (
          <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-12 text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[#7d2431]" />
            <p className="mt-4 text-sm text-[#725f4a]">
              Loading real analytics...
            </p>
          </div>
        ) : data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={IndianRupee}
                label="Revenue"
                value={money(data.summary.revenue)}
                change={data.summary.revenue_change}
              />
              <StatCard
                icon={ShoppingBag}
                label="Orders"
                value={number(data.summary.orders)}
                change={data.summary.orders_change}
              />
              <StatCard
                icon={Users}
                label="Customers"
                value={number(data.summary.customers)}
                change={data.summary.customers_change}
              />
              <StatCard
                icon={Package}
                label="Products Sold"
                value={number(data.summary.products_sold)}
                change={data.summary.products_sold_change}
              />
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
              <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#4b1720]">
                      Sales Trend
                    </h2>
                    <p className="mt-1 text-xs text-[#8a7965]">
                      Paid orders during the selected period
                    </p>
                  </div>
                  <BarChart3 className="h-5 w-5 text-[#9a6b25]" />
                </div>

                {data.sales_trend.length ? (
                  <div className="mt-8 flex h-64 items-end gap-1 overflow-x-auto pb-7">
                    {data.sales_trend.map((item) => {
                      const revenue = Number(item.revenue || 0);
                      const height = Math.max(
                        (revenue / maxRevenue) * 100,
                        revenue > 0 ? 3 : 0,
                      );

                      return (
                        <div
                          key={item.date}
                          className="group relative flex min-w-[12px] flex-1 items-end"
                          title={`${new Date(item.date).toLocaleDateString(
                            "en-IN",
                          )}: ${money(revenue)} • ${item.orders} orders`}
                        >
                          <div
                            className="w-full rounded-t-md bg-[#8a2836] transition group-hover:bg-[#651d28]"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center text-sm text-[#8a7965]">
                    No paid sales in this period.
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#4b1720]">
                  Order Economics
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-[#e1d4b9] bg-[#f8f0df] p-4">
                    <p className="text-xs text-[#806e5a]">
                      Average Order Value
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[#4b1720]">
                      {money(data.summary.average_order_value)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#e1d4b9] bg-[#f8f0df] p-4">
                    <p className="text-xs text-[#806e5a]">
                      New Customers
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[#4b1720]">
                      {number(data.customers.new_customers)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#e1d4b9] bg-[#f8f0df] p-4">
                    <p className="text-xs text-[#806e5a]">
                      Returning Customers
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[#4b1720]">
                      {number(data.customers.returning_customers)}
                    </p>
                    <p className="mt-1 text-xs text-[#8a7965]">
                      {Number(data.customers.returning_rate || 0).toFixed(1)}%
                      of period customers
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#4b1720]">
                  Top Products
                </h2>

                <div className="mt-5 space-y-3">
                  {data.top_products.length ? (
                    data.top_products.map((product, index) => (
                      <div
                        key={`${product.product_id}-${index}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[#e1d4b9] bg-[#f8f0df] p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#4b1720]">
                            {index + 1}. {product.product_name}
                          </p>
                          <p className="mt-1 text-xs text-[#806e5a]">
                            {number(product.quantity)} units sold
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-bold text-[#7d2431]">
                          {money(product.revenue)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-sm text-[#8a7965]">
                      No product sales in this period.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[#d9c8a4] bg-[#fffaf0] p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#4b1720]">
                  Category Performance
                </h2>

                <div className="mt-5 space-y-4">
                  {data.categories.length ? (
                    data.categories.map((category) => {
                      const revenue = Number(category.revenue || 0);
                      const width = Math.max(
                        (revenue / topCategoryRevenue) * 100,
                        revenue > 0 ? 2 : 0,
                      );

                      return (
                        <div key={category.category_id}>
                          <div className="mb-1 flex justify-between gap-4 text-sm">
                            <span className="font-semibold text-[#4b1720]">
                              {category.category_name}
                            </span>
                            <span className="text-[#725f4a]">
                              {Number(category.percentage || 0).toFixed(1)}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-[#eadfc8]">
                            <div
                              className="h-full rounded-full bg-[#9a6b25]"
                              style={{ width: `${width}%` }}
                            />
                          </div>

                          <div className="mt-1 flex justify-between text-xs text-[#8a7965]">
                            <span>{number(category.quantity)} units</span>
                            <span>{money(revenue)}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center text-sm text-[#8a7965]">
                      No category sales in this period.
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="mt-6 rounded-2xl border border-[#d9c8a4] bg-[#4b1720] p-5 text-sm text-[#f7ecd5]">
              Analytics period:{" "}
              <strong>
                {new Date(data.period.start).toLocaleDateString("en-IN")}
              </strong>{" "}
              to{" "}
              <strong>
                {new Date(data.period.end).toLocaleDateString("en-IN")}
              </strong>
              . Revenue is calculated from paid orders.
              <Link
                href="/admin/dashboard"
                className="ml-2 font-semibold text-[#e8c77d] underline underline-offset-4"
              >
                Back to dashboard
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}






