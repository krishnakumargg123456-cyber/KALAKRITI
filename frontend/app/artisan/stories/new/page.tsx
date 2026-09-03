"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import api from "@/lib/api/client";

export default function NewArtisanStoryPage() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageMessage, setImageMessage] = useState("");

  function createSlug(title: string) {
    return (
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36)
    );
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setImageMessage(
        "Image selected. Image upload will be connected when the storage upload endpoint is enabled."
      );
    } else {
      setImageMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!title || !content) {
      setError("Please enter a story title and story content.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await api.post("/artisan/stories", {
        title,
        slug: createSlug(title),
        excerpt: content.slice(0, 500),
        content,
        cover_image_url: null,
        status: "draft",
        scheduled_at: null,
      });

      setSaved(true);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(
          detail
            .map((item: any) => item?.msg || "Invalid story data")
            .join(", ")
        );
      } else {
        setError(
          detail ||
            "The story could not be saved. Please check your details and try again."
        );
      }
    } finally {
      setSaving(false);
    }
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
            Your artisan story has been saved successfully as a draft.
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

        <p className="mt-2 text-sm text-brown/65">
          Share the people, places and traditions behind your craft.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-border bg-paper p-6 md:p-8"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Story Title
            </span>

            <input
              name="title"
              required
              minLength={3}
              maxLength={200}
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
              onChange={handleImageChange}
              className="w-full rounded-lg border border-border bg-cream px-4 py-3"
            />

            {imageMessage && (
              <p className="mt-2 text-xs text-brown/55">{imageMessage}</p>
            )}
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Story
            </span>

            <textarea
              name="content"
              required
              minLength={10}
              rows={14}
              placeholder="Tell the story behind your craft..."
              className="w-full rounded-lg border border-border bg-cream px-4 py-3 leading-7 outline-none focus:border-gold"
            />
          </label>

          <div className="mt-6 rounded-lg border border-gold/20 bg-gold/5 px-4 py-3 text-xs leading-5 text-brown/65">
            Your story will be saved as a <strong>Draft</strong>. You can
            publish it later through the artisan story workflow.
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Story"
              )}
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
