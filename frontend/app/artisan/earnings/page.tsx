"use client";

import { useEffect, useMemo, useState } from "react";
import {
  IndianRupee,
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

function normalizeStatus(status?: string) {
  if (!status) return "Pending";

  const value = status.toLowerCase().replace(/[_-]/g, " ");

  if (
    value.includes("paid") ||
    value.includes("complete") ||
    value.includes("success") ||
    value.includes("processed")
  ) {
    return "Paid";
  }

  if (
    value.includes("cancel") ||
    value.includes("fail") ||
    value.includes("reject")
  ) {
    return "Failed";
  }

  return "Pending";
}

export default function ArtisanEarningsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEarnings() {
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
          "Unable to load your earnings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEarnings();
  }, []);

  const totalEarnings = useMemo(
    () =>
      payouts
        .filter((payout) => normalizeStatus(payout.status) === "Paid")
        .reduce((sum, payout) => sum + getAmount(payout), 0),
    [payouts]
  );

  const pendingAmount = useMemo(
    () =>
      payouts
        .filter((payout) => normalizeStatus(payout.status) === "Pending")
        .reduce((sum, payout) => sum + getAmount(payout), 0),
    [payouts]
  );

  const paidCount = useMemo(
    () =>
      payouts.filter(
        (payout) => normalizeStatus(payout.status) === "Paid"
      ).length,
    [payouts]
  );

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Earnings
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Track your earnings and payout history.
        </p>

        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={loadEarnings}
              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat
            icon={<IndianRupee className="h-5 w-5" />}
            title="Total Earnings"
            value={
              loading
                ? "—"
                : `₹${totalEarnings.toLocaleString("en-IN")}`
            }
          />

          <Stat
            icon={<Clock3 className="h-5 w-5" />}
            title="Pending Payout"
            value={
              loading
                ? "—"
                : `₹${pendingAmount.toLocaleString("en-IN")}`
            }
          />

          <Stat
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Paid Payouts"
            value={loading ? "—" : paidCount}
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-brown/60">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                Loading earnings...
              </div>
            </div>
          ) : payouts.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <Wallet className="h-7 w-7" />
              </div>

              <h2 className="mt-4 font-serif text-xl font-semibold text-maroon">
                No payout history yet
              </h2>

              <p className="mt-2 text-sm text-brown/60">
                Your earnings and payouts will appear here once
                they are generated.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="border-b border-border bg-cream">
                  <tr>
                    <th className="px-5 py-4 text-sm">
                      Payout
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Date
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-sm">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payouts.map((payout) => {
                    const status = normalizeStatus(payout.status);
                    const date =
                      payout.paid_at ||
                      payout.processed_at ||
                      payout.created_at;

                    return (
                      <tr
                        key={payout.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-maroon">
                            {payout.reference ||
                              `#${payout.id
                                .slice(0, 8)
                                .toUpperCase()}`}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-brown/70">
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

                        <td className="px-5 py-4 text-sm font-semibold text-brown">
                          ₹
                          {getAmount(payout).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                              status === "Paid"
                                ? "bg-green-50 text-green-700"
                                : status === "Failed"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-gold/10 text-maroon"
                            }`}
                          >
                            {status === "Paid" ? (
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
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-paper p-5">
      <div className="text-gold">{icon}</div>

      <p className="mt-3 text-sm text-brown/60">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-maroon">
        {value}
      </p>
    </div>
  );
}
