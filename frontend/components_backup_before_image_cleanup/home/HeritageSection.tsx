import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function HeritageSection() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="kalakriti-container px-4">
        <div className="grid gap-10 overflow-hidden rounded-card border border-gold bg-cream p-6 md:grid-cols-2 md:p-10">
          <div className="flex min-h-[360px] items-center justify-center rounded border border-gold/50 bg-parchment">
            <div className="text-center">
              <Map className="mx-auto h-20 w-20 text-maroon" strokeWidth={1} />
              <p className="mt-5 font-serif text-2xl font-semibold text-deep-maroon">
                India&apos;s Craft Map
              </p>
              <p className="mt-2 text-sm text-muted">
                From Kashmir to Kanyakumari, craft lives in every region.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Craft across India
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
              One country.
              <span className="block text-maroon">Countless traditions.</span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-brown md:text-base">
              India&apos;s craft heritage is woven into its landscapes,
              communities, festivals, architecture, clothing, and everyday
              life.
            </p>

            <Link
              href="/craft-heritage"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white hover:bg-maroon-light"
            >
              Explore India&apos;s craft heritage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
