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

const auditLogs: AuditLog[] = [];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const pageSize = 10;

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalEvents = auditLogs.length;
  const successfulEvents = auditLogs.filter(
    (log) => log.status === "Success"
  ).length;
  const warningEvents = auditLogs.filter(
    (log) => log.status === "Warning"
  ).length;

  const latestActivity =
    auditLogs.length > 0 ? auditLogs[0].time : "—";

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <header className="flex flex-col gap-5 border-b border-[#b08a4a]/30 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Security & Activity
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#4a211c]">
              Audit Logs
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#80665d]">
              Review important actions performed across the KALAKRITI
              marketplace and administration system.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#b08a4a]/20 bg-[#eef2e8] px-4 py-3 text-xs font-semibold text-[#58704d]">
            <Shield className="h-4 w-4" />
            Read-only activity records
          </div>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Activity className="h-5 w-5" />}
            label="Total Events"
            value={totalEvents}
            note="Available records"
          />

          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Successful"
            value={successfulEvents}
            note="Recorded successful events"
          />

          <StatCard
            icon={<AlertTriangle className="h-5 w-5" />}
            label="Warnings"
            value={warningEvents}
            note="Recorded warnings"
          />

          <StatCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Latest Activity"
            value={latestActivity}
            note="Latest available record"
          />
        </section>

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

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
          <div className="flex flex-col gap-2 border-b border-[#b08a4a]/25 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                Activity History
              </h2>

              <p className="mt-1 text-xs text-[#80665d]">
                Showing {filteredLogs.length} available events
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#efe4ce] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
              <Activity className="h-3.5 w-3.5" />
              Read only
            </span>
          </div>

          {paginatedLogs.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#efe4ce] text-[#8b1e2d]">
                <Shield className="h-7 w-7" />
              </div>

              <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                No audit records available
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#80665d]">
                Audit history will appear here when the verified KALAKRITI
                backend audit service is connected to this administration
                page. No sample or fabricated activity is shown.
              </p>

              {(search || role !== "All" || status !== "All") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-2.5 text-sm font-semibold text-[#fff8eb] transition hover:bg-[#701722]"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
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
                  {paginatedLogs.map((log) => (
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

          {filteredLogs.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-[#b08a4a]/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#80665d]">
                Showing{" "}
                <span className="font-bold text-[#4a211c]">
                  {paginatedLogs.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#4a211c]">
                  {filteredLogs.length}
                </span>{" "}
                events
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#b08a4a]/30 text-[#6d5149] transition hover:bg-[#efe4ce] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#8b1e2d] px-2 text-xs font-bold text-[#fff8eb]">
                  {currentPage}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) =>
                      Math.min(totalPages, current + 1)
                    )
                  }
                  disabled={currentPage >= totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#b08a4a]/30 text-[#6d5149] transition hover:bg-[#efe4ce] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-xl border border-[#b08a4a]/25 bg-[#f1e8d5] p-5">
          <div className="flex gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1e2d]" />

            <div>
              <p className="text-sm font-semibold text-[#4a211c]">
                Audit records are read-only
              </p>

              <p className="mt-1 text-xs leading-5 text-[#80665d]">
                This administration view is intentionally not generating or
                displaying sample activity. Once the backend audit service
                exposes its verified listing contract, the records can be
                connected here without changing the presentation layer.
              </p>
            </div>
          </div>
        </section>
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
  value: string | number;
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
