"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ImagePlus } from "lucide-react";

export default function NewArtisanProductPage() {
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  if (saved) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-paper p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-700" />
          <h1 className="mt-5 font-serif text-3xl font-bold text-maroon">
            Product Saved
          </h1>
          <p className="mt-3 text-brown/65">
            Your product has been saved and is ready for review.
          </p>

          <Link
            href="/artisan/products"
            className="mt-7 inline-block rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
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

        <h1 className="mt-6 font-serif text-3xl font-bold text-maroon">
          Add New Product
        </h1>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Product Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <input
                required
                placeholder="Product name"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold md:col-span-2"
              />

              <select
                required
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              >
                <option value="">Select category</option>
                <option>Paintings</option>
                <option>Pottery</option>
                <option>Textiles</option>
                <option>Jewellery</option>
                <option>Wood Craft</option>
                <option>Metal Craft</option>
              </select>

              <input
                required
                type="number"
                min="1"
                placeholder="Price (₹)"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />

              <input
                required
                type="number"
                min="0"
                placeholder="Stock quantity"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />

              <input
                placeholder="SKU"
                className="rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </div>

            <textarea
              required
              rows={6}
              placeholder="Describe the product, materials, techniques and story behind it..."
              className="mt-5 w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
            />
          </section>

          <section className="rounded-xl border border-border bg-paper p-6">
            <h2 className="font-serif text-xl font-bold text-maroon">
              Product Images
            </h2>

            <label className="mt-5 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-cream p-6 text-center">
              <ImagePlus className="h-10 w-10 text-gold" />
              <span className="mt-3 font-semibold text-maroon">
                Upload product images
              </span>
              <span className="mt-1 text-sm text-brown/60">
                JPG, PNG or WebP
              </span>
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
          </section>

          <button
            type="submit"
            className="w-full rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            Save Product
          </button>
        </form>
      </div>
    </main>
  );
}