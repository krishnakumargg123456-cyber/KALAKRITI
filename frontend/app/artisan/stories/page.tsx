"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import api from "@/lib/api/client";

type Story = {
  id: string;
  artisan_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
};

type StoryListResponse = {
  items: Story[];
  total: number;
};

function formatDate(date: string | null) {
  if (!date) return "No date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function statusLabel(status: Story["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ArtisanStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadStories() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<StoryListResponse>("/artisan/stories", {
        params: {
          limit: 50,
        },
      });

      setStories(response.data.items);
    } catch {
      setError(
        "We could not load your stories right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStories();
  }, []);

  async function handleDelete(story: Story) {
    const confirmed = window.confirm(
      `Delete "${story.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(story.id);
      setError("");

      await api.delete(`/artisan/stories/${story.id}`);

      setStories((current) =>
        current.filter((item) => item.id !== story.id)
      );
    } catch {
      setError("The story could not be deleted. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Artisan Studio
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
              My Stories
            </h1>

            <p className="mt-2 text-sm text-brown/65">
              Share the people, places and traditions behind your craft.
            </p>
          </div>

          <Link
            href="/artisan/stories/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
          >
            <Plus className="h-4 w-4" />
            Write Story
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex min-h-[280px] items-center justify-center rounded-xl border border-border bg-paper">
            <div className="flex items-center gap-3 text-sm font-medium text-brown/70">
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
              Loading your stories...
            </div>
          </div>
        ) : stories.length === 0 ? (
          <div className="mt-8 rounded-xl border border-border bg-paper px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
              <BookOpen className="h-6 w-6 text-gold" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-maroon">
              Your story collection is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brown/65">
              Share your craft journey, traditions and the people behind your
              handmade work.
            </p>

            <Link
              href="/artisan/stories/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-semibold text-cream"
            >
              <Plus className="h-4 w-4" />
              Write Your First Story
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.id}
                className="rounded-xl border border-border bg-paper p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10">
                    <BookOpen className="h-5 w-5 text-gold" />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      story.status === "published"
                        ? "bg-green-100 text-green-800"
                        : story.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gold/10 text-maroon"
                    }`}
                  >
                    {statusLabel(story.status)}
                  </span>
                </div>

                <h2 className="mt-5 font-serif text-xl font-bold text-maroon">
                  {story.title}
                </h2>

                {story.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-brown/70">
                    {story.excerpt}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-brown/55">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-gold" />
                    {story.status === "scheduled"
                      ? `Scheduled ${formatDate(story.scheduled_at)}`
                      : formatDate(
                          story.published_at || story.created_at
                        )}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled
                    title="Story editing screen will be available here"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-maroon/40"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>

                  {story.status === "published" && (
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-maroon transition hover:bg-gold/10"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(story)}
                    disabled={deletingId === story.id}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === story.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
