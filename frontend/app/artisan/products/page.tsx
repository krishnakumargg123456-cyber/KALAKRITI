"use client";

import Link from "next/link";
import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";
import { useEffect, useMemo, useState } from "react";
import {
  Edit3,
  Eye,
  Plus,
  Package,
  IndianRupee,
  Loader2,
  RefreshCw,
  AlertCircle,
  Send,
} from "lucide-react";
import { productsApi, type Product } from "@/lib/api/products";

type ProductLifecycleStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "Rejected";

function getStatus(product: Product): ProductLifecycleStatus {
  if (
    product.status === "Draft" ||
    product.status === "Pending" ||
    product.status === "Approved" ||
    product.status === "Rejected"
  ) {
    return product.status;
  }

  return "Draft";
}

function getStatusClasses(status: ProductLifecycleStatus) {
  switch (status) {
    case "Approved":
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-blue-50 text-blue-700";
    case "Rejected":
      return "bg-red-50 text-red-700";
    case "Draft":
      return "bg-amber-50 text-amber-700";
  }
}

function getStatusLabel(status: ProductLifecycleStatus) {
  switch (status) {
    case "Approved":
      return "Published";
    case "Pending":
      return "Pending Approval";
    case "Rejected":
      return "Rejected";
    case "Draft":
      return "Draft";
  }
}

export default function ArtisanProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await productsApi.listMine({
        limit: 100,
      });

      setProducts(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load your products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function handleSubmit(product: Product) {
    try {
      setSubmittingId(product.id);
      setError("");

      await productsApi.submit(product.id);

      await loadProducts();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to submit this product for approval."
      );
    } finally {
      setSubmittingId(null);
    }
  }

  const approvedCount = useMemo(
    () =>
      products.filter(
        (product) => getStatus(product) === "Approved"
      ).length,
    [products]
  );

  const pendingCount = useMemo(
    () =>
      products.filter(
        (product) => getStatus(product) === "Pending"
      ).length,
    [products]
  );

  const draftCount = useMemo(
    () =>
      products.filter(
        (product) => getStatus(product) === "Draft"
      ).length,
    [products]
  );

  const totalSales = 0;

  return (
    <ArtisanRouteGuard>
      <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Artisan Studio
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
              My Products
            </h1>

            <p className="mt-2 text-sm text-brown/65">
              Manage your handcrafted products and submit them for approval.
            </p>
          </div>

          <Link
            href="/artisan/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 text-sm font-semibold text-cream"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {error && (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={() => void loadProducts()}
              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-paper p-5">
            <Package className="h-5 w-5 text-gold" />

            <p className="mt-3 text-sm text-brown/60">
              Total Products
            </p>

            <p className="mt-1 text-2xl font-bold text-maroon">
              {loading ? "—" : products.length}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-5">
            <Eye className="h-5 w-5 text-gold" />

            <p className="mt-3 text-sm text-brown/60">
              Published
            </p>

            <p className="mt-1 text-2xl font-bold text-maroon">
              {loading ? "—" : approvedCount}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-5">
            <Send className="h-5 w-5 text-gold" />

            <p className="mt-3 text-sm text-brown/60">
              Pending Approval
            </p>

            <p className="mt-1 text-2xl font-bold text-maroon">
              {loading ? "—" : pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-5">
            <IndianRupee className="h-5 w-5 text-gold" />

            <p className="mt-3 text-sm text-brown/60">
              Draft Products
            </p>

            <p className="mt-1 text-2xl font-bold text-maroon">
              {loading ? "—" : draftCount}
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-brown/60">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                Loading products...
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold">
                <Package className="h-7 w-7" />
              </div>

              <h2 className="mt-4 font-serif text-xl font-semibold text-maroon">
                No products yet
              </h2>

              <p className="mt-2 max-w-md text-sm text-brown/60">
                Add your first handcrafted product to start building
                your artisan collection.
              </p>

              <Link
                href="/artisan/products/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon px-4 py-2.5 text-sm font-semibold text-cream"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="border-b border-border bg-cream">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-brown">
                      Product
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-brown">
                      Category
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-brown">
                      Price
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-brown">
                      Status
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-brown">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const status = getStatus(product);
                    const canSubmit =
                      status === "Draft" || status === "Rejected";

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-border last:border-0 hover:bg-cream/50"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-maroon">
                            {product.name}
                          </div>

                          {product.sku && (
                            <div className="mt-1 text-xs text-brown/45">
                              SKU: {product.sku}
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-brown/70">
                          {product.category_name || "Category"}
                        </td>

                        <td className="px-5 py-4 text-sm text-brown">
                          ₹
                          {Number(product.price || 0).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              status
                            )}`}
                          >
                            {getStatusLabel(status)}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/artisan/products/${product.id}/edit`}
                              className="inline-flex items-center gap-1 text-sm font-semibold text-maroon hover:text-gold"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </Link>

                            {status === "Approved" && product.is_active && (
                              <Link
                                href={`/products/${product.slug}`}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-brown/70 hover:text-gold"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </Link>
                            )}

                            {canSubmit && (
                              <button
                                type="button"
                                disabled={submittingId === product.id}
                                onClick={() => void handleSubmit(product)}
                                className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-2 text-xs font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {submittingId === product.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Send className="h-3.5 w-3.5" />
                                )}

                                Submit
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
    </ArtisanRouteGuard>
  )
}

