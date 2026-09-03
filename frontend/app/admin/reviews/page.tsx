"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  Loader2,
  MessageSquare,
  RefreshCw,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  adminReviewsApi,
  type AdminReview,
  type AdminReviewStatus,
} from "@/lib/api/admin-reviews";

const PAGE_SIZE = 20;

const STATUS_OPTIONS: Array<{
  value: AdminReviewStatus | "all";
  label: string;
}> = [
  { value: "all", label: "All Reviews" },
  { value: "pending", label: "Pending" },
  { value: "published", label: "Published" },
  { value: "flagged", label: "Flagged" },
  { value: "rejected", label: "Rejected" },
];

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusLabel(status: AdminReviewStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClasses(status: AdminReviewStatus) {
  switch (status) {
    case "published":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "pending":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "flagged":
      return "border-orange-200 bg-orange-50 text-orange-700";
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-stone-200 bg-stone-50 text-stone-700";
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-[#b08a3e] text-[#b08a3e]"
              : "text-stone-300"
          }`}
        />
      ))}
    </div>
  );
}

function getInitials(id: string) {
  return id.slice(0, 2).toUpperCase();
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [total, setTotal] = useState(0);

  const [statusFilter, setStatusFilter] = useState<
    AdminReviewStatus | "all"
  >("all");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<number | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminReviewsApi.list({
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(ratingFilter !== "all" ? { rating: ratingFilter } : {}),
        skip: page * PAGE_SIZE,
        limit: PAGE_SIZE,
      });

      setReviews(response.data.items);
      setTotal(response.data.total);
    } catch (err) {
      console.error("Failed to load admin reviews:", err);
      setReviews([]);
      setTotal(0);
      setError(
        "Unable to load reviews. Please check the backend connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, ratingFilter, statusFilter]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    setPage(0);
  }, [statusFilter, ratingFilter]);

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return reviews;
    }

    return reviews.filter((review) =>
      [
        review.title,
        review.comment,
        review.product_id,
        review.user_id,
        review.status,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [reviews, search]);

  const stats = useMemo(() => {
    return {
      total,
      pending: reviews.filter((review) => review.status === "pending").length,
      published: reviews.filter(
        (review) => review.status === "published",
      ).length,
      flagged: reviews.filter((review) => review.status === "flagged").length,
      rejected: reviews.filter(
        (review) => review.status === "rejected",
      ).length,
    };
  }, [reviews, total]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  async function updateStatus(
    reviewId: number,
    nextStatus: AdminReviewStatus,
  ) {
    setActionId(reviewId);
    setError("");

    try {
      const response = await adminReviewsApi.updateStatus(reviewId, {
        status: nextStatus,
      });

      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId ? response.data : review,
        ),
      );
    } catch (err) {
      console.error("Failed to update review status:", err);
      setError("Could not update this review. Please try again.");
    } finally {
      setActionId(null);
    }
  }

  async function deleteReview(reviewId: number) {
    const confirmed = window.confirm(
      "Delete this review permanently? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setActionId(reviewId);
    setError("");

    try {
      await adminReviewsApi.remove(reviewId);

      setReviews((current) =>
        current.filter((review) => review.id !== reviewId),
      );
      setTotal((current) => Math.max(0, current - 1));
    } catch (err) {
      console.error("Failed to delete review:", err);
      setError("Could not delete this review. Please try again.");
    } finally {
      setActionId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e5] text-[#351b20]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#d9c9ab] pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7835]">
              <MessageSquare className="h-4 w-4" />
              Customer Voice
            </div>

            <h1 className="font-serif text-3xl font-semibold text-[#571f29] sm:text-4xl">
              Reviews
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Review customer feedback, moderate submissions, and keep the
              marketplace experience trustworthy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadReviews()}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 rounded-md border border-[#b99a5c] bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#571f29] transition hover:bg-[#f0e4cc] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: MessageSquare,
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock3,
            },
            {
              label: "Published",
              value: stats.published,
              icon: Check,
            },
            {
              label: "Flagged",
              value: stats.flagged,
              icon: Flag,
            },
            {
              label: "Rejected",
              value: stats.rejected,
              icon: X,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="border border-[#ddcfb5] bg-[#fffaf1] p-4 shadow-[0_2px_10px_rgba(75,45,20,0.04)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                    {item.label}
                  </span>
                  <Icon className="h-4 w-4 text-[#a5833d]" />
                </div>

                <p className="font-serif text-2xl font-semibold text-[#571f29]">
                  {item.value.toLocaleString("en-IN")}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-6 border border-[#ddcfb5] bg-[#fffaf1] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search review text, product ID or customer ID..."
                className="w-full border border-[#d8c8aa] bg-white py-2.5 pl-10 pr-4 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-[#9a7835] focus:ring-1 focus:ring-[#9a7835]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as AdminReviewStatus | "all",
                )
              }
              className="border border-[#d8c8aa] bg-white px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#9a7835]"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={ratingFilter}
              onChange={(event) => {
                const value = event.target.value;
                setRatingFilter(value === "all" ? "all" : Number(value));
              }}
              className="border border-[#d8c8aa] bg-white px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#9a7835]"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </section>

        {error && (
          <div className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <section className="overflow-hidden border border-[#ddcfb5] bg-[#fffaf1] shadow-[0_3px_14px_rgba(75,45,20,0.05)]">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#ddcfb5] bg-[#f2e8d5] text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Review
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Rating
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Product
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Date
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#6c4b2b]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#9a7835]" />
                      <p className="mt-3 text-sm text-stone-500">
                        Loading reviews...
                      </p>
                    </td>
                  </tr>
                ) : filteredReviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <MessageSquare className="mx-auto h-8 w-8 text-stone-300" />
                      <p className="mt-3 font-serif text-lg font-semibold text-[#571f29]">
                        No reviews found
                      </p>
                      <p className="mt-1 text-sm text-stone-500">
                        No reviews match the current filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredReviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-[#eadfc9] last:border-b-0"
                    >
                      <td className="max-w-[330px] px-5 py-5">
                        <div className="flex gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eadcc0] text-xs font-bold text-[#6c4b2b]">
                            {getInitials(review.user_id)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#571f29]">
                              {review.title || "Untitled review"}
                            </p>

                            <p className="mt-1 line-clamp-2 text-sm leading-5 text-stone-600">
                              {review.comment || "No written comment"}
                            </p>

                            <p className="mt-2 truncate text-[11px] text-stone-400">
                              Customer ID: {review.user_id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <StarRating rating={review.rating} />
                        <span className="mt-1 block text-xs text-stone-500">
                          {review.rating}/5
                        </span>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <p className="max-w-[190px] truncate text-sm font-medium text-stone-700">
                          Product
                        </p>
                        <p className="mt-1 max-w-[190px] truncate text-[11px] text-stone-400">
                          {review.product_id}
                        </p>
                      </td>

                      <td className="px-5 py-5 align-top">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(
                            review.status,
                          )}`}
                        >
                          {statusLabel(review.status)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-stone-500">
                        {formatDate(review.created_at)}
                      </td>

                      <td className="px-5 py-5 align-top">
                        <div className="flex justify-end gap-2">
                          {review.status !== "published" && (
                            <button
                              type="button"
                              title="Publish review"
                              disabled={actionId === review.id}
                              onClick={() =>
                                void updateStatus(review.id, "published")
                              }
                              className="rounded border border-emerald-200 bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                            >
                              {actionId === review.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                          )}

                          {review.status !== "flagged" && (
                            <button
                              type="button"
                              title="Flag review"
                              disabled={actionId === review.id}
                              onClick={() =>
                                void updateStatus(review.id, "flagged")
                              }
                              className="rounded border border-orange-200 bg-orange-50 p-2 text-orange-700 transition hover:bg-orange-100 disabled:opacity-50"
                            >
                              <Flag className="h-4 w-4" />
                            </button>
                          )}

                          {review.status !== "rejected" && (
                            <button
                              type="button"
                              title="Reject review"
                              disabled={actionId === review.id}
                              onClick={() =>
                                void updateStatus(review.id, "rejected")
                              }
                              className="rounded border border-red-200 bg-red-50 p-2 text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            type="button"
                            title="Delete review"
                            disabled={actionId === review.id}
                            onClick={() => void deleteReview(review.id)}
                            className="rounded border border-stone-200 bg-white p-2 text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#eadfc9] md:hidden">
            {loading ? (
              <div className="px-5 py-16 text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#9a7835]" />
                <p className="mt-3 text-sm text-stone-500">
                  Loading reviews...
                </p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-stone-300" />
                <p className="mt-3 font-serif text-lg font-semibold text-[#571f29]">
                  No reviews found
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Try changing your filters.
                </p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <article key={review.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eadcc0] text-xs font-bold text-[#6c4b2b]">
                        {getInitials(review.user_id)}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-sm font-semibold text-[#571f29]">
                          {review.title || "Untitled review"}
                        </h2>
                        <p className="mt-1 text-xs text-stone-400">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${statusClasses(
                        review.status,
                      )}`}
                    >
                      {statusLabel(review.status)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <StarRating rating={review.rating} />

                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {review.comment || "No written comment"}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-[#eadfc9] pt-3">
                    <p className="text-[11px] text-stone-400">
                      Customer: {review.user_id}
                    </p>
                    <p className="mt-1 text-[11px] text-stone-400">
                      Product: {review.product_id}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {review.status !== "published" && (
                      <button
                        type="button"
                        disabled={actionId === review.id}
                        onClick={() =>
                          void updateStatus(review.id, "published")
                        }
                        className="inline-flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 disabled:opacity-50"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Publish
                      </button>
                    )}

                    {review.status !== "flagged" && (
                      <button
                        type="button"
                        disabled={actionId === review.id}
                        onClick={() => void updateStatus(review.id, "flagged")}
                        className="inline-flex items-center gap-1.5 rounded border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 disabled:opacity-50"
                      >
                        <Flag className="h-3.5 w-3.5" />
                        Flag
                      </button>
                    )}

                    {review.status !== "rejected" && (
                      <button
                        type="button"
                        disabled={actionId === review.id}
                        onClick={() => void updateStatus(review.id, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={actionId === review.id}
                      onClick={() => void deleteReview(review.id)}
                      className="inline-flex items-center gap-1.5 rounded border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 hover:border-red-200 hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#ddcfb5] bg-[#f8f0e1] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-stone-500">
              {total === 0
                ? "No reviews"
                : `Showing ${page * PAGE_SIZE + 1}-${Math.min(
                    page * PAGE_SIZE + reviews.length,
                    total,
                  )} of ${total}`}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 0 || loading}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                className="rounded border border-[#d8c8aa] bg-white p-2 text-stone-600 transition hover:bg-[#f0e4cc] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="min-w-[90px] text-center text-xs font-medium text-stone-600">
                Page {Math.min(page + 1, totalPages)} of {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  page >= totalPages - 1 || loading || total === 0
                }
                onClick={() =>
                  setPage((current) =>
                    Math.min(totalPages - 1, current + 1),
                  )
                }
                className="rounded border border-[#d8c8aa] bg-white p-2 text-stone-600 transition hover:bg-[#f0e4cc] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-5 flex justify-end">
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#8b682d] underline-offset-4 hover:underline"
          >
            Back to Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
