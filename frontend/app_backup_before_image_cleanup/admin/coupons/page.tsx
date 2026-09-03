"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  TicketPercent,
  X,
} from "lucide-react";

type Coupon = {
  id: string;
  code: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  expires_at: string;
  active: boolean;
};

const initialCoupons: Coupon[] = [];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    description: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: "",
    min_order_amount: "",
    max_discount: "",
    usage_limit: "",
    expires_at: "",
  });

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const query = search.toLowerCase();

      const matchesSearch =
        coupon.code.toLowerCase().includes(query) ||
        coupon.description.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && coupon.active) ||
        (filter === "inactive" && !coupon.active);

      return matchesSearch && matchesFilter;
    });
  }, [coupons, search, filter]);

  const activeCount = coupons.filter((coupon) => coupon.active).length;

  const usedCount = coupons.reduce(
    (total, coupon) => total + coupon.used_count,
    0
  );

  const resetForm = () => {
    setForm({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: "",
      min_order_amount: "",
      max_discount: "",
      usage_limit: "",
      expires_at: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const saveCoupon = () => {
    if (!form.code.trim() || !form.discount_value) return;

    const couponData = {
      code: form.code.trim().toUpperCase(),
      description: form.description,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_amount: Number(form.min_order_amount) || 0,
      max_discount: form.max_discount
        ? Number(form.max_discount)
        : null,
      usage_limit: form.usage_limit
        ? Number(form.usage_limit)
        : null,
      expires_at: form.expires_at,
    };

    if (editingId) {
      setCoupons((current) =>
        current.map((coupon) =>
          coupon.id === editingId
            ? {
                ...coupon,
                ...couponData,
              }
            : coupon
        )
      );
    } else {
      setCoupons((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          ...couponData,
          used_count: 0,
          active: true,
        },
      ]);
    }

    resetForm();
  };

  const editCoupon = (coupon: Coupon) => {
    setEditingId(coupon.id);

    setForm({
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: String(coupon.discount_value),
      min_order_amount: String(coupon.min_order_amount),
      max_discount:
        coupon.max_discount !== null
          ? String(coupon.max_discount)
          : "",
      usage_limit:
        coupon.usage_limit !== null
          ? String(coupon.usage_limit)
          : "",
      expires_at: coupon.expires_at,
    });

    setShowForm(true);
  };

  const deleteCoupon = (id: string) => {
    if (!window.confirm("Delete this coupon?")) return;

    setCoupons((current) =>
      current.filter((coupon) => coupon.id !== id)
    );
  };

  const toggleCoupon = (id: string) => {
    setCoupons((current) =>
      current.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              active: !coupon.active,
            }
          : coupon
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
              Coupons
            </h1>

            <p className="mt-2 text-[#765f45]">
              Create and manage promotional offers for customers.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                code: "",
                description: "",
                discount_type: "percentage",
                discount_value: "",
                min_order_amount: "",
                max_discount: "",
                usage_limit: "",
                expires_at: "",
              });
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white hover:bg-[#4f1822]"
          >
            <Plus size={18} />
            Create Coupon
          </button>

        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Coupons
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {coupons.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Active Coupons
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Uses
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {usedCount}
            </p>
          </div>

        </section>

        {showForm && (
          <section className="mb-6 rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold text-[#641f2b]">
                {editingId ? "Edit Coupon" : "Create Coupon"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-[#641f2b] hover:bg-[#f5eddd]"
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
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="DIWALI20"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 uppercase outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Discount Type
                </label>

                <select
                  value={form.discount_type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount_type:
                        e.target.value as
                          | "percentage"
                          | "fixed",
                    })
                  }
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
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
                  value={form.discount_value}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discount_value: e.target.value,
                    })
                  }
                  placeholder={
                    form.discount_type === "percentage"
                      ? "20"
                      : "500"
                  }
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Minimum Order
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.min_order_amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      min_order_amount: e.target.value,
                    })
                  }
                  placeholder="1000"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Maximum Discount
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.max_discount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      max_discount: e.target.value,
                    })
                  }
                  placeholder="500"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Usage Limit
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.usage_limit}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      usage_limit: e.target.value,
                    })
                  }
                  placeholder="100"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Expiry Date
                </label>

                <input
                  type="datetime-local"
                  value={form.expires_at}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expires_at: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#765f45]">
                  Description
                </label>

                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Festival discount for handcrafted products"
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 outline-none focus:border-[#641f2b]"
                />
              </div>

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={resetForm}
                className="rounded-lg border border-[#d8c8a8] px-5 py-3 font-semibold text-[#641f2b]"
              >
                Cancel
              </button>

              <button
                onClick={saveCoupon}
                className="rounded-lg bg-[#641f2b] px-5 py-3 font-semibold text-white"
              >
                {editingId ? "Update Coupon" : "Create Coupon"}
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
                placeholder="Search coupon code..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredCoupons.map((coupon) => (

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
                            {coupon.description || "No description"}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      {coupon.discount_type === "percentage"
                        ? `${coupon.discount_value}%`
                        : `?${coupon.discount_value.toLocaleString("en-IN")}`}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      ?{coupon.min_order_amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {coupon.used_count}
                      {coupon.usage_limit !== null
                        ? ` / ${coupon.usage_limit}`
                        : " / 8"}
                    </td>

                    <td className="px-3 py-4 text-sm text-[#765f45]">
                      {coupon.expires_at
                        ? new Date(
                            coupon.expires_at
                          ).toLocaleDateString("en-IN")
                        : "No expiry"}
                    </td>

                    <td className="px-3 py-4">

                      <button
                        onClick={() => toggleCoupon(coupon.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          coupon.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {coupon.active
                          ? "Active"
                          : "Inactive"}
                      </button>

                    </td>

                    <td className="px-3 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => editCoupon(coupon)}
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                          title="Edit coupon"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            deleteCoupon(coupon.id)
                          }
                          className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                          title="Delete coupon"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

                {filteredCoupons.length === 0 && (
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
                        Create your first promotional coupon.
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
