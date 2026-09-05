"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import {
  ArrowRight,
  Crown,
  Flower2,
  MapPin,
  Sparkles,
} from "lucide-react";

const craftRegions = [
  { name: "Kashmir", craft: "Pashmina & Papier-Mâché", top: "9%", left: "47%" },
  { name: "Punjab", craft: "Phulkari Embroidery", top: "22%", left: "42%" },
  {
    name: "Rajasthan",
    craft: "Blue Pottery & Block Print",
    top: "34%",
    left: "30%",
  },
  { name: "Gujarat", craft: "Bandhani & Embroidery", top: "53%", left: "25%" },
  { name: "Maharashtra", craft: "Warli Art", top: "58%", left: "42%" },
  { name: "Madhya Pradesh", craft: "Gond Art", top: "48%", left: "51%" },
  {
    name: "Uttar Pradesh",
    craft: "Banarasi Weaving & Chikankari",
    top: "37%",
    left: "58%",
  },
  { name: "Bihar", craft: "Madhubani Painting", top: "43%", left: "66%" },
  {
    name: "West Bengal",
    craft: "Kantha & Terracotta",
    top: "50%",
    left: "73%",
  },
  { name: "Odisha", craft: "Pattachitra", top: "59%", left: "66%" },
  {
    name: "Andhra Pradesh",
    craft: "Kalamkari & Kondapalli Toys",
    top: "69%",
    left: "58%",
  },
  { name: "Tamil Nadu", craft: "Tanjore & Bronze", top: "85%", left: "55%" },
];

export default function HeritageSection() {
  const { messages } = useI18n();
  return (
    <section className="relative overflow-hidden bg-[#f4ead8] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full border border-[#b08d57]/30" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border border-[#641f20]/10" />
      </div>

      <div className="kalakriti-container relative px-5 md:px-8">
        <div className="grid overflow-hidden border border-[#b08d57]/60 bg-[#fffaf0] shadow-[0_20px_60px_rgba(69,21,23,0.08)] md:grid-cols-2">
          <div className="relative min-h-[580px] overflow-hidden border-b border-[#b08d57]/40 bg-[#fbf7ee] md:border-b-0 md:border-r">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b08d57]/15" />
              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#641f20]/10" />
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b08d57]/20" />
            </div>

            <div className="absolute left-6 top-6 z-40 flex items-center gap-2 border border-[#b08d57]/60 bg-[#fffaf0]/95 px-4 py-2">
              <Sparkles className="h-4 w-4 text-[#b08d57]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#641f20]">
                {messages.home.indiaLivingHeritage}
              </span>
            </div>

            <div className="absolute left-1/2 top-[51%] h-[470px] w-[350px] -translate-x-1/2 -translate-y-1/2 md:h-[500px] md:w-[370px]">
              <svg
                viewBox="0 0 350 500"
                className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(83,28,24,0.14)]"
                aria-label="Illustrated map of India showing craft regions"
              >
                <defs>
                  <linearGradient id="indiaGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f4df9b" />
                    <stop offset="35%" stopColor="#d6aa4c" />
                    <stop offset="65%" stopColor="#f0d27d" />
                    <stop offset="100%" stopColor="#b7832d" />
                  </linearGradient>

                  <pattern
                    id="heritagePattern"
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
                  fill="url(#indiaGold)"
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
                  fill="url(#heritagePattern)"
                  stroke="#9a6b25"
                  strokeWidth="1.3"
                  opacity="0.95"
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

              {craftRegions.map((region) => (
                <div
                  key={region.name}
                  className="absolute z-30"
                  style={{
                    top: region.top,
                    left: region.left,
                  }}
                >
                  <div className="group relative">
                    <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#b08d57]/20" />

                    <MapPin
                      className="relative h-5 w-5 -translate-x-1/2 cursor-pointer text-[#641f20] drop-shadow-md transition-all duration-300 group-hover:scale-150"
                      fill="#d6aa4c"
                      strokeWidth={1.8}
                    />

                    <div className="pointer-events-none absolute bottom-7 left-1/2 z-50 w-44 -translate-x-1/2 scale-95 border border-[#b08d57]/70 bg-[#fffaf0] p-3 opacity-0 shadow-[0_15px_35px_rgba(69,21,23,0.15)] transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                        <p className="font-serif text-xs font-bold text-[#641f20]">
                          {region.name}
                        </p>
                      </div>

                      <p className="text-[10px] leading-4 text-[#75665b]">
                        {region.craft}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute left-[48%] top-[52%] z-20 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#b08d57]/70 bg-[#fffaf0]/85 shadow-[0_10px_30px_rgba(69,21,23,0.10)] backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#641f20]/25">
                    <Flower2
                      className="h-9 w-9 text-[#b08d57]"
                      strokeWidth={1}
                    />
                  </div>
                </div>

                <p className="mt-2 font-serif text-sm font-bold tracking-wide text-[#641f20]">
                  KALAKRITI
                </p>

                <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-[#75665b]">
                  {messages.home.craftedInIndia}
                </p>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 border border-[#b08d57]/60 bg-[#fffaf0]/95 px-5 py-2 shadow-sm">
              <p className="flex items-center gap-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-[#641f20]">
                <Crown className="h-3.5 w-3.5 text-[#b08d57]" />
                {messages.home.manyRegionsOneHeritage}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16">
            <p className="kalakriti-eyebrow">{messages.home.exploreIndia}</p>

            <h2 className="kalakriti-heading mt-4 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              {messages.home.exploreIndiaTitle}
              <span className="block text-[#7a3030]">
                {messages.home.livingCraftHeritage}
              </span>
            </h2>

            <div className="mt-6 h-px w-16 bg-[#b08d57]" />

            <p className="mt-7 text-sm leading-7 text-[#4f423b] md:text-base">
              India&apos;s craft traditions are rooted in landscapes,
              communities, festivals, architecture, clothing, and everyday
              life.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#75665b]">
              Explore the regions and techniques behind handmade creations,
              then follow the journey from place to craft to artisan story.
            </p>

            <div className="mt-9 border-y border-[#b08d57]/25 py-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-serif text-xl text-[#641f20]">{messages.home.place}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Region
                  </p>
                </div>

                <div className="border-x border-[#b08d57]/25">
                  <p className="font-serif text-xl text-[#641f20]">{messages.home.craft}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Tradition
                  </p>
                </div>

                <div>
                  <p className="font-serif text-xl text-[#641f20]">{messages.home.story}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#75665b]">
                    Artisan
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/craft-heritage"
              className="group mt-8 inline-flex w-fit items-center gap-3 bg-[#641f20] px-6 py-3.5 text-sm font-semibold text-[#fffaf0] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a3030] hover:shadow-[0_15px_35px_rgba(69,21,23,0.16)]"
            >
              {messages.home.discoverCraftHeritage}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}