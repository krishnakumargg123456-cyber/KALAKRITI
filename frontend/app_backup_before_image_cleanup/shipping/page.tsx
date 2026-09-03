import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

const shippingHighlights = [
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Orders are carefully packed and handed over to trusted delivery partners.",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    text: "Handcrafted products are packed with care to help protect them during transit.",
  },
  {
    icon: MapPin,
    title: "India-Wide Delivery",
    text: "We aim to make India's traditional crafts accessible to customers across the country.",
  },
  {
    icon: ShieldCheck,
    title: "Order Protection",
    text: "If your order arrives with a genuine delivery issue, contact our support team promptly.",
  },
];

const deliveryStages = [
  {
    number: "01",
    title: "Order Confirmed",
    text: "Your order is received and the product details are verified.",
  },
  {
    number: "02",
    title: "Craft & Prepare",
    text: "The artisan or fulfilment team prepares and carefully packs your order.",
  },
  {
    number: "03",
    title: "Dispatched",
    text: "Your package is handed to the delivery partner and tracking information is updated when available.",
  },
  {
    number: "04",
    title: "On the Way",
    text: "The shipment travels through the delivery network towards your address.",
  },
  {
    number: "05",
    title: "Delivered",
    text: "Your handcrafted piece reaches your doorstep.",
  },
];

export default function ShippingPage() {
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
              Shipping & Delivery
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-brown">
              From an artisan&apos;s hands to your home, every KALAKRITI order
              is prepared and packed with care.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="kalakriti-container px-4 py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {shippingHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-deep-maroon/10 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deep-maroon text-cream">
                  <Icon size={21} />
                </div>

                <h2 className="mt-5 font-serif text-xl font-bold text-deep-maroon">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-brown">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Delivery information */}
      <section className="border-y border-deep-maroon/10 bg-[#f8f0e1]">
        <div className="kalakriti-container px-4 py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                Delivery Journey
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
                Your craft travels with care
              </h2>

              <p className="mt-5 leading-8 text-brown">
                Handmade products may require careful preparation before
                dispatch. Delivery timing can therefore vary depending on the
                product, artisan, destination and courier network.
              </p>

              <div className="mt-7 rounded-2xl border border-gold/30 bg-white p-6">
                <div className="flex gap-4">
                  <Clock3 className="mt-1 shrink-0 text-gold" size={23} />

                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-maroon">
                      Delivery timelines
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-brown">
                      The estimated delivery timeline shown during checkout or
                      in your order details should be treated as the primary
                      estimate. Remote locations and unforeseen courier delays
                      may require additional time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {deliveryStages.map((stage) => (
                <div
                  key={stage.number}
                  className="flex gap-5 rounded-2xl border border-deep-maroon/10 bg-white p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-deep-maroon font-serif font-bold text-cream">
                    {stage.number}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-deep-maroon">
                      {stage.title}
                    </h3>

                    <p className="mt-2 leading-7 text-brown">
                      {stage.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important information */}
      <section className="kalakriti-container px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Important Information
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon md:text-4xl">
            Before your order arrives
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
              <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                Address accuracy
              </h3>

              <p className="mt-3 leading-7 text-brown">
                Please check your delivery address, phone number and postal
                code carefully before placing an order. Incorrect address
                information can cause delays or failed delivery attempts.
              </p>
            </div>

            <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
              <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                Tracking
              </h3>

              <p className="mt-3 leading-7 text-brown">
                When tracking information is available, it can be used to
                follow your shipment&apos;s progress after dispatch.
              </p>
            </div>

            <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
              <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                Delivery attempts
              </h3>

              <p className="mt-3 leading-7 text-brown">
                If the courier cannot complete delivery, additional attempts
                may be made according to the courier&apos;s operational policy.
              </p>
            </div>

            <div className="rounded-2xl border border-deep-maroon/10 bg-white p-7">
              <h3 className="font-serif text-2xl font-bold text-deep-maroon">
                Delays
              </h3>

              <p className="mt-3 leading-7 text-brown">
                Weather, regional restrictions, holidays, high shipment
                volumes and other circumstances can affect delivery timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Handmade note */}
      <section className="border-y border-deep-maroon/10 bg-[#f6eedf]">
        <div className="kalakriti-container px-4 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-gold/30 bg-white/70 p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              The KALAKRITI Promise
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon">
              More than a package
            </h2>

            <p className="mt-4 leading-8 text-brown">
              Every order represents the work, skill and cultural heritage of
              an artisan. We take care to preserve that journey from the
              workshop to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep-maroon">
        <div className="kalakriti-container px-4 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Need Help?
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-cream">
            Questions about your delivery?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-cream/75">
            Our support team can help with questions about your order,
            shipment and delivery.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3 font-semibold text-deep-maroon transition hover:opacity-90"
            >
              Track My Orders
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-cream/40 px-7 py-3 font-semibold text-cream transition hover:bg-cream hover:text-deep-maroon"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
