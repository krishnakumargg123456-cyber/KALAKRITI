"use client";

import { IndianRupee, TrendingUp, Wallet } from "lucide-react";

const transactions = [
  {
    date: "02 Sep 2026",
    order: "#KAL-10482",
    amount: 2400,
    status: "Completed",
  },
  {
    date: "31 Aug 2026",
    order: "#KAL-10477",
    amount: 1850,
    status: "Completed",
  },
  {
    date: "29 Aug 2026",
    order: "#KAL-10461",
    amount: 1600,
    status: "Completed",
  },
];

export default function ArtisanEarningsPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Earnings
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <EarningCard
            icon={<IndianRupee />}
            title="This Month"
            value="₹48,650"
          />
          <EarningCard
            icon={<TrendingUp />}
            title="Total Earnings"
            value="₹3,84,500"
          />
          <EarningCard
            icon={<Wallet />}
            title="Available Balance"
            value="₹24,800"
          />
        </div>

        <section className="mt-8 rounded-xl border border-border bg-paper p-6">
          <h2 className="font-serif text-xl font-bold text-maroon">
            Recent Earnings
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b border-border bg-cream">
                <tr>
                  <th className="px-4 py-3 text-sm">Date</th>
                  <th className="px-4 py-3 text-sm">Order</th>
                  <th className="px-4 py-3 text-sm">Amount</th>
                  <th className="px-4 py-3 text-sm">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item) => (
                  <tr key={item.order} className="border-b border-border last:border-0">
                    <td className="px-4 py-4 text-sm text-brown/70">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 font-semibold text-maroon">
                      {item.order}
                    </td>
                    <td className="px-4 py-4 font-semibold text-brown">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-sm text-green-700">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function EarningCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-paper p-6">
      <div className="text-gold">{icon}</div>
      <p className="mt-4 text-sm text-brown/60">{title}</p>
      <p className="mt-1 text-2xl font-bold text-maroon">{value}</p>
    </div>
  );
}