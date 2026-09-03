"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  getWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";
import { useWishlistStore } from "@/lib/store/wishlist-store";

type WishlistProduct = {
  id: number | string;
  name: string;
  slug?: string;
  price: number;
  compare_at_price?: number | null;
  discount_price?: number | null;
  image_url?: string | null;
  images?: {
    image_url?: string;
    url?: string;
  }[];
  artisan?: {
    name?: string;
    full_name?: string;
  } | null;
  category?: {
    name?: string;
  } | null;
};

type WishlistItem = {
  id?: number | string;
  product_id?: number | string;
  product?: WishlistProduct | null;
};

function getCurrentProductIds(items: WishlistItem[]) {
  return items
    .map((item) => item.product_id ?? item.product?.id)
    .filter((id): id is number | string => id !== undefined && id !== null)
    .map(String);
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeWishlist(data: any): WishlistItem[] {
  const raw =
    Array.isArray(data)
      ? data
      : data?.items ??
        data?.wishlist ??
        data?.data ??
        [];

  return Array.isArray(raw) ? raw : [];
}

function getProduct(item: WishlistItem): WishlistProduct | null {
  if (item.product) return item.product;

  return null;
}

function getProductImage(product: WishlistProduct) {
  const firstImage = product.images?.[0];

  return (
    firstImage?.image_url ||
    firstImage?.url ||
    product.image_url ||
    null
  );
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const setProductIds = useWishlistStore((state) => state.setProductIds);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadWishlist() {
      try {
        setLoading(true);
        setError("");

        const data = await getWishlist();

        if (mounted) {
          const normalizedItems = normalizeWishlist(data);
          setItems(normalizedItems);

          const productIds = normalizedItems
            .map((item) => item.product_id ?? item.product?.id)
            .filter((id): id is number | string => id !== undefined && id !== null)
            .map(String);

          setProductIds(productIds);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError(
            "Unable to load your wishlist. Please login and try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadWishlist();

    return () => {
      mounted = false;
    };
  }, [setProductIds]);

  async function handleRemove(productId: number | string) {
    if (removingId !== null) return;

    try {
      setRemovingId(productId);

      await removeFromWishlist(productId);

      setItems((current) =>
        current.filter((item) => {
          const itemProductId =
            item.product_id ?? item.product?.id;

          return String(itemProductId) !== String(productId);
        })
      );

      setProductIds(
        getCurrentProductIds(items).filter(
          (id) => String(id) !== String(productId)
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to remove this item from your wishlist.");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-cream text-brown">
      <section className="border-b border-gold/30 bg-maroon">
        <div className="kalakriti-container px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex items-center gap-2 text-xs text-cream/80">
            <Link href="/" className="hover:text-gold-light">
              Home
            </Link>

            <span>/</span>

            <span className="font-semibold text-gold-light">
              Wishlist
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-light">
                Saved with love
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-cream sm:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-cream/80">
                Keep the handmade pieces that caught your eye close until
                you&apos;re ready to bring them home.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-gold-light">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      <div className="kalakriti-container px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        {loading ? (
          <WishlistSkeleton />
        ) : error ? (
          <section className="rounded-3xl border border-border bg-paper px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-parchment text-maroon">
              <Heart className="h-7 w-7" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-maroon">
              Wishlist
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon-deep">
              Please sign in
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              {error}
            </p>

            <Link
              href="/auth/login?redirect=/wishlist"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3.5 text-sm font-bold text-cream"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        ) : items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">
                  Your Collection
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon-deep">
                  Pieces you love
                </h2>
              </div>

              <p className="text-sm text-muted">
                <span className="font-bold text-maroon-deep">
                  {items.length}
                </span>{" "}
                {items.length === 1 ? "piece" : "pieces"} saved
              </p>
            </div>

            <section className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item, index) => {
                const product = getProduct(item);

                if (!product) return null;

                const productId =
                  item.product_id ?? product.id;

                const productSlug =
                  product.slug || String(product.id);

                const image = getProductImage(product);

                const finalPrice =
                  product.discount_price ??
                  product.price;

                const hasDiscount =
                  product.compare_at_price != null &&
                  product.compare_at_price > finalPrice;

                const artisanName =
                  product.artisan?.full_name ||
                  product.artisan?.name ||
                  "KALAKRITI Artisan";

                return (
                  <article
                    key={`${productId}-${index}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-paper transition hover:-translate-y-1 hover:border-maroon/40 hover:shadow-card"
                  >
                    <div className="relative aspect-square overflow-hidden bg-parchment">
                      <Link href={`/product/${productSlug}`}>
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ShoppingBag
                              className="h-14 w-14 text-maroon/25"
                              strokeWidth={1}
                            />
                          </div>
                        )}
                      </Link>

                      {hasDiscount && (
                        <span className="absolute left-4 top-4 rounded-full bg-maroon px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                          Special Price
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemove(productId)}
                        disabled={removingId !== null}
                        aria-label={`Remove ${product.name}`}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 text-maroon transition hover:bg-maroon hover:text-cream disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-maroon">
                        {product.category?.name || "Handcrafted"}
                      </p>

                      <Link href={`/product/${productSlug}`}>
                        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-maroon-deep transition group-hover:text-maroon">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-muted">
                        By {artisanName}
                      </p>

                      <div className="mt-5 flex items-end justify-between gap-3">
                        <div>
                          <span className="font-serif text-lg font-bold text-maroon">
                            {formatPrice(finalPrice)}
                          </span>

                          {hasDiscount && (
                            <span className="ml-2 text-xs text-muted line-through">
                              {formatPrice(product.compare_at_price!)}
                            </span>
                          )}
                        </div>

                        <Link
                          href="/cart"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon text-cream transition hover:bg-maroon-deep"
                          aria-label={`Open cart for ${product.name}`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}

        <section className="mt-16 overflow-hidden rounded-3xl bg-maroon">
          <div className="grid gap-7 px-7 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">
                Discover more
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-cream">
                There&apos;s always another story to discover.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-cream/80">
                Explore handcrafted pieces from artisans and communities
                across India.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gold-light px-6 py-3.5 text-sm font-bold text-brown-dark transition hover:bg-gold"
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

function WishlistSkeleton() {
  return (
    <section>
      <div className="mb-7">
        <div className="h-3 w-32 animate-pulse rounded bg-brown/10" />
        <div className="mt-3 h-9 w-56 animate-pulse rounded bg-brown/10" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-paper"
          >
            <div className="aspect-square animate-pulse bg-brown/10" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded bg-brown/10" />
              <div className="h-6 w-4/5 animate-pulse rounded bg-brown/10" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-brown/10" />
              <div className="h-6 w-24 animate-pulse rounded bg-brown/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyWishlist() {
  return (
    <section className="rounded-3xl border border-border bg-paper px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-parchment text-maroon">
        <Heart className="h-7 w-7" />
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-maroon">
        Your wishlist
      </p>

      <h2 className="mt-2 font-serif text-3xl font-semibold text-maroon-deep">
        Nothing saved yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        When a handmade piece speaks to you, save it here and come back to it
        whenever you&apos;re ready.
      </p>

      <Link
        href="/shop"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-maroon px-6 py-3.5 text-sm font-bold text-cream"
      >
        Discover Handmade
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}



