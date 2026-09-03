"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Palette,
  ShieldCheck,
  UserPlus,
  LogIn,
} from "lucide-react";

export default function ArtisanRegisterPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            KALAKRITI Artisan Portal
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon md:text-5xl">
            Join KALAKRITI as an Artisan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-brown/70">
            Create your KALAKRITI account, complete your artisan profile and
            share your traditional craft with customers across India.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-paper p-6 shadow-sm md:p-10">
          <div className="grid gap-4 md:grid-cols-3">
            <Step
              number="01"
              icon={<UserPlus className="h-5 w-5" />}
              title="Create Account"
              description="Create your KALAKRITI account using your basic details."
              active
            />

            <Step
              number="02"
              icon={<Palette className="h-5 w-5" />}
              title="Complete Profile"
              description="Add your craft, experience, shop identity and location."
            />

            <Step
              number="03"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Get Verified"
              description="Complete the artisan verification process before selling."
            />
          </div>

          <div className="my-8 border-t border-border" />

          <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

              <div>
                <h2 className="font-serif text-lg font-bold text-maroon">
                  New to KALAKRITI?
                </h2>

                <p className="mt-1 text-sm leading-6 text-brown/70">
                  Create your account first. After signing in, you can
                  complete your artisan profile and continue your verification
                  journey.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-maroon/90"
            >
              <UserPlus className="h-4 w-4" />
              Register as Artisan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/auth/login?redirect=/artisan/dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-maroon/30 bg-cream px-6 py-3.5 text-sm font-semibold text-maroon transition hover:bg-paper"
            >
              <LogIn className="h-4 w-4" />
              Artisan Login
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-7 rounded-xl border border-border bg-cream/50 p-4 text-center">
            <p className="text-sm text-brown/70">
              Already created your KALAKRITI account?
            </p>

            <Link
              href="/auth/login?redirect=/artisan/onboarding"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-maroon underline underline-offset-4"
            >
              Login and continue Artisan Onboarding
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Benefit
            title="Showcase Your Craft"
            description="Build an artisan profile around your unique tradition."
          />

          <Benefit
            title="Reach Customers"
            description="Share your handmade work with customers across India."
          />

          <Benefit
            title="Grow With KALAKRITI"
            description="Create products, receive orders and build your craft business."
          />
        </div>
      </div>
    </main>
  );
}

function Step({
  number,
  icon,
  title,
  description,
  active = false,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        active ? "border-gold/50 bg-gold/5" : "border-border bg-cream/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-gold">
          {number}
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-paper text-maroon">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 font-serif text-lg font-bold text-maroon">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-brown/65">{description}</p>
    </div>
  );
}

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-paper p-5">
      <h3 className="font-serif font-bold text-maroon">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brown/65">{description}</p>
    </div>
  );
}
