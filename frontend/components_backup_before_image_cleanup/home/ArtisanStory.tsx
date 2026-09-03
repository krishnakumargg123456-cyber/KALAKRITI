import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArtisanStory() {
  return (
    <section className="bg-parchment py-20 md:py-24">
      <div className="kalakriti-container grid gap-12 px-4 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="aspect-[4/3] rounded-card border-2 border-gold bg-cream p-5 shadow-soft">
            <div className="flex h-full items-center justify-center rounded border border-gold/60 bg-paper">
              <div className="text-center">
                <div className="font-serif text-6xl text-maroon">?</div>
                <p className="mt-4 font-serif text-xl text-deep-maroon">
                  The hands behind the craft
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -right-3 hidden rounded-card border border-gold bg-paper px-5 py-4 shadow-soft sm:block">
            <p className="font-serif text-sm italic text-maroon">
              Every craft has a story.
            </p>
          </div>
        </div>

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

          <Link
            href="/artisans"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-light"
          >
            Meet our artisans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
