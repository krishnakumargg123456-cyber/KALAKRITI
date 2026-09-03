import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Map,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Craft with Soul",
    text: "We celebrate handmade work where every mark, texture and detail carries the artisan's touch.",
  },
  {
    icon: Users,
    title: "Artisan First",
    text: "KALAKRITI exists to create meaningful visibility and opportunities for India's artisan communities.",
  },
  {
    icon: Map,
    title: "India's Heritage",
    text: "From villages and towns to regional craft clusters, every creation connects us to a place and its traditions.",
  },
  {
    icon: Sparkles,
    title: "Timeless Design",
    text: "We bring traditional craftsmanship into contemporary homes without losing its cultural identity.",
  },
];

const journey = [
  {
    year: "ROOTS",
    title: "India's Living Craft Heritage",
    text: "For generations, Indian artisans have transformed local materials, stories and techniques into objects of beauty and purpose.",
  },
  {
    year: "VISION",
    title: "A Marketplace with Meaning",
    text: "KALAKRITI was imagined as a bridge between traditional makers and people who value authentic handmade craftsmanship.",
  },
  {
    year: "COMMUNITY",
    title: "Connecting Makers & Homes",
    text: "Our platform brings artisans, craft traditions and conscious customers together through one heritage-focused marketplace.",
  },
  {
    year: "FUTURE",
    title: "Keeping Tradition Alive",
    text: "We believe technology can help traditional crafts reach new audiences while keeping the artisan and the story at the centre.",
  },
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="border-b border-deep-maroon/10 bg-[#f3e7d2]">
        <div className="kalakriti-container px-4 py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-deep-maroon hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mx-auto mt-12 max-w-5xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              The KALAKRITI Story
            </p>

            <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-deep-maroon md:text-7xl">
              Where every craft
              <br />
              carries a story.
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-brown md:text-xl">
              KALAKRITI is a celebration of India&apos;s living craft heritage
              — a place where traditional artistry meets modern appreciation.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="kalakriti-container px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Our Beginning
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-5xl">
              A marketplace inspired by India&apos;s hands
            </h2>

            <div className="mt-7 space-y-5 leading-8 text-brown">
              <p>
                India&apos;s craft traditions are shaped by generations of
                knowledge. A loom, a brush, a chisel, a needle or a potter&apos;s
                wheel can become a way of preserving culture.
              </p>

              <p>
                KALAKRITI was created with a simple belief: handmade products
                should not be separated from the people, places and traditions
                that make them special.
              </p>

              <p>
                Our goal is to build a digital home for authentic Indian
                craftsmanship where customers can discover products while
                understanding the heritage behind them.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-gold/40 bg-[#ead9bd] p-4 shadow-sm">
              <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-deep-maroon/10 bg-[#f6eedf] p-8 text-center">
                <div>
                  <p className="font-serif text-6xl text-deep-maroon/20">
                    ???????
                  </p>

                  <p className="mt-5 font-serif text-3xl font-bold text-deep-maroon">
                    ??? • ????? • ??????
                  </p>

                  <p className="mt-4 max-w-sm leading-7 text-brown">
                    Art, craftsmanship and heritage — brought together through
                    the hands of Indian artisans.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 rounded-xl border border-gold/40 bg-deep-maroon px-5 py-3 font-serif text-sm text-cream shadow-md md:-left-5">
              Made in India • Made by Hand
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-deep-maroon/10 bg-deep-maroon">
        <div className="kalakriti-container px-4 py-16 text-center md:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Our Mission
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-3xl font-bold leading-tight text-cream md:text-5xl">
            To make India&apos;s traditional craftsmanship easier to discover,
            appreciate and bring home.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-cream/75">
            We want every purchase to become more than a transaction — a
            connection between the person who creates a craft and the person
            who chooses to preserve its story.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="kalakriti-container px-4 py-16 md:py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            What We Believe
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
            The values behind KALAKRITI
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-2xl border border-deep-maroon/10 bg-white p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e7d2] text-deep-maroon">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-brown">
                  {value.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-deep-maroon/10 bg-[#f7eddd]">
        <div className="kalakriti-container px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Our Journey
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
              From heritage to home
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            {journey.map((item, index) => (
              <div
                key={item.year}
                className="relative flex gap-6 pb-10 last:pb-0 md:gap-10"
              >
                {index !== journey.length - 1 && (
                  <div className="absolute left-[23px] top-12 h-full w-px bg-gold/40" />
                )}

                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-cream font-serif text-xs font-bold text-deep-maroon">
                  {index + 1}
                </div>

                <div className="rounded-2xl border border-deep-maroon/10 bg-white p-6 md:p-7">
                  <p className="text-xs font-bold tracking-[0.25em] text-gold">
                    {item.year}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-bold text-deep-maroon">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-brown">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft philosophy */}
      <section className="kalakriti-container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-gold/40 bg-[#f4e8d3] p-8 text-center md:p-14">
          <p className="font-serif text-5xl text-deep-maroon/20 md:text-7xl">
            ?
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-5xl">
            Every imperfection tells you it was made by a person.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-brown">
            Small differences in colour, texture, shape and finish are often
            part of the beauty of handmade work. They remind us that each
            creation has travelled through human hands rather than an
            anonymous production line.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-deep-maroon/10 bg-deep-maroon">
        <div className="kalakriti-container px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Discover the Heritage
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold text-cream md:text-5xl">
            Explore India&apos;s living crafts
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-cream/75">
            Discover handcrafted products, meet the artisans behind them and
            learn the stories of the traditions they preserve.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-8 py-3 font-semibold text-deep-maroon transition hover:opacity-90"
            >
              Explore Crafts
            </Link>

            <Link
              href="/craft-heritage"
              className="inline-flex items-center justify-center rounded-lg border border-cream/40 px-8 py-3 font-semibold text-cream transition hover:bg-cream hover:text-deep-maroon"
            >
              Craft Heritage
            </Link>

            <Link
              href="/artisans"
              className="inline-flex items-center justify-center rounded-lg border border-cream/40 px-8 py-3 font-semibold text-cream transition hover:bg-cream hover:text-deep-maroon"
            >
              Meet Artisans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
