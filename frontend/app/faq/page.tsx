"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is KALAKRITI?",
    answer:
      "KALAKRITI is a traditional Indian handicraft marketplace connecting customers with authentic artisans and handcrafted products from different regions of India.",
  },
  {
    question: "Are KALAKRITI products handmade?",
    answer:
      "Yes. Our marketplace focuses on authentic handcrafted products created using traditional Indian craftsmanship and regional techniques.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse our shop, open a product, select the required quantity and add it to your cart. Continue to checkout, provide your delivery address and complete the payment.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you can view its status from My Account ? Orders. Order updates will be shown as the order moves through processing, shipping and delivery.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "KALAKRITI supports secure online payments through the available payment gateway. The payment options shown at checkout depend on the currently supported methods.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Cancellation depends on the current status of your order. Orders that have not entered processing or shipping may be eligible for cancellation.",
  },
  {
    question: "What is the return policy?",
    answer:
      "Eligible products can be returned according to KALAKRITI's return policy. Please check the Returns page for product eligibility, timelines and the return process.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the destination, product availability and artisan location. The estimated delivery information will be provided during the order process whenever available.",
  },
  {
    question: "Can I save multiple delivery addresses?",
    answer:
      "Yes. Logged-in customers can manage multiple saved delivery addresses from My Account ? Addresses and choose a default address.",
  },
  {
    question: "How do I add a product to my wishlist?",
    answer:
      "Open the product you like and select the heart icon. Your saved products can then be accessed from the Wishlist section.",
  },
  {
    question: "Can I contact an artisan directly?",
    answer:
      "Artisan information is available on supported product and artisan pages. For marketplace-related assistance, you can contact the KALAKRITI support team.",
  },
  {
    question: "How does KALAKRITI support artisans?",
    answer:
      "KALAKRITI helps bring traditional artisans and their handcrafted work to a wider audience while highlighting the cultural heritage behind each craft.",
  },
];

function FAQItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition ${
        open
          ? "border-gold/50 bg-[#f8f0e1]"
          : "border-deep-maroon/10 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-6"
        aria-expanded={open}
      >
        <span className="font-serif text-lg font-semibold text-deep-maroon">
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-deep-maroon/10 text-deep-maroon transition ${
            open ? "rotate-180 bg-deep-maroon text-cream" : "bg-cream"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      {open && (
        <div className="border-t border-deep-maroon/10 px-5 pb-6 pt-5 md:px-6">
          <p className="max-w-3xl leading-7 text-brown">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="border-b border-deep-maroon/10 bg-[#f4ead8]">
        <div className="kalakriti-container px-4 py-16 text-center md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            KALAKRITI Help Centre
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-deep-maroon md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-brown md:text-lg">
            Find answers about shopping, orders, delivery, returns,
            payments and our Indian craft heritage marketplace.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="kalakriti-container px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep-maroon text-cream">
              <HelpCircle size={21} />
            </span>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">
                Help & Guidance
              </p>
              <h2 className="font-serif text-2xl font-bold text-deep-maroon">
                Everything you need to know
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="border-y border-deep-maroon/10 bg-[#f6eedf]">
        <div className="kalakriti-container px-4 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold/30 bg-white/60 p-7 md:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  Still need help?
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold text-deep-maroon">
                  We are here to help
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-brown">
                  If you could not find the answer you were looking for,
                  reach out to the KALAKRITI support team.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-deep-maroon px-6 py-3 font-semibold text-cream transition hover:bg-maroon"
              >
                <MessageCircle size={18} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="kalakriti-container px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/shipping"
            className="rounded-xl border border-deep-maroon/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/40"
          >
            <p className="font-serif text-xl font-bold text-deep-maroon">
              Shipping
            </p>
            <p className="mt-2 text-sm leading-6 text-brown">
              Learn about delivery and shipping information.
            </p>
          </Link>

          <Link
            href="/returns"
            className="rounded-xl border border-deep-maroon/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/40"
          >
            <p className="font-serif text-xl font-bold text-deep-maroon">
              Returns
            </p>
            <p className="mt-2 text-sm leading-6 text-brown">
              Understand our return and refund process.
            </p>
          </Link>

          <Link
            href="/our-story"
            className="rounded-xl border border-deep-maroon/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/40"
          >
            <p className="font-serif text-xl font-bold text-deep-maroon">
              Our Story
            </p>
            <p className="mt-2 text-sm leading-6 text-brown">
              Discover the story behind KALAKRITI.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
