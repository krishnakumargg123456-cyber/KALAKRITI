"use client";

import { useEffect, useMemo, useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  Wallet,
  CheckCircle2,
  Clock3,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/api/client";

type Payout = {
  id: string;
  amount?: number;
  status?: string;
  created_at?: string;
  processed_at?: string;
  paid_at?: string;
  reference?: string;
  order_id?: string;
  order_number?: string;
};

type PayoutResponse =
  | Payout[]
  | {
      items?: Payout[];
      payouts?: Payout[];
      total?: number;
    };

function getPayouts(data: PayoutResponse): Payout[] {
  if (Array.isArray(data)) return data;
  return data.items ?? data.payouts ?? [];
}

function getAmount(payout: Payout) {
  return Number(payout.amount ?? 0);
}

function getStatus(status?: string) {
  if (!status) return "Pending";

  const value = status.toLowerCase().replace(/[_-]/g, " ");

  if (
    value.includes("paid") ||
    value.includes("complete") ||
    value.includes("success") ||
    value.includes("processed")
  ) {
    return "Completed";
  }

  if (
    value.includes("fail") ||
    value.includes("reject") ||
    value.includes("cancel")
  ) {
    return "Failed";
  }

  return "Pending";
}

function getOrderReference(payout: Payout) {
  if (payout.order_number) {
    return payout.order_number.startsWith("#")
      ? payout.order_number
      : `#${payout.order_number}`;
  }

  if (payout.order_id) {
    return `#${payout.order_id.slice(0, 8).toUpperCase()}`;
  }

  return payout.reference || `#${payout.id.slice(0, 8).toUpperCase()}`;
}

export default function ArtisanPayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPayouts() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<PayoutResponse>(
        "/artisan/payouts",
        {
          params: {
            limit: 100,
          },
        }
      );

      setPayouts(getPayouts(response.data));
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load your payouts. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayouts();
  }, []);

  const completedPayouts = useMemo(
    () =>
      payouts.filter(
        (payout) => getStatus(payout.status) === "Completed"
      ),
    [payouts]
  );

  const thisMonth = useMemo(() => {
    const now = new Date();

    return completedPayouts
      .filter((payout) => {
        if (!payout.created_at) return false;

        const date = new Date(payout.created_at);

        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, payout) => sum + getAmount(payout), 0);
  }, [completedPayouts]);

  const totalEarnings = useMemo(
    () =>
      completedPayouts.reduce(
        (sum, payout) => sum + getAmount(payout),
        0
      ),
    [completedPayouts]
  );

  const pendingBalance = useMemo(
    () =>
      payouts
        .filter(
          (payout) => getStatus(payout.status) === "Pending"
        )
        .reduce((sum, payout) => sum + getAmount(payout), 0),
    [payouts]
  );

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Payouts
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Track your payout history and earnings.
        </p>

        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={loadPayouts}
              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <EarningCard
            icon={<IndianRupee />}
            title="This Month"
            value={
              loading
                ? "—"
                : `₹${thisMonth.toLocaleString("en-IN")}`
            }
          />

          <EarningCard
            icon={<TrendingUp />}
            title="Total Earnings"
            value={
              loading
                ? "—"
                : `₹${totalEarnings.toLocaleString("en-IN")}`
            }
          />

          <EarningCard
            icon={<Wallet />}
            title="Pending Balance"
            value={
              loading
                ? "—"
                : `₹${pendingBalance.toLocaleString("en-IN")}`
            }
          />
        </div>

        <section className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          <div className="p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Payout History
            </h2>

            <p className="mt-1 text-sm text-brown/60">
              Your recent payout transactions.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-brown/60">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                Loading payouts...
              </div>
            </div>
          ) : payouts.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center px-6 pb-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <Wallet className="h-7 w-7" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-semibold text-maroon">
                No payouts yet
              </h3>

              <p className="mt-2 text-sm text-brown/60">
                Your payout transactions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="border-y border-border bg-cream">
                  <tr>
                    <th className="px-4 py-3 text-sm">
                      Date
                    </th>

                    <th className="px-4 py-3 text-sm">
                      Payout
                    </th>

                    <th className="px-4 py-3 text-sm">
                      Amount
                    </th>

                    <th className="px-4 py-3 text-sm">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payouts.map((payout) => {
                    const status = getStatus(payout.status);

                    const date =
                      payout.paid_at ||
                      payout.processed_at ||
                      payout.created_at;

                    return (
                      <tr
                        key={payout.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-4 text-sm text-brown/70">
                          {date
                            ? new Date(date).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </td>

                        <td className="px-4 py-4 font-semibold text-maroon">
                          {getOrderReference(payout)}
                        </td>

                        <td className="px-4 py-4 font-semibold text-brown">
                          ₹
                          {getAmount(payout).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                              status === "Completed"
                                ? "text-green-700"
                                : status === "Failed"
                                  ? "text-red-700"
                                  : "text-amber-700"
                            }`}
                          >
                            {status === "Completed" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Clock3 className="h-4 w-4" />
                            )}

                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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

      <p className="mt-4 text-sm text-brown/60">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-maroon">
        {value}
      </p>
    </div>
  );
}
