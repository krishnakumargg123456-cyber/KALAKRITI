"use client";

import { useMemo, useState } from "react";
import {
  Search,
  PackageCheck,
  Info,
} from "lucide-react";

type Order = {
  id: string;
  order_number: string;
  customer: string;
  amount: number;
  status: string;
  payment_status: string;
  date: string;
};

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.order_number.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const countByStatus = (status: string) =>
    orders.filter((order) => order.status === status).length;

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Orders
          </h1>

          <p className="mt-2 max-w-2xl text-[#765f45]">
            Monitor customer orders using verified order records from the
            marketplace backend.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={orders.length}
          />

          <StatCard
            title="Pending"
            value={countByStatus("pending")}
          />

          <StatCard
            title="Processing"
            value={countByStatus("processing")}
          />

          <StatCard
            title="Delivered"
            value={countByStatus("delivered")}
          />
        </section>

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order or customer..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 text-[#641f2b] outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none focus:border-[#641f2b]"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Order</th>
                  <th className="px-3 py-4">Customer</th>
                  <th className="px-3 py-4">Amount</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Payment</th>
                  <th className="px-3 py-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#eadfc9]"
                  >
                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      {order.order_number}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {order.customer}
                    </td>

                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-[#eadfc9] px-3 py-1 text-xs font-semibold capitalize text-[#641f2b]">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-3 py-4 capitalize text-[#765f45]">
                      {order.payment_status}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {order.date}
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <PackageCheck
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No verified order records available
                      </p>

                      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#765f45]">
                        No order records are currently loaded in this admin
                        workspace. No sample customers, amounts, statuses or
                        fabricated order activity are displayed.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3 rounded-lg border border-[#d8c8a8] bg-[#f8f0df] p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#a27b2d]" />

            <p className="text-sm leading-6 text-[#765f45]">
              Order management actions such as processing, shipping,
              cancellation and delivery updates are intentionally not
              simulated here. They will be enabled only against a verified
              admin order-management API contract.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
      <p className="text-sm text-[#765f45]">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-[#641f2b]">
        {value}
      </p>
    </div>
  );
}
