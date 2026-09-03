"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  getMyArtisan,
  updateMyArtisan,
  type Artisan,
} from "@/lib/api/artisans";
import { usersApi } from "@/lib/api/users";

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const data = (error.response as { data?: unknown }).data;

    if (
      data &&
      typeof data === "object" &&
      "detail" in data
    ) {
      const detail = (data as { detail?: unknown }).detail;

      if (typeof detail === "string") {
        return detail;
      }

      if (Array.isArray(detail)) {
        return detail
          .map((item) =>
            item &&
            typeof item === "object" &&
            "msg" in item
              ? String((item as { msg?: unknown }).msg)
              : "Invalid information",
          )
          .join(", ");
      }
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export default function ArtisanProfilePage() {
  const [artisan, setArtisan] = useState<Artisan | null>(null);

  const [name, setName] = useState("");
  const [craftName, setCraftName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [primaryCraft, setPrimaryCraft] = useState("");
  const [story, setStory] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, artisanResponse] = await Promise.all([
          usersApi.getProfile(),
          getMyArtisan(),
        ]);

        if (!mounted) return;

        const profile = profileResponse.data;

        setName(profile?.name ?? "");
        setEmail(profile?.email ?? "");
        setPhone(profile?.phone ?? "");

        setArtisan(artisanResponse);
        setCraftName(artisanResponse.shop_name ?? "");
        setPrimaryCraft(
          artisanResponse.craft_specialization ?? "",
        );
        setStory(artisanResponse.bio ?? "");
        setDistrict(artisanResponse.district ?? "");
        setState(artisanResponse.state ?? "");
      } catch (loadError) {
        if (!mounted) return;

        setError(
          getErrorMessage(
            loadError,
            "Unable to load your artisan profile.",
          ),
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!artisan) {
      setError("Artisan profile could not be found.");
      return;
    }

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const updatedArtisan = await updateMyArtisan({
        shop_name: craftName.trim(),
        bio: story.trim() || null,
        craft_specialization: primaryCraft.trim() || null,
        state: state.trim() || null,
        district: district.trim() || null,
      });

      await usersApi.updateProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });

      setArtisan(updatedArtisan);
      setCraftName(updatedArtisan.shop_name ?? "");
      setPrimaryCraft(updatedArtisan.craft_specialization ?? "");
      setStory(updatedArtisan.bio ?? "");
      setDistrict(updatedArtisan.district ?? "");
      setState(updatedArtisan.state ?? "");

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "Unable to save profile changes. Please try again.",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-2xl border border-border bg-paper p-12">
          <Loader2 className="h-6 w-6 animate-spin text-maroon" />
          <span className="ml-3 text-sm text-brown/70">
            Loading artisan profile...
          </span>
        </div>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-paper p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-maroon">
            Artisan Profile Unavailable
          </h1>

          <p className="mt-3 text-sm text-brown/65">
            {error || "Your artisan profile could not be loaded."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Artisan Profile
        </h1>

        <p className="mt-2 text-sm text-brown/65">
          Tell customers about the artisan behind your craft.
        </p>

        {saved && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            Profile changes saved successfully.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <UserRound className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Personal Information
                </h2>

                <p className="text-sm text-brown/60">
                  Basic information connected to your account.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                value={name}
                onChange={setName}
                required
              />

              <Field
                label="Craft / Shop Name"
                value={craftName}
                onChange={setCraftName}
                required
              />

              <Field
                label="Phone"
                value={phone}
                onChange={setPhone}
                type="tel"
              />

              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                type="email"
                required
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Craft Information
            </h2>

            <div className="mt-5">
              <Field
                label="Primary Craft"
                value={primaryCraft}
                onChange={setPrimaryCraft}
                placeholder="Madhubani Painting"
              />
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-brown">
                Artisan Story
              </span>

              <textarea
                rows={7}
                value={story}
                onChange={(event) => setStory(event.target.value)}
                placeholder="Tell customers about your craft journey, techniques and traditions..."
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Location
                </h2>

                <p className="text-sm text-brown/60">
                  Location shown on your artisan profile.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                label="District"
                value={district}
                onChange={setDistrict}
                placeholder="Madhubani"
              />

              <Field
                label="State"
                value={state}
                onChange={setState}
                placeholder="Bihar"
              />
            </div>
          </section>

          <div className="rounded-xl border border-dashed border-border bg-paper p-5 text-sm text-brown/60">
            <p>
              Your artisan profile is linked to your authenticated account.
              Marketplace permissions and verification status are managed by
              the platform.
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-cream px-3 py-1">
                Verification:{" "}
                {artisan.is_verified ? "Verified" : "Pending"}
              </span>

              <span className="rounded-full bg-cream px-3 py-1">
                Status: {artisan.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-brown">
        {label}
      </span>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
    </label>
  );
}
