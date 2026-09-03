"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { getOrders } from "@/lib/api/orders";

type Order = {
  id: string | number;
  status?: string | null;
  total?: string | number | null;
  created_at?: string | null;
  items?: unknown[];
};

function normalizeOrders(payload: unknown): Order[] {
  if (Array.isArray(payload)) {
    return payload as Order[];
  }

  if (payload && typeof payload === "object") {
    const value = payload as Record<string, unknown>;

    if (Array.isArray(value.data)) {
      return value.data as Order[];
    }

    if (Array.isArray(value.items)) {
      return value.items as Order[];
    }

    if (
      value.data &&
      typeof value.data === "object" &&
      Array.isArray((value.data as Record<string, unknown>).items)
    ) {
      return (value.data as Record<string, unknown>)
        .items as Order[];
    }
  }

  return [];
}

function getOrderTotal(order: Order) {
  const value = Number(order.total ?? 0);
  return Number.isFinite(value) ? value : 0;
}

function getItemCount(order: Order) {
  return Array.isArray(order.items) ? order.items.length : 0;
}

function formatDate(value?: string | null) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusClasses(status?: string | null) {
  const normalized = (status ?? "").toLowerCase();

  if (normalized.includes("cancel")) {
    return "bg-red-50 text-red-700";
  }

  if (
    normalized.includes("deliver") ||
    normalized.includes("complete")
  ) {
    return "bg-green-50 text-green-700";
  }

  if (
    normalized.includes("ship") ||
    normalized.includes("dispatch")
  ) {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-amber-50 text-amber-700";
}

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setError("");

        const response = await getOrders();
        setOrders(normalizeOrders(response));
      } catch {
        setOrders([]);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            View your orders and track your handcrafted treasures.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold" />

            <p className="mt-3 text-sm text-gray-600">
              Loading your orders...
            </p>
          </section>
        ) : orders.length === 0 ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto h-12 w-12 text-gold" />

            <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Your orders will appear here once you purchase something
              from Kalakriti.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light"
            >
              <ShoppingBag className="h-5 w-5" />
              Explore Crafts
            </Link>
          </section>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const itemCount = getItemCount(order);
              const status = order.status || "Processing";

              return (
                <article
                  key={String(order.id)}
                  className="rounded-card border border-gold/30 bg-white p-6 shadow-sm transition hover:border-gold/60"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-maroon" />

                        <p className="font-semibold text-maroon">
                          Order #{order.id}
                        </p>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {formatDate(order.created_at)} · {itemCount}{" "}
                        item{itemCount !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          Total
                        </p>

                        <p className="font-semibold text-maroon">
                          ₹
                          {getOrderTotal(order).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {status}
                      </span>

                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-gold/40 px-4 py-2 text-sm font-semibold text-maroon transition hover:bg-gold/10"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
