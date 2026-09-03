import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Flower2,
  Palette,
  Hand,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gold/50 bg-parchment">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full border border-gold/40" />
        <div className="absolute -left-16 top-24 h-56 w-56 rounded-full border border-gold/30" />
        <div className="absolute left-20 top-40 h-24 w-24 rounded-full border border-maroon/20" />
        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full border border-maroon/20" />
        <div className="absolute right-10 top-16 h-40 w-40 rounded-full border border-gold/30" />
        <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gold/30" />
      </div>

      <div className="kalakriti-container relative grid min-h-[680px] items-center gap-14 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/60 bg-cream/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold shadow-soft">
            <Sparkles className="h-4 w-4" />
            India&apos;s Living Craft Heritage
          </div>

          <h1 className="font-serif text-5xl font-bold leading-[1.04] text-deep-maroon md:text-6xl lg:text-7xl">
            Crafted by hands.
            <span className="mt-3 block text-maroon">
              Carried through generations.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-brown md:text-lg">
            Discover authentic Indian handicrafts shaped by tradition,
            patience, and generations of artisan knowledge.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-card bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-maroon-light hover:shadow-card"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/craft-heritage"
              className="inline-flex items-center gap-2 rounded-card border border-gold bg-cream/50 px-7 py-3.5 text-sm font-semibold text-maroon transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10"
            >
              Explore Craft Heritage
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-gold/40 pt-7">
            <div>
              <p className="font-serif text-2xl font-bold text-deep-maroon">
                100%
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Handcrafted
              </p>
            </div>

            <div className="border-x border-gold/30 px-4">
              <p className="font-serif text-2xl font-bold text-deep-maroon">
                India
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Rooted in heritage
              </p>
            </div>

            <div>
              <p className="font-serif text-2xl font-bold text-deep-maroon">
                Generations
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                Artisan knowledge
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[2.5rem] border border-gold/30" />
          <div className="absolute -inset-10 rounded-[3rem] border border-maroon/10" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-gold bg-cream shadow-elevated">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/home/hero-potter.jpg')",
              }}
            />

            <div className="absolute left-1/2 top-[66%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50" />
            <div className="absolute left-1/2 top-[66%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-maroon/25" />
            <div className="absolute left-1/2 top-[66%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60" />

            <div className="absolute left-6 top-16 flex h-10 w-10 rotate-45 items-center justify-center border border-gold/50 bg-cream/70">
              <Flower2 className="h-5 w-5 -rotate-45 text-maroon/80" />
            </div>

            <div className="absolute right-6 top-16 flex h-10 w-10 -rotate-45 items-center justify-center border border-gold/50 bg-cream/70">
              <Palette className="h-5 w-5 rotate-45 text-maroon/80" />
            </div>

            <div className="absolute bottom-20 left-6 flex h-10 w-10 -rotate-45 items-center justify-center border border-gold/50 bg-cream/70">
              <Hand className="h-5 w-5 rotate-45 text-maroon/80" />
            </div>

            <div className="absolute bottom-20 right-6 flex h-10 w-10 rotate-45 items-center justify-center border border-gold/50 bg-cream/70">
              <Flower2 className="h-5 w-5 -rotate-45 text-maroon/80" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-gold/50 bg-cream/95 px-7 py-6 text-center backdrop-blur-sm">
              <p className="font-serif text-2xl font-semibold text-deep-maroon">
                Made by Hand
              </p>

              <p className="mt-2 text-sm leading-6 text-muted">
                Every piece carries the character of the hand that created it.
              </p>

              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                <span className="h-px w-8 bg-gold" />
                Kalakriti
                <span className="h-px w-8 bg-gold" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 hidden rounded-card border border-gold bg-paper px-5 py-4 shadow-card sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              The craft of India
            </p>
            <p className="mt-1 font-serif text-base font-semibold text-deep-maroon">
              Tradition • Skill • Story
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
