"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Star,
  Package,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  artisan: string;
  price: number;
  stock: number;
  featured: boolean;
  active: boolean;
};

const initialProducts: Product[] = [];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.artisan.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && product.active) ||
        (filter === "inactive" && !product.active) ||
        (filter === "featured" && product.featured) ||
        (filter === "low-stock" && product.stock <= 5);

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const deleteProduct = (id: string) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  const toggleFeatured = (id: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, featured: !product.featured }
          : product
      )
    );
  };

  const toggleActive = (id: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, active: !product.active }
          : product
      )
    );
  };

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
              Manage handcrafted products across the marketplace.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white transition hover:bg-[#4f1721]"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {products.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Active</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {products.filter((p) => p.active).length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Featured</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {products.filter((p) => p.featured).length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Low Stock</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {products.filter((p) => p.stock <= 5).length}
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
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products, artisans..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none"
            >
              <option value="all">All Products</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="low-stock">Low Stock</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Product</th>
                  <th className="px-3 py-4">Category</th>
                  <th className="px-3 py-4">Artisan</th>
                  <th className="px-3 py-4">Price</th>
                  <th className="px-3 py-4">Stock</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#eadfc9]"
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eadfc9]">
                          <Package
                            size={20}
                            className="text-[#641f2b]"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-[#641f2b]">
                            {product.name}
                          </p>

                          {product.featured && (
                            <span className="mt-1 inline-flex items-center gap-1 text-xs text-[#a27b2d]">
                              <Star size={12} fill="currentColor" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {product.category}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {product.artisan}
                    </td>

                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      ?{product.price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={
                          product.stock <= 5
                            ? "font-semibold text-red-700"
                            : "text-[#765f45]"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {product.active ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleFeatured(product.id)}
                          title="Toggle featured"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#a27b2d] hover:bg-[#f5eddd]"
                        >
                          <Star
                            size={17}
                            fill={product.featured ? "currentColor" : "none"}
                          />
                        </button>

                        <button
                          title="View"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => deleteProduct(product.id)}
                          title="Delete"
                          className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <Package
                        size={40}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No products found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Products will appear here after the API connection.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
