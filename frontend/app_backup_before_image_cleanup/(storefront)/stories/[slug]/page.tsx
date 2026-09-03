"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";

type Story = {
  title: string;
  subtitle: string;
  artisan: string;
  location: string;
  craft: string;
  date: string;
  image: string;
  paragraphs: string[];
};

const stories: Record<string, Story> = {
  "hands-of-madhubani": {
    title: "The Hands Behind Madhubani",
    subtitle:
      "How an ancient painting tradition continues through the women who paint its stories.",
    artisan: "Sita Devi",
    location: "Madhubani, Bihar",
    craft: "Madhubani Painting",
    date: "August 18, 2026",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1600&q=90",
    paragraphs: [
      "In the villages of Madhubani, walls and handmade surfaces have long served as canvases for stories. Fish, birds, trees, flowers and scenes from mythology become part of compositions that carry meaning far beyond decoration.",
      "For artisans like Sita Devi, painting is both an artistic practice and a language inherited from generations before her. Each line is made deliberately, with motifs shaped by memory, place and tradition.",
      "The beauty of Madhubani lies in its ability to remain rooted in its history while continuing to evolve. Contemporary artisans are finding new ways to bring the tradition into homes around the world without losing the character of the original craft.",
      "At KALAKRITI, every artwork is an opportunity to preserve that connection — from the hands that create it to the home that gives it a new life.",
    ],
  },

  "threads-of-kutch": {
    title: "Threads of Kutch",
    subtitle:
      "Inside the colourful embroidery traditions of Gujarat's artisan communities.",
    artisan: "Meera Ben",
    location: "Kutch, Gujarat",
    craft: "Kutch Embroidery",
    date: "August 10, 2026",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1600&q=90",
    paragraphs: [
      "The landscape of Kutch is reflected in its textiles: vivid colours, geometric forms, mirrors and intricate stitches come together to create pieces full of character.",
      "Embroidery has traditionally been closely connected with community and everyday life. Techniques and visual vocabulary are passed between generations, with every region and community developing its own distinctive expression.",
      "For artisans, the rhythm of stitching is familiar but never mechanical. A handmade piece carries small variations that make it different from anything produced by a machine.",
      "When you choose a handcrafted textile, you are not simply choosing a pattern. You are carrying forward a skill, a story and a livelihood.",
    ],
  },

  "the-blue-pottery-tradition": {
    title: "The Blue Pottery Tradition",
    subtitle:
      "A closer look at Jaipur's distinctive craft and the artisans keeping it alive.",
    artisan: "Mohan Kumar",
    location: "Jaipur, Rajasthan",
    craft: "Blue Pottery",
    date: "August 2, 2026",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=90",
    paragraphs: [
      "Jaipur's blue pottery is instantly recognisable for its vivid blue tones and delicate decorative patterns. Unlike conventional pottery, the craft uses a distinctive composition that gives its finished pieces a unique character.",
      "The making process demands patience. Preparing the material, shaping each form, applying designs and carefully firing the piece all require experience built over years.",
      "What looks simple when finished often represents a long chain of skilled decisions. The artisan must understand material, temperature, proportion and decoration as one continuous process.",
      "Today, traditional workshops are adapting the craft to contemporary homes while protecting the visual language that makes Jaipur blue pottery unmistakable.",
    ],
  },

  "warli-stories": {
    title: "Stories in Simple Lines",
    subtitle:
      "How Warli artists turn everyday life, nature and community into timeless visual stories.",
    artisan: "Savita Pawar",
    location: "Palghar, Maharashtra",
    craft: "Warli Painting",
    date: "July 25, 2026",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1600&q=90",
    paragraphs: [
      "Warli painting is celebrated for its seemingly simple vocabulary of circles, triangles and lines. Yet within these forms lives an extraordinary record of community life.",
      "Scenes of farming, dancing, animals, celebrations and daily work transform a surface into a visual narrative. The strength of the tradition comes from communicating complex ideas through remarkably economical forms.",
      "For contemporary Warli artists, the challenge is not only to preserve the visual language but also to ensure that the people who carry it forward can build sustainable livelihoods from their skills.",
      "Every handmade Warli artwork therefore becomes both an object of beauty and a small continuation of a living cultural tradition.",
    ],
  },
};

function getFallbackStory(slug: string): Story {
  return {
    title: "A Story of Indian Craft",
    subtitle:
      "Discover the people, places and traditions behind India's handmade heritage.",
    artisan: "KALAKRITI Artisan Community",
    location: "India",
    craft: "Indian Handicraft",
    date: "August 2026",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1600&q=90",
    paragraphs: [
      "Indian craft traditions are built on knowledge passed from one generation to another. Techniques, motifs and materials are shaped by the places where artisans live and work.",
      "Behind every handmade object is time: time spent learning, practising, preparing materials and making careful decisions by hand.",
      "KALAKRITI works to bring these stories closer to the people who discover and collect handmade Indian craft.",
      `The story "${slug.replaceAll("-", " ")}" is part of a growing collection celebrating India's living heritage.`,
    ],
  };
}

export default function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const story = stories[slug] ?? getFallbackStory(slug);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>
            <span>/</span>
            <Link href="/stories" className="hover:text-[#8b1e2d]">
              Stories
            </Link>
            <span>/</span>
            <span className="truncate font-semibold text-[#4a211c]">
              {story.title}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#4a211c]">
        <div className="absolute inset-0">
          <img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#3d1f1b]/70" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 lg:py-28">
          <span className="inline-flex rounded-full border border-[#e5c98b]/50 bg-[#3d1f1b]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
            {story.craft}
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#fff8eb] sm:text-5xl lg:text-6xl">
            {story.title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-8 text-[#f1dfc9] sm:text-xl">
            {story.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#f1dfc9]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#e5c98b]" />
              {story.location}
            </span>

            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#e5c98b]" />
              {story.date}
            </span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 py-14 sm:px-8 lg:py-20">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d] transition hover:gap-3"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stories
        </Link>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
          <img
            src={story.image}
            alt={story.title}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>

        <div className="mt-10">
          <p className="mb-8 font-serif text-2xl leading-9 text-[#4a211c]">
            Every handmade object begins with a story — a place, a person and
            knowledge carried forward through time.
          </p>

          <div className="space-y-7">
            {story.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-[#604940] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Artisan card */}
        <div className="mt-14 rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]/70 p-7 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
            The Artisan
          </p>

          <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
            {story.artisan}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-sm text-[#6d5149]">
            <MapPin className="h-4 w-4 text-[#8b1e2d]" />
            {story.location}
          </div>

          <p className="mt-4 text-sm leading-6 text-[#6d5149]">
            A skilled maker carrying forward the knowledge and techniques of
            {` ${story.craft}`} through handmade practice.
          </p>

          <Link
            href="/artisans"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
          >
            Meet more artisans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Shop CTA */}
        <div className="mt-10 rounded-2xl bg-[#8b1e2d] p-8 text-center sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
            Bring the story home
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb]">
            Discover handmade pieces inspired by this tradition.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#f1dfc9]">
            Explore authentic crafts made by artisans and discover the stories
            behind the objects you collect.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
          >
            Explore the Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </main>
  );
}