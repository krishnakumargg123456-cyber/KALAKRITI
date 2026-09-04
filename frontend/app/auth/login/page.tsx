"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });

      const loggedInUser = response?.data?.user;

      if (loggedInUser) {
        setUser(loggedInUser);
      }

      const requestedRedirect =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;

      const userRole = String(loggedInUser?.role || "").toLowerCase();

      if (userRole === "artisan") {
        router.replace(
          requestedRedirect?.startsWith("/artisan/")
            ? requestedRedirect
            : "/artisan/dashboard"
        );
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-ink">
      <div className="mx-auto max-w-md">
        <div className="rounded-card border border-border bg-paper p-8 shadow-card">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              KALAKRITI
            </p>

            <h1 className="font-serif text-3xl font-bold text-maroon">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-muted">
              Sign in to continue your craft journey.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium">
                  Password
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-maroon hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-12 outline-none transition focus:border-maroon"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            New to KALAKRITI?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-maroon hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-3 text-center text-sm text-muted">
            Want to sell your craft?{" "}
            <Link
              href="/artisan"
              className="font-semibold text-maroon hover:underline"
            >
              Join as Artisan
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
