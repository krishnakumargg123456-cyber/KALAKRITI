"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Hammer,
  Palette,
  Ruler,
  Sparkles,
  Upload,
} from "lucide-react";
import { FormEvent, useState } from "react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Share Your Vision",
    text: "Tell us about the craft, colours, size, occasion, and design you have in mind.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Curate With You",
    text: "Our team works with the right artisan or craft community to shape your idea.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Made by Hand",
    text: "Your piece is carefully created using traditional techniques and authentic materials.",
  },
  {
    number: "04",
    icon: Check,
    title: "Delivered to You",
    text: "Once approved, your finished creation is carefully packed and delivered.",
  },
];

const customIdeas = [
  {
    title: "Personalised Gifts",
    text: "Create meaningful gifts with names, motifs, colours, or messages.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Home & Interiors",
    text: "Commission artwork, textiles, décor, and statement pieces for your space.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Wedding & Celebrations",
    text: "Bring Indian craft traditions into weddings, ceremonies, and special occasions.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  },
];

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(139,30,45,0.08),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(176,138,74,0.12),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[#8b1e2d]">
              <span className="h-px w-12 bg-[#b08a4a]" />
              <Hammer className="h-5 w-5" />
              <span className="h-px w-12 bg-[#b08a4a]" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              Custom Orders
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
              Imagine It.
              <span className="block italic text-[#8b1e2d]">
                We&apos;ll Craft It.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#6d5149] sm:text-lg">
              Have something special in mind? Work with KALAKRITI and our
              artisan communities to bring a one-of-a-kind handmade creation
              to life.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#request"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
              >
                Request a Custom Piece
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-lg border border-[#8b1e2d]/35 bg-[#fbf6e9] px-7 py-3.5 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#efe4ce]"
              >
                Browse Existing Crafts
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-[#b08a4a]/30" />

            <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/40 bg-[#efe4ce]">
              <img
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1400&q=85"
                alt="Indian artisan creating a handmade craft"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-[#3d1f1b]/85 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#e5c98b]" />
                  <p className="font-serif text-lg font-semibold text-[#fff8eb]">
                    Made especially for you
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-[#f1dfc9]">
                  Traditional craftsmanship shaped around your story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
          The KALAKRITI Way
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
          Your Idea, Rooted in Tradition
        </h2>

        <p className="mt-5 text-base leading-8 text-[#6d5149]">
          Custom does not mean mass-produced. It means starting with your
          vision and allowing skilled hands to interpret it through the
          language of traditional Indian craft.
        </p>
      </section>

      <section className="border-y border-[#b08a4a]/25 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              How It Works
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              From First Sketch to Final Piece
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 shadow-[0_8px_25px_rgba(67,35,25,0.04)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-semibold text-[#b08a4a]/50">
                      {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                      <Icon className="h-5 w-5 text-[#8b1e2d]" />
                    </div>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold text-[#4a211c]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Possibilities
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
            What Can We Create?
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {customIdeas.map((idea) => (
            <article
              key={idea.title}
              className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.05)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-[#4a211c]">
                  {idea.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                  {idea.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex gap-4">
              <Clock3 className="mt-1 h-6 w-6 shrink-0 text-[#e5c98b]" />

              <div>
                <h3 className="font-serif text-xl font-semibold text-[#fff8eb]">
                  Thoughtful Timelines
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#f0dcc4]">
                  Handmade work takes time. We&apos;ll share an estimated
                  timeline before production begins.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Ruler className="mt-1 h-6 w-6 shrink-0 text-[#e5c98b]" />

              <div>
                <h3 className="font-serif text-xl font-semibold text-[#fff8eb]">
                  Your Specifications
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#f0dcc4]">
                  Size, colour, design, quantity, and occasion can all be
                  discussed during the consultation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Hammer className="mt-1 h-6 w-6 shrink-0 text-[#e5c98b]" />

              <div>
                <h3 className="font-serif text-xl font-semibold text-[#fff8eb]">
                  Artisan-Made
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#f0dcc4]">
                  We prioritise traditional techniques and the artisans who
                  carry them forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="request"
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20"
      >
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              Start Your Request
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl">
              Let&apos;s Bring Your
              <span className="block italic text-[#8b1e2d]">
                Idea to Life
              </span>
            </h2>

            <p className="mt-5 leading-7 text-[#6d5149]">
              Tell us as much or as little as you know. You do not need a
              finished design — our team can help you shape the idea.
            </p>

            <div className="mt-8 rounded-xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6">
              <p className="font-serif text-lg font-semibold text-[#4a211c]">
                Helpful details
              </p>

              <ul className="mt-4 space-y-3 text-sm text-[#6d5149]">
                <li className="flex gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#8b1e2d]" />
                  What would you like created?
                </li>

                <li className="flex gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#8b1e2d]" />
                  Preferred craft or region, if any
                </li>

                <li className="flex gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#8b1e2d]" />
                  Approximate size and quantity
                </li>

                <li className="flex gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#8b1e2d]" />
                  Desired delivery timeline
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_10px_35px_rgba(67,35,25,0.07)] sm:p-8">
            {submitted ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Check className="h-8 w-8 text-[#8b1e2d]" />
                </div>

                <h3 className="mt-6 font-serif text-3xl font-semibold text-[#4a211c]">
                  Request Ready
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#6d5149]">
                  Your custom request has been captured in this form session.
                  A dedicated custom-order endpoint can be connected here when
                  the backend API is added.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 text-sm font-bold text-[#8b1e2d]"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="custom-name"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Your Name
                    </label>

                    <input
                      id="custom-name"
                      name="name"
                      required
                      placeholder="Enter your name"
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="custom-email"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Email
                    </label>

                    <input
                      id="custom-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="craft"
                    className="text-sm font-semibold text-[#4a211c]"
                  >
                    Craft / Product Type
                  </label>

                  <input
                    id="craft"
                    name="craft"
                    required
                    placeholder="e.g. Madhubani painting, textile, pottery..."
                    className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Quantity
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      placeholder="Approx. quantity"
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Approx. Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                    >
                      <option value="" disabled>
                        Select budget
                      </option>
                      <option>Under ₹5,000</option>
                      <option>₹5,000 - ₹15,000</option>
                      <option>₹15,000 - ₹50,000</option>
                      <option>₹50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="custom-message"
                    className="text-sm font-semibold text-[#4a211c]"
                  >
                    Describe Your Idea
                  </label>

                  <textarea
                    id="custom-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your vision, colours, size, occasion, references, or anything else that can help us understand it."
                    className="mt-2 w-full resize-none rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#8b1e2d]"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#b08a4a]/40 bg-[#efe4ce]/50 p-4">
                  <Upload className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

                  <span>
                    <span className="block text-sm font-semibold text-[#4a211c]">
                      Reference image
                    </span>

                    <span className="mt-1 block text-xs text-[#80665d]">
                      Optional — visual references can help us understand your
                      idea.
                    </span>
                  </span>

                  <input
                    type="file"
                    name="reference"
                    accept="image/*"
                    className="sr-only"
                  />
                </label>

                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-6 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
                >
                  Send Custom Request
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-[11px] leading-5 text-[#80665d]">
                  We&apos;ll contact you to discuss feasibility, pricing, and
                  timelines before anything is confirmed.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b08a4a]/30 bg-[#efe4ce]">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-center">
          <p className="font-serif text-2xl italic text-[#4a211c]">
            &ldquo;Every handmade piece begins with an idea.&rdquo;
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/artisans"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/30 bg-[#fbf6e9] px-6 py-3 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#f7f0df]"
            >
              Meet Our Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
            >
              Explore Crafts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
