"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  BookOpen,
} from "lucide-react";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
};

const articles: Article[] = [
  {
    slug: "story-of-indian-handicrafts",
    title: "The Living Story of Indian Handicrafts",
    excerpt:
      "Discover how India's traditional crafts carry generations of knowledge, identity, and artistic expression.",
    category: "Heritage",
    date: "August 28, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Across India, craft is more than an object made by hand. It is a living expression of memory, community, place, and inherited knowledge. A woven textile, carved wooden object, painted surface, or carefully shaped metal piece can carry a story that began generations before it reached our homes.",
      "Indian handicrafts have evolved through centuries of regional traditions. Families and communities have preserved techniques by teaching younger generations through observation and practice. The knowledge is often deeply connected to local materials, climate, landscapes, festivals, and everyday life.",
      "What makes handmade craft remarkable is the relationship between the maker and the material. The artisan understands the texture of wood, the behaviour of natural fibres, the movement of a brush, or the temperature required to shape metal. These skills are developed slowly through patience and repeated practice.",
      "Today, traditional crafts continue to adapt while retaining their cultural character. Artisans experiment with new forms, contemporary colours, and modern applications while preserving techniques that define their communities.",
      "At KALAKRITI, we believe that choosing handmade is also a way of valuing the people and traditions behind an object. Every purchase can help keep specialised knowledge alive and create a meaningful connection between artisan and collector."
    ],
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
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Behind every handmade object is a person whose hands have learned to transform simple materials into something meaningful. Indian artisans often begin learning their craft at an early age, watching family members and gradually developing their own confidence and style.",
      "The making process can involve dozens of small decisions. An artisan chooses materials, prepares surfaces, mixes colours, shapes forms, and carefully checks the work at every stage. Small variations are not imperfections; they are evidence that the object was created by hand.",
      "Artisan communities also preserve stories about their regions. Their work reflects local festivals, architecture, landscapes, clothing, mythology, and everyday traditions.",
      "Supporting artisans means supporting more than individual makers. It contributes to workshops, families, local economies, and the continuation of specialised cultural knowledge.",
      "KALAKRITI exists to bring these stories closer to people who value authenticity, craftsmanship, and the human touch behind handmade objects."
    ],
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
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Rajasthan is a land where colour, pattern, architecture, and craft come together in extraordinary ways. Across its towns and villages, artisans continue traditions that have become closely associated with the visual identity of the region.",
      "Block printing is one of the most recognisable traditions. Wooden blocks are carefully carved and repeatedly stamped onto fabric, creating patterns through rhythm, precision, and patience.",
      "Blue pottery offers another distinctive expression. Its luminous surfaces and decorative motifs demonstrate how materials, technique, and regional aesthetics can create a craft tradition unlike any other.",
      "The beauty of Rajasthan's crafts lies not only in their appearance but also in the communities that continue to practise them. Each workshop represents accumulated knowledge passed from one generation to another.",
      "Exploring these traditions reminds us that India's craft heritage is not confined to museums. It remains part of living communities and contemporary homes."
    ],
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
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Madhubani art is celebrated for its expressive lines, vivid colours, symbolic imagery, and strong connection with the cultural life of Bihar.",
      "Traditional compositions often feature nature, animals, deities, ceremonies, and stories. Artists use visual symbols to communicate ideas of prosperity, devotion, fertility, celebration, and harmony.",
      "The distinctive appearance of Madhubani comes from its dense compositions and confident outlines. Historically, artists worked with natural and locally available materials, creating images on walls and floors before the tradition expanded to paper and other surfaces.",
      "Contemporary Madhubani artists continue to preserve the visual language while exploring new subjects and formats. This balance between continuity and experimentation keeps the tradition relevant.",
      "Every Madhubani artwork invites the viewer to look beyond decoration and discover the story contained within its patterns."
    ],
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
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Handmade objects deserve thoughtful care because their materials and finishes can differ from mass-produced products. Understanding the nature of each material is the first step towards preserving it.",
      "Keep handcrafted pieces away from excessive moisture, direct sunlight, and sudden temperature changes whenever the material is sensitive to these conditions. A soft, dry cloth is usually the safest starting point for removing dust.",
      "Textiles should generally be stored clean and dry, while painted and decorative surfaces should be handled gently to avoid unnecessary abrasion.",
      "For metal craft, follow the care instructions supplied with the individual piece because different finishes respond differently to cleaning products.",
      "Most importantly, treat handmade objects as pieces of craft rather than disposable décor. Gentle handling helps preserve both their physical beauty and their character."
    ],
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
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Mass production has made objects faster and easier to access, but handmade craft offers something fundamentally different: a visible connection between maker, material, and tradition.",
      "A handmade piece carries subtle variations created during the making process. These details can reveal the rhythm of the artisan's work and make every piece feel individual.",
      "Choosing handmade can also contribute to the survival of traditional skills. When people value craft, there is greater reason for workshops and younger generations to continue learning specialised techniques.",
      "Handmade objects also encourage us to think about what we bring into our homes. Instead of choosing something only because it is convenient, we can choose objects because they have meaning, history, and character.",
      "For KALAKRITI, handmade is not simply a product category. It is a philosophy of respecting people, materials, culture, and the time required to create something with care."
    ],
  },
];

const relatedArticles = [
  {
    slug: "meet-the-artisans",
    title: "Meet the Hands Behind the Craft",
    category: "Artisans",
  },
  {
    slug: "crafts-of-rajasthan",
    title: "A Journey Through the Crafts of Rajasthan",
    category: "Craft Trails",
  },
  {
    slug: "why-handmade-matters",
    title: "Why Handmade Still Matters",
    category: "Our Philosophy",
  },
];

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const related = relatedArticles.filter(
    (item) => item.slug !== article.slug
  );

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#8b1e2d_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#b08a4a_1px,transparent_1px)] bg-[length:28px_28px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1e2d] transition hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>

          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-3 text-[#8b1e2d]">
              <span className="h-px w-12 bg-[#b08a4a]" />
              <BookOpen className="h-5 w-5" />
              <span className="h-px w-12 bg-[#b08a4a]" />
            </div>

            <span className="inline-flex rounded-full bg-[#8b1e2d]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              {article.category}
            </span>

            <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#6d5149] sm:text-lg">
              {article.excerpt}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-xs text-[#80665d]">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {article.date}
              </span>

              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] shadow-[0_15px_45px_rgba(67,35,25,0.08)]">
          <div className="relative aspect-[16/8] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#301512]/25 to-transparent" />
          </div>

          <div className="mx-auto max-w-3xl px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
            <div className="mb-10 border-l-2 border-[#b08a4a] pl-5">
              <p className="font-serif text-xl italic leading-8 text-[#65443c]">
                Every handmade object carries the patience of its maker and
                the memory of a tradition.
              </p>
            </div>

            <div className="space-y-7">
              {article.content.map((paragraph, index) => (
                <p
                  key={`${article.slug}-${index}`}
                  className="text-base leading-8 text-[#5f4740] sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-[#b08a4a]/25 pt-8">
              <Link
                href="/artisans"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d] transition hover:gap-3"
              >
                Meet the artisans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-18">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Continue Reading
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
              More from the Journal
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex items-center justify-between gap-6 rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                    {item.title}
                  </h3>
                </div>

                <ArrowRight className="h-5 w-5 shrink-0 text-[#8b1e2d] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
            KALAKRITI
          </p>

          <p className="mt-3 font-serif text-2xl italic text-[#fff8eb] sm:text-3xl">
            Made by hands. Carried by generations.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
          >
            Explore Handmade Crafts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
