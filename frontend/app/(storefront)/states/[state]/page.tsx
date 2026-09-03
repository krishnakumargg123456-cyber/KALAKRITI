/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

type StateProduct = {
  id: string;
  slug: string;
  name: string;
  craft: string;
  artisan: string;
  price: number;
  rating: number;
  image: string | null;
};

const stateData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    crafts: string[];
  }
> = {
  rajasthan: {
    name: "Rajasthan",
    tagline: "Where Colour Meets Craft",
    description:
      "From the blue pottery of Jaipur to block printing and miniature traditions, Rajasthan carries some of India's most vibrant craft heritage.",
    crafts: ["Blue Pottery", "Block Printing", "Miniature Painting", "Handicrafts"],
  },
  bihar: {
    name: "Bihar",
    tagline: "Stories Painted by Hand",
    description:
      "Bihar's artistic traditions are deeply rooted in community, nature, mythology, and generations of storytelling.",
    crafts: ["Madhubani Painting", "Sujuni", "Sikki Craft", "Terracotta"],
  },
  "uttar-pradesh": {
    name: "Uttar Pradesh",
    tagline: "A Legacy Woven in Silk",
    description:
      "A land of master weavers, woodworkers, metal artisans, and painters whose skills have shaped India's cultural heritage.",
    crafts: ["Banarasi Weaving", "Chikankari", "Brass Craft", "Wood Craft"],
  },
  gujarat: {
    name: "Gujarat",
    tagline: "Threads of Tradition",
    description:
      "Gujarat is home to colourful embroidery, textile traditions, pottery, and crafts shaped by generations of artisan communities.",
    crafts: ["Kutch Embroidery", "Ajrakh", "Bandhani", "Wood Craft"],
  },
  maharashtra: {
    name: "Maharashtra",
    tagline: "Folk Stories in Every Line",
    description:
      "From Warli paintings to Paithani weaving, Maharashtra's crafts preserve stories of communities, nature, and everyday life.",
    crafts: ["Warli Painting", "Paithani", "Sawantwadi Craft", "Kolhapuri Craft"],
  },
  "west-bengal": {
    name: "West Bengal",
    tagline: "Crafted Between Earth and Water",
    description:
      "West Bengal's craft traditions bring together terracotta, kantha embroidery, textiles, and folk art.",
    crafts: ["Terracotta", "Kantha", "Dokra", "Jamdani"],
  },
  punjab: {
    name: "Punjab",
    tagline: "A Heritage of Threads",
    description:
      "Punjab's colourful textile traditions are celebrated through intricate embroidery, weaving, and handcrafted everyday objects.",
    crafts: ["Phulkari", "Punjabi Jutti", "Durrie", "Wood Craft"],
  },
  chhattisgarh: {
    name: "Chhattisgarh",
    tagline: "Ancient Craft, Living Tradition",
    description:
      "Chhattisgarh preserves remarkable tribal craft traditions including Dokra metalwork, bell metal, wood, and natural materials.",
    crafts: ["Dokra", "Bell Metal", "Bamboo Craft", "Wood Craft"],
  },
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function getCraft(product: ApiProduct) {
  const text = `${product.material ?? ""} ${product.name}`.toLowerCase();

  if (text.includes("madhubani")) return "Madhubani Painting";
  if (text.includes("blue pottery")) return "Blue Pottery";
  if (text.includes("block print")) return "Block Printing";
  if (text.includes("banarasi")) return "Banarasi Weaving";
  if (text.includes("chikankari")) return "Chikankari";
  if (text.includes("brass")) return "Brass Craft";
  if (text.includes("warli")) return "Warli Painting";
  if (text.includes("paithani")) return "Paithani";
  if (text.includes("phulkari")) return "Phulkari";
  if (text.includes("dokra")) return "Dokra";
  if (text.includes("terracotta")) return "Terracotta";
  if (product.material) return product.material;

  return "Handicraft";
}

function matchesState(product: ApiProduct, stateName: string) {
  const region = (product.craft_region ?? "").toLowerCase();
  const name = (product.name ?? "").toLowerCase();

  const state = stateName.toLowerCase();

  return (
    region.includes(state) ||
    name.includes(state) ||
    (state === "rajasthan" &&
      (name.includes("jaipur") || name.includes("rajasthani"))) ||
    (state === "bihar" &&
      (name.includes("madhubani") || name.includes("sujuni"))) ||
    (state === "uttar pradesh" &&
      (name.includes("banarasi") ||
        name.includes("chikankari") ||
        name.includes("lucknow"))) ||
    (state === "gujarat" &&
      (name.includes("kutch") ||
        name.includes("ajrak") ||
        name.includes("bandhani"))) ||
    (state === "maharashtra" &&
      (name.includes("warli") || name.includes("paithani"))) ||
    (state === "west bengal" &&
      (name.includes("kantha") ||
        name.includes("dokra") ||
        name.includes("terracotta"))) ||
    (state === "punjab" &&
      (name.includes("phulkari") || name.includes("punjabi"))) ||
    (state === "chhattisgarh" &&
      (name.includes("dokra") || name.includes("bamboo")))
  );
}

function mapProduct(product: ApiProduct): StateProduct {
  const primaryImage =
    product.images?.find((image) => image.is_primary)?.image_url ??
    product.images?.[0]?.image_url ??
    null;

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    craft: getCraft(product),
    artisan: product.artisan_name ?? "KALAKRITI Artisan",
    price: Number(product.price),
    rating: 0,
    image: primaryImage,
  };
}

export default function StatePage({
  params,
}: {
  params: { state: string };
}) {
  const stateSlug = decodeURIComponent(params.state).toLowerCase();
  const state = stateData[stateSlug];

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<StateProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await productsApi.list({
          skip: 0,
          limit: 100,
        });

        if (!mounted) return;

        const activeProducts = response.data
          .filter((product) => product.is_active !== false)
          .filter((product) => matchesState(product, state.name))
          .map(mapProduct);

        setProducts(activeProducts);
      } catch {
        if (mounted) {
          setError("Unable to load artisan products right now.");
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [state, stateSlug]);

  const craftLinks = useMemo(
    () =>
      state?.crafts.map((craft) => ({
        name: craft,
        slug: craft.toLowerCase().replaceAll(" ", "-"),
      })) ?? [],
    [state]
  );

  if (!state) {
    return (
      <main className="min-h-screen bg-[#f7f0df] px-6 py-24 text-center text-[#3d1f1b]">
        <MapPin className="mx-auto h-10 w-10 text-[#8b1e2d]" />

        <h1 className="mt-5 font-serif text-4xl font-semibold">
          Craft region not found
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
          We are continually expanding our map of India's living craft
          traditions.
        </p>

        <Link
          href="/states"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3 text-sm font-bold text-[#fff8eb]"
        >
          Explore Craft Regions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <Link href="/states" className="hover:text-[#8b1e2d]">
              Craft Regions
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="font-semibold text-[#4a211c]">
              {state.name}
            </span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-[#b08a4a]/30 bg-[#8b1e2d]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#e5c98b]">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.28em]">
                Craft Region
              </span>
            </div>

            <h1 className="mt-4 font-serif text-5xl font-semibold text-[#fff8eb] sm:text-6xl">
              {state.name}
            </h1>

            <p className="mt-3 font-serif text-2xl text-[#e5c98b]">
              {state.tagline}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#f1dfc9] sm:text-base">
              {state.description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <section>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
              Living Traditions
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
              Crafts of {state.name}
            </h2>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {craftLinks.map((craft, index) => (
              <Link
                key={craft.name}
                href={`/learn/${craft.slug}`}
                className="group rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 transition hover:-translate-y-1 hover:border-[#8b1e2d]/35"
              >
                <span className="font-serif text-2xl text-[#b08a4a]/60">
                  0{index + 1}
                </span>

                <h3 className="mt-3 font-serif text-xl font-semibold text-[#4a211c] group-hover:text-[#8b1e2d]">
                  {craft.name}
                </h3>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8b1e2d]">
                  Learn the tradition
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1e2d]">
                From the Region
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
                Handmade from {state.name}
              </h2>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9]"
                >
                  <div className="aspect-square animate-pulse bg-[#efe4ce]" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#efe4ce]" />
                    <div className="h-6 w-3/4 animate-pulse rounded bg-[#efe4ce]" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-[#efe4ce]" />
                    <div className="h-6 w-24 animate-pulse rounded bg-[#efe4ce]" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-7 rounded-xl border border-dashed border-[#8b1e2d]/30 bg-[#fbf6e9] p-12 text-center">
              <p className="text-sm text-[#8b1e2d]">{error}</p>
            </div>
          ) : products.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const liked = wishlist.includes(product.id);

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9]"
                  >
                    <div className="relative overflow-hidden">
                      <Link href={`/product/${product.slug}`}>
                        <div className="aspect-square bg-[#efe4ce]">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-center">
                              <span className="px-6 font-serif text-lg text-[#8b1e2d]/60">
                                KALAKRITI
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border ${
                          liked
                            ? "border-[#8b1e2d] bg-[#8b1e2d] text-white"
                            : "border-[#b08a4a]/30 bg-[#fbf6e9]/95 text-[#8b1e2d]"
                        }`}
                        aria-label="Toggle wishlist"
                      >
                        <Heart
                          className="h-4 w-4"
                          fill={liked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                          {product.craft}
                        </span>

                        {product.rating > 0 && (
                          <span className="flex items-center gap-1 text-xs font-bold">
                            <Star className="h-3.5 w-3.5 fill-[#b08a4a] text-[#b08a4a]" />
                            {product.rating}
                          </span>
                        )}
                      </div>

                      <Link href={`/product/${product.slug}`}>
                        <h3 className="mt-2 font-serif text-xl font-semibold leading-7 text-[#4a211c] group-hover:text-[#8b1e2d]">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-xs text-[#80665d]">
                        By {product.artisan}
                      </p>

                      <p className="mt-4 font-serif text-xl font-bold text-[#8b1e2d]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-7 rounded-xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] p-12 text-center">
              <p className="text-sm text-[#6d5149]">
                More artisan pieces from {state.name} are being added soon.
              </p>
            </div>
          )}
        </section>

        <section className="mt-16 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/70 p-8 sm:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Beyond the Marketplace
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#4a211c]">
                Meet the people keeping {state.name}'s traditions alive.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d5149]">
                Explore artisan stories and discover how traditional knowledge
                moves from one generation to the next.
              </p>
            </div>

            <Link
              href="/artisans"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
            >
              Meet the Artisans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

