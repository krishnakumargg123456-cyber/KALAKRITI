"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  craft: string;
  region: string;
  price: number;
  rating: number;
  reviews: number;
  image: string | null;
};

const categories = [
  ["All Crafts", "all"],
  ["Paintings", "paintings"],
  ["Textiles", "textiles"],
  ["Pottery", "pottery"],
  ["Wood Craft", "wood"],
  ["Embroidery", "embroidery"],
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function getCraft(product: ApiProduct) {
  const value = `${product.material ?? ""} ${product.name}`.toLowerCase();

  if (
    value.includes("madhubani") ||
    value.includes("painting") ||
    value.includes("paint")
  ) {
    return "Madhubani";
  }

  if (
    value.includes("pottery") ||
    value.includes("terracotta") ||
    value.includes("ceramic")
  ) {
    return "Pottery";
  }

  if (
    value.includes("wood") ||
    value.includes("wooden") ||
    value.includes("carved")
  ) {
    return "Wood Craft";
  }

  if (
    value.includes("embroidery") ||
    value.includes("embroidered") ||
    value.includes("textile") ||
    value.includes("silk") ||
    value.includes("saree") ||
    value.includes("dupatta")
  ) {
    return "Textiles";
  }

  if (product.material) {
    return product.material;
  }

  return "Handcrafted";
}

function mapProduct(product: ApiProduct): ShopProduct {
  const primaryImage =
    product.images?.find((image) => image.is_primary)?.image_url ??
    product.images?.[0]?.image_url ??
    null;

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    craft: getCraft(product),
    region: product.craft_region ?? "India",
    price: Number(product.price),
    rating: 0,
    reviews: 0,
    image: primaryImage,
  };
}

export default function ShopPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
          .map(mapProduct);

        setProducts(activeProducts);
      } catch {
        if (!mounted) return;

        setProducts([]);
        setError(
          "We could not load the craft collection right now. Please try again."
        );
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
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.craft.toLowerCase().includes(query) ||
        product.region.toLowerCase().includes(query);

      let matchesCategory = true;

      if (category === "paintings") {
        matchesCategory =
          product.craft.toLowerCase().includes("madhubani") ||
          product.craft.toLowerCase().includes("painting");
      }

      if (category === "textiles") {
        matchesCategory =
          product.craft.toLowerCase().includes("textile") ||
          product.craft.toLowerCase().includes("silk") ||
          product.craft.toLowerCase().includes("weaving") ||
          product.craft.toLowerCase().includes("embroidery");
      }

      if (category === "pottery") {
        matchesCategory =
          product.craft.toLowerCase().includes("pottery") ||
          product.craft.toLowerCase().includes("terracotta");
      }

      if (category === "wood") {
        matchesCategory = product.craft
          .toLowerCase()
          .includes("wood");
      }

      if (category === "embroidery") {
        matchesCategory = product.craft
          .toLowerCase()
          .includes("embroidery");
      }

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "featured") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, search, category, sort]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <Sparkles size={15} />
              The Living Craft Collection
            </div>

            <h1 className="font-serif text-4xl font-bold text-maroon md:text-5xl lg:text-6xl">
              Shop Indian Handicrafts
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-brown md:text-base">
              Discover handmade treasures created by skilled Indian artisans.
              Every piece carries the character of its material, its maker and
              the tradition from which it comes.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brown"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, products or regions..."
                className="h-12 w-full border border-border bg-cream pl-11 pr-4 text-sm text-brown outline-none transition focus:border-maroon"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="flex h-12 items-center justify-center gap-2 border border-border bg-cream px-5 text-sm font-semibold text-maroon hover:border-maroon"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-12 w-full appearance-none border border-border bg-cream px-5 pr-11 text-sm font-medium text-brown outline-none md:w-52"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 border border-border bg-cream p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                <Filter size={14} />
                Browse by craft
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map(([label, value]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setCategory(value)}
                    className={`border px-4 py-2 text-xs font-semibold transition ${
                      category === value
                        ? "border-maroon bg-maroon text-cream"
                        : "border-border bg-paper text-brown hover:border-maroon hover:text-maroon"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="kalakriti-container px-4 py-10 md:py-14">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Curated for you
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-maroon">
              Handmade Treasures
            </h2>
          </div>

          <p className="text-sm text-brown">
            {loading
              ? "Loading collection..."
              : `${filteredProducts.length} ${
                  filteredProducts.length === 1 ? "piece" : "pieces"
                } found`}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden border border-border bg-paper"
              >
                <div className="aspect-[4/3] animate-pulse bg-parchment" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse bg-parchment" />
                  <div className="h-6 w-3/4 animate-pulse bg-parchment" />
                  <div className="h-4 w-20 animate-pulse bg-parchment" />
                  <div className="h-8 w-32 animate-pulse bg-parchment" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="border border-border bg-paper px-6 py-16 text-center">
            <ShoppingBag className="mx-auto text-gold" size={36} />

            <h3 className="mt-4 font-serif text-2xl font-bold text-maroon">
              Collection unavailable
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brown">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 bg-maroon px-6 py-3 text-sm font-semibold text-cream"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="border border-border bg-paper px-6 py-16 text-center">
            <ShoppingBag className="mx-auto text-gold" size={36} />

            <h3 className="mt-4 font-serif text-2xl font-bold text-maroon">
              No craft found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brown">
              Try another search term or explore all our craft categories.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-6 bg-maroon px-6 py-3 text-sm font-semibold text-cream"
            >
              View All Crafts
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const liked = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden border border-border bg-paper"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
                    <Link
                      href={`/product/${product.slug}`}
                      aria-label={`View ${product.name}`}
                    >
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-parchment">
                          <ShoppingBag
                            size={42}
                            className="text-gold"
                          />
                        </div>
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        liked
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-maroon shadow-sm"
                    >
                      <Heart
                        size={18}
                        fill={liked ? "currentColor" : "none"}
                      />
                    </button>

                    <span className="absolute bottom-3 left-3 bg-maroon px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-cream">
                      {product.craft}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-gold">
                      {product.region}
                    </p>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="mt-2 min-h-[52px] font-serif text-xl font-bold text-maroon transition-colors hover:text-gold">
                        {product.name}
                      </h3>
                    </Link>

                    {product.rating > 0 && (
                      <div className="mt-3 flex items-center gap-1 text-sm">
                        <Star
                          size={15}
                          fill="currentColor"
                          className="text-gold"
                        />

                        <span className="font-semibold text-brown">
                          {product.rating}
                        </span>

                        {product.reviews > 0 && (
                          <span className="text-brown">
                            ({product.reviews})
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-serif text-xl font-bold text-maroon">
                        {formatPrice(product.price)}
                      </span>

                      <Link
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-2 text-sm font-semibold text-maroon hover:text-gold"
                      >
                        View Piece
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-y border-border bg-maroon">
        <div className="kalakriti-container px-4 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Beyond a purchase
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-cream">
            Every purchase keeps a tradition alive.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-cream/75">
            Choose handmade. Celebrate the maker. Carry a piece of India&apos;s
            living heritage into your home.
          </p>
        </div>
      </section>
    </main>
  );
}
