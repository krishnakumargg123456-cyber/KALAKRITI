"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  PackageCheck,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

type Order = {
  id: number;
  order_number: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  payment_status: string;
  date: string;
};

const initialOrders: Order[] = [];

const statusClasses: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-orange-100 text-orange-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.order_number
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const updateStatus = (
    id: number,
    status: OrderStatus
  ) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Orders
          </h1>

          <p className="mt-2 text-[#765f45]">
            Monitor and manage customer orders.
          </p>
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Orders", orders.length],
            [
              "Pending",
              orders.filter((o) => o.status === "pending").length,
            ],
            [
              "Processing",
              orders.filter((o) => o.status === "processing").length,
            ],
            [
              "Delivered",
              orders.filter((o) => o.status === "delivered").length,
            ],
          ].map(([title, value]) => (
            <div
              key={String(title)}
              className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5"
            >
              <p className="text-sm text-[#765f45]">
                {title}
              </p>

              <p className="mt-2 text-3xl font-bold text-[#641f2b]">
                {value}
              </p>
            </div>
          ))}
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
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b]"
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
            <table className="w-full min-w-[950px] text-left">
              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Order</th>
                  <th className="px-3 py-4">Customer</th>
                  <th className="px-3 py-4">Amount</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Payment</th>
                  <th className="px-3 py-4">Date</th>
                  <th className="px-3 py-4 text-right">Actions</th>
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
                      ?{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          statusClasses[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-3 py-4 capitalize text-[#765f45]">
                      {order.payment_status}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {order.date}
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          title="View order"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Eye size={17} />
                        </button>

                        {order.status === "pending" && (
                          <button
                            title="Process order"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "processing"
                              )
                            }
                            className="rounded-lg border border-[#d8c8a8] p-2 text-blue-700 hover:bg-blue-50"
                          >
                            <PackageCheck size={17} />
                          </button>
                        )}

                        {order.status === "processing" && (
                          <button
                            title="Ship order"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "shipped"
                              )
                            }
                            className="rounded-lg border border-[#d8c8a8] p-2 text-purple-700 hover:bg-purple-50"
                          >
                            <Truck size={17} />
                          </button>
                        )}

                        {order.status === "shipped" && (
                          <button
                            title="Mark delivered"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "delivered"
                              )
                            }
                            className="rounded-lg border border-[#d8c8a8] p-2 text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle size={17} />
                          </button>
                        )}

                        {(order.status === "pending" ||
                          order.status === "processing") && (
                          <button
                            title="Cancel order"
                            onClick={() =>
                              updateStatus(
                                order.id,
                                "cancelled"
                              )
                            }
                            className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                          >
                            <XCircle size={17} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <PackageCheck
                        size={40}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No orders found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Orders will appear here after the final API connection.
                      </p>
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
