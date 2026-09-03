import Link from "next/link";

const posts = [
  {
    slug: "story-behind-indian-handicrafts",
    title: "The Story Behind India's Living Handicrafts",
    excerpt:
      "Discover the people, traditions and techniques that keep India's craft heritage alive.",
    category: "Craft Heritage",
    date: "September 2, 2026",
  },
  {
    slug: "meet-the-artisans",
    title: "Meet the Hands Behind Every Creation",
    excerpt:
      "A closer look at the skilled artisans whose knowledge travels from one generation to the next.",
    category: "Artisans",
    date: "August 28, 2026",
  },
  {
    slug: "understanding-handmade-craft",
    title: "Why Handmade Craft Matters",
    excerpt:
      "Learn why handmade objects carry a story, a tradition and a human touch that mass production cannot replace.",
    category: "Learning",
    date: "August 20, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-16 text-center md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Journal of Living Heritage
          </p>

          <h1 className="font-serif text-4xl font-bold text-maroon md:text-5xl">
            Kalakriti Journal
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brown md:text-base">
            Stories of Indian crafts, artisans, traditions and the cultural
            journeys behind the objects we bring into our homes.
          </p>
        </div>
      </section>

      <section className="kalakriti-container px-4 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col border border-border bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {post.category}
              </span>

              <h2 className="mt-4 font-serif text-2xl font-bold text-maroon">
                {post.title}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-7 text-brown">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-brown">{post.date}</span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-maroon hover:text-gold"
                >
                  Read Story →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}