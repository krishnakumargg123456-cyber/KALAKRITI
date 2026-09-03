"use client";

import {
  
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  IndianRupee,
  MoreHorizontal,
  RefreshCcw,
  Search,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  WalletCards,
  XCircle,
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

const payments: Payment[] = [
  {
    id: "PAY-10482",
    orderId: "ORD-28491",
    customer: "Aarav Sharma",
    amount: 4890,
    method: "UPI",
    status: "Completed",
    date: "02 Sep 2026, 02:18 PM",
    reference: "pay_RP82K91X",
  },
  {
    id: "PAY-10481",
    orderId: "ORD-28490",
    customer: "Meera Kapoor",
    amount: 7250,
    method: "Card",
    status: "Completed",
    date: "02 Sep 2026, 01:42 PM",
    reference: "pay_RP82K74M",
  },
  {
    id: "PAY-10480",
    orderId: "ORD-28489",
    customer: "Rohan Verma",
    amount: 2199,
    method: "Net Banking",
    status: "Pending",
    date: "02 Sep 2026, 12:56 PM",
    reference: "pay_RP82K63Q",
  },
  {
    id: "PAY-10479",
    orderId: "ORD-28488",
    customer: "Ishita Singh",
    amount: 3499,
    method: "UPI",
    status: "Completed",
    date: "02 Sep 2026, 11:31 AM",
    reference: "pay_RP82K51P",
  },
  {
    id: "PAY-10478",
    orderId: "ORD-28487",
    customer: "Kabir Malhotra",
    amount: 8900,
    method: "Card",
    status: "Refunded",
    date: "02 Sep 2026, 10:48 AM",
    reference: "pay_RP82K42A",
  },
  {
    id: "PAY-10477",
    orderId: "ORD-28486",
    customer: "Ananya Gupta",
    amount: 1599,
    method: "Wallet",
    status: "Completed",
    date: "01 Sep 2026, 08:15 PM",
    reference: "pay_RP81J98N",
  },
  {
    id: "PAY-10476",
    orderId: "ORD-28485",
    customer: "Vikram Joshi",
    amount: 5600,
    method: "UPI",
    status: "Failed",
    date: "01 Sep 2026, 07:44 PM",
    reference: "pay_RP81J72B",
  },
  {
    id: "PAY-10475",
    orderId: "ORD-28484",
    customer: "Diya Mehta",
    amount: 2890,
    method: "Card",
    status: "Completed",
    date: "01 Sep 2026, 06:21 PM",
    reference: "pay_RP81J61C",
  },
  {
    id: "PAY-10474",
    orderId: "ORD-28483",
    customer: "Aditya Rao",
    amount: 4200,
    method: "UPI",
    status: "Completed",
    date: "01 Sep 2026, 05:37 PM",
    reference: "pay_RP81J49D",
  },
  {
    id: "PAY-10473",
    orderId: "ORD-28482",
    customer: "Naina Bhatia",
    amount: 6800,
    method: "Net Banking",
    status: "Pending",
    date: "01 Sep 2026, 04:19 PM",
    reference: "pay_RP81J31F",
  },
];

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
  return `â‚¹${amount.toLocaleString("en-IN")}`;
}

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>("All");
  const [methodFilter, setMethodFilter] = useState<"All" | PaymentMethod>("All");

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

  const stats = [
    {
      label: "Total Processed",
      value: "â‚¹2,84,650",
      change: "+12.8%",
      icon: <IndianRupee className="h-5 w-5" />,
      tone: "maroon",
    },
    {
      label: "Successful Payments",
      value: "â‚¹2,61,430",
      change: "+9.4%",
      icon: <CheckCircle2 className="h-5 w-5" />,
      tone: "green",
    },
    {
      label: "Pending Payments",
      value: "â‚¹14,820",
      change: "18 transactions",
      icon: <Clock3 className="h-5 w-5" />,
      tone: "gold",
    },
    {
      label: "Refunds",
      value: "â‚¹8,400",
      change: "6 transactions",
      icon: <RefreshCcw className="h-5 w-5" />,
      tone: "purple",
    },
  ];

  const paymentMethods = [
    {
      name: "UPI",
      amount: "â‚¹1,42,850",
      percentage: "50.2%",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      name: "Cards",
      amount: "â‚¹86,420",
      percentage: "30.4%",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Net Banking",
      amount: "â‚¹38,260",
      percentage: "13.4%",
      icon: <Banknote className="h-5 w-5" />,
    },
    {
      name: "Wallets",
      amount: "â‚¹17,120",
      percentage: "6.0%",
      icon: <WalletCards className="h-5 w-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
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
                Monitor transactions, payment methods, refunds and settlement
                activity across the KALAKRITI marketplace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-medium text-[#641f20] transition hover:bg-[#f8edcf]"
              >
                <CalendarDays className="h-4 w-4" />
                September 2026
                <ChevronDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-[#641f20] px-4 py-2.5 text-sm font-semibold text-[#fff8e9] shadow-sm transition hover:bg-[#531c1d]"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#806b5d]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#531c1d]">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    stat.tone === "maroon"
                      ? "bg-[#f2dfd8] text-[#641f20]"
                      : stat.tone === "green"
                        ? "bg-[#e5efe2] text-[#416846]"
                        : stat.tone === "gold"
                          ? "bg-[#f8edcf] text-[#8b6828]"
                          : "bg-[#eee4ef] text-[#714879]"
                  }`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs">
                {stat.tone === "maroon" || stat.tone === "green" ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#47734a]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {stat.change}
                  </span>
                ) : (
                  <span className="font-medium text-[#806b5d]">
                    {stat.change}
                  </span>
                )}
                <span className="text-[#aa9889]">vs last month</span>
              </div>
            </div>
          ))}
        </section>

        {/* Payment methods */}
        <section className="mt-7">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Payment Methods
            </h2>
            <p className="mt-1 text-sm text-[#806b5d]">
              Current distribution of successful payment volume.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5ead1] text-[#641f20]">
                    {method.icon}
                  </div>
                  <span className="text-xs font-bold text-[#8b6828]">
                    {method.percentage}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-[#806b5d]">
                  {method.name}
                </p>

                <p className="mt-1 text-xl font-bold text-[#531c1d]">
                  {method.amount}
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eadfc9]">
                  <div
                    className="h-full rounded-full bg-[#9b772d]"
                    style={{
                      width: method.percentage,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions */}
        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                Recent Transactions
              </h2>
              <p className="mt-1 text-sm text-[#806b5d]">
                Review and monitor every marketplace payment.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#806b5d]">
              <span className="h-2 w-2 rounded-full bg-[#47734a]" />
              Secure payment processing
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-t-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payment ID, order, customer or reference..."
                  className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none transition placeholder:text-[#aa9889] focus:border-[#9b772d] focus:ring-2 focus:ring-[#9b772d]/10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target.value as "All" | PaymentStatus,
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:min-w-[155px]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
                </div>

                <div className="relative">
                  <select
                    value={methodFilter}
                    onChange={(event) =>
                      setMethodFilter(
                        event.target.value as "All" | PaymentMethod,
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:min-w-[155px]"
                  >
                    <option value="All">All Methods</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Wallet">Wallet</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-[#dfd2ba] bg-[#f9f2e2]">
                  <tr className="text-xs uppercase tracking-wider text-[#806b5d]">
                    <th className="px-5 py-4 font-semibold">Payment</th>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Amount</th>
                    <th className="px-5 py-4 font-semibold">Method</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
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

                      <td className="px-5 py-4">
                        <span className="font-bold text-[#531c1d]">
                          {formatAmount(payment.amount)}
                        </span>
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

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          aria-label={`View ${payment.id}`}
                          className="rounded-lg p-2 text-[#806b5d] transition hover:bg-[#f2e7d0] hover:text-[#641f20]"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayments.length === 0 && <EmptyPayments />}
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] p-4 lg:hidden">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-xl border border-[#dfd2ba] bg-[#fffdf7] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#641f20]">
                        {payment.id}
                      </p>
                      <p className="mt-1 text-xs text-[#9a8878]">
                        {payment.orderId}
                      </p>
                    </div>

                    <StatusBadge status={payment.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#9a8878]">Customer</p>
                      <p className="mt-1 text-sm font-medium text-[#531c1d]">
                        {payment.customer}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#9a8878]">Amount</p>
                      <p className="mt-1 text-sm font-bold text-[#531c1d]">
                        {formatAmount(payment.amount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#9a8878]">Method</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-[#665448]">
                        <span className="text-[#641f20]">
                          {methodIcons[payment.method]}
                        </span>
                        {payment.method}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-[#9a8878]">Reference</p>
                      <p className="mt-1 truncate text-sm text-[#665448]">
                        {payment.reference}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#eadfce] pt-3 text-xs text-[#9a8878]">
                    {payment.date}
                  </div>
                </div>
              ))
            ) : (
              <EmptyPayments />
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col gap-3 text-sm text-[#806b5d] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredPayments.length}
              </span>{" "}
              of {payments.length} transactions
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-lg border border-[#d8c9ad] bg-[#f6eedf] px-3 py-2 text-xs font-medium text-[#aa9889]"
              >
                Previous
              </button>
              <span className="rounded-lg bg-[#641f20] px-3 py-2 text-xs font-semibold text-[#fff8e9]">
                1
              </span>
              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20] hover:bg-[#f8edcf]"
              >
                2
              </button>
              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20] hover:bg-[#f8edcf]"
              >
                Next
                <ArrowUpRight className="ml-1 inline h-3 w-3" />
              </button>
            </div>
          </div>
        </section>

        {/* Security note */}
        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Payment security
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Transaction details shown here are protected. Razorpay
                integration and server-side verification will be connected
                during the backend integration phase.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#9b772d]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#641f20] hover:bg-[#f7edd7]"
            >
              View Security
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
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
        No payments found
      </h3>
      <p className="mt-1 max-w-sm text-sm text-[#806b5d]">
        Try changing your search or filters to find the transaction you are
        looking for.
      </p>
    </div>
  );
}