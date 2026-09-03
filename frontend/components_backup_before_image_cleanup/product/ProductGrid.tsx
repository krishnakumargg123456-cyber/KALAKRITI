
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  compare_at_price?: number | string | null;
  description?: string | null;
  images?: Array<{
    id?: string;
    image_url: string;
    alt_text?: string | null;
    sort_order?: number;
    is_primary?: boolean;
  }>;
  image?: string | null;
  artisan_name?: string | null;
  category_name?: string | null;
  stock?: number;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const { productIds, add, remove } = useWishlistStore();

  if (!products.length) {
    return (
      <div className="rounded-card border border-border bg-cream p-12 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-gold" />

        <h3 className="mt-4 font-serif text-2xl font-semibold text-deep-maroon">
          No products found
        </h3>

        <p className="mt-2 text-sm text-muted">
          Try changing your search or category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const wished = productIds.includes(product.id);

        const productImage =
          product.image ||
          product.images?.find((image) => image.is_primary)?.image_url ||
          product.images?.[0]?.image_url ||
          null;

        return (
          <article
            key={product.id}
            className="group overflow-hidden rounded-card border border-border bg-cream transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card"
          >
            <div className="relative aspect-square overflow-hidden bg-parchment">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-serif text-5xl text-gold">K</span>
                </div>
              )}

              <button
                type="button"
                aria-label={
                  wished ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() =>
                  wished ? remove(product.id) : add(product.id)
                }
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-cream/95 text-maroon shadow-soft transition hover:bg-white"
              >
                <Heart
                  className="h-5 w-5"
                  fill={wished ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="p-5">
              {product.category_name && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {product.category_name}
                </p>
              )}

              <Link href={`/product/${product.slug}`}>
                <h3 className="mt-2 font-serif text-xl font-semibold text-deep-maroon hover:text-maroon-light">
                  {product.name}
                </h3>
              </Link>

              {product.artisan_name && (
                <p className="mt-1 text-sm text-muted">
                  By {product.artisan_name}
                </p>
              )}

              <div className="mt-4">
                <span className="font-semibold text-maroon">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                href={`/product/${product.slug}`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-card bg-maroon px-4 py-3 text-sm font-semibold text-white transition hover:bg-maroon-light"
              >
                View Product
                <ShoppingBag className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

