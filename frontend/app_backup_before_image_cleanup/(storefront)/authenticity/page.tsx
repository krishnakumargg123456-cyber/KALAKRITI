import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const verificationSteps = [
  {
    number: "01",
    icon: UserRound,
    title: "Know the Artisan",
    description:
      "Every participating artisan has a profile that connects their craft to a person, community and place.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Trace the Craft",
    description:
      "We document the craft tradition, materials and making process behind the products featured on KALAKRITI.",
  },
  {
    number: "03",
    icon: Fingerprint,
    title: "Verify the Piece",
    description:
      "Product information and provenance details help you understand where and how your chosen piece was made.",
  },
];

const promises = [
  "Transparent artisan attribution",
  "Craft and region information",
  "Handmade product descriptions",
  "Responsible marketplace practices",
  "Clear product and seller information",
  "Respect for traditional craft knowledge",
];

export default function AuthenticityPage() {
  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5c98b]/30 bg-[#fff8eb]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e5c98b]">
              <ShieldCheck className="h-4 w-4" />
              Our Authenticity Promise
            </div>

            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.05] text-[#fff8eb] sm:text-6xl lg:text-7xl">
              Know the hands behind what you bring home.
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Authenticity at KALAKRITI is about more than a label. It is about
              knowing the artisan, understanding the tradition and making the
              journey of a handmade piece visible.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/artisans"
                className="inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
              >
                Meet Our Artisans
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/traditions"
                className="inline-flex items-center gap-2 rounded-lg border border-[#e5c98b]/40 px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#fff8eb]/10"
              >
                Explore Traditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Introduction */}
        <section className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Why authenticity matters
            </p>

            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight text-[#4a211c]">
              Handmade is a relationship, not just a product.
            </h2>

            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-[#6d5149]">
              <p>
                Traditional Indian crafts carry knowledge that is often passed
                from one generation to another. The value of a handmade piece
                lies not only in what it looks like, but also in the people,
                techniques and cultural memory behind it.
              </p>

              <p>
                KALAKRITI aims to make that connection clearer. We bring
                artisan stories, craft traditions and product information
                together so that you can make informed choices.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl border border-[#b08a4a]/30 bg-[#efe4ce]/70 p-7 sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b1e2d] text-[#fff8eb]">
              <BadgeCheck className="h-7 w-7" />
            </div>

            <h3 className="mt-6 font-serif text-2xl font-semibold text-[#4a211c]">
              A clearer craft journey
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#6d5149]">
              From artisan to tradition to finished piece, we want every step
              to feel understandable and meaningful.
            </p>

            <div className="mt-6 flex items-center gap-2 border-t border-[#b08a4a]/25 pt-5 text-xs font-semibold text-[#58704d]">
              <CheckCircle2 className="h-4 w-4" />
              Discover before you buy
            </div>
          </div>
        </section>

        {/* Verification process */}
        <section className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              How we build trust
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
              Three things we want you to know
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6d5149]">
              Authenticity starts with transparency. We focus on making the
              maker and the making process easier to discover.
            </p>
          </div>

          <div className="mt-9 grid gap-6 lg:grid-cols-3">
            {verificationSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 transition hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_16px_35px_rgba(67,35,25,0.07)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="font-serif text-3xl font-bold text-[#b08a4a]/60">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-serif text-2xl font-semibold text-[#4a211c]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#80665d]">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* What authenticity means */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#8b1e2d] p-8 sm:p-10 lg:p-12">
              <Sparkles className="h-8 w-8 text-[#e5c98b]" />

              <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight text-[#fff8eb]">
                What authenticity means to KALAKRITI
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#f1dfc9]">
                We believe authentic craft should be represented with respect,
                clarity and context—not reduced to a decorative label.
              </p>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {promises.map((promise) => (
                  <div key={promise} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#58704d]" />

                    <p className="text-sm leading-6 font-semibold text-[#4a211c]">
                      {promise}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Provenance */}
        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-7 sm:p-9">
            <MapPin className="h-7 w-7 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
              Place matters
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6d5149]">
              Indian crafts are deeply connected to geography. Clay, fibre,
              textile traditions, visual motifs and making techniques often
              reflect the landscape and communities where they developed.
            </p>

            <Link
              href="/states"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              Explore India by Craft
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 sm:p-9">
            <Fingerprint className="h-7 w-7 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
              The maker matters
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6d5149]">
              Whenever possible, we connect products with the artisans and
              communities who make them. Their skill and knowledge deserve to
              be part of the story you receive with the piece.
            </p>

            <Link
              href="/artisans"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              Meet the Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-16 rounded-3xl bg-[#8b1e2d] px-7 py-12 text-center sm:px-10 lg:py-14">
          <ShieldCheck className="mx-auto h-8 w-8 text-[#e5c98b]" />

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-semibold text-[#fff8eb] sm:text-4xl">
            Choose pieces with a story you can trace.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#f1dfc9]">
            Explore handmade work from Indian artisans and discover the
            traditions that make every piece distinctive.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Shop Handmade
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 rounded-lg border border-[#e5c98b]/40 px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#fff8eb]/10"
            >
              Our Story
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}