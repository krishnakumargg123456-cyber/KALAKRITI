"use client";

import { useEffect, useState } from "react";
import ProductGrid, { type Product } from "@/components/product/ProductGrid";
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
          setError("Unable to load products. Please try again.");
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
      <section className="kalakriti-container px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Kalakriti Collection
        </p>

        <h1 className="mt-3 font-serif text-5xl font-bold text-deep-maroon">
          Handcrafted Products
        </h1>

        <p className="mt-4 max-w-2xl text-brown">
          Discover authentic handcrafted creations made by Indian artisans
          and rooted in generations of traditional craftsmanship.
        </p>

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-card border border-border bg-cream"
              >
                <div className="aspect-square bg-parchment" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 rounded bg-parchment" />
                  <div className="h-6 w-3/4 rounded bg-parchment" />
                  <div className="h-4 w-1/2 rounded bg-parchment" />
                  <div className="h-10 w-full rounded bg-parchment" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-12 rounded-card border border-border bg-cream p-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-deep-maroon">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-muted">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-card bg-maroon px-6 py-3 text-sm font-semibold text-white hover:bg-maroon-light"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && <ProductGrid products={products} />}
      </section>
    </main>
  );
}
