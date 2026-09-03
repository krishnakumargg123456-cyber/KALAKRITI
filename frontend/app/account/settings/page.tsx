"use client";

import Link from "next/link";
import {
  Bell,
  ChevronRight,
  Lock,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-2 flex items-center gap-3 font-serif text-3xl font-bold text-maroon">
            <Settings className="h-7 w-7" />
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage your Kalakriti account and security preferences.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <Bell className="mt-1 h-6 w-6 shrink-0 text-gold" />

              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Notifications
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Your order and delivery notifications are managed by the
                  Kalakriti platform. Dedicated account-level notification
                  preference controls are not currently exposed by the
                  account API.
                </p>

                <div className="mt-5 rounded-lg border border-gold/20 bg-cream/40 p-4">
                  <p className="text-sm font-semibold text-maroon">
                    Notification preferences
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Custom notification and marketing preference persistence
                    will become available when the account preferences API is
                    added.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 shrink-0 text-gold" />

              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Security
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Password changes require a dedicated account security
                  endpoint. The current account API does not expose a
                  password-change operation, so no fake local password update
                  is provided here.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-lg border border-gold/20 bg-cream/40 p-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-green-700" />

                  <div>
                    <p className="text-sm font-semibold text-maroon">
                      Account security
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Authentication and password management are handled by
                      the backend authentication system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Account Information
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Update your personal information from your profile page.
            </p>

            <Link
              href="/account/profile"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-maroon px-5 py-3 font-semibold text-maroon transition hover:bg-maroon hover:text-white"
            >
              Manage Profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
