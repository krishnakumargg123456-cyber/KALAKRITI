/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type Craft = {
  slug: string;
  name: string;
  region: string;
  state: string;
  category: string;
  description: string;
  image: string;
};

const crafts: Craft[] = [
  {
    slug: "madhubani",
    name: "Madhubani Painting",
    region: "Mithila",
    state: "Bihar",
    category: "Painting",
    description:
      "Discover the intricate lines, vivid colours, and storytelling traditions of Mithila's celebrated painting heritage.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "blue-pottery",
    name: "Blue Pottery",
    region: "Jaipur",
    state: "Rajasthan",
    category: "Pottery",
    description:
      "Explore Jaipur's distinctive blue-and-white decorative pottery and the techniques passed down through generations.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "block-printing",
    name: "Hand Block Printing",
    region: "Jaipur & Bagru",
    state: "Rajasthan",
    category: "Textile",
    description:
      "Learn how carved wooden blocks, carefully prepared colours, and skilled hands transform plain fabric into patterned textiles.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "banarasi-weaving",
    name: "Banarasi Weaving",
    region: "Varanasi",
    state: "Uttar Pradesh",
    category: "Textile",
    description:
      "Step into the world of Banarasi textiles, where intricate weaving creates luxurious patterns inspired by India's rich visual heritage.",
    image:
      "https://images.unsplash.com/photo-1610189012906-4c3bde2f0b5d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "dokra",
    name: "Dokra Metal Craft",
    region: "Central & Eastern India",
    state: "Chhattisgarh",
    category: "Metal Craft",
    description:
      "Understand the ancient lost-wax casting tradition used to create expressive metal figures and objects.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "rajasthani-decorative-craft",
    name: "Rajasthani Decorative Craft",
    region: "Rajasthan",
    state: "Rajasthan",
    category: "Decor",
    description:
      "Explore the colours, motifs, materials, and decorative traditions that make Rajasthan's craft heritage so distinctive.",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=85",
  },
];

const categories = [
  "All",
  "Painting",
  "Pottery",
  "Textile",
  "Metal Craft",
  "Decor",
];

export default function LearnPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCrafts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return crafts.filter((craft) => {
      const matchesCategory =
        category === "All" || craft.category === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        craft.name.toLowerCase().includes(normalizedQuery) ||
        craft.region.toLowerCase().includes(normalizedQuery) ||
        craft.state.toLowerCase().includes(normalizedQuery) ||
        craft.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,30,45,0.08),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(176,138,74,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto flex items-center justify-center gap-3 text-[#8b1e2d]">
            <span className="h-px w-12 bg-[#b08a4a]" />
            <BookOpen className="h-5 w-5" />
            <span className="h-px w-12 bg-[#b08a4a]" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            The KALAKRITI Learning Library
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
            Discover the Stories
            <span className="block italic text-[#8b1e2d]">
              Behind Indian Craft
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6d5149] sm:text-lg">
            Learn about India's traditional crafts, the regions where they
            evolved, the materials they use, and the artisans who keep their
            knowledge alive.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl items-center rounded-xl border border-[#b08a4a]/40 bg-[#fbf6e9] px-4 shadow-[0_8px_25px_rgba(67,35,25,0.05)]">
            <Search className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search crafts, regions, or techniques..."
              aria-label="Search the craft library"
              className="h-14 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#4a211c] outline-none placeholder:text-[#80665d]"
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 shadow-[0_8px_25px_rgba(67,35,25,0.04)]">
            <Compass className="h-6 w-6 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              Explore by Region
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d5149]">
              Discover how India's landscapes and communities have shaped
              distinctive craft traditions.
            </p>
          </div>

          <div className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 shadow-[0_8px_25px_rgba(67,35,25,0.04)]">
            <Sparkles className="h-6 w-6 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              Understand Techniques
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d5149]">
              Go beyond the finished object and learn about the materials,
              tools, patterns, and processes behind each craft.
            </p>
          </div>

          <div className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 shadow-[0_8px_25px_rgba(67,35,25,0.04)]">
            <Users className="h-6 w-6 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              Meet the Communities
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d5149]">
              Learn about the people whose knowledge, practice, and creativity
              keep India's craft heritage alive.
            </p>
          </div>
        </div>
      </section>

      {/* Craft Library */}
      <section className="border-y border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
                Craft Library
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
                Learn the Craft
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6d5149]">
                Choose a tradition to explore its history, materials, making
                process, and cultural identity.
              </p>
            </div>

            <p className="text-sm font-medium text-[#80665d]">
              {filteredCrafts.length}{" "}
              {filteredCrafts.length === 1 ? "tradition" : "traditions"}
            </p>
          </div>

          {/* Filters */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "bg-[#8b1e2d] text-[#fff8eb] shadow-sm"
                    : "border border-[#b08a4a]/30 bg-[#fbf6e9] text-[#65443c] hover:border-[#8b1e2d]/40 hover:text-[#8b1e2d]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Cards */}
          {filteredCrafts.length > 0 ? (
            <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredCrafts.map((craft) => (
                <article
                  key={craft.slug}
                  className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(67,35,25,0.1)]"
                >
                  <Link
                    href={`/learn/${craft.slug}`}
                    aria-label={`Explore ${craft.name}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={craft.image}
                        alt={craft.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-[#f7f0df]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                        {craft.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#80665d]">
                        <MapPin className="h-3.5 w-3.5 text-[#8b1e2d]" />
                        {craft.region}, {craft.state}
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {craft.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                        {craft.description}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#8b1e2d]">
                        Explore this craft
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-[#8b1e2d]" />

              <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                No craft found
              </h3>

              <p className="mt-2 text-sm text-[#6d5149]">
                Try another craft name, region, or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-5 text-sm font-bold text-[#8b1e2d] transition hover:text-[#6a1421]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Heritage CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/40 bg-[#8b1e2d] px-7 py-12 text-center sm:px-12">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border-[28px] border-[#e5c98b]/10" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-[28px] border-[#e5c98b]/10" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              Keep Exploring
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
              From Learning to Living the Tradition
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Discover authentic handmade pieces inspired by the traditions
              you have explored.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e5c98b] px-7 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
              >
                Explore the Shop
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/artisans"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#e5c98b]/50 px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-white/10"
              >
                Meet the Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Quote */}
      <section className="border-t border-[#b08a4a]/30 bg-[#efe4ce]">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#b08a4a]" />
            <Sparkles className="h-4 w-4 text-[#8b1e2d]" />
            <span className="h-px w-16 bg-[#b08a4a]" />
          </div>

          <p className="mt-5 font-serif text-xl italic leading-8 text-[#4a211c] sm:text-2xl">
            "To understand a craft is to understand the hands, place, and
            memory that shaped it."
          </p>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
            KALAKRITI Learning Library
          </p>
        </div>
      </section>
    </main>
  );
}

