"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, MapPin } from "lucide-react";
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

type StoryListResponse = {
  items: Story[];
  total: number;
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

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadStories() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<StoryListResponse>("/stories", {
          params: {
            limit: 20,
          },
        });

        if (mounted) {
          setStories(response.data.items);
        }
      } catch {
        if (mounted) {
          setError(
            "We could not load the journal stories right now. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStories();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredStory = stories[0];
  const remainingStories = stories.slice(1);

  return (
    <main className="min-h-screen bg-[#f6efe2] text-[#3f211b]">
      <section className="relative overflow-hidden border-b border-[#b99355]/30 bg-[#5b1f25]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full border border-[#d7b56d]" />
          <div className="absolute right-20 top-20 h-56 w-56 rounded-full border border-[#d7b56d]" />
          <div className="absolute bottom-[-80px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-[#d7b56d]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mb-8 flex items-center gap-3 text-sm text-[#e7d4ad]">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span>Stories</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3 text-[#d7b56d]">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                The KALAKRITI Journal
              </span>
            </div>

            <h1 className="font-serif text-5xl leading-tight text-[#fff8eb] md:text-6xl lg:text-7xl">
              Stories Behind
              <span className="block text-[#d7b56d]">the Craft</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#eadcc4]">
              Meet the hands, traditions and communities behind India&apos;s
              timeless handmade heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {loading && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="h-[460px] animate-pulse rounded-2xl bg-[#eadfce] lg:col-span-2" />
            <div className="h-[460px] animate-pulse rounded-2xl bg-[#eadfce]" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-[#9b6b38]/30 bg-[#fffaf1] p-10 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-[#7b2630]" />
            <h2 className="mt-4 font-serif text-2xl">The journal is resting</h2>
            <p className="mt-2 text-sm text-[#725c50]">{error}</p>
          </div>
        )}

        {!loading && !error && stories.length === 0 && (
          <div className="rounded-2xl border border-[#9b6b38]/30 bg-[#fffaf1] p-12 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-[#7b2630]" />
            <h2 className="mt-4 font-serif text-3xl">
              Stories are coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#725c50]">
              We are gathering stories directly from the artisans who keep
              India&apos;s living craft traditions alive.
            </p>
          </div>
        )}

        {!loading && !error && featuredStory && (
          <>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a642f]">
                  Featured story
                </p>
                <h2 className="mt-3 font-serif text-4xl text-[#4a2021]">
                  From the artisan&apos;s hands
                </h2>
              </div>
            </div>

            <Link
              href={`/stories/${featuredStory.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-[#b99355]/30 bg-[#fffaf1] shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative min-h-[360px] overflow-hidden bg-[#e6d9c5] lg:min-h-[520px]">
                {featuredStory.cover_image_url ? (
                  <img
                    src={featuredStory.cover_image_url}
                    alt={featuredStory.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#eadfce]">
                    <BookOpen className="h-16 w-16 text-[#9b6b38]/50" />
                  </div>
                )}

                <div className="absolute left-5 top-5 rounded-full bg-[#5b1f25] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#f7e6bc]">
                  Featured
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-[#8a642f]">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(
                      featuredStory.published_at || featuredStory.created_at
                    )}
                  </span>

                  {getLocation(featuredStory.artisan) && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {getLocation(featuredStory.artisan)}
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-serif text-4xl leading-tight text-[#4a2021] md:text-5xl">
                  {featuredStory.title}
                </h3>

                {featuredStory.excerpt && (
                  <p className="mt-6 text-base leading-8 text-[#725c50]">
                    {featuredStory.excerpt}
                  </p>
                )}

                <div className="mt-8">
                  <p className="text-sm font-semibold text-[#5b1f25]">
                    {featuredStory.artisan.shop_name}
                  </p>

                  {featuredStory.artisan.craft_specialization && (
                    <p className="mt-1 text-sm text-[#8a642f]">
                      {featuredStory.artisan.craft_specialization}
                    </p>
                  )}
                </div>

                <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#7b2630]">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </>
        )}
      </section>

      {!loading && !error && remainingStories.length > 0 && (
        <section className="border-y border-[#b99355]/20 bg-[#efe4d2]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a642f]">
                The journal
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#4a2021]">
                More stories from India&apos;s craft traditions
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remainingStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#b99355]/25 bg-[#fffaf1] transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e6d9c5]">
                    {story.cover_image_url ? (
                      <img
                        src={story.cover_image_url}
                        alt={story.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <BookOpen className="h-12 w-12 text-[#9b6b38]/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8a642f]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(story.published_at || story.created_at)}
                    </div>

                    <h3 className="mt-4 font-serif text-2xl leading-tight text-[#4a2021]">
                      {story.title}
                    </h3>

                    {story.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#725c50]">
                        {story.excerpt}
                      </p>
                    )}

                    <div className="mt-5 border-t border-[#b99355]/20 pt-4">
                      <p className="text-sm font-semibold text-[#5b1f25]">
                        {story.artisan.shop_name}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#8a642f]">
                        {story.artisan.craft_specialization && (
                          <span>{story.artisan.craft_specialization}</span>
                        )}
                        {getLocation(story.artisan) && (
                          <span>· {getLocation(story.artisan)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#5b1f25]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d7b56d]">
            Keep the tradition alive
          </p>

          <h2 className="mt-5 font-serif text-4xl text-[#fff8eb] md:text-5xl">
            Every craft has a story.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#eadcc4]">
            Discover the people, places and generations of knowledge behind
            the handmade pieces you bring home.
          </p>

          <Link
            href="/artisans"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#d7b56d] px-7 py-3 text-sm font-semibold text-[#f7e6bc] transition hover:bg-[#d7b56d] hover:text-[#5b1f25]"
          >
            Meet the artisans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
