"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  IndianRupee,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

const salesData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 76 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 92 },
  { day: "Sun", value: 84 },
];

const recentOrders = [
  {
    id: "#KK-1048",
    customer: "Aarav Sharma",
    product: "Madhubani Lotus Artwork",
    amount: "â‚¹3,850",
    status: "Processing",
  },
  {
    id: "#KK-1047",
    customer: "Meera Kapoor",
    product: "Handcrafted Brass Diya Set",
    amount: "â‚¹1,240",
    status: "Shipped",
  },
  {
    id: "#KK-1046",
    customer: "Rohan Verma",
    product: "Blue Pottery Vase",
    amount: "â‚¹2,650",
    status: "Delivered",
  },
  {
    id: "#KK-1045",
    customer: "Ishita Singh",
    product: "Banarasi Silk Stole",
    amount: "â‚¹4,200",
    status: "Processing",
  },
  {
    id: "#KK-1044",
    customer: "Kabir Gupta",
    product: "Warli Folk Painting",
    amount: "â‚¹2,900",
    status: "Delivered",
  },
];

const activities = [
  {
    title: "New artisan application received",
    time: "18 minutes ago",
    icon: UserRound,
  },
  {
    title: "Order #KK-1048 requires processing",
    time: "42 minutes ago",
    icon: ShoppingBag,
  },
  {
    title: "New product submitted for review",
    time: "1 hour ago",
    icon: Package,
  },
  {
    title: "Customer left a 5-star review",
    time: "2 hours ago",
    icon: Star,
  },
];

function statusClass(status: string) {
  if (status === "Delivered") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Shipped") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function AdminDashboardPage() {
  const maxSales = Math.max(...salesData.map((item) => item.value));

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

              <p className="mt-2 text-sm text-[#806b5d]">
                A heritage marketplace overview of sales, customers, artisans
                and daily activity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative rounded-md border border-[#d5c5a8] bg-white/60 p-2.5 text-[#705b4c] hover:bg-[#f2e9d7]"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#8b2424]" />
              </button>

              <div className="hidden items-center gap-3 rounded-md border border-[#d5c5a8] bg-white/50 px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#641f20] text-sm font-semibold text-[#f8edcf]">
                  K
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#531c1d]">
                    Administrator
                  </p>
                  <p className="text-[11px] text-[#8b796b]">KALAKRITI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Revenue"
            value="â‚¹8,42,680"
            change="+12.8%"
            positive
            detail="vs. previous month"
            icon={<IndianRupee className="h-5 w-5" />}
          />

          <MetricCard
            label="Total Orders"
            value="1,284"
            change="+8.4%"
            positive
            detail="vs. previous month"
            icon={<ShoppingBag className="h-5 w-5" />}
          />

          <MetricCard
            label="Customers"
            value="6,842"
            change="+14.2%"
            positive
            detail="vs. previous month"
            icon={<Users className="h-5 w-5" />}
          />

          <MetricCard
            label="Average Rating"
            value="4.8"
            change="+0.2"
            positive
            detail="from 1,946 reviews"
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

              <select className="rounded-md border border-[#d5c5a8] bg-white/60 px-3 py-2 text-xs text-[#6e5b4e] outline-none focus:border-[#9b772d]">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
              {salesData.map((item) => {
                const height = `${(item.value / maxSales) * 100}%`;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="text-[11px] font-semibold text-[#806b5d]">
                      â‚¹{item.value}k
                    </div>

                    <div className="flex h-[82%] w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-[#8c302f] transition hover:bg-[#641f20]"
                        style={{ height }}
                      />
                    </div>

                    <span className="text-xs text-[#8b796b]">{item.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-[#e0d4bd] pt-4 text-xs text-[#806b5d]">
              <TrendingUp className="h-4 w-4 text-[#8b6828]" />
              Sales are showing a healthy upward trend this week.
            </div>
          </div>

          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_8px_30px_rgba(82,45,25,0.05)] sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                Marketplace Health
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
                Key Performance
              </h2>
            </div>

            <div className="mt-7 space-y-6">
              <ProgressMetric
                label="Order Fulfilment"
                value="94%"
                percentage={94}
              />

              <ProgressMetric
                label="Customer Satisfaction"
                value="96%"
                percentage={96}
              />

              <ProgressMetric
                label="Artisan Verification"
                value="87%"
                percentage={87}
              />

              <ProgressMetric
                label="Product Approval"
                value="91%"
                percentage={91}
              />
            </div>

            <div className="mt-7 rounded-lg border border-[#dcccae] bg-[#f5ecd9] p-4">
              <p className="text-xs font-semibold text-[#641f20]">
                Heritage Marketplace
              </p>
              <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                Every approved artisan and product contributes to preserving
                India&apos;s living craft traditions.
              </p>
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

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-[#641f20] hover:text-[#8b302f]"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y divide-[#e2d7c2]">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0e5d0] text-[#8b6828]">
                      <ShoppingBag className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#9b772d]">
                        {order.id}
                      </p>
                      <p className="truncate text-sm font-medium text-[#531c1d]">
                        {order.product}
                      </p>
                      <p className="text-xs text-[#8b796b]">
                        {order.customer}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <span className="font-semibold text-[#531c1d]">
                      {order.amount}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
            <div className="border-b border-[#ded1ba] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                Live Feed
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#531c1d]">
                Recent Activity
              </h2>
            </div>

            <div className="divide-y divide-[#e2d7c2]">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex gap-3 p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-5 text-[#5d4538]">
                        {activity.title}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-[#978577]">
                        <Clock3 className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction
            icon={<Package className="h-5 w-5" />}
            title="Products"
            detail="Manage catalogue"
          />

          <QuickAction
            icon={<Users className="h-5 w-5" />}
            title="Artisans"
            detail="Review applications"
          />

          <QuickAction
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Orders"
            detail="Track fulfilment"
          />

          <QuickAction
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
  positive,
  detail,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  detail: string;
  icon: React.ReactNode;
}) {
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

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold ${
                positive ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {change}
            </span>

            <span className="text-[11px] text-[#9a897c]">{detail}</span>
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#685548]">{label}</span>
        <span className="text-sm font-semibold text-[#641f20]">{value}</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8dcc6]">
        <div
          className="h-full rounded-full bg-[#8c302f]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      className="group flex items-center gap-4 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#b79552] hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-serif text-lg font-semibold text-[#531c1d]">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-[#8b796b]">{detail}</p>
      </div>

      <ChevronRight className="ml-auto h-4 w-4 text-[#9b8777] transition group-hover:translate-x-1 group-hover:text-[#641f20]" />
    </button>
  );
}