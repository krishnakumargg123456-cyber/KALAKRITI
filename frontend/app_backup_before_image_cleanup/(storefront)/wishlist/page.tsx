"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

type WishlistItem = {
  id: number;
  name: string;
  artisan: string;
  craft: string;
  price: number;
  originalPrice?: number;
  image: string;
};

const initialWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Madhubani Handpainted Wall Art",
    artisan: "Sita Devi",
    craft: "Madhubani Painting",
    price: 2499,
    originalPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Jaipur Blue Pottery Vase",
    artisan: "Mohan Kumar",
    craft: "Blue Pottery",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Handwoven Banarasi Silk Stole",
    artisan: "Arvind Weavers",
    craft: "Banarasi Weaving",
    price: 3299,
    originalPrice: 3799,
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Traditional Kutchi Embroidery",
    artisan: "Meera Ben",
    craft: "Kutchi Embroidery",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=85",
  },
];

export default function AccountWishlistPage() {
  const [items, setItems] = useState(initialWishlist);

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
      <section className="border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex items-center gap-2 text-xs text-[#f1dfc9]">
            <Link href="/" className="hover:text-[#e5c98b]">
              Home
            </Link>
            <span>/</span>
            <Link href="/account" className="hover:text-[#e5c98b]">
              Account
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#e5c98b]">
              Wishlist
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e5c98b]">
                Saved with love
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-[#fff8eb] sm:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#f1dfc9]">
                Keep the handmade pieces that caught your eye close until
                you&apos;re ready to bring them home.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8eb]/10 text-[#e5c98b]">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Account navigation */}
        <nav className="mb-10 flex gap-2 overflow-x-auto rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-2">
          <AccountLink href="/account" label="Overview" />
          <AccountLink href="/account/profile" label="Profile" />
          <AccountLink href="/account/orders" label="Orders" />
          <AccountLink
            href="/account/wishlist"
            label="Wishlist"
            active
          />
          <AccountLink href="/account/addresses" label="Addresses" />
          <AccountLink href="/account/reviews" label="Reviews" />
          <AccountLink
            href="/account/notifications"
            label="Notifications"
          />
          <AccountLink href="/account/settings" label="Settings" />
        </nav>

        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* Summary */}
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                  Your Collection
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
                  Pieces you love
                </h2>
              </div>

              <p className="text-sm text-[#80665d]">
                <span className="font-bold text-[#4a211c]">
                  {items.length}
                </span>{" "}
                {items.length === 1 ? "piece" : "pieces"} saved
              </p>
            </div>

            {/* Products */}
            <section className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] transition hover:-translate-y-1 hover:border-[#8b1e2d]/40 hover:shadow-[0_16px_35px_rgba(67,35,25,0.08)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#efe4ce]">
                    <Link href={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {item.originalPrice && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#8b1e2d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fff8eb]">
                        Special Price
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8eb]/95 text-[#8b1e2d] transition hover:bg-[#8b1e2d] hover:text-[#fff8eb]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b1e2d]">
                      {item.craft}
                    </p>

                    <Link href={`/products/${item.id}`}>
                      <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs text-[#80665d]">
                      By {item.artisan}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-serif text-lg font-bold text-[#8b1e2d]">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>

                        {item.originalPrice && (
                          <span className="ml-2 text-xs text-[#80665d] line-through">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <Link
                        href="/cart"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b1e2d] text-[#fff8eb] transition hover:bg-[#711725]"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

        {/* Heritage CTA */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-[#8b1e2d]">
          <div className="grid gap-7 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Discover more
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#fff8eb]">
                There&apos;s always another story to discover.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f1dfc9]">
                Explore handcrafted pieces from artisans and communities
                across India.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Explore Shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function AccountLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-bold transition ${
        active
          ? "bg-[#8b1e2d] text-[#fff8eb]"
          : "text-[#6d5149] hover:bg-[#efe4ce] hover:text-[#8b1e2d]"
      }`}
    >
      {label}
    </Link>
  );
}

function EmptyWishlist() {
  return (
    <section className="rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9] px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#efe4ce] text-[#8b1e2d]">
        <Heart className="h-7 w-7" />
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
        Your wishlist
      </p>

      <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
        Nothing saved yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#80665d]">
        When a handmade piece speaks to you, save it here and come back to it
        whenever you&apos;re ready.
      </p>

      <Link
        href="/shop"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
      >
        Discover Handmade
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}