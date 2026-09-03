"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type Tradition = {
  slug: string;
  name: string;
  region: string;
  category: string;
  description: string;
  image: string;
};

const traditions: Tradition[] = [
  {
    slug: "madhubani-painting",
    name: "Madhubani Painting",
    region: "Madhubani, Bihar",
    category: "Painting",
    description:
      "Bold lines, symbolic motifs and stories of nature, mythology and everyday life.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "blue-pottery",
    name: "Jaipur Blue Pottery",
    region: "Jaipur, Rajasthan",
    category: "Pottery",
    description:
      "Distinctive blue decoration and delicate motifs shaped through a unique pottery tradition.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "warli-painting",
    name: "Warli Painting",
    region: "Maharashtra",
    category: "Painting",
    description:
      "Everyday life, farming and celebration transformed into stories through simple geometric forms.",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "kutch-embroidery",
    name: "Kutch Embroidery",
    region: "Kutch, Gujarat",
    category: "Textile",
    description:
      "Vivid threads, mirrors and intricate stitches carrying the visual identity of artisan communities.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "banarasi-weaving",
    name: "Banarasi Weaving",
    region: "Varanasi, Uttar Pradesh",
    category: "Weaving",
    description:
      "Rich silk textiles featuring intricate zari work and motifs created on traditional handlooms.",
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "phulkari",
    name: "Phulkari",
    region: "Punjab",
    category: "Embroidery",
    description:
      "Colourful floral embroidery created through carefully arranged stitches across traditional textiles.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "pattachitra",
    name: "Pattachitra",
    region: "Odisha",
    category: "Painting",
    description:
      "Traditional cloth painting known for detailed lines, mythological narratives and decorative borders.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "dokra",
    name: "Dokra Metal Craft",
    region: "Bastar, Chhattisgarh",
    category: "Metal Craft",
    description:
      "Ancient lost-wax metal casting traditions transformed into expressive handmade objects.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "channapatna-toys",
    name: "Channapatna Toys",
    region: "Karnataka",
    category: "Wood Craft",
    description:
      "Colourful wooden toys shaped and finished by skilled artisans using traditional techniques.",
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "kantha",
    name: "Kantha",
    region: "West Bengal",
    category: "Embroidery",
    description:
      "Layered textiles brought to life with running stitches, storytelling motifs and careful handwork.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "ajrak",
    name: "Ajrakh",
    region: "Kutch, Gujarat",
    category: "Textile Printing",
    description:
      "A sophisticated resist-printing tradition combining geometric patterns with natural colours.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    slug: "paithani",
    name: "Paithani Weaving",
    region: "Maharashtra",
    category: "Weaving",
    description:
      "Fine silk weaving celebrated for luminous colours, distinctive borders and intricate motifs.",
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=1000&q=85",
  },
];

const categories = [
  "All",
  "Painting",
  "Pottery",
  "Textile",
  "Weaving",
  "Embroidery",
  "Metal Craft",
  "Wood Craft",
  "Textile Printing",
];

export default function TraditionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTraditions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return traditions.filter((tradition) => {
      const matchesCategory =
        category === "All" || tradition.category === category;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const searchable = [
        tradition.name,
        tradition.region,
        tradition.category,
        tradition.description,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [query, category]);

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
              Craft Traditions
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 text-[#e5c98b]">
              <Sparkles className="h-4 w-4" />

              <span className="text-xs font-bold uppercase tracking-[0.3em]">
                India&apos;s Living Heritage
              </span>

              <Sparkles className="h-4 w-4" />
            </div>

            <h1 className="mt-4 font-serif text-5xl font-semibold text-[#fff8eb] sm:text-6xl">
              Craft Traditions
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Explore the techniques, materials, stories and communities behind
              India&apos;s extraordinary handmade traditions.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 flex max-w-xl items-center rounded-xl border border-[#e5c98b]/40 bg-[#fff8eb] px-4">
              <Search className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a craft, region or tradition..."
                className="h-13 min-w-0 flex-1 bg-transparent px-3 text-sm text-[#4a211c] outline-none placeholder:text-[#80665d]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Intro */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
            Knowledge Passed Down
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
            Every tradition has a language of its own.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#6d5149]">
            Materials, tools, motifs and techniques change from one region to
            another. Together they form a living map of India&apos;s cultural
            heritage.
          </p>
        </section>

        {/* Category filter */}
        <section className="mt-10">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "border-[#8b1e2d] bg-[#8b1e2d] text-[#fff8eb]"
                      : "border-[#b08a4a]/35 bg-[#fbf6e9] text-[#65443c] hover:border-[#8b1e2d]/40 hover:text-[#8b1e2d]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>

        {/* Results */}
        <section className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[#80665d]">
              Showing{" "}
              <span className="font-bold text-[#4a211c]">
                {filteredTraditions.length}
              </span>{" "}
              traditions
            </p>

            {(query || category !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="text-xs font-bold text-[#8b1e2d]"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredTraditions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTraditions.map((tradition) => (
                <article
                  key={tradition.slug}
                  className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition duration-300 hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_15px_35px_rgba(67,35,25,0.08)]"
                >
                  <Link
                    href={`/traditions/${tradition.slug}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#efe4ce]">
                      <img
                        src={tradition.image}
                        alt={tradition.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-[#fbf6e9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                        {tradition.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#80665d]">
                      <MapPin className="h-3.5 w-3.5 text-[#8b1e2d]" />
                      {tradition.region}
                    </div>

                    <Link href={`/traditions/${tradition.slug}`}>
                      <h3 className="mt-3 font-serif text-2xl font-semibold text-[#4a211c] group-hover:text-[#8b1e2d]">
                        {tradition.name}
                      </h3>
                    </Link>

                    <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                      {tradition.description}
                    </p>

                    <Link
                      href={`/traditions/${tradition.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]"
                    >
                      Discover the tradition
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-[#8b1e2d]" />

              <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                No tradition found
              </h3>

              <p className="mt-2 text-sm text-[#6d5149]">
                Try another craft, region or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-5 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
              >
                Explore All Traditions
              </button>
            </div>
          )}
        </section>

        {/* Learn CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/70">
          <div className="grid gap-7 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Learn More
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c]">
                Go deeper into the world of Indian craft.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d5149]">
                Learn about techniques, materials and the stories that make
                each craft tradition unique.
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
            >
              Explore the Learning Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}