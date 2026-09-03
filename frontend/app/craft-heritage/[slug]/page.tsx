"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Palette,
  Sparkles,
  Users,
  Clock,
  ShoppingBag,
} from "lucide-react";

type Craft = {
  id: string | number;
  name: string;
  slug?: string;
  title?: string;
  description?: string | null;
  short_description?: string | null;
  history?: string | null;
  origin?: string | null;
  region?: string | null;
  state?: string | null;
  image_url?: string | null;
  cover_image?: string | null;
  image?: string | null;
  category?: string | null;
  artisan_count?: number;
  products_count?: number;
  established?: string | null;
  materials?: string[] | null;
  techniques?: string[] | null;
};

function getImage(craft: Craft) {
  return craft.image_url || craft.cover_image || craft.image || "";
}

export default function CraftHeritageDetailPage() {
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const [craft, setCraft] = useState<Craft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    async function loadCraft() {
      try {
        setLoading(true);
        setError("");

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:8000/api/v1";

        const response = await fetch(
          `${baseUrl}/categories/${encodeURIComponent(slug)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Craft heritage not found");
        }

        const data = await response.json();

        setCraft(data?.data ?? data);
      } catch (err) {
        console.error("Craft heritage loading error:", err);
        setError(
          "Unable to load this craft heritage story."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCraft();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-12">
        <div className="kalakriti-container">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-brown/10" />

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div className="aspect-[4/3] rounded-2xl bg-brown/10" />

              <div className="space-y-5">
                <div className="h-5 w-32 rounded bg-brown/10" />
                <div className="h-14 w-3/4 rounded bg-brown/10" />
                <div className="h-5 w-full rounded bg-brown/10" />
                <div className="h-5 w-5/6 rounded bg-brown/10" />
                <div className="h-28 w-full rounded bg-brown/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !craft) {
    return (
      <main className="min-h-[70vh] bg-cream px-4 py-20">
        <div className="kalakriti-container text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-deep-maroon/10 bg-white/60 p-10 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              KALAKRITI HERITAGE
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold text-deep-maroon">
              Craft Story Not Found
            </h1>

            <p className="mt-4 text-brown">
              {error ||
                "This craft heritage story is currently unavailable."}
            </p>

            <Link
              href="/craft-heritage"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-deep-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon"
            >
              <ArrowLeft size={17} />
              Back to Craft Heritage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const image = getImage(craft);

  const description =
    craft.short_description ||
    craft.description ||
    "Discover the living traditions, techniques and stories behind this remarkable Indian craft.";

  const origin =
    craft.origin ||
    craft.region ||
    craft.state ||
    "India";

  return (
    <main className="min-h-screen bg-cream">
      <div className="kalakriti-container px-4 py-8 md:py-12">

        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-brown/70">
          <Link
            href="/"
            className="transition hover:text-deep-maroon"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/craft-heritage"
            className="transition hover:text-deep-maroon"
          >
            Craft Heritage
          </Link>

          <span>/</span>

          <span className="text-deep-maroon">
            {craft.name}
          </span>
        </div>

        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-deep-maroon/10 bg-white shadow-sm">
            {image ? (
              <img
                src={image}
                alt={craft.name}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-[#eee5d3]">
                <Palette
                  size={80}
                  strokeWidth={1}
                  className="text-deep-maroon/30"
                />
              </div>
            )}

            <div className="absolute left-5 top-5 rounded-full bg-deep-maroon px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream">
              Living Heritage
            </div>
          </div>

          {/* Intro */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Indian Craft Heritage
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-6xl">
              {craft.title || craft.name}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-brown">
              <MapPin size={17} className="text-gold" />
              <span>{origin}</span>
            </div>

            <p className="mt-7 text-lg leading-8 text-brown">
              {description}
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

              {craft.artisan_count !== undefined && (
                <div className="rounded-xl border border-gold/30 bg-[#f6eedf] p-4">
                  <Users
                    size={20}
                    className="text-gold"
                  />
                  <p className="mt-3 text-2xl font-bold text-deep-maroon">
                    {craft.artisan_count}
                  </p>
                  <p className="text-xs text-brown/70">
                    Artisans
                  </p>
                </div>
              )}

              {craft.products_count !== undefined && (
                <div className="rounded-xl border border-gold/30 bg-[#f6eedf] p-4">
                  <ShoppingBag
                    size={20}
                    className="text-gold"
                  />
                  <p className="mt-3 text-2xl font-bold text-deep-maroon">
                    {craft.products_count}
                  </p>
                  <p className="text-xs text-brown/70">
                    Products
                  </p>
                </div>
              )}

              {craft.established && (
                <div className="rounded-xl border border-gold/30 bg-[#f6eedf] p-4">
                  <Clock
                    size={20}
                    className="text-gold"
                  />
                  <p className="mt-3 text-lg font-bold text-deep-maroon">
                    {craft.established}
                  </p>
                  <p className="text-xs text-brown/70">
                    Heritage
                  </p>
                </div>
              )}
            </div>

            <Link
              href={`/shop?category=${encodeURIComponent(
                craft.slug || slug || ""
              )}`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-deep-maroon px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-maroon"
            >
              <ShoppingBag size={18} />
              Explore This Craft
            </Link>
          </div>
        </section>

        {/* Heritage story */}
        <section className="mt-20 border-t border-deep-maroon/10 pt-14">

          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">

            <article>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                The Story
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
                A tradition carried through generations
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-brown">
                <p>
                  {craft.history ||
                    craft.description ||
                    "Indian handicrafts are more than objects of beauty. They represent communities, landscapes, memories and knowledge passed from one generation to another."}
                </p>

                <p>
                  Every handmade creation reflects the patience,
                  imagination and skill of the artisan who made it.
                  KALAKRITI brings these traditions closer to people
                  while celebrating the cultural identity behind every
                  craft.
                </p>

                <p>
                  From carefully selected natural materials to
                  distinctive regional techniques, each craft carries
                  its own visual language and cultural meaning.
                </p>
              </div>
            </article>

            {/* Heritage card */}
            <aside className="rounded-2xl border border-gold/30 bg-[#f6eedf] p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-maroon text-cream">
                <Sparkles size={22} />
              </div>

              <h3 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
                Living Heritage
              </h3>

              <p className="mt-4 text-sm leading-7 text-brown">
                Supporting traditional crafts helps preserve skills,
                livelihoods and cultural knowledge for future
                generations.
              </p>

              <Link
                href="/artisans"
                className="mt-6 inline-flex items-center text-sm font-semibold text-deep-maroon underline underline-offset-4"
              >
                Meet the artisans
              </Link>
            </aside>
          </div>
        </section>

        {/* Materials & techniques */}
        {(craft.materials?.length ||
          craft.techniques?.length) && (
          <section className="mt-20 border-t border-deep-maroon/10 pt-14">

            <div className="grid gap-10 md:grid-cols-2">

              {craft.materials &&
                craft.materials.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">
                      Materials
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon">
                      From nature to craft
                    </h2>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {craft.materials.map(
                        (material) => (
                          <span
                            key={material}
                            className="rounded-full border border-deep-maroon/15 bg-white px-4 py-2 text-sm text-brown"
                          >
                            {material}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {craft.techniques &&
                craft.techniques.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold">
                      Techniques
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon">
                      Skill passed down
                    </h2>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {craft.techniques.map(
                        (technique) => (
                          <span
                            key={technique}
                            className="rounded-full border border-deep-maroon/15 bg-white px-4 py-2 text-sm text-brown"
                          >
                            {technique}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-20 overflow-hidden rounded-2xl bg-deep-maroon px-6 py-14 text-center md:px-12">

          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Preserve â€¢ Discover â€¢ Celebrate
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold text-cream md:text-5xl">
            Bring a piece of India&apos;s craft heritage home
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-cream/75">
            Explore authentic handmade creations inspired by the
            traditions and communities behind this craft.
          </p>

          <Link
            href={`/shop?category=${encodeURIComponent(
              craft.slug || slug || ""
            )}`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-bold text-deep-maroon transition hover:opacity-90"
          >
            <ShoppingBag size={18} />
            Explore Crafts
          </Link>
        </section>

        {/* Back */}
        <div className="mt-10 border-t border-deep-maroon/10 pt-8">
          <Link
            href="/craft-heritage"
            className="inline-flex items-center gap-2 text-sm font-semibold text-deep-maroon hover:underline"
          >
            <ArrowLeft size={17} />
            Back to Craft Heritage
          </Link>
        </div>

      </div>
    </main>
  );
}
