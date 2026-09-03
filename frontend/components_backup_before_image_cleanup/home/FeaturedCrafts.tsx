import Link from "next/link";
import { ArrowRight } from "lucide-react";

const crafts = [
  {
    name: "Madhubani",
    region: "Bihar",
    description: "Storytelling through intricate lines and vivid folk motifs.",
    symbol: "?",
  },
  {
    name: "Blue Pottery",
    region: "Rajasthan",
    description: "Delicate handcrafted ceramics with a distinctive blue palette.",
    symbol: "??",
  },
  {
    name: "Dhokra",
    region: "Chhattisgarh",
    description: "Ancient lost-wax metal craft shaped by generations of artisans.",
    symbol: "??",
  },
  {
    name: "Banarasi Weaving",
    region: "Uttar Pradesh",
    description: "Timeless textiles woven with heritage, detail, and patience.",
    symbol: "?",
  },
];

export default function FeaturedCrafts() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="kalakriti-container px-4">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Discover the traditions
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
              Featured Craft Traditions
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
              Explore India&apos;s diverse craft traditions and the communities
              that have kept them alive across generations.
            </p>
          </div>

          <Link
            href="/craft-heritage"
            className="inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:text-maroon-light"
          >
            View all traditions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {crafts.map((craft) => (
            <Link
              key={craft.name}
              href="/craft-heritage"
              className="group overflow-hidden rounded-card border border-border bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-parchment">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold bg-cream font-serif text-4xl text-maroon transition-transform duration-300 group-hover:scale-105">
                  {craft.symbol}
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {craft.region}
                </p>

                <h3 className="mt-2 font-serif text-xl font-semibold text-deep-maroon">
                  {craft.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {craft.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
