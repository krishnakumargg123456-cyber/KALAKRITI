"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";

type Tradition = {
  name: string;
  region: string;
  origin: string;
  tagline: string;
  description: string;
  image: string;
  materials: string[];
  techniques: string[];
  history: string[];
};

const traditions: Record<string, Tradition> = {
  "madhubani-painting": {
    name: "Madhubani Painting",
    region: "Madhubani, Bihar",
    origin: "Bihar, India",
    tagline: "Stories, symbols and nature painted by hand.",
    description:
      "Madhubani painting is one of India's most recognisable folk-art traditions, known for its dense compositions, bold outlines and symbolic depictions of nature, mythology and everyday life.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1600&q=90",
    materials: ["Natural pigments", "Handmade paper", "Cloth", "Canvas"],
    techniques: [
      "Fine-line drawing",
      "Double-line borders",
      "Natural colour filling",
      "Symbolic motifs",
    ],
    history: [
      "The tradition developed in the Mithila region of Bihar, where paintings were historically created on walls and floors during important ceremonies and celebrations.",
      "Artists use recurring visual symbols such as fish, lotus flowers, birds, trees and geometric borders. These elements give the artwork a visual vocabulary through which stories and beliefs are communicated.",
      "Today, Madhubani artists work across paper, canvas, textiles and other contemporary surfaces while continuing to preserve the distinctive character of the traditional style.",
    ],
  },

  "blue-pottery": {
    name: "Jaipur Blue Pottery",
    region: "Jaipur, Rajasthan",
    origin: "Rajasthan, India",
    tagline: "A luminous craft shaped by colour and patience.",
    description:
      "Jaipur blue pottery is celebrated for its brilliant blue decoration, floral motifs and distinctive material composition. Each piece requires careful preparation, shaping, painting and firing.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=90",
    materials: ["Quartz", "Glass", "Multani mitti", "Natural pigments"],
    techniques: [
      "Mould shaping",
      "Hand painting",
      "Glazing",
      "Controlled firing",
    ],
    history: [
      "The Jaipur tradition developed into a distinctive decorative craft associated with the city's workshops and artisans.",
      "Unlike conventional clay pottery, the material used in blue pottery gives finished pieces a different texture and character.",
      "Artisans continue to create both traditional decorative forms and contemporary objects for modern homes.",
    ],
  },

  "warli-painting": {
    name: "Warli Painting",
    region: "Maharashtra",
    origin: "Maharashtra, India",
    tagline: "The world reduced to lines, circles and stories.",
    description:
      "Warli painting transforms everyday life, farming, celebration and nature into rhythmic visual compositions using a remarkably simple geometric vocabulary.",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1600&q=90",
    materials: ["Natural earth", "Rice paste", "Mud surfaces", "Bamboo brushes"],
    techniques: [
      "Geometric figures",
      "Rice-paste painting",
      "Narrative composition",
      "Rhythmic repetition",
    ],
    history: [
      "Warli art emerged from communities in the tribal regions of Maharashtra and was traditionally created on the walls of homes.",
      "Human figures are often represented through simple triangles and circles, allowing artists to communicate scenes of farming, dancing, ceremonies and community life.",
      "Contemporary Warli artists have expanded the tradition onto paper, canvas and other surfaces while retaining its characteristic visual language.",
    ],
  },

  "kutch-embroidery": {
    name: "Kutch Embroidery",
    region: "Kutch, Gujarat",
    origin: "Gujarat, India",
    tagline: "Colourful threads carrying generations of memory.",
    description:
      "Kutch embroidery brings together vibrant colours, intricate stitches, mirrors and geometric patterns developed by artisan communities across the region.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1600&q=90",
    materials: ["Cotton fabric", "Silk threads", "Wool", "Mirror pieces"],
    techniques: [
      "Chain stitch",
      "Mirror work",
      "Geometric embroidery",
      "Decorative borders",
    ],
    history: [
      "Embroidery in Kutch has long been closely connected with community identity, clothing and domestic life.",
      "Different communities developed distinctive stitches, colour combinations and motifs, creating an exceptionally diverse embroidery landscape.",
      "The craft continues today through artisan workshops and cooperatives, where traditional techniques are applied to both heritage and contemporary products.",
    ],
  },

  "banarasi-weaving": {
    name: "Banarasi Weaving",
    region: "Varanasi, Uttar Pradesh",
    origin: "Uttar Pradesh, India",
    tagline: "Silk, zari and the rhythm of the handloom.",
    description:
      "Banarasi weaving is renowned for richly patterned silk textiles, intricate zari work and elaborate motifs created through highly skilled handloom techniques.",
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=1600&q=90",
    materials: ["Silk", "Zari", "Cotton", "Natural dyes"],
    techniques: [
      "Handloom weaving",
      "Zari insertion",
      "Jacquard patterning",
      "Motif development",
    ],
    history: [
      "Varanasi has developed a celebrated weaving ecosystem where generations of families have built specialised knowledge around silk textiles.",
      "Traditional motifs include floral forms, paisleys and intricate decorative patterns woven directly into the textile.",
      "A single finely detailed textile can represent many hours of preparation and weaving, making the craft a powerful example of slow handmade production.",
    ],
  },

  "phulkari": {
    name: "Phulkari",
    region: "Punjab",
    origin: "Punjab, India",
    tagline: "Flowers blooming through thread.",
    description:
      "Phulkari, meaning flower work, is a celebrated embroidery tradition known for colourful geometric floral patterns created with carefully placed stitches.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1600&q=90",
    materials: ["Cotton cloth", "Silk floss", "Embroidery thread"],
    techniques: [
      "Darning stitch",
      "Geometric filling",
      "Mirror-like symmetry",
      "Dense surface embroidery",
    ],
    history: [
      "Phulkari became deeply connected with clothing, celebrations and family traditions in Punjab.",
      "The visual richness of the embroidery comes from the careful arrangement of small stitches across the surface of the fabric.",
      "Contemporary artisans continue the tradition through dupattas, garments, accessories and home textiles.",
    ],
  },
};

function fallbackTradition(slug: string): Tradition {
  return {
    name: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    region: "India",
    origin: "India",
    tagline: "A living tradition carried forward by skilled hands.",
    description:
      "India's craft traditions are shaped by place, community, material and generations of practical knowledge.",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1600&q=90",
    materials: ["Natural materials", "Hand tools", "Traditional pigments"],
    techniques: ["Handcrafting", "Traditional techniques", "Decorative detailing"],
    history: [
      "Indian craft traditions are often learned through observation, practice and knowledge passed between generations.",
      "Regional materials and local cultural practices give each tradition its own visual language.",
      "Contemporary artisans continue adapting these skills while protecting the identity of the original craft.",
    ],
  };
}

export default function TraditionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const tradition = traditions[slug] ?? fallbackTradition(slug);

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

            <Link href="/traditions" className="hover:text-[#8b1e2d]">
              Traditions
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="truncate font-semibold text-[#4a211c]">
              {tradition.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#4a211c]">
        <div className="absolute inset-0">
          <img
            src={tradition.image}
            alt={tradition.name}
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#3d1f1b]/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5c98b]/45 bg-[#3d1f1b]/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
              <Sparkles className="h-3.5 w-3.5" />
              Living Tradition
            </span>

            <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#fff8eb] sm:text-6xl lg:text-7xl">
              {tradition.name}
            </h1>

            <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-[#e5c98b]">
              {tradition.tagline}
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              {tradition.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-5 text-xs text-[#f1dfc9]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#e5c98b]" />
                {tradition.region}
              </span>

              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#e5c98b]" />
                Generations of knowledge
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Introduction */}
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              The Tradition
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
              Made slowly. Remembered forever.
            </h2>

            <div className="mt-6 space-y-6">
              {tradition.history.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-[#604940] sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-7">
            <BookOpen className="h-7 w-7 text-[#8b1e2d]" />

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
              Craft at a glance
            </h3>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Region
                </p>
                <p className="mt-1 text-sm text-[#604940]">
                  {tradition.region}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Origin
                </p>
                <p className="mt-1 text-sm text-[#604940]">
                  {tradition.origin}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Materials
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {tradition.materials.map((material) => (
                    <span
                      key={material}
                      className="rounded-full bg-[#efe4ce] px-3 py-1.5 text-xs text-[#65443c]"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Techniques */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              The Making
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              Techniques passed through generations
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tradition.techniques.map((technique, index) => (
              <div
                key={technique}
                className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6"
              >
                <span className="font-serif text-4xl text-[#b08a4a]/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-serif text-xl font-semibold text-[#4a211c]">
                  {technique}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Image / quote */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#8b1e2d]">
          <div className="grid lg:grid-cols-2">
            <div className="min-h-[350px]">
              <img
                src={tradition.image}
                alt={`${tradition.name} craft`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center p-8 sm:p-12 lg:p-14">
              <div>
                <p className="font-serif text-3xl leading-tight text-[#fff8eb] sm:text-4xl">
                  “The value of handmade lies not only in what is made, but in
                    the knowledge that makes it possible.”
                </p>

                <div className="mt-7 h-px w-16 bg-[#e5c98b]" />

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#e5c98b]">
                  KALAKRITI — Living Indian Heritage
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Explore links */}
        <section className="mt-16 grid gap-5 md:grid-cols-2">
          <Link
            href="/artisans"
            className="group rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 transition hover:-translate-y-1 hover:border-[#8b1e2d]/40"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              Meet the Makers
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#4a211c]">
              Discover the artisans behind the tradition.
            </h2>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]">
              Meet our artisans
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/shop"
            className="group rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/70 p-7 transition hover:-translate-y-1 hover:border-[#8b1e2d]/40"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              Bring It Home
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#4a211c]">
              Explore handmade pieces from India.
            </h2>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]">
              Explore collection
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </section>

        <div className="mt-10">
          <Link
            href="/traditions"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all traditions
          </Link>
        </div>
      </div>
    </main>
  );
}
