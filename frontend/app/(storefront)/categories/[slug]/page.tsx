"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getCategory } from "@/lib/api/categories";
import { productsApi, type Product } from "@/lib/api/products";

type RawCategory = {
  id?: string;
  uuid?: string;
  category_id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  heritage?: string | null;
  story?: string | null;
  is_active?: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  heritage: string;
  image: string | null;
};

function normalizeCategory(payload: unknown, fallbackSlug: string): Category | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const raw = payload as RawCategory;

  const id = String(
    raw.id ?? raw.uuid ?? raw.category_id ?? "",
  ).trim();

  const name = String(raw.name ?? "").trim();

  const slug =
    String(raw.slug ?? fallbackSlug).trim() ||
    fallbackSlug;

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    slug,
    description:
      raw.description?.trim() ||
      "Discover handcrafted creations rooted in India's rich craft heritage.",
    heritage:
      raw.heritage?.trim() ||
      raw.story?.trim() ||
      "Each piece carries the knowledge, traditions and artistic identity of the communities who create it.",
    image:
      raw.image_url?.trim() ||
      raw.image?.trim() ||
      null,
  };
}

function getProductImage(product: Product) {
  const images = [...(product.images ?? [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  const primary =
    images.find((image) => image.is_primary)?.image_url ||
    images[0]?.image_url;

  return primary || "/images/products/placeholder.jpg";
}

function getPrice(value: string | number | null | undefined) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getProductCollection(payload: unknown): Product[] {
  if (Array.isArray(payload)) {
    return payload as Product[];
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const data = payload as {
    items?: unknown;
    data?: unknown;
    results?: unknown;
  };

  if (Array.isArray(data.items)) {
    return data.items as Product[];
  }

  if (Array.isArray(data.data)) {
    return data.data as Product[];
  }

  if (Array.isArray(data.results)) {
    return data.results as Product[];
  }

  return [];
}

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCategory() {
    if (!slug) {
      setError("Category could not be identified.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const categoryResponse = await getCategory(slug);
      const normalizedCategory = normalizeCategory(
        categoryResponse,
        slug,
      );

      if (!normalizedCategory) {
        setCategory(null);
        setProducts([]);
        return;
      }

      setCategory(normalizedCategory);

      const productsResponse = await productsApi.list({
        category_id: normalizedCategory.id,
        skip: 0,
        limit: 100,
      });

      const categoryProducts = getProductCollection(
        productsResponse.data,
      ).filter((product) => product.is_active !== false);

      setProducts(categoryProducts);
    } catch (err) {
      console.error(err);
      setCategory(null);
      setProducts([]);
      setError(
        "Unable to load this craft collection. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const featuredCount = useMemo(
    () => products.length,
    [products.length],
  );

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6efdf] text-[#4a1717]">
        <section className="border-b border-[#b68b45]/30">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
            <div className="h-4 w-64 animate-pulse rounded bg-[#eadfc9]" />
          </div>
        </section>

        <section className="grid lg:grid-cols-2">
          <div className="min-h-[420px] animate-pulse bg-[#e8dcc5]" />

          <div className="flex items-center bg-[#fffaf0] px-7 py-14 md:px-12 lg:px-16">
            <div className="w-full max-w-xl space-y-5">
              <div className="h-4 w-40 animate-pulse rounded bg-[#eadfc9]" />
              <div className="h-12 w-2/3 animate-pulse rounded bg-[#eadfc9]" />
              <div className="h-1 w-24 animate-pulse rounded bg-[#eadfc9]" />
              <div className="h-5 w-full animate-pulse rounded bg-[#eadfc9]" />
              <div className="h-5 w-5/6 animate-pulse rounded bg-[#eadfc9]" />
              <div className="h-11 w-44 animate-pulse rounded bg-[#eadfc9]" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden border border-[#b68b45]/25 bg-[#fffaf0]"
              >
                <div className="aspect-square animate-pulse bg-[#eadfc9]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-5 w-1/3 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-10 w-full animate-pulse rounded bg-[#eadfc9]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f6efdf] px-6 py-24 text-center text-[#4a1717]">
        <div className="mx-auto max-w-xl">
          <Sparkles
            className="mx-auto mb-5 text-[#a87528]"
            size={34}
          />

          <h1 className="font-serif text-4xl font-semibold">
            Collection Unavailable
          </h1>

          <p className="mt-4 leading-7 text-[#72594d]">
            {error}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={loadCategory}
              className="inline-flex items-center gap-2 bg-[#701f24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#531419]"
            >
              Try Again
            </button>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 border border-[#701f24] px-6 py-3 text-sm font-semibold text-[#701f24] transition hover:bg-[#701f24] hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Categories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-[#f6efdf] px-6 py-24 text-center text-[#4a1717]">
        <div className="mx-auto max-w-xl">
          <Sparkles
            className="mx-auto mb-5 text-[#a87528]"
            size={34}
          />

          <h1 className="font-serif text-4xl font-semibold">
            Category Not Found
          </h1>

          <p className="mt-4 leading-7 text-[#72594d]">
            The craft category you are looking for could not be
            found.
          </p>

          <Link
            href="/categories"
            className="mt-8 inline-flex items-center gap-2 bg-[#701f24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#531419]"
          >
            <ArrowLeft size={17} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6efdf] text-[#4a1717]">
      <div className="border-b border-[#b68b45]/25 bg-[#fffaf0]/60">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#765b4d]">
            <Link
              href="/"
              className="transition hover:text-[#701f24]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/categories"
              className="transition hover:text-[#701f24]"
            >
              Categories
            </Link>

            <span>/</span>

            <span className="font-medium text-[#701f24]">
              {category.name}
            </span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-[#b68b45]/30">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden bg-[#e8dcc5]">
            {category.image ? (
              <img
                src={category.image}
                alt={category.name}
                className="h-full min-h-[420px] w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center">
                <Sparkles
                  size={56}
                  className="text-[#b68b45]"
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#f1d89d]">
                Indian Craft Heritage
              </span>

              <h2 className="mt-2 font-serif text-4xl font-semibold text-white">
                {category.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center bg-[#fffaf0] px-7 py-14 md:px-12 lg:px-16">
            <div className="max-w-xl">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#96702f]">
                <Sparkles size={17} />
                The Collection
              </div>

              <h1 className="font-serif text-4xl font-semibold md:text-5xl">
                {category.name}
              </h1>

              <div className="mt-5 h-px w-24 bg-[#a87528]" />

              <p className="mt-6 text-base leading-8 text-[#6e5145]">
                {category.description}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#806557]">
                {category.heritage}
              </p>

              <Link
                href="#collection"
                className="mt-8 inline-flex items-center gap-2 bg-[#701f24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#531419]"
              >
                Explore Collection
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#b68b45]/25 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#96702f]">
              Handpicked For You
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
              {category.name} Collection
            </h2>
          </div>

          <span className="text-sm text-[#806557]">
            {featuredCount}{" "}
            {featuredCount === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="mx-auto max-w-xl border border-[#b68b45]/30 bg-[#fffaf0] px-6 py-14 text-center">
            <ShoppingBag
              className="mx-auto text-[#a87528]"
              size={38}
            />

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#701f24]">
              This collection is being prepared
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#72594d]">
              New handcrafted pieces from this tradition will appear
              here as they become available.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#701f24] hover:underline"
            >
              Explore All Crafts
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const image = getProductImage(product);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden border border-[#b68b45]/30 bg-[#fffaf0] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#eadfc9]">
                    <Link
                      href={`/product/${product.slug}`}
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    </Link>

                    <button
                      type="button"
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf0]/90 shadow-sm transition hover:bg-white"
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? "fill-[#701f24] text-[#701f24]"
                            : "text-[#701f24]"
                        }
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <Link
                      href={`/product/${product.slug}`}
                      className="block"
                    >
                      <h3 className="line-clamp-2 font-serif text-lg font-semibold transition group-hover:text-[#701f24]">
                        {product.name}
                      </h3>
                    </Link>

                    {product.material && (
                      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#96702f]">
                        {product.material}
                      </p>
                    )}

                    <p className="mt-3 text-lg font-semibold text-[#701f24]">
                      {getPrice(product.price)}
                    </p>

                    <Link
                      href={`/product/${product.slug}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 border border-[#701f24] px-4 py-2.5 text-sm font-semibold text-[#701f24] transition hover:bg-[#701f24] hover:text-white"
                    >
                      <ShoppingBag size={16} />
                      View Product
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-y border-[#b68b45]/30 bg-[#eadfc9]/45">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <Sparkles
            className="mx-auto text-[#a87528]"
            size={25}
          />

          <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
            Discover the Story Behind the Craft
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e5145] md:text-base">
            Explore the communities, techniques and traditions that
            make India&apos;s craft heritage so extraordinary.
          </p>

          <Link
            href="/craft-heritage"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#701f24] hover:underline"
          >
            Explore Craft Heritage
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}





