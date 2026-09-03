"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getOrders } from "@/lib/api/orders";

type RawOrder = Record<string, unknown>;

type Order = {
  id: string;
  routeId: string;
  date: string;
  status: string;
  items: number;
  total: number;
  image: string | null;
  productNames: string[];
  delivery: string;
};

const filters = [
  "All",
  "Being Crafted",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const fallbackImage =
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: unknown) {
  if (!value) return "Date unavailable";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function normalizeStatus(value: unknown) {
  const status = String(value ?? "Processing")
    .replace(/_/g, " ")
    .trim();

  if (!status) return "Processing";

  return status
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusStyles(status: string) {
  const normalized = status.toLowerCase();

  if (normalized.includes("deliver")) {
    return {
      icon: CheckCircle2,
      wrapper: "bg-[#2f6b45]/10 text-[#2f6b45]",
    };
  }

  if (normalized.includes("ship")) {
    return {
      icon: Truck,
      wrapper: "bg-[#8b1e2d]/10 text-[#8b1e2d]",
    };
  }

  if (
    normalized.includes("craft") ||
    normalized.includes("processing") ||
    normalized.includes("pending")
  ) {
    return {
      icon: Clock3,
      wrapper: "bg-[#b08a4a]/15 text-[#7b5b27]",
    };
  }

  return {
    icon: Package,
    wrapper: "bg-[#80665d]/10 text-[#80665d]",
  };
}

function getArray(value: unknown): RawOrder[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is RawOrder =>
      typeof item === "object" && item !== null
  );
}

function unwrapOrders(value: unknown): RawOrder[] {
  if (Array.isArray(value)) {
    return getArray(value);
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  const source = value as RawOrder;

  for (const key of ["items", "data", "results", "orders"]) {
    const nested = source[key];

    if (Array.isArray(nested)) {
      return getArray(nested);
    }
  }

  return [];
}

function normalizeOrder(raw: RawOrder): Order {
  const rawItems = getArray(
    raw.items ?? raw.order_items ?? raw.orderItems
  );

  const productNames = rawItems
    .map((item) => {
      const product =
        typeof item.product === "object" && item.product !== null
          ? (item.product as RawOrder)
          : null;

      return String(
        item.product_name ??
          item.name ??
          product?.name ??
          ""
      ).trim();
    })
    .filter(Boolean);

  const firstItem = rawItems[0];

  const firstProduct =
    firstItem &&
    typeof firstItem.product === "object" &&
    firstItem.product !== null
      ? (firstItem.product as RawOrder)
      : null;

  const firstImages = getArray(firstProduct?.images);
  const firstImage = firstImages[0];

  const image =
    (typeof firstItem?.image_url === "string"
      ? firstItem.image_url
      : null) ??
    (typeof firstItem?.product_image === "string"
      ? firstItem.product_image
      : null) ??
    (typeof firstProduct?.image_url === "string"
      ? firstProduct.image_url
      : null) ??
    (typeof firstImage?.image_url === "string"
      ? firstImage.image_url
      : null);

  const rawId = raw.id ?? raw.order_id ?? raw.uuid ?? "";
  const rawOrderNumber =
    raw.order_number ?? raw.orderNumber ?? raw.number;

  const routeId = String(rawId);

  const displayId =
    rawOrderNumber !== undefined && rawOrderNumber !== null
      ? String(rawOrderNumber)
      : routeId
        ? `Order #${routeId}`
        : "Order";

  const rawTotal =
    raw.total_amount ??
    raw.total ??
    raw.grand_total ??
    raw.amount ??
    0;

  const total = Number(rawTotal);

  const itemCount =
    rawItems.length > 0
      ? rawItems.reduce((sum, item) => {
          const quantity = Number(
            item.quantity ?? item.qty ?? 1
          );

          return sum + (Number.isFinite(quantity) ? quantity : 1);
        }, 0)
      : Number(raw.item_count ?? raw.items_count ?? 0);

  const status = normalizeStatus(
    raw.status ?? raw.order_status
  );

  const date = formatDate(
    raw.created_at ??
      raw.createdAt ??
      raw.order_date ??
      raw.date
  );

  const estimatedDelivery =
    raw.estimated_delivery ??
    raw.expected_delivery ??
    raw.delivery_date;

  const delivery =
    estimatedDelivery
      ? `Expected ${formatDate(estimatedDelivery)}`
      : status.toLowerCase().includes("deliver")
        ? "Delivered"
        : "Delivery details available in order";

  return {
    id: displayId,
    routeId,
    date,
    status,
    items: Number.isFinite(itemCount) ? itemCount : 0,
    total: Number.isFinite(total) ? total : 0,
    image,
    productNames,
    delivery,
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await getOrders();

        if (!mounted) return;

        const normalized = unwrapOrders(response)
          .map(normalizeOrder)
          .filter((order) => Boolean(order.routeId));

        setOrders(normalized);
      } catch (err) {
        console.error("Failed to load orders:", err);

        if (mounted) {
          setError(
            "We could not load your orders right now. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" ||
        order.status.toLowerCase() === activeFilter.toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.productNames.some((name) =>
          name.toLowerCase().includes(normalizedQuery)
        );

      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, query]);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Your KALAKRITI
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
            My Orders
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#6d5149]">
            Keep track of your handmade treasures, from the moment an artisan
            begins creating them to the day they arrive at your doorstep.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 lg:w-80">
              <Search className="h-4 w-4 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your orders..."
                aria-label="Search your orders"
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#80665d]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeFilter === filter
                      ? "bg-[#8b1e2d] text-[#fff8eb]"
                      : "border border-[#b08a4a]/30 bg-[#f7f0df] text-[#65443c] hover:text-[#8b1e2d]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-[#80665d]">
              Showing{" "}
              <span className="font-bold text-[#4a211c]">
                {filteredOrders.length}
              </span>{" "}
              {filteredOrders.length === 1 ? "order" : "orders"}
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] px-6 py-16 text-center">
              <Clock3 className="mx-auto h-9 w-9 animate-pulse text-[#8b1e2d]" />

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                Loading your orders
              </h2>

              <p className="mt-2 text-sm text-[#6d5149]">
                Gathering your KALAKRITI order history.
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#8b1e2d]/25 bg-[#fbf6e9] px-6 py-16 text-center">
              <Package className="mx-auto h-9 w-9 text-[#8b1e2d]" />

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                Orders unavailable
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d5149]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
              >
                Try Again
              </button>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-5">
              {filteredOrders.map((order) => {
                const status = getStatusStyles(order.status);
                const StatusIcon = status.icon;

                return (
                  <article
                    key={order.routeId}
                    className="overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.04)]"
                  >
                    <div className="flex flex-col gap-4 border-b border-[#b08a4a]/20 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                            {order.id}
                          </h2>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${status.wrapper}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {order.status}
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs text-[#80665d]">
                          Placed on {order.date}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#80665d]">
                          Order Total
                        </p>

                        <p className="mt-1 font-serif text-xl font-semibold text-[#8b1e2d]">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                      <div className="h-28 w-28 overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#efe4ce]">
                        {order.image ? (
                          <img
                            src={order.image}
                            alt={order.productNames[0] || "Order item"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src={fallbackImage}
                            alt="KALAKRITI handmade product"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                          {order.items}{" "}
                          {order.items === 1 ? "Item" : "Items"}
                        </p>

                        <h3 className="mt-2 font-serif text-xl font-semibold text-[#4a211c]">
                          {order.productNames[0] || "KALAKRITI Order"}
                        </h3>

                        {order.productNames.length > 1 && (
                          <p className="mt-1 text-sm text-[#80665d]">
                            + {order.productNames.length - 1} more{" "}
                            {order.productNames.length - 1 === 1
                              ? "item"
                              : "items"}
                          </p>
                        )}

                        <div className="mt-4 flex items-center gap-2 text-xs text-[#6d5149]">
                          {order.status.toLowerCase().includes("deliver") ? (
                            <CheckCircle2 className="h-4 w-4 text-[#2f6b45]" />
                          ) : (
                            <Truck className="h-4 w-4 text-[#8b1e2d]" />
                          )}

                          {order.delivery}
                        </div>
                      </div>

                      <Link
                        href={`/orders/${order.routeId}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/30 px-5 py-3 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d]/5"
                      >
                        View Order
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-16 text-center">
              <Package className="mx-auto h-9 w-9 text-[#8b1e2d]" />

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                {orders.length === 0
                  ? "No orders yet"
                  : "No orders found"}
              </h2>

              <p className="mt-2 text-sm text-[#6d5149]">
                {orders.length === 0
                  ? "Your handmade treasures will appear here after you place your first order."
                  : "Try changing your search or order status filter."}
              </p>

              {orders.length === 0 ? (
                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
                >
                  Explore the Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("All");
                  }}
                  className="mt-5 text-sm font-bold text-[#8b1e2d]"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#8b1e2d]">
          <div className="flex flex-col gap-6 px-7 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Discover More
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#fff8eb] sm:text-3xl">
                Find something beautiful for your home
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#f1dfc9]">
                Explore authentic handmade pieces created by artisan
                communities across India.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
