"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Loader2, Save, UserCircle } from "lucide-react";
import { usersApi } from "@/lib/api/users";

type Profile = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export default function AccountProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await usersApi.getProfile();
        const data = response.data as Profile;

        setName(data?.name || "");
        setEmail(data?.email || "");
        setPhone(data?.phone || "");
      } catch (err) {
        console.error("Profile loading error:", err);
        setError("Unable to load your profile right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSaved(false);

      await usersApi.updateProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Unable to save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center py-24">
          <div className="flex items-center gap-3 text-maroon">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Loading your profile...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-2 flex items-center gap-3 font-serif text-3xl font-bold text-maroon">
            <UserCircle className="h-7 w-7" />
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Keep your personal information up to date.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-maroon"
                >
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-maroon"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-semibold text-maroon"
                >
                  Email Address
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-maroon"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-semibold text-maroon"
                >
                  Phone Number
                </label>

                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={30}
                  className="w-full rounded-lg border border-gold/30 bg-cream/30 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-maroon"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gold/20 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                {saving ? "Saving..." : "Save Profile"}
              </button>

              {saved && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Profile saved successfully
                </span>
              )}
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
