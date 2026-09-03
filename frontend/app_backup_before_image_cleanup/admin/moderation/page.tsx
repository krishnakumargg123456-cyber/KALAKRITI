"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  MoreHorizontal,
  Package,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

type ModerationType = "Product" | "Review" | "Artisan" | "Story";
type ModerationStatus = "Pending" | "Approved" | "Rejected";

type ModerationItem = {
  id: number;
  title: string;
  description: string;
  type: ModerationType;
  submittedBy: string;
  submittedAt: string;
  status: ModerationStatus;
  priority: "High" | "Normal";
  image: string;
};

const moderationItems: ModerationItem[] = [
  {
    id: 1,
    title: "Hand-painted Madhubani Wall Panel",
    description:
      "Traditional Mithila artwork featuring lotus, fish and floral motifs.",
    type: "Product",
    submittedBy: "Sita Devi",
    submittedAt: "Today, 10:42 AM",
    status: "Pending",
    priority: "High",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Artisan Profile Verification",
    description:
      "Identity and craft-practice documents submitted for verification.",
    type: "Artisan",
    submittedBy: "Rajesh Kumar",
    submittedAt: "Today, 09:18 AM",
    status: "Pending",
    priority: "High",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Customer Review — Brass Diya Set",
    description:
      "Customer submitted a new review with a 5-star rating and photograph.",
    type: "Review",
    submittedBy: "Meera Kapoor",
    submittedAt: "Yesterday, 06:32 PM",
    status: "Pending",
    priority: "Normal",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "The Story of Blue Pottery",
    description:
      "Editorial story explaining the history and techniques of Jaipur blue pottery.",
    type: "Story",
    submittedBy: "Kalakriti Editorial",
    submittedAt: "Yesterday, 03:15 PM",
    status: "Approved",
    priority: "Normal",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    title: "Handcrafted Terracotta Horse",
    description:
      "Traditional terracotta decorative piece submitted to the marketplace.",
    type: "Product",
    submittedBy: "Mohan Prajapati",
    submittedAt: "28 Aug 2026",
    status: "Rejected",
    priority: "Normal",
    image:
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    title: "Customer Review — Silk Stole",
    description:
      "Review flagged automatically because of potentially promotional language.",
    type: "Review",
    submittedBy: "Aarav Sharma",
    submittedAt: "27 Aug 2026",
    status: "Pending",
    priority: "High",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
  },
];

const filters = ["All", "Product", "Review", "Artisan", "Story"];

function typeIcon(type: ModerationType) {
  if (type === "Product") return <Package className="h-4 w-4" />;
  if (type === "Review") return <MessageSquare className="h-4 w-4" />;
  if (type === "Artisan") return <UserRound className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

function statusClass(status: ModerationStatus) {
  if (status === "Approved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Rejected") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function AdminModerationPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return moderationItems.filter((item) => {
      const matchesType =
        activeFilter === "All" || item.type === activeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.submittedBy.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [activeFilter, statusFilter, search]);

  const pendingCount = moderationItems.filter(
    (item) => item.status === "Pending"
  ).length;

  const highPriorityCount = moderationItems.filter(
    (item) => item.priority === "High" && item.status === "Pending"
  ).length;

  const approvedCount = moderationItems.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedCount = moderationItems.filter(
    (item) => item.status === "Rejected"
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <ShieldCheck className="h-4 w-4" />
                Quality & Trust
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Moderation
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Review products, artisan applications, customer reviews and
                stories before they become part of the KALAKRITI marketplace.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-amber-700" />
              <div>
                <p className="text-xs font-semibold text-amber-800">
                  {pendingCount} items awaiting review
                </p>
                <p className="text-[11px] text-amber-700">
                  {highPriorityCount} marked high priority
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Pending Review"
            value={pendingCount}
            detail="Needs attention"
            icon={<Clock3 className="h-5 w-5" />}
          />

          <SummaryCard
            label="High Priority"
            value={highPriorityCount}
            detail="Requires faster action"
            icon={<AlertTriangle className="h-5 w-5" />}
          />

          <SummaryCard
            label="Approved"
            value={approvedCount}
            detail="Successfully moderated"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <SummaryCard
            label="Rejected"
            value={rejectedCount}
            detail="Removed from queue"
            icon={<XCircle className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
          <div className="border-b border-[#ded1ba] p-5 sm:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#531c1d]">
                  Moderation Queue
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Review submitted marketplace content and take appropriate
                  action.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8777]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search moderation queue..."
                  className="h-10 w-full rounded-md border border-[#d6c6a9] bg-white/70 pl-9 pr-4 text-sm outline-none placeholder:text-[#aa9989] focus:border-[#9b772d] sm:w-72"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      activeFilter === filter
                        ? "border-[#641f20] bg-[#641f20] text-[#f8edcf]"
                        : "border-[#d6c6a9] bg-white/50 text-[#705b4c] hover:border-[#b79552]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {["All", "Pending", "Approved", "Rejected"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-medium ${
                      statusFilter === filter
                        ? "border-[#b79552] bg-[#f0e4ca] text-[#641f20]"
                        : "border-transparent text-[#806b5d] hover:bg-[#f4ead8]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="divide-y divide-[#e1d6c1]">
              {filteredItems.map((item) => (
                <ModerationRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                No moderation items found
              </h3>

              <p className="mt-2 text-sm text-[#806b5d]">
                Try changing the filters or search term.
              </p>
            </div>
          )}

          <div className="border-t border-[#ded1ba] px-5 py-4 sm:px-6">
            <p className="text-xs text-[#806b5d]">
              Showing {filteredItems.length} of {moderationItems.length} items
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <GuidelineCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Authenticity First"
            text="Check that product descriptions, craft origins and artisan information accurately represent the traditional craft."
          />

          <GuidelineCard
            icon={<Star className="h-5 w-5" />}
            title="Review Quality"
            text="Keep reviews genuine, useful and respectful. Flag promotional, abusive or misleading submissions."
          />

          <GuidelineCard
            icon={<ImageIcon className="h-5 w-5" />}
            title="Visual Standards"
            text="Ensure submitted imagery is relevant, clear and representative of the actual handcrafted product."
          />
        </section>
      </div>
    </main>
  );
}

function ModerationRow({ item }: { item: ModerationItem }) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 gap-4">
          <img
            src={item.image}
            alt={item.title}
            className="h-24 w-28 shrink-0 rounded-lg object-cover sm:h-28 sm:w-36"
          />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0e4ca] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#806126]">
                {typeIcon(item.type)}
                {item.type}
              </span>

              {item.priority === "High" && (
                <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-700">
                  High Priority
                </span>
              )}

              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClass(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="mt-2 font-serif text-lg font-semibold text-[#531c1d]">
              {item.title}
            </h3>

            <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-5 text-[#806b5d]">
              {item.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#958476]">
              <span className="flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" />
                {item.submittedBy}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {item.submittedAt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-[#e6dcc9] pt-4 xl:border-0 xl:pt-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-[#d4c3a6] px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f4ead8]"
          >
            <Eye className="h-4 w-4" />
            Review
          </button>

          {item.status === "Pending" && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-[#2f6d4b] px-3 py-2 text-xs font-semibold text-white hover:bg-[#25583c]"
              >
                <Check className="h-4 w-4" />
                Approve
              </button>

              <button
                type="button"
                aria-label="Reject"
                className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}

          <button
            type="button"
            aria-label="More actions"
            className="rounded-md p-2 text-[#8b796b] hover:bg-[#f0e5d0] hover:text-[#641f20]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl font-semibold text-[#531c1d]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#988678]">{detail}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function GuidelineCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#786658]">{text}</p>
    </div>
  );
}