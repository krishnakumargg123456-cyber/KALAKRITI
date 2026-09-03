"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function NewArtisanStoryPage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  if (saved) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-paper p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-700" />

          <h1 className="mt-5 font-serif text-3xl font-bold text-maroon">
            Story Saved
          </h1>

          <p className="mt-3 text-sm text-brown/65">
            Your artisan story has been saved successfully.
          </p>

          <Link
            href="/artisan/stories"
            className="mt-7 inline-block rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            Back to Stories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/artisan/stories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-maroon"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stories
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-bold text-maroon">
          Write Your Craft Story
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-border bg-paper p-6 md:p-8"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Story Title
            </span>

            <input
              required
              placeholder="Enter your story title"
              className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Cover Image
            </span>

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-border bg-cream px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Story
            </span>

            <textarea
              required
              rows={14}
              placeholder="Tell the story behind your craft..."
              className="w-full rounded-lg border border-border bg-cream px-4 py-3 leading-7 outline-none focus:border-gold"
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
            >
              Save Story
            </button>

            <Link
              href="/artisan/stories"
              className="flex-1 rounded-lg border border-border px-6 py-3 text-center font-semibold text-brown"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}