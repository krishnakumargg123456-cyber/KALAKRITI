"use client";

import Link from "next/link";
import { ArrowRight, Brush, CircleDot, Gem, Layers3 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const crafts = [
  {
    name: "Madhubani",
    region: "Bihar",
    description:
      "Storytelling through intricate lines, symbolic figures, and vivid folk motifs.",
    icon: Brush,
    image: "/images/home/madhubani.jpg",
    slug: "madhubani-painting",
  },
  {
    name: "Blue Pottery",
    region: "Rajasthan",
    description:
      "Delicate handcrafted ceramics known for their distinctive blue floral patterns.",
    icon: CircleDot,
    image: "/images/home/blue-pottery.jpg",
    slug: "blue-pottery",
  },
  {
    name: "Dhokra",
    region: "Chhattisgarh",
    description:
      "Ancient lost-wax metal craft shaped by generations of skilled tribal artisans.",
    icon: Gem,
    image: "/images/home/dhokra.jpg",
    slug: "dhokra",
  },
  {
    name: "Banarasi Weaving",
    region: "Uttar Pradesh",
    description:
      "Timeless textiles woven with intricate motifs, rich detail, and patience.",
    icon: Layers3,
    image: "/images/home/banarasi.jpg",
    slug: "banarasi-weaving",
  },
];

export default function FeaturedCrafts() {
  const { messages } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[#f4ead8] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-32 top-24 h-64 w-64 rounded-full border border-[#b08d57]/20" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full border border-[#641f20]/10" />
      </div>

      <div className="kalakriti-container relative px-5 md:px-8">
        <div className="flex flex-col gap-8 border-b border-[#b08d57]/30 pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="kalakriti-eyebrow">{messages.home.craftsEyebrow}</p>

            <h2 className="kalakriti-heading mt-4 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              {messages.home.craftsTitle}
            </h2>

            <div className="mt-5 h-px w-16 bg-[#b08d57]" />

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#75665b] md:text-base">
              {messages.home.craftsDescription}
            </p>
          </div>

          <Link
            href="/craft-heritage"
            className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-[#641f20] transition-colors hover:text-[#a85f45]"
          >
            {messages.home.exploreAllCrafts}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {crafts.map((craft) => {
            const Icon = craft.icon;

            return (
              <Link
                key={craft.name}
                href={`/craft-heritage/${craft.slug}`}
                className="group relative overflow-hidden border border-[#641f20]/15 bg-[#fffaf0] transition-all duration-500 hover:-translate-y-2 hover:border-[#b08d57]/70 hover:shadow-[0_20px_50px_rgba(69,21,23,0.12)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${craft.image}')`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b211d]/70 via-transparent to-[#2b211d]/5" />

                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-[#d8bc7a]/70 bg-[#fffaf0]/90 text-[#641f20]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="absolute right-5 top-5 border border-[#d8bc7a]/60 bg-[#fffaf0]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#641f20]">
                    {craft.region}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8bc7a]">
                      {messages.home.indianCraft}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl font-medium text-[#fffaf0]">
                      {craft.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-6 text-[#75665b]">
                    {craft.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#b08d57]/20 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b08d57]">
                      {messages.home.viewCraftStory}
                    </span>

                    <ArrowRight className="h-4 w-4 text-[#641f20] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b08d57]">
          <span className="h-px w-14 bg-[#b08d57]/50" />
          {messages.home.rootedInIndia}
          <span className="h-px w-14 bg-[#b08d57]/50" />
        </div>
      </div>
    </section>
  );
}