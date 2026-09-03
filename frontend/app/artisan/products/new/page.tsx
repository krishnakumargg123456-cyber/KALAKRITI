"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

import api from "@/lib/api/client";
import {
  productsApi,
  type ProductCreateData,
} from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";

type Category = {
  id: string;
  name: string;
  slug?: string | null;
};

type ImageInput = {
  url: string;
  alt: string;
  isPrimary: boolean;
  uploading?: boolean;
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

type UploadResponse = {
  filename: string;
  path: string;
  url: string;
};

export default function NewArtisanProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [sku, setSku] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [craftRegion, setCraftRegion] = useState("");

  const [images, setImages] = useState<ImageInput[]>([
    {
      url: "",
      alt: "",
      isPrimary: true,
    },
  ]);

  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedProductId, setSavedProductId] = useState<string | null>(null);

  const generatedSlug = useMemo(() => slugify(name), [name]);

  useEffect(() => {
    if (!slug) {
      setSlug(generatedSlug);
    }
  }, [generatedSlug, slug]);

  useEffect(() => {
    async function loadFormData() {
      try {
        setLoading(true);
        setError("");

        const response = await getCategories();

        setCategories(normalizeList<Category>(response));
      } catch (loadError) {
        setError(
          getErrorMessage(
            loadError,
            "Unable to load product form. Please try again.",
          ),
        );
      } finally {
        setLoading(false);
      }
    }

    loadFormData();
  }, []);

  function updateImage(
    index: number,
    field: keyof ImageInput,
    value: string | boolean,
  ) {
    setImages((current) =>
      current.map((image, imageIndex) =>
        imageIndex === index
          ? { ...image, [field]: value }
          : field === "isPrimary" && value === true
            ? { ...image, isPrimary: false }
            : image,
      ),
    );
  }

  function addImageField() {
    setImages((current) => [
      ...current,
      {
        url: "",
        alt: "",
        isPrimary: current.length === 0,
      },
    ]);
  }

  function removeImageField(index: number) {
    setImages((current) => {
      const next = current.filter(
        (_, imageIndex) => imageIndex !== index,
      );

      if (
        next.length > 0 &&
        !next.some((image) => image.isPrimary)
      ) {
        next[0] = {
          ...next[0],
          isPrimary: true,
        };
      }

      return next;
    });
  }

  async function handleImageUpload(
    index: number,
    file: File | undefined,
  ) {
    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    setImages((current) =>
      current.map((image, imageIndex) =>
        imageIndex === index
          ? { ...image, uploading: true }
          : image,
      ),
    );

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<UploadResponse>(
        "/storage/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setImages((current) =>
        current.map((image, imageIndex) =>
          imageIndex === index
            ? {
                ...image,
                url: response.data.url,
                alt:
                  image.alt ||
                  file.name.replace(/\.[^/.]+$/, ""),
                uploading: false,
              }
            : image,
        ),
      );
    } catch (uploadError) {
      setImages((current) =>
        current.map((image, imageIndex) =>
          imageIndex === index
            ? { ...image, uploading: false }
            : image,
        ),
      );

      setError(
        getErrorMessage(
          uploadError,
          "Unable to upload image. Please try again.",
        ),
      );
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

    const uploading = images.some((image) => image.uploading);

    if (uploading) {
      setError("Please wait until all images finish uploading.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const productData: ProductCreateData = {
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

      const response = await productsApi.create(productData);
      const product = response.data;

      const validImages = images.filter(
        (image) => image.url.trim(),
      );

      if (validImages.length > 0) {
        await Promise.all(
          validImages.map((image, index) =>
            productsApi.addImage(product.id, {
              image_url: image.url.trim(),
              alt_text: image.alt.trim() || null,
              sort_order: index,
              is_primary: image.isPrimary,
            }),
          ),
        );
      }

      setSavedProductId(product.id);
    } catch (saveError) {
      setError(
        getErrorMessage(
          saveError,
          "Unable to save the product. Please check the details and try again.",
        ),
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-center rounded-2xl border border-border bg-paper p-12">
          <Loader2 className="h-6 w-6 animate-spin text-maroon" />
          <span className="ml-3 text-sm text-brown/70">
            Loading product form...
          </span>
        </div>
      </main>
    );
  }

  if (savedProductId) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-paper p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-700" />

          <h1 className="mt-5 font-serif text-3xl font-bold text-maroon">
            Product Saved as Draft
          </h1>

          <p className="mt-3 text-brown/65">
            Your product has been created successfully with its uploaded
            images and is currently saved as a draft.
          </p>

          <div className="mt-7 rounded-xl border border-border bg-cream p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-brown/50">
              Product ID
            </p>

            <p className="mt-1 break-all text-sm text-brown">
              {savedProductId}
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brown/50">
              Status
            </p>

            <span className="mt-1 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Draft
            </span>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/artisan/products"
              className="rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
            >
              Back to Products
            </Link>

            <Link
              href={`/artisan/products/${savedProductId}/edit`}
              className="rounded-lg border border-border px-6 py-3 font-semibold text-maroon"
            >
              Edit & Submit
            </Link>
          </div>
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
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Artisan Studio
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-brown/65">
            Create a handcrafted product. New products are saved as drafts
            until you submit them for admin approval.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-8 space-y-6">
          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Product Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Product Name *
                </label>

                <input
                  required
                  value={name}
                  onChange={(event) => {
                    const value = event.target.value;
                    setName(value);
                    setSlug(slugify(value));
                  }}
                  placeholder="e.g. Hand-Painted Madhubani Wall Art"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Category *
                </label>

                <select
                  required
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(event.target.value)
                  }
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  SKU *
                </label>

                <input
                  required
                  value={sku}
                  onChange={(event) =>
                    setSku(event.target.value)
                  }
                  placeholder="e.g. MADH-001"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Price (₹) *
                </label>

                <input
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="2400"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Compare-at Price (₹)
                </label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={compareAtPrice}
                  onChange={(event) =>
                    setCompareAtPrice(event.target.value)
                  }
                  placeholder="2800"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Product Slug *
                </label>

                <input
                  required
                  value={slug}
                  onChange={(event) =>
                    setSlug(slugify(event.target.value))
                  }
                  placeholder="hand-painted-madhubani-wall-art"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Material
                </label>

                <input
                  value={material}
                  onChange={(event) =>
                    setMaterial(event.target.value)
                  }
                  placeholder="Natural cotton, brass, clay..."
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Dimensions
                </label>

                <input
                  value={dimensions}
                  onChange={(event) =>
                    setDimensions(event.target.value)
                  }
                  placeholder="12 x 18 inches"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Craft Region
                </label>

                <input
                  value={craftRegion}
                  onChange={(event) =>
                    setCraftRegion(event.target.value)
                  }
                  placeholder="Madhubani, Bihar"
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-brown">
                  Description *
                </label>

                <textarea
                  required
                  rows={6}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe the product, materials, techniques and story behind it..."
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-maroon">
                Product Images
              </h2>

              <p className="mt-1 text-sm text-brown/60">
                Upload product images directly from your device. JPG, PNG
                and WEBP files up to 5 MB are supported.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-cream p-4"
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-brown">
                        Product Image
                      </label>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                          type="button"
                          onClick={() =>
                            fileInputRefs.current[index]?.click()
                          }
                          disabled={image.uploading}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-paper px-4 py-3 text-sm font-semibold text-maroon disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {image.uploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <ImagePlus className="h-4 w-4" />
                              Choose Image
                            </>
                          )}
                        </button>

                        <input
                          ref={(element) => {
                            fileInputRefs.current[index] = element;
                          }}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            void handleImageUpload(index, file);
                            event.target.value = "";
                          }}
                        />

                        {image.url && !image.uploading && (
                          <span className="text-sm font-medium text-green-700">
                            Image uploaded successfully
                          </span>
                        )}
                      </div>

                      {image.url && (
                        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-paper">
                          <img
                            src={image.url}
                            alt={image.alt || "Product image"}
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeImageField(index)
                      }
                      disabled={
                        images.length === 1 || image.uploading
                      }
                      className="self-end rounded-lg border border-border p-3 text-brown disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <input
                      value={image.alt}
                      onChange={(event) =>
                        updateImage(
                          index,
                          "alt",
                          event.target.value,
                        )
                      }
                      placeholder="Image alt text"
                      className="rounded-lg border border-border bg-paper px-4 py-3 outline-none focus:border-gold"
                    />

                    <label className="flex items-center gap-2 text-sm font-medium text-brown">
                      <input
                        type="checkbox"
                        checked={image.isPrimary}
                        onChange={(event) =>
                          updateImage(
                            index,
                            "isPrimary",
                            event.target.checked,
                          )
                        }
                        className="h-4 w-4 accent-maroon"
                      />

                      Primary image
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addImageField}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-maroon"
            >
              <Plus className="h-4 w-4" />
              Add Another Image
            </button>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed border-border p-4">
              <ImagePlus className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

              <p className="text-sm text-brown/60">
                At least one product image is required before submitting
                the product for admin approval.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Approval Workflow
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Step 1
                </p>
                <p className="mt-2 font-semibold text-maroon">
                  Save Draft
                </p>
                <p className="mt-1 text-sm text-brown/60">
                  Create and edit your product.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Step 2
                </p>
                <p className="mt-2 font-semibold text-maroon">
                  Submit
                </p>
                <p className="mt-1 text-sm text-brown/60">
                  Send the product for moderation.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  Step 3
                </p>
                <p className="mt-2 font-semibold text-maroon">
                  Go Live
                </p>
                <p className="mt-1 text-sm text-brown/60">
                  Admin approval makes it visible.
                </p>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Product...
              </>
            ) : (
              "Save Product as Draft"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
