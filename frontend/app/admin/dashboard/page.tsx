"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  IndianRupee,
  Loader2,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  UserRound,
  Users,
  AlertCircle,
} from "lucide-react";
import { adminAnalyticsApi } from "@/lib/api/admin-analytics";

type DashboardData = {
  total_revenue?: number | string;
  revenue?: number | string;
  total_orders?: number;
  orders_count?: number;
  total_customers?: number;
  customers_count?: number;
  total_users?: number;
  average_rating?: number | string;
  rating?: number | string;
  total_reviews?: number;
  reviews_count?: number;
  revenue_change?: number | string;
  orders_change?: number | string;
  customers_change?: number | string;
  rating_change?: number | string;
  weekly_sales?: Array<{
    day?: string;
    value?: number | string;
    amount?: number | string;
  }>;
  sales?: Array<{
    day?: string;
    value?: number | string;
    amount?: number | string;
  }>;
  recent_orders?: Array<{
    id?: string;
    order_number?: string;
    customer_name?: string;
    customer?: string;
    product_name?: string;
    product?: string;
    total_amount?: number | string;
    amount?: number | string;
    status?: string;
  }>;
  orders?: Array<{
    id?: string;
    order_number?: string;
    customer_name?: string;
    customer?: string;
    product_name?: string;
    product?: string;
    total_amount?: number | string;
    amount?: number | string;
    status?: string;
  }>;
  activities?: Array<{
    title?: string;
    description?: string;
    action?: string;
    time?: string;
    created_at?: string;
    type?: string;
  }>;
  recent_activity?: Array<{
    title?: string;
    description?: string;
    action?: string;
    time?: string;
    created_at?: string;
    type?: string;
  }>;
};

function toNumber(value: unknown) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function money(value: unknown) {
  return `₹${toNumber(value).toLocaleString("en-IN")}`;
}

function formatChange(value: unknown) {
  const number = toNumber(value);

  if (!value && value !== 0) {
    return null;
  }

  return `${number >= 0 ? "+" : ""}${number.toFixed(1)}%`;
}

function statusClass(status: string) {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("deliver") ||
    normalized.includes("complete")
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    normalized.includes("ship") ||
    normalized.includes("transit")
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (
    normalized.includes("cancel") ||
    normalized.includes("reject")
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function formatStatus(status: string) {
  if (!status) return "Unknown";

  return status
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value: string | undefined) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const response = await adminAnalyticsApi.get(30);

        if (mounted) {
          setData((response?.data ?? response ?? {}) as DashboardData);
        }
      } catch (err: any) {
        if (mounted) {
          setError(
            err?.response?.data?.detail ||
              "Unable to load the administration dashboard."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const revenue = data?.total_revenue ?? data?.revenue ?? 0;
  const orders =
    data?.total_orders ?? data?.orders_count ?? 0;
  const customers =
    data?.total_customers ??
    data?.customers_count ??
    data?.total_users ??
    0;
  const rating = data?.average_rating ?? data?.rating ?? 0;
  const reviewCount =
    data?.total_reviews ?? data?.reviews_count ?? 0;

  const salesData = useMemo(() => {
    const source = data?.weekly_sales ?? data?.sales ?? [];

    return source.map((item) => ({
      day: item.day || "—",
      value: toNumber(item.value ?? item.amount),
    }));
  }, [data]);

  const recentOrders = useMemo(() => {
    const source = data?.recent_orders ?? data?.orders ?? [];

    return source.slice(0, 5);
  }, [data]);

  const activities = useMemo(() => {
    return (
      data?.activities ??
      data?.recent_activity ??
      []
    ).slice(0, 6);
  }, [data]);

  const maxSales = Math.max(
    1,
    ...salesData.map((item) => item.value)
  );

  const revenueChange = formatChange(data?.revenue_change);
  const ordersChange = formatChange(data?.orders_change);
  const customersChange = formatChange(data?.customers_change);
  const ratingChange = formatChange(data?.rating_change);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f0df]">
        <div className="flex items-center gap-3 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] px-6 py-5 text-sm text-[#806b5d] shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-[#8b6828]" />
          Loading administration dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <BarChart3 className="h-4 w-4" />
                Administration
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                A live marketplace overview powered by verified
                administration data.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/notifications"
                aria-label="Notifications"
                className="relative rounded-md border border-[#d5c5a8] bg-white/60 p-2.5 text-[#705b4c] transition hover:bg-[#f2e9d7]"
              >
                <Bell className="h-5 w-5" />
              </Link>

              <div className="hidden items-center gap-3 rounded-md border border-[#d5c5a8] bg-white/50 px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#641f20] text-sm font-semibold text-[#f8edcf]">
                  K
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#531c1d]">
                    Administrator
                  </p>

                  <p className="text-[11px] text-[#8b796b]">
                    KALAKRITI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Dashboard data unavailable
              </p>

              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Revenue"
            value={money(revenue)}
            change={revenueChange}
            detail="Backend dashboard data"
            icon={<IndianRupee className="h-5 w-5" />}
          />

          <MetricCard
            label="Total Orders"
            value={toNumber(orders).toLocaleString("en-IN")}
            change={ordersChange}
            detail="Backend dashboard data"
            icon={<ShoppingBag className="h-5 w-5" />}
          />

          <MetricCard
            label="Customers"
            value={toNumber(customers).toLocaleString("en-IN")}
            change={customersChange}
            detail="Backend dashboard data"
            icon={<Users className="h-5 w-5" />}
          />

          <MetricCard
            label="Average Rating"
            value={
              rating
                ? toNumber(rating).toFixed(1)
                : "—"
            }
            change={ratingChange}
            detail={
              reviewCount
                ? `from ${toNumber(reviewCount).toLocaleString("en-IN")} reviews`
                : "Review data available from backend"
            }
            icon={<Star className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_8px_30px_rgba(82,45,25,0.05)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                  Revenue Overview
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
                  Weekly Sales
                </h2>
              </div>

              <span className="rounded-md border border-[#d5c5a8] bg-white/60 px-3 py-2 text-xs text-[#6e5b4e]">
                Backend data
              </span>
            </div>

            {salesData.length > 0 ? (
              <>
                <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
                  {salesData.map((item, index) => {
                    const height = `${Math.max(
                      4,
                      (item.value / maxSales) * 100
                    )}%`;

                    return (
                      <div
                        key={`${item.day}-${index}`}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                      >
                        <div className="text-[11px] font-semibold text-[#806b5d]">
                          {money(item.value)}
                        </div>

                        <div className="flex h-[82%] w-full items-end">
                          <div
                            className="w-full rounded-t-md bg-[#8c302f] transition hover:bg-[#641f20]"
                            style={{ height }}
                            title={`${item.day}: ${money(item.value)}`}
                          />
                        </div>

                        <span className="text-xs text-[#8b796b]">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-[#e0d4bd] pt-4 text-xs text-[#806b5d]">
                  <TrendingUp className="h-4 w-4 text-[#8b6828]" />
                  Sales shown from the verified dashboard response.
                </div>
              </>
            ) : (
              <EmptyPanel
                icon={<TrendingUp className="h-6 w-6" />}
                text="Weekly sales data is not available in the dashboard response."
              />
            )}
          </div>

          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_8px_30px_rgba(82,45,25,0.05)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
              Marketplace Health
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
              Verified Metrics
            </h2>

            <div className="mt-7 rounded-lg border border-[#dcccae] bg-[#f5ecd9] p-5">
              <p className="font-serif text-lg font-semibold text-[#641f20]">
                Data integrity first
              </p>

              <p className="mt-2 text-xs leading-5 text-[#806b5d]">
                Operational percentages are displayed only when the
                backend supplies them. No estimated fulfilment,
                satisfaction or approval percentages are fabricated.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <HealthItem
                label="Orders"
                value={
                  orders
                    ? toNumber(orders).toLocaleString("en-IN")
                    : "—"
                }
              />

              <HealthItem
                label="Customers"
                value={
                  customers
                    ? toNumber(customers).toLocaleString("en-IN")
                    : "—"
                }
              />

              <HealthItem
                label="Reviews"
                value={
                  reviewCount
                    ? toNumber(reviewCount).toLocaleString("en-IN")
                    : "—"
                }
              />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
            <div className="flex items-center justify-between border-b border-[#ded1ba] p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                  Commerce
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
                  Recent Orders
                </h2>
              </div>

              <Link
                href="/admin/orders"
                className="flex items-center gap-1 text-xs font-semibold text-[#641f20] hover:text-[#8b302f]"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <div className="divide-y divide-[#e2d7c2]">
                {recentOrders.map((order, index) => {
                  const orderId =
                    order.order_number ||
                    order.id ||
                    `Order ${index + 1}`;

                  const customer =
                    order.customer_name ||
                    order.customer ||
                    "Customer";

                  const product =
                    order.product_name ||
                    order.product ||
                    "Marketplace order";

                  const amount =
                    order.total_amount ?? order.amount ?? 0;

                  const orderStatus =
                    formatStatus(order.status || "");

                  return (
                    <div
                      key={`${orderId}-${index}`}
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0e5d0] text-[#8b6828]">
                          <ShoppingBag className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#9b772d]">
                            {orderId}
                          </p>

                          <p className="truncate text-sm font-medium text-[#531c1d]">
                            {product}
                          </p>

                          <p className="text-xs text-[#8b796b]">
                            {customer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <span className="font-semibold text-[#531c1d]">
                          {money(amount)}
                        </span>

                        {order.status ? (
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClass(
                              order.status
                            )}`}
                          >
                            {orderStatus}
                          </span>
                        ) : (
                          <span className="text-xs text-[#8b796b]">
                            —
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyPanel
                icon={<ShoppingBag className="h-6 w-6" />}
                text="No recent orders are available in the dashboard response."
              />
            )}
          </div>

          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
            <div className="border-b border-[#ded1ba] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                Activity
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
                Recent Activity
              </h2>
            </div>

            {activities.length > 0 ? (
              <div className="divide-y divide-[#e2d7c2]">
                {activities.map((activity, index) => (
                  <div
                    key={`${activity.title || activity.action || "activity"}-${index}`}
                    className="flex gap-3 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
                      <UserRound className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-5 text-[#5d4538]">
                        {activity.title ||
                          activity.action ||
                          activity.description ||
                          "Marketplace activity"}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-[#978577]">
                        <Clock3 className="h-3 w-3" />
                        {activity.time ||
                          formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyPanel
                icon={<Clock3 className="h-6 w-6" />}
                text="No recent activity is available in the dashboard response."
              />
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction
            href="/admin/products"
            icon={<Package className="h-5 w-5" />}
            title="Products"
            detail="Manage catalogue"
          />

          <QuickAction
            href="/admin/artisans"
            icon={<Users className="h-5 w-5" />}
            title="Artisans"
            detail="Review artisan records"
          />

          <QuickAction
            href="/admin/orders"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Orders"
            detail="Track fulfilment"
          />

          <QuickAction
            href="/admin/stories"
            icon={<CalendarDays className="h-5 w-5" />}
            title="Content"
            detail="Manage stories"
          />
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  change,
  detail,
  icon,
}: {
  label: string;
  value: string;
  change: string | null;
  detail: string;
  icon: React.ReactNode;
}) {
  const positive =
    change === null || !change.startsWith("-");

  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-2xl font-semibold text-[#531c1d]">
            {value}
          </p>

          <div className="mt-2 flex min-h-[18px] items-center gap-2">
            {change ? (
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                  positive
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                {positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}

                {change}
              </span>
            ) : (
              <span className="text-[11px] text-[#9a897c]">
                Change unavailable
              </span>
            )}

            <span className="text-[11px] text-[#9a897c]">
              {detail}
            </span>
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function HealthItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#dfd1b8] bg-[#f8efdc] px-4 py-3">
      <span className="text-xs font-medium text-[#685548]">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#641f20]">
        {value}
      </span>
    </div>
  );
}

function EmptyPanel({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
        {icon}
      </div>

      <p className="mt-4 max-w-md text-sm leading-6 text-[#806b5d]">
        {text}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#b79552] hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-serif text-lg font-semibold text-[#531c1d]">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-[#8b796b]">
          {detail}
        </p>
      </div>

      <ChevronRight className="ml-auto h-4 w-4 text-[#9b8777] transition group-hover:translate-x-1 group-hover:text-[#641f20]" />
    </Link>
  );
}


