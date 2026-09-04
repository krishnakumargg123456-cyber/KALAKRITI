"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Store,
  User,
  UserPlus,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";

export default function ArtisanRegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authApi.register({
        name: trimmedName,
        email: trimmedEmail,
        password,
        role: "artisan",
      });

      router.replace(
        `/artisan/login?registered=true&email=${encodeURIComponent(
          trimmedEmail
        )}`
      );
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(
          detail
            .map((item: any) => item?.msg || "Invalid registration details.")
            .join(" ")
        );
      } else {
        setError(
          detail ||
            err?.message ||
            "Unable to create your artisan account. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-ink sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden border border-gold/40 bg-paper shadow-card lg:grid-cols-2">
          <section className="relative hidden min-h-[700px] flex-col justify-between bg-maroon p-10 text-white lg:flex">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-white/10">
                <Store className="h-7 w-7 text-gold" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                KALAKRITI Artisan Studio
              </p>

              <h1 className="mt-4 max-w-md font-serif text-5xl font-semibold leading-tight">
                Your Craft Deserves a Story
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-white/75">
                Create your dedicated artisan account and begin your journey
                with KALAKRITI.
              </p>

              <div className="mt-10 space-y-5">
                <PortalStep
                  number="01"
                  title="Create Your Account"
                  description="Set up your artisan email and password."
                  active
                />

                <PortalStep
                  number="02"
                  title="Build Your Artisan Profile"
                  description="Tell us about your craft and tradition."
                />

                <PortalStep
                  number="03"
                  title="Complete Verification"
                  description="Finish the verification process before selling."
                />
              </div>
            </div>

            <p className="border-t border-white/15 pt-6 font-serif text-lg text-gold">
              Your craft. Your story. Your legacy.
            </p>
          </section>

          <section className="flex min-h-[700px] items-center p-7 sm:p-12">
            <div className="mx-auto w-full max-w-md">
              <Link
                href="/artisan"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-maroon"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Artisan Portal
              </Link>

              <div className="mt-9">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Artisan Registration
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-maroon">
                  Create Your Artisan Account
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted">
                  This account is exclusively for KALAKRITI artisans. Your
                  artisan email and password will be used whenever you sign in
                  to your Artisan Studio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="artisan-name"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                    <input
                      id="artisan-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="w-full rounded-lg border border-gold/30 bg-cream py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="artisan-email"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Artisan Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                    <input
                      id="artisan-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-lg border border-gold/30 bg-cream py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="artisan-password"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                    <input
                      id="artisan-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-gold/30 bg-cream py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted transition hover:text-maroon"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-muted">
                    Use at least 8 characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="artisan-confirm-password"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                    <input
                      id="artisan-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-gold/30 bg-cream py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted transition hover:text-maroon"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-lg bg-maroon px-6 py-4 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <UserPlus className="h-5 w-5" />

                  {loading ? "Creating Artisan Account..." : "Create Artisan Account"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-gold/20 pt-6 text-center">
                <p className="text-sm text-muted">
                  Already have an artisan account?
                </p>

                <Link
                  href="/artisan/login"
                  className="mt-2 inline-flex items-center gap-2 font-semibold text-maroon transition hover:text-maroon-light"
                >
                  Artisan Login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function PortalStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
          active
            ? "border-gold bg-gold text-maroon"
            : "border-white/20 text-white/60"
        }`}
      >
        {number}
      </div>

      <div>
        <h3 className="font-serif text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
      </div>
    </div>
  );
}
