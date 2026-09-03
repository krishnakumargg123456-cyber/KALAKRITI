"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "₹12,84,650",
    change: "+18.4%",
    positive: true,
    icon: IndianRupee,
  },
  {
    label: "Orders",
    value: "1,248",
    change: "+12.8%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    value: "8,426",
    change: "+9.6%",
    positive: true,
    icon: Users,
  },
  {
    label: "Products Sold",
    value: "2,936",
    change: "-3.2%",
    positive: false,
    icon: Package,
  },
];

const monthlySales = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 68 },
  { month: "May", value: 61 },
  { month: "Jun", value: 79 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 91 },
];

const topProducts = [
  {
    name: "Madhubani Handpainted Wall Art",
    category: "Madhubani Painting",
    sales: 186,
    revenue: "₹4,65,000",
  },
  {
    name: "Banarasi Silk Stole",
    category: "Banarasi Weaving",
    sales: 154,
    revenue: "₹5,08,200",
  },
  {
    name: "Jaipur Blue Pottery Vase",
    category: "Blue Pottery",
    sales: 132,
    revenue: "₹2,50,800",
  },
  {
    name: "Kutchi Embroidery Panel",
    category: "Embroidery",
    sales: 118,
    revenue: "₹2,59,800",
  },
  {
    name: "Dhokra Decorative Horse",
    category: "Dhokra Art",
    sales: 97,
    revenue: "₹2,32,800",
  },
];

const categories = [
  { name: "Textiles", percentage: 32 },
  { name: "Paintings", percentage: 24 },
  { name: "Pottery", percentage: 18 },
  { name: "Jewellery", percentage: 15 },
  { name: "Other Crafts", percentage: 11 },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b border-[#b08a4a]/30 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Admin Intelligence
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#4a211c]">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-[#80665d]">
              Understand sales, customers and craft performance across
              KALAKRITI.
            </p>
          </div>

          <select
            defaultValue="30"
            className="h-11 rounded-lg border border-[#b08a4a]/30 bg-[#fbf6e9] px-4 text-sm font-semibold text-[#4a211c] outline-none focus:border-[#8b1e2d]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
        </header>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      stat.positive ? "text-[#58704d]" : "text-[#8b1e2d]"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {stat.change}
                  </span>
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#80665d]">
                  {stat.label}
                </p>

                <p className="mt-1 font-serif text-3xl font-semibold text-[#4a211c]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-[#80665d]">
                  Compared with previous period
                </p>
              </article>
            );
          })}
        </section>

        {/* Revenue chart */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <article className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                  Revenue
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                  Sales performance
                </h2>
              </div>

              <BarChart3 className="h-5 w-5 text-[#8b1e2d]" />
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 border-b border-[#b08a4a]/25 pb-0">
              {monthlySales.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col justify-end gap-2"
                >
                  <div className="flex items-end justify-center">
                    <div
                      className="w-full max-w-10 rounded-t-md bg-[#8b1e2d] transition hover:bg-[#6f1724]"
                      style={{ height: `${item.value * 2}px` }}
                      title={`${item.value}% performance`}
                    />
                  </div>

                  <span className="pb-3 text-center text-[11px] font-semibold text-[#80665d]">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#80665d]">Average monthly revenue</p>
                <p className="mt-1 font-serif text-xl font-bold text-[#4a211c]">
                  ₹1,60,581
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#80665d]">Peak month</p>
                <p className="mt-1 text-sm font-bold text-[#8b1e2d]">
                  August
                </p>
              </div>
            </div>
          </article>

          {/* Category distribution */}
          <article className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              Product Mix
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
              Sales by category
            </h2>

            <div className="mt-8 space-y-5">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#4a211c]">
                      {category.name}
                    </span>

                    <span className="text-xs font-bold text-[#80665d]">
                      {category.percentage}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe4ce]">
                    <div
                      className="h-full rounded-full bg-[#8b1e2d]"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#b08a4a]/25 pt-5">
              <p className="text-xs leading-5 text-[#80665d]">
                Textiles and paintings currently contribute more than half of
                tracked marketplace sales.
              </p>
            </div>
          </article>
        </section>

        {/* Tables */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Products */}
          <article className="overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
            <div className="border-b border-[#b08a4a]/25 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                Best Sellers
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                Top performing products
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-[#b08a4a]/20 text-[10px] uppercase tracking-wider text-[#80665d]">
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">Sales</th>
                    <th className="px-6 py-4 text-right font-bold">
                      Revenue
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {topProducts.map((product, index) => (
                    <tr
                      key={product.name}
                      className="border-b border-[#b08a4a]/15 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#efe4ce] text-xs font-bold text-[#8b1e2d]">
                            {index + 1}
                          </span>

                          <div>
                            <p className="text-sm font-semibold text-[#4a211c]">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#80665d]">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#4a211c]">
                        {product.sales}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-bold text-[#8b1e2d]">
                        {product.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Customer metrics */}
          <article className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              Customer Insights
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
              Audience overview
            </h2>

            <div className="mt-7 space-y-6">
              <Metric
                label="New customers"
                value="1,284"
                change="+14.2%"
              />

              <Metric
                label="Returning customers"
                value="38.6%"
                change="+6.8%"
              />

              <Metric
                label="Average order value"
                value="₹1,483"
                change="+8.4%"
              />

              <Metric
                label="Cart conversion"
                value="4.72%"
                change="+1.1%"
              />
            </div>

            <div className="mt-7 rounded-xl bg-[#efe4ce]/70 p-4">
              <p className="text-xs font-bold text-[#4a211c]">
                Growing repeat interest
              </p>

              <p className="mt-1 text-xs leading-5 text-[#80665d]">
                Returning customer activity has increased steadily across the
                selected period.
              </p>
            </div>
          </article>
        </section>

        {/* Footer note */}
        <div className="mt-8 flex items-center gap-2 text-xs text-[#80665d]">
          <BarChart3 className="h-4 w-4 text-[#8b1e2d]" />
          Analytics shown here are ready to be connected to the KALAKRITI
          backend analytics endpoints.
        </div>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="flex items-end justify-between border-b border-[#b08a4a]/20 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-xs text-[#80665d]">{label}</p>
        <p className="mt-1 font-serif text-xl font-bold text-[#4a211c]">
          {value}
        </p>
      </div>

      <span className="text-xs font-bold text-[#58704d]">{change}</span>
    </div>
  );
}