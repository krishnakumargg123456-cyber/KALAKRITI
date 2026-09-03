"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react";

const articles = [
  {
    slug: "story-of-indian-handicrafts",
    title: "The Living Story of Indian Handicrafts",
    excerpt:
      "Discover how India's traditional crafts carry generations of knowledge, identity, and artistic expression.",
    category: "Heritage",
    date: "August 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "meet-the-artisans",
    title: "Meet the Hands Behind the Craft",
    excerpt:
      "Step into the world of India's artisans and discover the patience, skill, and stories behind every handmade creation.",
    category: "Artisans",
    date: "August 21, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "crafts-of-rajasthan",
    title: "A Journey Through the Crafts of Rajasthan",
    excerpt:
      "From intricate block printing to timeless blue pottery, explore the remarkable craft traditions of Rajasthan.",
    category: "Craft Trails",
    date: "August 14, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "madhubani-art",
    title: "Madhubani: Stories Painted on Every Surface",
    excerpt:
      "Learn about the symbolism, colours, and storytelling traditions that make Madhubani art so distinctive.",
    category: "Art & Culture",
    date: "August 07, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "care-for-handmade-products",
    title: "How to Care for Your Handmade Treasures",
    excerpt:
      "Simple and practical ways to preserve the beauty and character of your handcrafted KALAKRITI pieces.",
    category: "Care Guide",
    date: "July 30, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "why-handmade-matters",
    title: "Why Handmade Still Matters",
    excerpt:
      "In a world of mass production, discover why choosing handmade keeps communities, skills, and traditions alive.",
    category: "Our Philosophy",
    date: "July 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1200&q=85",
  },
];

const categories = [
  "All Stories",
  "Heritage",
  "Artisans",
  "Craft Trails",
  "Art & Culture",
  "Care Guide",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#8b1e2d_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#b08a4a_1px,transparent_1px)] bg-[length:28px_28px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3 text-[#8b1e2d]">
              <span className="h-px w-12 bg-[#b08a4a]" />
              <BookOpen className="h-5 w-5" />
              <span className="h-px w-12 bg-[#b08a4a]" />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b1e2d]">
              The KALAKRITI Journal
            </p>

            <h1 className="font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
              Stories of Craft,
              <span className="block italic text-[#8b1e2d]">
                Culture & People
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6d5149] sm:text-lg">
              Travel through India&apos;s rich craft traditions, meet the artisans
              who keep them alive, and discover the stories woven into every
              handmade creation.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-[#b08a4a]/25 bg-[#efe4ce]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-8 lg:px-12">
          <div className="flex min-w-max items-center justify-center gap-2 py-5">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#8b1e2d] text-[#fff8eb] shadow-sm"
                    : "text-[#65443c] hover:bg-[#f7f0df] hover:text-[#8b1e2d]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Featured Story
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              From the Heart of India
            </h2>
          </div>

          <Link
            href="/our-story"
            className="hidden items-center gap-2 text-sm font-semibold text-[#8b1e2d] transition hover:gap-3 sm:flex"
          >
            Our Story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <article className="grid overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] shadow-[0_12px_40px_rgba(67,35,25,0.08)] lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[470px]">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#301512]/40 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <span className="w-fit rounded-full bg-[#8b1e2d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
              {articles[0].category}
            </span>

            <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[#4a211c] sm:text-4xl">
              {articles[0].title}
            </h3>

            <p className="mt-5 leading-7 text-[#6d5149]">
              {articles[0].excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-[#80665d]">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {articles[0].date}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {articles[0].readTime}
              </span>
            </div>

            <Link
              href={`/blog/${articles[0].slug}`}
              className="mt-8 flex w-fit items-center gap-2 border-b-2 border-[#8b1e2d] pb-1 text-sm font-bold text-[#8b1e2d] transition hover:gap-3"
            >
              Read the Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      {/* Article Grid */}
      <section className="border-t border-[#b08a4a]/25 bg-[#efe4ce]/45">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Explore the Journal
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              More Stories
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1).map((article) => (
              <article
                key={article.slug}
                className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(67,35,25,0.1)]"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-[#f7f0df]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-[#80665d]">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                      {article.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6d5149]">
                      {article.excerpt}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#8b1e2d]">
                      Read More
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/40 bg-[#8b1e2d] px-7 py-12 text-center sm:px-12">
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border-[30px] border-[#d5b56a]" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[30px] border-[#d5b56a]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              Stay Connected
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
              Stories from India&apos;s Craft Heritage
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#f4dfc4] sm:text-base">
              Receive new artisan stories, craft discoveries, cultural
              journeys, and thoughtful guides from KALAKRITI.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="min-h-12 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-[#f4dfc4]/70 focus:border-[#e5c98b] focus:ring-1 focus:ring-[#e5c98b]"
              />

              <button
                type="submit"
                className="min-h-12 rounded-lg bg-[#e5c98b] px-7 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Heritage Line */}
      <div className="border-t border-[#b08a4a]/30 bg-[#efe4ce]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-6 text-center">
          <span className="h-px w-16 bg-[#b08a4a]" />
          <p className="font-serif text-sm italic text-[#6d5149]">
            Made by hands. Carried by generations. Celebrated by KALAKRITI.
          </p>
          <span className="h-px w-16 bg-[#b08a4a]" />
        </div>
      </div>
    </main>
  );
}
