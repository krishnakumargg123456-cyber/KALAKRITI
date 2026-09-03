"use client";

import { useEffect, useState } from "react";
import { Save, User } from "lucide-react";
import { usersApi } from "@/lib/api/users";

type Profile = {
  name: string;
  email: string;
  phone: string;
};

export default function ProfilePanel() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await usersApi.getProfile();
        const data = response.data;

        setProfile({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
        });
      } catch {
        setMessage("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      await usersApi.updateProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });

      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-card border border-border bg-paper p-8">
        <p className="text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="rounded-card border border-border bg-paper p-6 shadow-soft md:p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-border pb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-maroon">
          <User className="h-7 w-7" />
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon">
            Personal Details
          </h1>
          <p className="mt-1 text-sm text-muted">
            Keep your Kalakriti profile information up to date.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Full Name
          </label>
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink outline-none focus:border-maroon"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink outline-none focus:border-maroon"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">
            Phone Number
          </label>
          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink outline-none focus:border-maroon"
            placeholder="+91"
          />
        </div>

        {message && (
          <p className="rounded-lg bg-parchment px-4 py-3 text-sm text-maroon">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
