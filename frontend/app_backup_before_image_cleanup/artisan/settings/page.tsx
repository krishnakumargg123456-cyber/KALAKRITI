"use client";

import { FormEvent, useState } from "react";
import { Bell, Lock, Save, ShieldCheck } from "lucide-react";

export default function ArtisanSettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);

    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Settings
        </h1>

        {saved && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Settings saved successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Notifications
                </h2>

                <p className="text-sm text-brown/60">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Toggle
                title="New Order Notifications"
                description="Receive alerts when a customer places an order."
                defaultChecked
              />

              <Toggle
                title="Custom Order Requests"
                description="Get notified about new personalised requests."
                defaultChecked
              />

              <Toggle
                title="Customer Reviews"
                description="Receive notifications when customers review your products."
                defaultChecked
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Store Preferences
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-brown">
                  Store Display Name
                </span>

                <input
                  defaultValue="Madhav Traditional Arts"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-cream p-4">
                <div>
                  <p className="font-semibold text-maroon">
                    Accept New Orders
                  </p>
                  <p className="mt-1 text-xs text-brown/60">
                    Allow customers to purchase your products.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-maroon"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Security
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <input
                type="password"
                placeholder="Current password"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />

              <input
                type="password"
                placeholder="New password"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </div>
          </section>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </form>
      </div>
    </main>
  );
}

function Toggle({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-cream p-4">
      <div>
        <p className="font-semibold text-maroon">{title}</p>
        <p className="mt-1 text-xs text-brown/60">{description}</p>
      </div>

      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 accent-maroon"
      />
    </label>
  );
}