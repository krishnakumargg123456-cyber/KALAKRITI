"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  HelpCircle,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useState } from "react";

type OrderItem = {
  id: number;
  name: string;
  artisan: string;
  quantity: number;
  price: number;
  image: string;
};

const orderItems: OrderItem[] = [
  {
    id: 1,
    name: "Hand-painted Madhubani Artwork",
    artisan: "Sita Devi",
    quantity: 1,
    price: 2850,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 2,
    name: "Hand Block Printed Cotton Dupatta",
    artisan: "Ramesh Lal",
    quantity: 1,
    price: 1450,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=85",
  },
];

const statusSteps = [
  {
    title: "Order Placed",
    date: "28 Aug 2026",
    description: "Your order has been successfully placed.",
  },
  {
    title: "Confirmed",
    date: "28 Aug 2026",
    description: "The artisan has received your order.",
  },
  {
    title: "Being Crafted",
    date: "29 Aug 2026",
    description: "Your handmade pieces are being prepared.",
  },
  {
    title: "Shipped",
    date: "Expected 03 Sep 2026",
    description: "Your package will be handed to our delivery partner.",
  },
  {
    title: "Delivered",
    date: "Expected 06 Sep 2026",
    description: "Your KALAKRITI order arrives at your doorstep.",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [copied, setCopied] = useState(false);

  const orderId = `KAL-${params.id || "2026-00124"}`;
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 99;
  const discount = 300;
  const total = subtotal + shipping - discount;

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#72554c] transition hover:text-[#8b1e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Orders
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
                Order Details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
                  {orderId}
                </h1>

                <button
                  type="button"
                  onClick={copyOrderId}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#b08a4a]/40 bg-[#fbf6e9] px-3 py-1.5 text-xs font-semibold text-[#72554c] transition hover:text-[#8b1e2d]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <p className="mt-2 text-sm text-[#80665d]">
                Placed on 28 August 2026
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#8b1e2d] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#fff8eb]">
              <Package className="h-4 w-4" />
              Being Crafted
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Tracking */}
        <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_8px_30px_rgba(67,35,25,0.05)] sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Order Journey
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                Your handmade order is on its way
              </h2>
            </div>

            <p className="text-sm font-medium text-[#80665d]">
              Estimated delivery:{" "}
              <span className="font-bold text-[#4a211c]">06 Sep 2026</span>
            </p>
          </div>

          <div className="mt-10">
            {statusSteps.map((step, index) => {
              const completed = index <= 2;
              const current = index === 2;
              const isLast = index === statusSteps.length - 1;

              return (
                <div key={step.title} className="relative flex gap-5">
                  {!isLast && (
                    <div
                      className={`absolute left-[17px] top-9 h-[calc(100%-8px)] w-px ${
                        index < 2 ? "bg-[#8b1e2d]" : "bg-[#b08a4a]/30"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-[#8b1e2d] bg-[#8b1e2d] text-[#fff8eb]"
                        : "border-[#b08a4a]/40 bg-[#f7f0df] text-[#80665d]"
                    } ${current ? "ring-4 ring-[#8b1e2d]/10" : ""}`}
                  >
                    {completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#b08a4a]" />
                    )}
                  </div>

                  <div className={`${isLast ? "pb-0" : "pb-8"} pt-0.5`}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3
                        className={`font-serif text-lg font-semibold ${
                          completed
                            ? "text-[#4a211c]"
                            : "text-[#80665d]"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <span className="text-xs font-medium text-[#8b1e2d]">
                        {step.date}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-[#6d5149]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Items */}
          <div className="space-y-8">
            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                    Your Items
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                    Handmade with care
                  </h2>
                </div>

                <span className="text-sm text-[#80665d]">
                  {orderItems.length} items
                </span>
              </div>

              <div className="mt-7 divide-y divide-[#b08a4a]/20">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#b08a4a]/30 bg-[#efe4ce]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-semibold text-[#4a211c]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#80665d]">
                        Artisan: {item.artisan}
                      </p>

                      <p className="mt-2 text-xs text-[#80665d]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#4a211c]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Truck className="h-5 w-5 text-[#8b1e2d]" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                    Delivery
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-[#4a211c]">
                    Shipping to your address
                  </h2>
                </div>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <p className="text-sm font-semibold text-[#4a211c]">
                      Delivery Address
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                      Krishna Kumar Gupta
                      <br />
                      24 Heritage Lane
                      <br />
                      Mathura, Uttar Pradesh 281001
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <p className="text-sm font-semibold text-[#4a211c]">
                      Delivery Estimate
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                      Expected between
                      <br />
                      <strong className="text-[#4a211c]">
                        04 – 06 September 2026
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]/70 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                      Need help with your order?
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#6d5149]">
                      Our support team is here to help with delivery, returns,
                      or anything else.
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#8b1e2d]"
                >
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside>
            <section className="sticky top-6 rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_8px_30px_rgba(67,35,25,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Payment Summary
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                Order Total
              </h2>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-[#6d5149]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#4a211c]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[#6d5149]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#4a211c]">
                    {formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[#6d5149]">
                  <span>Discount</span>
                  <span className="font-medium text-[#8b1e2d]">
                    -{formatPrice(discount)}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-[#b08a4a]/25" />

              <div className="flex items-end justify-between gap-4">
                <span className="font-serif text-lg font-semibold text-[#4a211c]">
                  Total
                </span>

                <span className="font-serif text-2xl font-bold text-[#8b1e2d]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-6 rounded-lg border border-[#b08a4a]/25 bg-[#efe4ce]/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#80665d]">
                  Payment Method
                </p>

                <p className="mt-2 text-sm font-semibold text-[#4a211c]">
                  Razorpay
                </p>

                <p className="mt-1 text-xs text-[#80665d]">
                  Payment completed securely
                </p>
              </div>

              <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#80665d]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8b1e2d]" />
                <span>
                  Your payment is protected and your order is covered by
                  KALAKRITI&apos;s customer support policy.
                </span>
              </div>

              <Link
                href="/orders"
                className="mt-7 flex h-12 items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/35 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d]/5"
              >
                View All Orders
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}