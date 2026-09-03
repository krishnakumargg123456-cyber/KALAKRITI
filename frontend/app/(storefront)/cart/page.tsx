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
import { useEffect, useMemo, useState } from "react";

import { useCartStore } from "@/lib/store/cart-store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
  const loadCart = useCartStore((state) => state.loadCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    loadCart().catch((err) => {
      console.error(err);

      if (mounted) {
        setError(
          "Unable to load your cart. Please login and try again.",
        );
      }
    });

    return () => {
      mounted = false;
    };
  }, [loadCart]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = Number(item.product?.price ?? 0);
      const quantity = Number(item.quantity ?? 0);

      return total + price * quantity;
    }, 0);
  }, [items]);

  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;

  const itemCount = items.reduce(
    (sum, item) => sum + Number(item.quantity ?? 0),
    0,
  );

  async function handleQuantity(
    itemId: string,
    quantity: number,
  ) {
    if (actionId || quantity < 1) return;

    try {
      setActionId(itemId);
      setError("");

      await updateQuantity(itemId, quantity);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to update the cart. Please try again.",
      );
    } finally {
      setActionId(null);
    }
  }

  async function handleRemove(itemId: string) {
    if (actionId) return;

    try {
      setActionId(itemId);
      setError("");

      await removeItem(itemId);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to remove this item. Please try again.",
      );
    } finally {
      setActionId(null);
    }
  }

  if (loading) {
    return <CartSkeleton />;
  }

  if (error && items.length === 0) {
    return (
      <main className="min-h-screen bg-cream text-brown">
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-parchment">
            <ShoppingBag className="h-10 w-10 text-maroon" />
          </div>

          <h1 className="mt-7 font-serif text-4xl font-semibold text-maroon sm:text-5xl">
            Unable to load your cart
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              setError("");

              loadCart().catch((err) => {
                console.error(err);
                setError(
                  "Unable to load your cart. Please try again.",
                );
              });
            }}
            className="mt-7 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon-deep"
          >
            Try Again
          </button>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-cream text-brown">
      <section className="border-b border-border bg-parchment/70">
        <div className="kalakriti-container px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <Link
            href="/shop"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-maroon"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-maroon">
                Your Collection
              </p>

              <h1 className="mt-2 font-serif text-4xl font-semibold text-maroon sm:text-5xl">
                Shopping Bag
              </h1>
            </div>

            <p className="text-sm text-muted">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </section>

      <section className="kalakriti-container px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-maroon/20 bg-maroon/5 px-4 py-3 text-sm text-maroon"
          >
            {error}
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="space-y-5">
              {items.map((item) => {
                const product = item.product;

                const image =
                  product?.image ||
                  product?.image_url ||
                  null;

                const productHref = product?.slug
                  ? `/product/${product.slug}`
                  : "/product";

                const quantity = Number(item.quantity ?? 0);
                const price = Number(product?.price ?? 0);

                return (
                  <article
                    key={item.id}
                    className="rounded-xl border border-border bg-paper p-4 shadow-soft transition hover:shadow-card sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <Link
                        href={productHref}
                        className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-parchment sm:h-36 sm:w-32"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={product?.name ?? "Product"}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-gold" />
                          </div>
                        )}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={productHref}
                            className="block font-serif text-xl font-semibold leading-tight text-maroon transition hover:text-maroon-light sm:text-2xl"
                          >
                            {product?.name ?? "Product"}
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            disabled={actionId === item.id}
                            aria-label={`Remove ${
                              product?.name ?? "product"
                            }`}
                            className="rounded-md p-2 text-muted transition hover:bg-maroon/10 hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center rounded-lg border border-border bg-cream">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantity(
                                  item.id,
                                  quantity - 1,
                                )
                              }
                              disabled={
                                quantity <= 1 ||
                                actionId === item.id
                              }
                              className="p-2.5 text-brown transition hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>

                            <span className="min-w-8 text-center text-sm font-semibold">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantity(
                                  item.id,
                                  quantity + 1,
                                )
                              }
                              disabled={actionId === item.id}
                              className="p-2.5 text-brown transition hover:text-maroon disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="font-serif text-xl font-semibold text-maroon">
                            {formatPrice(price * quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <TrustCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Authentic Craft"
                description="Every piece is sourced from verified artisans."
              />

              <TrustCard
                icon={<Truck className="h-5 w-5" />}
                title="Safe Delivery"
                description="Carefully packed and delivered across India."
              />
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-paper p-6 shadow-card sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-gold/40" />

              <h2 className="font-serif text-2xl font-semibold text-maroon">
                Order Summary
              </h2>

              <span className="h-px flex-1 bg-gold/40" />
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between gap-4 text-muted">
                <span>Subtotal</span>

                <span className="font-medium text-brown">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-muted">
                <span>Shipping</span>

                <span className="font-medium text-brown">
                  {shipping === 0
                    ? "Free"
                    : formatPrice(shipping)}
                </span>
              </div>

              <div className="border-t border-border pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      Total
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Inclusive of applicable taxes
                    </p>
                  </div>

                  <p className="font-serif text-2xl font-bold text-maroon">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>
            </div>

            {subtotal < 3000 && (
              <div className="mt-6 rounded-lg border border-border bg-parchment p-4">
                <p className="text-xs leading-5 text-brown">
                  Add{" "}
                  <span className="font-bold text-maroon">
                    {formatPrice(3000 - subtotal)}
                  </span>{" "}
                  more to unlock free shipping.
                </p>
              </div>
            )}

            <Link
              href="/checkout"
              className="mt-7 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-maroon px-6 text-sm font-bold text-cream transition hover:bg-maroon-deep"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-center text-[11px] leading-5 text-muted">
              Secure checkout · Multiple payment options
            </p>

            <div className="mt-6 border-t border-border pt-5">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-maroon transition hover:gap-3"
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

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-parchment/60 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-maroon">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-maroon">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <main className="min-h-screen bg-cream text-brown">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-parchment">
          <ShoppingBag className="h-10 w-10 text-maroon" />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-maroon">
          Your Cart
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold text-maroon sm:text-5xl">
          Your cart is waiting
        </h1>

        <p className="mt-5 max-w-lg leading-7 text-muted">
          Discover handmade treasures created by India&apos;s
          artisans and bring a piece of our craft heritage home.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-maroon px-7 py-3.5 text-sm font-bold text-cream transition hover:bg-maroon-deep"
        >
          Explore the Collection
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function CartSkeleton() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-parchment/70">
        <div className="kalakriti-container px-6 py-12 sm:px-8 lg:px-12">
          <div className="h-4 w-32 animate-pulse rounded bg-border/60" />
          <div className="mt-5 h-12 w-64 animate-pulse rounded bg-border/60" />
        </div>
      </section>

      <section className="kalakriti-container px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-xl bg-parchment"
              />
            ))}
          </div>

          <div className="h-80 animate-pulse rounded-2xl bg-parchment" />
        </div>
      </section>
    </main>
  );
}



