"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import { getArtisans } from "@/lib/api/artisans";

type RawArtisan = Record<string, unknown>;

type Artisan = {
  id: string;
  name: string;
  craft: string;
  state: string;
  region: string;
  years: number | null;
  story: string;
  image: string | null;
};

function stringValue(
  item: RawArtisan,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function numberValue(
  item: RawArtisan,
  keys: string[],
): number | null {
  for (const key of keys) {
    const value = item[key];

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

  return null;
}

function normalizeArtisans(data: unknown): Artisan[] {
  let items: unknown[] = [];

  if (Array.isArray(data)) {
    items = data;
  } else if (typeof data === "object" && data !== null) {
    const value = data as {
      items?: unknown;
      data?: unknown;
      results?: unknown;
    };

    if (Array.isArray(value.items)) {
      items = value.items;
    } else if (Array.isArray(value.data)) {
      items = value.data;
    } else if (Array.isArray(value.results)) {
      items = value.results;
    }
  }

  return items
    .filter(
      (item): item is RawArtisan =>
        typeof item === "object" && item !== null,
    )
    .map((item, index) => {
      const id = stringValue(
        item,
        ["id", "uuid", "artisan_id"],
        `artisan-${index}`,
      );

      const name = stringValue(
        item,
        ["name", "display_name", "full_name"],
        "KALAKRITI Artisan",
      );

      return {
        id,
        name,
        craft: stringValue(
          item,
          [
            "craft",
            "craft_name",
            "specialization",
            "craft_type",
            "speciality",
          ],
          "Traditional Craft",
        ),
        state: stringValue(
          item,
          ["state", "state_name", "stateName"],
          "India",
        ),
        region: stringValue(
          item,
          [
            "region",
            "city",
            "district",
            "location",
            "village",
          ],
          "India",
        ),
        years: numberValue(
          item,
          [
            "years",
            "years_of_experience",
            "experience_years",
            "experience",
          ],
        ),
        story: stringValue(
          item,
          ["story", "bio", "description", "about"],
          "Discover the artisan's craft journey and traditional practice through KALAKRITI.",
        ),
        image:
          stringValue(
            item,
            [
              "image_url",
              "profile_image",
              "profile_image_url",
              "image",
              "photo_url",
              "avatar_url",
            ],
          ) || null,
      };
    });
}

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All States");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadArtisans() {
      try {
        setLoading(true);
        setError("");

        const response = await getArtisans();

        if (!mounted) {
          return;
        }

        setArtisans(normalizeArtisans(response));
      } catch {
        if (!mounted) {
          return;
        }

        setError(
          "We could not load the artisan directory right now. Please try again.",
        );
        setArtisans([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadArtisans();

    return () => {
      mounted = false;
    };
  }, []);

  const states = useMemo(() => {
    const uniqueStates = Array.from(
      new Set(
        artisans
          .map((artisan) => artisan.state.trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return ["All States", ...uniqueStates];
  }, [artisans]);

  const craftCount = useMemo(() => {
    return new Set(
      artisans
        .map((artisan) => artisan.craft.trim())
        .filter(Boolean),
    ).size;
  }, [artisans]);

  const stateCount = useMemo(() => {
    return new Set(
      artisans
        .map((artisan) => artisan.state.trim())
        .filter(Boolean),
    ).size;
  }, [artisans]);

  const filteredArtisans = useMemo(() => {
    const search = query.trim().toLowerCase();

    return artisans.filter((artisan) => {
      const matchesState =
        state === "All States" || artisan.state === state;

      const searchable = [
        artisan.name,
        artisan.craft,
        artisan.state,
        artisan.region,
        artisan.story,
      ]
        .join(" ")
        .toLowerCase();

      return matchesState && (!search || searchable.includes(search));
    });
  }, [artisans, query, state]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border-[22px] border-[#e5c98b]/10" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full border-[35px] border-[#e5c98b]/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              The Hands Behind the Heritage
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#fff8eb] sm:text-6xl">
              Meet the Artisans
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Discover the people, families and communities who keep India&apos;s
              living craft traditions alive through their hands.
            </p>
          </div>

          <div className="mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            <HeroStat
              value={loading ? "—" : String(artisans.length)}
              label="Artisan profiles"
            />

            <HeroStat
              value={loading ? "—" : String(craftCount)}
              label="Craft traditions"
            />

            <HeroStat
              value={loading ? "—" : String(stateCount)}
              label="Regions represented"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Intro */}
        <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Craft is personal
            </p>

            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#4a211c] sm:text-4xl">
              Every piece begins with a person, a place and a tradition.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6d5149]">
              KALAKRITI works to make the maker visible. Explore the stories of
              artisans across India and discover the techniques, landscapes and
              family traditions that shape their work.
            </p>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8b1e2d] text-[#fff8eb]">
                <Users className="h-5 w-5" />
              </span>

              <div>
                <p className="font-serif text-xl font-semibold text-[#4a211c]">
                  Meet the maker
                </p>

                <p className="mt-1 text-xs text-[#80665d]">
                  Learn before you buy.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-[#6d5149]">
              Each artisan profile connects you with their craft journey,
              region and collection.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-12 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex h-12 flex-1 items-center rounded-xl border border-[#b08a4a]/30 bg-[#fffaf0] px-4">
              <Search className="h-5 w-5 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search artisan, craft or region..."
                className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#80665d]"
              />
            </div>

            <select
              value={state}
              onChange={(event) => setState(event.target.value)}
              className="h-12 rounded-xl border border-[#b08a4a]/30 bg-[#fffaf0] px-4 text-sm font-semibold text-[#4a211c] outline-none focus:border-[#8b1e2d] md:w-60"
            >
              {states.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Result heading */}
        <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Artisan Directory
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
              Stories from across India
            </h2>
          </div>

          <p className="text-sm text-[#80665d]">
            <span className="font-bold text-[#4a211c]">
              {filteredArtisans.length}
            </span>{" "}
            artisan profiles
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <section className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]"
              >
                <div className="aspect-[4/5] animate-pulse bg-[#eadfc9]" />

                <div className="space-y-3 p-5">
                  <div className="h-7 w-2/3 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-12 animate-pulse rounded bg-[#eadfc9]" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Error */}
        {!loading && error && (
          <section className="mt-7 rounded-2xl border border-[#8b1e2d]/20 bg-[#fbf6e9] px-6 py-20 text-center">
            <Users className="mx-auto h-10 w-10 text-[#8b1e2d]" />

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              Artisan directory unavailable
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#80665d]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
            >
              Try Again
            </button>
          </section>
        )}

        {/* Artisan grid */}
        {!loading && !error && filteredArtisans.length > 0 && (
          <section className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtisans.map((artisan) => {
              const favorite = favorites.includes(artisan.id);

              return (
                <article
                  key={artisan.id}
                  className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition duration-300 hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_16px_35px_rgba(67,35,25,0.08)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#efe4ce]">
                    <Link href={`/artisans/${artisan.id}`}>
                      {artisan.image ? (
                        <img
                          src={artisan.image}
                          alt={`${artisan.name} — ${artisan.craft}`}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#eadfc9]">
                          <div className="text-center">
                            <Users className="mx-auto h-12 w-12 text-[#8b1e2d]/60" />
                            <p className="mt-3 px-6 font-serif text-lg text-[#6d5149]">
                              {artisan.name}
                            </p>
                          </div>
                        </div>
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(artisan.id)}
                      aria-label={
                        favorite
                          ? `Remove ${artisan.name} from favorites`
                          : `Save ${artisan.name}`
                      }
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
                        favorite
                          ? "bg-[#8b1e2d] text-[#fff8eb]"
                          : "bg-[#fff8eb]/95 text-[#8b1e2d] hover:bg-[#8b1e2d] hover:text-[#fff8eb]"
                      }`}
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={favorite ? "currentColor" : "none"}
                      />
                    </button>

                    <span className="absolute bottom-4 left-4 rounded-full bg-[#fff8eb]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                      {artisan.craft}
                    </span>
                  </div>

                  <div className="p-5">
                    <Link href={`/artisans/${artisan.id}`}>
                      <h3 className="font-serif text-2xl font-semibold text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {artisan.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#80665d]">
                      <MapPin className="h-3.5 w-3.5 text-[#8b1e2d]" />
                      <span>
                        {artisan.region}
                        {artisan.state !== "India"
                          ? `, ${artisan.state}`
                          : ""}
                      </span>
                    </div>

                    {artisan.years !== null && (
                      <div className="mt-3 flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#b08a4a]" />

                        <span className="text-xs font-semibold text-[#65443c]">
                          {artisan.years} years of craft
                        </span>
                      </div>
                    )}

                    <p className="mt-4 line-clamp-3 text-xs leading-5 text-[#80665d]">
                      {artisan.story}
                    </p>

                    <Link
                      href={`/artisans/${artisan.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#8b1e2d]"
                    >
                      Read their story
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Empty */}
        {!loading && !error && filteredArtisans.length === 0 && (
          <section className="mt-7 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
            <Users className="mx-auto h-10 w-10 text-[#8b1e2d]" />

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              No artisans found
            </h3>

            <p className="mt-2 text-sm text-[#80665d]">
              Try another name, craft or region.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setState("All States");
              }}
              className="mt-6 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb]"
            >
              View All Artisans
            </button>
          </section>
        )}

        {/* Artisan CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl bg-[#8b1e2d]">
          <div className="grid gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Discover the tradition
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb]">
                The craft is only half the story.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f1dfc9]">
                Explore the traditions, techniques and communities behind the
                work you love.
              </p>
            </div>

            <Link
              href="/traditions"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Explore Traditions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5c98b]/25 bg-[#fff8eb]/10 p-5">
      <p className="font-serif text-3xl font-bold text-[#e5c98b]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#f1dfc9]">{label}</p>
    </div>
  );
}
