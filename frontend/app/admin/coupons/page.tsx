"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  TicketPercent,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import api from "@/lib/api/client";

type Coupon = {
  id: number;
  code: string;
  description: string | null;
  discount_type: "percentage" | "fixed";
  discount_value: string | number;
  minimum_order_amount: string | number;
  maximum_discount_amount: string | number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
};

type CouponForm = {
  code: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  minimum_order_amount: string;
  maximum_discount_amount: string;
  usage_limit: string;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
};

const emptyForm: CouponForm = {
  code: "",
  description: "",
  discount_type: "percentage",
  discount_value: "",
  minimum_order_amount: "0",
  maximum_discount_amount: "",
  usage_limit: "",
  starts_at: "",
  expires_at: "",
  is_active: true,
};

function toNumber(value: string | number | null | undefined) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function formatCurrency(value: string | number | null | undefined) {
  return `₹${toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string | null) {
  if (!value) return "No expiry";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toLocalDateTime(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);

  return local.toISOString().slice(0, 16);
}

function toIsoDateTime(value: string) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString();
}

function normalizeCoupons(data: unknown): Coupon[] {
  if (Array.isArray(data)) {
    return data as Coupon[];
  }

  if (
    data &&
    typeof data === "object" &&
    "items" in data &&
    Array.isArray((data as { items: unknown }).items)
  ) {
    return (data as { items: Coupon[] }).items;
  }

  return [];
}

function getApiErrorMessage(error: unknown, fallback: string) {
  if (
    error &&
    typeof error === "object" &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            detail?: unknown;
          };
        };
      }
    ).response;

    const detail = response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (
            item &&
            typeof item === "object" &&
            "msg" in item &&
            typeof (item as { msg?: unknown }).msg === "string"
          ) {
            return (item as { msg: string }).msg;
          }

          return String(item);
        })
        .join(", ");
    }
  }

  return fallback;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<CouponForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCoupons() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/coupons");

      setCoupons(normalizeCoupons(response.data));
    } catch (err) {
      console.error("Coupons loading error:", err);
      setError(
        getApiErrorMessage(
          err,
          "Unable to load coupons. Please make sure you are signed in as an administrator.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCoupons();
  }, []);

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();

    return coupons.filter((coupon) => {
      const matchesSearch =
        !query ||
        coupon.code.toLowerCase().includes(query) ||
        (coupon.description ?? "").toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && coupon.is_active) ||
        (filter === "inactive" && !coupon.is_active);

      return matchesSearch && matchesFilter;
    });
  }, [coupons, search, filter]);

  const activeCount = useMemo(
    () => coupons.filter((coupon) => coupon.is_active).length,
    [coupons],
  );

  const usedCount = useMemo(
    () =>
      coupons.reduce(
        (total, coupon) => total + coupon.used_count,
        0,
      ),
    [coupons],
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    setError("");
    setSuccess("");
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const editCoupon = (coupon: Coupon) => {
    setError("");
    setSuccess("");
    setEditingId(coupon.id);

    setForm({
      code: coupon.code,
      description: coupon.description ?? "",
      discount_type: coupon.discount_type,
      discount_value: String(coupon.discount_value),
      minimum_order_amount: String(coupon.minimum_order_amount),
      maximum_discount_amount:
        coupon.maximum_discount_amount !== null
          ? String(coupon.maximum_discount_amount)
          : "",
      usage_limit:
        coupon.usage_limit !== null
          ? String(coupon.usage_limit)
          : "",
      starts_at: toLocalDateTime(coupon.starts_at),
      expires_at: toLocalDateTime(coupon.expires_at),
      is_active: coupon.is_active,
    });

    setShowForm(true);
  };

  const validateForm = () => {
    const code = form.code.trim();

    if (code.length < 3) {
      return "Coupon code must contain at least 3 characters.";
    }

    const discount = Number(form.discount_value);

    if (!Number.isFinite(discount) || discount <= 0) {
      return "Discount value must be greater than 0.";
    }

    if (
      form.discount_type === "percentage" &&
      discount > 100
    ) {
      return "Percentage discount cannot exceed 100%.";
    }

    const minimum = Number(form.minimum_order_amount || 0);

    if (!Number.isFinite(minimum) || minimum < 0) {
      return "Minimum order amount cannot be negative.";
    }

    if (form.maximum_discount_amount) {
      const maximum = Number(form.maximum_discount_amount);

      if (!Number.isFinite(maximum) || maximum <= 0) {
        return "Maximum discount must be greater than 0.";
      }

      if (form.discount_type === "fixed") {
        return "Maximum discount is only valid for percentage coupons.";
      }
    }

    if (form.usage_limit) {
      const limit = Number(form.usage_limit);

      if (!Number.isInteger(limit) || limit <= 0) {
        return "Usage limit must be a positive whole number.";
      }
    }

    if (form.starts_at && form.expires_at) {
      const starts = new Date(form.starts_at).getTime();
      const expires = new Date(form.expires_at).getTime();

      if (
        !Number.isNaN(starts) &&
        !Number.isNaN(expires) &&
        expires <= starts
      ) {
        return "Expiry date must be later than start date.";
      }
    }

    return null;
  };

  const saveCoupon = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId !== null) {
        const payload = {
          description: form.description.trim() || null,
          discount_type: form.discount_type,
          discount_value: Number(form.discount_value),
          minimum_order_amount: Number(
            form.minimum_order_amount || 0,
          ),
          maximum_discount_amount:
            form.discount_type === "percentage" &&
            form.maximum_discount_amount
              ? Number(form.maximum_discount_amount)
              : null,
          usage_limit: form.usage_limit
            ? Number(form.usage_limit)
            : null,
          starts_at: toIsoDateTime(form.starts_at),
          expires_at: toIsoDateTime(form.expires_at),
          is_active: form.is_active,
        };

        const response = await api.patch<Coupon>(
          `/coupons/${editingId}`,
          payload,
        );

        setCoupons((current) =>
          current.map((coupon) =>
            coupon.id === editingId ? response.data : coupon,
          ),
        );

        setSuccess("Coupon updated successfully.");
      } else {
        const payload = {
          code: form.code.trim().toUpperCase(),
          description: form.description.trim() || null,
          discount_type: form.discount_type,
          discount_value: Number(form.discount_value),
          minimum_order_amount: Number(
            form.minimum_order_amount || 0,
          ),
          maximum_discount_amount:
            form.discount_type === "percentage" &&
            form.maximum_discount_amount
              ? Number(form.maximum_discount_amount)
              : null,
          usage_limit: form.usage_limit
            ? Number(form.usage_limit)
            : null,
          starts_at: toIsoDateTime(form.starts_at),
          expires_at: toIsoDateTime(form.expires_at),
          is_active: form.is_active,
        };

        const response = await api.post<Coupon>(
          "/coupons",
          payload,
        );

        setCoupons((current) => [
          response.data,
          ...current,
        ]);

        setSuccess("Coupon created successfully.");
      }

      resetForm();
    } catch (err) {
      console.error("Coupon save error:", err);

      setError(
        getApiErrorMessage(
          err,
          "Unable to save this coupon. Please check the values and try again.",
        ),
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteCoupon = async (coupon: Coupon) => {
    if (
      !window.confirm(
        `Delete coupon "${coupon.code}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      setDeletingId(coupon.id);
      setError("");
      setSuccess("");

      await api.delete(`/coupons/${coupon.id}`);

      setCoupons((current) =>
        current.filter((item) => item.id !== coupon.id),
      );

      setSuccess("Coupon deleted successfully.");
    } catch (err) {
      console.error("Coupon delete error:", err);

      setError(
        getApiErrorMessage(
          err,
          "Unable to delete this coupon.",
        ),
      );
    } finally {
      setDeletingId(null);
    }
  };

  const toggleCoupon = async (coupon: Coupon) => {
    try {
      setError("");
      setSuccess("");

      const response = await api.patch<Coupon>(
        `/coupons/${coupon.id}`,
        {
          is_active: !coupon.is_active,
        },
      );

      setCoupons((current) =>
        current.map((item) =>
          item.id === coupon.id ? response.data : item,
        ),
      );

      setSuccess(
        `${coupon.code} is now ${
          response.data.is_active ? "active" : "inactive"
        }.`,
      );
    } catch (err) {
      console.error("Coupon status update error:", err);

      setError(
        getApiErrorMessage(
          err,
          "Unable to update coupon status.",
        ),
      );
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
              Coupons
            </h1>

            <p className="mt-2 text-[#765f45]">
              Create and manage promotional offers for customers.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white hover:bg-[#4f1822]"
          >
            <Plus size={18} />
            Create Coupon
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
            <p className="text-sm text-[#765f45]">
              Total Coupons
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : coupons.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Active Coupons
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Uses
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {loading ? "—" : usedCount}
            </p>
          </div>
        </section>

        {showForm ? (
          <section className="mb-6 rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#641f2b]">
                  {editingId !== null
                    ? "Edit Coupon"
                    : "Create Coupon"}
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

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Coupon Code
                </label>

                <input
                  value={form.code}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      code: event.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="DIWALI20"
                  disabled={saving || editingId !== null}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 uppercase outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Discount Type
                </label>

                <select
                  value={form.discount_type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discount_type:
                        event.target.value as
                          | "percentage"
                          | "fixed",
                      maximum_discount_amount:
                        event.target.value === "fixed"
                          ? ""
                          : current.maximum_discount_amount,
                    }))
                  }
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                >
                  <option value="percentage">
                    Percentage
                  </option>
                  <option value="fixed">
                    Fixed Amount
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Discount Value
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.discount_value}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      discount_value: event.target.value,
                    }))
                  }
                  placeholder={
                    form.discount_type === "percentage"
                      ? "20"
                      : "500"
                  }
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Minimum Order Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.minimum_order_amount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      minimum_order_amount:
                        event.target.value,
                    }))
                  }
                  placeholder="1000"
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Maximum Discount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.maximum_discount_amount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      maximum_discount_amount:
                        event.target.value,
                    }))
                  }
                  disabled={
                    saving || form.discount_type === "fixed"
                  }
                  placeholder="500"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />

                {form.discount_type === "fixed" ? (
                  <p className="mt-1 text-xs text-[#8b765c]">
                    Not applicable to fixed discounts.
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Usage Limit
                </label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.usage_limit}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      usage_limit: event.target.value,
                    }))
                  }
                  placeholder="100"
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />

                <p className="mt-1 text-xs text-[#8b765c]">
                  Leave empty for unlimited usage.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Starts At
                </label>

                <input
                  type="datetime-local"
                  value={form.starts_at}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      starts_at: event.target.value,
                    }))
                  }
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Expires At
                </label>

                <input
                  type="datetime-local"
                  value={form.expires_at}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      expires_at: event.target.value,
                    }))
                  }
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Description
                </label>

                <input
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Festival discount for handcrafted products"
                  disabled={saving}
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b] disabled:bg-[#eee7d8]"
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
                Active coupon
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
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
                onClick={() => void saveCoupon()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}

                {editingId !== null
                  ? "Update Coupon"
                  : "Create Coupon"}
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
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search coupon code..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b]"
            >
              <option value="all">All Coupons</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Coupon</th>
                  <th className="px-3 py-4">Discount</th>
                  <th className="px-3 py-4">Minimum Order</th>
                  <th className="px-3 py-4">Usage</th>
                  <th className="px-3 py-4">Expiry</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#641f2b]" />

                      <p className="mt-4 text-sm text-[#765f45]">
                        Loading coupons...
                      </p>
                    </td>
                  </tr>
                ) : filteredCoupons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <TicketPercent
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No coupons found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        {search || filter !== "all"
                          ? "Try changing your search or status filter."
                          : "Create your first promotional coupon."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCoupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="border-b border-[#eadfc9]"
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eadfc9]">
                            <TicketPercent
                              size={18}
                              className="text-[#641f2b]"
                            />
                          </div>

                          <div>
                            <p className="font-bold text-[#641f2b]">
                              {coupon.code}
                            </p>

                            <p className="text-xs text-[#765f45]">
                              {coupon.description ||
                                "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 font-semibold text-[#641f2b]">
                        {coupon.discount_type ===
                        "percentage"
                          ? `${toNumber(
                              coupon.discount_value,
                            )}%`
                          : formatCurrency(
                              coupon.discount_value,
                            )}
                      </td>

                      <td className="px-3 py-4 text-[#765f45]">
                        {formatCurrency(
                          coupon.minimum_order_amount,
                        )}
                      </td>

                      <td className="px-3 py-4 text-[#765f45]">
                        {coupon.used_count}

                        {coupon.usage_limit !== null
                          ? ` / ${coupon.usage_limit}`
                          : " / Unlimited"}
                      </td>

                      <td className="px-3 py-4 text-sm text-[#765f45]">
                        {formatDate(coupon.expires_at)}
                      </td>

                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            void toggleCoupon(coupon)
                          }
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            coupon.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {coupon.is_active
                            ? "Active"
                            : "Inactive"}
                        </button>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              editCoupon(coupon)
                            }
                            className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                            title="Edit coupon"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              void deleteCoupon(coupon)
                            }
                            disabled={
                              deletingId === coupon.id
                            }
                            className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                            title="Delete coupon"
                          >
                            {deletingId === coupon.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
