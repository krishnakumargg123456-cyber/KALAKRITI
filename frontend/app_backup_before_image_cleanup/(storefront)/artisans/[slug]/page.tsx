import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

type ArtisanPageProps = {
  params: {
    slug: string;
  };
};

const artisans: Record<
  string,
  {
    name: string;
    craft: string;
    state: string;
    region: string;
    years: number;
    community: string;
    image: string;
    story: string[];
    quote: string;
    techniques: string[];
    products: {
      name: string;
      price: string;
      image: string;
    }[];
  }
> = {
  "sita-devi": {
    name: "Sita Devi",
    craft: "Madhubani Painting",
    state: "Bihar",
    region: "Madhubani",
    years: 28,
    community: "Mithila Artisan Community",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1200&q=85",
    story: [
      "Sita Devi grew up surrounded by the visual language of Mithila. Her earliest memories are of women in her family drawing symbolic forms on walls and floors during festivals and important family occasions.",
      "Over nearly three decades, she has developed a distinctive approach to Madhubani painting while preserving the traditional vocabulary of fish, birds, trees, deities and geometric borders.",
      "Today, Sita works with younger members of her community and believes that the future of craft depends on making traditional knowledge meaningful for the next generation.",
    ],
    quote:
      "When I paint, I am not only making a picture. I am carrying a story that was given to me by my family.",
    techniques: [
      "Hand-drawn line work",
      "Natural-inspired motifs",
      "Traditional Mithila borders",
      "Layered colour filling",
    ],
    products: [
      {
        name: "Madhubani Handpainted Wall Art",
        price: "₹2,499",
        image:
          "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Mithila Folk Art Panel",
        price: "₹1,899",
        image:
          "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=700&q=85",
      },
      {
        name: "Traditional Madhubani Print",
        price: "₹1,299",
        image:
          "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=700&q=85",
      },
    ],
  },
};

export default function ArtisanDetailPage({ params }: ArtisanPageProps) {
  const artisan = artisans[params.slug] ?? artisans["sita-devi"];

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-12">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#f1dfc9] transition hover:text-[#e5c98b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Artisans
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-[#e5c98b]/25">
              <img
                src={artisan.image}
                alt={`${artisan.name} — ${artisan.craft}`}
                className="aspect-[4/5] w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 rounded-xl bg-[#fff8eb]/95 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Craft
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-[#4a211c]">
                  {artisan.craft}
                </p>
              </div>
            </div>

            <div className="pb-5 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
                Artisan Story
              </p>

              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#fff8eb] sm:text-6xl">
                {artisan.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#f1dfc9]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#e5c98b]" />
                  {artisan.region}, {artisan.state}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#e5c98b]" />
                  {artisan.years} years of craft
                </span>
              </div>

              <p className="mt-7 max-w-xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
                A story of skill, patience and inherited knowledge from the
                heart of {artisan.region}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#collection"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
                >
                  Shop Their Craft
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#e5c98b]/40 px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#fff8eb]/10"
                >
                  <Heart className="h-4 w-4" />
                  Save Artisan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={<Sparkles className="h-5 w-5" />}
            value={`${artisan.years} Years`}
            label="Craft experience"
          />

          <Stat
            icon={<MapPin className="h-5 w-5" />}
            value={artisan.region}
            label={artisan.state}
          />

          <Stat
            icon={<Users className="h-5 w-5" />}
            value="3 Generations"
            label="Craft knowledge"
          />

          <Stat
            icon={<Award className="h-5 w-5" />}
            value="Master"
            label="Artisan recognition"
          />
        </section>

        {/* Story */}
        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              The Journey
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
              A tradition carried by hand
            </h2>

            <div className="mt-7 space-y-5">
              {artisan.story.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-[#6d5149]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7">
            <Quote className="h-8 w-8 text-[#8b1e2d]" />

            <blockquote className="mt-5 font-serif text-2xl font-semibold leading-9 text-[#4a211c]">
              “{artisan.quote}”
            </blockquote>

            <div className="mt-6 h-px bg-[#b08a4a]/25" />

            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
              {artisan.name}
            </p>

            <p className="mt-1 text-xs text-[#80665d]">
              {artisan.craft} · {artisan.region}
            </p>
          </aside>
        </section>

        {/* Techniques */}
        <section className="mt-14 rounded-3xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-7 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              The Craft
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c]">
              Techniques that tell a story
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d5149]">
              Every handmade piece reflects the materials, methods and visual
              language of the community that created it.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {artisan.techniques.map((technique, index) => (
              <div
                key={technique}
                className="rounded-xl border border-[#b08a4a]/25 bg-[#fbf6e9] p-5"
              >
                <span className="font-serif text-2xl font-bold text-[#8b1e2d]">
                  0{index + 1}
                </span>

                <p className="mt-4 text-sm font-semibold text-[#4a211c]">
                  {technique}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Collection */}
        <section id="collection" className="mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                From the Artisan
              </p>

              <h2 className="mt-2 font-serif text-4xl font-semibold text-[#4a211c]">
                Explore {artisan.name}&apos;s work
              </h2>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#80665d]">
              <Star className="h-4 w-4 fill-[#b08a4a] text-[#b08a4a]" />
              <span className="font-bold text-[#4a211c]">4.9</span>
              <span>artisan collection rating</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artisan.products.map((product) => (
              <article
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]"
              >
                <Link href="/shop">
                  <div className="aspect-square overflow-hidden bg-[#efe4ce]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-semibold text-[#4a211c] group-hover:text-[#8b1e2d]">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#8b1e2d]">
                      {product.price}
                    </span>

                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8b1e2d]"
                    >
                      View Piece
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-[#8b1e2d]">
          <div className="grid gap-8 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Supporting craft communities
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb]">
                When you buy handmade, you support a living tradition.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f1dfc9]">
                Your purchase helps artisans continue their practice, pass
                knowledge to younger makers and keep regional craft traditions
                visible.
              </p>
            </div>

            <Link
              href="/traditions"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c]"
            >
              Explore Traditions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
        {icon}
      </div>

      <p className="mt-4 font-serif text-xl font-bold text-[#4a211c]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#80665d]">{label}</p>
    </div>
  );
}