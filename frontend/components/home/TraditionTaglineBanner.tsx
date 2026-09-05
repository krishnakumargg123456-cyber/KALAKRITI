"use client";

import { useI18n } from "@/lib/i18n/context";
import { Flower2, Sparkles } from "lucide-react";

export default function TraditionTaglineBanner() {
  const { messages } = useI18n();
  return (
    <section className="relative overflow-hidden border-y border-gold bg-maroon py-12 text-center text-white md:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-[-80px] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-gold-light" />
        <div className="absolute right-[-80px] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-gold-light" />

        <div className="absolute left-8 top-8 h-12 w-12 rotate-45 border border-gold-light/60 md:left-16" />
        <div className="absolute right-8 bottom-8 h-12 w-12 rotate-45 border border-gold-light/60 md:right-16" />
      </div>

      <div className="kalakriti-container relative px-4">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gold-light/70 sm:block md:w-24" />

          <Flower2
            className="h-6 w-6 shrink-0 text-gold-light"
            strokeWidth={1.2}
          />

          <p className="font-serif text-2xl italic leading-relaxed md:text-3xl lg:text-4xl">
            &ldquo;Not just something you buy.
            <span className="text-gold-light">
              {" "}Something you carry forward.&rdquo;
            </span>
          </p>

          <Flower2
            className="h-6 w-6 shrink-0 text-gold-light"
            strokeWidth={1.2}
          />

          <span className="hidden h-px w-16 bg-gold-light/70 sm:block md:w-24" />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-light/90 md:text-[10px]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{messages.home.taglineValues}</span>
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      </div>
    </section>
  );
}

