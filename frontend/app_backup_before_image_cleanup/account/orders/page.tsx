"use client";

import Link from "next/link";
import { Package, ShoppingBag, ChevronRight } from "lucide-react";

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped";
  items: number;
  total: number;
};

const orders: Order[] = [];

export default function AccountOrdersPage() {
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

        {orders.length === 0 ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto h-12 w-12 text-gold" />

            <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Your orders will appear here once you purchase something from
              Kalakriti.
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
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-card border border-gold/30 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="font-semibold text-maroon">
                      Order #{order.id}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.date} · {order.items} item
                      {order.items !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Total
                      </p>
                      <p className="font-semibold text-maroon">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      {order.status}
                    </span>

                    <button
                      type="button"
                      className="rounded-lg p-2 text-maroon hover:bg-gold/10"
                      aria-label={`View order ${order.id}`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
