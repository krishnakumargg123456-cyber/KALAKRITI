"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Search,
  Shield,
  UserRound,
} from "lucide-react";

type AuditLog = {
  id: string;
  action: string;
  description: string;
  actor: string;
  role: "Admin" | "Artisan" | "System";
  target: string;
  time: string;
  status: "Success" | "Warning";
};

const auditLogs: AuditLog[] = [
  {
    id: "AUD-1048",
    action: "Product Updated",
    description: "Updated price and inventory information",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Madhubani Wall Art",
    time: "2 min ago",
    status: "Success",
  },
  {
    id: "AUD-1047",
    action: "Order Status Changed",
    description: "Order marked as ready for dispatch",
    actor: "System",
    role: "System",
    target: "Order #KK-2841",
    time: "12 min ago",
    status: "Success",
  },
  {
    id: "AUD-1046",
    action: "Artisan Approved",
    description: "Artisan verification completed successfully",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Meera Ben",
    time: "28 min ago",
    status: "Success",
  },
  {
    id: "AUD-1045",
    action: "Login Attempt",
    description: "Admin login from a new browser session",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Admin Portal",
    time: "41 min ago",
    status: "Warning",
  },
  {
    id: "AUD-1044",
    action: "Coupon Created",
    description: "New seasonal coupon created",
    actor: "Krishna Admin",
    role: "Admin",
    target: "CRAFT10",
    time: "1 hr ago",
    status: "Success",
  },
  {
    id: "AUD-1043",
    action: "Product Published",
    description: "Product moved from draft to published",
    actor: "Ramesh Kumar",
    role: "Artisan",
    target: "Dhokra Decorative Horse",
    time: "2 hrs ago",
    status: "Success",
  },
  {
    id: "AUD-1042",
    action: "Inventory Updated",
    description: "Stock quantity manually adjusted",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Blue Pottery Vase",
    time: "3 hrs ago",
    status: "Success",
  },
  {
    id: "AUD-1041",
    action: "Review Moderated",
    description: "Review flagged for manual moderation",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Review #RV-918",
    time: "4 hrs ago",
    status: "Warning",
  },
  {
    id: "AUD-1040",
    action: "Payment Verified",
    description: "Payment reconciliation completed",
    actor: "System",
    role: "System",
    target: "Payment #PAY-7193",
    time: "5 hrs ago",
    status: "Success",
  },
  {
    id: "AUD-1039",
    action: "Category Updated",
    description: "Craft category metadata updated",
    actor: "Krishna Admin",
    role: "Admin",
    target: "Textiles",
    time: "6 hrs ago",
    status: "Success",
  },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return auditLogs.filter((log) => {
      const matchesSearch =
        !query ||
        log.id.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.description.toLowerCase().includes(query) ||
        log.actor.toLowerCase().includes(query) ||
        log.target.toLowerCase().includes(query);

      const matchesRole = role === "All" || log.role === role;
      const matchesStatus = status === "All" || log.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, role, status]);

  const resetFilters = () => {
    setSearch("");
    setRole("All");
    setStatus("All");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Header */}
        <header className="flex flex-col gap-5 border-b border-[#b08a4a]/30 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Security & Activity
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#4a211c]">
              Audit Logs
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#80665d]">
              Track important actions performed across the KALAKRITI
              marketplace and administration system.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#58704d]/20 bg-[#eef2e8] px-4 py-3 text-xs font-semibold text-[#58704d]">
            <Shield className="h-4 w-4" />
            Activity monitoring enabled
          </div>
        </header>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Activity className="h-5 w-5" />}
            label="Total Events"
            value="1,248"
            note="This month"
          />

          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Successful"
            value="1,196"
            note="95.8% of events"
          />

          <StatCard
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Warnings"
            value="52"
            note="Requires attention"
          />

          <StatCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Latest Activity"
            value="2 min"
            note="Updated just now"
          />
        </section>

        {/* Filters */}
        <section className="mt-8 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#80665d]" />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search event, actor, target or ID..."
                className="h-11 w-full rounded-lg border border-[#b08a4a]/30 bg-[#fffaf0] pl-11 pr-4 text-sm text-[#4a211c] outline-none placeholder:text-[#80665d] focus:border-[#8b1e2d]"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-lg border border-[#b08a4a]/30 bg-[#fffaf0] px-4 text-sm text-[#4a211c] outline-none focus:border-[#8b1e2d]"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Artisan">Artisan</option>
                <option value="System">System</option>
              </select>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
                className="h-11 rounded-lg border border-[#b08a4a]/30 bg-[#fffaf0] px-4 text-sm text-[#4a211c] outline-none focus:border-[#8b1e2d]"
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Warning">Warning</option>
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#b08a4a]/30 px-4 text-sm font-semibold text-[#6d5149] transition hover:bg-[#efe4ce]"
              >
                <Filter className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Logs */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
          <div className="flex flex-col gap-2 border-b border-[#b08a4a]/25 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                Activity History
              </h2>

              <p className="mt-1 text-xs text-[#80665d]">
                Showing {filteredLogs.length} matching events
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe4ce] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
              <Activity className="h-3.5 w-3.5" />
              Live log
            </span>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-[#b08a4a]" />

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#4a211c]">
                No activity found
              </h3>

              <p className="mt-2 text-sm text-[#80665d]">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-[#b08a4a]/20 bg-[#efe4ce]/40 text-[10px] uppercase tracking-wider text-[#80665d]">
                    <th className="px-6 py-4 font-bold">Event</th>
                    <th className="px-6 py-4 font-bold">Actor</th>
                    <th className="px-6 py-4 font-bold">Target</th>
                    <th className="px-6 py-4 font-bold">Time</th>
                    <th className="px-6 py-4 text-right font-bold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-[#b08a4a]/15 last:border-0 transition hover:bg-[#fffaf0]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              log.status === "Success"
                                ? "bg-[#eef2e8] text-[#58704d]"
                                : "bg-[#f4e7df] text-[#8b1e2d]"
                            }`}
                          >
                            {log.status === "Success" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <AlertTriangle className="h-4 w-4" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-[#4a211c]">
                              {log.action}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#80665d]">
                              {log.description}
                            </p>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#b08a4a]">
                              {log.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe4ce] text-[#8b1e2d]">
                            {log.role === "System" ? (
                              <Activity className="h-4 w-4" />
                            ) : (
                              <UserRound className="h-4 w-4" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#4a211c]">
                              {log.actor}
                            </p>

                            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#80665d]">
                              {log.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-[#4a211c]">
                        {log.target}
                      </td>

                      <td className="px-6 py-5 text-xs text-[#80665d]">
                        {log.time}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                            log.status === "Success"
                              ? "bg-[#eef2e8] text-[#58704d]"
                              : "bg-[#f4e7df] text-[#8b1e2d]"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#b08a4a]/20 px-6 py-4">
            <p className="text-xs text-[#80665d]">
              Page <span className="font-bold text-[#4a211c]">{page}</span> of{" "}
              <span className="font-bold text-[#4a211c]">1</span>
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#b08a4a]/30 text-[#6d5149] transition hover:bg-[#efe4ce] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b1e2d] text-xs font-bold text-[#fff8eb]"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#b08a4a]/30 text-[#6d5149] opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <p className="mt-6 text-xs leading-5 text-[#80665d]">
          Audit records are intended to become read-only historical records
          once connected to the KALAKRITI backend audit service.
        </p>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
        {icon}
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-[#80665d]">
        {label}
      </p>

      <p className="mt-1 font-serif text-2xl font-bold text-[#4a211c]">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-[#80665d]">{note}</p>
    </article>
  );
}