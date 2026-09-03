"use client";

import { useEffect, useState } from "react";
import { ArrowRight, PackageSearch, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";

import ProductGrid, {
  type Product,
} from "@/components/product/ProductGrid";
import { productsApi } from "@/lib/api/products";

type ProductApiResponse = {
  items?: Product[];
  products?: Product[];
  data?: Product[];
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await productsApi.list({
          skip: 0,
          limit: 50,
        });

        const body = response.data as Product[] | ProductApiResponse;

        const items = Array.isArray(body)
          ? body
          : body.items ?? body.products ?? body.data ?? [];

        if (mounted) {
          setProducts(items);
        }
      } catch (err) {
        console.error("Failed to load products:", err);

        if (mounted) {
          setError("Unable to load the collection right now.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      <section className="relative overflow-hidden border-b border-border bg-parchment py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full border border-gold/50" />
          <div className="absolute -right-24 bottom-[-80px] h-72 w-72 rounded-full border border-maroon/20" />

          <div className="absolute left-10 top-10 h-10 w-10 rotate-45 border border-gold/50" />
          <div className="absolute right-12 top-16 h-12 w-12 rotate-45 border border-gold/40" />
        </div>

        <div className="kalakriti-container relative px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-cream/80 px-4 py-2">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
                The Kalakriti Collection
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-6xl">
              Handcrafted treasures,
              <span className="block text-maroon">
                made to be remembered.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brown md:text-base">
              Discover authentic creations made by Indian artisans, each
              carrying the skill, stories, and traditions of the communities
              behind them.
            </p>
          </div>
        </div>
      </section>

      <section className="kalakriti-container px-4 py-10 md:py-14">
        {!loading && !error && products.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Curated for you
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-deep-maroon">
                Explore the collection
              </h2>

              <p className="mt-2 text-sm text-muted">
                {products.length} handcrafted{" "}
                {products.length === 1 ? "piece" : "pieces"} available
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-maroon transition-colors hover:text-maroon-light"
            >
              Browse categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-card border border-border bg-cream"
              >
                <div className="aspect-square bg-parchment" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 rounded bg-parchment" />
                  <div className="h-6 w-4/5 rounded bg-parchment" />
                  <div className="h-4 w-1/2 rounded bg-parchment" />
                  <div className="h-10 w-full rounded bg-parchment" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-card border border-maroon/20 bg-cream p-10 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-parchment">
              <RefreshCw className="h-7 w-7 text-maroon" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-deep-maroon">
              The collection could not be loaded
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              {error} Please make sure the marketplace service is available
              and try again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-light"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="mx-auto max-w-xl rounded-card border border-border bg-cream p-10 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-parchment">
              <PackageSearch className="h-8 w-8 text-maroon" />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-deep-maroon">
              The collection is being prepared
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Our artisans are preparing beautiful handcrafted pieces for the
              collection. Explore our craft heritage while you wait.
            </p>

            <Link
              href="/craft-heritage"
              className="mt-6 inline-flex items-center gap-2 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-light"
            >
              Explore Craft Heritage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </section>
    </main>
  );
}
