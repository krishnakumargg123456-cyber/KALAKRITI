"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/api/client";

type ApiOrderItem = {
  id?: string;
  product_id?: string;
  product_name?: string;
  name?: string;
  quantity?: number;
  unit_price?: number;
  price?: number;
  total_price?: number;
};

type ApiOrder = {
  id: string;
  order_number?: string;
  status?: string;
  total_amount?: number;
  total?: number;
  amount?: number;
  created_at?: string;
  customer?: {
    name?: string;
    full_name?: string;
  } | null;
  user?: {
    name?: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
  } | null;
  customer_name?: string;
  items?: ApiOrderItem[];
  order_items?: ApiOrderItem[];
};

type OrderResponse =
  | ApiOrder[]
  | {
      items?: ApiOrder[];
      orders?: ApiOrder[];
      total?: number;
    };

function getOrders(data: OrderResponse): ApiOrder[] {
  if (Array.isArray(data)) {
    return data;
  }

  return data.items ?? data.orders ?? [];
}

function getCustomerName(order: ApiOrder) {
  if (order.customer?.name) return order.customer.name;
  if (order.customer?.full_name) return order.customer.full_name;

  if (order.user?.name) return order.user.name;
  if (order.user?.full_name) return order.user.full_name;

  if (order.user?.first_name || order.user?.last_name) {
    return `${order.user.first_name ?? ""} ${
      order.user.last_name ?? ""
    }`.trim();
  }

  return order.customer_name || "Customer";
}

function getProductName(order: ApiOrder) {
  const items = order.items ?? order.order_items ?? [];

  if (items.length === 0) {
    return "Multiple products";
  }

  const first = items[0];

  const name =
    first.product_name ||
    first.name ||
    "Product";

  if (items.length === 1) {
    return name;
  }

  return `${name} + ${items.length - 1} more`;
}

function getAmount(order: ApiOrder) {
  return Number(
    order.total_amount ??
      order.total ??
      order.amount ??
      0
  );
}

function normalizeStatus(status?: string) {
  if (!status) return "Processing";

  const value = status.toLowerCase().replace(/[_-]/g, " ");

  if (
    value.includes("deliver") ||
    value === "completed"
  ) {
    return "Delivered";
  }

  if (
    value.includes("ship") ||
    value.includes("dispatch")
  ) {
    return "Shipped";
  }

  if (
    value.includes("cancel") ||
    value.includes("refund")
  ) {
    return "Cancelled";
  }

  if (
    value.includes("pending") ||
    value.includes("confirm") ||
    value.includes("process") ||
    value.includes("paid")
  ) {
    return "Processing";
  }

  return status;
}

function getOrderNumber(order: ApiOrder) {
  return order.order_number
    ? `#${order.order_number}`
    : `#${order.id.slice(0, 8).toUpperCase()}`;
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Delivered") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  if (status === "Shipped") {
    return <Truck className="h-4 w-4" />;
  }

  return <Clock3 className="h-4 w-4" />;
}

export default function ArtisanOrdersPage() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<OrderResponse>(
        "/artisan/orders",
        {
          params: {
            limit: 100,
          },
        }
      );

      setOrders(getOrders(response.data));
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const normalizedOrders = useMemo(
    () =>
      orders.map((order) => ({
        ...order,
        displayStatus: normalizeStatus(order.status),
      })),
    [orders]
  );

  const newOrders = normalizedOrders.filter(
    (order) =>
      order.displayStatus === "Processing"
  ).length;

  const processingOrders = normalizedOrders.filter(
    (order) =>
      order.displayStatus === "Processing"
  ).length;

  const completedOrders = normalizedOrders.filter(
    (order) =>
      order.displayStatus === "Delivered"
  ).length;

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Orders
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Track customer orders and fulfilment.
        </p>

        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={loadOrders}
              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat
            title="New Orders"
            value={loading ? "—" : newOrders}
          />

          <Stat
            title="Processing"
            value={loading ? "—" : processingOrders}
          />

          <Stat
            title="Completed"
            value={loading ? "—" : completedOrders}
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-brown/60">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                Loading orders...
              </div>
            </div>
          ) : normalizedOrders.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <Package className="h-7 w-7" />
              </div>

              <h2 className="mt-4 font-serif text-xl font-semibold text-maroon">
                No orders yet
              </h2>

              <p className="mt-2 text-sm text-brown/60">
                Customer orders for your products will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead className="border-b border-border bg-cream">
                  <tr>
                    <th className="px-5 py-4 text-sm">
                      Order
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Product
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {normalizedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-4 font-semibold text-maroon">
                        {getOrderNumber(order)}
                      </td>

                      <td className="px-5 py-4 text-sm text-brown">
                        {getCustomerName(order)}
                      </td>

                      <td className="px-5 py-4 text-sm text-brown/70">
                        {getProductName(order)}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-brown">
                        ₹
                        {getAmount(order).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            normalizeStatus(order.status) ===
                            "Cancelled"
                              ? "bg-red-50 text-red-700"
                              : "bg-gold/10 text-maroon"
                          }`}
                        >
                          <StatusIcon
                            status={normalizeStatus(order.status)}
                          />
                          {normalizeStatus(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-paper p-5">
      <Package className="h-5 w-5 text-gold" />

      <p className="mt-3 text-sm text-brown/60">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-maroon">
        {value}
      </p>
    </div>
  );
}
