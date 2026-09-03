
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Leaf,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Craft with Soul",
    description:
      "Every KALAKRITI piece carries the patience, skill and personal story of the artisan who created it.",
  },
  {
    icon: Users,
    title: "Artisan First",
    description:
      "We believe India's craft communities should receive recognition, dignity and meaningful economic opportunity.",
  },
  {
    icon: Leaf,
    title: "Rooted & Responsible",
    description:
      "We celebrate traditional materials, thoughtful production and craft practices that respect their cultural roots.",
  },
  {
    icon: Sparkles,
    title: "Heritage for Today",
    description:
      "Ancient techniques deserve a place in contemporary homes, wardrobes and everyday life.",
  },
];

const milestones = [
  {
    year: "01",
    title: "Discover",
    text: "We travel through India's diverse craft traditions to discover remarkable makers and their stories.",
  },
  {
    year: "02",
    title: "Connect",
    text: "We build meaningful relationships with artisan communities and understand their craft at its source.",
  },
  {
    year: "03",
    title: "Preserve",
    text: "We help traditional techniques remain relevant by bringing their authentic work to new audiences.",
  },
  {
    year: "04",
    title: "Celebrate",
    text: "Every purchase becomes a small celebration of India's living cultural heritage.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d241b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b99a61]/30">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full border-[18px] border-[#8b2635]" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full border-[22px] border-[#b08a45]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b2635]">
                <span className="h-px w-10 bg-[#b08a45]" />
                About KALAKRITI
              </div>

              <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-[#5c1f29] md:text-7xl">
                Where India&apos;s
                <span className="block italic text-[#a06f32]">
                  living traditions
                </span>
                find a new home.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#6b5044] md:text-lg">
                KALAKRITI is a celebration of Indian craftsmanship — a place
                where authentic handmade creations, the people behind them,
                and generations of cultural knowledge come together.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#7b2532] px-6 py-3 text-sm font-semibold text-[#fff8e8] transition hover:bg-[#5f1c27]"
                >
                  Explore the Collection
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/artisans"
                  className="inline-flex items-center gap-2 border border-[#8b2635]/40 px-6 py-3 text-sm font-semibold text-[#7b2532] transition hover:bg-[#eadfc9]"
                >
                  Meet Our Artisans
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-[#b08a45]/50 bg-[#eadfc9] shadow-[12px_12px_0_#d7c4a1]">
                <img
                  src="/images/about/about-hero.jpg"
                  alt="Indian artisan creating traditional handicraft"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-5 bottom-5 border border-[#f7f0df]/60 bg-[#3d241b]/85 p-5 text-[#fff8e8] backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#e4c989]">
                    Our belief
                  </p>

                  <p className="mt-2 font-serif text-xl">
                    Handmade is not merely made by hand. It is made with
                    heritage.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-full border-8 border-[#a06f32]/30 md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
        <div className="mx-auto mb-6 flex items-center justify-center gap-4 text-[#a06f32]">
          <span className="h-px w-16 bg-[#b08a45]/60" />
          <Sparkles size={18} />
          <span className="h-px w-16 bg-[#b08a45]/60" />
        </div>

        <h2 className="font-serif text-4xl leading-tight text-[#5c1f29] md:text-5xl">
          More than a marketplace.
        </h2>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-9 text-[#6b5044]">
          KALAKRITI exists to make Indian handicrafts easier to discover while
          keeping the people, places and traditions behind them at the heart
          of the experience.
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#765d50]">
          From a hand-painted surface in Rajasthan to a carefully woven textile
          in the Northeast, India&apos;s craft landscape is extraordinarily
          diverse. We want every object to be understood not just as a
          product, but as a piece of cultural memory.
        </p>
      </section>

      {/* Values */}
      <section className="border-y border-[#b99a61]/30 bg-[#efe5d0]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b2635]">
              What guides us
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#5c1f29] md:text-5xl">
              Our values are rooted in the craft itself.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="border border-[#b99a61]/40 bg-[#f8f1e2] p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#b08a45]/50 text-[#8b2635]">
                    <Icon size={21} strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-2xl text-[#5c1f29]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6f574b]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage statement */}
      <section className="relative overflow-hidden bg-[#6e2430] text-[#fff7e6]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[40px] border-[#e4c989]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <MapPin
            className="mx-auto mb-6 text-[#e4c989]"
            size={28}
            strokeWidth={1.4}
          />

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e4c989]">
            From every corner of India
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
            Every region has a story.
            <br />
            Every craft has a voice.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#f3e5cb]/85 md:text-lg">
            Our journey is about connecting people with those stories and
            creating a future where traditional craftsmanship continues to
            thrive.
          </p>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b2635]">
              Our journey
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#5c1f29] md:text-5xl">
              From the hands of makers to the hands of you.
            </h2>

            <p className="mt-6 max-w-md leading-8 text-[#6f574b]">
              We are building a bridge between India&apos;s artisan communities
              and people who value objects with meaning, character and history.
            </p>
          </div>

          <div className="space-y-0">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-[55px_1fr] gap-5 border-b border-[#b99a61]/35 py-7 first:border-t"
              >
                <div className="font-serif text-2xl text-[#a06f32]">
                  {item.year}
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#5c1f29]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-7 text-[#6f574b]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[#b99a61]/30 bg-[#e9dcc4]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#b08a45]/60 text-[#8b2635]">
            <Heart size={23} />
          </div>

          <h2 className="mt-6 font-serif text-4xl text-[#5c1f29] md:text-5xl">
            Let&apos;s keep the tradition alive.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6f574b]">
            Discover authentic Indian crafts, learn the stories behind them,
            and become part of a movement that celebrates the hands that keep
            our heritage alive.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#7b2532] px-7 py-3.5 text-sm font-semibold text-[#fff8e8] transition hover:bg-[#5f1c27]"
            >
              Explore KALAKRITI
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/craft-heritage"
              className="inline-flex items-center gap-2 border border-[#7b2532]/40 px-7 py-3.5 text-sm font-semibold text-[#7b2532] transition hover:bg-[#f4ead7]"
            >
              Explore Craft Heritage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

