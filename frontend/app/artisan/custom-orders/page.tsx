"use client";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  MessageSquare,
  Palette,
  Sparkles,
} from "lucide-react";

const stages = [
  {
    icon: MessageSquare,
    title: "Request Received",
    description:
      "Review the customer's custom requirement, references and preferred craft style.",
  },
  {
    icon: Palette,
    title: "Design Discussion",
    description:
      "Discuss materials, colours, dimensions and traditional techniques with the customer.",
  },
  {
    icon: ClipboardList,
    title: "Create the Piece",
    description:
      "Craft the requested piece using your traditional skills and agreed specifications.",
  },
  {
    icon: CheckCircle2,
    title: "Complete & Deliver",
    description:
      "Finish the piece, confirm quality and prepare it for delivery.",
  },
];

export default function ArtisanCustomOrdersPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Artisan Studio
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
          Custom Orders
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-brown/65">
          Create meaningful, made-to-order pieces for customers looking for
          something truly personal and rooted in Indian craft traditions.
        </p>

        <section className="mt-8 rounded-2xl border border-border bg-paper p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream text-gold">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-maroon">
                Bring a Customer&apos;s Vision to Life
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-brown/65">
                Custom orders allow customers to work directly with artisans
                on special pieces. You can discuss the requirement, agree on
                the details and create something that carries your unique
                craftsmanship.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold text-maroon">
                <Clock3 className="h-4 w-4" />
                Custom order management will appear here when requests are
                available.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              How It Works
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-maroon">
              From Idea to Handmade Creation
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <article
                  key={stage.title}
                  className="rounded-xl border border-border bg-paper p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cream text-gold">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-serif text-2xl font-bold text-gold/50">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-maroon">
                    {stage.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-brown/60">
                    {stage.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-gold/30 bg-maroon p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Artisan Advantage
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-cream">
                Your craft. Their story.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-cream/70">
                Custom creations give customers a chance to connect with
                traditional craftsmanship while helping artisans showcase
                their individual style and skills.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Palette className="h-7 w-7" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
