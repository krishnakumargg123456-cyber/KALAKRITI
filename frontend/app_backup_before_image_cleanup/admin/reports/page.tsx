"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileBarChart,
  FileText,
  IndianRupee,
  Package,
  PieChart,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

type ReportCategory = {
  title: string;
  description: string;
  icon: React.ReactNode;
  reports: string[];
};

const reportCategories: ReportCategory[] = [
  {
    title: "Sales Reports",
    description: "Revenue, orders and product performance.",
    icon: <ShoppingBag className="h-5 w-5" />,
    reports: [
      "Daily Sales Summary",
      "Monthly Sales Report",
      "Product Performance",
      "Category Sales",
    ],
  },
  {
    title: "Finance Reports",
    description: "Payments, commissions and marketplace earnings.",
    icon: <CircleDollarSign className="h-5 w-5" />,
    reports: [
      "Payment Summary",
      "Artisan Payout Report",
      "Commission Report",
      "Refund Report",
    ],
  },
  {
    title: "Customer Reports",
    description: "Customer growth, retention and purchasing activity.",
    icon: <Users className="h-5 w-5" />,
    reports: [
      "Customer Growth",
      "Repeat Customers",
      "Customer Lifetime Value",
      "Customer Orders",
    ],
  },
  {
    title: "Inventory Reports",
    description: "Stock movement and product availability.",
    icon: <Package className="h-5 w-5" />,
    reports: [
      "Current Inventory",
      "Low Stock Report",
      "Stock Movement",
      "Out of Stock Products",
    ],
  },
];

const topProducts = [
  {
    name: "Blue Pottery Tea Set",
    category: "Blue Pottery",
    sales: 128,
    revenue: 48640,
  },
  {
    name: "Banarasi Silk Dupatta",
    category: "Banarasi Weaving",
    sales: 94,
    revenue: 42300,
  },
  {
    name: "Madhubani Wall Art",
    category: "Madhubani",
    sales: 76,
    revenue: 31920,
  },
  {
    name: "Dhokra Elephant Sculpture",
    category: "Dhokra",
    sales: 61,
    revenue: 28670,
  },
  {
    name: "Hand Embroidered Kurta",
    category: "Chikankari",
    sales: 53,
    revenue: 21730,
  },
];

const monthlySales = [
  { month: "Apr", value: 58 },
  { month: "May", value: 72 },
  { month: "Jun", value: 64 },
  { month: "Jul", value: 81 },
  { month: "Aug", value: 88 },
  { month: "Sep", value: 96 },
];

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("Last 30 Days");

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
      <section className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                <FileBarChart className="h-4 w-4" />
                Business Intelligence
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Understand KALAKRITI&apos;s sales, finance, customers and
                inventory through detailed marketplace reports.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="appearance-none rounded-xl border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-4 pr-10 text-sm font-medium text-[#641f20] outline-none focus:border-[#9b772d]"
                >
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-[#641f20] px-4 py-2.5 text-sm font-semibold text-[#fff8e9] transition hover:bg-[#531c1d]"
              >
                <Download className="h-4 w-4" />
                Export All
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Net Sales"
            value="₹4,82,640"
            change="+14.6%"
            icon={<IndianRupee className="h-5 w-5" />}
            positive
          />

          <MetricCard
            label="Total Orders"
            value="1,284"
            change="+11.2%"
            icon={<ShoppingBag className="h-5 w-5" />}
            positive
          />

          <MetricCard
            label="Customers"
            value="3,842"
            change="+8.7%"
            icon={<Users className="h-5 w-5" />}
            positive
          />

          <MetricCard
            label="Average Order Value"
            value="₹3,762"
            change="+4.9%"
            icon={<TrendingUp className="h-5 w-5" />}
            positive
          />
        </section>

        {/* Sales overview */}
        <section className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Sales Overview
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Revenue performance for the selected period.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#47734a]">
                <TrendingUp className="h-4 w-4" />
                14.6% growth
              </div>
            </div>

            <div className="mt-7 flex h-64 items-end gap-3 sm:gap-5">
              {monthlySales.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="relative flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full max-w-12 rounded-t-lg bg-[#8b6828] transition hover:bg-[#641f20]"
                      style={{ height: `${item.value}%` }}
                    />
                  </div>

                  <span className="text-xs font-medium text-[#806b5d]">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#eadfce] pt-4">
              <div>
                <p className="text-xs text-[#9a8878]">Period revenue</p>
                <p className="mt-1 font-bold text-[#531c1d]">₹4,82,640</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#9a8878]">Previous period</p>
                <p className="mt-1 font-semibold text-[#806b5d]">₹4,21,160</p>
              </div>
            </div>
          </div>

          {/* Report generator */}
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#641f20] p-6 text-[#fff8e9]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
              <FileText className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold">
              Generate a Custom Report
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#eadfc9]">
              Choose the information you need and generate a downloadable
              marketplace report.
            </p>

            <div className="mt-6 space-y-3">
              <ReportSelect label="Report Type" value="Sales & Revenue" />
              <ReportSelect label="Date Range" value={period} />
              <ReportSelect label="Format" value="Excel Spreadsheet" />
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f8edcf] px-4 py-3 text-sm font-bold text-[#641f20] transition hover:bg-[#fff7df]"
            >
              <Download className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </section>

        {/* Quick reports */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Quick Reports
            </h2>
            <p className="mt-1 text-sm text-[#806b5d]">
              Ready-to-use reports for common marketplace operations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reportCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4e8d2] text-[#641f20]">
                  {category.icon}
                </div>

                <h3 className="mt-4 font-semibold text-[#531c1d]">
                  {category.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                  {category.description}
                </p>

                <div className="mt-4 space-y-2">
                  {category.reports.map((report) => (
                    <button
                      key={report}
                      type="button"
                      className="group flex w-full items-center justify-between rounded-lg border border-transparent px-2 py-2 text-left text-xs font-medium text-[#665448] transition hover:border-[#e0d1b5] hover:bg-[#f8f0df] hover:text-[#641f20]"
                    >
                      <span>{report}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top products */}
        <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0]">
            <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Top Performing Products
                </h2>
                <p className="mt-1 text-xs text-[#806b5d]">
                  Highest revenue-generating products.
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] p-2 text-[#641f20] hover:bg-[#f7edd7]"
                aria-label="Download product report"
              >
                <ArrowDownToLine className="h-4 w-4" />
              </button>
            </div>

            <div className="divide-y divide-[#eadfce]">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3e6d0] font-serif font-bold text-[#641f20]">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#531c1d]">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-[#9a8878]">
                      {product.category} · {product.sales} sales
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-[#531c1d]">
                      {formatAmount(product.revenue)}
                    </p>
                    <p className="mt-1 text-xs text-[#47734a]">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report health */}
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Report Health
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Latest marketplace data status.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f0e3] text-[#47734a]">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <HealthRow
                label="Sales data"
                status="Updated"
                value="100%"
              />
              <HealthRow
                label="Payment data"
                status="Updated"
                value="100%"
              />
              <HealthRow
                label="Inventory data"
                status="Updated"
                value="98%"
              />
              <HealthRow
                label="Customer data"
                status="Updated"
                value="100%"
              />
            </div>

            <div className="mt-6 rounded-xl border border-[#d8c9ad] bg-[#f9f1df] p-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#9b772d]" />
                <div>
                  <p className="text-xs text-[#9a8878]">
                    Last data synchronization
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#531c1d]">
                    02 Sep 2026 · 02:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
              <PieChart className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Detailed analytics are coming next
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Advanced filtering, downloadable CSV/XLSX reports and
                backend-powered analytics will be connected during API
                integration.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#641f20] hover:bg-[#f7edd7]"
            >
              View Analytics
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  change,
  icon,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#531c1d]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3e5d1] text-[#641f20]">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 font-semibold ${
            positive ? "text-[#47734a]" : "text-[#9b3d35]"
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          {change}
        </span>
        <span className="text-[#aa9889]">vs previous period</span>
      </div>
    </div>
  );
}

function ReportSelect({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#eadfc9]">
        {label}
      </label>

      <div className="flex items-center justify-between rounded-xl border border-[#9a6867] bg-[#531c1d] px-3.5 py-2.5 text-sm">
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 text-[#d8b96d]" />
      </div>
    </div>
  );
}

function HealthRow({
  label,
  status,
  value,
}: {
  label: string;
  status: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#665448]">{label}</span>
        <span className="font-semibold text-[#47734a]">
          {status} · {value}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e9dec8]">
        <div
          className="h-full rounded-full bg-[#47734a]"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}