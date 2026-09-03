"use client";

import Link from "next/link";
import { Edit3, Eye, Plus, Package, IndianRupee } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Hand-Painted Madhubani Wall Art",
    category: "Paintings",
    price: 2400,
    stock: 8,
    status: "Published",
  },
  {
    id: "2",
    name: "Traditional Blue Pottery Vase",
    category: "Pottery",
    price: 1850,
    stock: 12,
    status: "Published",
  },
  {
    id: "3",
    name: "Handwoven Cotton Dupatta",
    category: "Textiles",
    price: 1600,
    stock: 0,
    status: "Out of Stock",
  },
];

export default function ArtisanProductsPage() {
  return (
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
              Manage your handcrafted products and inventory.
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

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-paper p-5">
            <Package className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm text-brown/60">Total Products</p>
            <p className="mt-1 text-2xl font-bold text-maroon">24</p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-5">
            <Eye className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm text-brown/60">Published</p>
            <p className="mt-1 text-2xl font-bold text-maroon">21</p>
          </div>

          <div className="rounded-xl border border-border bg-paper p-5">
            <IndianRupee className="h-5 w-5 text-gold" />
            <p className="mt-3 text-sm text-brown/60">Total Sales</p>
            <p className="mt-1 text-2xl font-bold text-maroon">₹84,500</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-paper">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
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
                    Stock
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
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-medium text-maroon">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-brown/70">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 text-sm text-brown">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-4 text-sm text-brown">
                      {product.stock}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock === 0
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/artisan/products/${product.id}/edit`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-maroon hover:text-gold"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}