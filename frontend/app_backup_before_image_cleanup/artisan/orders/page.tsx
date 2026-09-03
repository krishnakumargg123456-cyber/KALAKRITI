"use client";

import { Package, Truck, CheckCircle2, Clock3 } from "lucide-react";

const orders = [
  {
    id: "#KAL-10482",
    customer: "Ananya Sharma",
    product: "Madhubani Wall Art",
    amount: 2400,
    status: "Processing",
  },
  {
    id: "#KAL-10477",
    customer: "Rohan Mehta",
    product: "Blue Pottery Vase",
    amount: 1850,
    status: "Shipped",
  },
  {
    id: "#KAL-10461",
    customer: "Priya Singh",
    product: "Handwoven Dupatta",
    amount: 1600,
    status: "Delivered",
  },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "Delivered") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  if (status === "Shipped") {
    return <Truck className="h-4 w-4" />;
  }

  return <Clock3 className="h-4 w-4" />;
}

export default function ArtisanOrdersPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Orders
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Track customer orders and fulfilment.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat title="New Orders" value="8" />
          <Stat title="Processing" value="12" />
          <Stat title="Completed" value="146" />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="border-b border-border bg-cream">
                <tr>
                  <th className="px-5 py-4 text-sm">Order</th>
                  <th className="px-5 py-4 text-sm">Customer</th>
                  <th className="px-5 py-4 text-sm">Product</th>
                  <th className="px-5 py-4 text-sm">Amount</th>
                  <th className="px-5 py-4 text-sm">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-semibold text-maroon">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-sm text-brown">
                      {order.customer}
                    </td>
                    <td className="px-5 py-4 text-sm text-brown/70">
                      {order.product}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-brown">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-maroon">
                        <StatusIcon status={order.status} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-paper p-5">
      <Package className="h-5 w-5 text-gold" />
      <p className="mt-3 text-sm text-brown/60">{title}</p>
      <p className="mt-1 text-2xl font-bold text-maroon">{value}</p>
    </div>
  );
}