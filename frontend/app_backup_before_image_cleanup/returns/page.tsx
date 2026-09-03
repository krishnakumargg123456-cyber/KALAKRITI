import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const returnSteps = [
  {
    number: "01",
    title: "Request a Return",
    description:
      "Contact KALAKRITI support with your order details and the reason for your return.",
  },
  {
    number: "02",
    title: "Verification",
    description:
      "Our team reviews the request and confirms whether the product is eligible for return.",
  },
  {
    number: "03",
    title: "Safe Packaging",
    description:
      "Pack the handcrafted product securely with all original accessories and packaging.",
  },
  {
    number: "04",
    title: "Pickup & Inspection",
    description:
      "The eligible product is collected and inspected according to our return guidelines.",
  },
  {
    number: "05",
    title: "Refund",
    description:
      "Once the return is approved, the applicable refund is initiated through the original payment method.",
  },
];

const eligibleItems = [
  "Product received damaged or defective",
  "Wrong product received",
  "Product significantly different from its listed description",
  "Product received with missing essential components",
];

const nonEligibleItems = [
  "Products damaged after delivery due to misuse",
  "Products modified, washed or altered by the customer",
  "Items without required original packaging where applicable",
  "Return requests made after the applicable return period",
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="border-b border-deep-maroon/10 bg-[#f4ead8]">
        <div className="kalakriti-container px-4 py-16 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-deep-maroon hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              KALAKRITI Policies
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold text-deep-maroon md:text-6xl">
              Returns & Refunds
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-brown">
              We want every handcrafted piece you receive to meet your
              expectations. Learn how returns, replacements and refunds work.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="kalakriti-container px-4 py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-gold/30 bg-[#f6eedf] p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-maroon text-cream">
              <RotateCcw size={22} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
              Easy Return Process
            </h2>

            <p className="mt-3 leading-7 text-brown">
              Eligible products can be returned through a simple support-led
              process.
            </p>
          </div>

          <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-maroon text-cream">
              <PackageCheck size={22} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
              Carefully Checked
            </h2>

            <p className="mt-3 leading-7 text-brown">
              Returned products are checked before a refund or replacement is
              processed.
            </p>
          </div>

          <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-maroon text-cream">
              <ShieldCheck size={22} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-deep-maroon">
              Customer Protection
            </h2>

            <p className="mt-3 leading-7 text-brown">
              We aim to provide a transparent resolution for genuine product
              issues.
            </p>
          </div>
        </div>
      </section>

      {/* Policy */}
      <section className="border-y border-deep-maroon/10 bg-[#f8f0e1]">
        <div className="kalakriti-container px-4 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              Return Policy
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
              When can you request a return?
            </h2>

            <p className="mt-5 leading-8 text-brown">
              KALAKRITI accepts return requests for eligible products when
              there is a genuine issue with the delivered order. Because many
              of our products are handmade, natural variations in colour,
              texture, pattern and finish may occur and are not necessarily
              considered defects.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-heritage-green/20 bg-white p-7">
                <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                  Eligible situations
                </h3>

                <ul className="mt-5 space-y-4">
                  {eligibleItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-brown">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-heritage-green"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
                <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                  Generally not eligible
                </h3>

                <ul className="mt-5 space-y-4">
                  {nonEligibleItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-brown">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-deep-maroon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="kalakriti-container px-4 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              How It Works
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
              Return process
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-brown">
              Follow these steps if you need assistance with an eligible
              return.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {returnSteps.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 rounded-2xl border border-deep-maroon/10 bg-white p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-deep-maroon font-serif font-bold text-cream">
                  {step.number}
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-deep-maroon">
                    {step.title}
                  </h3>

                  <p className="mt-2 leading-7 text-brown">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund */}
      <section className="border-y border-deep-maroon/10 bg-[#f6eedf]">
        <div className="kalakriti-container px-4 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold/30 bg-white/70 p-7 md:p-10">
            <h2 className="font-serif text-3xl font-bold text-deep-maroon">
              Refund information
            </h2>

            <div className="mt-5 space-y-4 leading-7 text-brown">
              <p>
                Once an eligible return is approved after inspection, the
                applicable refund is initiated through the original payment
                method.
              </p>

              <p>
                The time taken for the amount to appear in your account can
                depend on the payment provider or bank.
              </p>

              <p>
                If a replacement is approved instead of a refund, the
                replacement process will be communicated by our support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Handmade disclaimer */}
      <section className="kalakriti-container px-4 py-14">
        <div className="mx-auto max-w-4xl border-l-4 border-gold bg-[#f4ead8] p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-deep-maroon">
            A note about handmade products
          </h2>

          <p className="mt-3 leading-7 text-brown">
            Handmade products naturally contain small differences in colour,
            texture, shape and pattern. These variations are part of their
            character and reflect the artisan&apos;s individual craftsmanship.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-deep-maroon/10 bg-deep-maroon">
        <div className="kalakriti-container px-4 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Need Assistance?
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-cream">
            Have a return-related question?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-cream/75">
            Our support team can help you understand your order and the
            applicable return process.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3 font-semibold text-deep-maroon transition hover:opacity-90"
          >
            Contact KALAKRITI
          </Link>
        </div>
      </section>
    </main>
  );
}
