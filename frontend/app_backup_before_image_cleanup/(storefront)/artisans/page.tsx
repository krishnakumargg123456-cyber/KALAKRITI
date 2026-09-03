"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

type Artisan = {
  id: number;
  slug: string;
  name: string;
  craft: string;
  state: string;
  region: string;
  years: number;
  story: string;
  image: string;
};

const artisans: Artisan[] = [
  {
    id: 1,
    slug: "sita-devi",
    name: "Sita Devi",
    craft: "Madhubani Painting",
    state: "Bihar",
    region: "Madhubani",
    years: 28,
    story:
      "A master painter carrying generations of Mithila storytelling through intricate natural motifs.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    slug: "mohan-kumar",
    name: "Mohan Kumar",
    craft: "Blue Pottery",
    state: "Rajasthan",
    region: "Jaipur",
    years: 22,
    story:
      "Mohan creates Jaipur's iconic blue pottery with traditional forms and carefully hand-painted details.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    slug: "arvind-weavers",
    name: "Arvind Weavers",
    craft: "Banarasi Weaving",
    state: "Uttar Pradesh",
    region: "Varanasi",
    years: 35,
    story:
      "A family weaving tradition devoted to intricate silk textiles and the heritage of Banaras.",
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    slug: "meera-ben",
    name: "Meera Ben",
    craft: "Kutchi Embroidery",
    state: "Gujarat",
    region: "Kutch",
    years: 19,
    story:
      "Meera transforms vibrant threads, mirrors and traditional patterns into contemporary everyday pieces.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    slug: "savita-pawar",
    name: "Savita Pawar",
    craft: "Warli Art",
    state: "Maharashtra",
    region: "Palghar",
    years: 24,
    story:
      "Savita's work preserves the visual language of Warli storytelling through rhythm, people and nature.",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    slug: "bela-devi",
    name: "Bela Devi",
    craft: "Dokra Metal Craft",
    state: "Chhattisgarh",
    region: "Bastar",
    years: 31,
    story:
      "A traditional metal craft practitioner creating distinctive lost-wax sculptures inspired by tribal life.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    slug: "gurmeet-kaur",
    name: "Gurmeet Kaur",
    craft: "Phulkari Embroidery",
    state: "Punjab",
    region: "Patiala",
    years: 26,
    story:
      "Gurmeet keeps the joyful geometry and richly embroidered character of Punjab's Phulkari tradition alive.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    slug: "ravi-kumar",
    name: "Ravi Kumar",
    craft: "Channapatna Wood Craft",
    state: "Karnataka",
    region: "Channapatna",
    years: 18,
    story:
      "Ravi shapes sustainably sourced wood into colourful forms using techniques passed down through generations.",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=900&q=85",
  },
];

const states = [
  "All States",
  "Bihar",
  "Rajasthan",
  "Uttar Pradesh",
  "Gujarat",
  "Maharashtra",
  "Chhattisgarh",
  "Punjab",
  "Karnataka",
];

export default function ArtisansPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All States");
  const [favorites, setFavorites] = useState<number[]>([]);

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
      ]
        .join(" ")
        .toLowerCase();

      return matchesState && (!search || searchable.includes(search));
    });
  }, [query, state]);

  const toggleFavorite = (id: number) => {
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
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
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
              value="500+"
              label="Artisan families"
            />
            <HeroStat
              value="28"
              label="Craft traditions"
            />
            <HeroStat
              value="18"
              label="States represented"
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
                <option key={item}>{item}</option>
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

        {/* Artisan grid */}
        {filteredArtisans.length > 0 ? (
          <section className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtisans.map((artisan) => {
              const favorite = favorites.includes(artisan.id);

              return (
                <article
                  key={artisan.id}
                  className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition duration-300 hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_16px_35px_rgba(67,35,25,0.08)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#efe4ce]">
                    <Link href={`/artisans/${artisan.slug}`}>
                      <img
                        src={artisan.image}
                        alt={`${artisan.name} — ${artisan.craft}`}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
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
                    <Link href={`/artisans/${artisan.slug}`}>
                      <h3 className="font-serif text-2xl font-semibold text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {artisan.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#80665d]">
                      <MapPin className="h-3.5 w-3.5 text-[#8b1e2d]" />
                      {artisan.region}, {artisan.state}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[#b08a4a]" />

                      <span className="text-xs font-semibold text-[#65443c]">
                        {artisan.years} years of craft
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-xs leading-5 text-[#80665d]">
                      {artisan.story}
                    </p>

                    <Link
                      href={`/artisans/${artisan.slug}`}
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
        ) : (
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