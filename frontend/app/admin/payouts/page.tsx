"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  IndianRupee,
  RefreshCw,
  Search,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  payoutsApi,
  type Payout,
  type PayoutStatus,
} from "@/lib/api/payouts";

type StatusFilter = "all" | PayoutStatus;

const statusStyles: Record<
  PayoutStatus,
  { className: string; icon: React.ReactNode; label: string }
> = {
  paid: {
    className: "bg-[#e7f2e6] text-[#35613a] border-[#8bb58b]/40",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    label: "Paid",
  },
  processing: {
    className: "bg-[#eee8f3] text-[#714879] border-[#b79abd]/40",
    icon: <Clock3 className="h-3.5 w-3.5" />,
    label: "Processing",
  },
  pending: {
    className: "bg-[#fff3d7] text-[#8b6828] border-[#d2a94d]/40",
    icon: <Clock3 className="h-3.5 w-3.5" />,
    label: "Pending",
  },
  failed: {
    className: "bg-[#f9e5e2] text-[#9b3d35] border-[#d99a91]/40",
    icon: <XCircle className="h-3.5 w-3.5" />,
    label: "Failed",
  },
  cancelled: {
    className: "bg-[#eee9e4] text-[#6f6258] border-[#b9aa9d]/40",
    icon: <XCircle className="h-3.5 w-3.5" />,
    label: "Cancelled",
  },
};

function toNumber(value: string | number | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value: string | number | null | undefined) {
  return `₹${toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function shortId(value: string) {
  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 8)}…${value.slice(-6)}`;
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadPayouts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await payoutsApi.list();
      setPayouts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to load payouts:", err);
      setError(
        "Payouts load nahi ho paaye. Please check the backend connection and admin authorization.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadPayouts();
  }, [loadPayouts]);

  const filteredPayouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payouts.filter((payout) => {
      const searchable = [
        String(payout.id),
        payout.artisan_id,
        String(payout.order_id),
        payout.payout_reference ?? "",
        payout.transaction_id ?? "",
        payout.payment_gateway ?? "",
        payout.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);
      const matchesStatus =
        statusFilter === "all" || payout.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payouts, search, statusFilter]);

  const stats = useMemo(() => {
    const totalGross = payouts.reduce(
      (sum, payout) => sum + toNumber(payout.gross_amount),
      0,
    );

    const paid = payouts.filter((payout) => payout.status === "paid");

    const paidAmount = paid.reduce(
      (sum, payout) => sum + toNumber(payout.net_amount),
      0,
    );

    const pendingAmount = payouts
      .filter(
        (payout) =>
          payout.status === "pending" || payout.status === "processing",
      )
      .reduce((sum, payout) => sum + toNumber(payout.net_amount), 0);

    const commission = payouts.reduce(
      (sum, payout) => sum + toNumber(payout.commission_amount),
      0,
    );

    return {
      totalGross,
      paidAmount,
      pendingAmount,
      commission,
      paidCount: paid.length,
      pendingCount: payouts.filter(
        (payout) =>
          payout.status === "pending" || payout.status === "processing",
      ).length,
    };
  }, [payouts]);

  async function updateStatus(
    payout: Payout,
    status: PayoutStatus,
  ) {
    let failureReason: string | null = null;

    if (status === "failed") {
      const reason = window.prompt(
        "Failure reason enter karein:",
        payout.failure_reason ?? "",
      );

      if (reason === null) {
        return;
      }

      if (!reason.trim()) {
        window.alert("Failure reason required hai.");
        return;
      }

      failureReason = reason.trim();
    }

    try {
      setUpdatingId(payout.id);
      setError("");

      const response = await payoutsApi.updateStatus(payout.id, {
        status,
        failure_reason: failureReason,
      });

      setPayouts((current) =>
        current.map((item) =>
          item.id === payout.id ? response.data : item,
        ),
      );
    } catch (err) {
      console.error("Failed to update payout:", err);
      setError("Payout status update nahi ho saka.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <section className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                <WalletCards className="h-4 w-4" />
                Artisan Finance
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Payouts
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Manage artisan earnings, commissions and marketplace payouts
                using live backend records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadPayouts(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#641f20] px-4 py-2.5 text-sm font-semibold text-[#fff8e9] transition hover:bg-[#531c1d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              Refresh Payouts
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-[#d99a91]/50 bg-[#f9e5e2] px-5 py-4 text-sm text-[#8b332d]">
            {error}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Gross Earnings"
            value={formatAmount(stats.totalGross)}
            icon={<IndianRupee className="h-5 w-5" />}
            tone="maroon"
          />

          <StatCard
            label="Paid to Artisans"
            value={formatAmount(stats.paidAmount)}
            detail={`${stats.paidCount} paid payouts`}
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="green"
          />

          <StatCard
            label="Pending / Processing"
            value={formatAmount(stats.pendingAmount)}
            detail={`${stats.pendingCount} payouts`}
            icon={<Clock3 className="h-5 w-5" />}
            tone="gold"
          />

          <StatCard
            label="Platform Commission"
            value={formatAmount(stats.commission)}
            icon={<WalletCards className="h-5 w-5" />}
            tone="purple"
          />
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Artisan Payouts
            </h2>
            <p className="mt-1 text-sm text-[#806b5d]">
              Track individual payout records and settlement status.
            </p>
          </div>

          <div className="rounded-t-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payout ID, artisan ID, order ID or transaction..."
                  className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none placeholder:text-[#aa9889] focus:border-[#9b772d] focus:ring-2 focus:ring-[#9b772d]/10"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as StatusFilter)
                  }
                  className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:min-w-[190px]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1150px] text-left">
                    <thead className="border-b border-[#dfd2ba] bg-[#f9f2e2]">
                      <tr className="text-xs uppercase tracking-wider text-[#806b5d]">
                        <th className="px-5 py-4 font-semibold">Payout</th>
                        <th className="px-5 py-4 font-semibold">Artisan</th>
                        <th className="px-5 py-4 font-semibold">Order</th>
                        <th className="px-5 py-4 font-semibold">Gross</th>
                        <th className="px-5 py-4 font-semibold">
                          Commission
                        </th>
                        <th className="px-5 py-4 font-semibold">
                          Net Payout
                        </th>
                        <th className="px-5 py-4 font-semibold">Status</th>
                        <th className="px-5 py-4 text-right font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#eadfce]">
                      {filteredPayouts.map((payout) => (
                        <tr
                          key={payout.id}
                          className="transition hover:bg-[#fdf8ed]"
                        >
                          <td className="px-5 py-4">
                            <p className="font-semibold text-[#641f20]">
                              PO-{String(payout.id).padStart(5, "0")}
                            </p>
                            <p className="mt-1 text-xs text-[#9a8878]">
                              {formatDate(payout.created_at)}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p
                              className="max-w-[190px] truncate text-sm font-semibold text-[#531c1d]"
                              title={payout.artisan_id}
                            >
                              {shortId(payout.artisan_id)}
                            </p>
                            <p className="mt-1 text-xs text-[#9a8878]">
                              Artisan ID
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold text-[#531c1d]">
                              #{payout.order_id}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-[#531c1d]">
                            {formatAmount(payout.gross_amount)}
                          </td>

                          <td className="px-5 py-4 text-sm text-[#806b5d]">
                            -{formatAmount(payout.commission_amount)}
                          </td>

                          <td className="px-5 py-4">
                            <span className="font-bold text-[#531c1d]">
                              {formatAmount(payout.net_amount)}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={payout.status} />
                          </td>

                          <td className="px-5 py-4 text-right">
                            <StatusActions
                              payout={payout}
                              updatingId={updatingId}
                              onUpdate={updateStatus}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredPayouts.length === 0 && <EmptyPayouts />}
              </div>

              <div className="space-y-3 rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] p-4 lg:hidden">
                {filteredPayouts.length > 0 ? (
                  filteredPayouts.map((payout) => (
                    <div
                      key={payout.id}
                      className="rounded-xl border border-[#dfd2ba] bg-[#fffdf7] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#641f20]">
                            PO-{String(payout.id).padStart(5, "0")}
                          </p>
                          <p className="mt-1 text-xs text-[#9a8878]">
                            {formatDate(payout.created_at)}
                          </p>
                        </div>

                        <StatusBadge status={payout.status} />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <Info
                          label="Artisan ID"
                          value={shortId(payout.artisan_id)}
                        />
                        <Info
                          label="Order"
                          value={`#${payout.order_id}`}
                        />
                        <Info
                          label="Gross"
                          value={formatAmount(payout.gross_amount)}
                        />
                        <Info
                          label="Commission"
                          value={`-${formatAmount(
                            payout.commission_amount,
                          )}`}
                        />
                        <Info
                          label="Net Payout"
                          value={formatAmount(payout.net_amount)}
                        />
                        <Info
                          label="Gateway"
                          value={payout.payment_gateway ?? "—"}
                        />
                      </div>

                      <div className="mt-4">
                        <StatusActions
                          payout={payout}
                          updatingId={updatingId}
                          onUpdate={updateStatus}
                          mobile
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyPayouts />
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-[#806b5d] sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing{" "}
                  <span className="font-semibold text-[#531c1d]">
                    {filteredPayouts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#531c1d]">
                    {payouts.length}
                  </span>{" "}
                  payouts
                </p>

                <p className="text-xs text-[#9a8878]">
                  Data loaded from the KALAKRITI payout API
                </p>
              </div>
            </>
          )}
        </section>

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3e6d0] text-[#641f20]">
              <WalletCards className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Payout reconciliation
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Payout records are linked to artisan and order IDs. Detailed
                bank settlement and automated reconciliation will be added
                when the corresponding finance APIs are available.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-xl border border-[#c9a45c]/40 bg-[#f8edcf] px-4 py-2.5 text-xs font-semibold text-[#641f20]">
              API Ready
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
  tone,
}: {
  label: string;
  value: string;
  detail?: string;
  icon: React.ReactNode;
  tone: "maroon" | "green" | "gold" | "purple";
}) {
  return (
    <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#531c1d]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            tone === "maroon"
              ? "bg-[#f2dfd8] text-[#641f20]"
              : tone === "green"
                ? "bg-[#e5efe2] text-[#416846]"
                : tone === "gold"
                  ? "bg-[#f8edcf] text-[#8b6828]"
                  : "bg-[#eee4ef] text-[#714879]"
          }`}
        >
          {icon}
        </div>
      </div>

      {detail && (
        <p className="mt-4 text-xs font-medium text-[#806b5d]">
          {detail}
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: PayoutStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.icon}
      {style.label}
    </span>
  );
}

function StatusActions({
  payout,
  updatingId,
  onUpdate,
  mobile = false,
}: {
  payout: Payout;
  updatingId: number | null;
  onUpdate: (payout: Payout, status: PayoutStatus) => Promise<void>;
  mobile?: boolean;
}) {
  const disabled = updatingId === payout.id;

  if (payout.status === "paid" || payout.status === "cancelled") {
    return (
      <span className="text-xs text-[#9a8878]">
        No actions available
      </span>
    );
  }

  return (
    <div
      className={`flex ${
        mobile ? "flex-wrap justify-start" : "justify-end"
      } gap-2`}
    >
      {payout.status === "pending" && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => void onUpdate(payout, "processing")}
          className="rounded-lg border border-[#b79abd]/40 bg-[#eee8f3] px-3 py-2 text-xs font-semibold text-[#714879] transition hover:bg-[#e5dbe9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {disabled ? "Updating…" : "Process"}
        </button>
      )}

      {payout.status === "processing" && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => void onUpdate(payout, "paid")}
          className="rounded-lg border border-[#8bb58b]/40 bg-[#e7f2e6] px-3 py-2 text-xs font-semibold text-[#35613a] transition hover:bg-[#dcebd9] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {disabled ? "Updating…" : "Mark Paid"}
        </button>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => void onUpdate(payout, "failed")}
        className="rounded-lg border border-[#d99a91]/40 bg-[#f9e5e2] px-3 py-2 text-xs font-semibold text-[#9b3d35] transition hover:bg-[#f1d6d2] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Failed
      </button>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-[#9a8878]">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-[#531c1d]">
        {value}
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] px-6 py-16 text-center">
      <RefreshCw className="h-7 w-7 animate-spin text-[#9b772d]" />

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        Loading payouts
      </h3>

      <p className="mt-1 text-sm text-[#806b5d]">
        Fetching the latest artisan payout records.
      </p>
    </div>
  );
}

function EmptyPayouts() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8d3] text-[#9b772d]">
        <Search className="h-6 w-6" />
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        No payouts found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-[#806b5d]">
        Try changing the search term or payout status filter.
      </p>
    </div>
  );
}
