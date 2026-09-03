import Link from "next/link";
import {
  ArrowRight,
  Brush,
  CircleDot,
  Gem,
  Layers3,
} from "lucide-react";

const crafts = [
  {
    name: "Madhubani",
    region: "Bihar",
    description:
      "Storytelling through intricate lines, symbolic figures, and vivid folk motifs.",
    icon: Brush,
    accent: "bg-[#E8C6A8]",
    pattern: "Madhubani",
  },
  {
    name: "Blue Pottery",
    region: "Rajasthan",
    description:
      "Delicate handcrafted ceramics known for their distinctive blue floral patterns.",
    icon: CircleDot,
    accent: "bg-[#C8D8D9]",
    pattern: "Blue Pottery",
  },
  {
    name: "Dhokra",
    region: "Chhattisgarh",
    description:
      "Ancient lost-wax metal craft shaped by generations of skilled tribal artisans.",
    icon: Gem,
    accent: "bg-[#D5C09A]",
    pattern: "Dhokra",
  },
  {
    name: "Banarasi Weaving",
    region: "Uttar Pradesh",
    description:
      "Timeless textiles woven with intricate motifs, rich detail, and patience.",
    icon: Layers3,
    accent: "bg-[#D8B5B8]",
    pattern: "Banarasi",
  },
];

function CraftArtwork({
  icon: Icon,
  accent,
  pattern,
}: {
  icon: typeof Brush;
  accent: string;
  pattern: string;
}) {
  return (
    <div
      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          pattern === "Madhubani"
            ? "url('/images/home/madhubani.jpg')"
            : pattern === "Blue Pottery"
              ? "url('/images/home/blue-pottery.jpg')"
              : pattern === "Dhokra"
                ? "url('/images/home/dhokra.jpg')"
                : "url('/images/home/banarasi.jpg')",
      }}
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full border border-gold" />
        <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full border border-maroon/30" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-maroon/20" />
      </div>      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 bg-cream/80 shadow-soft">
        <div className="h-6 w-6 rounded-full border border-maroon/20" />
      </div>
<div className="absolute left-5 top-5 rounded-full border border-gold/70 bg-cream/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-maroon">
        {pattern}
      </div>

      <div className="absolute bottom-5 right-5 h-3 w-3 rounded-full border border-gold bg-cream" />
      <div className="absolute bottom-8 right-8 h-1.5 w-1.5 rounded-full bg-maroon/50" />
    </div>
  );
}

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
            className="inline-flex items-center gap-2 text-sm font-semibold text-maroon transition-colors hover:text-maroon-light"
          >
            View all traditions
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {crafts.map((craft) => {
            const Icon = craft.icon;

            return (
              <Link
                key={craft.name}
                href={`/craft-heritage/${craft.pattern === "Madhubani" ? "madhubani-painting" : craft.pattern === "Blue Pottery" ? "blue-pottery" : craft.pattern === "Dhokra" ? "dhokra" : "banarasi-weaving"}`}
                className="group overflow-hidden rounded-card border border-border bg-cream transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-card"
              >
                <CraftArtwork
                  icon={Icon}
                  accent={craft.accent}
                  pattern={craft.pattern}
                />

                <div className="border-t border-gold/30 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {craft.region}
                    </p>

                    <ArrowRight className="h-4 w-4 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>

                  <h3 className="mt-2 font-serif text-xl font-semibold text-deep-maroon">
                    {craft.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {craft.description}
                  </p>

                  <div className="mt-5 h-px w-10 bg-gold transition-all duration-300 group-hover:w-16" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-16 bg-gold/50" />
          Crafted across India
          <span className="h-px w-16 bg-gold/50" />
        </div>
      </div>
    </section>
  );
}







