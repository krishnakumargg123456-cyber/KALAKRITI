"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

import {
  productsApi,
  type Product,
  type ProductUpdateData,
  type ProductImage,
} from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";

type Category = {
  id: string;
  name: string;
};

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];

  if (
    data &&
    typeof data === "object" &&
    "items" in data &&
    Array.isArray((data as { items?: unknown }).items)
  ) {
    return (data as { items: T[] }).items;
  }

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data?: unknown }).data)
  ) {
    return (data as { data: T[] }).data;
  }

  return [];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

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
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-blue-50 text-blue-700";
    case "Rejected":
      return "bg-red-50 text-red-700";
    default:
      return "bg-amber-50 text-amber-700";
  }
}

function statusLabel(status?: string) {
  switch (status) {
    case "Approved":
      return "Published";
    case "Pending":
      return "Pending Approval";
    case "Rejected":
      return "Rejected";
    default:
      return "Draft";
  }
}

export default function EditArtisanProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [craftRegion, setCraftRegion] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!productId) return;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const [myProductsResponse, categoryResponse, imageResponse] =
          await Promise.all([
            productsApi.listMine({
              limit: 100,
            }),
            getCategories(),
            productsApi.listImages(productId),
          ]);

        const currentProduct = myProductsResponse.data.find(
          (item) => item.id === productId,
        );

        if (!currentProduct) {
          throw new Error(
            "This product was not found in your artisan products.",
          );
        }

        setProduct(currentProduct);
        setCategories(normalizeList<Category>(categoryResponse));
        setImages(normalizeList<ProductImage>(imageResponse.data));

        setName(currentProduct.name ?? "");
        setSlug(currentProduct.slug ?? "");
        setCategoryId(currentProduct.category_id ?? "");
        setPrice(String(currentProduct.price ?? ""));
        setCompareAtPrice(
          currentProduct.compare_at_price != null
            ? String(currentProduct.compare_at_price)
            : "",
        );
        setSku(currentProduct.sku ?? "");
        setDescription(currentProduct.description ?? "");
        setMaterial(currentProduct.material ?? "");
        setDimensions(currentProduct.dimensions ?? "");
        setCraftRegion(currentProduct.craft_region ?? "");
      } catch (loadError) {
        setError(
          getErrorMessage(
            loadError,
            "Unable to load the product. Please try again.",
          ),
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [productId]);

  const productStatus = product?.status || "Draft";
  const isPending = productStatus === "Pending";
  const canSubmit =
    productStatus === "Draft" || productStatus === "Rejected";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!productId) {
      setError("Product ID is missing.");
      return;
    }

    if (isPending) {
      setError(
        "This product is currently under admin review and cannot be edited.",
      );
      return;
    }

    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!sku.trim()) {
      setError("Please enter a SKU.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid product price.");
      return;
    }

    if (
      compareAtPrice &&
      Number(compareAtPrice) <= 0
    ) {
      setError("Please enter a valid compare-at price.");
      return;
    }

    if (
      compareAtPrice &&
      Number(compareAtPrice) <= Number(price)
    ) {
      setError(
        "Compare-at price must be greater than the product price.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSaved(false);
      setSubmitted(false);

      const data: ProductUpdateData = {
        category_id: categoryId,
        name: name.trim(),
        slug: slugify(slug || name),
        description: description.trim() || null,
        price: Number(price),
        compare_at_price: compareAtPrice
          ? Number(compareAtPrice)
          : null,
        sku: sku.trim(),
        material: material.trim() || null,
        dimensions: dimensions.trim() || null,
        craft_region: craftRegion.trim() || null,
      };

      const response = await productsApi.update(
        productId,
        data,
      );

      setProduct(response.data);
      setSaved(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "Unable to save changes. Please check the details and try again.",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  async function submitForApproval() {
    if (!productId) return;

    if (!canSubmit) {
      setError(
        "Only draft or rejected products can be submitted.",
      );
      return;
    }

    if (images.length === 0) {
      setError(
        "At least one product image is required before submission.",
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSubmitted(false);

      const response = await productsApi.submit(productId);

      setProduct(response.data);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submitError) {
      setError(
        getErrorMessage(
          submitError,
          "Unable to submit the product for approval.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function addImage() {
    if (!productId || isPending) return;

    const url = window.prompt(
      "Enter the hosted image URL:",
    );

    if (!url?.trim()) return;

    try {
      setError("");

      const response = await productsApi.addImage(
        productId,
        {
          image_url: url.trim(),
          alt_text: name || null,
          sort_order: images.length,
          is_primary: images.length === 0,
        },
      );

      setImages((current) => [
        ...current,
        response.data,
      ]);
    } catch (imageError) {
      setError(
        getErrorMessage(
          imageError,
          "Unable to add the product image.",
        ),
      );
    }
  }

  async function removeImage(imageId: string) {
    if (!productId || isPending) return;

    try {
      setDeletingImage(imageId);
      setError("");

      await productsApi.deleteImage(
        productId,
        imageId,
      );

      setImages((current) =>
        current.filter(
          (image) => image.id !== imageId,
        ),
      );
    } catch (imageError) {
      setError(
        getErrorMessage(
          imageError,
          "Unable to delete the product image.",
        ),
      );
    } finally {
      setDeletingImage(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-2xl border border-border bg-paper p-12">
          <Loader2 className="h-6 w-6 animate-spin text-maroon" />

          <span className="ml-3 text-sm text-brown/70">
            Loading product...
          </span>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-paper p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-maroon">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-brown/65">
            {error ||
              "The requested product could not be loaded."}
          </p>

          <Link
            href="/artisan/products"
            className="mt-6 inline-flex rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/artisan/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-maroon"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Artisan Studio
              </p>

              <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
                Edit Product
              </h1>

              <p className="mt-2 text-sm text-brown/65">
                Update your handcrafted product information.
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-semibold ${statusClasses(
                productStatus,
              )}`}
            >
              {statusLabel(productStatus)}
            </span>
          </div>
        </div>

        {submitted && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Product submitted successfully for admin approval.
          </div>
        )}

        {saved && !submitted && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Product changes saved successfully.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {productStatus === "Rejected" && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-800">
              This product was rejected.
            </p>

            <p className="mt-1 text-sm text-red-700">
              Update the product information and submit it again
              for admin review.
            </p>
          </div>
        )}

        {productStatus === "Pending" && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="font-semibold text-blue-800">
              Product is under review.
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Admin moderation is currently reviewing this
              product. Editing and image changes are temporarily
              disabled.
            </p>
          </div>
        )}

        {productStatus === "Approved" && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="font-semibold text-green-800">
              Product approved.
            </p>

            <p className="mt-1 text-sm text-green-700">
              This product is currently approved. Saving changes
              will move it back to draft and it will require
              admin approval again.
            </p>
          </div>
        )}

        <form
          onSubmit={submit}
          className="mt-8 space-y-6"
        >
          <section className="rounded-xl border border-border bg-paper p-6 md:p-8">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Product Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-brown">
                  Product Name *
                </span>

                <input
                  required
                  disabled={isPending}
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  Category *
                </span>

                <select
                  required
                  disabled={isPending}
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  SKU *
                </span>

                <input
                  required
                  disabled={isPending}
                  value={sku}
                  onChange={(event) =>
                    setSku(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  Price (₹) *
                </span>

                <input
                  required
                  disabled={isPending}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  Compare-at Price (₹)
                </span>

                <input
                  disabled={isPending}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={compareAtPrice}
                  onChange={(event) =>
                    setCompareAtPrice(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-brown">
                  Product Slug *
                </span>

                <input
                  required
                  disabled={isPending}
                  value={slug}
                  onChange={(event) =>
                    setSlug(slugify(event.target.value))
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  Material
                </span>

                <input
                  disabled={isPending}
                  value={material}
                  onChange={(event) =>
                    setMaterial(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium text-brown">
                  Dimensions
                </span>

                <input
                  disabled={isPending}
                  value={dimensions}
                  onChange={(event) =>
                    setDimensions(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-brown">
                  Craft Region
                </span>

                <input
                  disabled={isPending}
                  value={craftRegion}
                  onChange={(event) =>
                    setCraftRegion(event.target.value)
                  }
                  placeholder="Madhubani, Bihar"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-sm font-medium text-brown">
                  Description
                </span>

                <textarea
                  rows={7}
                  disabled={isPending}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6 md:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Product Images
                </h2>

                <p className="mt-1 text-sm text-brown/60">
                  At least one image is required before submitting
                  for approval.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void addImage()}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-maroon disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                Add Image
              </button>
            </div>

            {images.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-red-200 p-8 text-center">
                <ImagePlus className="mx-auto h-9 w-9 text-gold" />

                <p className="mt-3 text-sm text-red-700">
                  Add at least one product image before submitting.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {images.map((image) => (
                  <div
                    key={
                      image.id ??
                      `${image.image_url}-${image.sort_order}`
                    }
                    className="flex flex-col gap-4 rounded-xl border border-border bg-cream p-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-medium text-maroon">
                        {image.image_url}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-brown/60">
                        {image.is_primary && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">
                            Primary
                          </span>
                        )}

                        <span>
                          Sort order: {image.sort_order ?? 0}
                        </span>
                      </div>
                    </div>

                    {image.id && (
                      <button
                        type="button"
                        disabled={
                          deletingImage === image.id ||
                          isPending
                        }
                        onClick={() =>
                          void removeImage(image.id!)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingImage === image.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}

                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-paper p-6 md:p-8">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Approval Workflow
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Draft
                </p>

                <p className="mt-2 font-semibold text-maroon">
                  Edit Product
                </p>

                <p className="mt-1 text-sm text-brown/60">
                  Update product details and images.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Pending
                </p>

                <p className="mt-2 font-semibold text-maroon">
                  Admin Review
                </p>

                <p className="mt-1 text-sm text-brown/60">
                  Admin checks the product before publishing.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Approved
                </p>

                <p className="mt-2 font-semibold text-maroon">
                  Marketplace Live
                </p>

                <p className="mt-1 text-sm text-brown/60">
                  Approved products become visible to customers.
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving || isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-paper px-6 py-3 font-semibold text-maroon disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </button>

            {canSubmit && (
              <button
                type="button"
                disabled={
                  submitting ||
                  images.length === 0
                }
                onClick={() => void submitForApproval()}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit for Approval
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
