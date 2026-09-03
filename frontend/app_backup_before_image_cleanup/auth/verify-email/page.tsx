"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import api from "@/lib/api/client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyEmail = async () => {
    if (!token) {
      setError("Verification token is missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);

      setVerified(true);
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
          "Email verification failed. The link may be expired or invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kalakriti-paper flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-gold/40 bg-white/80 p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-maroon">
          {verified ? (
            <CheckCircle className="h-8 w-8" />
          ) : (
            <Mail className="h-8 w-8" />
          )}
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          KALAKRITI
        </p>

        <h1 className="font-serif text-3xl font-bold text-maroon">
          {verified ? "Email Verified" : "Verify Your Email"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {verified
            ? "Your email address has been verified successfully."
            : "Click the button below to verify your email address."}
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">
            {error}
          </div>
        )}

        {!verified && (
          <button
            type="button"
            onClick={verifyEmail}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        )}

        <Link
          href="/auth/login"
          className="mt-6 inline-block font-semibold text-maroon hover:underline"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="kalakriti-paper flex min-h-screen items-center justify-center">
          <p className="text-maroon">Loading...</p>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
