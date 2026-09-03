"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api/client";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage(
        "Your password has been reset successfully. You can now sign in."
      );

      setPassword("");
      setConfirmPassword("");
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
          "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kalakriti-paper flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-gold/40 bg-white/80 p-8 shadow-lg">
        <Link
          href="/auth/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-maroon hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            KALAKRITI
          </p>

          <h1 className="font-serif text-3xl font-bold text-maroon">
            Reset Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Create a new secure password for your account.
          </p>
        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-maroon">
              New Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-maroon">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter password again"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-maroon hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="kalakriti-paper flex min-h-screen items-center justify-center">
          <p className="text-maroon">Loading...</p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
