"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Search as SearchIcon,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

type SearchProduct = {
  id: string;
  slug: string;
  name: string;
  craft: string;
  artisan: string;
  region: string;
  price: number;
  rating: number;
  image: string | null;
};

const popularSearches = [
  "Madhubani",
  "Blue Pottery",
  "Banarasi",
  "Block Printing",
  "Warli",
  "Handmade Decor",
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

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

const mapProduct = (product: ApiProduct): SearchProduct => {
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
    region: product.craft_region ?? "India",
    price: Number(product.price),
    rating: 0,
    image: primaryImage,
  };
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [sort, setSort] = useState("Relevance");

  const [products, setProducts] = useState<SearchProduct[]>([]);
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
        setError("Unable to load products right now. Please try again.");
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

  const results = useMemo(() => {
    const normalized = submittedQuery.trim().toLowerCase();

    if (!normalized) return [];

    const terms = normalized.split(/\s+/);

    const filtered = products.filter((product) => {
      const searchable = [
        product.name,
        product.craft,
        product.artisan,
        product.region,
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => searchable.includes(term));
    });

    if (sort === "Price: Low to High") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sort === "Top Rated") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, submittedQuery, sort]);

  const submitSearch = (value = query) => {
    const cleaned = value.trim();

    if (!cleaned) {
      setSubmittedQuery("");
      return;
    }

    setSubmittedQuery(cleaned);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/65">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#4a211c]">Search</span>
          </div>

          <div className="mx-auto mt-9 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
              Explore KALAKRITI
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
              Search Handmade India
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#6d5149] sm:text-base">
              Search across crafts, products, artisans, and regions to discover
              something with a story.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
              className="mt-7 flex items-center rounded-xl border border-[#b08a4a]/45 bg-[#fbf6e9] p-1.5 shadow-sm"
            >
              <SearchIcon className="ml-3 h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Madhubani, pottery, artisans..."
                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#80665d]"
                aria-label="Search products"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSubmittedQuery("");
                  }}
                  className="mr-2 text-[#80665d] hover:text-[#8b1e2d]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                className="rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb] transition hover:bg-[#741723]"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        {!submittedQuery ? (
          <section className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-5 w-5 text-[#8b1e2d]" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                  Popular Searches
                </p>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-semibold text-[#4a211c]">
                Begin your craft journey
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                Start with one of these popular searches.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {popularSearches.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      submitSearch(item);
                    }}
                    className="rounded-full border border-[#b08a4a]/40 bg-[#f7f0df] px-4 py-2.5 text-sm font-semibold text-[#65443c] transition hover:border-[#8b1e2d]/40 hover:text-[#8b1e2d]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                ["Crafts", "Explore centuries-old Indian techniques."],
                ["Artisans", "Meet the people behind every creation."],
                ["Regions", "Discover craft traditions across India."],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6"
                >
                  <h3 className="font-serif text-xl font-semibold text-[#4a211c]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="flex flex-col justify-between gap-4 border-b border-[#b08a4a]/25 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                  Search Results
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c]">
                  Results for “{submittedQuery}”
                </h2>

                <p className="mt-2 text-sm text-[#80665d]">
                  {results.length}{" "}
                  {results.length === 1 ? "handmade piece" : "handmade pieces"}{" "}
                  found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#80665d]">
                  Sort
                </span>

                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-10 rounded-lg border border-[#b08a4a]/35 bg-[#fbf6e9] px-3 text-xs font-semibold text-[#4a211c] outline-none"
                  aria-label="Sort search results"
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-[#b08a4a]/20 bg-[#fbf6e9]"
                  >
                    <div className="aspect-square animate-pulse bg-[#efe4ce]" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-6 w-full animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-[#efe4ce]" />
                      <div className="h-6 w-24 animate-pulse rounded bg-[#efe4ce]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border border-dashed border-[#8b1e2d]/35 bg-[#fbf6e9] px-6 py-20 text-center">
                <SearchIcon className="mx-auto h-10 w-10 text-[#8b1e2d]" />

                <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
                  Unable to load products
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
                  {error}
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((product) => {
                  const liked = wishlist.includes(product.id);

                  return (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(67,35,25,0.1)]"
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
                              <div className="flex h-full items-center justify-center px-6 text-center">
                                <span className="font-serif text-lg text-[#80665d]">
                                  KALAKRITI
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          aria-label={
                            liked
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border ${
                            liked
                              ? "border-[#8b1e2d] bg-[#8b1e2d] text-white"
                              : "border-[#b08a4a]/30 bg-[#fbf6e9]/95 text-[#8b1e2d]"
                          }`}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={liked ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2">
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
                          <h3 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#4a211c] group-hover:text-[#8b1e2d]">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="mt-1 text-xs text-[#80665d]">
                          By {product.artisan} · {product.region}
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
              <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/45 bg-[#fbf6e9] px-6 py-20 text-center">
                <SearchIcon className="mx-auto h-10 w-10 text-[#8b1e2d]" />

                <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
                  Nothing found
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
                  We could not find a craft matching “{submittedQuery}”.
                  Try a broader search such as a craft, region, or artisan
                  name.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  {popularSearches.slice(0, 4).map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setQuery(item);
                        submitSearch(item);
                      }}
                      className="rounded-full border border-[#b08a4a]/35 px-4 py-2 text-xs font-bold text-[#8b1e2d]"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="mt-14 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#8b1e2d]">
          <div className="flex flex-col gap-6 px-7 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
                Discover the Story
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#fff8eb]">
                Every craft has a place and a people.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#f1dfc9]">
                Learn about the traditions, techniques, and artisan communities
                that keep India&apos;s handmade heritage alive.
              </p>
            </div>

            <Link
              href="/learn"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3.5 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Explore the Learning Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
