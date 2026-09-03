"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Search,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

type InventoryItem = {
  id: string;
  product_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  reserved_quantity: number;
  low_stock_threshold: number;
};

const initialInventory: InventoryItem[] = [];

export default function AdminInventoryPage() {
  const [items, setItems] =
    useState<InventoryItem[]>(initialInventory);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const getAvailable = useCallback((item: InventoryItem) => {
    return Math.max(item.quantity - item.reserved_quantity, 0);
  }, []);

  const getStockStatus = useCallback(
    (item: InventoryItem) => {
      const available = getAvailable(item);

      if (available <= 0) return "out";
      if (available <= item.low_stock_threshold) return "low";
      return "healthy";
    },
    [getAvailable]
  );

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const q = search.toLowerCase();

      const matchesSearch =
        item.product_name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);

      const stockStatus = getStockStatus(item);

      const matchesFilter =
        filter === "all" ||
        (filter === "healthy" && stockStatus === "healthy") ||
        (filter === "low" && stockStatus === "low") ||
        (filter === "out" && stockStatus === "out");

      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter, getStockStatus]);

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalReserved = items.reduce(
    (sum, item) => sum + item.reserved_quantity,
    0
  );

  const lowStock = items.filter(
    (item) => getStockStatus(item) === "low"
  ).length;

  const outOfStock = items.filter(
    (item) => getStockStatus(item) === "out"
  ).length;

  const updateQuantity = (id: string, value: string) => {
    const quantity = Math.max(Number(value) || 0, 0);

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Inventory Management
          </h1>

          <p className="mt-2 text-[#765f45]">
            Monitor stock, reserved quantities and low-stock products.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#765f45]">
                Products
              </p>

              <Package
                size={20}
                className="text-[#641f2b]"
              />
            </div>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {items.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Quantity
            </p>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {totalQuantity}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#765f45]">
                Low Stock
              </p>

              <AlertTriangle
                size={20}
                className="text-[#a27b2d]"
              />
            </div>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {lowStock}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#765f45]">
                Out of Stock
              </p>

              <XCircle
                size={20}
                className="text-red-700"
              />
            </div>

            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {outOfStock}
            </p>
          </div>

        </section>

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
                placeholder="Search product or SKU..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b]"
            >
              <option value="all">All Stock</option>
              <option value="healthy">Healthy</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[950px] text-left">

              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Product</th>
                  <th className="px-3 py-4">SKU</th>
                  <th className="px-3 py-4">Quantity</th>
                  <th className="px-3 py-4">Reserved</th>
                  <th className="px-3 py-4">Available</th>
                  <th className="px-3 py-4">Threshold</th>
                  <th className="px-3 py-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((item) => {
                  const available = getAvailable(item);
                  const stockStatus = getStockStatus(item);

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#eadfc9]"
                    >

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eadfc9]">
                            <Package
                              size={18}
                              className="text-[#641f2b]"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-[#641f2b]">
                              {item.product_name}
                            </p>

                            <p className="text-xs text-[#765f45]">
                              Product ID: {item.product_id}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-3 py-4 text-sm text-[#765f45]">
                        {item.sku}
                      </td>

                      <td className="px-3 py-4">
                        <input
                          type="number"
                          min="0"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              e.target.value
                            )
                          }
                          className="w-24 rounded-lg border border-[#d8c8a8] bg-white px-3 py-2 text-[#641f2b] outline-none focus:border-[#641f2b]"
                        />
                      </td>

                      <td className="px-3 py-4 text-[#765f45]">
                        {item.reserved_quantity}
                      </td>

                      <td className="px-3 py-4 font-bold text-[#641f2b]">
                        {available}
                      </td>

                      <td className="px-3 py-4 text-[#765f45]">
                        {item.low_stock_threshold}
                      </td>

                      <td className="px-3 py-4">

                        {stockStatus === "healthy" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                            <CheckCircle2 size={13} />
                            Healthy
                          </span>
                        )}

                        {stockStatus === "low" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                            <AlertTriangle size={13} />
                            Low Stock
                          </span>
                        )}

                        {stockStatus === "out" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                            <XCircle size={13} />
                            Out of Stock
                          </span>
                        )}

                      </td>

                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <Package
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No inventory records
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Inventory data will appear after the final API connection.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>

          <div className="mt-6 flex flex-wrap gap-6 border-t border-[#eadfc9] pt-5 text-sm text-[#765f45]">
            <span>
              Reserved:{" "}
              <strong className="text-[#641f2b]">
                {totalReserved}
              </strong>
            </span>

            <span>
              Available:{" "}
              <strong className="text-[#641f2b]">
                {Math.max(totalQuantity - totalReserved, 0)}
              </strong>
            </span>
          </div>

        </section>

      </div>
    </main>
  );
}
