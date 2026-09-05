"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flower2,
  MapPin,
  Palette,
  ShoppingBag,
  Sparkles,
  Users,
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
        setError("Unable to load this craft heritage story.");
      } finally {
        setLoading(false);
      }
    }

    loadCraft();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fbf7ee] px-5 py-12">
        <div className="kalakriti-container">
          <div className="animate-pulse">
            <div className="h-4 w-40 bg-[#641f20]/10" />

            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div className="aspect-[4/3] border border-[#b08d57]/20 bg-[#eee4d1]" />

              <div className="space-y-6">
                <div className="h-4 w-40 bg-[#641f20]/10" />
                <div className="h-16 w-4/5 bg-[#641f20]/10" />
                <div className="h-5 w-full bg-[#641f20]/10" />
                <div className="h-5 w-5/6 bg-[#641f20]/10" />
                <div className="h-24 w-full bg-[#641f20]/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !craft) {
    return (
      <main className="min-h-[70vh] bg-[#fbf7ee] px-5 py-20">
        <div className="kalakriti-container text-center">
          <div className="mx-auto max-w-xl border border-[#b08d57]/50 bg-[#fffaf0] p-10 shadow-[0_20px_50px_rgba(69,21,23,0.07)]">
            <p className="kalakriti-eyebrow">KALAKRITI Heritage</p>

            <h1 className="kalakriti-heading mt-4 text-4xl">
              Craft Story Not Found
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#75665b]">
              {error ||
                "This craft heritage story is currently unavailable."}
            </p>

            <Link
              href="/craft-heritage"
              className="mt-8 inline-flex items-center gap-2 bg-[#641f20] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#7a3030]"
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

  const craftSlug = craft.slug || slug || "";

  return (
    <main className="min-h-screen bg-[#fbf7ee] text-[#2b211d]">
      <div className="kalakriti-container px-5 py-8 md:px-8 md:py-12">
        <div className="mb-10 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#75665b]">
          <Link href="/" className="transition hover:text-[#641f20]">
            Home
          </Link>

          <span className="text-[#b08d57]">/</span>

          <Link
            href="/craft-heritage"
            className="transition hover:text-[#641f20]"
          >
            Craft Heritage
          </Link>

          <span className="text-[#b08d57]">/</span>

          <span className="text-[#641f20]">
            {craft.name}
          </span>
        </div>

        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-3 border border-[#b08d57]/20" />

            <div className="relative overflow-hidden border border-[#b08d57]/60 bg-[#eee4d1] p-2">
              <div className="relative overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={craft.name}
                    className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-[#eee4d1]">
                    <Palette
                      size={88}
                      strokeWidth={1}
                      className="text-[#641f20]/25"
                    />
                  </div>
                )}

                <div className="absolute left-5 top-5 border border-[#d6aa4c]/70 bg-[#641f20]/95 px-4 py-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#fffaf0]">
                    Living Heritage
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-4 hidden h-20 w-20 items-center justify-center border border-[#b08d57]/50 bg-[#fffaf0] md:flex">
              <Flower2
                className="h-9 w-9 text-[#b08d57]"
                strokeWidth={1}
              />
            </div>
          </div>

          <div>
            <p className="kalakriti-eyebrow">
              {craft.category || "Indian Craft Heritage"}
            </p>

            <h1 className="kalakriti-heading mt-5 text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              {craft.title || craft.name}
            </h1>

            <div className="mt-6 flex items-center gap-2 text-sm text-[#75665b]">
              <MapPin className="h-4 w-4 text-[#b08d57]" />
              <span>{origin}</span>
            </div>

            <div className="mt-7 h-px w-16 bg-[#b08d57]" />

            <p className="mt-7 text-base leading-8 text-[#4f423b] md:text-lg">
              {description}
            </p>

            <div className="mt-9 grid grid-cols-2 border-y border-[#b08d57]/30 sm:grid-cols-3">
              {craft.artisan_count !== undefined && (
                <div className="border-r border-[#b08d57]/25 px-4 py-5">
                  <Users className="h-5 w-5 text-[#b08d57]" />
                  <p className="mt-3 font-serif text-2xl text-[#641f20]">
                    {craft.artisan_count}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Artisans
                  </p>
                </div>
              )}

              {craft.products_count !== undefined && (
                <div className="px-4 py-5 sm:border-r sm:border-[#b08d57]/25">
                  <ShoppingBag className="h-5 w-5 text-[#b08d57]" />
                  <p className="mt-3 font-serif text-2xl text-[#641f20]">
                    {craft.products_count}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Creations
                  </p>
                </div>
              )}

              {craft.established && (
                <div className="col-span-2 border-t border-[#b08d57]/25 px-4 py-5 sm:col-span-1 sm:border-t-0">
                  <Clock className="h-5 w-5 text-[#b08d57]" />
                  <p className="mt-3 font-serif text-lg text-[#641f20]">
                    {craft.established}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Heritage
                  </p>
                </div>
              )}
            </div>

            <Link
              href={`/shop?category=${encodeURIComponent(craftSlug)}`}
              className="group mt-9 inline-flex items-center gap-3 bg-[#641f20] px-7 py-3.5 text-sm font-semibold text-[#fffaf0] transition hover:-translate-y-0.5 hover:bg-[#7a3030]"
            >
              Explore This Craft
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="mt-24 border-y border-[#b08d57]/30 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="kalakriti-eyebrow">The journey of a craft</p>

            <h2 className="kalakriti-heading mt-4 text-4xl md:text-5xl">
              Place.
              <span className="text-[#7a3030]"> Tradition. </span>
              People.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#75665b] md:text-base">
              A craft is shaped by the land where it begins, the tradition
              that gives it meaning, and the artisans who carry its knowledge
              forward.
            </p>

            <div className="mt-12 grid gap-px border border-[#b08d57]/40 bg-[#b08d57]/40 md:grid-cols-3">
              <div className="bg-[#fffaf0] p-7">
                <MapPin className="mx-auto h-6 w-6 text-[#b08d57]" />
                <p className="mt-4 font-serif text-2xl text-[#641f20]">
                  Place
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#75665b]">
                  {craft.state || craft.region || origin}
                </p>
              </div>

              <div className="bg-[#fffaf0] p-7">
                <Palette className="mx-auto h-6 w-6 text-[#b08d57]" />
                <p className="mt-4 font-serif text-2xl text-[#641f20]">
                  Tradition
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#75665b]">
                  {craft.category || "Living craft"}
                </p>
              </div>

              <div className="bg-[#fffaf0] p-7">
                <Users className="mx-auto h-6 w-6 text-[#b08d57]" />
                <p className="mt-4 font-serif text-2xl text-[#641f20]">
                  People
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#75665b]">
                  Artisan community
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <article>
            <p className="kalakriti-eyebrow">The Story</p>

            <h2 className="kalakriti-heading mt-4 text-4xl md:text-5xl">
              A tradition carried
              <span className="block text-[#7a3030]">
                through generations.
              </span>
            </h2>

            <div className="mt-7 h-px w-16 bg-[#b08d57]" />

            <div className="mt-8 space-y-6 text-base leading-8 text-[#4f423b]">
              <p>
                {craft.history ||
                  craft.description ||
                  "Indian handicrafts are more than objects of beauty. They represent communities, landscapes, memories and knowledge passed from one generation to another."}
              </p>

              <p>
                Every handmade creation reflects the patience, imagination
                and skill of the artisan who made it. KALAKRITI brings these
                traditions closer to people while celebrating the cultural
                identity behind every craft.
              </p>

              <p>
                From carefully selected materials to distinctive regional
                techniques, each craft carries its own visual language,
                cultural meaning and human story.
              </p>
            </div>
          </article>

          <aside className="self-start border border-[#b08d57]/50 bg-[#f4ead8] p-8">
            <div className="flex h-12 w-12 items-center justify-center border border-[#b08d57]/60 bg-[#fffaf0]">
              <Sparkles className="h-5 w-5 text-[#b08d57]" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d57]">
              Living Heritage
            </p>

            <h3 className="mt-3 font-serif text-3xl font-medium text-[#641f20]">
              The maker is part of the story.
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#75665b]">
              Discover the artisans and communities who continue to practise
              the skills behind India's living craft traditions.
            </p>

            <Link
              href="/artisans"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#641f20]"
            >
              Meet the artisans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </aside>
        </section>

        {(craft.materials?.length || craft.techniques?.length) ? (
          <section className="mt-24 border-t border-[#b08d57]/30 pt-16">
            <div className="max-w-3xl">
              <p className="kalakriti-eyebrow">The making</p>

              <h2 className="kalakriti-heading mt-4 text-4xl md:text-5xl">
                Material meets
                <span className="text-[#7a3030]"> human skill.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#75665b] md:text-base">
                The character of every craft emerges from its materials,
                tools, techniques and the hands that know how to use them.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {craft.materials && craft.materials.length > 0 && (
                <div className="border border-[#b08d57]/50 bg-[#fffaf0] p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d57]">
                    Materials
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#641f20]">
                    From nature to craft
                  </h3>

                  <div className="mt-7 space-y-3">
                    {craft.materials.map((material) => (
                      <div
                        key={material}
                        className="flex items-center gap-3 border-b border-[#b08d57]/20 pb-3 text-sm text-[#75665b]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                        {material}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {craft.techniques && craft.techniques.length > 0 && (
                <div className="border border-[#b08d57]/50 bg-[#fffaf0] p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d57]">
                    Techniques
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#641f20]">
                    Skill passed down
                  </h3>

                  <div className="mt-7 space-y-3">
                    {craft.techniques.map((technique) => (
                      <div
                        key={technique}
                        className="flex items-center gap-3 border-b border-[#b08d57]/20 pb-3 text-sm text-[#75665b]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                        {technique}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : null}

        <section className="mt-24 bg-[#641f20] px-7 py-16 text-center md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6aa4c]">
            Preserve · Discover · Celebrate
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight text-[#fffaf0] md:text-5xl">
            Bring a piece of India's craft heritage home.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#f4ead8]/75 md:text-base">
            Explore authentic handmade creations inspired by the traditions,
            techniques and communities behind this craft.
          </p>

          <Link
            href={`/shop?category=${encodeURIComponent(craftSlug)}`}
            className="mt-9 inline-flex items-center gap-3 bg-[#d6aa4c] px-7 py-3.5 text-sm font-bold text-[#641f20] transition hover:bg-[#e3c373]"
          >
            <ShoppingBag size={18} />
            Explore Crafts
          </Link>
        </section>

        <div className="mt-10 border-t border-[#b08d57]/25 pt-8">
          <Link
            href="/craft-heritage"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#641f20]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Craft Heritage
          </Link>
        </div>
      </div>
    </main>
  );
}