"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Box,
  ChevronRight,
  Clock3,
  IndianRupee,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

type OrderStatus = "New" | "Processing" | "Ready to Ship";

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

const orders: Order[] = [
  {
    id: "#KK-1048",
    customer: "Ananya Sharma",
    product: "Hand-Painted Madhubani Saree",
    amount: 4850,
    status: "New",
    date: "Today, 10:24 AM",
  },
  {
    id: "#KK-1046",
    customer: "Rohan Mehta",
    product: "Blue Pottery Serving Bowl",
    amount: 1850,
    status: "Processing",
    date: "Today, 08:45 AM",
  },
  {
    id: "#KK-1041",
    customer: "Meera Kapoor",
    product: "Dhokra Brass Figurine",
    amount: 3200,
    status: "Ready to Ship",
    date: "Yesterday",
  },
  {
    id: "#KK-1038",
    customer: "Arjun Verma",
    product: "Warli Folk Art Panel",
    amount: 2750,
    status: "Processing",
    date: "Yesterday",
  },
];

const sales = [42, 55, 48, 70, 63, 82, 76, 91, 68, 88, 95, 84];

const stats = [
  {
    label: "Total Sales",
    value: "₹1,84,650",
    change: "+18.4%",
    icon: IndianRupee,
  },
  {
    label: "Orders",
    value: "126",
    change: "+12.8%",
    icon: ShoppingBag,
  },
  {
    label: "Products",
    value: "34",
    change: "+4 new",
    icon: Package,
  },
  {
    label: "Customers",
    value: "98",
    change: "+9.6%",
    icon: Users,
  },
];

function statusStyle(status: OrderStatus) {
  if (status === "New") {
    return "bg-[#f5e6c5] text-[#75551e] border-[#c9a45c]/40";
  }

  if (status === "Processing") {
    return "bg-[#e8eee4] text-[#496143] border-[#91a27e]/40";
  }

  return "bg-[#eee2df] text-[#7b3533] border-[#b9877e]/40";
}

export default function ArtisanDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [notice, setNotice] = useState("");

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + order.amount, 0),
    []
  );

  const handleAction = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {notice && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-xl border border-[#c9a45c]/40 bg-[#fffaf0] px-5 py-3 text-sm font-medium text-[#531c1d] shadow-xl">
          <Bell size={17} />
          {notice}
        </div>
      )}

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-7 flex flex-col gap-5 rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
              <span className="h-px w-7 bg-[#9b772d]" />
              Artisan Studio
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#531c1d] sm:text-4xl">
              Namaste, Meera ji
            </h1>

            <p className="mt-1 text-sm text-[#806b5d]">
              Here is what is happening with your craft business today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleAction("Notifications are up to date.")}
              className="relative rounded-xl border border-[#c9a45c]/35 bg-[#f8edcf] p-3 text-[#641f20] transition hover:bg-[#f2e3bd]"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#641f20]" />
            </button>

            <button
              onClick={() => handleAction("Opening artisan profile...")}
              className="flex items-center gap-3 rounded-xl border border-[#c9a45c]/35 bg-[#fffaf0] px-3 py-2.5 transition hover:bg-[#f8edcf]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#641f20] font-serif text-lg text-[#f8edcf]">
                M
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-[#531c1d]">
                  Meera Devi
                </p>
                <p className="text-xs text-[#806b5d]">Verified Artisan</p>
              </div>
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
                    <Icon size={21} />
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-[#55704c]">
                    <TrendingUp size={13} />
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm text-[#806b5d]">{stat.label}</p>
                <p className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main content */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          {/* Sales chart */}
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={19} className="text-[#9b772d]" />
                  <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                    Sales Overview
                  </h2>
                </div>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Your shop performance over time
                </p>
              </div>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-lg border border-[#c9a45c]/40 bg-[#fffaf0] px-3 py-2 text-sm text-[#531c1d] outline-none"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>

            <div className="mt-7">
              <div className="flex h-64 items-end gap-2 border-b border-l border-[#c9a45c]/25 px-2 pb-0 sm:gap-3">
                {sales.map((height, index) => (
                  <div
                    key={index}
                    className="group relative flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-[#641f20]/85 transition-all duration-300 group-hover:bg-[#531c1d]"
                      style={{ height: `${height}%` }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[#806b5d]">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#806b5d]">
                    Revenue
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                    ₹1,84,650
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-[#55704c]">
                  <TrendingUp size={16} />
                  18.4% vs previous period
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#641f20] p-5 text-[#f8edcf] shadow-sm sm:p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#d7bd78]">
                <Star size={18} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Artisan Tools
                </span>
              </div>

              <h2 className="mt-2 font-serif text-2xl font-bold">
                Grow your craft
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#eadbb9]">
                Manage your products, orders and artisan story from one place.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Package,
                  title: "Add New Product",
                  text: "List another handmade creation",
                },
                {
                  icon: ShoppingBag,
                  title: "Manage Orders",
                  text: "Review and fulfil customer orders",
                },
                {
                  icon: Wallet,
                  title: "View Earnings",
                  text: "Track payouts and revenue",
                },
              ].map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    onClick={() => handleAction(`${action.title} selected.`)}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#d7bd78]/25 bg-[#531c1d] p-4 text-left transition hover:bg-[#722829]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8edcf] text-[#641f20]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{action.title}</p>
                      <p className="mt-0.5 text-xs text-[#decda7]">
                        {action.text}
                      </p>
                    </div>

                    <ChevronRight size={17} className="text-[#d7bd78]" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Orders + inventory */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-sm">
            <div className="flex flex-col gap-3 border-b border-[#c9a45c]/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                  Recent Orders
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Keep an eye on your latest customer orders.
                </p>
              </div>

              <button
                onClick={() => handleAction("Opening all orders...")}
                className="flex items-center gap-1 text-sm font-semibold text-[#641f20] hover:text-[#8b6828]"
              >
                View all
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="divide-y divide-[#c9a45c]/15">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setActiveOrder(order)}
                  className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-[#f8edcf]/45 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
                    <Box size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-[#531c1d]">
                        {order.id}
                      </p>
                      <span className="text-xs text-[#a28c7c]">
                        {order.date}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-[#806b5d]">
                      {order.product}
                    </p>

                    <p className="mt-1 text-xs text-[#9b772d]">
                      {order.customer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:block sm:text-right">
                    <p className="font-serif text-base font-bold text-[#531c1d]">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Shop health */}
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <Clock3 size={19} className="text-[#9b772d]" />
              <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                Shop Health
              </h2>
            </div>

            <p className="mt-1 text-sm text-[#806b5d]">
              A quick look at your artisan storefront.
            </p>

            <div className="mt-6 space-y-5">
              {[
                ["Profile completeness", 92],
                ["Product listings", 86],
                ["Order fulfilment", 97],
                ["Customer satisfaction", 96],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-[#806b5d]">{label}</span>
                    <span className="font-bold text-[#531c1d]">{value}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#eadfc8]">
                    <div
                      className="h-full rounded-full bg-[#641f20]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-[#c9a45c]/30 bg-[#f8edcf] p-4">
              <div className="flex gap-3">
                <Star size={18} className="mt-0.5 shrink-0 text-[#9b772d]" />
                <div>
                  <p className="text-sm font-semibold text-[#531c1d]">
                    Your craftsmanship shines
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                    Your shop has maintained a 4.8★ average rating this month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-[#c9a45c]/25 pt-5 text-xs text-[#806b5d] sm:flex-row sm:items-center">
          <p>
            Today&apos;s order value:{" "}
            <span className="font-semibold text-[#531c1d]">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
          </p>
          <p>Made with tradition • Crafted with pride</p>
        </div>
      </div>

      {/* Order modal */}
      {activeOrder && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[#351716]/55 p-4"
          onClick={() => setActiveOrder(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#c9a45c]/40 bg-[#fffaf0] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                  Order Details
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                  {activeOrder.id}
                </h3>
              </div>

              <button
                onClick={() => setActiveOrder(null)}
                className="rounded-lg px-3 py-1 text-2xl text-[#806b5d] hover:bg-[#f8edcf]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-[#9a8272]">Customer</p>
                <p className="mt-1 text-sm font-semibold text-[#531c1d]">
                  {activeOrder.customer}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#9a8272]">Product</p>
                <p className="mt-1 text-sm font-semibold text-[#531c1d]">
                  {activeOrder.product}
                </p>
              </div>

              <div className="flex items-center justify-between border-y border-[#c9a45c]/20 py-4">
                <div>
                  <p className="text-xs text-[#9a8272]">Order value</p>
                  <p className="mt-1 font-serif text-xl font-bold text-[#641f20]">
                    ₹{activeOrder.amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle(
                    activeOrder.status
                  )}`}
                >
                  {activeOrder.status}
                </span>
              </div>

              <button
                onClick={() => {
                  handleAction(`Order ${activeOrder.id} marked for review.`);
                  setActiveOrder(null);
                }}
                className="w-full rounded-xl bg-[#641f20] px-4 py-3 text-sm font-semibold text-[#f8edcf] transition hover:bg-[#531c1d]"
              >
                Manage This Order
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}