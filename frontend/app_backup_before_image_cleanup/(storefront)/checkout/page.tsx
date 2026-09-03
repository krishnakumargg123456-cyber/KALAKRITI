"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  artisan: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Madhubani Handpainted Wall Art",
      artisan: "Sita Devi · Madhubani, Bihar",
      price: 2499,
      quantity: 1,
    },
    {
      id: 2,
      name: "Jaipur Blue Pottery Vase",
      artisan: "Mohan Kumar · Jaipur, Rajasthan",
      price: 1899,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <header className="border-b border-[#b08a4a]/30 bg-[#fbf6e9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wide text-[#8b1e2d]"
          >
            KALAKRITI
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#80665d]">
            <ShieldCheck className="h-4 w-4 text-[#58704d]" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link href="/" className="hover:text-[#8b1e2d]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/cart" className="hover:text-[#8b1e2d]">
            Cart
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#4a211c]">Checkout</span>
        </div>

        <div className="mt-8 flex items-center">
          <Step number="1" title="Cart" active />
          <Line active />
          <Step number="2" title="Address" />
          <Line />
          <Step number="3" title="Payment" />
          <Line />
          <Step number="4" title="Done" />
        </div>

        {items.length === 0 ? (
          <section className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9] px-6 py-16 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#efe4ce] text-[#8b1e2d]">
              <ShoppingBag className="h-7 w-7" />
            </span>

            <h1 className="mt-6 font-serif text-3xl font-semibold text-[#4a211c]">
              Your checkout is empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#80665d]">
              Add a handcrafted piece to your cart before continuing to
              checkout.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <section>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                  Your Selection
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
                  Review your order
                </h1>

                <p className="mt-2 text-sm text-[#6d5149]">
                  Check your handmade pieces before entering your delivery
                  details.
                </p>
              </div>

              <div className="mt-7 space-y-4">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-5 sm:p-6"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d] sm:h-28 sm:w-28">
                        <ShoppingBag className="h-8 w-8" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/products/${item.id}`}
                              className="font-serif text-xl font-semibold text-[#4a211c] hover:text-[#8b1e2d]"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-1 text-xs text-[#80665d]">
                              {item.artisan}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-[#80665d] transition hover:text-[#8b1e2d]"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center overflow-hidden rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="flex h-9 w-9 items-center justify-center text-[#8b1e2d] hover:bg-[#efe4ce]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="flex h-9 w-10 items-center justify-center border-x border-[#b08a4a]/25 text-sm font-bold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="flex h-9 w-9 items-center justify-center text-[#8b1e2d] hover:bg-[#efe4ce]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="font-serif text-xl font-bold text-[#8b1e2d]">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/60 p-5">
                <Truck className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

                <div>
                  <p className="text-sm font-bold text-[#4a211c]">
                    Free delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#80665d]">
                    Your current order qualifies for complimentary delivery.
                  </p>
                </div>
              </div>

              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </section>

            <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 lg:sticky lg:top-6">
              <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                Checkout Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-[#b08a4a]/25 pb-6">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6d5149]">
                    Items ({items.length})
                  </span>
                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-[#6d5149]">Delivery</span>
                  <span className="font-semibold text-[#58704d]">
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between gap-4 py-5">
                <span className="font-serif text-lg font-semibold">
                  Total
                </span>

                <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                href="/checkout/address"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725]"
              >
                Continue to Address
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-5 flex gap-3 rounded-xl bg-[#efe4ce]/70 p-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#58704d]" />

                <p className="text-[11px] leading-5 text-[#80665d]">
                  Secure checkout with protected payment processing and careful
                  artisan packaging.
                </p>
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-[#b08a4a]/25 pt-5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8b1e2d]" />

                <p className="text-[11px] leading-5 text-[#80665d]">
                  You&apos;ll confirm your delivery address on the next step.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function Step({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
          active
            ? "bg-[#8b1e2d] text-[#fff8eb]"
            : "border border-[#b08a4a]/50 bg-[#fbf6e9] text-[#80665d]"
        }`}
      >
        {active ? <Check className="h-4 w-4" /> : number}
      </span>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active ? "text-[#8b1e2d]" : "text-[#80665d]"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function Line({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`mx-3 h-px min-w-5 flex-1 ${
        active ? "bg-[#8b1e2d]/40" : "bg-[#b08a4a]/35"
      }`}
    />
  );
}