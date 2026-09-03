"use client";

import {
  ArrowDownToLine,
  ArrowUpRight,
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  IndianRupee,
  MoreHorizontal,
  Search,
  ShieldCheck,
  TrendingUp,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type PayoutStatus = "Paid" | "Processing" | "Pending" | "Failed";

type Payout = {
  id: string;
  artisan: string;
  craft: string;
  amount: number;
  commission: number;
  netAmount: number;
  status: PayoutStatus;
  date: string;
  bank: string;
};

const payouts: Payout[] = [
  {
    id: "PO-00842",
    artisan: "Ramesh Lal",
    craft: "Blue Pottery",
    amount: 18400,
    commission: 1840,
    netAmount: 16560,
    status: "Paid",
    date: "02 Sep 2026",
    bank: "HDFC •••• 4821",
  },
  {
    id: "PO-00841",
    artisan: "Savitri Devi",
    craft: "Banarasi Weaving",
    amount: 25600,
    commission: 2560,
    netAmount: 23040,
    status: "Processing",
    date: "02 Sep 2026",
    bank: "SBI •••• 7214",
  },
  {
    id: "PO-00840",
    artisan: "Mohan Prajapati",
    craft: "Terracotta",
    amount: 12800,
    commission: 1280,
    netAmount: 11520,
    status: "Paid",
    date: "01 Sep 2026",
    bank: "Axis •••• 3690",
  },
  {
    id: "PO-00839",
    artisan: "Farida Begum",
    craft: "Chikankari",
    amount: 21900,
    commission: 2190,
    netAmount: 19710,
    status: "Paid",
    date: "01 Sep 2026",
    bank: "ICICI •••• 1847",
  },
  {
    id: "PO-00838",
    artisan: "Kamal Singh",
    craft: "Dhokra Art",
    amount: 9600,
    commission: 960,
    netAmount: 8640,
    status: "Pending",
    date: "31 Aug 2026",
    bank: "PNB •••• 6031",
  },
  {
    id: "PO-00837",
    artisan: "Laxmi Bai",
    craft: "Madhubani Painting",
    amount: 31400,
    commission: 3140,
    netAmount: 28260,
    status: "Paid",
    date: "30 Aug 2026",
    bank: "SBI •••• 9442",
  },
  {
    id: "PO-00836",
    artisan: "Harish Kumar",
    craft: "Wood Carving",
    amount: 14750,
    commission: 1475,
    netAmount: 13275,
    status: "Failed",
    date: "29 Aug 2026",
    bank: "Kotak •••• 2718",
  },
  {
    id: "PO-00835",
    artisan: "Anita Kumari",
    craft: "Phulkari Embroidery",
    amount: 17200,
    commission: 1720,
    netAmount: 15480,
    status: "Paid",
    date: "28 Aug 2026",
    bank: "HDFC •••• 5210",
  },
];

const statusStyles: Record<
  PayoutStatus,
  { className: string; icon: React.ReactNode }
> = {
  Paid: {
    className: "bg-[#e7f2e6] text-[#35613a] border-[#8bb58b]/40",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  Processing: {
    className: "bg-[#eee8f3] text-[#714879] border-[#b79abd]/40",
    icon: <Clock3 className="h-3.5 w-3.5" />,
  },
  Pending: {
    className: "bg-[#fff3d7] text-[#8b6828] border-[#d2a94d]/40",
    icon: <Clock3 className="h-3.5 w-3.5" />,
  },
  Failed: {
    className: "bg-[#f9e5e2] text-[#9b3d35] border-[#d99a91]/40",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function AdminPayoutsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PayoutStatus>(
    "All",
  );

  const filteredPayouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payouts.filter((payout) => {
      const matchesSearch =
        !query ||
        payout.id.toLowerCase().includes(query) ||
        payout.artisan.toLowerCase().includes(query) ||
        payout.craft.toLowerCase().includes(query) ||
        payout.bank.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payout.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const stats = [
    {
      label: "Total Artisan Earnings",
      value: "₹4,82,640",
      change: "+14.6%",
      icon: <IndianRupee className="h-5 w-5" />,
      tone: "maroon",
    },
    {
      label: "Paid to Artisans",
      value: "₹4,31,280",
      change: "+11.8%",
      icon: <CheckCircle2 className="h-5 w-5" />,
      tone: "green",
    },
    {
      label: "Pending Payouts",
      value: "₹32,460",
      change: "12 payouts",
      icon: <Clock3 className="h-5 w-5" />,
      tone: "gold",
    },
    {
      label: "Platform Commission",
      value: "₹48,900",
      change: "+8.2%",
      icon: <TrendingUp className="h-5 w-5" />,
      tone: "purple",
    },
  ];

  const settlementSummary = [
    {
      label: "Next Settlement",
      value: "05 Sep 2026",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      label: "Artisans Scheduled",
      value: "48",
      icon: <UserRound className="h-5 w-5" />,
    },
    {
      label: "Settlement Amount",
      value: "₹86,420",
      icon: <Banknote className="h-5 w-5" />,
    },
  ];

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
                Manage artisan earnings, commissions and marketplace
                settlements with complete payout visibility.
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#641f20] px-4 py-2.5 text-sm font-semibold text-[#fff8e9] transition hover:bg-[#531c1d]"
              >
                <Download className="h-4 w-4" />
                Export Payouts
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#806b5d]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-[#531c1d]">
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
                {stat.change.startsWith("+") ? (
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

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Upcoming Settlement
            </h2>
            <p className="text-sm text-[#806b5d]">
              The next scheduled artisan settlement cycle.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {settlementSummary.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-[#dfd2ba] bg-[#fdf8ed] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5ead1] text-[#641f20]">
                  {item.icon}
                </div>

                <div>
                  <p className="text-xs text-[#9a8878]">{item.label}</p>
                  <p className="mt-1 font-semibold text-[#531c1d]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-[#d2c39f] bg-[#f8edcf]/55 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#531c1d]">
                  Settlement verification enabled
                </p>
                <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                  Bank details are masked and payouts require server-side
                  verification before settlement.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-[#c9a45c]/40 bg-[#fffaf0] px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f7edd7]"
              >
                View Policy
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Artisan Payouts
            </h2>
            <p className="mt-1 text-sm text-[#806b5d]">
              Track individual earnings and settlement status.
            </p>
          </div>

          <div className="rounded-t-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payout ID, artisan, craft or bank..."
                  className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none placeholder:text-[#aa9889] focus:border-[#9b772d] focus:ring-2 focus:ring-[#9b772d]/10"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as "All" | PayoutStatus,
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:min-w-[180px]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
              </div>
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="border-b border-[#dfd2ba] bg-[#f9f2e2]">
                  <tr className="text-xs uppercase tracking-wider text-[#806b5d]">
                    <th className="px-5 py-4 font-semibold">Payout</th>
                    <th className="px-5 py-4 font-semibold">Artisan</th>
                    <th className="px-5 py-4 font-semibold">Gross</th>
                    <th className="px-5 py-4 font-semibold">Commission</th>
                    <th className="px-5 py-4 font-semibold">Net Payout</th>
                    <th className="px-5 py-4 font-semibold">Bank</th>
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
                          {payout.id}
                        </p>
                        <p className="mt-1 text-xs text-[#9a8878]">
                          {payout.date}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#531c1d]">
                          {payout.artisan}
                        </p>
                        <p className="mt-1 text-xs text-[#9a8878]">
                          {payout.craft}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#531c1d]">
                        {formatAmount(payout.amount)}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#806b5d]">
                        -{formatAmount(payout.commission)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-[#531c1d]">
                          {formatAmount(payout.netAmount)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#806b5d]">
                        {payout.bank}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={payout.status} />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          aria-label={`More actions for ${payout.id}`}
                          className="rounded-lg p-2 text-[#806b5d] hover:bg-[#f2e7d0] hover:text-[#641f20]"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
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
                        {payout.id}
                      </p>
                      <p className="mt-1 text-xs text-[#9a8878]">
                        {payout.date}
                      </p>
                    </div>

                    <StatusBadge status={payout.status} />
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-[#531c1d]">
                      {payout.artisan}
                    </p>
                    <p className="mt-1 text-xs text-[#806b5d]">
                      {payout.craft}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <Info label="Gross" value={formatAmount(payout.amount)} />
                    <Info
                      label="Commission"
                      value={`-${formatAmount(payout.commission)}`}
                    />
                    <Info
                      label="Net Payout"
                      value={formatAmount(payout.netAmount)}
                    />
                    <Info label="Bank" value={payout.bank} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyPayouts />
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[#806b5d] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredPayouts.length}
              </span>{" "}
              of {payouts.length} payouts
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
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20]"
              >
                2
              </button>

              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20]"
              >
                Next
                <ArrowUpRight className="ml-1 inline h-3 w-3" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3e6d0] text-[#641f20]">
              <ArrowDownToLine className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Payout reconciliation
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Reconcile completed payouts with marketplace orders and
                settlement records before the next finance cycle.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c9a45c]/40 bg-[#f8edcf] px-4 py-2.5 text-sm font-semibold text-[#641f20] hover:bg-[#f2e3bf]"
            >
              Start Reconciliation
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: PayoutStatus }) {
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#9a8878]">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-[#531c1d]">
        {value}
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