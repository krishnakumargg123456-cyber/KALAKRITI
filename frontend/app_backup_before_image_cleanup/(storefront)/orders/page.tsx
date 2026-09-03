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
import { useMemo, useState } from "react";

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Being Crafted" | "Shipped" | "Cancelled";
  items: number;
  total: number;
  image: string;
  productNames: string[];
  delivery: string;
};

const orders: Order[] = [
  {
    id: "KAL-2026-00124",
    date: "28 Aug 2026",
    status: "Being Crafted",
    items: 2,
    total: 4099,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=700&q=85",
    productNames: [
      "Hand-painted Madhubani Artwork",
      "Hand Block Printed Cotton Dupatta",
    ],
    delivery: "Expected 04 – 06 Sep 2026",
  },
  {
    id: "KAL-2026-00098",
    date: "15 Aug 2026",
    status: "Shipped",
    items: 1,
    total: 3250,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85",
    productNames: ["Handcrafted Blue Pottery Vase"],
    delivery: "Expected 02 Sep 2026",
  },
  {
    id: "KAL-2026-00061",
    date: "28 Jul 2026",
    status: "Delivered",
    items: 3,
    total: 5840,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85",
    productNames: [
      "Bagru Hand Block Printed Saree",
      "Printed Cotton Cushion Cover",
      "Handmade Textile Runner",
    ],
    delivery: "Delivered 03 Aug 2026",
  },
  {
    id: "KAL-2026-00027",
    date: "11 Jul 2026",
    status: "Delivered",
    items: 1,
    total: 2150,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=85",
    productNames: ["Traditional Dokra Figurine"],
    delivery: "Delivered 18 Jul 2026",
  },
];

const filters = ["All", "Being Crafted", "Shipped", "Delivered", "Cancelled"];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function statusStyles(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return {
        icon: CheckCircle2,
        wrapper: "bg-[#2f6b45]/10 text-[#2f6b45]",
      };
    case "Shipped":
      return {
        icon: Truck,
        wrapper: "bg-[#8b1e2d]/10 text-[#8b1e2d]",
      };
    case "Being Crafted":
      return {
        icon: Clock3,
        wrapper: "bg-[#b08a4a]/15 text-[#7b5b27]",
      };
    default:
      return {
        icon: Package,
        wrapper: "bg-[#80665d]/10 text-[#80665d]",
      };
  }
}

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" || order.status === activeFilter;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.productNames.some((name) =>
          name.toLowerCase().includes(normalizedQuery)
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
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
        {/* Search + filters */}
        <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 lg:w-80">
              <Search className="h-4 w-4 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your orders..."
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#80665d]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
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

        {/* Orders */}
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

          {filteredOrders.length > 0 ? (
            <div className="space-y-5">
              {filteredOrders.map((order) => {
                const status = statusStyles(order.status);
                const StatusIcon = status.icon;

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.04)]"
                  >
                    {/* Order top */}
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

                    {/* Order body */}
                    <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                      <div className="h-28 w-28 overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#efe4ce]">
                        <img
                          src={order.image}
                          alt={order.productNames[0]}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                          {order.items}{" "}
                          {order.items === 1 ? "Item" : "Items"}
                        </p>

                        <h3 className="mt-2 font-serif text-xl font-semibold text-[#4a211c]">
                          {order.productNames[0]}
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
                          {order.status === "Delivered" ? (
                            <CheckCircle2 className="h-4 w-4 text-[#2f6b45]" />
                          ) : (
                            <Truck className="h-4 w-4 text-[#8b1e2d]" />
                          )}

                          {order.delivery}
                        </div>
                      </div>

                      <Link
                        href={`/orders/${order.id}`}
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
                No orders found
              </h2>

              <p className="mt-2 text-sm text-[#6d5149]">
                Try changing your search or order status filter.
              </p>

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
            </div>
          )}
        </section>

        {/* Continue shopping */}
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