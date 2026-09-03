"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gift,
  Heart,
  PackageCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { FormEvent, useState } from "react";

const benefits = [
  {
    icon: Gift,
    title: "Thoughtful & Meaningful",
    text: "Gifts that carry India's heritage and tell a story beyond the occasion.",
  },
  {
    icon: Users,
    title: "Made for Your Team",
    text: "Curated collections for employees, clients, partners, and special guests.",
  },
  {
    icon: PackageCheck,
    title: "Handled End-to-End",
    text: "From curation and custom packaging to coordinated delivery across India.",
  },
];

const occasions = [
  "Employee Welcome Gifts",
  "Festive & Diwali Gifting",
  "Client Appreciation",
  "Wedding & Celebration",
  "Conference & Events",
  "Leadership Gifts",
];

const collections = [
  {
    title: "Heritage Hampers",
    text: "A beautiful combination of regional crafts, artisanal foods, and heritage-inspired keepsakes.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Artisan Keepsakes",
    text: "Distinctive handmade objects selected for their craftsmanship and cultural character.",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Premium Craft Gifts",
    text: "Statement pieces for important relationships, milestones, and executive occasions.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function CorporateGiftingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b08a4a]/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(139,30,45,0.08),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(176,138,74,0.12),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[#8b1e2d]">
              <span className="h-px w-12 bg-[#b08a4a]" />
              <Gift className="h-5 w-5" />
              <span className="h-px w-12 bg-[#b08a4a]" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              Corporate Gifting
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl lg:text-6xl">
              Give a Gift
              <span className="block italic text-[#8b1e2d]">
                With a Story
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#6d5149] sm:text-lg">
              Celebrate relationships with authentic Indian craftsmanship.
              KALAKRITI creates thoughtful corporate gifting experiences that
              bring together heritage, artistry, and purpose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#enquire"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
              >
                Start an Enquiry
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/35 bg-[#fbf6e9] px-7 py-3.5 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#efe4ce]"
              >
                Explore Crafts
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-[#b08a4a]/30" />

            <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/40 bg-[#efe4ce]">
              <img
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=85"
                alt="Thoughtfully arranged artisan gifts"
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/30 bg-[#3d1f1b]/85 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#e5c98b]" />
                  <p className="font-serif text-lg font-semibold text-[#fff8eb]">
                    Crafted with intention
                  </p>
                </div>
                <p className="mt-1 text-xs leading-5 text-[#f1dfc9]">
                  Authentic handmade gifts that honour the people who make
                  them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Why KALAKRITI
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
            More Than Just a Gift
          </h2>
          <p className="mt-4 leading-7 text-[#6d5149]">
            Every gift can become an opportunity to celebrate Indian
            craftsmanship and create a meaningful connection.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 text-center shadow-[0_8px_25px_rgba(67,35,25,0.05)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Icon className="h-6 w-6 text-[#8b1e2d]" />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-[#4a211c]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Occasions */}
      <section className="border-y border-[#b08a4a]/25 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
                Every Occasion
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#4a211c] sm:text-4xl">
                Gifting for Every
                <span className="block italic text-[#8b1e2d]">
                  Meaningful Moment
                </span>
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-[#6d5149]">
                Whether you are welcoming someone new, celebrating a milestone,
                or thanking a valued partner, our team can create a collection
                suited to your occasion.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {occasions.map((occasion) => (
                <div
                  key={occasion}
                  className="flex items-center gap-3 rounded-lg border border-[#b08a4a]/30 bg-[#fbf6e9] p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                    <Check className="h-4 w-4 text-[#8b1e2d]" />
                  </span>
                  <span className="text-sm font-medium text-[#4a211c]">
                    {occasion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Curated Collections
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
            A Collection Worth Remembering
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {collections.map((collection) => (
            <article
              key={collection.title}
              className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.05)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-[#4a211c]">
                  {collection.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                  {collection.text}
                </p>

                <a
                  href="#enquire"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
                >
                  Enquire About This
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section
        id="enquire"
        className="border-t border-[#b08a4a]/30 bg-[#3d1f1b]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-20">
          <div className="text-[#fff8eb]">
            <div className="flex items-center gap-3 text-[#e5c98b]">
              <span className="h-px w-12 bg-[#e5c98b]" />
              <Heart className="h-5 w-5" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              Let&apos;s Create Together
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Tell Us About
              <span className="block italic text-[#e5c98b]">
                Your Gifting Needs
              </span>
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-[#e7d2bd]">
              Share a few details about your organisation, occasion, quantity,
              and budget. Our gifting team will help you create the right
              collection.
            </p>

            <div className="mt-8 space-y-3 text-sm text-[#e7d2bd]">
              <p>✓ Personalised curation</p>
              <p>✓ Custom packaging options</p>
              <p>✓ Bulk order coordination</p>
              <p>✓ Pan-India delivery support</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Check className="h-8 w-8 text-[#8b1e2d]" />
                </div>

                <h3 className="mt-6 font-serif text-3xl font-semibold text-[#4a211c]">
                  Thank You
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#6d5149]">
                  Your enquiry has been received. Our gifting team will get in
                  touch with you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 text-sm font-bold text-[#8b1e2d]"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-[#4a211c]"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d] focus:ring-1 focus:ring-[#8b1e2d]/20"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="company"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Work Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Approx. Quantity
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select quantity
                      </option>
                      <option>10–25</option>
                      <option>25–50</option>
                      <option>50–100</option>
                      <option>100–250</option>
                      <option>250+</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="occasion"
                      className="text-sm font-semibold text-[#4a211c]"
                    >
                      Occasion
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      className="mt-2 h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select occasion
                      </option>
                      {occasions.map((occasion) => (
                        <option key={occasion}>{occasion}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-[#4a211c]"
                  >
                    Tell Us More
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-[#b08a4a]/35 bg-[#f7f0df] px-4 py-3 text-sm outline-none focus:border-[#8b1e2d]"
                    placeholder="Tell us about your requirements, preferred craft, budget, delivery timeline, or anything else..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-6 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
                >
                  Submit Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-center text-[11px] leading-5 text-[#80665d]">
                  We&apos;ll only use your details to respond to this enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}