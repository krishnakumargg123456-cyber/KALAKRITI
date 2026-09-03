"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Trash2,
  Eye,
  Star,
  Package,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Power,
  PowerOff,
  AlertCircle,
} from "lucide-react";

import api from "@/lib/api/client";
import type { Product } from "@/lib/api/products";

type ProductStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "Rejected";

type AdminProduct = Product & {
  artisan_name?: string | null;
  category_name?: string | null;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const data = (error.response as { data?: unknown }).data;

    if (
      data &&
      typeof data === "object" &&
      "detail" in data &&
      typeof (data as { detail?: unknown }).detail === "string"
    ) {
      return (data as { detail: string }).detail;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

function statusClasses(status?: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-blue-100 text-blue-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

function statusLabel(status?: string) {
  switch (status) {
    case "Approved":
      return "Approved";
    case "Pending":
      return "Pending";
    case "Rejected":
      return "Rejected";
    default:
      return "Draft";
  }
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<AdminProduct[]>(
        "/admin/products",
        {
          params: {
            limit: 100,
          },
        },
      );

      setProducts(response.data);
    } catch (loadError) {
      setError(
        getErrorMessage(
          loadError,
          "Unable to load products. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function runAction(
    id: string,
    endpoint: string,
    message: string,
  ) {
    try {
      setActionId(id);
      setError("");
      setSuccess("");

      await api.patch(`/admin/products/${id}/${endpoint}`);

      setSuccess(message);

      await loadProducts();
    } catch (actionError) {
      setError(
        getErrorMessage(
          actionError,
          "Unable to complete the product action.",
        ),
      );
    } finally {
      setActionId(null);
    }
  }

  async function deleteProduct(id: string) {
    if (
      !window.confirm(
        "Delete this product permanently? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setActionId(id);
      setError("");
      setSuccess("");

      await api.delete(`/admin/products/${id}`);

      setProducts((current) =>
        current.filter((product) => product.id !== id),
      );

      setSuccess("Product deleted successfully.");
    } catch (deleteError) {
      setError(
        getErrorMessage(
          deleteError,
          "Unable to delete the product.",
        ),
      );
    } finally {
      setActionId(null);
    }
  }

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku?.toLowerCase().includes(normalizedSearch) ||
        product.category_name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        product.artisan_name
          ?.toLowerCase()
          .includes(normalizedSearch);

      const status = product.status || "Draft";

      const matchesFilter =
        filter === "all" ||
        (filter === "draft" && status === "Draft") ||
        (filter === "pending" && status === "Pending") ||
        (filter === "approved" && status === "Approved") ||
        (filter === "rejected" && status === "Rejected") ||
        (filter === "active" && product.is_active) ||
        (filter === "inactive" && !product.is_active) ||
        (filter === "featured" && product.is_featured);

      return Boolean(matchesSearch && matchesFilter);
    });
  }, [products, search, filter]);

  const totalProducts = products.length;

  const approvedProducts = products.filter(
    (product) => product.status === "Approved",
  ).length;

  const pendingProducts = products.filter(
    (product) => product.status === "Pending",
  ).length;

  const featuredProducts = products.filter(
    (product) => product.is_featured,
  ).length;

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
              Kalakriti Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
              Products
            </h1>

            <p className="mt-2 text-[#765f45]">
              Review and manage handcrafted products across the marketplace.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>

            <button
              type="button"
              onClick={() => void loadProducts()}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : totalProducts}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Approved
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : approvedProducts}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Pending Review
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : pendingProducts}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Featured
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : featuredProducts}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products, artisans..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none"
            >
              <option value="all">All Products</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-[#765f45]">
                  <Loader2
                    size={22}
                    className="animate-spin text-[#641f2b]"
                  />
                  Loading products...
                </div>
              </div>
            ) : (
              <table className="w-full min-w-[1100px] text-left">
                <thead>
                  <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                    <th className="px-3 py-4">
                      Product
                    </th>

                    <th className="px-3 py-4">
                      Category
                    </th>

                    <th className="px-3 py-4">
                      Artisan
                    </th>

                    <th className="px-3 py-4">
                      Price
                    </th>

                    <th className="px-3 py-4">
                      Status
                    </th>

                    <th className="px-3 py-4">
                      Marketplace
                    </th>

                    <th className="px-3 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => {
                    const status =
                      (product.status || "Draft") as ProductStatus;

                    const busy =
                      actionId === product.id;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-[#eadfc9]"
                      >
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eadfc9]">
                              {product.images?.[0]?.image_url ? (
                                <img
                                  src={
                                    product.images[0].image_url
                                  }
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Package
                                  size={20}
                                  className="text-[#641f2b]"
                                />
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-[#641f2b]">
                                {product.name}
                              </p>

                              {product.sku && (
                                <p className="mt-1 text-xs text-[#8b765c]">
                                  SKU: {product.sku}
                                </p>
                              )}

                              {product.is_featured && (
                                <span className="mt-1 inline-flex items-center gap-1 text-xs text-[#a27b2d]">
                                  <Star
                                    size={12}
                                    fill="currentColor"
                                  />
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 text-[#765f45]">
                          {product.category_name ||
                            "—"}
                        </td>

                        <td className="px-3 py-4 text-[#765f45]">
                          {product.artisan_name ||
                            "—"}
                        </td>

                        <td className="px-3 py-4 font-semibold text-[#641f2b]">
                          ₹
                          {Number(
                            product.price || 0,
                          ).toLocaleString("en-IN")}
                        </td>

                        <td className="px-3 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses(
                              status,
                            )}`}
                          >
                            {statusLabel(status)}
                          </span>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                product.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {product.is_active
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex justify-end gap-2">
                            {status === "Pending" && (
                              <>
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    void runAction(
                                      product.id,
                                      "approve",
                                      "Product approved successfully.",
                                    )
                                  }
                                  title="Approve"
                                  className="rounded-lg border border-green-200 p-2 text-green-700 hover:bg-green-50 disabled:opacity-50"
                                >
                                  {busy ? (
                                    <Loader2
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <CheckCircle2 size={17} />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    void runAction(
                                      product.id,
                                      "reject",
                                      "Product rejected successfully.",
                                    )
                                  }
                                  title="Reject"
                                  className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                                >
                                  <XCircle size={17} />
                                </button>
                              </>
                            )}

                            {status === "Approved" &&
                              product.is_active && (
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    void runAction(
                                      product.id,
                                      "deactivate",
                                      "Product deactivated successfully.",
                                    )
                                  }
                                  title="Deactivate"
                                  className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd] disabled:opacity-50"
                                >
                                  <PowerOff size={17} />
                                </button>
                              )}

                            {status === "Approved" &&
                              !product.is_active && (
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    void runAction(
                                      product.id,
                                      "activate",
                                      "Product activated successfully.",
                                    )
                                  }
                                  title="Activate"
                                  className="rounded-lg border border-green-200 p-2 text-green-700 hover:bg-green-50 disabled:opacity-50"
                                >
                                  <Power size={17} />
                                </button>
                              )}

                            {status === "Approved" && (
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  void runAction(
                                    product.id,
                                    product.is_featured
                                      ? "unfeature"
                                      : "feature",
                                    product.is_featured
                                      ? "Product removed from featured collection."
                                      : "Product added to featured collection.",
                                  )
                                }
                                title={
                                  product.is_featured
                                    ? "Remove featured"
                                    : "Feature product"
                                }
                                className="rounded-lg border border-[#d8c8a8] p-2 text-[#a27b2d] hover:bg-[#f5eddd] disabled:opacity-50"
                              >
                                <Star
                                  size={17}
                                  fill={
                                    product.is_featured
                                      ? "currentColor"
                                      : "none"
                                  }
                                />
                              </button>
                            )}

                            {status === "Approved" &&
                              product.is_active && (
                                <Link
                                  href={`/products/${product.slug}`}
                                  title="View marketplace product"
                                  className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                                >
                                  <Eye size={17} />
                                </Link>
                              )}

                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              title="Edit"
                              className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                            >
                              <Package size={17} />
                            </Link>

                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                void deleteProduct(
                                  product.id,
                                )
                              }
                              title="Delete"
                              className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                            >
                              {busy ? (
                                <Loader2
                                  size={17}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-16 text-center"
                      >
                        <Package
                          size={40}
                          className="mx-auto text-[#bca98b]"
                        />

                        <p className="mt-4 font-semibold text-[#641f2b]">
                          No products found
                        </p>

                        <p className="mt-1 text-sm text-[#765f45]">
                          Products created by artisans will
                          appear here.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
