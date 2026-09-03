"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  UserCheck,
  UserX,
  Store,
} from "lucide-react";

type Artisan = {
  id: string;
  shop_name: string;
  craft: string;
  state: string;
  district: string;
  verified: boolean;
  active: boolean;
  products: number;
};

const initialArtisans: Artisan[] = [];

export default function AdminArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>(initialArtisans);
  const [search, setSearch] = useState("");
  const [verification, setVerification] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return artisans.filter((artisan) => {
      const q = search.toLowerCase();

      const matchesSearch =
        artisan.shop_name.toLowerCase().includes(q) ||
        artisan.craft.toLowerCase().includes(q) ||
        artisan.state.toLowerCase().includes(q) ||
        artisan.district.toLowerCase().includes(q);

      const matchesVerification =
        verification === "all" ||
        (verification === "verified" && artisan.verified) ||
        (verification === "unverified" && !artisan.verified);

      const matchesStatus =
        status === "all" ||
        (status === "active" && artisan.active) ||
        (status === "inactive" && !artisan.active);

      return (
        matchesSearch &&
        matchesVerification &&
        matchesStatus
      );
    });
  }, [artisans, search, verification, status]);

  const toggleVerification = (id: string) => {
    setArtisans((current) =>
      current.map((artisan) =>
        artisan.id === id
          ? { ...artisan, verified: !artisan.verified }
          : artisan
      )
    );
  };

  const toggleActive = (id: string) => {
    setArtisans((current) =>
      current.map((artisan) =>
        artisan.id === id
          ? { ...artisan, active: !artisan.active }
          : artisan
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
            Artisan Management
          </h1>

          <p className="mt-2 text-[#765f45]">
            Verify and manage Indian artisans and their shops.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["Total Artisans", artisans.length],
            [
              "Verified",
              artisans.filter((a) => a.verified).length,
            ],
            [
              "Pending Verification",
              artisans.filter((a) => !a.verified).length,
            ],
            [
              "Active",
              artisans.filter((a) => a.active).length,
            ],
          ].map(([label, value]) => (
            <div
              key={String(label)}
              className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5"
            >
              <p className="text-sm text-[#765f45]">
                {label}
              </p>

              <p className="mt-2 text-3xl font-bold text-[#641f2b]">
                {value}
              </p>
            </div>
          ))}

        </section>

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">

          <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">

            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artisan, shop or location..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
                className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b]"
              >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>

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
          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[1000px] text-left">

              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">Artisan / Shop</th>
                  <th className="px-3 py-4">Craft</th>
                  <th className="px-3 py-4">Location</th>
                  <th className="px-3 py-4">Products</th>
                  <th className="px-3 py-4">Verification</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filtered.map((artisan) => (
                  <tr
                    key={artisan.id}
                    className="border-b border-[#eadfc9]"
                  >

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eadfc9]">
                          <Store
                            size={19}
                            className="text-[#641f2b]"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-[#641f2b]">
                            {artisan.shop_name}
                          </p>

                          <p className="text-xs text-[#765f45]">
                            ID: {artisan.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {artisan.craft}
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {artisan.district}, {artisan.state}
                    </td>

                    <td className="px-3 py-4 font-semibold text-[#641f2b]">
                      {artisan.products}
                    </td>

                    <td className="px-3 py-4">

                      <button
                        onClick={() =>
                          toggleVerification(artisan.id)
                        }
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          artisan.verified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {artisan.verified ? (
                          <>
                            <UserCheck size={13} />
                            Verified
                          </>
                        ) : (
                          <>
                            <UserX size={13} />
                            Pending
                          </>
                        )}
                      </button>

                    </td>

                    <td className="px-3 py-4">

                      <button
                        onClick={() => toggleActive(artisan.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          artisan.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {artisan.active
                          ? "Active"
                          : "Inactive"}
                      </button>

                    </td>

                    <td className="px-3 py-4">

                      <div className="flex justify-end">

                        <button
                          title="View artisan"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Eye size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center"
                    >
                      <Store
                        size={42}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No artisans found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Artisan records will appear after the API connection.
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
