"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  description?: string | null;
  image?: string | null;
  images?: Array<{
    image_url: string;
    alt_text?: string | null;
    is_primary?: boolean;
  }>;
  artisan_name?: string | null;
  category_name?: string | null;
  stock?: number;
};

export default function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartError, setCartError] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const wished = useWishlistStore((state) =>
    state.productIds.includes(product.id)
  );

  const addWishlist = useWishlistStore((state) => state.add);
  const removeWishlist = useWishlistStore((state) => state.remove);

  const productImage =
    product.image ||
    product.images?.find((image) => image.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    null;

  const addProduct = async () => {
    if (addingToCart) return;

    try {
      setAddingToCart(true);
      setCartError("");

      await addItem({
        id: product.id,
        product_id: product.id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: productImage || undefined,
        },
      });
    } catch (error) {
      console.error(error);
      setCartError(
        "Unable to add this product to your cart. Please try again."
      );
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper">
      <div className="kalakriti-container px-4 py-10">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-maroon"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-parchment">
            {productImage ? (
              <Image
                src={productImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-serif text-8xl text-gold">K</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.category_name && (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                {product.category_name}
              </p>
            )}

            <h1 className="mt-3 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
              {product.name}
            </h1>

            {product.artisan_name && (
              <p className="mt-3 text-muted">
                Handcrafted by{" "}
                <span className="font-semibold text-brown">
                  {product.artisan_name}
                </span>
              </p>
            )}

            <p className="mt-6 text-3xl font-bold text-maroon">
              {"\u20B9"}{Number(product.price).toLocaleString("en-IN")}
            </p>

            {product.description && (
              <div className="mt-6 border-y border-border py-6">
                <p className="leading-8 text-brown">
                  {product.description}
                </p>
              </div>
            )}

            {typeof product.stock === "number" && (
              <p className="mt-5 text-sm text-muted">
                {product.stock > 0
                  ? `${product.stock} pieces available`
                  : "Currently out of stock"}
              </p>
            )}

            <div className="mt-7 flex items-center gap-3">
              <label
                htmlFor="quantity"
                className="text-sm font-semibold text-brown"
              >
                Quantity
              </label>

              <div className="flex items-center overflow-hidden rounded-card border border-border bg-cream">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="px-4 py-2 text-lg text-maroon hover:bg-parchment"
                >
                  -
                </button>

                <span className="min-w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) =>
                      product.stock
                        ? Math.min(product.stock, value + 1)
                        : value + 1
                    )
                  }
                  className="px-4 py-2 text-lg text-maroon hover:bg-parchment"
                >
                  +
                </button>
              </div>
            </div>
            {cartError && (
              <p className="mb-3 rounded-card border border-maroon/20 bg-maroon/5 px-4 py-3 text-sm text-maroon">
                {cartError}
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={addProduct}
                disabled={product.stock === 0 || addingToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-card bg-maroon px-6 py-4 font-semibold text-white transition hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    if (wished) {
                      await removeWishlist(product.id);
                    } else {
                      await addWishlist(product.id);
                    }
                  } catch {
                    // Keep the current wishlist state when the API request fails.
                  }
                }}
                className="flex items-center justify-center gap-2 rounded-card border border-gold px-6 py-4 font-semibold text-maroon hover:bg-gold/10"
              >
                <Heart
                  className="h-5 w-5"
                  fill={wished ? "currentColor" : "none"}
                />
                {wished ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}









