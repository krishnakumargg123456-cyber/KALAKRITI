"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, MapPin, UserRound } from "lucide-react";

export default function ArtisanProfilePage() {
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

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <UserRound className="h-6 w-6 text-gold" />

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Personal Information
                </h2>

                <p className="text-sm text-brown/60">
                  Basic information shown on your artisan profile.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                defaultValue="Madhav Kumar"
              />

              <Field
                label="Craft Name"
                defaultValue="Madhubani Folk Art"
              />

              <Field
                label="Phone"
                defaultValue="+91 98765 43210"
              />

              <Field
                label="Email"
                defaultValue="artisan@example.com"
                type="email"
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Craft Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                label="Primary Craft"
                defaultValue="Madhubani Painting"
              />

              <Field
                label="Years of Experience"
                defaultValue="18"
                type="number"
              />
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-brown">
                Artisan Story
              </span>

              <textarea
                rows={7}
                defaultValue="I learned Madhubani painting from my family and have continued the traditional techniques while creating contemporary artwork."
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-gold" />

              <h2 className="font-serif text-xl font-bold text-maroon">
                Location
              </h2>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Village / City" defaultValue="Madhubani" />
              <Field label="District" defaultValue="Madhubani" />
              <Field label="State" defaultValue="Bihar" />
              <Field label="PIN Code" defaultValue="847211" />
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            Save Profile
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-brown">
        {label}
      </span>

      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
    </label>
  );
}