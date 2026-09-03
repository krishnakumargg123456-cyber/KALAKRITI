

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

const highlights = [
  "100% handmade",
  "Created by an Indian artisan",
  "Traditional Indian craft techniques",
  "Each piece is naturally unique",
];

const getCraft = (product: ApiProduct) => {
  const value = `${product.material ?? ""} ${product.name}`.toLowerCase();

  if (value.includes("madhubani")) return "Madhubani Painting";
  if (value.includes("blue pottery")) return "Blue Pottery";
  if (value.includes("banarasi")) return "Banarasi Weaving";
  if (value.includes("block print") || value.includes("block printing"))
    return "Block Printing";
  if (value.includes("warli")) return "Warli Painting";
  if (value.includes("phulkari")) return "Phulkari";
  if (value.includes("dokra")) return "Dokra Metal Craft";
  if (value.includes("terracotta")) return "Terracotta";
  if (value.includes("kutch")) return "Kutch Embroidery";
  if (value.includes("brass")) return "Brass Craft";

  return product.material ?? "Handicraft";
};

const getRegion = (product: ApiProduct) =>
  product.craft_region?.trim() || "India";

const getImages = (product: ApiProduct) =>
  (product.images ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((image) => image.image_url)
    .filter(Boolean);

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await productsApi.getBySlug(slug);

        if (!mounted) return;

        if (response.data.is_active === false) {
          setProduct(null);
          setError("This product is currently unavailable.");
          return;
        }

        setProduct(response.data);
      } catch {
        if (!mounted) return;
        setError("We could not find this product.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const images = useMemo(
    () => (product ? getImages(product) : []),
    [product]
  );

  useEffect(() => {
    setSelectedImage(0);
  }, [product?.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f0df] px-6 py-16 text-[#3d1f1b]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-5 w-40 animate-pulse rounded bg-[#efe4ce]" />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="aspect-square animate-pulse rounded-2xl bg-[#efe4ce]" />

            <div className="space-y-5 py-4">
              <div className="h-5 w-36 animate-pulse rounded bg-[#efe4ce]" />
              <div className="h-16 w-full animate-pulse rounded bg-[#efe4ce]" />
              <div className="h-5 w-48 animate-pulse rounded bg-[#efe4ce]" />
              <div className="h-10 w-56 animate-pulse rounded bg-[#efe4ce]" />
              <div className="h-28 w-full animate-pulse rounded bg-[#efe4ce]" />
              <div className="h-14 w-full animate-pulse rounded bg-[#efe4ce]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product || error) {
    return (
      <main className="min-h-screen bg-[#f7f0df] px-6 py-20 text-[#3d1f1b]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-[#b08a4a]/45 bg-[#fbf6e9] px-6 py-20 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]" />

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
            Product not found
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
            {error || "This product could not be found."}
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const craft = getCraft(product);
  const region = getRegion(product);
  const price = Number(product.price);
  const originalPrice =
    product.compare_at_price !== null &&
    product.compare_at_price !== undefined
      ? Number(product.compare_at_price)
      : null;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const artisanSlug = product.artisan_id
    ? String(product.artisan_id)
    : null;

  const addToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/50">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto text-xs text-[#80665d]">
            <Link href="/" className="shrink-0 hover:text-[#8b1e2d]">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 shrink-0" />

            <Link
              href="/products"
              className="shrink-0 hover:text-[#8b1e2d]"
            >
              Products
            </Link>

            <ChevronRight className="h-3.5 w-3.5 shrink-0" />

            <span className="shrink-0 text-[#4a211c]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#72554c] hover:text-[#8b1e2d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]">
              <div className="aspect-square">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-serif text-2xl text-[#80665d]">
                      KALAKRITI
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                aria-label="Toggle wishlist"
                onClick={() => setLiked((value) => !value)}
                className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition ${
                  liked
                    ? "border-[#8b1e2d] bg-[#8b1e2d] text-white"
                    : "border-[#b08a4a]/30 bg-[#fbf6e9]/95 text-[#8b1e2d]"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={liked ? "currentColor" : "none"}
                />
              </button>

              <div className="absolute bottom-5 left-5 rounded-full bg-[#fbf6e9]/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                Handmade
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {images.slice(0, 3).map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 bg-[#efe4ce] ${
                      selectedImage === index
                        ? "border-[#8b1e2d]"
                        : "border-[#b08a4a]/25"
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#8b1e2d]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                {craft}
              </span>

              <span className="text-xs text-[#80665d]">•</span>

              <span className="text-xs font-medium text-[#80665d]">
                {region}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl">
              {product.name}
            </h1>

            {product.artisan_name ? (
              <Link
                href={
                  artisanSlug
                    ? `/artisans/${artisanSlug}`
                    : "/artisans"
                }
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1e2d]"
              >
                Crafted by {product.artisan_name}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="mt-4 inline-flex text-sm font-semibold text-[#80665d]">
                Crafted by a KALAKRITI Artisan
              </span>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-[#b08a4a]" />
                <span className="text-sm text-[#80665d]">
                  Reviews available after purchase
                </span>
              </div>

              <span className="h-4 w-px bg-[#b08a4a]/30" />

              <span className="text-sm text-[#2f6b45]">
                Available
              </span>
            </div>

            <div className="my-7 border-t border-[#b08a4a]/25" />

            <div className="flex flex-wrap items-end gap-3">
              <span className="font-serif text-4xl font-bold text-[#8b1e2d]">
                {formatPrice(price)}
              </span>

              {originalPrice && originalPrice > price && (
                <>
                  <span className="mb-1 text-lg text-[#80665d] line-through">
                    {formatPrice(originalPrice)}
                  </span>

                  <span className="mb-1 rounded-full bg-[#2f6b45]/10 px-3 py-1 text-xs font-bold text-[#2f6b45]">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="mt-2 text-xs text-[#80665d]">
              Inclusive of all applicable taxes
            </p>

            {product.description && (
              <p className="mt-6 text-sm leading-7 text-[#6d5149]">
                {product.description}
              </p>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 text-sm text-[#65443c]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8b1e2d]/10 text-[#8b1e2d]">
                    ✓
                  </span>
                  {highlight}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-13 items-center justify-between rounded-lg border border-[#b08a4a]/40 bg-[#fbf6e9] sm:w-36">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="flex h-full w-11 items-center justify-center text-[#72554c] disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="text-sm font-bold">{quantity}</span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                  className="flex h-full w-11 items-center justify-center text-[#72554c]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="flex h-13 flex-1 items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-6 text-sm font-bold text-[#fff8eb] transition hover:bg-[#741723]"
              >
                <ShoppingBag className="h-5 w-5" />
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setLiked((value) => !value)}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/30 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d]/5"
            >
              <Heart
                className="h-4 w-4"
                fill={liked ? "currentColor" : "none"}
              />
              {liked ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>

            <div className="mt-8 grid gap-4 border-t border-[#b08a4a]/25 pt-7">
              <div className="flex gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1e2d]" />
                <div>
                  <p className="text-sm font-bold text-[#4a211c]">
                    Thoughtful delivery
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#80665d]">
                    Carefully packed and delivered across India.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1e2d]" />
                <div>
                  <p className="text-sm font-bold text-[#4a211c]">
                    Authenticity assured
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#80665d]">
                    Every KALAKRITI craft is sourced with authenticity in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#8b1e2d]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                The Craft Story
              </p>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#4a211c]">
              A piece with a story
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-[#6d5149]">
              <p>
                This handmade piece is part of India&apos;s living craft
                heritage, shaped by traditional materials, techniques, and
                artisan knowledge.
              </p>

              <p>
                Every handcrafted creation carries natural variations in
                texture, colour, pattern, and finish. These differences are
                part of what makes an artisan-made piece unique.
              </p>

              <p>
                KALAKRITI connects you directly with the cultural story behind
                the craft while bringing timeless Indian artistry into
                contemporary spaces.
              </p>
            </div>

            <Link
              href="/learn"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              Explore the Learning Hub
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Product Details
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#4a211c]">
              Specifications
            </h2>

            <div className="mt-6 divide-y divide-[#b08a4a]/20">
              {[
                ["Craft", craft],
                ["Region", region],
                ["Material", product.material || "Traditional craft material"],
                ["Dimensions", product.dimensions || "Not specified"],
                ["SKU", product.sku || "Not specified"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-2 gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-[#80665d]">
                    {label}
                  </span>

                  <span className="text-right text-sm font-semibold text-[#4a211c]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]/70 px-7 py-10 text-center">
          <p className="mx-auto max-w-3xl font-serif text-xl italic leading-8 text-[#4a211c]">
            “When you bring a handmade piece home, you bring a fragment of a
            place, a tradition, and an artisan&apos;s story with you.”
          </p>
        </section>
      </div>
    </main>
  );
}
