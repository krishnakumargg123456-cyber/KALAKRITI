"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { productsApi, type Product as ApiProduct } from "@/lib/api/products";

type Product = {
  id: string;
  slug: string;
  name: string;
  artisan: string;
  craft: string;
  category: string;
  region: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string | null;
};

const categoryInfo: Record<
  string,
  {
    title: string;
    description: string;
    eyebrow: string;
  }
> = {
  art: {
    eyebrow: "Indian Art",
    title: "Art That Tells a Story",
    description:
      "Discover paintings and folk artworks shaped by India's rich visual traditions, created by artists who carry these stories forward.",
  },
  textiles: {
    eyebrow: "Indian Textiles",
    title: "Woven With Tradition",
    description:
      "From hand block printing to intricate weaving and embroidery, discover textiles where every pattern carries a piece of heritage.",
  },
  "home-decor": {
    eyebrow: "Home & Living",
    title: "Heritage for Your Home",
    description:
      "Bring warmth and character into your spaces with handmade pottery, lamps, vessels, and decorative pieces from Indian craft communities.",
  },
  decor: {
    eyebrow: "Traditional Decor",
    title: "Objects With Soul",
    description:
      "Handcrafted objects that transform everyday spaces while preserving techniques passed from one generation to the next.",
  },
  accessories: {
    eyebrow: "Accessories",
    title: "Carry Indian Craft",
    description:
      "Thoughtfully made accessories featuring embroidery, textiles, and traditional details from artisan communities across India.",
  },
};

const fallbackCategory = {
  eyebrow: "KALAKRITI Collection",
  title: "Explore Handmade Treasures",
  description:
    "Discover authentic Indian crafts made by skilled artisans and rooted in generations of tradition.",
};

const getCraft = (product: ApiProduct) => {
  const value = `${product.material ?? ""} ${product.name}`.toLowerCase();

  if (value.includes("madhubani")) return "Madhubani Painting";
  if (value.includes("blue pottery")) return "Blue Pottery";
  if (value.includes("block print")) return "Block Printing";
  if (value.includes("dokra")) return "Dokra Metal Craft";
  if (value.includes("banarasi")) return "Banarasi Weaving";
  if (value.includes("warli")) return "Warli Painting";
  if (value.includes("terracotta")) return "Terracotta";
  if (value.includes("kutch")) return "Kutch Embroidery";
  if (value.includes("phulkari")) return "Phulkari";
  if (product.material) return product.material;

  return "Indian Handcraft";
};

const getCategory = (product: ApiProduct) => {
  const value = `${product.material ?? ""} ${product.name}`.toLowerCase();

  if (
    value.includes("painting") ||
    value.includes("artwork") ||
    value.includes("warli") ||
    value.includes("madhubani")
  ) {
    return "art";
  }

  if (
    value.includes("textile") ||
    value.includes("saree") ||
    value.includes("dupatta") ||
    value.includes("weaving") ||
    value.includes("embroidery") ||
    value.includes("phulkari")
  ) {
    return "textiles";
  }

  if (
    value.includes("diya") ||
    value.includes("pottery") ||
    value.includes("terracotta")
  ) {
    return "home-decor";
  }

  if (
    value.includes("decor") ||
    value.includes("figurine") ||
    value.includes("dokra")
  ) {
    return "decor";
  }

  if (value.includes("bag") || value.includes("accessor")) {
    return "accessories";
  }

  return "other";
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CategoryShopPage({
  params,
}: {
  params: { category: string };
}) {
  const categorySlug = decodeURIComponent(params.category).toLowerCase();
  const info = categoryInfo[categorySlug] ?? fallbackCategory;

  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("Featured");
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

        const mappedProducts: Product[] = response.data
          .filter((product) => product.is_active !== false)
          .map((product) => ({
            id: String(product.id),
            slug: product.slug,
            name: product.name,
            artisan: product.artisan_name ?? "KALAKRITI Artisan",
            craft: getCraft(product),
            category: getCategory(product),
            region: product.craft_region ?? "India",
            price: Number(product.price),
            originalPrice:
              product.compare_at_price != null
                ? Number(product.compare_at_price)
                : undefined,
            rating: 0,
            reviews: 0,
            image:
              product.images?.find((image) => image.is_primary)?.image_url ??
              product.images?.[0]?.image_url ??
              null,
          }));

        setProducts(mappedProducts);
      } catch {
        if (!mounted) return;

        setProducts([]);
        setError(
          "Unable to load this collection right now. Please try again."
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

  const categoryProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => product.category === categorySlug
    );

    return [...filtered].sort((a, b) => {
      if (sort === "Price: Low to High") {
        return a.price - b.price;
      }

      if (sort === "Price: High to Low") {
        return b.price - a.price;
      }

      if (sort === "Top Rated") {
        return b.rating - a.rating;
      }

      return a.name.localeCompare(b.name);
    });
  }, [products, categorySlug, sort]);

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
            <Link href="/shop" className="hover:text-[#8b1e2d]">
              Shop
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium capitalize text-[#4a211c]">
              {categorySlug.replaceAll("-", " ")}
            </span>
          </div>
        </div>
      </div>

      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/65">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 lg:px-12 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            {info.eyebrow}
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
            {info.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d5149] sm:text-base">
            {info.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-9 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-4 border-b border-[#b08a4a]/25 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#80665d]">
              <span className="font-bold text-[#4a211c]">
                {loading ? "—" : categoryProducts.length}
              </span>{" "}
              handmade{" "}
              {categoryProducts.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#80665d]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
                className="h-10 appearance-none rounded-lg border border-[#b08a4a]/35 bg-[#fbf6e9] pl-3 pr-9 text-xs font-semibold text-[#4a211c] outline-none"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-[#80665d]" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-[#b08a4a]/20 bg-[#fbf6e9]"
              >
                <div className="aspect-[4/4.5] animate-pulse bg-[#efe4ce]" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-[#efe4ce]" />
                  <div className="h-6 w-full animate-pulse rounded bg-[#efe4ce]" />
                  <div className="h-3 w-32 animate-pulse rounded bg-[#efe4ce]" />
                  <div className="h-6 w-24 animate-pulse rounded bg-[#efe4ce]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
              Collection unavailable
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
              {error}
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
            >
              Explore All Crafts
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : categoryProducts.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => {
              const liked = wishlist.includes(product.id);

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
                      <div className="aspect-[4/4.5] bg-[#efe4ce]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-center">
                            <div>
                              <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]/60" />
                              <p className="mt-2 px-4 text-xs font-semibold text-[#80665d]">
                                Handmade Craft
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>

                    {product.originalPrice && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#8b1e2d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fff8eb]">
                        Special Price
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        liked
                          ? "Remove product from wishlist"
                          : "Add product to wishlist"
                      }
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition ${
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
                        <span className="flex items-center gap-1 text-xs font-bold text-[#4a211c]">
                          <Star className="h-3.5 w-3.5 fill-[#b08a4a] text-[#b08a4a]" />
                          {product.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h2 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-1 text-xs text-[#80665d]">
                      By {product.artisan} · {product.region}
                    </p>

                    <div className="mt-4 flex items-end gap-2">
                      <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                        {formatPrice(product.price)}
                      </span>

                      {product.originalPrice && (
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
                      Explore Piece
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
              This collection is coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
              We are carefully bringing more authentic handmade pieces to this
              collection.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
            >
              Explore All Crafts
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <section className="mt-14 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#8b1e2d]">
          <div className="px-7 py-9 text-center sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
              More Than a Product
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#fff8eb] sm:text-3xl">
              Know the hands behind the craft
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#f1dfc9]">
              Every KALAKRITI piece connects you to an artisan, a region, and a
              tradition worth preserving.
            </p>

            <Link
              href="/artisans"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Meet Our Artisans
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
