"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Store,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";

function ArtisanLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState(
    () => searchParams.get("email") ?? ""
  );
  const [registered, setRegistered] = useState(
    () => searchParams.get("registered") === "true"
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegistered(false);
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your artisan email and password.");
      return;
    }

    try {
      setLoading(true);

      await authApi.login({
        email: email.trim(),
        password,
      });

      const meResponse = await authApi.me();
      const profile = meResponse?.data;

      if (!profile) {
        throw new Error("Unable to load your artisan profile.");
      }

      const role = String(profile.role ?? "").toLowerCase();

      if (role !== "artisan") {
        await authApi.logout();
        throw new Error(
          "These credentials are not registered as an artisan account."
        );
      }

      setUser({
        id: profile.id,
        name: profile.name ?? profile.full_name ?? "",
        email: profile.email ?? email.trim(),
        role: profile.role,
      });

      router.replace("/artisan/onboarding");
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to sign in. Please check your artisan credentials.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-ink sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden border border-gold/40 bg-paper shadow-card lg:grid-cols-2">
          <section className="relative hidden min-h-[620px] flex-col justify-between bg-maroon p-10 text-white lg:flex">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-white/10">
                <Store className="h-7 w-7 text-gold" />
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                KALAKRITI Artisan Studio
              </p>

              <h1 className="mt-4 max-w-md font-serif text-5xl font-semibold leading-tight">
                Welcome Back, Artisan
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-white/75">
                Enter your artisan credentials to continue managing your craft,
                products, orders, stories and earnings.
              </p>
            </div>

            <div className="border-t border-white/15 pt-6">
              <p className="font-serif text-lg text-gold">
                Your craft. Your story. Your legacy.
              </p>
            </div>
          </section>

          <section className="flex min-h-[620px] items-center p-7 sm:p-12">
            <div className="mx-auto w-full max-w-md">
              <Link
                href="/artisan"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-maroon"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Artisan Portal
              </Link>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Artisan Login
                </p>

                <h2 className="mt-3 font-serif text-4xl font-semibold text-maroon">
                  Enter Your Studio
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Sign in using the email and password you created for your
                  artisan account.
                </p>
              </div>

              {registered && (
                <div className="mt-6 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-sm leading-6 text-maroon">
                  Your artisan account has been created successfully. Sign in
                  with the email and password you just created.
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
                  {loading ? "Entering Artisan Studio..." : "Enter Artisan Studio"}

                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-gold/20 pt-6 text-center">
                <p className="text-sm text-muted">New to KALAKRITI?</p>

                <Link
                  href="/artisan/register"
                  className="mt-2 inline-flex items-center gap-2 font-semibold text-maroon transition hover:text-maroon-light"
                >
                  Register as an Artisan
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

export default function ArtisanLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-cream text-maroon">
          <p className="text-sm font-medium">Opening Artisan Login...</p>
        </main>
      }
    >
      <ArtisanLoginForm />
    </Suspense>
  );
}