"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Package,
  RefreshCw,
  ShieldCheck,
  Star,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  moderationApi,
  type ModerationContentType,
  type ModerationItem,
  type ModerationPriority,
  type ModerationStatus,
} from "@/lib/api/moderation";

const contentTypes: {
  type: ModerationContentType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "Product",
    label: "Products",
    description: "Review product information, imagery and craft authenticity.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    type: "Review",
    label: "Reviews",
    description: "Check customer reviews for relevance, abuse and promotion.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    type: "Artisan",
    label: "Artisans",
    description: "Verify artisan profiles and marketplace eligibility.",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    type: "Story",
    label: "Stories",
    description: "Review editorial and craft-heritage submissions.",
    icon: <FileText className="h-5 w-5" />,
  },
];

export default function AdminModerationPage() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    ModerationStatus | "All"
  >("Pending");
  const [typeFilter, setTypeFilter] = useState<
    ModerationContentType | "All"
  >("All");
  const [priorityFilter, setPriorityFilter] = useState<
    ModerationPriority | "All"
  >("All");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<number | null>(null);
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const loadItems = useCallback(
    async (showRefreshState = false) => {
      try {
        if (showRefreshState) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response = await moderationApi.list({
          ...(statusFilter !== "All" && { status: statusFilter }),
          ...(typeFilter !== "All" && { content_type: typeFilter }),
          ...(priorityFilter !== "All" && { priority: priorityFilter }),
        });

        setItems(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to load moderation items:", err);
        setError(
          "Moderation data could not be loaded. Please check the backend connection and try again.",
        );
        setItems([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [statusFilter, typeFilter, priorityFilter],
  );

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const summary = useMemo(() => {
    return {
      pending: items.filter((item) => item.status === "Pending").length,
      highPriority: items.filter(
        (item) => item.priority === "High" && item.status === "Pending",
      ).length,
      approved: items.filter((item) => item.status === "Approved").length,
      rejected: items.filter((item) => item.status === "Rejected").length,
    };
  }, [items]);

  async function handleApprove(id: number) {
    try {
      setActionId(id);
      setError(null);

      await moderationApi.approve(id);
      await loadItems(true);
    } catch (err) {
      console.error("Failed to approve moderation item:", err);
      setError("The item could not be approved. Please try again.");
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: number) {
    const reason = rejectReason.trim();

    if (!reason) {
      setError("Please enter a rejection reason.");
      return;
    }

    try {
      setActionId(id);
      setError(null);

      await moderationApi.reject(id, { reason });

      setRejectingId(null);
      setRejectReason("");

      await loadItems(true);
    } catch (err) {
      console.error("Failed to reject moderation item:", err);
      setError("The item could not be rejected. Please try again.");
    } finally {
      setActionId(null);
    }
  }

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
                Review marketplace content and keep KALAKRITI authentic,
                respectful and trustworthy.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadItems(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#b89450] bg-[#fbf7ed] px-4 py-2.5 text-sm font-semibold text-[#6b4a20] transition hover:bg-[#f0e4ca] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Pending Review"
            value={loading ? "—" : String(summary.pending)}
            detail="Current filtered queue"
            icon={<Clock3 className="h-5 w-5" />}
          />

          <SummaryCard
            label="High Priority"
            value={loading ? "—" : String(summary.highPriority)}
            detail="Pending high-priority items"
            icon={<AlertTriangle className="h-5 w-5" />}
          />

          <SummaryCard
            label="Approved"
            value={loading ? "—" : String(summary.approved)}
            detail="Current filtered results"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <SummaryCard
            label="Rejected"
            value={loading ? "—" : String(summary.rejected)}
            detail="Current filtered results"
            icon={<XCircle className="h-5 w-5" />}
          />
        </section>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">
              <p className="font-semibold">Moderation request failed</p>
              <p className="mt-1 leading-5">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => void loadItems(true)}
              className="shrink-0 font-semibold underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        <section className="mt-8 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
          <div className="border-b border-[#ded1ba] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#531c1d]">
                  Moderation Queue
                </h2>

                <p className="mt-1 text-sm text-[#806b5d]">
                  Live records from the moderation service.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <FilterSelect
                  label="Status"
                  value={statusFilter}
                  onChange={(value) =>
                    setStatusFilter(value as ModerationStatus | "All")
                  }
                  options={["All", "Pending", "Approved", "Rejected"]}
                />

                <FilterSelect
                  label="Content"
                  value={typeFilter}
                  onChange={(value) =>
                    setTypeFilter(value as ModerationContentType | "All")
                  }
                  options={["All", "Product", "Review", "Artisan", "Story"]}
                />

                <FilterSelect
                  label="Priority"
                  value={priorityFilter}
                  onChange={(value) =>
                    setPriorityFilter(value as ModerationPriority | "All")
                  }
                  options={["All", "Normal", "High"]}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#806b5d]">
                <Loader2 className="h-5 w-5 animate-spin text-[#8b6828]" />
                Loading moderation queue...
              </div>
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              priorityFilter={priorityFilter}
            />
          ) : (
            <div className="divide-y divide-[#ded1ba]">
              {items.map((item) => (
                <ModerationRow
                  key={item.id}
                  item={item}
                  actionId={actionId}
                  rejectingId={rejectingId}
                  rejectReason={rejectReason}
                  onApprove={handleApprove}
                  onStartReject={(id) => {
                    setRejectingId(id);
                    setRejectReason("");
                    setError(null);
                  }}
                  onCancelReject={() => {
                    setRejectingId(null);
                    setRejectReason("");
                  }}
                  onRejectReasonChange={setRejectReason}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contentTypes.map((item) => (
            <ContentTypeCard
              key={item.type}
              icon={item.icon}
              label={item.label}
              description={item.description}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl font-semibold text-[#531c1d]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#988678]">{detail}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-[145px] rounded-lg border border-[#cdbd9f] bg-[#f7f0df] px-3 py-2 text-sm text-[#531c1d] outline-none transition focus:border-[#9b772d]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModerationRow({
  item,
  actionId,
  rejectingId,
  rejectReason,
  onApprove,
  onStartReject,
  onCancelReject,
  onRejectReasonChange,
  onReject,
}: {
  item: ModerationItem;
  actionId: number | null;
  rejectingId: number | null;
  rejectReason: string;
  onApprove: (id: number) => void;
  onStartReject: (id: number) => void;
  onCancelReject: () => void;
  onRejectReasonChange: (value: string) => void;
  onReject: (id: number) => void;
}) {
  const isBusy = actionId === item.id;
  const isRejecting = rejectingId === item.id;

  return (
    <article className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#d9c9aa] bg-[#f0e4ca] text-[#8b6828]">
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-6 w-6" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#f0e4ca] px-2.5 py-1 text-[11px] font-semibold text-[#6b4a20]">
                {item.content_type}
              </span>

              <StatusBadge status={item.status} />

              {item.priority === "High" && (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                  High Priority
                </span>
              )}
            </div>

            <h3 className="mt-2 font-serif text-lg font-semibold text-[#531c1d]">
              {item.title}
            </h3>

            {item.description && (
              <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-[#786658]">
                {item.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#988678]">
              <span>
                Content ID:{" "}
                <span className="font-medium text-[#705b4c]">
                  {item.content_id}
                </span>
              </span>

              <span>
                Submitted:{" "}
                <span className="font-medium text-[#705b4c]">
                  {formatDate(item.created_at)}
                </span>
              </span>

              {item.rejection_reason && (
                <span>
                  Rejection:{" "}
                  <span className="font-medium text-red-700">
                    {item.rejection_reason}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {item.status === "Pending" && !isRejecting && (
          <div className="flex shrink-0 gap-2 xl:pt-1">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onApprove(item.id)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#531c1d] px-4 py-2.5 text-sm font-semibold text-[#f8e8bd] transition hover:bg-[#6a2526] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Approve
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => onStartReject(item.id)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </button>
          </div>
        )}
      </div>

      {isRejecting && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50/70 p-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-red-800">
              Rejection reason
            </span>

            <textarea
              value={rejectReason}
              onChange={(event) =>
                onRejectReasonChange(event.target.value)
              }
              rows={3}
              maxLength={1000}
              placeholder="Explain why this submission is being rejected..."
              className="mt-2 w-full rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm text-[#351716] outline-none placeholder:text-[#aa8f82] focus:border-red-400"
            />
          </label>

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              disabled={isBusy}
              onClick={onCancelReject}
              className="rounded-lg border border-[#cdbd9f] bg-[#fbf7ed] px-4 py-2 text-sm font-semibold text-[#705b4c] disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isBusy || !rejectReason.trim()}
              onClick={() => onReject(item.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm Rejection
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function StatusBadge({ status }: { status: ModerationStatus }) {
  const classes = {
    Pending: "bg-amber-50 text-amber-700",
    Approved: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
}

function EmptyState({
  statusFilter,
  typeFilter,
  priorityFilter,
}: {
  statusFilter: string;
  typeFilter: string;
  priorityFilter: string;
}) {
  const hasFilters =
    statusFilter !== "All" ||
    typeFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <div className="flex min-h-[320px] items-center justify-center px-6 py-12 text-center">
      <div>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <h3 className="mt-5 font-serif text-2xl font-semibold text-[#531c1d]">
          {hasFilters
            ? "No matching moderation items"
            : "Moderation queue is clear"}
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#806b5d]">
          {hasFilters
            ? "No live moderation records match the selected filters."
            : "There are currently no moderation records in the selected queue."}
        </p>
      </div>
    </div>
  );
}

function ContentTypeCard({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        {label}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#786658]">
        {description}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
