"use client";

import {
  BookOpen,
  ChevronDown,
  Filter,
  Info,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type TraditionStatus = "Published" | "Draft" | "Review";

type Tradition = {
  id: string;
  name: string;
  region: string;
  state: string;
  craft: string;
  artisans: number | null;
  status: TraditionStatus;
  updated: string | null;
  description: string;
};

const traditions: Tradition[] = [];

const statusStyles: Record<
  TraditionStatus,
  string
> = {
  Published:
    "border-[#8bb58b]/40 bg-[#e7f2e6] text-[#35613a]",
  Draft:
    "border-[#d2a94d]/40 bg-[#fff3d7] text-[#8b6828]",
  Review:
    "border-[#b79abd]/40 bg-[#f1e9f3] text-[#714879]",
};

export default function AdminTraditionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "All" | TraditionStatus
  >("All");

  const filteredTraditions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return traditions.filter((tradition) => {
      const matchesSearch =
        !query ||
        tradition.name.toLowerCase().includes(query) ||
        tradition.region.toLowerCase().includes(query) ||
        tradition.state.toLowerCase().includes(query) ||
        tradition.craft.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || tradition.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const publishedCount = traditions.filter(
    (item) => item.status === "Published",
  ).length;

  const draftCount = traditions.filter(
    (item) => item.status === "Draft",
  ).length;

  const reviewCount = traditions.filter(
    (item) => item.status === "Review",
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <section className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                <Sparkles className="h-4 w-4" />
                Heritage Knowledge
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Traditions
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Manage and review India&apos;s craft traditions using
                verified marketplace content.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#d7cdbd] px-5 py-3 text-sm font-semibold text-[#806b5d]"
            >
              Add Tradition Unavailable
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Traditions"
            value={traditions.length}
            icon={<BookOpen className="h-5 w-5" />}
          />

          <StatCard
            label="Published"
            value={publishedCount}
            icon={<Sparkles className="h-5 w-5" />}
          />

          <StatCard
            label="Draft"
            value={draftCount}
            icon={<BookOpen className="h-5 w-5" />}
          />

          <StatCard
            label="Needs Review"
            value={reviewCount}
            icon={<Filter className="h-5 w-5" />}
          />
        </section>

        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] shadow-sm">
          <div className="border-b border-[#dfd2ba] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Tradition Library
                </h2>

                <p className="mt-1 text-sm text-[#806b5d]">
                  Browse verified tradition records available to
                  administration.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search traditions..."
                    className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#531c1d] outline-none placeholder:text-[#aa9889] focus:border-[#9b772d] sm:w-64"
                  />
                </div>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(
                        event.target.value as
                          | "All"
                          | TraditionStatus,
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:w-40"
                  >
                    <option value="All">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Review">Review</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b6828]" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="border-b border-[#dfd2ba] bg-[#f9f2e2]">
                <tr className="text-xs uppercase tracking-wider text-[#806b5d]">
                  <th className="px-5 py-4">Tradition</th>
                  <th className="px-5 py-4">Region</th>
                  <th className="px-5 py-4">State</th>
                  <th className="px-5 py-4">Craft</th>
                  <th className="px-5 py-4">Artisans</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Updated</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eadfce]">
                {filteredTraditions.map((tradition) => (
                  <tr
                    key={tradition.id}
                    className="transition hover:bg-[#fdf8ed]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#641f20]">
                        {tradition.name}
                      </p>

                      <p className="mt-1 max-w-xs text-xs leading-5 text-[#9a8878]">
                        {tradition.description}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#665448]">
                        <MapPin className="h-4 w-4 text-[#9b772d]" />
                        {tradition.region}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#806b5d]">
                      {tradition.state}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#806b5d]">
                      {tradition.craft}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#531c1d]">
                      {tradition.artisans ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[tradition.status]}`}
                      >
                        {tradition.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-[#806b5d]">
                      {tradition.updated ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTraditions.length === 0 && (
            <div className="flex flex-col items-center justify-center border-t border-[#eadfce] px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8d3] text-[#9b772d]">
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
                No verified tradition records available
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#806b5d]">
                Tradition records are not currently loaded from a verified
                admin tradition-management API. No sample traditions,
                artisan counts, statuses or dates are displayed.
              </p>

              {(search || status !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatus("All");
                  }}
                  className="mt-5 rounded-xl border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#641f20] transition hover:bg-[#f8edcf]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8edcf] text-[#8b6828]">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                  Regional Heritage
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#806b5d]">
                  Tradition records can connect regional craft knowledge,
                  artisan communities and marketplace storytelling once the
                  verified content-management contract is available.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#641f20] p-6 text-[#fffaf0]">
            <Sparkles className="h-6 w-6 text-[#e4c477]" />

            <h2 className="mt-4 font-serif text-xl font-semibold">
              Heritage Content Integrity
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#f1dfbd]">
              KALAKRITI avoids invented heritage records. Names, regions,
              descriptions, artisan counts and publication status will be
              shown only when supplied by a verified backend source.
            </p>
          </div>
        </section>

        <section className="mt-7 flex gap-3 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9b772d]" />

          <div>
            <h3 className="font-semibold text-[#531c1d]">
              Tradition management API required
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#806b5d]">
              This page is intentionally read-only until a verified admin
              tradition-management endpoint and response contract are
              available. Create, edit, publish, review and delete actions are
              not simulated locally.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-[0_8px_30px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#531c1d]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3e5d1] text-[#641f20]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#aa9889]">
        Verified backend data unavailable
      </p>
    </div>
  );
}
