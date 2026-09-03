"use client";

import { MessageSquare, Star } from "lucide-react";

const reviews = [
  {
    customer: "Ananya Sharma",
    product: "Madhubani Wall Art",
    rating: 5,
    date: "28 Aug 2026",
    text: "Beautiful artwork with incredible detailing. The traditional style is exactly what I was looking for.",
  },
  {
    customer: "Rohan Mehta",
    product: "Blue Pottery Vase",
    rating: 4,
    date: "22 Aug 2026",
    text: "Very elegant handmade piece. Packaging was also excellent.",
  },
  {
    customer: "Priya Singh",
    product: "Handwoven Dupatta",
    rating: 5,
    date: "18 Aug 2026",
    text: "The fabric and craftsmanship are wonderful. You can really feel the handmade quality.",
  },
];

export default function ArtisanReviewsPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Customer Reviews
        </h1>

        <div className="mt-8 rounded-xl border border-border bg-paper p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-4xl font-bold text-maroon">4.8</p>

              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-current text-gold"
                  />
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-border md:h-16 md:w-px" />

            <div>
              <p className="text-sm text-brown/60">
                Total customer reviews
              </p>
              <p className="mt-1 text-2xl font-bold text-maroon">126</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {reviews.map((review) => (
            <article
              key={`${review.customer}-${review.product}`}
              className="rounded-xl border border-border bg-paper p-6"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <h2 className="font-semibold text-maroon">
                    {review.customer}
                  </h2>

                  <p className="mt-1 text-xs text-brown/55">
                    {review.product} · {review.date}
                  </p>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-current text-gold"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-brown/75">
                {review.text}
              </p>

              <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-maroon hover:border-gold">
                <MessageSquare className="h-4 w-4" />
                Reply
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}