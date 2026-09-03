"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  artisan: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Hand-Painted Madhubani Wall Art",
    artisan: "Mithila Artisan Collective",
    category: "Madhubani",
    price: 2499,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Handwoven Banarasi Silk Stole",
    artisan: "Varanasi Weavers",
    category: "Handloom",
    price: 1899,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

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

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#b08a4a]/40 bg-[#efe4ce]">
            <ShoppingBag className="h-10 w-10 text-[#8b1e2d]" />
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            Your Cart
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
            Your cart is waiting
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-[#6d5149]">
            Discover handmade treasures created by India&apos;s artisans and bring
            a piece of our craft heritage home.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
          >
            Explore the Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/70">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <Link
            href="/shop"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#72554c] transition hover:text-[#8b1e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
                Your Collection
              </p>

              <h1 className="mt-2 font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
                Shopping Bag
              </h1>
            </div>

            <p className="text-sm text-[#72554c]">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div>
            <div className="space-y-5">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-4 shadow-[0_6px_25px_rgba(67,35,25,0.05)] sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={`/product/${item.id}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-[#efe4ce] sm:h-36 sm:w-32"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b1e2d]">
                            {item.category}
                          </p>

                          <Link
                            href={`/product/${item.id}`}
                            className="mt-1 block font-serif text-xl font-semibold leading-tight text-[#4a211c] transition hover:text-[#8b1e2d] sm:text-2xl"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-xs text-[#80665d]">
                            By {item.artisan}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="rounded-md p-2 text-[#80665d] transition hover:bg-[#8b1e2d]/10 hover:text-[#8b1e2d]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center rounded-lg border border-[#b08a4a]/40 bg-[#f7f0df]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity === 1}
                            className="p-2.5 text-[#65443c] transition hover:text-[#8b1e2d] disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="min-w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2.5 text-[#65443c] transition hover:text-[#8b1e2d]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="font-serif text-xl font-semibold text-[#4a211c]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Trust */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/60 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <ShieldCheck className="h-5 w-5 text-[#8b1e2d]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4a211c]">
                    Authentic Craft
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#80665d]">
                    Every piece is sourced from verified artisans.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/60 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Truck className="h-5 w-5 text-[#8b1e2d]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4a211c]">
                    Safe Delivery
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#80665d]">
                    Carefully packed and delivered across India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_10px_35px_rgba(67,35,25,0.07)] sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#b08a4a]/40" />
              <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                Order Summary
              </h2>
              <span className="h-px flex-1 bg-[#b08a4a]/40" />
            </div>

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
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>

              <div className="border-t border-[#b08a4a]/30 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#80665d]">
                      Total
                    </p>
                    <p className="mt-1 text-xs text-[#80665d]">
                      Inclusive of applicable taxes
                    </p>
                  </div>

                  <p className="font-serif text-2xl font-bold text-[#8b1e2d]">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>
            </div>

            {subtotal < 3000 && (
              <div className="mt-6 rounded-lg border border-[#b08a4a]/30 bg-[#efe4ce] p-4">
                <p className="text-xs leading-5 text-[#65443c]">
                  Add{" "}
                  <span className="font-bold text-[#8b1e2d]">
                    {formatPrice(3000 - subtotal)}
                  </span>{" "}
                  more to unlock free shipping.
                </p>
              </div>
            )}

            <Link
              href="/checkout"
              className="mt-7 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-6 text-sm font-bold text-[#fff8eb] transition hover:bg-[#6f1724]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-center text-[11px] leading-5 text-[#80665d]">
              Secure checkout â€¢ Multiple payment options
            </p>

            <div className="mt-6 border-t border-[#b08a4a]/25 pt-5">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-[#8b1e2d] transition hover:gap-3"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
