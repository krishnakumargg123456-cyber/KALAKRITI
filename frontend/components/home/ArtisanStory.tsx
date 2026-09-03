import Link from "next/link";
import {
  ArrowRight,
  Hammer,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

export default function ArtisanStory() {
  return (
    <section className="relative overflow-hidden bg-parchment py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full border border-gold/40" />
        <div className="absolute right-[-100px] bottom-[-120px] h-96 w-96 rounded-full border border-maroon/20" />
      </div>

      <div className="kalakriti-container relative grid gap-14 px-4 md:grid-cols-2 md:items-center">
        {/* Artisan visual */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rounded-card border border-gold/30" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-card border-2 border-gold bg-cream p-5 shadow-elevated">
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded border border-gold/60 bg-cover bg-center">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/home/artisan-ceramic.jpg')",
                }}
              />

              <div className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-cream/90 px-3 py-2 shadow-soft">
                <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-maroon">
                  <Sparkles className="h-3 w-3" />
                  Tradition
                </p>
              </div>

              <div className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-cream/90 px-3 py-2 shadow-soft">
                <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-maroon">
                  <Heart className="h-3 w-3" />
                  Passion
                </p>
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-gold/60 bg-cream/95 px-5 py-2">
                <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
                  <Users className="h-3 w-3" />
                  Generations of skill
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-3 rounded-card border border-gold bg-paper px-5 py-4 shadow-soft">
            <p className="font-serif text-sm italic text-maroon">
              Every craft has a story.
            </p>
          </div>
        </div>

        {/* Story */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Meet the makers
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-5xl">
            The artisan is the heart of every creation.
          </h2>

          <p className="mt-6 text-base leading-7 text-brown">
            Behind every handcrafted object is a person, a family, a village,
            and a tradition. Kalakriti brings those stories closer to you.
          </p>

          <p className="mt-4 text-sm leading-6 text-muted">
            We believe authentic craft should celebrate both the object and
            the artisan whose knowledge makes it possible.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-card border border-gold/40 bg-cream/70 p-4">
              <p className="font-serif text-lg font-semibold text-deep-maroon">
                Skill
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Techniques passed from one generation to another.
              </p>
            </div>

            <div className="rounded-card border border-gold/40 bg-cream/70 p-4">
              <p className="font-serif text-lg font-semibold text-deep-maroon">
                Story
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Every creation carries the identity of its maker.
              </p>
            </div>
          </div>

          <Link
            href="/artisans"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-maroon transition-colors hover:text-maroon-light"
          >
            Meet our artisans
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
