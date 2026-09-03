"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import api from "@/lib/api/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      setMessage(
        "If an account exists with this email, password reset instructions have been sent."
      );
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
          "Unable to process your request. Please try again."
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
            Forgot Password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Enter your registered email address and we&apos;ll help you reset
            your password.
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
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-gold/40 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
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
