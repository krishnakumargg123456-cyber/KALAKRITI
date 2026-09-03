"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  MapPin,
} from "lucide-react";

type Story = {
  slug: string;
  title: string;
  excerpt: string;
  artisan: string;
  location: string;
  craft: string;
  date: string;
  image: string;
};

const stories: Story[] = [
  {
    slug: "hands-of-madhubani",
    title: "The Hands Behind Madhubani",
    excerpt:
      "How an ancient painting tradition continues through the women who paint its stories.",
    artisan: "Sita Devi",
    location: "Madhubani, Bihar",
    craft: "Madhubani Painting",
    date: "August 18, 2026",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "threads-of-kutch",
    title: "Threads of Kutch",
    excerpt:
      "Inside the colourful embroidery traditions of Gujarat&apos;s artisan communities.",
    artisan: "Meera Ben",
    location: "Kutch, Gujarat",
    craft: "Kutch Embroidery",
    date: "August 10, 2026",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "the-blue-pottery-tradition",
    title: "The Blue Pottery Tradition",
    excerpt:
      "A closer look at Jaipur&apos;s distinctive craft and the artisans keeping it alive.",
    artisan: "Mohan Kumar",
    location: "Jaipur, Rajasthan",
    craft: "Blue Pottery",
    date: "August 2, 2026",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "warli-stories",
    title: "Stories in Simple Lines",
    excerpt:
      "How Warli artists turn everyday life, nature and community into timeless visual stories.",
    artisan: "Savita Pawar",
    location: "Palghar, Maharashtra",
    craft: "Warli Painting",
    date: "July 25, 2026",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "woven-in-banaras",
    title: "Woven in Banaras",
    excerpt:
      "Inside the patient rhythm of the handloom and the legacy of Banarasi weaving.",
    artisan: "Arvind Kumar",
    location: "Varanasi, Uttar Pradesh",
    craft: "Banarasi Weaving",
    date: "July 16, 2026",
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "metal-that-remembers",
    title: "Metal That Remembers",
    excerpt:
      "The enduring story of Dokra metalwork and the communities preserving its ancient technique.",
    artisan: "Bela Devi",
    location: "Bastar, Chhattisgarh",
    craft: "Dokra Metal Craft",
    date: "July 8, 2026",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function StoriesPage() {
  const featured = stories[0];
  const remaining = stories.slice(1);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="font-semibold text-[#4a211c]">
              Artisan Stories
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-12 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
            The KALAKRITI Journal
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-semibold text-[#fff8eb] sm:text-6xl">
            Stories Behind the Craft
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
            Meet the artisans, explore their traditions and discover the human
            stories behind India&apos;s handmade heritage.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Featured story */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
            Featured Story
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9]">
            <div className="grid lg:grid-cols-2">
              <Link
                href={`/stories/${featured.slug}`}
                className="group relative min-h-[330px] overflow-hidden lg:min-h-[480px]"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <span className="w-fit rounded-full bg-[#efe4ce] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  {featured.craft}
                </span>

                <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl">
                  {featured.title}
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#6d5149] sm:text-base">
                  {featured.excerpt}
                </p>

                <div className="mt-6 space-y-2 text-xs text-[#80665d]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#8b1e2d]" />
                    {featured.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#8b1e2d]" />
                    {featured.date}
                  </div>
                </div>

                <Link
                  href={`/stories/${featured.slug}`}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
                >
                  Read the Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story grid */}
        <section className="mt-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
                From the Journal
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
                More stories from India&apos;s craft communities
              </h2>
            </div>

            <span className="text-sm text-[#80665d]">
              {stories.length} stories
            </span>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remaining.map((story) => (
              <article
                key={story.slug}
                className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(67,35,25,0.08)]"
              >
                <Link
                  href={`/stories/${story.slug}`}
                  className="block overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#efe4ce]">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                      {story.craft}
                    </span>

                    <span className="text-[10px] text-[#80665d]">
                      {story.date}
                    </span>
                  </div>

                  <Link href={`/stories/${story.slug}`}>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-8 text-[#4a211c] group-hover:text-[#8b1e2d]">
                      {story.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                    {story.excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-[#80665d]">
                    <MapPin className="h-3.5 w-3.5 text-[#8b1e2d]" />
                    {story.location}
                  </div>

                  <p className="mt-1 text-xs font-semibold text-[#4a211c]">
                    By {story.artisan}
                  </p>

                  <Link
                    href={`/stories/${story.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]"
                  >
                    Read story
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Artisan CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl bg-[#8b1e2d]">
          <div className="px-7 py-10 text-center sm:px-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e5c98b]">
              Behind Every Piece
            </p>

            <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
              The real story begins with the artisan.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#f1dfc9]">
              Discover the makers whose knowledge, patience and imagination
              keep India&apos;s craft traditions alive.
            </p>

            <Link
              href="/artisans"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Meet Our Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}