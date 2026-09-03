"use client";

import Link from "next/link";
import { BookOpen, Edit3, Plus } from "lucide-react";

const stories = [
  {
    id: "1",
    title: "The Story Behind My Madhubani Art",
    excerpt:
      "How generations of traditional knowledge shaped my journey as a folk artist.",
    status: "Published",
  },
  {
    id: "2",
    title: "Colours of My Village",
    excerpt:
      "Exploring the natural inspirations and symbols that appear in my artwork.",
    status: "Draft",
  },
];

export default function ArtisanStoriesPage() {
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-semibold text-cream"
          >
            <Plus className="h-4 w-4" />
            Write Story
          </Link>
        </div>

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

                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-maroon">
                  {story.status}
                </span>
              </div>

              <h2 className="mt-5 font-serif text-xl font-bold text-maroon">
                {story.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-brown/70">
                {story.excerpt}
              </p>

              <div className="mt-6 flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-maroon">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>

                <button className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-brown">
                  Preview
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}