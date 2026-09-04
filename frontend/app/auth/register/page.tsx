"use client";

import { Suspense } from "react";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { authApi } from "@/lib/api/auth";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isArtisan = searchParams.get("role") === "artisan";
  const redirect = searchParams.get("redirect");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await authApi.register({
        name: name.trim(),
        email: email.trim(),
        password,
        role: isArtisan ? "artisan" : "customer",
      });

      if (isArtisan) {
        const nextPath = redirect || "/artisan/onboarding";
        router.push(
          `/auth/login?registered=true&redirect=${encodeURIComponent(nextPath)}`
        );
      } else {
        router.push("/auth/login?registered=true");
      }
    } catch (err: unknown) {
      const errorResponse = err as {
        response?: {
          data?: {
            detail?: string;
            message?: string;
          };
        };
      };

      setError(
        errorResponse.response?.data?.detail ||
          errorResponse.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kalakriti-paper flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-gold/40 bg-white/80 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            KALAKRITI {isArtisan ? "Artisan Portal" : ""}
          </p>

          <h1 className="font-serif text-3xl font-bold text-maroon">
            {isArtisan ? "Join KALAKRITI as an Artisan" : "Create Your Account"}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {isArtisan
              ? "Create your account and begin your artisan journey with KALAKRITI."
              : "Join the KALAKRITI craft heritage community."}
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-maroon">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-maroon">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-maroon">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-12 outline-none transition focus:border-maroon"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
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
            {loading
              ? "Creating Account..."
              : isArtisan
                ? "Create Artisan Account"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link
              href={
                isArtisan
                  ? "/auth/login?redirect=/artisan/onboarding"
                  : "/auth/login"
              }
              className="font-semibold text-maroon hover:underline"
            >
              {isArtisan ? "Artisan Login" : "Sign in"}
            </Link>
          </p>

          {isArtisan && (
            <Link
              href="/artisan"
              className="mt-3 inline-block text-xs font-medium text-gold hover:underline"
            >
              Back to Artisan Portal
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-sm text-brown/70">Loading registration...</div>
        </main>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}