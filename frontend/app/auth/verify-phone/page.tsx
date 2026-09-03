"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import api from "@/lib/api/client";

export default function VerifyPhonePage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "verified">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-phone/send-otp", {
        phone,
      });

      setStep("otp");
    } catch (err: unknown) {
      const response = err as {
        response?: {
          data?: {
            detail?: string;
            message?: string;
          };
        };
      };

      setError(
        response.response?.data?.detail ||
          response.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-phone/verify", {
        phone,
        otp,
      });

      setStep("verified");
    } catch (err: unknown) {
      const response = err as {
        response?: {
          data?: {
            detail?: string;
            message?: string;
          };
        };
      };

      setError(
        response.response?.data?.detail ||
          response.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kalakriti-paper flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-gold/40 bg-white/80 p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-maroon">
          {step === "verified" ? (
            <CheckCircle className="h-8 w-8" />
          ) : (
            <Phone className="h-8 w-8" />
          )}
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          KALAKRITI
        </p>

        <h1 className="font-serif text-3xl font-bold text-maroon">
          {step === "verified" ? "Phone Verified" : "Verify Phone"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {step === "verified"
            ? "Your phone number has been verified successfully."
            : step === "otp"
              ? "Enter the OTP sent to your phone number."
              : "Enter your phone number to receive a verification OTP."}
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">
            {error}
          </div>
        )}

        {step === "phone" && (
          <form onSubmit={sendOtp} className="mt-6 space-y-4">
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              autoComplete="tel"
              className="w-full rounded-lg border border-gold/40 bg-white px-4 py-3 outline-none focus:border-maroon"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={verifyOtp} className="mt-6 space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              inputMode="numeric"
              maxLength={6}
              className="w-full rounded-lg border border-gold/40 bg-white px-4 py-3 text-center tracking-[0.4em] outline-none focus:border-maroon"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "verified" && (
          <Link
            href="/account"
            className="mt-6 inline-block w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-white hover:bg-maroon-light"
          >
            Go to Account
          </Link>
        )}

        <Link
          href="/auth/login"
          className="mt-6 inline-block text-sm font-semibold text-maroon hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
