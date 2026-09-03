"use client";

import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  FileBarChart,
  FileText,
  IndianRupee,
  Info,
  Package,
  PieChart,
  ShoppingBag,
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
    description: "Customer growth and purchasing activity.",
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

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("Last 30 Days");

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
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
                Access marketplace reports and analytics from verified
                backend data sources.
              </p>
            </div>

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
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Net Sales"
            value="—"
            icon={<IndianRupee className="h-5 w-5" />}
          />

          <MetricCard
            label="Total Orders"
            value="—"
            icon={<ShoppingBag className="h-5 w-5" />}
          />

          <MetricCard
            label="Customers"
            value="—"
            icon={<Users className="h-5 w-5" />}
          />

          <MetricCard
            label="Average Order Value"
            value="—"
            icon={<BarChart3 className="h-5 w-5" />}
          />
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Sales Overview
                </h2>

                <p className="mt-1 text-sm text-[#806b5d]">
                  Revenue performance for {period.toLowerCase()}.
                </p>
              </div>

              <BarChart3 className="h-6 w-6 text-[#9b772d]" />
            </div>

            <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#d8c9ad] bg-[#f9f1df] px-6 text-center">
              <BarChart3 className="h-10 w-10 text-[#bca98b]" />

              <h3 className="mt-4 font-semibold text-[#531c1d]">
                Sales analytics not available
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#806b5d]">
                No verified reporting dataset is currently connected to this
                page. Charts will use backend-provided sales data once the
                confirmed reporting contract is available.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#641f20] p-6 text-[#fff8e9]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
              <FileText className="h-5 w-5" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold">
              Custom Reports
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#eadfc9]">
              Custom report generation will be enabled when the verified
              reporting and export API is connected.
            </p>

            <div className="mt-6 space-y-3">
              <ReportInfo
                label="Report Type"
                value="Backend contract required"
              />

              <ReportInfo
                label="Date Range"
                value={period}
              />

              <ReportInfo
                label="Export Format"
                value="CSV / XLSX — unavailable"
              />
            </div>

            <button
              type="button"
              disabled
              className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#8d7b6c] px-4 py-3 text-sm font-bold text-[#eadfc9]"
            >
              Generate Report
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Report Categories
            </h2>

            <p className="mt-1 text-sm text-[#806b5d]">
              Available report areas for future backend-powered analytics.
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
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-transparent px-2 py-2 text-left text-xs font-medium text-[#aa9889]"
                    >
                      <span>{report}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3e5d1] text-[#641f20]">
                <PieChart className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Top Performing Products
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                  Product performance will appear here when verified sales
                  analytics are connected.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-[#d8c9ad] bg-[#f9f1df] p-8 text-center">
              <Package className="mx-auto h-8 w-8 text-[#bca98b]" />

              <p className="mt-3 text-sm font-semibold text-[#531c1d]">
                No verified product analytics
              </p>

              <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                No product sales ranking is displayed without backend data.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f0e3] text-[#47734a]">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Report Health
                </h2>

                <p className="mt-1 text-sm text-[#806b5d]">
                  Data-source status for marketplace reporting.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Sales data",
                "Payment data",
                "Inventory data",
                "Customer data",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-[#dfd2ba] bg-[#f9f1df] px-4 py-3"
                >
                  <span className="text-sm font-medium text-[#665448]">
                    {label}
                  </span>

                  <span className="text-xs font-semibold text-[#8b6828]">
                    Not connected
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#d8c9ad] bg-[#f9f1df] p-4">
              <CalendarDays className="h-5 w-5 text-[#9b772d]" />

              <div>
                <p className="text-xs text-[#9a8878]">
                  Last synchronization
                </p>

                <p className="mt-1 text-sm font-semibold text-[#531c1d]">
                  Not available
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
              <Info className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Backend reporting contract required
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                This page intentionally does not display fabricated revenue,
                order counts, customer statistics, product rankings,
                synchronization times or export results. Once the verified
                admin reporting API contract is available, this workspace can
                consume real analytics without changing its design.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#d8c9ad] bg-[#f6eedf] px-4 py-2.5 text-sm font-semibold text-[#aa9889]"
            >
              Analytics unavailable
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
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
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

      <p className="mt-4 text-xs text-[#aa9889]">
        Verified backend data unavailable
      </p>
    </div>
  );
}

function ReportInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-[#eadfc9]">
        {label}
      </p>

      <div className="flex items-center justify-between rounded-xl border border-[#9a6867] bg-[#531c1d] px-3.5 py-2.5 text-sm">
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 text-[#d8b96d]" />
      </div>
    </div>
  );
}
