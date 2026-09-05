"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
} from "lucide-react";

import { addToCart } from "@/lib/api/cart";

type ProductImage = {
  id?: string | number;
  image_url?: string;
  url?: string;
  alt_text?: string | null;
};

type Product = {
  id: string | number;
  name: string;
  slug?: string;
  description?: string | null;
  short_description?: string | null;
  price: number;
  compare_at_price?: number | null;
  discount_price?: number | null;
  stock_quantity?: number;
  stock?: number;
  rating?: number | null;
  average_rating?: number | null;
  review_count?: number;
  category?: {
    id?: string | number;
    name?: string;
    slug?: string;
  } | null;
  category_slug?: string | null;
  craft_region?: string | null;
  material?: string | null;
  dimensions?: string | null;
  sku?: string | null;
  artisan?: {
    id?: string | number;
    name?: string;
    full_name?: string;
    slug?: string;
    city?: string;
    state?: string;
  } | null;
  images?: ProductImage[];
  image_url?: string | null;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:8000/api/v1";

        const response = await fetch(
          `${baseUrl}/products/slug/${encodeURIComponent(slug)}`,
          {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data?.data ?? data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this handcrafted product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  async function handleAddToCart() {
    if (!product || adding || !product.id) return;

    try {
      setAdding(true);

      await addToCart(Number(product.id), quantity);

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Unable to add product to cart. Please login and try again.");
    } finally {
      setAdding(false);
    }
  }

  const increaseQuantity = () => {
    const stock = product?.stock_quantity ?? product?.stock ?? 99;

    setQuantity((current) =>
      Math.min(current + 1, Math.max(stock, 1))
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="kalakriti-container">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-brown/10" />

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div className="aspect-square rounded-2xl bg-brown/10" />

              <div className="space-y-5">
                <div className="h-6 w-32 rounded bg-brown/10" />
                <div className="h-14 w-3/4 rounded bg-brown/10" />
                <div className="h-8 w-40 rounded bg-brown/10" />
                <div className="h-24 rounded bg-brown/10" />
                <div className="h-14 rounded bg-brown/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-[70vh] bg-cream px-4 py-20">
        <div className="kalakriti-container text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-maroon/10 bg-white/60 p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              KALAKRITI
            </p>

            <h1 className="mt-4 font-serif text-4xl font-bold text-maroon-deep">
              Product Not Found
            </h1>

            <p className="mt-4 text-brown">
              {error || "This handcrafted piece is currently unavailable."}
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-maroon-deep px-6 py-3 text-sm font-semibold text-cream"
            >
              <ArrowLeft size={17} />
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const images =
    product.images
      ?.map((image) => image.image_url || image.url)
      .filter(Boolean) as string[] | undefined;

  const gallery =
    images && images.length
      ? images
      : product.image_url
        ? [product.image_url]
        : [];

  const currentImage = gallery[selectedImage] || null;

  const rating =
    product.average_rating ??
    product.rating ??
    0;

  const stock =
    product.stock_quantity ??
    product.stock ??
    0;

  const soldOut = stock <= 0;

  const finalPrice =
    product.discount_price ??
    product.price;

  const hasDiscount =
    !!product.compare_at_price &&
    product.compare_at_price > finalPrice;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - finalPrice) /
          product.compare_at_price!) *
          100
      )
    : 0;

  return (
    <main className="min-h-screen bg-cream">
      <div className="kalakriti-container px-4 py-8 md:py-12">

        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-brown/70">
          <Link href="/" className="hover:text-maroon">
            Home
          </Link>

          <span>/</span>

          <Link href="/shop" className="hover:text-maroon">
            Shop
          </Link>

          {product.category?.name && (
            <>
              <span>/</span>

              <Link
                href={
                  product.category.slug
                    ? `/shop?category=${product.category.slug}`
                    : "/shop"
                }
                className="hover:text-maroon"
              >
                {product.category.name}
              </Link>
            </>
          )}

          <span>/</span>

          <span className="truncate text-maroon">
            {product.name}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          <section>
            <div className="relative overflow-hidden rounded-2xl border border-maroon/10 bg-white">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-parchment">
                  <ShoppingBag
                    size={70}
                    strokeWidth={1}
                    className="text-maroon/30"
                  />
                </div>
              )}

              {hasDiscount && (
                <span className="absolute left-5 top-5 rounded-full bg-maroon-deep px-4 py-2 text-xs font-bold text-cream">
                  {discountPercent}% OFF
                </span>
              )}

              <button
                type="button"
                onClick={() => setWishlist(!wishlist)}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-maroon/10 bg-cream/95"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  className={
                    wishlist
                      ? "text-maroon"
                      : "text-brown"
                  }
                  fill={wishlist ? "currentColor" : "none"}
                />
              </button>
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 bg-white ${
                      selectedImage === index
                        ? "border-maroon"
                        : "border-transparent hover:border-gold"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col">

            {product.category?.name && (
              <Link
                href={
                  product.category.slug
                    ? `/shop?category=${product.category.slug}`
                    : "/shop"
                }
                className="text-xs font-semibold uppercase tracking-[0.25em] text-gold"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-maroon-deep md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    className={
                      index < Math.round(rating)
                        ? "fill-gold text-gold"
                        : "text-brown/25"
                    }
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-brown">
                {rating > 0 ? rating.toFixed(1) : "No rating"}
              </span>

              {product.review_count !== undefined && (
                <span className="text-sm text-brown/60">
                  ({product.review_count} reviews)
                </span>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-3">
              <span className="font-serif text-4xl font-bold text-maroon-deep">
                {formatPrice(finalPrice)}
              </span>

              {hasDiscount && (
                <>
                  <span className="mb-1 text-lg text-brown/50 line-through">
                    {formatPrice(product.compare_at_price!)}
                  </span>

                  <span className="mb-1 rounded bg-heritage/10 px-2 py-1 text-xs font-bold text-heritage">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div className="mt-7 border-y border-maroon/10 py-6">
              <p className="leading-7 text-brown">
                {product.short_description ||
                  product.description ||
                  "A beautiful handcrafted piece created with traditional Indian craftsmanship and care."}
              </p>
            </div>

            {product.artisan && (
              <div className="relative mt-7 overflow-hidden border border-gold/30 bg-parchment p-6 sm:p-7">
                <div className="pointer-events-none absolute inset-2 border border-gold/15" />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-gold" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                      The Maker
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-maroon/60">
                        Handcrafted by
                      </p>

                      <p className="mt-1 font-serif text-2xl font-bold text-maroon-deep">
                        {product.artisan.full_name ||
                          product.artisan.name ||
                          "KALAKRITI Artisan"}
                      </p>

                      {(product.artisan.city ||
                        product.artisan.state) && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-brown">
                          <MapPin size={15} />
                          {[
                            product.artisan.city,
                            product.artisan.state,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}

                      <p className="mt-4 max-w-md text-sm leading-6 text-brown/80">
                        Meet the person behind this piece and discover the
                        craft, place and tradition that shape their work.
                      </p>
                    </div>

                    {product.artisan.slug && (
                      <Link
                        href={`/artisans/${product.artisan.slug}`}
                        className="inline-flex shrink-0 items-center justify-center border border-maroon/25 bg-white/60 px-5 py-3 text-sm font-semibold text-maroon transition hover:border-gold hover:bg-[#fffaf0]"
                      >
                        View Artisan
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              {soldOut ? (
                <p className="font-semibold text-red-700">
                  Currently out of stock
                </p>
              ) : stock <= 5 ? (
                <p className="font-semibold text-orange-700">
                  Only {stock} left in stock
                </p>
              ) : (
                <p className="font-semibold text-heritage">
                  In stock
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-14 items-center rounded-lg border border-maroon/20 bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || soldOut}
                  className="flex h-full w-12 items-center justify-center text-brown disabled:opacity-30"
                >
                  <Minus size={18} />
                </button>

                <span className="w-10 text-center font-semibold text-maroon-deep">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    soldOut ||
                    quantity >= Math.max(stock, 1)
                  }
                  className="flex h-full w-12 items-center justify-center text-brown disabled:opacity-30"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={soldOut || adding}
                className="flex h-14 flex-1 items-center justify-center gap-3 rounded-lg bg-maroon-deep px-6 font-semibold text-cream disabled:opacity-50"
              >
                <ShoppingBag size={20} />

                {adding
                  ? "Adding..."
                  : added
                    ? "Added to Cart ✓"
                    : soldOut
                      ? "Out of Stock"
                      : "Add to Cart"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              disabled={soldOut}
              className="mt-3 h-14 w-full rounded-lg border border-maroon font-semibold text-maroon hover:bg-maroon hover:text-cream disabled:opacity-40"
            >
              Buy Now
            </button>

            <div className="mt-8 grid gap-4 border-t border-maroon/10 pt-7 sm:grid-cols-3">

              <div className="flex gap-3">
                <Truck size={21} className="text-gold" />

                <div>
                  <p className="text-sm font-semibold text-maroon-deep">
                    Secure Delivery
                  </p>

                  <p className="mt-1 text-xs text-brown/70">
                    Carefully packed for your doorstep.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck size={21} className="text-gold" />

                <div>
                  <p className="text-sm font-semibold text-maroon-deep">
                    Authentic Craft
                  </p>

                  <p className="mt-1 text-xs text-brown/70">
                    Genuine Indian handmade products.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <RotateCcw size={21} className="text-gold" />

                <div>
                  <p className="text-sm font-semibold text-maroon-deep">
                    Easy Returns
                  </p>

                  <p className="mt-1 text-xs text-brown/70">
                    Simple and transparent return policy.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>

        {(product.category?.name ||
          product.craft_region ||
          product.material ||
          product.dimensions ||
          product.sku) && (
          <section className="mt-16 border-t border-maroon/10 pt-12">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                Craft Details
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-deep">
                The details behind the piece
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-brown">
                Each detail connects this piece to its craft tradition,
                region and making story.
              </p>
            </div>

            <div className="grid overflow-hidden border border-gold/30 bg-parchment sm:grid-cols-2 lg:grid-cols-3">
              {product.category?.name && (
                <div className="border-b border-gold/20 p-6 sm:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Craft
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold text-maroon-deep">
                    {product.category.name}
                  </p>
                </div>
              )}

              {product.craft_region && (
                <div className="border-b border-gold/20 p-6 lg:border-r">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Region
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold text-maroon-deep">
                    {product.craft_region}
                  </p>
                </div>
              )}

              {product.material && (
                <div className="border-b border-gold/20 p-6 sm:border-r lg:border-r-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Material
                  </p>
                  <p className="mt-2 text-base font-medium text-brown">
                    {product.material}
                  </p>
                </div>
              )}

              {product.dimensions && (
                <div className="border-b border-gold/20 p-6 sm:border-r lg:border-b-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Dimensions
                  </p>
                  <p className="mt-2 text-base font-medium text-brown">
                    {product.dimensions}
                  </p>
                </div>
              )}

              {product.sku && (
                <div className="p-6 sm:col-span-2 lg:col-span-2 lg:border-l lg:border-gold/20">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    KALAKRITI Product ID
                  </p>
                  <p className="mt-2 font-mono text-sm font-medium tracking-wide text-maroon">
                    {product.sku}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mt-20 border-t border-maroon/10 pt-12">
          <div className="grid gap-10 md:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                The Story Behind The Craft
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-deep">
                Made with tradition, skill and soul
              </h2>

              <p className="mt-5 leading-8 text-brown">
                Every KALAKRITI creation carries a piece of India&apos;s living
                craft heritage. From the hands of skilled artisans to your
                home, each piece celebrates techniques, stories and traditions
                passed down through generations.
              </p>

              {product.category_slug && (
                <Link
                  href={`/craft-heritage/${product.category_slug}`}
                  className="mt-7 inline-flex items-center gap-2 border-b border-gold pb-2 text-sm font-semibold tracking-wide text-maroon transition hover:border-maroon hover:text-maroon-deep"
                >
                  Explore the Craft Heritage
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              )}
            </div>

            <div className="rounded-2xl border border-gold/30 bg-parchment p-7">
              <p className="font-serif text-2xl font-bold text-maroon-deep">
                Why KALAKRITI?
              </p>

              <ul className="mt-5 space-y-4 text-sm text-brown">
                <li>✦ Directly supports India&apos;s artisan communities.</li>
                <li>✦ Authentic regional craftsmanship.</li>
                <li>✦ Every product has its own cultural story.</li>
                <li>✦ Thoughtfully selected handmade products.</li>
              </ul>
            </div>

          </div>
        </section>

        <div className="mt-12 border-t border-maroon/10 pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-maroon hover:underline"
          >
            <ArrowLeft size={17} />
            Continue exploring crafts
          </Link>
        </div>

      </div>
    </main>
  );
}
