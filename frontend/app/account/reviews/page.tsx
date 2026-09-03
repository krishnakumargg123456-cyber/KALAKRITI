"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  MessageSquare,
  ShoppingBag,
  Star,
} from "lucide-react";

import { reviewsApi, type Review } from "@/lib/api/reviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await reviewsApi.listMine({
          skip: 0,
          limit: 100,
        });

        if (!mounted) return;

        const data = response?.data;

        setReviews(Array.isArray(data?.items) ? data.items : []);
      } catch (err) {
        console.error("Failed to load reviews:", err);

        if (mounted) {
          setError(
            "We could not load your reviews right now. Please try again.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
            My Reviews
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Your reviews and experiences shared with the crafts you purchase.
          </p>
        </div>

        {loading ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-gold" />

            <h2 className="mt-5 font-serif text-xl font-bold text-maroon">
              Loading Your Reviews
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Please wait while we fetch your reviews.
            </p>
          </section>
        ) : error ? (
          <section className="rounded-card border border-red-200 bg-white p-10 text-center shadow-sm">
            <AlertCircle className="mx-auto h-10 w-10 text-red-600" />

            <h2 className="mt-5 font-serif text-xl font-bold text-maroon">
              Unable to Load Reviews
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light"
            >
              Try Again
            </button>
          </section>
        ) : reviews.length === 0 ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <MessageSquare className="mx-auto h-12 w-12 text-gold" />

            <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">
              No Reviews Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              After receiving an order, you can share your experience with the
              craft you purchased.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light"
            >
              <ShoppingBag className="h-5 w-5" />
              Explore Crafts
            </Link>
          </section>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-card border border-gold/30 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5 text-gold"
                      fill={
                        index < review.rating ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>

                {review.title && (
                  <h2 className="mt-3 font-serif text-xl font-bold text-maroon">
                    {review.title}
                  </h2>
                )}

                <p className="mt-2 text-xs text-gray-500">
                  Product ID:{" "}
                  <Link
                    href={`/products/${review.product_id}`}
                    className="break-all text-maroon underline-offset-2 hover:underline"
                  >
                    {review.product_id}
                  </Link>
                </p>

                {review.comment && (
                  <p className="mt-3 leading-7 text-gray-700">
                    {review.comment}
                  </p>
                )}

                <p className="mt-4 text-xs text-gray-500">
                  Reviewed on {formatDate(review.created_at)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
