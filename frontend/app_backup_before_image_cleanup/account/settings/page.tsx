"use client";

import { useState } from "react";
import { Bell, Lock, Save, Settings } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            Manage your Kalakriti account preferences.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Bell className="mt-1 h-6 w-6 text-gold" />

              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Notifications
                </h2>

                <div className="mt-5 space-y-4">
                  <label className="flex cursor-pointer items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        Order notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Get updates about your orders and deliveries.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(event) =>
                        setNotifications(event.target.checked)
                      }
                      className="h-5 w-5 accent-maroon"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        Offers and updates
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive occasional news about crafts and offers.
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(event) =>
                        setMarketing(event.target.checked)
                      }
                      className="h-5 w-5 accent-maroon"
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Security
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Keep your account secure by using a strong password.
                </p>

                <button
                  type="button"
                  className="mt-4 rounded-lg border border-maroon px-5 py-2.5 font-semibold text-maroon transition hover:bg-maroon hover:text-white"
                >
                  Change Password
                </button>
              </div>
            </div>
          </section>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light"
            >
              <Save className="h-5 w-5" />
              Save Settings
            </button>

            {saved && (
              <span className="text-sm font-semibold text-green-700">
                Settings saved
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
