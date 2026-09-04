"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, Lock, ShieldCheck, Trash2, UserRound } from "lucide-react";

import { usersApi } from "@/lib/api/users";
import { authApi } from "@/lib/api/auth";

export default function ArtisanSettingsPage() {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteAccount = async () => {
    if (confirmation !== "DELETE") {
      setDeleteError("Please type DELETE to confirm.");
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await usersApi.deleteAccount();
      await authApi.logout();

      router.replace("/artisan");
    } catch {
      setDeleteError(
        "Unable to delete the account right now. Please try again."
      );
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Settings
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Manage your artisan account preferences and platform settings.
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <UserRound className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Account & Profile
                </h2>

                <p className="text-sm text-brown/60">
                  Update the personal and artisan information displayed to
                  customers.
                </p>
              </div>
            </div>

            <Link
              href="/artisan/profile"
              className="mt-6 flex items-center justify-between rounded-lg border border-border bg-cream p-4 transition hover:border-gold"
            >
              <div>
                <p className="font-semibold text-maroon">
                  Manage Artisan Profile
                </p>

                <p className="mt-1 text-xs text-brown/60">
                  Name, shop name, craft, story, phone, email and location.
                </p>
              </div>

              <ChevronRight className="h-5 w-5 text-gold" />
            </Link>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Notifications
                </h2>

                <p className="text-sm text-brown/60">
                  Notification preferences will be managed here once the
                  artisan notification settings API is enabled.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-cream p-5">
              <p className="text-sm font-semibold text-maroon">
                Notification preferences are currently platform-managed.
              </p>

              <p className="mt-2 text-xs leading-6 text-brown/60">
                The current backend does not expose an artisan-specific
                endpoint for saving order, custom-order or review notification
                preferences. No local-only settings are shown so that the
                interface never reports changes that were not persisted.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Store Preferences
                </h2>

                <p className="text-sm text-brown/60">
                  Store availability and marketplace controls.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-cream p-5">
              <p className="text-sm font-semibold text-maroon">
                Store availability is controlled by your product status.
              </p>

              <p className="mt-2 text-xs leading-6 text-brown/60">
                The current artisan API does not provide an independent
                “Accept New Orders” or store-preference field. Products can
                instead be managed from your product dashboard.
              </p>
            </div>

            <Link
              href="/artisan/products"
              className="mt-4 flex items-center justify-between rounded-lg border border-border bg-cream p-4 transition hover:border-gold"
            >
              <div>
                <p className="font-semibold text-maroon">
                  Manage Products
                </p>

                <p className="mt-1 text-xs text-brown/60">
                  Manage active and inactive products in your shop.
                </p>
              </div>

              <ChevronRight className="h-5 w-5 text-gold" />
            </Link>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Security
                </h2>

                <p className="text-sm text-brown/60">
                  Account security and password management.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-border bg-cream p-5">
              <p className="text-sm font-semibold text-maroon">
                Password change is not available through the current API.
              </p>

              <p className="mt-2 text-xs leading-6 text-brown/60">
                The current authentication backend does not expose a verified
                password-change endpoint, so this page does not collect or
                pretend to save passwords.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-red-200 bg-paper p-6">
            <div className="flex items-center gap-3">
              <Trash2 className="h-6 w-6 text-red-700" />

              <div>
                <h2 className="font-serif text-xl font-bold text-red-800">
                  Delete Account
                </h2>

                <p className="text-sm text-brown/60">
                  Permanently remove your artisan account when eligible.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-brown/65">
              This action cannot be undone. If your account has existing
              orders or payout records, KALAKRITI will deactivate the account
              instead so financial and order history remains preserved.
            </p>

            {!showDelete ? (
              <button
                type="button"
                onClick={() => setShowDelete(true)}
                className="mt-5 rounded-lg border border-red-300 px-5 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-50"
              >
                Delete Account
              </button>
            ) : (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50/40 p-5">
                <p className="text-sm font-semibold text-red-900">
                  Type DELETE to confirm
                </p>

                <input
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  placeholder="DELETE"
                  className="mt-3 w-full rounded-lg border border-red-200 bg-white px-4 py-3 text-sm outline-none focus:border-red-500"
                  disabled={deleting}
                />

                {deleteError && (
                  <p className="mt-2 text-xs font-medium text-red-700">
                    {deleteError}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                    className="rounded-lg bg-red-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deleting ? "Deleting..." : "Confirm Delete"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowDelete(false);
                      setConfirmation("");
                      setDeleteError("");
                    }}
                    disabled={deleting}
                    className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-maroon transition hover:border-gold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>


          <div className="rounded-xl border border-border bg-paper p-5 text-sm text-brown/60">
            <p className="font-semibold text-maroon">
              Platform-managed settings
            </p>

            <p className="mt-2 leading-6">
              Verification, account activation and marketplace-level controls
              are managed by KALAKRITI administration and cannot be changed
              from the artisan dashboard.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
