"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";

const checks = [
  {
    title: "Identity Verification",
    description:
      "Identity information is reviewed as part of the artisan verification process.",
  },
  {
    title: "Craft Verification",
    description:
      "KALAKRITI reviews your craft practice and traditional workmanship.",
  },
  {
    title: "Profile Review",
    description:
      "Your artisan profile, craft story and workshop information are considered.",
  },
];

export default function ArtisanVerificationPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <ShieldCheck className="h-8 w-8 text-gold" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Artisan Verification
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon">
            Building Trust Through Authentic Craft
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-brown/70">
            KALAKRITI carefully verifies artisans so customers can discover
            authentic Indian craft traditions with confidence.
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

                <p className="mt-1 text-sm leading-6 text-brown/65">
                  {check.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 p-6">
          <div className="flex gap-3">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

            <div>
              <p className="text-sm font-semibold text-maroon">
                Verification status is platform-managed
              </p>

              <p className="mt-2 text-sm leading-6 text-brown/70">
                The current artisan API does not expose a verified endpoint
                for submitting or displaying an individual verification
                status. This page therefore does not claim that an
                application has been submitted, approved, or is currently
                under review.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-paper p-6 text-center">
          <p className="text-sm leading-6 text-brown/70">
            Keep your artisan profile and craft information complete. Once
            verification is available through the platform workflow, your
            verified artisan status can be reflected across your storefront.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/artisan/profile"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-cream px-6 py-3 text-sm font-semibold text-maroon transition hover:border-gold"
            >
              Complete Profile
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/artisan/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
            >
              Artisan Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

