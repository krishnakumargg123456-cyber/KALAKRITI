import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-parchment">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-gold/40" />
        <div className="absolute -left-16 top-24 h-56 w-56 rounded-full border border-gold/30" />
        <div className="absolute right-[-100px] bottom-[-100px] h-96 w-96 rounded-full border border-maroon/20" />
      </div>

      <div className="kalakriti-container relative grid min-h-[620px] items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Sparkles className="h-4 w-4" />
            India&apos;s Living Craft Heritage
          </div>

          <h1 className="font-serif text-5xl font-bold leading-[1.05] text-deep-maroon md:text-6xl lg:text-7xl">
            Crafted by hands.
            <span className="mt-2 block text-maroon">
              Carried through generations.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-brown md:text-lg">
            Discover authentic Indian handicrafts shaped by tradition,
            patience, and generations of artisan knowledge.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-light"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/craft-heritage"
              className="inline-flex items-center gap-2 rounded-card border border-gold bg-transparent px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-gold/10"
            >
              Explore Craft Heritage
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-gold bg-cream shadow-elevated">
            <div className="absolute inset-5 rounded-[1.5rem] border border-gold/60" />

            <div className="flex h-full flex-col items-center justify-center px-10 text-center">
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold bg-parchment">
                <span className="font-serif text-5xl text-maroon">?</span>
              </div>

              <p className="font-serif text-3xl font-semibold text-deep-maroon">
                Made by Hand
              </p>

              <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                Every piece carries the character of the hand that created it.
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Kalakriti
                <span className="h-px w-10 bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
