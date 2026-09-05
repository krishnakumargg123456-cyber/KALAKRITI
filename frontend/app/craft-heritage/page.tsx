/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Palette,
  Search,
  Sparkles,
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

const mapRegions = [
  {
    name: "Kashmir",
    state: "Jammu & Kashmir",
    craft: "Pashmina Weaving",
    top: "10%",
    left: "47%",
  },
  {
    name: "Punjab",
    state: "Punjab",
    craft: "Phulkari",
    top: "22%",
    left: "42%",
  },
  {
    name: "Rajasthan",
    state: "Rajasthan",
    craft: "Blue Pottery",
    top: "34%",
    left: "30%",
  },
  {
    name: "Gujarat",
    state: "Gujarat",
    craft: "Rogan Art",
    top: "53%",
    left: "25%",
  },
  {
    name: "Maharashtra",
    state: "Maharashtra",
    craft: "Warli Art",
    top: "59%",
    left: "42%",
  },
  {
    name: "Madhya Pradesh",
    state: "Madhya Pradesh",
    craft: "Gond Art",
    top: "48%",
    left: "51%",
  },
  {
    name: "Uttar Pradesh",
    state: "Uttar Pradesh",
    craft: "Banarasi Weaving",
    top: "37%",
    left: "58%",
  },
  {
    name: "Bihar",
    state: "Bihar",
    craft: "Madhubani Painting",
    top: "43%",
    left: "66%",
  },
  {
    name: "West Bengal",
    state: "West Bengal",
    craft: "Kantha & Terracotta",
    top: "50%",
    left: "73%",
  },
  {
    name: "Odisha",
    state: "Odisha",
    craft: "Pattachitra",
    top: "59%",
    left: "66%",
  },
  {
    name: "Andhra Pradesh",
    state: "Andhra Pradesh",
    craft: "Kalamkari",
    top: "69%",
    left: "58%",
  },
  {
    name: "Tamil Nadu",
    state: "Tamil Nadu",
    craft: "Tanjore & Bronze",
    top: "85%",
    left: "55%",
  },
];

export default function CraftHeritagePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [selectedState, setSelectedState] = useState<string | null>(null);

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

      const matchesState =
        !selectedState || craft.state === selectedState;

      return matchesSearch && matchesRegion && matchesState;
    });
  }, [search, region, selectedState]);

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setSelectedState(null);
  };

  const selectMapState = (state: string) => {
    setSelectedState((current) => (current === state ? null : state));
  };

  return (
    <main className="min-h-screen bg-[#fbf7ee] text-[#2b211d]">
      <section className="relative overflow-hidden border-b border-[#b08d57]/40 bg-[#eee4d1]">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full border border-[#641f20]/20" />
          <div className="absolute -right-24 bottom-[-80px] h-80 w-80 rounded-full border border-[#b08d57]/30" />
        </div>

        <div className="kalakriti-container relative px-5 py-20 md:px-8 md:py-28">
          <p className="kalakriti-eyebrow">India · Living Heritage</p>

          <h1 className="kalakriti-heading mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            Craft Heritage
            <span className="block text-[#7a3030]">
              shaped by place and people.
            </span>
          </h1>

          <div className="mt-7 h-px w-20 bg-[#b08d57]" />

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#75665b] md:text-lg">
            Journey across India's regions to discover living traditions,
            distinctive techniques, and the skilled hands that keep them alive.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="border border-[#b08d57]/60 bg-[#fffaf0]/75 px-5 py-3">
              <span className="font-serif text-xl text-[#641f20]">
                {crafts.length}
              </span>
              <span className="ml-2 text-xs uppercase tracking-[0.16em] text-[#75665b]">
                traditions
              </span>
            </div>

            <div className="border border-[#b08d57]/60 bg-[#fffaf0]/75 px-5 py-3">
              <span className="font-serif text-xl text-[#641f20]">
                {regions.length}
              </span>
              <span className="ml-2 text-xs uppercase tracking-[0.16em] text-[#75665b]">
                regions
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="kalakriti-container px-5 py-16 md:px-8 md:py-24">
        <div className="grid overflow-hidden border border-[#b08d57]/60 bg-[#fffaf0] shadow-[0_20px_60px_rgba(69,21,23,0.07)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[620px] overflow-hidden border-b border-[#b08d57]/35 bg-[#f8f0df] lg:border-b-0 lg:border-r">
            <div className="absolute left-6 top-6 z-40 flex items-center gap-2 border border-[#b08d57]/60 bg-[#fffaf0]/95 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#b08d57]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#641f20]">
                Explore by region
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b08d57]/15" />
              <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#641f20]/10" />
              <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b08d57]/20" />
            </div>

            <div className="absolute left-1/2 top-[52%] h-[500px] w-[360px] -translate-x-1/2 -translate-y-1/2">
              <svg
                viewBox="0 0 350 500"
                className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(83,28,24,0.12)]"
                aria-label="Illustrated map of India"
              >
                <defs>
                  <linearGradient id="heritageIndiaGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f4df9b" />
                    <stop offset="35%" stopColor="#d6aa4c" />
                    <stop offset="65%" stopColor="#f0d27d" />
                    <stop offset="100%" stopColor="#b7832d" />
                  </linearGradient>

                  <pattern
                    id="heritageIndiaPattern"
                    width="34"
                    height="34"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="17"
                      cy="17"
                      r="8"
                      fill="none"
                      stroke="#7c2630"
                      strokeWidth="0.8"
                      opacity="0.2"
                    />
                    <circle
                      cx="17"
                      cy="17"
                      r="3"
                      fill="#7c2630"
                      opacity="0.16"
                    />
                    <path
                      d="M17 5 L20 12 L27 17 L20 22 L17 29 L14 22 L7 17 L14 12 Z"
                      fill="none"
                      stroke="#7c2630"
                      strokeWidth="0.7"
                      opacity="0.16"
                    />
                  </pattern>
                </defs>

                <path
                  d="M153 18
                    L177 25 L192 39 L207 47 L217 61
                    L235 70 L244 84 L259 94 L267 111
                    L281 120 L289 137 L286 151 L299 164
                    L291 178 L301 192 L292 207 L280 217
                    L271 235 L258 249 L249 267 L244 285
                    L237 304 L229 324 L220 344 L212 365
                    L204 386 L197 409 L187 432 L176 454
                    L166 479 L157 461 L148 439 L136 420
                    L125 400 L112 386 L101 371 L91 357
                    L78 344 L67 330 L55 316 L45 300
                    L39 282 L31 268 L38 252 L31 238
                    L40 223 L47 208 L42 192 L53 180
                    L50 164 L62 151 L72 138 L69 122
                    L82 112 L94 100 L106 91 L112 76
                    L125 67 L129 51 L141 43 L140 29 Z"
                  fill="url(#heritageIndiaGold)"
                  stroke="#7c2630"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                <path
                  d="M153 31
                    L174 38 L188 51 L202 59 L212 72
                    L229 80 L237 94 L252 104 L259 120
                    L273 129 L278 143 L269 155 L283 170
                    L276 184 L285 195 L276 208 L265 218
                    L256 238 L245 251 L238 271 L232 291
                    L223 312 L216 333 L207 353 L199 376
                    L191 400 L181 425 L174 445 L165 427
                    L155 407 L143 390 L132 373 L119 359
                    L108 345 L96 331 L84 318 L72 302
                    L65 286 L55 270 L61 254 L54 240
                    L63 226 L70 211 L65 196 L76 183
                    L73 168 L84 155 L94 143 L91 128
                    L103 118 L114 106 L124 96 L130 81
                    L142 72 L146 56 L155 49 Z"
                  fill="url(#heritageIndiaPattern)"
                  stroke="#9a6b25"
                  strokeWidth="1.3"
                />

                <path
                  d="M80 155 Q145 145 205 160 T270 150
                     M61 225 Q140 215 215 230 T278 215
                     M54 285 Q125 275 205 292 T255 275
                     M78 335 Q140 320 205 340
                     M110 375 Q155 360 220 370"
                  fill="none"
                  stroke="#7c2630"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.3"
                />

                <path
                  d="M155 53 L160 66 L174 69 L162 77 L164 91 L155 83 L144 91 L147 77 L136 69 L150 66 Z"
                  fill="#fff4ca"
                  stroke="#9a6b25"
                  strokeWidth="1"
                />
              </svg>

              {mapRegions.map((item) => {
                const active = selectedState === item.state;

                return (
                  <button
                    key={item.state}
                    type="button"
                    onClick={() => selectMapState(item.state)}
                    className="absolute z-30"
                    style={{
                      top: item.top,
                      left: item.left,
                    }}
                    aria-label={`Explore crafts from ${item.state}`}
                  >
                    <span
                      className={`absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                        active
                          ? "animate-pulse bg-[#641f20]/25"
                          : "bg-[#b08d57]/15"
                      }`}
                    />

                    <MapPin
                      className={`relative h-5 w-5 -translate-x-1/2 drop-shadow-md transition-all duration-300 ${
                        active
                          ? "scale-150 text-[#641f20]"
                          : "text-[#641f20] hover:scale-150"
                      }`}
                      fill={active ? "#641f20" : "#d6aa4c"}
                      strokeWidth={1.8}
                    />

                    <span
                      className={`pointer-events-none absolute bottom-7 left-1/2 z-50 w-44 -translate-x-1/2 border border-[#b08d57]/70 bg-[#fffaf0] p-3 text-left shadow-[0_15px_35px_rgba(69,21,23,0.15)] transition-all duration-200 ${
                        active
                          ? "visible scale-100 opacity-100"
                          : "invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    >
                      <span className="block font-serif text-xs font-bold text-[#641f20]">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[10px] leading-4 text-[#75665b]">
                        {item.craft}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 border border-[#b08d57]/60 bg-[#fffaf0]/95 px-5 py-2">
              <p className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-[#641f20]">
                Place · Craft · Story
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="kalakriti-eyebrow">A living map of India</p>

            <h2 className="kalakriti-heading mt-4 text-4xl leading-tight md:text-5xl">
              Discover the
              <span className="block text-[#7a3030]">
                traditions of every region.
              </span>
            </h2>

            <div className="mt-6 h-px w-16 bg-[#b08d57]" />

            <p className="mt-7 text-sm leading-7 text-[#75665b] md:text-base">
              Start with a place. Follow its craft. Then discover the people,
              materials and stories behind the tradition.
            </p>

            <div className="mt-9 border-y border-[#b08d57]/25 py-6">
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="font-serif text-xl text-[#641f20]">Place</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#75665b]">
                    Region
                  </p>
                </div>

                <div className="border-x border-[#b08d57]/25">
                  <p className="font-serif text-xl text-[#641f20]">Craft</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#75665b]">
                    Tradition
                  </p>
                </div>

                <div>
                  <p className="font-serif text-xl text-[#641f20]">Story</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#75665b]">
                    Artisan
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-7 text-xs uppercase tracking-[0.16em] text-[#75665b]">
              {selectedState
                ? `Exploring · ${selectedState}`
                : "Select a region on the map"}
            </p>

            {selectedState && (
              <button
                type="button"
                onClick={() => setSelectedState(null)}
                className="mt-3 flex w-fit items-center gap-2 text-sm font-semibold text-[#641f20] underline decoration-[#b08d57] underline-offset-4"
              >
                <X className="h-4 w-4" />
                Clear region
              </button>
            )}

            <Link
              href="#craft-traditions"
              className="group mt-8 inline-flex w-fit items-center gap-3 bg-[#641f20] px-6 py-3.5 text-sm font-semibold text-[#fffaf0] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a3030]"
            >
              Explore Craft Traditions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="craft-traditions"
        className="border-y border-[#b08d57]/25 bg-[#f4ead8] py-16 md:py-24"
      >
        <div className="kalakriti-container px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="kalakriti-eyebrow">The traditions</p>

            <h2 className="kalakriti-heading mt-4 text-4xl md:text-5xl">
              Crafts worth
              <span className="text-[#7a3030]"> knowing by name.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#75665b] md:text-base">
              Search by craft, region, state or technique and follow each
              tradition into its deeper story.
            </p>
          </div>

          <div className="mt-10 border border-[#b08d57]/50 bg-[#fffaf0] p-4 shadow-[0_12px_35px_rgba(69,21,23,0.05)] md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75665b]/60"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search crafts, regions or traditions..."
                  aria-label="Search craft heritage"
                  className="w-full border border-[#b08d57]/35 bg-[#fbf7ee] py-3.5 pl-11 pr-4 text-sm text-[#2b211d] outline-none transition placeholder:text-[#75665b]/60 focus:border-[#b08d57]"
                />
              </div>

              <select
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                aria-label="Filter by region"
                className="border border-[#b08d57]/35 bg-[#fbf7ee] px-4 py-3.5 text-sm font-medium text-[#641f20] outline-none focus:border-[#b08d57]"
              >
                <option value="all">All Regions</option>
                {regions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {(search || region !== "all" || selectedState) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 border border-[#641f20]/20 px-5 py-3.5 text-sm font-semibold text-[#641f20] transition hover:bg-[#641f20] hover:text-[#fffaf0]"
                >
                  <X size={17} />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-[#75665b]">
              Showing{" "}
              <span className="font-semibold text-[#641f20]">
                {filteredCrafts.length}
              </span>{" "}
              traditions
            </p>
          </div>

          {filteredCrafts.length === 0 ? (
            <div className="mt-8 border border-[#b08d57]/40 bg-[#fffaf0] px-6 py-20 text-center">
              <Palette
                size={52}
                strokeWidth={1.2}
                className="mx-auto text-[#641f20]/30"
              />

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#641f20]">
                No craft tradition found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75665b]">
                Try another search or explore all regions of India's craft
                heritage.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 bg-[#641f20] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#7a3030]"
              >
                View All Crafts
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-px overflow-hidden border border-[#b08d57]/40 bg-[#b08d57]/40 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCrafts.map((craft) => (
                <Link
                  key={craft.id}
                  href={`/craft-heritage/${craft.slug}`}
                  className="group relative bg-[#fffaf0] p-7 transition duration-300 hover:bg-[#fbf3e3]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-[#b08d57]/50 bg-[#f4ead8] text-[#641f20]">
                      <Palette size={22} strokeWidth={1.35} />
                    </div>

                    <span className="font-serif text-3xl text-[#b08d57]/30">
                      {craft.id.padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08d57]">
                    {craft.category}
                  </p>

                  <h2 className="mt-3 font-serif text-2xl font-medium text-[#641f20] transition group-hover:text-[#7a3030]">
                    {craft.name}
                  </h2>

                  <p className="mt-3 flex items-center gap-2 text-xs text-[#75665b]">
                    <MapPin size={14} />
                    {craft.origin}
                  </p>

                  <p className="mt-5 line-clamp-4 text-sm leading-7 text-[#75665b]">
                    {craft.description}
                  </p>

                  <div className="mt-7 flex items-center justify-between border-t border-[#b08d57]/25 pt-5">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#641f20]">
                      Discover the story
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center border border-[#641f20]/20 text-[#641f20] transition group-hover:bg-[#641f20] group-hover:text-[#fffaf0]">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#641f20] py-20 md:py-24">
        <div className="kalakriti-container px-5 text-center md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6aa4c]">
            Preserve what matters
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-medium leading-tight text-[#fffaf0] md:text-5xl">
            Every handmade tradition has a story worth carrying forward.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#f4ead8]/75 md:text-base">
            Explore the traditions of India, meet the artisans behind them,
            and discover handmade creations rooted in place and memory.
          </p>

          <Link
            href="/shop"
            className="mt-9 inline-flex items-center gap-3 border border-[#d6aa4c] bg-[#fffaf0] px-7 py-3.5 text-sm font-semibold text-[#641f20] transition hover:bg-[#f4ead8]"
          >
            Explore Handmade Collection
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}