"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
  
} from "lucide-react";

type TraditionStatus = "Published" | "Draft" | "Review";

type Tradition = {
  id: number;
  name: string;
  region: string;
  state: string;
  craft: string;
  artisans: number;
  status: TraditionStatus;
  updated: string;
  description: string;
};

const initialTraditions: Tradition[] = [
  {
    id: 1,
    name: "Madhubani Painting",
    region: "Mithila",
    state: "Bihar",
    craft: "Painting",
    artisans: 186,
    status: "Published",
    updated: "29 Aug 2026",
    description:
      "A distinctive folk painting tradition known for intricate lines, symbolic forms and vibrant natural colours.",
  },
  {
    id: 2,
    name: "Blue Pottery",
    region: "Jaipur",
    state: "Rajasthan",
    craft: "Pottery",
    artisans: 94,
    status: "Published",
    updated: "27 Aug 2026",
    description:
      "A celebrated Jaipur craft using quartz-based material, mineral colours and distinctive blue patterns.",
  },
  {
    id: 3,
    name: "Kutch Embroidery",
    region: "Kutch",
    state: "Gujarat",
    craft: "Embroidery",
    artisans: 142,
    status: "Published",
    updated: "25 Aug 2026",
    description:
      "Rich textile traditions featuring geometric patterns, mirror work and generations of needlecraft.",
  },
  {
    id: 4,
    name: "Dhokra Metal Casting",
    region: "Bastar",
    state: "Chhattisgarh",
    craft: "Metal Craft",
    artisans: 67,
    status: "Review",
    updated: "31 Aug 2026",
    description:
      "An ancient lost-wax metal casting tradition producing distinctive tribal figurines and objects.",
  },
  {
    id: 5,
    name: "Channapatna Toys",
    region: "Channapatna",
    state: "Karnataka",
    craft: "Wood Craft",
    artisans: 53,
    status: "Draft",
    updated: "Ã¢â‚¬â€",
    description:
      "Colourful lacquered wooden toys shaped using traditional techniques passed through artisan families.",
  },
];

const statusStyles: Record<TraditionStatus, string> = {
  Published: "border-[#47734d]/30 bg-[#edf4e9] text-[#416344]",
  Draft: "border-[#9b772d]/30 bg-[#f8edcf] text-[#856525]",
  Review: "border-[#765b78]/25 bg-[#eee9f1] text-[#62556a]",
};

function StatusIcon({ status }: { status: TraditionStatus }) {
  if (status === "Published") return <CheckCircle2 size={14} />;
  if (status === "Review") return <Eye size={14} />;
  return <Edit3 size={14} />;
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof BookOpen;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_6px_24px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#806b5d]">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-[#531c1d]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
          <Icon size={19} strokeWidth={1.7} />
        </div>
      </div>

      <p className="mt-3 text-xs text-[#806b5d]">{detail}</p>
    </div>
  );
}

export default function AdminTraditionsPage() {
  const [traditions, setTraditions] =
    useState<Tradition[]>(initialTraditions);

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [statusFilter, setStatusFilter] = useState<
    "All Status" | TraditionStatus
  >("All Status");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const states = useMemo(
    () => Array.from(new Set(traditions.map((item) => item.state))).sort(),
    [traditions]
  );

  const filteredTraditions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return traditions.filter((tradition) => {
      const matchesSearch =
        !query ||
        tradition.name.toLowerCase().includes(query) ||
        tradition.region.toLowerCase().includes(query) ||
        tradition.state.toLowerCase().includes(query) ||
        tradition.craft.toLowerCase().includes(query);

      const matchesState =
        stateFilter === "All States" ||
        tradition.state === stateFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        tradition.status === statusFilter;

      return matchesSearch && matchesState && matchesStatus;
    });
  }, [traditions, search, stateFilter, statusFilter]);

  const publishedCount = traditions.filter(
    (item) => item.status === "Published"
  ).length;

  const reviewCount = traditions.filter(
    (item) => item.status === "Review"
  ).length;

  const artisanCount = traditions.reduce(
    (sum, item) => sum + item.artisans,
    0
  );

  const deleteTradition = (id: number) => {
    setTraditions((current) =>
      current.filter((tradition) => tradition.id !== id)
    );
    setActiveMenu(null);
  };

  const publishTradition = (id: number) => {
    setTraditions((current) =>
      current.map((tradition) =>
        tradition.id === id
          ? {
              ...tradition,
              status: "Published",
              updated: "02 Sep 2026",
            }
          : tradition
      )
    );
    setActiveMenu(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <span className="h-px w-8 bg-[#9b772d]" />
                Heritage Library
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#531c1d] sm:text-4xl">
                Craft Traditions
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d] sm:text-base">
                Preserve and present India&apos;s living craft traditions through
                regional histories, techniques, communities and artisan
                knowledge.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#fff8e9] shadow-sm transition hover:bg-[#53191a]"
            >
              <Plus size={18} />
              Add Tradition
            </button>
          </div>
        </div>
      </header>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#9b772d]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Traditions"
            value={traditions.length.toString()}
            detail="Craft traditions in the library"
            icon={BookOpen}
          />

          <StatCard
            label="Published"
            value={publishedCount.toString()}
            detail="Traditions visible to visitors"
            icon={CheckCircle2}
          />

          <StatCard
            label="Awaiting Review"
            value={reviewCount.toString()}
            detail="Entries requiring editorial review"
            icon={Eye}
          />

          <StatCard
            label="Artisan Records"
            value={artisanCount.toLocaleString("en-IN")}
            detail="Associated artisan profiles"
            icon={Users}
          />
        </div>

        {/* Heritage banner */}
        <div className="my-8 overflow-hidden rounded-xl border border-[#c9a45c]/30 bg-[#641f20]">
          <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e6ca83]/40 bg-[#fff8e9]/10 text-[#e6ca83]">
                <Sparkles size={20} strokeWidth={1.6} />
              </div>

              <div>
                <p className="font-serif text-xl font-semibold text-[#fff8e9]">
                  India&apos;s craft heritage is living knowledge.
                </p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#f3e5c9]/75">
                  Document each tradition with respect for its communities,
                  regional identity and generations of inherited skill.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e6ca83]">
              <MapPin size={15} />
              Across India
            </div>
          </div>
        </div>

        {/* Library */}
        <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[#c9a45c]/20 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                Tradition Library
              </h2>
              <p className="mt-1 text-sm text-[#806b5d]">
                Manage regional craft heritage entries.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search traditions..."
                  className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none placeholder:text-[#a39382] focus:border-[#641f20] sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />

                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-10 pr-9 text-sm text-[#531c1d] outline-none focus:border-[#641f20] sm:w-44"
                >
                  <option>All States</option>
                  {states.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "All Status"
                        | TraditionStatus
                    )
                  }
                  className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-4 pr-9 text-sm text-[#531c1d] outline-none focus:border-[#641f20] sm:w-40"
                >
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Review</option>
                  <option>Draft</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-b border-[#c9a45c]/20 bg-[#f8edcf]/45 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Tradition
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Region
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Craft
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Artisans
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Updated
                  </th>
                  <th className="w-14 px-5 py-4" />
                </tr>
              </thead>

              <tbody>
                {filteredTraditions.map((tradition) => (
                  <tr
                    key={tradition.id}
                    className="border-b border-[#c9a45c]/15 transition hover:bg-[#fffaf0]"
                  >
                    <td className="px-5 py-5">
                      <div className="flex max-w-md gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                          <BookOpen size={19} strokeWidth={1.6} />
                        </div>

                        <div>
                          <p className="font-serif text-base font-semibold text-[#531c1d]">
                            {tradition.name}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#806b5d]">
                            {tradition.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={15}
                          className="mt-0.5 shrink-0 text-[#9b772d]"
                        />
                        <div>
                          <p className="text-sm font-medium text-[#531c1d]">
                            {tradition.region}
                          </p>
                          <p className="mt-0.5 text-xs text-[#806b5d]">
                            {tradition.state}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-full border border-[#c9a45c]/30 bg-[#f8edcf]/60 px-3 py-1.5 text-xs font-medium text-[#765c29]">
                        {tradition.craft}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#531c1d]">
                        <Users size={15} className="text-[#9b772d]" />
                        {tradition.artisans.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[tradition.status]}`}
                      >
                        <StatusIcon status={tradition.status} />
                        {tradition.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#806b5d]">
                      {tradition.updated}
                    </td>

                    <td className="relative px-5 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === tradition.id
                              ? null
                              : tradition.id
                          )
                        }
                        className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f8edcf] hover:text-[#641f20]"
                        aria-label={`Actions for ${tradition.name}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenu === tradition.id && (
                        <div className="absolute right-5 top-14 z-20 w-44 overflow-hidden rounded-lg border border-[#c9a45c]/30 bg-[#fffaf0] py-1 shadow-[0_12px_30px_rgba(83,28,29,0.12)]">
                          <button
                            type="button"
                            onClick={() => setActiveMenu(null)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#531c1d] hover:bg-[#f8edcf]/70"
                          >
                            <Eye size={15} />
                            Preview
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveMenu(null)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#531c1d] hover:bg-[#f8edcf]/70"
                          >
                            <Edit3 size={15} />
                            Edit Tradition
                          </button>

                          {tradition.status !== "Published" && (
                            <button
                              type="button"
                              onClick={() =>
                                publishTradition(tradition.id)
                              }
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#416344] hover:bg-[#edf4e9]"
                            >
                              <CheckCircle2 size={15} />
                              Publish
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              deleteTradition(tradition.id)
                            }
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#9a3f3f] hover:bg-[#f9e8e4]"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTraditions.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <BookOpen size={22} />
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                  No traditions found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#806b5d]">
                  Try changing the search or filters to find another heritage
                  entry.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#c9a45c]/20 px-5 py-4">
            <p className="text-xs text-[#806b5d]">
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredTraditions.length}
              </span>{" "}
              of {traditions.length} traditions
            </p>

            <p className="hidden text-xs text-[#9b772d] sm:block">
              Heritage content workspace
            </p>
          </div>
        </section>
      </div>

      {/* Add Tradition Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#351716]/45 p-5 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl border border-[#c9a45c]/40 bg-[#fbf7ed] shadow-[0_20px_60px_rgba(53,23,22,0.2)]">
            <div className="flex items-start justify-between border-b border-[#c9a45c]/20 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                  Heritage Library
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                  Add Craft Tradition
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md p-2 text-[#806b5d] hover:bg-[#f8edcf] hover:text-[#641f20]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Tradition Name
                  </span>
                  <input
                    placeholder="e.g. Kalamkari"
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none placeholder:text-[#a39382] focus:border-[#641f20]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Craft Type
                  </span>
                  <input
                    placeholder="e.g. Textile"
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none placeholder:text-[#a39382] focus:border-[#641f20]"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Region
                  </span>
                  <input
                    placeholder="e.g. Machilipatnam"
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none placeholder:text-[#a39382] focus:border-[#641f20]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    State
                  </span>
                  <input
                    placeholder="e.g. Andhra Pradesh"
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none placeholder:text-[#a39382] focus:border-[#641f20]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                  Description
                </span>
                <textarea
                  rows={4}
                  placeholder="Describe the history, techniques and cultural significance..."
                  className="w-full resize-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none placeholder:text-[#a39382] focus:border-[#641f20]"
                />
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-[#c9a45c]/25 bg-[#f8edcf]/45 p-4">
                <Sparkles size={17} className="shrink-0 text-[#9b772d]" />
                <p className="text-xs leading-5 text-[#806b5d]">
                  This form is currently frontend-only. Tradition records,
                  images and heritage metadata will connect to the FastAPI
                  backend in the API integration phase.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#c9a45c]/20 px-6 py-5">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md border border-[#c9a45c]/40 px-4 py-2.5 text-sm font-semibold text-[#531c1d] hover:bg-[#f8edcf]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md bg-[#641f20] px-5 py-2.5 text-sm font-semibold text-[#fff8e9] hover:bg-[#53191a]"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}