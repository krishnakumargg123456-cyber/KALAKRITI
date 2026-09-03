/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

type CraftData = {
  name: string;
  region: string;
  state: string;
  category: string;
  duration: string;
  artisans: string;
  description: string;
  heroImage: string;
  history: string;
  technique: string;
  materials: string[];
  characteristics: string[];
  steps: {
    title: string;
    text: string;
  }[];
};

const crafts: Record<string, CraftData> = {
  madhubani: {
    name: "Madhubani Painting",
    region: "Mithila",
    state: "Bihar",
    category: "Painting",
    duration: "Generations of tradition",
    artisans: "Mithila artisan communities",
    description:
      "A vibrant storytelling art from the Mithila region of Bihar, where mythology, nature, celebrations, and everyday life come alive through distinctive lines, patterns, and colours.",
    heroImage:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1600&q=85",
    history:
      "Madhubani, also known as Mithila painting, has deep roots in the cultural life of northern Bihar. Traditionally created on walls and floors during ceremonies, the art gradually moved onto handmade paper, cloth, and other surfaces while retaining its visual vocabulary.",
    technique:
      "Artists commonly work with fine lines, repeated patterns, geometric borders, and filled spaces. Nature-inspired motifs such as flowers, birds, fish, trees, and mythological figures create compositions where very little of the surface is left undecorated.",
    materials: [
      "Handmade paper",
      "Natural pigments",
      "Brushes",
      "Bamboo pens",
      "Cloth",
    ],
    characteristics: [
      "Bold outlines and intricate patterns",
      "Nature and mythology-inspired motifs",
      "Dense decorative compositions",
      "Strong regional storytelling",
    ],
    steps: [
      {
        title: "Prepare the Surface",
        text: "The chosen surface is prepared carefully so the artwork can receive lines and colour evenly.",
      },
      {
        title: "Sketch the Composition",
        text: "The artist establishes the central subject, surrounding motifs, and characteristic decorative borders.",
      },
      {
        title: "Build the Patterns",
        text: "Fine lines and repeated motifs gradually give the composition its distinctive visual rhythm.",
      },
      {
        title: "Add Colour",
        text: "Colour is applied thoughtfully to create contrast, symbolism, and visual balance.",
      },
      {
        title: "Finish the Details",
        text: "Borders, textures, fine lines, and small motifs complete the artwork.",
      },
    ],
  },

  "blue-pottery": {
    name: "Blue Pottery",
    region: "Jaipur",
    state: "Rajasthan",
    category: "Pottery",
    duration: "Centuries of craft knowledge",
    artisans: "Jaipur pottery artisans",
    description:
      "A distinctive decorative craft associated with Jaipur, recognised for its blue-and-white palette, floral motifs, and a technique that differs from conventional clay pottery.",
    heroImage:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=85",
    history:
      "Jaipur's blue pottery developed through influences travelling across Central Asia, Persia, and South Asia. Over generations, local artisans shaped these influences into a recognisable Jaipur tradition.",
    technique:
      "Unlike ordinary earthen pottery, blue pottery uses a dough-like mixture and is shaped before being decorated and fired. The finished surface is known for its smooth, decorative appearance.",
    materials: [
      "Quartz",
      "Glass",
      "Glazes",
      "Natural pigments",
      "Decorative colours",
    ],
    characteristics: [
      "Blue and white visual palette",
      "Floral and geometric decoration",
      "Smooth glazed surface",
      "Distinctive quartz-based construction",
    ],
    steps: [
      {
        title: "Prepare the Mixture",
        text: "Traditional ingredients are carefully combined to form the material used for the craft.",
      },
      {
        title: "Shape the Object",
        text: "The material is pressed and formed into the desired vessel, tile, or decorative object.",
      },
      {
        title: "Smooth the Surface",
        text: "The shaped piece is refined so the surface is ready for decoration.",
      },
      {
        title: "Paint the Motifs",
        text: "Artisans add characteristic floral, botanical, and geometric designs by hand.",
      },
      {
        title: "Glaze and Fire",
        text: "The decorated object is glazed and fired to create its characteristic finished surface.",
      },
    ],
  },

  "block-printing": {
    name: "Hand Block Printing",
    region: "Jaipur & Bagru",
    state: "Rajasthan",
    category: "Textile",
    duration: "Centuries-old practice",
    artisans: "Rajasthani printing communities",
    description:
      "A meticulous textile tradition in which carved wooden blocks are dipped in colour and stamped by hand to create repeating patterns on fabric.",
    heroImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
    history:
      "Hand block printing has been practiced across parts of Rajasthan for generations. Different regions developed their own motifs, colour combinations, resist methods, and printing traditions.",
    technique:
      "A carved wooden block acts like a reusable stamp. The printer positions each impression carefully beside the previous one, building a continuous pattern while maintaining alignment across the fabric.",
    materials: [
      "Cotton fabric",
      "Carved wooden blocks",
      "Natural dyes",
      "Pigments",
      "Water",
    ],
    characteristics: [
      "Hand-carved wooden blocks",
      "Repeating geometric and floral motifs",
      "Natural and earthy colour palettes",
      "Visible character of handmade printing",
    ],
    steps: [
      {
        title: "Prepare the Fabric",
        text: "Fabric is washed, prepared, and stretched so that it can receive the printed design.",
      },
      {
        title: "Carve the Block",
        text: "A design is transferred onto wood and carefully carved to create the printing surface.",
      },
      {
        title: "Prepare the Colour",
        text: "Pigments or dyes are prepared to achieve the desired depth and consistency.",
      },
      {
        title: "Print by Hand",
        text: "The artisan repeatedly presses the block onto the fabric, aligning every impression by eye.",
      },
      {
        title: "Wash and Finish",
        text: "The fabric is washed, dried, and finished to reveal the final pattern and colours.",
      },
    ],
  },
};

const fallbackCraft: CraftData = {
  name: "Indian Handicraft",
  region: "India",
  state: "India",
  category: "Traditional Craft",
  duration: "Generations of knowledge",
  artisans: "Indian artisan communities",
  description:
    "Explore the techniques, stories, materials, and communities that keep India's diverse craft traditions alive.",
  heroImage:
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1600&q=85",
  history:
    "India's craft traditions have evolved through generations, reflecting local materials, communities, landscapes, rituals, and everyday life.",
  technique:
    "Each craft has its own vocabulary of materials, tools, gestures, patterns, and processes. The knowledge is often learned through observation and years of practice.",
  materials: [
    "Natural materials",
    "Traditional tools",
    "Handmade surfaces",
    "Local pigments",
  ],
  characteristics: [
    "Regional identity",
    "Handmade character",
    "Traditional techniques",
    "Stories passed between generations",
  ],
  steps: [
    {
      title: "Prepare Materials",
      text: "Artisans select and prepare materials suited to the traditional process.",
    },
    {
      title: "Shape the Foundation",
      text: "The basic form or surface is created using established craft techniques.",
    },
    {
      title: "Create the Design",
      text: "Traditional motifs and patterns are developed by the artisan.",
    },
    {
      title: "Refine by Hand",
      text: "Details are completed through repeated, practiced hand movements.",
    },
    {
      title: "Finish the Piece",
      text: "The final work is inspected, refined, and prepared for use or display.",
    },
  ],
};

function getCraft(slug: string): CraftData {
  const normalisedSlug = decodeURIComponent(slug).toLowerCase();
  return crafts[normalisedSlug] ?? fallbackCraft;
}

export default function CraftLearningPage({
  params,
}: {
  params: { craftSlug: string };
}) {
  const craft = getCraft(params.craftSlug);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#72554c] transition hover:text-[#8b1e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Craft Learning
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12 lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b1e2d]">
              <span>{craft.category}</span>
              <span className="text-[#b08a4a]">•</span>
              <span>{craft.region}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
              The Art of
              <span className="block italic text-[#8b1e2d]">
                {craft.name}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#6d5149] sm:text-lg">
              {craft.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-[#b08a4a]/30 bg-[#fbf6e9] p-4">
                <MapPin className="h-5 w-5 shrink-0 text-[#8b1e2d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#80665d]">
                    Region
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4a211c]">
                    {craft.region}, {craft.state}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-[#b08a4a]/30 bg-[#fbf6e9] p-4">
                <Clock3 className="h-5 w-5 shrink-0 text-[#8b1e2d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#80665d]">
                    Tradition
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4a211c]">
                    {craft.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-[#b08a4a]/30" />

            <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/40 bg-[#efe4ce]">
              <img
                src={craft.heroImage}
                alt={craft.name}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 lg:py-20">
        <BookOpen className="mx-auto h-7 w-7 text-[#8b1e2d]" />

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
          Understanding the Craft
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
          A Tradition with a Story
        </h2>

        <p className="mt-5 text-base leading-8 text-[#6d5149]">
          {craft.history}
        </p>
      </section>

      {/* Technique */}
      <section className="border-y border-[#b08a4a]/25 bg-[#efe4ce]/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              The Technique
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              Where Skill Meets Material
            </h2>

            <p className="mt-5 leading-8 text-[#6d5149]">
              {craft.technique}
            </p>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7">
            <h3 className="font-serif text-2xl font-semibold text-[#4a211c]">
              What Makes It Special
            </h3>

            <div className="mt-6 space-y-4">
              {craft.characteristics.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                    <Check className="h-3.5 w-3.5 text-[#8b1e2d]" />
                  </span>

                  <p className="text-sm leading-6 text-[#5f443c]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              Materials
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              Made with the Right Materials
            </h2>

            <p className="mt-4 leading-7 text-[#6d5149]">
              Traditional materials are an important part of the identity and
              character of each craft.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {craft.materials.map((material) => (
              <div
                key={material}
                className="flex items-center gap-3 rounded-lg border border-[#b08a4a]/30 bg-[#fbf6e9] p-5"
              >
                <Sparkles className="h-5 w-5 shrink-0 text-[#8b1e2d]" />
                <span className="text-sm font-semibold text-[#4a211c]">
                  {material}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              The Making
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              From Material to Masterpiece
            </h2>

            <p className="mt-4 leading-7 text-[#6d5149]">
              While every artisan develops their own rhythm and expertise,
              these stages illustrate the traditional journey of a handmade
              piece.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {craft.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b1e2d] font-serif text-sm font-bold text-[#fff8eb]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-[#4a211c]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#8b1e2d] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-[#e5c98b]" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
                  The People Behind the Craft
                </p>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
                Meet the Artisan Communities
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-[#f1dfc9]">
                KALAKRITI works to celebrate the people and communities whose
                knowledge keeps India's craft traditions alive. Discover the
                artisans, their regions, and the stories behind their work.
              </p>

              <p className="mt-4 text-sm font-semibold text-[#e5c98b]">
                {craft.artisans}
              </p>
            </div>

            <Link
              href="/artisans"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Meet Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="border-t border-[#b08a4a]/25 bg-[#efe4ce]">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Experience the Craft
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
            Bring a Piece of Heritage Home
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d5149]">
            Explore handmade creations inspired by the traditions you have just
            discovered.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/35 bg-[#f7f0df] px-7 py-3.5 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#fbf6e9]"
            >
              Explore More Crafts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

