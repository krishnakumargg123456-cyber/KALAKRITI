/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Palette,
  X,
} from "lucide-react";

type Craft = {
  id: string;
  name: string;
  slug: string;
  description: string;
  region: string;
  state: string;
  origin: string;
  category: string;
};

const crafts: Craft[] = [
  {
    id: "1",
    name: "Madhubani Painting",
    slug: "madhubani-painting",
    description:
      "A vibrant folk art tradition from Bihar, known for intricate lines, natural colours and stories inspired by nature, mythology and village life.",
    region: "East India",
    state: "Bihar",
    origin: "Madhubani, Bihar",
    category: "Painting",
  },
  {
    id: "2",
    name: "Warli Art",
    slug: "warli-art",
    description:
      "A celebrated tribal painting tradition from Maharashtra featuring simple geometric forms that portray community life, celebrations, farming and nature.",
    region: "West India",
    state: "Maharashtra",
    origin: "Palghar, Maharashtra",
    category: "Painting",
  },
  {
    id: "3",
    name: "Pattachitra",
    slug: "pattachitra",
    description:
      "An ancient cloth-based painting tradition from Odisha, recognised for bold outlines, mythological narratives and detailed decorative borders.",
    region: "East India",
    state: "Odisha",
    origin: "Raghurajpur, Odisha",
    category: "Painting",
  },
  {
    id: "4",
    name: "Phulkari",
    slug: "phulkari",
    description:
      "Punjab's celebrated embroidery tradition, created with colourful silk threads and floral motifs that carry generations of cultural memory.",
    region: "North India",
    state: "Punjab",
    origin: "Punjab",
    category: "Embroidery",
  },
  {
    id: "5",
    name: "Chikankari",
    slug: "chikankari",
    description:
      "The delicate hand embroidery of Lucknow, celebrated for fine stitches, floral patterns and graceful craftsmanship on traditional textiles.",
    region: "North India",
    state: "Uttar Pradesh",
    origin: "Lucknow, Uttar Pradesh",
    category: "Embroidery",
  },
  {
    id: "6",
    name: "Dhokra",
    slug: "dhokra",
    description:
      "A distinctive lost-wax metal casting tradition practised by artisan communities across India, producing expressive handmade figures and objects.",
    region: "Central India",
    state: "Chhattisgarh",
    origin: "Bastar, Chhattisgarh",
    category: "Metal Craft",
  },
  {
    id: "7",
    name: "Blue Pottery",
    slug: "blue-pottery",
    description:
      "Jaipur's distinctive pottery tradition known for blue and white floral designs, smooth surfaces and its unusual quartz-based composition.",
    region: "West India",
    state: "Rajasthan",
    origin: "Jaipur, Rajasthan",
    category: "Pottery",
  },
  {
    id: "8",
    name: "Banarasi Weaving",
    slug: "banarasi-weaving",
    description:
      "A luxurious handloom tradition from Varanasi, famous for rich silk textiles, intricate zari work and timeless ceremonial designs.",
    region: "North India",
    state: "Uttar Pradesh",
    origin: "Varanasi, Uttar Pradesh",
    category: "Textile",
  },
  {
    id: "9",
    name: "Kalamkari",
    slug: "kalamkari",
    description:
      "A traditional textile art created using hand drawing and natural dyes, featuring detailed botanical, mythological and narrative compositions.",
    region: "South India",
    state: "Andhra Pradesh",
    origin: "Srikalahasti, Andhra Pradesh",
    category: "Textile Art",
  },
  {
    id: "10",
    name: "Pashmina Weaving",
    slug: "pashmina-weaving",
    description:
      "A refined Himalayan textile tradition known for exceptionally soft fibres, patient handwork and finely woven shawls from Kashmir.",
    region: "North India",
    state: "Jammu & Kashmir",
    origin: "Kashmir",
    category: "Textile",
  },
  {
    id: "11",
    name: "Rogan Art",
    slug: "rogan-art",
    description:
      "A rare textile painting tradition from Kutch where coloured castor-oil-based paint is carefully shaped into intricate symmetrical patterns.",
    region: "West India",
    state: "Gujarat",
    origin: "Kutch, Gujarat",
    category: "Textile Art",
  },
  {
    id: "12",
    name: "Kondapalli Toys",
    slug: "kondapalli-toys",
    description:
      "Hand-carved wooden toys from Andhra Pradesh, traditionally shaped and painted into colourful figures inspired by village life and folklore.",
    region: "South India",
    state: "Andhra Pradesh",
    origin: "Kondapalli, Andhra Pradesh",
    category: "Wood Craft",
  },
];

export default function CraftHeritagePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const regions = useMemo(
    () => Array.from(new Set(crafts.map((craft) => craft.region))).sort(),
    []
  );

  const filteredCrafts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return crafts.filter((craft) => {
      const matchesSearch =
        !query ||
        craft.name.toLowerCase().includes(query) ||
        craft.description.toLowerCase().includes(query) ||
        craft.region.toLowerCase().includes(query) ||
        craft.state.toLowerCase().includes(query) ||
        craft.category.toLowerCase().includes(query);

      const matchesRegion =
        region === "all" || craft.region === region;

      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
  };

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative overflow-hidden border-b border-deep-maroon/10 bg-[#eee4d1]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-8 top-6 text-7xl text-deep-maroon">
            ✦
          </div>
          <div className="absolute right-12 top-14 text-6xl text-deep-maroon">
            ✦
          </div>
          <div className="absolute bottom-4 left-1/3 text-5xl text-deep-maroon">
            ✦
          </div>
        </div>

        <div className="kalakriti-container relative px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              India's Living Heritage
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-6xl">
              Craft Heritage
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-brown md:text-lg">
              Discover the living traditions, stories and skilled hands behind
              India's remarkable craft heritage.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-deep-maroon">
              <span className="rounded-full border border-deep-maroon/15 bg-cream/80 px-4 py-2">
                {crafts.length} Craft Traditions
              </span>
              <span className="rounded-full border border-deep-maroon/15 bg-cream/80 px-4 py-2">
                Across India
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="kalakriti-container px-4 py-10 md:py-14">
        <div className="rounded-2xl border border-deep-maroon/10 bg-white p-4 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/60"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, regions or traditions..."
                aria-label="Search craft heritage"
                className="w-full rounded-xl border border-deep-maroon/15 bg-cream/40 py-3.5 pl-11 pr-4 text-sm text-brown outline-none transition placeholder:text-brown/50 focus:border-gold"
              />
            </div>

            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              aria-label="Filter by region"
              className="rounded-xl border border-deep-maroon/15 bg-cream/40 px-4 py-3.5 text-sm font-medium text-brown outline-none focus:border-gold"
            >
              <option value="all">All Regions</option>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {(search || region !== "all") && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-deep-maroon/15 px-5 py-3.5 text-sm font-semibold text-deep-maroon transition hover:bg-deep-maroon hover:text-cream"
              >
                <X size={17} />
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-brown/70">
              Showing{" "}
              <span className="font-semibold text-deep-maroon">
                {filteredCrafts.length}
              </span>{" "}
              traditions
            </p>
          </div>
        </div>

        {filteredCrafts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-deep-maroon/10 bg-white px-6 py-16 text-center">
            <Palette
              size={52}
              strokeWidth={1.2}
              className="mx-auto text-deep-maroon/30"
            />

            <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
              No craft tradition found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-brown">
              Try another search or explore all regions of India's craft
              heritage.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-deep-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon"
            >
              View All Crafts
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCrafts.map((craft) => (
              <Link
                key={craft.id}
                href={`/craft-heritage/${craft.slug}`}
                className="group rounded-2xl border border-deep-maroon/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-cream text-deep-maroon">
                  <Palette size={26} strokeWidth={1.5} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  {craft.category}
                </p>

                <h2 className="mt-3 font-serif text-2xl font-bold text-deep-maroon transition group-hover:text-maroon">
                  {craft.name}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-brown/70">
                  <MapPin size={15} />
                  {craft.origin}
                </p>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-brown">
                  {craft.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-deep-maroon/10 pt-5">
                  <span className="text-sm font-semibold text-deep-maroon">
                    Discover the Story
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-deep-maroon/15 text-deep-maroon transition group-hover:bg-deep-maroon group-hover:text-cream">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-deep-maroon/10 bg-[#eee4d1]">
        <div className="kalakriti-container px-4 py-16 text-center md:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Preserve What Matters
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
            Every handmade tradition has a story worth keeping alive.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-brown">
            Explore India's craft traditions, meet the artisans behind them
            and discover authentic handmade creations.
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

