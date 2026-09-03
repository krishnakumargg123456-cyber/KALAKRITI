"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function EditArtisanProductPage() {
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
            Changes Saved
          </h1>
          <p className="mt-3 text-brown/65">
            Your product information has been updated successfully.
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
          Edit Product
        </h1>

        <form
          onSubmit={submit}
          className="mt-8 rounded-xl border border-border bg-paper p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-brown">
                Product Name
              </span>
              <input
                required
                defaultValue="Hand-Painted Madhubani Wall Art"
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-brown">
                Category
              </span>
              <select
                defaultValue="Paintings"
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              >
                <option>Paintings</option>
                <option>Pottery</option>
                <option>Textiles</option>
                <option>Jewellery</option>
                <option>Wood Craft</option>
              </select>
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-brown">
                Price
              </span>
              <input
                type="number"
                defaultValue="2400"
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-brown">
                Stock
              </span>
              <input
                type="number"
                defaultValue="8"
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-medium text-brown">
                SKU
              </span>
              <input
                defaultValue="MITH-001"
                className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-brown">
              Description
            </span>
            <textarea
              rows={7}
              defaultValue="Hand-painted traditional Madhubani artwork created using natural-inspired motifs and detailed folk techniques."
              className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
            />
          </label>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-maroon px-6 py-3 font-semibold text-cream"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}