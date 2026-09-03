"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, MessageSquare, Star } from "lucide-react";
import api from "@/lib/api/client";

type Review = {
  id: string | number;
  rating: number;
  comment?: string | null;
  text?: string | null;
  created_at?: string | null;
  customer?: {
    name?: string | null;
    full_name?: string | null;
  } | null;
  user?: {
    name?: string | null;
    full_name?: string | null;
  } | null;
  customer_name?: string | null;
  product?: {
    name?: string | null;
  } | null;
  product_name?: string | null;
};

function getReviewList(data: unknown): Review[] {
  if (Array.isArray(data)) {
    return data as Review[];
  }

  if (data && typeof data === "object") {
    const value = data as {
      items?: unknown;
      reviews?: unknown;
      data?: unknown;
    };

    if (Array.isArray(value.items)) return value.items as Review[];
    if (Array.isArray(value.reviews)) return value.reviews as Review[];
    if (Array.isArray(value.data)) return value.data as Review[];
  }

  return [];
}

function getCustomerName(review: Review) {
  return (
    review.customer?.name ||
    review.customer?.full_name ||
    review.user?.name ||
    review.user?.full_name ||
    review.customer_name ||
    "KALAKRITI Customer"
  );
}

function getProductName(review: Review) {
  return review.product?.name || review.product_name || "Handcrafted Product";
}

function getReviewText(review: Review) {
  return review.comment || review.text || "";
}

function formatDate(value?: string | null) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function normalizeRating(value: unknown) {
  const rating = Number(value);

  if (!Number.isFinite(rating)) return 0;

  return Math.min(5, Math.max(0, rating));
}

export default function ArtisanReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadReviews() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/artisan/reviews", {
          params: {
            skip: 0,
            limit: 100,
          },
        });

        if (!mounted) return;

        setReviews(getReviewList(response.data));
      } catch (err) {
        if (!mounted) return;

        console.error("Failed to load artisan reviews:", err);
        setReviews([]);
        setError("Unable to load customer reviews. Please try again.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        rounded: 0,
      };
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + normalizeRating(review.rating),
      0,
    );

    const average = totalRating / reviews.length;

    return {
      average,
      total: reviews.length,
      rounded: Math.round(average),
    };
  }, [reviews]);

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Customer Reviews
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-brown/65">
          See what customers are saying about the handmade pieces they
          purchased from your artisan store.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-paper p-6">
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="h-20 animate-pulse rounded-lg bg-cream" />
              <div className="h-20 animate-pulse rounded-lg bg-cream" />
            </div>
          ) : (
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div>
                <p className="text-4xl font-bold text-maroon">
                  {stats.total > 0 ? stats.average.toFixed(1) : "—"}
                </p>

                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < stats.rounded
                          ? "fill-current text-gold"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-border md:h-16 md:w-px" />

              <div>
                <p className="text-sm text-brown/60">
                  Total customer reviews
                </p>

                <p className="mt-1 text-2xl font-bold text-maroon">
                  {stats.total}
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Reviews could not be loaded</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="mt-8 rounded-xl border border-border bg-paper p-10 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-gold" />

            <h2 className="mt-4 font-serif text-xl font-bold text-maroon">
              No customer reviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brown/65">
              Customer feedback will appear here after your products start
              receiving reviews.
            </p>
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="mt-8 space-y-4">
            {reviews.map((review) => {
              const rating = normalizeRating(review.rating);

              return (
                <article
                  key={review.id}
                  className="rounded-xl border border-border bg-paper p-6"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row">
                    <div>
                      <h2 className="font-semibold text-maroon">
                        {getCustomerName(review)}
                      </h2>

                      <p className="mt-1 text-xs text-brown/55">
                        {getProductName(review)} ·{" "}
                        {formatDate(review.created_at)}
                      </p>
                    </div>

                    <div
                      className="flex gap-1"
                      aria-label={`${rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.round(rating)
                              ? "fill-current text-gold"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {getReviewText(review) && (
                    <p className="mt-4 text-sm leading-6 text-brown/75">
                      {getReviewText(review)}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex gap-3 rounded-xl border border-gold/30 bg-gold/5 p-5">
          <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

          <p className="text-sm leading-6 text-brown/70">
            Thoughtful customer feedback helps artisans understand what
            buyers value and continuously improve their craft and products.
          </p>
        </div>
      </div>
    </main>
  );
}
