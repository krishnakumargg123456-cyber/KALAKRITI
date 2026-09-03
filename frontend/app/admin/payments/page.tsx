"use client";

import {
  ArrowUpRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  IndianRupee,
  Search,
  ShieldCheck,
  Smartphone,
  WalletCards,
  XCircle,
  Clock3,
  RefreshCcw,
  Info,
} from "lucide-react";
import { useMemo, useState } from "react";

type PaymentStatus = "Completed" | "Pending" | "Refunded" | "Failed";
type PaymentMethod = "UPI" | "Card" | "Net Banking" | "Wallet";

type Payment = {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  reference: string;
};

const payments: Payment[] = [];

const methodIcons: Record<PaymentMethod, React.ReactNode> = {
  UPI: <Smartphone className="h-4 w-4" />,
  Card: <CreditCard className="h-4 w-4" />,
  "Net Banking": <Banknote className="h-4 w-4" />,
  Wallet: <WalletCards className="h-4 w-4" />,
};

const statusStyles: Record<
  PaymentStatus,
  { className: string; icon: React.ReactNode }
> = {
  Completed: {
    className: "bg-[#e7f2e6] text-[#35613a] border-[#8bb58b]/40",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  Pending: {
    className: "bg-[#fff3d7] text-[#8b6828] border-[#d2a94d]/40",
    icon: <Clock3 className="h-3.5 w-3.5" />,
  },
  Refunded: {
    className: "bg-[#f1e9f3] text-[#714879] border-[#b79abd]/40",
    icon: <RefreshCcw className="h-3.5 w-3.5" />,
  },
  Failed: {
    className: "bg-[#f9e5e2] text-[#9b3d35] border-[#d99a91]/40",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | PaymentStatus
  >("All");
  const [methodFilter, setMethodFilter] = useState<
    "All" | PaymentMethod
  >("All");

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.id.toLowerCase().includes(query) ||
        payment.orderId.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.reference.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [search, statusFilter, methodFilter]);

  const totalProcessed = payments
    .filter((payment) => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const successfulPayments = payments
    .filter((payment) => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const refunds = payments
    .filter((payment) => payment.status === "Refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const paymentMethods = [
    {
      name: "UPI",
      amount: payments
        .filter((payment) => payment.method === "UPI")
        .reduce((sum, payment) => sum + payment.amount, 0),
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      name: "Cards",
      amount: payments
        .filter((payment) => payment.method === "Card")
        .reduce((sum, payment) => sum + payment.amount, 0),
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Net Banking",
      amount: payments
        .filter((payment) => payment.method === "Net Banking")
        .reduce((sum, payment) => sum + payment.amount, 0),
      icon: <Banknote className="h-5 w-5" />,
    },
    {
      name: "Wallets",
      amount: payments
        .filter((payment) => payment.method === "Wallet")
        .reduce((sum, payment) => sum + payment.amount, 0),
      icon: <WalletCards className="h-5 w-5" />,
    },
  ];

  const methodTotal = paymentMethods.reduce(
    (sum, method) => sum + method.amount,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <section className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                <ShieldCheck className="h-4 w-4" />
                Finance & Security
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Payments
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Monitor verified marketplace transactions, payment methods,
                refunds and settlement activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[#c9a45c]/40 bg-[#f6eedf] px-4 py-2.5 text-sm font-medium text-[#aa9889]"
              >
                September 2026
                <ChevronDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-[#d7cdbd] px-4 py-2.5 text-sm font-semibold text-[#806b5d]"
              >
                <IndianRupee className="h-4 w-4" />
                Export unavailable
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Processed"
            value={formatAmount(totalProcessed)}
            icon={<IndianRupee className="h-5 w-5" />}
            tone="maroon"
          />

          <StatCard
            label="Successful Payments"
            value={formatAmount(successfulPayments)}
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="green"
          />

          <StatCard
            label="Pending Payments"
            value={formatAmount(pendingPayments)}
            icon={<Clock3 className="h-5 w-5" />}
            tone="gold"
          />

          <StatCard
            label="Refunds"
            value={formatAmount(refunds)}
            icon={<RefreshCcw className="h-5 w-5" />}
            tone="purple"
          />
        </section>

        <section className="mt-7">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Payment Methods
            </h2>

            <p className="mt-1 text-sm text-[#806b5d]">
              Distribution of verified payment volume.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paymentMethods.map((method) => {
              const percentage =
                methodTotal > 0
                  ? (method.amount / methodTotal) * 100
                  : 0;

              return (
                <div
                  key={method.name}
                  className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5ead1] text-[#641f20]">
                      {method.icon}
                    </div>

                    <span className="text-xs font-bold text-[#8b6828]">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium text-[#806b5d]">
                    {method.name}
                  </p>

                  <p className="mt-1 text-xl font-bold text-[#531c1d]">
                    {formatAmount(method.amount)}
                  </p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eadfc9]">
                    <div
                      className="h-full rounded-full bg-[#9b772d]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-[#806b5d]">
              Review verified marketplace payment records.
            </p>
          </div>

          <div className="rounded-t-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payment ID, order, customer or reference..."
                  className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none placeholder:text-[#aa9889] focus:border-[#9b772d] focus:ring-2 focus:ring-[#9b772d]/10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as "All" | PaymentStatus
                    )
                  }
                  className="rounded-xl border border-[#d8c9ad] bg-[#fffdf7] px-4 py-2.5 text-sm text-[#531c1d] outline-none focus:border-[#9b772d]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Failed">Failed</option>
                </select>

                <select
                  value={methodFilter}
                  onChange={(event) =>
                    setMethodFilter(
                      event.target.value as "All" | PaymentMethod
                    )
                  }
                  className="rounded-xl border border-[#d8c9ad] bg-[#fffdf7] px-4 py-2.5 text-sm text-[#531c1d] outline-none focus:border-[#9b772d]"
                >
                  <option value="All">All Methods</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="Wallet">Wallet</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0]">
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-[#dfd2ba] bg-[#f9f2e2]">
                  <tr className="text-xs uppercase tracking-wider text-[#806b5d]">
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Method</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#eadfce]">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-[#fdf8ed]"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#641f20]">
                          {payment.id}
                        </p>

                        <p className="mt-1 text-xs text-[#9a8878]">
                          {payment.orderId}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-[#531c1d]">
                          {payment.customer}
                        </p>

                        <p className="mt-1 text-xs text-[#9a8878]">
                          {payment.reference}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-bold text-[#531c1d]">
                        {formatAmount(payment.amount)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 text-sm text-[#665448]">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f4ead5] text-[#641f20]">
                            {methodIcons[payment.method]}
                          </span>

                          {payment.method}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#806b5d]">
                        {payment.date}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={payment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayments.length === 0 && <EmptyPayments />}
          </div>

          <div className="mt-4 text-sm text-[#806b5d]">
            Showing{" "}
            <span className="font-semibold text-[#531c1d]">
              {filteredPayments.length}
            </span>{" "}
            of {payments.length} verified transactions.
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Payment security
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Payment information is intentionally not fabricated in this
                workspace. Razorpay verification, refunds, settlements and
                transaction actions will use only the confirmed backend
                payment-management contract.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 flex gap-3 rounded-2xl border border-[#d8c9ad] bg-[#fffaf0] p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9b772d]" />

          <p className="text-sm leading-6 text-[#806b5d]">
            No sample transactions, customer names, payment references,
            amounts or settlement figures are displayed until verified
            payment records are available.
          </p>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "maroon" | "green" | "gold" | "purple";
}) {
  const toneClass =
    tone === "maroon"
      ? "bg-[#f2dfd8] text-[#641f20]"
      : tone === "green"
        ? "bg-[#e5efe2] text-[#416846]"
        : tone === "gold"
          ? "bg-[#f8edcf] text-[#8b6828]"
          : "bg-[#eee4ef] text-[#714879]";

  return (
    <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#531c1d]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.icon}
      {status}
    </span>
  );
}

function EmptyPayments() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8d3] text-[#9b772d]">
        <Search className="h-6 w-6" />
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        No verified payments found
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-[#806b5d]">
        No payment transactions are currently loaded. Search and filters will
        work automatically when verified payment records are connected.
      </p>
    </div>
  );
}
