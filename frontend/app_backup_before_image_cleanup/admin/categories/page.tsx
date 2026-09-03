"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FolderTree,
  X,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: number;
  active: boolean;
};

const initialCategories: Category[] = [];

export default function AdminCategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const filtered = useMemo(() => {
    return categories.filter((category) => {
      const q = search.toLowerCase();

      const matchesSearch =
        category.name.toLowerCase().includes(q) ||
        category.slug.toLowerCase().includes(q);

      const matchesStatus =
        status === "all" ||
        (status === "active" && category.active) ||
        (status === "inactive" && !category.active);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const saveCategory = () => {
    if (!form.name.trim()) return;

    if (editingId) {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name: form.name,
                slug: form.slug,
                description: form.description,
              }
            : category
        )
      );
    } else {
      setCategories((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          name: form.name,
          slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
          description: form.description,
          products: 0,
          active: true,
        },
      ]);
    }

    resetForm();
  };

  const editCategory = (category: Category) => {
    setEditingId(category.id);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });

    setShowForm(true);
  };

  const deleteCategory = (id: string) => {
    if (!window.confirm("Delete this category?")) return;

    setCategories((current) =>
      current.filter((category) => category.id !== id)
    );
  };

  const toggleActive = (id: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, active: !category.active }
          : category
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
              Kalakriti Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
              Categories
            </h1>

            <p className="mt-2 text-[#765f45]">
              Organize handcrafted products by craft and tradition.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                slug: "",
                description: "",
              });
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white hover:bg-[#4f1822]"
          >
            <Plus size={18} />
            Add Category
          </button>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Categories
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {categories.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Active
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {categories.filter((c) => c.active).length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Products Assigned
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {categories.reduce(
                (total, category) => total + category.products,
                0
              )}
            </p>
          </div>

        </section>

        {showForm && (
          <section className="mb-6 rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#641f2b]">
                {editingId ? "Edit Category" : "Add Category"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-[#641f2b] hover:bg-[#f5eddd]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Category Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Madhubani Painting"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slug: e.target.value,
                    })
                  }
                  placeholder="madhubani-painting"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe this craft category..."
                  className="w-full resize-none rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="rounded-lg border border-[#d8c8a8] px-5 py-3 font-semibold text-[#641f2b]"
              >
                Cancel
              </button>

              <button
                onClick={saveCategory}
                className="rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white"
              >
                {editingId ? "Update Category" : "Create Category"}
              </button>
            </div>

          </section>
        )}

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">

            <div className="relative w-full md:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Category</th>
                  <th className="px-3 py-4">Slug</th>
                  <th className="px-3 py-4">Products</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-[#eadfc9]"
                  >

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eadfc9]">
                          <FolderTree
                            size={18}
                            className="text-[#641f2b]"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-[#641f2b]">
                            {category.name}
                          </p>

                          <p className="text-xs text-[#765f45]">
                            {category.description || "No description"}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-3 py-4 text-sm text-[#765f45]">
                      {category.slug}
                    </td>

                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      {category.products}
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => toggleActive(category.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          category.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {category.active ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => editCategory(category)}
                          title="Edit category"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteCategory(category.id)}
                          title="Delete category"
                          className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center"
                    >
                      <FolderTree
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No categories found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Categories will be loaded from the API during the final connection phase.
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
