"use client";

import Link from "next/link";
import {
  ChevronDown,
  Filter,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

type Product = {
  id: string;
  slug: string;
  name: string;
  material: string;
  category: string;
  region: string;
  price: number;
  originalPrice?: number;
  image?: string;
  featured: boolean;
};

const fallbackCategories = [
  "All",
  "Art",
  "Home Decor",
  "Textiles",
  "Decor",
  "Accessories",
];

const fallbackRegions = [
  "All Regions",
  "Bihar",
  "Rajasthan",
  "Uttar Pradesh",
  "Chhattisgarh",
  "Maharashtra",
  "West Bengal",
  "Gujarat",
  "Punjab",
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function mapProduct(product: ApiProduct): Product {
  const primaryImage =
    product.images?.find((image) => image.is_primary)?.image_url ??
    product.images?.[0]?.image_url;

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    material: product.material ?? "Handcrafted",
    category: product.category_name ?? "Art",
    region: product.craft_region ?? "India",
    price: Number(product.price),
    originalPrice:
      product.compare_at_price != null
        ? Number(product.compare_at_price)
        : undefined,
    image: primaryImage,
    featured: Boolean(product.is_featured),
  };
}

function normalizeProducts(data: unknown): ApiProduct[] {
  if (Array.isArray(data)) {
    return data as ApiProduct[];
  }

  if (data && typeof data === "object") {
    const value = data as {
      items?: unknown;
      data?: unknown;
      results?: unknown;
      products?: unknown;
    };

    if (Array.isArray(value.items)) {
      return value.items as ApiProduct[];
    }

    if (Array.isArray(value.data)) {
      return value.data as ApiProduct[];
    }

    if (Array.isArray(value.results)) {
      return value.results as ApiProduct[];
    }

    if (Array.isArray(value.products)) {
      return value.products as ApiProduct[];
    }
  }

  return [];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All Regions");
  const [sort, setSort] = useState("Featured");
  const [search, setSearch] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await productsApi.list({
          skip: 0,
          limit: 100,
        });

        if (!mounted) return;

        const normalized = normalizeProducts(response.data)
          .map(mapProduct)
          .filter((product) => product.id && product.slug);

        setProducts(normalized);
      } catch (err) {
        if (!mounted) return;

        console.error("Failed to load products:", err);
        setError("Unable to load the collection. Please try again.");
        setProducts([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const apiCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return Array.from(
      new Set([...fallbackCategories, ...apiCategories]),
    );
  }, [products]);

  const regions = useMemo(() => {
    const apiRegions = products
      .map((product) => product.region)
      .filter(Boolean);

    return Array.from(
      new Set([...fallbackRegions, ...apiRegions]),
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesRegion =
        region === "All Regions" || product.region === region;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.region.toLowerCase().includes(query);

      return matchesCategory && matchesRegion && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "Price: Low to High":
          return a.price - b.price;

        case "Price: High to Low":
          return b.price - a.price;

        case "Newest":
          return b.id.localeCompare(a.id);

        case "Featured":
          if (a.featured !== b.featured) {
            return Number(b.featured) - Number(a.featured);
          }
          return a.name.localeCompare(b.name);

        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [products, category, region, search, sort]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const clearFilters = () => {
    setCategory("All");
    setRegion("All Regions");
    setSearch("");
    setSort("Featured");
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              The KALAKRITI Collection
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
              Handmade Treasures
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#6d5149] sm:text-base">
              Discover authentic Indian crafts made by skilled artisans,
              rooted in generations of tradition and brought to your home with
              care.
            </p>

            <div className="mx-auto mt-7 flex max-w-xl items-center rounded-xl border border-[#b08a4a]/40 bg-[#fbf6e9] px-4">
              <Search className="h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, products, regions..."
                className="h-13 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#80665d]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-[#80665d] transition hover:text-[#8b1e2d]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <button
          type="button"
          onClick={() => setMobileFilters((value) => !value)}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-[#b08a4a]/35 bg-[#fbf6e9] px-4 py-3 text-sm font-bold text-[#4a211c] lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4 text-[#8b1e2d]" />
          {mobileFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
          <aside
            className={`${mobileFilters ? "block" : "hidden"} lg:block`}
          >
            <div className="sticky top-5 rounded-xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#8b1e2d]" />

                  <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                    Filters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#8b1e2d]"
                >
                  Clear
                </button>
              </div>

              <div className="mt-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#80665d]">
                  Category
                </p>

                <div className="mt-3 space-y-1">
                  {categories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setCategory(item)}
                      aria-pressed={category === item}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${
                        category === item
                          ? "bg-[#8b1e2d]/10 font-bold text-[#8b1e2d]"
                          : "text-[#65443c] hover:bg-[#efe4ce]"
                      }`}
                    >
                      <span>{item}</span>

                      {category === item && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8b1e2d]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-6 border-t border-[#b08a4a]/20" />

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#80665d]">
                  Region
                </p>

                <div className="relative mt-3">
                  <select
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#b08a4a]/30 bg-[#f7f0df] px-3 pr-9 text-sm text-[#4a211c] outline-none focus:border-[#8b1e2d]"
                  >
                    {regions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#80665d]" />
                </div>
              </div>

              <div className="mt-7 rounded-lg bg-[#efe4ce]/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
                  Our Promise
                </p>

                <p className="mt-2 text-xs leading-5 text-[#6d5149]">
                  Every piece is selected to celebrate authentic Indian
                  craftsmanship and the people behind it.
                </p>
              </div>
            </div>
          </aside>

          <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-[#80665d]">
                Showing{" "}
                <span className="font-bold text-[#4a211c]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "piece" : "pieces"}
              </p>

              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-[#80665d] sm:block">
                  Sort by
                </span>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="h-10 appearance-none rounded-lg border border-[#b08a4a]/35 bg-[#fbf6e9] pl-3 pr-9 text-xs font-semibold text-[#4a211c] outline-none focus:border-[#8b1e2d]"
                  >
                    {sortOptions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-[#80665d]" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9]"
                  >
                    <div className="aspect-[4/4.4] animate-pulse bg-[#efe4ce]" />

                    <div className="space-y-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-6 w-4/5 animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-6 w-1/3 animate-pulse rounded bg-[#efe4ce]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-6 rounded-xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
                <Search className="mx-auto h-9 w-9 text-[#8b1e2d]" />

                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                  Collection unavailable
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d5149]">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => {
                  const isLiked = wishlist.includes(product.id);

                  return (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(67,35,25,0.1)]"
                    >
                      <div className="relative overflow-hidden">
                        <Link
                          href={`/product/${product.slug}`}
                          aria-label={`View ${product.name}`}
                        >
                          <div className="aspect-[4/4.4] bg-[#efe4ce]">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center px-6 text-center font-serif text-lg text-[#80665d]">
                                KALAKRITI
                              </div>
                            )}
                          </div>
                        </Link>

                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <span className="absolute left-3 top-3 rounded-full bg-[#8b1e2d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fff8eb]">
                              Sale
                            </span>
                          )}

                        {product.featured && (
                          <span className="absolute bottom-3 left-3 rounded-full border border-[#e5c98b]/60 bg-[#3d1f1b]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#e5c98b]">
                            Featured
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={
                            isLiked
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition ${
                            isLiked
                              ? "border-[#8b1e2d] bg-[#8b1e2d] text-white"
                              : "border-[#b08a4a]/30 bg-[#fbf6e9]/95 text-[#8b1e2d]"
                          }`}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={isLiked ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <div className="p-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                          {product.material}
                        </span>

                        <Link href={`/product/${product.slug}`}>
                          <h2 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                            {product.name}
                          </h2>
                        </Link>

                        <p className="mt-1 text-xs text-[#80665d]">
                          {product.category} · {product.region}
                        </p>

                        <div className="mt-4 flex items-end gap-2">
                          <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                            {formatPrice(product.price)}
                          </span>

                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="text-sm text-[#80665d] line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                        </div>

                        <Link
                          href={`/product/${product.slug}`}
                          className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/30 text-xs font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d] hover:text-[#fff8eb]"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          View Product
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
                <Search className="mx-auto h-9 w-9 text-[#8b1e2d]" />

                <h2 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
                  No handmade pieces found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d5149]">
                  Try another search term or clear the filters to explore the
                  full collection.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
