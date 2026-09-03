"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Landmark, Wallet } from "lucide-react";

export default function ArtisanPayoutsPage() {
  const [requested, setRequested] = useState(false);

  function requestPayout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequested(true);
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Payouts
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-paper p-6">
            <Wallet className="h-7 w-7 text-gold" />

            <p className="mt-4 text-sm text-brown/60">
              Available for Payout
            </p>

            <p className="mt-1 text-3xl font-bold text-maroon">
              ₹24,800
            </p>

            <p className="mt-3 text-xs text-brown/55">
              Minimum payout amount: ₹500
            </p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-6">
            <Landmark className="h-7 w-7 text-gold" />

            <p className="mt-4 text-sm text-brown/60">
              Bank Account
            </p>

            <p className="mt-1 font-semibold text-maroon">
              HDFC Bank •••• 4821
            </p>

            <p className="mt-2 text-sm text-brown/60">
              Account holder: Verified Artisan
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-xl border border-border bg-paper p-6">
          <h2 className="font-serif text-xl font-bold text-maroon">
            Request Payout
          </h2>

          {requested ? (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
                <div>
                  <p className="font-semibold text-green-800">
                    Payout request submitted
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Your request will be processed after verification.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={requestPayout} className="mt-5 max-w-md">
              <label className="block text-sm font-medium text-brown">
                Amount
              </label>

              <input
                required
                type="number"
                min="500"
                max="24800"
                placeholder="Enter amount"
                className="mt-2 w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-maroon px-5 py-3 font-semibold text-cream"
              >
                Request Payout
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}