"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function ArtisanStory() {
  const { messages } = useI18n();

  return (
    <section className="relative overflow-hidden bg-[#fbf7ee] py-24 md:py-32">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 opacity-30">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#b08d57]/30" />
        <div className="absolute -left-20 top-40 h-48 w-48 rounded-full border border-[#641f20]/15" />
      </div>

      <div className="kalakriti-container relative px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div className="relative">
            <div className="absolute -inset-5 border border-[#b08d57]/30" />

            <div className="relative aspect-[4/5] overflow-hidden border border-[#b08d57] bg-[#f4ead8] p-3 shadow-[0_20px_60px_rgba(69,21,23,0.10)] sm:aspect-[5/4]">
              <div className="relative h-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('/images/home/artisan-ceramic.jpg')",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2b211d]/65 via-transparent to-[#2b211d]/5" />

                <div className="absolute left-5 top-5 border border-[#d8bc7a]/70 bg-[#fffaf0]/90 px-4 py-2">
                  <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#641f20]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {messages.artisan.livingTradition}
                  </p>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8bc7a]">
                    {messages.home.handsBehindCraft}
                  </p>

                  <p className="mt-2 font-serif text-2xl text-[#fffaf0] md:text-3xl">
                    {messages.home.skillThroughGenerations}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-3 border border-[#b08d57]/60 bg-[#fffaf0] px-5 py-4 shadow-[0_12px_35px_rgba(69,21,23,0.10)] sm:-right-5">
              <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b08d57]">
                <Heart className="h-3.5 w-3.5" />
                {messages.home.madeWithPatience}
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="kalakriti-eyebrow">
              {messages.home.meetTheMakers}
            </p>

            <h2 className="kalakriti-heading mt-4 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              {messages.home.artisanHeartTitle}
            </h2>

            <div className="mt-6 h-px w-16 bg-[#b08d57]" />

            <p className="mt-7 text-base leading-8 text-[#4f423b]">
              {messages.home.artisanStoryPrimary}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#75665b]">
              {messages.home.artisanStorySecondary}
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="border-t border-[#b08d57]/40 pt-4">
                <Users className="h-5 w-5 text-[#641f20]" />
                <p className="mt-3 font-serif text-lg text-[#641f20]">
                  {messages.home.artisanLabel}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#75665b]">
                  {messages.home.artisanDescription}
                </p>
              </div>

              <div className="border-t border-[#b08d57]/40 pt-4">
                <MapPin className="h-5 w-5 text-[#641f20]" />
                <p className="mt-3 font-serif text-lg text-[#641f20]">
                  {messages.home.placeLabel}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#75665b]">
                  {messages.home.placeDescription}
                </p>
              </div>

              <div className="border-t border-[#b08d57]/40 pt-4">
                <Sparkles className="h-5 w-5 text-[#641f20]" />
                <p className="mt-3 font-serif text-lg text-[#641f20]">
                  {messages.home.craftLabel}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#75665b]">
                  {messages.home.craftDescription}
                </p>
              </div>
            </div>

            <Link
              href="/artisans"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#641f20] pb-2 text-sm font-semibold text-[#641f20] transition-colors hover:text-[#a85f45]"
            >
              {messages.home.meetArtisans}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}