"use client";

import Link from "next/link";
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
import { useState } from "react";

const product = {
  name: "Hand-Painted Madhubani Heritage Artwork",
  artisan: "Sita Devi",
  craft: "Madhubani Painting",
  region: "Mithila, Bihar",
  price: 2850,
  originalPrice: 3400,
  rating: 4.9,
  reviews: 38,
  stock: 7,
  description:
    "A hand-painted Madhubani artwork inspired by the timeless storytelling traditions of Mithila. Every line and motif is carefully painted by hand, making each piece naturally unique.",
  images: [
    "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=90",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=90",
  ],
};

const highlights = [
  "100% handmade",
  "Created by an Indian artisan",
  "Traditional Madhubani techniques",
  "Each piece is naturally unique",
];

const specifications = [
  ["Craft", "Madhubani Painting"],
  ["Region", "Mithila, Bihar"],
  ["Material", "Handmade paper & natural pigments"],
  ["Technique", "Traditional hand painting"],
  ["Dimensions", "18 × 24 inches"],
  ["Frame", "Unframed"],
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const addToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/50">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto text-xs text-[#80665d]">
            <Link href="/" className="shrink-0 hover:text-[#8b1e2d]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link href="/products" className="shrink-0 hover:text-[#8b1e2d]">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="shrink-0 text-[#4a211c]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Back */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#72554c] hover:text-[#8b1e2d]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        {/* Product */}
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]">
              <div className="aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
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

            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
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
          </div>

          {/* Information */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#8b1e2d]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                {product.craft}
              </span>

              <span className="text-xs text-[#80665d]">•</span>

              <span className="text-xs font-medium text-[#80665d]">
                {product.region}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#4a211c] sm:text-5xl">
              {product.name}
            </h1>

            <Link
              href={`/artisans/${product.artisan.toLowerCase().replace(" ", "-")}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8b1e2d]"
            >
              Crafted by {product.artisan}
              <ChevronRight className="h-4 w-4" />
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#b08a4a] text-[#b08a4a]" />
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-sm text-[#80665d]">
                  ({product.reviews} reviews)
                </span>
              </div>

              <span className="h-4 w-px bg-[#b08a4a]/30" />

              <span className="text-sm text-[#2f6b45]">
                {product.stock} pieces available
              </span>
            </div>

            <div className="my-7 border-t border-[#b08a4a]/25" />

            {/* Price */}
            <div className="flex flex-wrap items-end gap-3">
              <span className="font-serif text-4xl font-bold text-[#8b1e2d]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="mb-1 text-lg text-[#80665d] line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>

              <span className="mb-1 rounded-full bg-[#2f6b45]/10 px-3 py-1 text-xs font-bold text-[#2f6b45]">
                {discount}% OFF
              </span>
            </div>

            <p className="mt-2 text-xs text-[#80665d]">
              Inclusive of all applicable taxes
            </p>

            <p className="mt-6 text-sm leading-7 text-[#6d5149]">
              {product.description}
            </p>

            {/* Highlights */}
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

            {/* Quantity + Cart */}
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
                  disabled={quantity >= product.stock}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.min(product.stock, value + 1)
                    )
                  }
                  className="flex h-full w-11 items-center justify-center text-[#72554c] disabled:opacity-30"
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

            {/* Service promises */}
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

        {/* Story / specifications */}
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
                Madhubani painting comes from the Mithila region of Bihar and
                has long been used to express stories, rituals, nature, and
                everyday life through distinctive patterns and symbolism.
              </p>

              <p>
                Traditionally painted by hand, the art is recognised for its
                strong outlines, rhythmic patterns, expressive figures, and
                richly filled spaces.
              </p>

              <p>
                This artwork carries that visual language into a contemporary
                home while respecting the craft tradition from which it comes.
              </p>
            </div>

            <Link
              href="/learn/madhubani"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              Learn about Madhubani
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
              {specifications.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-2 gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-[#80665d]">{label}</span>
                  <span className="text-right text-sm font-semibold text-[#4a211c]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage note */}
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