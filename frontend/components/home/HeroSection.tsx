"use client";

import Link from "next/link";
import { ArrowRight, Flower2, Hand, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function HeroSection() {
  const { messages } = useI18n();

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden border-b border-[#b08d57]/30 bg-[#2b211d]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-[1.02]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(43,33,29,0.92) 0%, rgba(43,33,29,0.72) 42%, rgba(43,33,29,0.24) 100%), url('/images/home/hero-potter.jpg')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(216,188,122,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-5 border border-[#d8bc7a]/20 md:inset-8 lg:inset-10" />

      <div className="pointer-events-none absolute left-7 top-7 h-16 w-16 border-l border-t border-[#d8bc7a]/70 md:left-10 md:top-10" />
      <div className="pointer-events-none absolute right-7 top-7 h-16 w-16 border-r border-t border-[#d8bc7a]/70 md:right-10 md:top-10" />
      <div className="pointer-events-none absolute bottom-7 left-7 h-16 w-16 border-b border-l border-[#d8bc7a]/70 md:bottom-10 md:left-10" />
      <div className="pointer-events-none absolute bottom-7 right-7 h-16 w-16 border-b border-r border-[#d8bc7a]/70 md:bottom-10 md:right-10" />

      <div className="kalakriti-container relative z-10 flex min-h-[calc(100svh-72px)] items-center px-6 py-20 md:px-10 lg:px-16">
        <div className="max-w-3xl text-white">
          <div className="mb-7 inline-flex items-center gap-3 border border-[#d8bc7a]/55 bg-[#451517]/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f1d79d] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {messages.home.heroEyebrow}
          </div>

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#d8bc7a]">
            {messages.home.heroKicker}
          </p>

          <h1 className="font-serif text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-[#fffaf0] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Every Craft
            <span className="mt-2 block text-[#d8bc7a]">
              Has a Story.
            </span>
          </h1>

          <div className="mt-7 h-px w-24 bg-[#d8bc7a]" />

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#f4ead8] md:text-lg">
            {messages.home.heroDescription}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-[#641f20] px-7 py-4 text-sm font-semibold text-[#fffaf0] shadow-[0_12px_35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a3030]"
            >
              {messages.home.heroExploreCrafts}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/artisans"
              className="inline-flex items-center gap-3 border border-[#d8bc7a]/70 bg-[#fffaf0]/5 px-7 py-4 text-sm font-semibold text-[#fffaf0] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#fffaf0]/10"
            >
              {messages.home.heroMeetArtisans}
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-5 text-[#d8bc7a]">
            <div className="flex h-11 w-11 items-center justify-center border border-[#d8bc7a]/50">
              <Hand className="h-5 w-5" />
            </div>

            <div>
              <p className="font-serif text-lg text-[#fffaf0]">
                {messages.home.heroMadeByHumanHands}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#d8bc7a]/90">
                {messages.home.heroCraftValues}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden text-right text-[#fffaf0]/80 lg:block">
        <div className="mb-3 flex items-center justify-end gap-3 text-[#d8bc7a]">
          <span className="h-px w-10 bg-[#d8bc7a]/70" />
          <Flower2 className="h-4 w-4" />
        </div>
        <p className="font-serif text-xl">{messages.home.heroCraftOfIndia}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#d8bc7a]">
          {messages.home.heroCraftJourney}
        </p>
      </div>
    </section>
  );
}