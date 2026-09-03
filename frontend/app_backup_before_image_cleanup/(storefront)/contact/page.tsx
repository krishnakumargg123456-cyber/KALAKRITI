"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const contactOptions = [
  {
    icon: ShoppingBagIcon,
    title: "Order Support",
    description:
      "Questions about an order, delivery, returns or a product you purchased?",
    action: "View Orders",
    href: "/orders",
  },
  {
    icon: MessageCircle,
    title: "General Enquiries",
    description:
      "Need help choosing a craft, understanding a product or navigating KALAKRITI?",
    action: "Send a Message",
    href: "#contact-form",
  },
  {
    icon: UsersIcon,
    title: "Artisan & Partnership",
    description:
      "Interested in becoming an artisan partner or collaborating with KALAKRITI?",
    action: "Learn More",
    href: "/custom-orders",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              We&apos;re here to help
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#fff8eb] sm:text-6xl">
              Let&apos;s talk.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              Whether you have a question about a handmade piece, need help
              with an order or simply want to learn more about Indian crafts,
              we would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {/* Contact options */}
        <section className="grid gap-5 lg:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <article
                key={option.title}
                className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 transition hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_16px_35px_rgba(67,35,25,0.07)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
                  <Icon />
                </div>

                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                  {option.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#80665d]">
                  {option.description}
                </p>

                <Link
                  href={option.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
                >
                  {option.action}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </section>

        {/* Main contact area */}
        <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div
            id="contact-form"
            className="rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-7 sm:p-9 lg:p-10"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Send us a message
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c]">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#80665d]">
                Share a few details and our team will get back to you.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#58704d]/30 bg-[#eef2e8] p-7">
                <CheckCircle2 className="h-8 w-8 text-[#58704d]" />

                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#4a211c]">
                  Message received
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                  Thank you for reaching out to KALAKRITI. Our team will review
                  your message and get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm font-bold text-[#8b1e2d]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Your Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold text-[#4a211c]"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      className="h-12 w-full rounded-xl border border-[#b08a4a]/30 bg-[#fffaf0] px-4 text-sm text-[#4a211c] outline-none transition focus:border-[#8b1e2d]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="order">Order Support</option>
                      <option value="product">Product Question</option>
                      <option value="artisan">Artisan Partnership</option>
                      <option value="custom">Custom Order</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold text-[#4a211c]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-[#b08a4a]/30 bg-[#fffaf0] px-4 py-3 text-sm leading-6 text-[#4a211c] outline-none transition placeholder:text-[#80665d] focus:border-[#8b1e2d]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725]"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>

                <p className="text-[11px] leading-5 text-[#80665d]">
                  By submitting this form, you agree that KALAKRITI may use
                  your details to respond to your enquiry.
                </p>
              </form>
            )}
          </div>

          {/* Contact details */}
          <aside className="space-y-5">
            <div className="rounded-3xl bg-[#8b1e2d] p-7 text-[#fff8eb] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Contact Details
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold">
                We&apos;re listening.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#f1dfc9]">
                Reach us through the channel that works best for you.
              </p>

              <div className="mt-8 space-y-6">
                <ContactDetail
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value="hello@kalakriti.in"
                />

                <ContactDetail
                  icon={<Phone className="h-5 w-5" />}
                  label="Customer Care"
                  value="+91 80000 12345"
                />

                <ContactDetail
                  icon={<Clock3 className="h-5 w-5" />}
                  label="Support Hours"
                  value="Mon – Sat · 10 AM – 6 PM"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-7">
              <MapPin className="h-6 w-6 text-[#8b1e2d]" />

              <h3 className="mt-4 font-serif text-2xl font-semibold text-[#4a211c]">
                Craft connects us
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6d5149]">
                Our work reaches artisan communities across India. Every
                question helps us make the experience more transparent and
                human.
              </p>

              <Link
                href="/artisans"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
              >
                Meet the artisans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </section>

        {/* FAQ CTA */}
        <section className="mt-14 flex flex-col gap-6 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Looking for a quick answer?
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
              Visit our frequently asked questions.
            </h2>

            <p className="mt-2 text-sm text-[#80665d]">
              Find information about orders, shipping, returns and more.
            </p>
          </div>

          <Link
            href="/faq"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
          >
            Visit FAQ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold text-[#4a211c]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#b08a4a]/30 bg-[#fffaf0] px-4 text-sm text-[#4a211c] outline-none transition placeholder:text-[#80665d] focus:border-[#8b1e2d]"
      />
    </div>
  );
}

function ContactDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff8eb]/10 text-[#e5c98b]">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#e5c98b]">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-[#fff8eb]">{value}</p>
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return <span className="text-lg">🛍</span>;
}

function UsersIcon() {
  return <span className="text-lg">👥</span>;
}