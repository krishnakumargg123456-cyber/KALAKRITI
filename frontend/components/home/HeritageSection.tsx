"use client";

import Link from "next/link";
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
  { name: "Rajasthan", craft: "Blue Pottery & Block Print", top: "34%", left: "30%" },
  { name: "Gujarat", craft: "Bandhani & Embroidery", top: "53%", left: "25%" },
  { name: "Maharashtra", craft: "Warli Art", top: "58%", left: "42%" },
  { name: "Madhya Pradesh", craft: "Gond Art", top: "48%", left: "51%" },
  { name: "Uttar Pradesh", craft: "Banarasi Weaving & Chikankari", top: "37%", left: "58%" },
  { name: "Bihar", craft: "Madhubani Painting", top: "43%", left: "66%" },
  { name: "West Bengal", craft: "Kantha & Terracotta", top: "50%", left: "73%" },
  { name: "Odisha", craft: "Pattachitra", top: "59%", left: "66%" },
  { name: "Andhra Pradesh", craft: "Kalamkari & Kondapalli Toys", top: "69%", left: "58%" },
  { name: "Tamil Nadu", craft: "Tanjore & Bronze", top: "85%", left: "55%" },
];

export default function HeritageSection() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-gold/40" />
        <div className="absolute right-[-120px] bottom-[-100px] h-96 w-96 rounded-full border border-maroon/20" />
      </div>

      <div className="kalakriti-container relative px-4">
        <div className="grid overflow-hidden rounded-card border border-gold bg-cream shadow-card md:grid-cols-2">

          {/* INDIA MAP */}
          <div className="relative min-h-[560px] overflow-hidden border-b border-gold/50 bg-parchment md:border-b-0 md:border-r">

            {/* Decorative rings */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
              <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-maroon/15" />
              <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25" />
            </div>

            {/* Header badge */}
            <div className="absolute left-6 top-6 z-40 flex items-center gap-2 rounded-full border border-gold/60 bg-cream/95 px-4 py-2 shadow-soft">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-maroon">
                Living Heritage
              </span>
            </div>

            {/* Map container */}
            <div className="absolute left-1/2 top-[51%] h-[470px] w-[350px] -translate-x-1/2 -translate-y-1/2 md:h-[500px] md:w-[370px]">

              {/* Golden India silhouette */}
              <svg
                viewBox="0 0 350 500"
                className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgba(83,28,24,0.16)]"
                aria-label="Map of India showing craft regions"
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

                {/* India */}
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

                {/* Decorative inner map */}
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

                {/* Regional decorative divisions */}
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

                {/* North star */}
                <path
                  d="M155 53 L160 66 L174 69 L162 77 L164 91 L155 83 L144 91 L147 77 L136 69 L150 66 Z"
                  fill="#fff4ca"
                  stroke="#9a6b25"
                  strokeWidth="1"
                />
              </svg>

              {/* Craft markers */}
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
                    <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/25" />

                    <MapPin
                      className="relative h-5 w-5 -translate-x-1/2 cursor-pointer text-maroon drop-shadow-md transition-all duration-300 group-hover:scale-150 group-hover:text-deep-maroon"
                      fill="#d6aa4c"
                      strokeWidth={1.8}
                    />

                    <div className="pointer-events-none absolute bottom-7 left-1/2 z-50 w-44 -translate-x-1/2 scale-95 rounded-lg border border-gold bg-cream p-3 opacity-0 shadow-elevated transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      <div className="mb-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <p className="font-serif text-xs font-bold text-maroon">
                          {region.name}
                        </p>
                      </div>
                      <p className="text-[10px] leading-4 text-brown">
                        {region.craft}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Center emblem */}
              <div className="absolute left-[48%] top-[52%] z-20 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/70 bg-cream/80 shadow-soft backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-maroon/30">
                    <Flower2
                      className="h-9 w-9 text-gold"
                      strokeWidth={1}
                    />
                  </div>
                </div>
                <p className="mt-2 font-serif text-sm font-bold tracking-wide text-maroon">
                  KALAKRITI
                </p>
                <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-muted">
                  Crafted in India
                </p>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-gold/60 bg-cream/95 px-5 py-2 shadow-soft">
              <p className="flex items-center gap-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-maroon">
                <Crown className="h-3.5 w-3.5 text-gold" />
                Many regions · One heritage
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center p-7 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Craft across India
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-5xl">
              One country.
              <span className="block text-maroon">
                Countless traditions.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-brown md:text-base">
              India&apos;s craft heritage is woven into its landscapes,
              communities, festivals, architecture, clothing, and everyday
              life.
            </p>

            <p className="mt-4 text-sm leading-6 text-muted">
              Discover the regions, techniques, stories, and communities behind
              the handmade pieces brought together by Kalakriti.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-card border border-gold/40 bg-paper p-4">
                <p className="font-serif text-2xl font-bold text-maroon">
                  28+
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                  Craft regions
                </p>
              </div>

              <div className="rounded-card border border-gold/40 bg-paper p-4">
                <p className="font-serif text-2xl font-bold text-maroon">
                  1000s
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                  Years of tradition
                </p>
              </div>
            </div>

            <Link
              href="/craft-heritage"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-maroon-light hover:shadow-elevated"
            >
              Explore India&apos;s craft heritage
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
