"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
} from "lucide-react";
import api from "@/lib/api/client";

type Artisan = {
  id: string;
  shop_name: string;
  bio: string | null;
  craft_specialization: string | null;
  state: string | null;
  district: string | null;
  is_verified: boolean;
};

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
  artisan: Artisan;
};

function formatDate(date: string | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getLocation(artisan: Artisan) {
  return [artisan.district, artisan.state].filter(Boolean).join(", ");
}

function getParagraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadStory() {
      try {
        setLoading(true);
        setError("");
        setNotFound(false);

        const slug = decodeURIComponent(params.slug).toLowerCase();

        const response = await api.get<Story>(
          `/stories/${encodeURIComponent(slug)}`
        );

        if (mounted) {
          setStory(response.data);
        }
      } catch (err: unknown) {
        if (!mounted) return;

        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof err.response === "object" &&
          err.response !== null &&
          "status" in err.response &&
          err.response.status === 404
        ) {
          setNotFound(true);
        } else {
          setError(
            "We could not load this story right now. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStory();

    return () => {
      mounted = false;
    };
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
        <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
          <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
            <div className="h-4 w-64 animate-pulse rounded bg-[#d9c9ad]" />
          </div>
        </div>

        <section className="bg-[#4a211c]">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center">
            <div className="mx-auto h-6 w-36 animate-pulse rounded-full bg-[#6a4038]" />
            <div className="mx-auto mt-8 h-14 max-w-3xl animate-pulse rounded bg-[#6a4038]" />
            <div className="mx-auto mt-4 h-14 max-w-2xl animate-pulse rounded bg-[#6a4038]" />
            <div className="mx-auto mt-8 h-5 w-72 animate-pulse rounded bg-[#6a4038]" />
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-20">
          <div className="h-5 w-32 animate-pulse rounded bg-[#dfd2bb]" />
          <div className="mt-10 aspect-[16/8] animate-pulse rounded-2xl bg-[#dfd2bb]" />
          <div className="mt-10 space-y-5">
            <div className="h-5 animate-pulse rounded bg-[#dfd2bb]" />
            <div className="h-5 animate-pulse rounded bg-[#dfd2bb]" />
            <div className="h-5 animate-pulse rounded bg-[#dfd2bb]" />
          </div>
        </article>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f0df] px-6 text-[#3d1f1b]">
        <div className="max-w-xl text-center">
          <BookOpen className="mx-auto h-12 w-12 text-[#8b1e2d]" />

          <h1 className="mt-6 font-serif text-4xl font-semibold text-[#4a211c]">
            Story not found
          </h1>

          <p className="mt-4 leading-7 text-[#6d5149]">
            This story may have been removed, unpublished, or the link may be
            incorrect.
          </p>

          <Link
            href="/stories"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Link>
        </div>
      </main>
    );
  }

  if (error || !story) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f0df] px-6 text-[#3d1f1b]">
        <div className="max-w-xl text-center">
          <BookOpen className="mx-auto h-12 w-12 text-[#8b1e2d]" />

          <h1 className="mt-6 font-serif text-4xl font-semibold text-[#4a211c]">
            The journal is resting
          </h1>

          <p className="mt-4 leading-7 text-[#6d5149]">
            {error || "This story could not be loaded right now."}
          </p>

          <Link
            href="/stories"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Link>
        </div>
      </main>
    );
  }

  const location = getLocation(story.artisan);
  const paragraphs = getParagraphs(story.content);
  const date = formatDate(story.published_at || story.created_at);
  const craft =
    story.artisan.craft_specialization || "Indian Handicraft";

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="transition hover:text-[#8b1e2d]">
              Home
            </Link>

            <span>/</span>

            <Link
              href="/stories"
              className="transition hover:text-[#8b1e2d]"
            >
              Stories
            </Link>

            <span>/</span>

            <span className="truncate font-semibold text-[#4a211c]">
              {story.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#4a211c]">
        <div className="absolute inset-0">
          {story.cover_image_url ? (
            <img
              src={story.cover_image_url}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-35"
            />
          ) : (
            <div className="h-full w-full bg-[#4a211c]" />
          )}

          <div className="absolute inset-0 bg-[#3d1f1b]/70" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:py-28">
          <span className="inline-flex rounded-full border border-[#e5c98b]/50 bg-[#3d1f1b]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
            {craft}
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#fff8eb] sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>

          {story.excerpt && (
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-8 text-[#f1dfc9] sm:text-xl">
              {story.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#f1dfc9]">
            {location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e5c98b]" />
                {location}
              </span>
            )}

            {date && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#e5c98b]" />
                {date}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:py-20">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d] transition hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stories
        </Link>

        {story.cover_image_url && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
            <img
              src={story.cover_image_url}
              alt={story.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <p className="mb-8 font-serif text-2xl leading-9 text-[#4a211c]">
            Every handmade object begins with a story — a place, a person and
            knowledge carried forward through time.
          </p>

          <div className="space-y-7">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p
                  key={`${story.id}-${index}`}
                  className="text-base leading-8 text-[#604940] sm:text-lg"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base leading-8 text-[#604940] sm:text-lg">
                {story.content}
              </p>
            )}
          </div>
        </div>

        {/* Artisan card */}
        <div className="mt-14 rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]/70 p-7 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
            The Artisan
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
            {story.artisan.shop_name}
          </h2>

          {location && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6d5149]">
              <MapPin className="h-4 w-4 text-[#8b1e2d]" />
              {location}
            </div>
          )}

          {story.artisan.bio ? (
            <p className="mt-4 text-sm leading-7 text-[#6d5149]">
              {story.artisan.bio}
            </p>
          ) : (
            <p className="mt-4 text-sm leading-7 text-[#6d5149]">
              A skilled artisan carrying forward the knowledge and techniques
              of {craft} through handmade practice.
            </p>
          )}

          <Link
            href="/artisans"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
          >
            Meet more artisans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Shop CTA */}
        <div className="mt-10 rounded-2xl bg-[#8b1e2d] p-8 text-center sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
            Bring the story home
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb]">
            Discover handmade pieces inspired by this tradition.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#f1dfc9]">
            Explore authentic crafts made by artisans and discover the stories
            behind the objects you collect.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
          >
            Explore the Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </main>
  );
}
