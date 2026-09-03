"use client";

import { useEffect, useState } from "react";
import { adminApi, AdminDashboard } from "@/lib/api/admin/dashboard";

const money = (value: string | number) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN")}`;

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5 shadow-sm">
    <p className="text-sm text-[#765f45]">{title}</p>
    <p className="mt-2 text-2xl font-bold text-[#641f2b]">{value}</p>
  </div>
);

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await adminApi.dashboard();

        if (!mounted) return;

        setData(response.data);
      } catch (err) {
        if (!mounted) return;

        console.error("Failed to load admin dashboard:", err);
        setData(null);
        setError("Unable to load admin dashboard.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5eddd] p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-8 h-10 w-72 rounded bg-[#dfd0b5]" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl bg-[#dfd0b5]"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-[#f5eddd] p-8">
        <div className="mx-auto max-w-7xl rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-8">
          <h1 className="text-2xl font-bold text-[#641f2b]">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-[#765f45]">
            {error || "No dashboard data available."}
          </p>
        </div>
      </main>
    );
  }

  const { summary, sales, inventory, recent_orders, order_status } = data;

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-[#765f45]">
            Manage the marketplace, artisans, products, orders and inventory.
          </p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value={summary.total_users} />
          <StatCard title="Active Users" value={summary.active_users} />
          <StatCard title="Artisans" value={summary.total_artisans} />
          <StatCard
            title="Verified Artisans"
            value={summary.verified_artisans}
          />
          <StatCard title="Products" value={summary.total_products} />
          <StatCard
            title="Active Products"
            value={summary.active_products}
          />
          <StatCard title="Categories" value={summary.total_categories} />
          <StatCard title="Total Orders" value={summary.total_orders} />
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard title="Total Revenue" value={money(sales.total_revenue)} />
          <StatCard title="Paid Revenue" value={money(sales.paid_revenue)} />
          <StatCard
            title="Average Order Value"
            value={money(sales.average_order_value)}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
            <h2 className="text-xl font-bold text-[#641f2b]">
              Order Status
            </h2>

            <div className="mt-5 space-y-3">
              {order_status.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between border-b border-[#eadfc9] pb-3"
                >
                  <span className="capitalize text-[#765f45]">
                    {item.status.toLowerCase()}
                  </span>

                  <span className="font-bold text-[#641f2b]">
                    {item.count}
                  </span>
                </div>
              ))}

              {order_status.length === 0 && (
                <p className="py-4 text-sm text-[#765f45]">
                  No order status data available.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
            <h2 className="text-xl font-bold text-[#641f2b]">
              Inventory
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <StatCard
                title="With Inventory"
                value={inventory.total_products_with_inventory}
              />

              <StatCard
                title="Low Stock"
                value={inventory.low_stock_products}
              />

              <StatCard
                title="Out of Stock"
                value={inventory.out_of_stock_products}
              />

              <StatCard
                title="Available Qty"
                value={inventory.available_quantity}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <h2 className="text-xl font-bold text-[#641f2b]">
            Recent Orders
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-3">Order</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Payment</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {recent_orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#eadfc9]"
                  >
                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      {order.order_number}
                    </td>

                    <td className="px-3 py-4 capitalize text-[#765f45]">
                      {order.status.toLowerCase()}
                    </td>

                    <td className="px-3 py-4 capitalize text-[#765f45]">
                      {order.payment_status.toLowerCase()}
                    </td>

                    <td className="px-3 py-4 font-semibold">
                      {money(order.total_amount)}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}

                {recent_orders.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-[#765f45]"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
