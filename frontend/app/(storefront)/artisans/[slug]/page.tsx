"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Users,
  ShoppingBag,
} from "lucide-react";

import { getArtisan } from "@/lib/api/artisans";
import { productsApi, type Product } from "@/lib/api/products";

type ArtisanPageProps = {
  params: {
    slug: string;
  };
};

type RawArtisan = Record<string, unknown>;

type Artisan = {
  id: string;
  name: string;
  craft: string;
  state: string;
  region: string;
  years: number;
  community: string;
  image: string;
  story: string[];
  quote: string;
  techniques: string[];
};

function firstString(
  source: RawArtisan,
  keys: string[],
  fallback = ""
): string {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function firstNumber(
  source: RawArtisan,
  keys: string[],
  fallback = 0
): number {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return fallback;
}

function stringArray(
  source: RawArtisan,
  keys: string[]
): string[] {
  for (const key of keys) {
    const value = source[key];

    if (Array.isArray(value)) {
      const result = value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);

      if (result.length) {
        return result;
      }
    }

    if (typeof value === "string" && value.trim()) {
      return value
        .split(/\n|•|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function normalizeArtisan(value: unknown): Artisan | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const source = value as RawArtisan;

  const id = firstString(
    source,
    ["id", "uuid", "artisan_id"]
  );

  if (!id) {
    return null;
  }

  const name = firstString(
    source,
    ["name", "display_name", "full_name"],
    "KALAKRITI Artisan"
  );

  const craft = firstString(
    source,
    [
      "craft",
      "craft_name",
      "specialization",
      "craft_type",
      "speciality",
    ],
    "Traditional Indian Craft"
  );

  const state = firstString(
    source,
    ["state", "state_name"],
    "India"
  );

  const region = firstString(
    source,
    [
      "region",
      "city",
      "district",
      "location",
      "village",
    ],
    state
  );

  const years = firstNumber(
    source,
    [
      "years",
      "years_of_experience",
      "experience_years",
      "experience",
    ]
  );

  const image = firstString(
    source,
    [
      "image_url",
      "profile_image",
      "profile_image_url",
      "image",
      "photo_url",
      "avatar_url",
    ]
  );

  const story = stringArray(
    source,
    ["story", "bio", "description", "about"]
  );

  const quote = firstString(
    source,
    ["quote", "artisan_quote", "testimonial"]
  );

  const techniques = stringArray(
    source,
    ["techniques", "skills", "specialties", "specialities"]
  );

  const community = firstString(
    source,
    [
      "community",
      "artisan_community",
      "community_name",
      "village",
    ]
  );

  return {
    id: String(id),
    name,
    craft,
    state,
    region,
    years,
    community,
    image,
    story,
    quote,
    techniques,
  };
}

function unwrapArtisan(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  const source = value as Record<string, unknown>;

  if (source.data && typeof source.data === "object") {
    return source.data;
  }

  if (source.item && typeof source.item === "object") {
    return source.item;
  }

  if (source.artisan && typeof source.artisan === "object") {
    return source.artisan;
  }

  return value;
}

function productImage(product: Product): string {
  const primary = product.images?.find(
    (image) => image.is_primary
  );

  return (
    primary?.image_url ??
    product.images?.[0]?.image_url ??
    ""
  );
}

function formatPrice(value: string | number): string {
  const amount =
    typeof value === "number"
      ? value
      : Number(value);

  if (!Number.isFinite(amount)) {
    return "Price on request";
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function ArtisanDetailPage({
  params,
}: ArtisanPageProps) {
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadArtisan() {
      setLoading(true);
      setError("");

      try {
        const response = await getArtisan(params.slug);
        const normalized = normalizeArtisan(
          unwrapArtisan(response)
        );

        if (!active) {
          return;
        }

        if (!normalized) {
          setError("Artisan profile could not be found.");
          setArtisan(null);
          return;
        }

        setArtisan(normalized);
      } catch {
        if (!active) {
          return;
        }

        setArtisan(null);
        setError(
          "We could not load this artisan profile. Please try again."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadArtisan();

    return () => {
      active = false;
    };
  }, [params.slug]);

  useEffect(() => {
    if (!artisan?.id) {
      setProducts([]);
      setProductsLoading(false);
      return;
    }

    const artisanId = artisan.id;
    let active = true;

    async function loadProducts() {
      setProductsLoading(true);

      try {
        const response = await productsApi.list({
          artisan_id: artisanId,
          skip: 0,
          limit: 100,
        });

        if (!active) {
          return;
        }

        const items = Array.isArray(response.data)
          ? response.data
          : [];

        setProducts(
          items.filter(
            (product) => product.is_active !== false
          )
        );
      } catch {
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [artisan?.id]);

  const story = useMemo(() => {
    if (!artisan) {
      return [];
    }

    if (artisan.story.length) {
      return artisan.story;
    }

    return [
      `${artisan.name} carries forward the knowledge and visual language of ${artisan.craft}. Each piece reflects patience, hand skill and a connection to the place where the craft has evolved.`,
      `Through KALAKRITI, this traditional practice reaches a wider audience while keeping the artisan and their cultural knowledge at the heart of the work.`,
    ];
  }, [artisan]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
        <section className="bg-[#8b1e2d]">
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
            <div className="h-5 w-36 animate-pulse rounded bg-[#e5c98b]/30" />

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="aspect-[4/5] animate-pulse rounded-3xl bg-[#6f1825]" />

              <div className="space-y-5 py-10">
                <div className="h-4 w-32 animate-pulse rounded bg-[#e5c98b]/30" />
                <div className="h-16 max-w-md animate-pulse rounded bg-[#6f1825]" />
                <div className="h-5 w-72 animate-pulse rounded bg-[#6f1825]" />
                <div className="h-20 max-w-xl animate-pulse rounded bg-[#6f1825]" />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f0df] px-6 text-[#3d1f1b]">
        <div className="max-w-lg rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-10 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
            Artisan Profile
          </p>

          <h1 className="mt-4 font-serif text-4xl font-semibold text-[#4a211c]">
            {error || "Artisan not found"}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#6d5149]">
            The artisan profile may no longer be available or the
            requested profile could not be loaded.
          </p>

          <Link
            href="/artisans"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Artisans
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#f1dfc9] transition hover:text-[#e5c98b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Artisans
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-[#e5c98b]/25">
              {artisan.image ? (
                <img
                  src={artisan.image}
                  alt={`${artisan.name} — ${artisan.craft}`}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#6f1825]">
                  <Sparkles className="h-14 w-14 text-[#e5c98b]/60" />
                </div>
              )}

              <div className="absolute bottom-5 left-5 rounded-xl bg-[#fff8eb]/95 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Craft
                </p>

                <p className="mt-1 font-serif text-lg font-semibold text-[#4a211c]">
                  {artisan.craft}
                </p>
              </div>
            </div>

            <div className="pb-5 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
                Artisan Story
              </p>

              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#fff8eb] sm:text-6xl">
                {artisan.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#f1dfc9]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#e5c98b]" />
                  {artisan.region}, {artisan.state}
                </span>

                {artisan.years > 0 && (
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#e5c98b]" />
                    {artisan.years} years of craft
                  </span>
                )}
              </div>

              <p className="mt-7 max-w-xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
                A story of skill, patience and inherited knowledge
                from the heart of {artisan.region}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#collection"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
                >
                  Shop Their Craft
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSaved((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#e5c98b]/40 px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#fff8eb]/10"
                  aria-pressed={saved}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      saved ? "fill-current" : ""
                    }`}
                  />
                  {saved ? "Saved Artisan" : "Save Artisan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={<Sparkles className="h-5 w-5" />}
            value={
              artisan.years > 0
                ? `${artisan.years} Years`
                : "Traditional"
            }
            label="Craft experience"
          />

          <Stat
            icon={<MapPin className="h-5 w-5" />}
            value={artisan.region}
            label={artisan.state}
          />

          <Stat
            icon={<Users className="h-5 w-5" />}
            value={
              artisan.community || "Artisan Community"
            }
            label="Craft community"
          />

          <Stat
            icon={<Award className="h-5 w-5" />}
            value={artisan.craft}
            label="Craft tradition"
          />
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              The Journey
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
              A tradition carried by hand
            </h2>

            <div className="mt-7 space-y-5">
              {story.map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className="text-sm leading-7 text-[#6d5149]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7">
            <Quote className="h-8 w-8 text-[#8b1e2d]" />

            {artisan.quote ? (
              <blockquote className="mt-5 font-serif text-2xl font-semibold leading-9 text-[#4a211c]">
                “{artisan.quote}”
              </blockquote>
            ) : (
              <blockquote className="mt-5 font-serif text-2xl font-semibold leading-9 text-[#4a211c]">
                Every handmade piece carries the patience,
                knowledge and heritage of its maker.
              </blockquote>
            )}

            <div className="mt-6 h-px bg-[#b08a4a]/30" />

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              {artisan.name}
            </p>

            <p className="mt-1 text-sm text-[#6d5149]">
              {artisan.craft}
            </p>
          </aside>
        </section>

        {artisan.techniques.length > 0 && (
          <section className="mt-16 border-t border-[#b08a4a]/25 pt-12">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Craft Techniques
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c]">
                Knowledge shaped through practice
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {artisan.techniques.map((technique) => (
                <div
                  key={technique}
                  className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5"
                >
                  <Sparkles className="h-5 w-5 text-[#8b1e2d]" />

                  <p className="mt-4 text-sm font-semibold text-[#4a211c]">
                    {technique}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          id="collection"
          className="mt-16 border-t border-[#b08a4a]/25 pt-12"
        >
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Artisan Collection
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
                Made by {artisan.name}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6d5149]">
                Explore products currently connected to this artisan
                in the KALAKRITI marketplace.
              </p>
            </div>

            {products.length > 0 && (
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                <ShoppingBag className="h-4 w-4" />
                {products.length}{" "}
                {products.length === 1 ? "piece" : "pieces"}
              </span>
            )}
          </div>

          {productsLoading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-[#b08a4a]/25 bg-[#fbf6e9]"
                >
                  <div className="aspect-[4/5] animate-pulse bg-[#eadfc8]" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-[#eadfc8]" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-[#eadfc8]" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const image = productImage(product);

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#eadfc8]">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Sparkles className="h-10 w-10 text-[#8b1e2d]/40" />
                        </div>
                      )}

                      <div className="absolute left-4 top-4 rounded-full bg-[#fff8eb]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                        Handmade
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                        {product.craft_region ||
                          artisan.region}
                      </p>

                      <h3 className="mt-2 font-serif text-xl font-semibold text-[#4a211c]">
                        {product.name}
                      </h3>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-base font-bold text-[#8b1e2d]">
                          {formatPrice(product.price)}
                        </p>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6d5149] transition group-hover:text-[#8b1e2d]">
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-12 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]/50" />

              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#4a211c]">
                Collection coming soon
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#6d5149]">
                Products from this artisan are not currently listed.
                Please explore the wider KALAKRITI collection.
              </p>

              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725]"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>

        <section className="mt-16 rounded-3xl border border-[#b08a4a]/30 bg-[#8b1e2d] px-7 py-10 text-center sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
            Preserve the Tradition
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
            Every purchase helps keep living craft traditions alive.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#f1dfc9]">
            Discover handmade work created with knowledge passed
            from one generation to the next.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
          >
            Explore KALAKRITI
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b1e2d]/10 text-[#8b1e2d]">
        {icon}
      </div>

      <p className="mt-4 font-serif text-xl font-semibold text-[#4a211c]">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8b1e2d]">
        {label}
      </p>
    </div>
  );
}

