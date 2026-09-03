"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FolderTree,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import api from "@/lib/api/client";
import { productsApi, type Product } from "@/lib/api/products";

type Category = {
  id: string;
  parent_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
};

type CategoryForm = {
  name: string;
  slug: string;
  description: string;
  parent_id: string;
  is_active: boolean;
};

const emptyForm: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  parent_id: "",
  is_active: true,
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeCategories(data: unknown): Category[] {
  if (Array.isArray(data)) return data as Category[];

  if (
    data &&
    typeof data === "object" &&
    "items" in data &&
    Array.isArray((data as { items: unknown }).items)
  ) {
    return (data as { items: Category[] }).items;
  }

  return [];
}

function normalizeProducts(data: unknown): Product[] {
  if (Array.isArray(data)) return data as Product[];

  if (
    data &&
    typeof data === "object" &&
    "items" in data &&
    Array.isArray((data as { items: unknown }).items)
  ) {
    return (data as { items: Product[] }).items;
  }

  return [];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [categoriesResponse, productsResponse] = await Promise.all([
        api.get("/categories", {
          params: { active_only: false },
        }),
        productsApi.list({
          limit: 1000,
        }),
      ]);

      setCategories(normalizeCategories(categoriesResponse.data));
      setProducts(normalizeProducts(productsResponse.data));
    } catch (err) {
      console.error("Admin categories loading error:", err);
      setError("Unable to load categories right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  const productCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const product of products) {
      if (!product.category_id) continue;

      counts.set(
        product.category_id,
        (counts.get(product.category_id) ?? 0) + 1,
      );
    }

    return counts;
  }, [products]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query);

      const matchesStatus =
        status === "all" ||
        (status === "active" && category.is_active) ||
        (status === "inactive" && !category.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  const totalProductsAssigned = useMemo(
    () =>
      categories.reduce(
        (total, category) =>
          total + (productCounts.get(category.id) ?? 0),
        0,
      ),
    [categories, productCounts],
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    setSuccess("");
    setError("");
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const editCategory = (category: Category) => {
    setSuccess("");
    setError("");
    setEditingId(category.id);

    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      parent_id: category.parent_id ?? "",
      is_active: category.is_active,
    });

    setShowForm(true);
  };

  const saveCategory = async () => {
    const name = form.name.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const slug = form.slug.trim() || makeSlug(name);

    if (!slug) {
      setError("A valid category slug is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        name,
        slug,
        description: form.description.trim() || null,
        parent_id: form.parent_id || null,
        is_active: form.is_active,
      };

      if (editingId) {
        const response = await api.patch<Category>(
          `/categories/${editingId}`,
          payload,
        );

        setCategories((current) =>
          current.map((category) =>
            category.id === editingId ? response.data : category,
          ),
        );

        setSuccess("Category updated successfully.");
      } else {
        const response = await api.post<Category>(
          "/categories",
          payload,
        );

        setCategories((current) => [...current, response.data]);
        setSuccess("Category created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Category save error:", err);
      setError("Unable to save this category. Please check the values and try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (category: Category) => {
    const assignedProducts = productCounts.get(category.id) ?? 0;

    if (assignedProducts > 0) {
      setError(
        `"${category.name}" has ${assignedProducts} assigned product${
          assignedProducts === 1 ? "" : "s"
        }. Reassign those products before deleting the category.`,
      );
      return;
    }

    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(category.id);
      setError("");
      setSuccess("");

      await api.delete(`/categories/${category.id}`);

      setCategories((current) =>
        current.filter((item) => item.id !== category.id),
      );

      setSuccess("Category deleted successfully.");
    } catch (err) {
      console.error("Category delete error:", err);
      setError("Unable to delete this category.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (category: Category) => {
    try {
      setError("");
      setSuccess("");

      const response = await api.patch<Category>(
        `/categories/${category.id}`,
        {
          is_active: !category.is_active,
        },
      );

      setCategories((current) =>
        current.map((item) =>
          item.id === category.id ? response.data : item,
        ),
      );

      setSuccess(
        `${category.name} is now ${
          response.data.is_active ? "active" : "inactive"
        }.`,
      );
    } catch (err) {
      console.error("Category status update error:", err);
      setError("Unable to update category status.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 text-[#3f3028] md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
              Kalakriti Administration
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold text-[#641f2b]">
              Categories
            </h1>

            <p className="mt-2 text-[#765f45]">
              Organize handcrafted products by craft and tradition.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white hover:bg-[#4f1822]"
          >
            <Plus size={18} />
            Add Category
          </button>
        </header>

        {error ? (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        {success ? (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{success}</span>
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Total Categories</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : categories.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Active</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading
                ? "—"
                : categories.filter((category) => category.is_active).length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">Products Assigned</p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : totalProductsAssigned}
            </p>
          </div>
        </section>

        {showForm ? (
          <section className="mb-6 rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#641f2b]">
                  {editingId ? "Edit Category" : "Add Category"}
                </h2>
                <p className="mt-1 text-sm text-[#765f45]">
                  Changes are saved directly to the marketplace database.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg p-2 text-[#641f2b] hover:bg-[#f5eddd] disabled:opacity-50"
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
                  onChange={(event) => {
                    const name = event.target.value;

                    setForm((current) => ({
                      ...current,
                      name,
                      slug:
                        current.slug === makeSlug(current.name) ||
                        !current.slug
                          ? makeSlug(name)
                          : current.slug,
                    }));
                  }}
                  placeholder="e.g. Madhubani Painting"
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Slug
                </label>

                <input
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      slug: makeSlug(event.target.value),
                    }))
                  }
                  placeholder="madhubani-painting"
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Parent Category
                </label>

                <select
                  value={form.parent_id}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      parent_id: event.target.value,
                    }))
                  }
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                >
                  <option value="">No parent category</option>

                  {categories
                    .filter((category) => category.id !== editingId)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Describe this craft category..."
                  disabled={saving}
                  className="w-full resize-none rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#765f45]">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      is_active: event.target.checked,
                    }))
                  }
                  disabled={saving}
                  className="h-4 w-4 accent-[#641f2b]"
                />
                Active category
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-lg border border-[#d8c8a8] px-5 py-3 font-semibold text-[#641f2b] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void saveCategory()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {editingId ? "Update Category" : "Create Category"}
              </button>
            </div>
          </section>
        ) : null}

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search categories..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#641f2b]" />
                      <p className="mt-4 text-sm text-[#765f45]">
                        Loading categories...
                      </p>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <FolderTree
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No categories found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        {search || status !== "all"
                          ? "Try changing your search or status filter."
                          : "Create the first marketplace category."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((category) => {
                    const assignedProducts =
                      productCounts.get(category.id) ?? 0;

                    return (
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
                          {assignedProducts}
                        </td>

                        <td className="px-3 py-4">
                          <button
                            type="button"
                            onClick={() => void toggleActive(category)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              category.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {category.is_active ? "Active" : "Inactive"}
                          </button>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => editCategory(category)}
                              title="Edit category"
                              className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() => void deleteCategory(category)}
                              disabled={deletingId === category.id}
                              title="Delete category"
                              className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                            >
                              {deletingId === category.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
