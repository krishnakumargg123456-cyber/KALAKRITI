"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

type StateInfo = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  crafts: string[];
};

const states: StateInfo[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Where Colour Meets Craft",
    description:
      "A vibrant world of blue pottery, block printing, miniature art and traditional handicrafts.",
    crafts: ["Blue Pottery", "Block Printing", "Miniature Painting"],
  },
  {
    slug: "bihar",
    name: "Bihar",
    tagline: "Stories Painted by Hand",
    description:
      "Home to Madhubani painting and beautiful traditions shaped by nature, mythology and community.",
    crafts: ["Madhubani Painting", "Sujuni", "Sikki Craft"],
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    tagline: "A Legacy Woven in Silk",
    description:
      "A rich craft landscape of Banarasi weaving, Chikankari, brass work and traditional woodcraft.",
    crafts: ["Banarasi", "Chikankari", "Brass Craft"],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    tagline: "Threads of Tradition",
    description:
      "Discover colourful embroidery, Ajrakh printing, Bandhani and crafts rooted in community life.",
    crafts: ["Kutch Embroidery", "Ajrakh", "Bandhani"],
  },
  {
    slug: "maharashtra",
    name: "Maharashtra",
    tagline: "Folk Stories in Every Line",
    description:
      "Warli painting and Paithani weaving preserve stories, landscapes and traditions through craft.",
    crafts: ["Warli Painting", "Paithani", "Folk Art"],
  },
  {
    slug: "west-bengal",
    name: "West Bengal",
    tagline: "Crafted Between Earth and Water",
    description:
      "Terracotta, Kantha, Dokra and textile traditions reflect Bengal&apos;s distinctive artistic heritage.",
    crafts: ["Terracotta", "Kantha", "Dokra"],
  },
  {
    slug: "punjab",
    name: "Punjab",
    tagline: "A Heritage of Threads",
    description:
      "Colourful Phulkari embroidery and traditional handmade crafts carry Punjab&apos;s visual identity.",
    crafts: ["Phulkari", "Punjabi Jutti", "Durrie"],
  },
  {
    slug: "chhattisgarh",
    name: "Chhattisgarh",
    tagline: "Ancient Craft, Living Tradition",
    description:
      "Tribal communities preserve remarkable Dokra, bell-metal, bamboo and woodcraft traditions.",
    crafts: ["Dokra", "Bell Metal", "Bamboo Craft"],
  },
  {
    slug: "odisha",
    name: "Odisha",
    tagline: "Sacred Art, Living Heritage",
    description:
      "Pattachitra, appliquÃ© and stone traditions connect everyday craftsmanship with Odisha&apos;s cultural heritage.",
    crafts: ["Pattachitra", "AppliquÃ©", "Stone Craft"],
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    tagline: "Crafted Through Generations",
    description:
      "From Channapatna toys to Mysore painting, Karnataka&apos;s crafts combine colour, skill and tradition.",
    crafts: ["Channapatna Toys", "Mysore Painting", "Sandalwood Craft"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "Nature Woven Into Craft",
    description:
      "Wood carving, coir, mural painting and traditional textiles reflect Kerala&apos;s close relationship with nature.",
    crafts: ["Coir Craft", "Mural Painting", "Wood Carving"],
  },
  {
    slug: "assam",
    name: "Assam",
    tagline: "Woven With the Spirit of the Northeast",
    description:
      "Silk weaving, bamboo craft and traditional textiles form an important part of Assam&apos;s cultural identity.",
    crafts: ["Muga Silk", "Bamboo Craft", "Handloom"],
  },
];

const featuredStates = states.slice(0, 6);

export default function StatesPage() {
  const [query, setQuery] = useState("");

  const filteredStates = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return states;
    }

    return states.filter((state) => {
      const searchable = [
        state.name,
        state.tagline,
        state.description,
        ...state.crafts,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="font-semibold text-[#4a211c]">
              Craft Regions
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-2 text-[#e5c98b]">
              <MapPin className="h-4 w-4" />

              <span className="text-xs font-bold uppercase tracking-[0.3em]">
                India&apos;s Craft Map
              </span>
            </div>

            <h1 className="mt-4 font-serif text-5xl font-semibold text-[#fff8eb] sm:text-6xl">
              Craft Regions of India
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Travel across India through its living craft traditions. Discover
              the regions, techniques and artisan communities behind the
              handmade pieces we bring to you.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 flex max-w-xl items-center rounded-xl border border-[#e5c98b]/40 bg-[#fff8eb] px-4">
              <Search className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a state or craft..."
                className="h-13 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#4a211c] outline-none placeholder:text-[#80665d]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Featured regions */}
        {!query && (
          <section>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
                  Start Exploring
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
                  Featured Craft Regions
                </h2>
              </div>

              <span className="text-sm text-[#80665d]">
                {states.length} regions to discover
              </span>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredStates.map((state, index) => (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_15px_35px_rgba(67,35,25,0.08)]"
                >
                  <div className="absolute right-5 top-4 font-serif text-6xl text-[#b08a4a]/15">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b08a4a]/40 bg-[#efe4ce]">
                      <MapPin className="h-4 w-4 text-[#8b1e2d]" />
                    </div>

                    <h3 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c] group-hover:text-[#8b1e2d]">
                      {state.name}
                    </h3>

                    <p className="mt-1 font-serif text-lg text-[#8b1e2d]">
                      {state.tagline}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-[#6d5149]">
                      {state.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {state.crafts.map((craft) => (
                        <span
                          key={craft}
                          className="rounded-full border border-[#b08a4a]/30 bg-[#f7f0df] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#65443c]"
                        >
                          {craft}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                      Explore {state.name}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All states */}
        <section className={query ? "" : "mt-16"}>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Explore the Map
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
              {query ? "Matching Regions" : "Every Region Has a Story"}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6d5149]">
              Choose a state to discover its traditional crafts and the
              communities preserving them.
            </p>
          </div>

          {filteredStates.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}`}
                  className="group rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5 transition hover:-translate-y-0.5 hover:border-[#8b1e2d]/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe4ce]">
                      <MapPin className="h-4 w-4 text-[#8b1e2d]" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-[#80665d] transition group-hover:translate-x-1 group-hover:text-[#8b1e2d]" />
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#4a211c] group-hover:text-[#8b1e2d]">
                    {state.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-[#8b1e2d]">
                    {state.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {state.crafts.map((craft) => (
                      <span
                        key={craft}
                        className="rounded-full bg-[#efe4ce] px-2.5 py-1 text-[9px] font-bold text-[#65443c]"
                      >
                        {craft}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
              <Search className="mx-auto h-9 w-9 text-[#8b1e2d]" />

              <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                No region found
              </h3>

              <p className="mt-2 text-sm text-[#6d5149]">
                Try searching for another state or traditional craft.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
              >
                View All Regions
              </button>
            </div>
          )}
        </section>

        {/* Heritage CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/70">
          <div className="grid gap-7 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                The Living Heritage
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c]">
                One country. Hundreds of craft traditions.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d5149]">
                KALAKRITI connects you with the people and traditions behind
                India&apos;s handmade heritage.
              </p>
            </div>

            <Link
              href="/artisans"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
            >
              Meet the Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}