"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Palette,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Craft = {
  id: string | number;
  name: string;
  slug?: string;
  title?: string;
  description?: string | null;
  short_description?: string | null;
  image_url?: string | null;
  cover_image?: string | null;
  region?: string | null;
  state?: string | null;
  district?: string | null;
  origin?: string | null;
  category?: string | null;
};

function getImage(craft: Craft) {
  return craft.cover_image || craft.image_url || null;
}

function getLocation(craft: Craft) {
  return (
    craft.origin ||
    [craft.district, craft.state, craft.region]
      .filter(Boolean)
      .join(", ")
  );
}

export default function CraftHeritagePage() {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadCrafts() {
      try {
        setLoading(true);
        setError("");

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:8000/api/v1";

        const response = await fetch(
          `${baseUrl}/craft-heritage`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load craft heritage");
        }

        const data = await response.json();

        const items =
          data?.data?.items ||
          data?.data ||
          data?.items ||
          data ||
          [];

        setCrafts(Array.isArray(items) ? items : []);
      } catch (err) {
        console.error("Craft heritage error:", err);
        setError("Unable to load craft heritage right now.");
      } finally {
        setLoading(false);
      }
    }

    loadCrafts();
  }, []);

  const regions = useMemo(() => {
    const values = crafts
      .map((craft) => craft.region || craft.state)
      .filter(Boolean) as string[];

    return Array.from(new Set(values)).sort();
  }, [crafts]);

  const filteredCrafts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return crafts.filter((craft) => {
      const name =
        craft.name ||
        craft.title ||
        "";

      const location = getLocation(craft);

      const matchesSearch =
        !query ||
        name.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query) ||
        (craft.description || "")
          .toLowerCase()
          .includes(query);

      const craftRegion =
        craft.region ||
        craft.state ||
        "";

      const matchesRegion =
        region === "all" ||
        craftRegion === region;

      return matchesSearch && matchesRegion;
    });
  }, [crafts, search, region]);

  return (
    <main className="min-h-screen bg-cream">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-deep-maroon/10 bg-[#eee4d1]">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute left-10 top-10 text-[120px] text-deep-maroon">
            ✦
          </div>
          <div className="absolute right-10 top-20 text-[90px] text-deep-maroon">
            ❋
          </div>
          <div className="absolute bottom-0 left-1/3 text-[150px] text-deep-maroon">
            ◈
          </div>
        </div>

        <div className="kalakriti-container relative px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              India&apos;s Living Heritage
            </p>

            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-6xl">
              Craft Heritage
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brown md:text-lg">
              Discover the stories, traditions and handmade techniques
              that have shaped India&apos;s rich craft heritage for generations.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-xl border border-deep-maroon/15 bg-white/80 px-4 py-3 shadow-sm">
              <Search
                size={20}
                className="shrink-0 text-gold"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, regions or traditions..."
                className="w-full bg-transparent text-sm text-deep-maroon outline-none placeholder:text-brown/50"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-brown hover:text-deep-maroon"
                >
                  <X size={18} />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main */}
      <section className="kalakriti-container px-4 py-10 md:py-14">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-deep-maroon/10 pb-6 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Explore India
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-deep-maroon">
              Traditional Crafts
            </h2>

            {!loading && (
              <p className="mt-1 text-sm text-brown/65">
                {filteredCrafts.length} craft
                {filteredCrafts.length === 1 ? "" : "s"} found
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-deep-maroon/15 bg-white px-4 py-2.5 text-sm font-semibold text-deep-maroon md:hidden"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          <div
            className={`${
              showFilters ? "flex" : "hidden"
            } flex-col gap-3 md:flex md:flex-row`}
          >
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="rounded-lg border border-deep-maroon/15 bg-white px-4 py-2.5 text-sm text-deep-maroon outline-none focus:border-gold"
            >
              <option value="all">
                All Regions
              </option>

              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {(search || region !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setRegion("all");
                }}
                className="rounded-lg border border-deep-maroon/15 px-4 py-2.5 text-sm font-semibold text-deep-maroon hover:bg-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-deep-maroon/10 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-brown/10" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-brown/10" />
                  <div className="h-7 w-2/3 animate-pulse rounded bg-brown/10" />
                  <div className="h-12 w-full animate-pulse rounded bg-brown/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-deep-maroon/10 bg-white/70 p-12 text-center">
            <Palette
              size={42}
              className="mx-auto text-gold"
            />

            <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
              Heritage collection unavailable
            </h2>

            <p className="mt-3 text-brown">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-deep-maroon px-6 py-3 text-sm font-semibold text-cream"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredCrafts.length === 0 && (
            <div className="mt-10 rounded-2xl border border-deep-maroon/10 bg-white/70 px-6 py-16 text-center">
              <Palette
                size={48}
                className="mx-auto text-gold/70"
              />

              <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
                No crafts found
              </h2>

              <p className="mt-3 text-brown">
                Try another search or explore all regions.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setRegion("all");
                }}
                className="mt-6 rounded-lg border border-deep-maroon px-6 py-3 text-sm font-semibold text-deep-maroon"
              >
                View All Crafts
              </button>
            </div>
          )}

        {/* Grid */}
        {!loading &&
          !error &&
          filteredCrafts.length > 0 && (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {filteredCrafts.map((craft) => {
                const image = getImage(craft);
                const location = getLocation(craft);
                const name =
                  craft.name ||
                  craft.title ||
                  "Indian Craft";

                const description =
                  craft.short_description ||
                  craft.description ||
                  "Explore the history and traditions behind this beautiful Indian craft.";

                const href =
                  craft.slug
                    ? `/craft-heritage/${craft.slug}`
                    : `/craft-heritage/${craft.id}`;

                return (
                  <Link
                    key={craft.id}
                    href={href}
                    className="group overflow-hidden rounded-2xl border border-deep-maroon/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e9dfcd]">

                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Palette
                            size={60}
                            strokeWidth={1}
                            className="text-deep-maroon/25"
                          />
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

                      {craft.region && (
                        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-semibold text-deep-maroon shadow-sm">
                          {craft.region}
                        </span>
                      )}

                    </div>

                    {/* Content */}
                    <div className="p-6">

                      <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-gold">
                        <Palette size={13} />
                        Traditional Craft
                      </p>

                      <h3 className="mt-3 font-serif text-2xl font-bold text-deep-maroon transition group-hover:text-maroon">
                        {name}
                      </h3>

                      {location && (
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-brown/70">
                          <MapPin size={15} />
                          {location}
                        </p>
                      )}

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-brown">
                        {description}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-deep-maroon/10 pt-5">
                        <span className="text-sm font-semibold text-deep-maroon">
                          Discover the Story
                        </span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-deep-maroon/15 text-deep-maroon transition group-hover:bg-deep-maroon group-hover:text-cream">
                          <ArrowRight size={17} />
                        </span>
                      </div>

                    </div>
                  </Link>
                );
              })}

            </div>
          )}

      </section>

      {/* Heritage CTA */}
      <section className="border-t border-deep-maroon/10 bg-[#eee4d1]">
        <div className="kalakriti-container px-4 py-16 text-center md:py-20">

          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Preserve What Matters
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
            Every handmade tradition has a story worth keeping alive.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-brown">
            Explore India&apos;s craft traditions, meet the artisans behind
            them and bring authentic handmade creations into your home.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-deep-maroon px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-maroon"
          >
            Explore Handmade Collection
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </main>
  );
}
