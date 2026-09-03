"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ArtisanRegisterPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-paper p-8 text-center shadow-sm md:p-12">
          <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-green-700" />

          <h1 className="font-serif text-3xl font-bold text-maroon">
            Artisan Application Started
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-brown/75">
            Your artisan application has been saved. Continue with onboarding
            to tell us about your craft, tradition and work.
          </p>

          <Link
            href="/artisan/onboarding"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
          >
            Continue Onboarding
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Join KALAKRITI
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon">
            Become a KALAKRITI Artisan
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-brown/70">
            Bring your traditional craft to people across India while
            preserving the heritage behind every handmade creation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-paper p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-brown"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-brown"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-brown"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="+91"
              />
            </div>

            <div>
              <label
                htmlFor="craft"
                className="mb-2 block text-sm font-medium text-brown"
              >
                Primary Craft
              </label>
              <select
                id="craft"
                name="craft"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              >
                <option value="">Select craft</option>
                <option>Pottery</option>
                <option>Handloom</option>
                <option>Wood Craft</option>
                <option>Metal Craft</option>
                <option>Painting</option>
                <option>Embroidery</option>
                <option>Jewellery</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="state"
                className="mb-2 block text-sm font-medium text-brown"
              >
                State
              </label>
              <input
                id="state"
                name="state"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="Your state"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="experience"
                className="mb-2 block text-sm font-medium text-brown"
              >
                Years of Craft Experience
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                required
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                placeholder="e.g. 15"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-sm text-brown/70">
              KALAKRITI verifies artisan identity and craft authenticity before
              approving an artisan profile.
            </p>
          </div>

          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 font-semibold text-cream transition hover:bg-maroon/90"
          >
            Start Artisan Onboarding
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </main>
  );
}