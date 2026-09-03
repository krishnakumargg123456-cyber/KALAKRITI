"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, FileCheck2, ArrowRight } from "lucide-react";

const checks = [
  {
    title: "Identity Verification",
    description: "Your submitted identity information will be reviewed.",
  },
  {
    title: "Craft Verification",
    description: "Our team verifies your craft and traditional practice.",
  },
  {
    title: "Profile Review",
    description: "Your artisan story and workshop information are reviewed.",
  },
];

export default function ArtisanVerificationPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Clock3 className="h-8 w-8 text-gold" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Artisan Verification
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon">
            Your Application Is Under Review
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-brown/70">
            KALAKRITI carefully verifies every artisan so customers can
            discover authentic Indian craft traditions with confidence.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {checks.map((check, index) => (
            <div
              key={check.title}
              className="flex gap-4 rounded-xl border border-border bg-paper p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream">
                {index === 0 ? (
                  <FileCheck2 className="h-5 w-5 text-maroon" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-gold" />
                )}
              </div>

              <div>
                <h2 className="font-serif text-lg font-bold text-maroon">
                  {check.title}
                </h2>

                <p className="mt-1 text-sm text-brown/65">
                  {check.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
          <p className="text-sm text-brown/70">
            Once verification is approved, you can create your artisan
            storefront and start listing handcrafted products.
          </p>

          <Link
            href="/artisan/dashboard"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream"
          >
            Artisan Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}