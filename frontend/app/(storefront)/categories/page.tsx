"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, FolderOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { categoriesApi } from "@/lib/api/categories";

type RawCategory = {
  id?: string;
  uuid?: string;
  category_id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  image?: string | null;
  image_url?: string | null;
  is_active?: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
};

const categoryMeta: Record<
  string,
  { description: string; image: string | null }
> = {
  pottery: {
    description:
      "Hand-shaped terracotta, clayware and traditional pottery.",
    image: "/images/products/pottery/pottery-1.jpg",
  },
  handloom: {
    description:
      "Timeless Indian textiles woven by skilled artisans.",
    image: "/images/products/handloom/handloom-1.jpg",
  },
  jewellery: {
    description:
      "Traditional handcrafted jewellery inspired by Indian culture.",
    image: "/images/products/jewellery/jewellery-1.jpg",
  },
  paintings: {
    description:
      "Madhubani, folk and contemporary Indian art traditions.",
    image: "/images/products/paintings/painting-1.jpg",
  },
  "wooden-crafts": {
    description:
      "Carved and handcrafted wooden pieces with heritage character.",
    image: "/images/products/wooden-crafts/wooden-1.jpg",
  },
  "home-decor": {
    description:
      "Bring Indian craftsmanship and warmth into your home.",
    image: "/images/products/home-decor/home-decor-1.jpg",
  },
  bags: {
    description:
      "Handcrafted bags combining traditional techniques with daily use.",
    image: "/images/products/bags/bag-1.jpg",
  },
};

function normalizeCategories(payload: unknown): RawCategory[] {
  if (Array.isArray(payload)) {
    return payload as RawCategory[];
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
    return data.items as RawCategory[];
  }

  if (Array.isArray(data.data)) {
    return data.data as RawCategory[];
  }

  if (Array.isArray(data.results)) {
    return data.results as RawCategory[];
  }

  return [];
}

function buildCategory(raw: RawCategory): Category | null {
  const id = String(
    raw.id ?? raw.uuid ?? raw.category_id ?? "",
  );

  const name = String(raw.name ?? "").trim();

  const slug =
    String(raw.slug ?? "").trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  if (!id || !name || !slug) {
    return null;
  }

  const meta = categoryMeta[slug];

  return {
    id,
    name,
    slug,
    description:
      raw.description?.trim() ||
      meta?.description ||
      "Explore handcrafted creations rooted in India's rich craft heritage.",
    image:
      raw.image_url ||
      raw.image ||
      meta?.image ||
      null,
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      setLoading(true);
      setError("");

      const response = await categoriesApi.list();
      const normalized = normalizeCategories(response.data)
        .filter((category) => category.is_active !== false)
        .map(buildCategory)
        .filter((category): category is Category => category !== null);

      setCategories(normalized);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load craft categories. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const categoryCountLabel = useMemo(() => {
    if (categories.length === 0) {
      return "Living Craft Traditions";
    }

    return `${categories.length} Craft ${
      categories.length === 1 ? "Category" : "Categories"
    }`;
  }, [categories.length]);

  return (
    <main className="min-h-screen bg-[#f6efdf] text-[#4a1717]">
      <section className="relative overflow-hidden border-b border-[#b68b45]/30">
        <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#b68b45]/50 bg-[#fffaf0]/70 px-4 py-2 text-sm font-medium text-[#76551f]">
            <Sparkles size={16} />
            Discover Indian Craft Traditions
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Explore Our Categories
          </h1>

          <div className="mx-auto mt-5 h-px w-28 bg-[#a87528]" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5145] md:text-lg">
            From handwoven textiles to timeless pottery, discover handcrafted
            treasures created by skilled Indian artisans and rooted in centuries
            of tradition.
          </p>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#96702f]">
            {categoryCountLabel}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-sm border border-[#b68b45]/25 bg-[#fffaf0]"
              >
                <div className="aspect-[4/3] animate-pulse bg-[#eadfc9]" />
                <div className="space-y-4 p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#eadfc9]" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-[#eadfc9]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-sm border border-[#b68b45]/35 bg-[#fffaf0] px-6 py-12 text-center">
            <FolderOpen className="h-10 w-10 text-[#701f24]" />

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#701f24]">
              Categories unavailable
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6e5145]">
              {error}
            </p>

            <button
              type="button"
              onClick={loadCategories}
              className="mt-6 rounded-sm bg-[#701f24] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#531419]"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-sm border border-[#b68b45]/35 bg-[#fffaf0] px-6 py-12 text-center">
            <FolderOpen className="h-10 w-10 text-[#a87528]" />

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#701f24]">
              No categories yet
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6e5145]">
              Our craft collections are being prepared. Please check back
              soon to explore the latest traditions.
            </p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-sm border border-[#b68b45]/35 bg-[#fffaf0] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eadfc9]">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FolderOpen className="h-12 w-12 text-[#b68b45]" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                  <div className="absolute bottom-4 left-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#f3d99a]">
                      Indian Craft
                    </span>

                    <h2 className="mt-1 font-serif text-2xl font-semibold text-white">
                      {category.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="min-h-[52px] text-sm leading-7 text-[#72594d]">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#b68b45]/20 pt-4">
                    <span className="text-sm font-semibold text-[#701f24]">
                      Explore Collection
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b68b45]/40 transition group-hover:bg-[#701f24] group-hover:text-white">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-[#b68b45]/30 bg-[#eadfc9]/50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#96702f]">
            Beyond Products
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
            Every Craft Carries a Story
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e5145] md:text-base">
            Learn about the regions, communities, techniques and traditions
            behind the crafts you bring home.
          </p>

          <Link
            href="/craft-heritage"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#701f24] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#531419]"
          >
            Explore Craft Heritage
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
