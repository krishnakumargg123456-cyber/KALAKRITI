"use client";

import Link from "next/link";
import { MessageSquare, ShoppingBag, Star } from "lucide-react";

type Review = {
  id: number;
  product: string;
  rating: number;
  comment: string;
  date: string;
};

const reviews: Review[] = [];

export default function ReviewsPage() {
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
            Share your experience with the crafts you purchase.
          </p>
        </div>

        {reviews.length === 0 ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <MessageSquare className="mx-auto h-12 w-12 text-gold" />

            <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">
              No Reviews Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              After receiving an order, you can share your experience here.
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
                      fill={index < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <h2 className="mt-3 font-serif text-xl font-bold text-maroon">
                  {review.product}
                </h2>

                <p className="mt-2 text-gray-700">{review.comment}</p>

                <p className="mt-3 text-xs text-gray-500">{review.date}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
