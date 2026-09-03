"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Ban,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  MoreHorizontal,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

type ArtisanStatus = "Verified" | "Pending" | "Suspended";

const artisan = {
  id: "ART-1042",
  name: "Meera Devi",
  slug: "meera-devi",
  craft: "Madhubani Painting",
  region: "Madhubani",
  state: "Bihar",
  email: "meera.artisan@example.com",
  phone: "+91 98765 12034",
  joined: "14 March 2026",
  status: "Verified" as ArtisanStatus,
  rating: 4.8,
  reviews: 86,
  products: 24,
  orders: 318,
  earnings: 284650,
  completionRate: 96,
  bio: "Meera Devi is a second-generation Madhubani artist whose work combines traditional Mithila motifs with contemporary storytelling. Her practice focuses on preserving hand-painted techniques while creating meaningful pieces for modern homes.",
};

const products = [
  {
    id: 1,
    name: "Mithila Peacock Painting",
    category: "Madhubani Painting",
    price: 2850,
    stock: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Tree of Life — Mithila",
    category: "Wall Art",
    price: 4200,
    stock: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Madhubani Folk Couple",
    category: "Traditional Art",
    price: 3150,
    stock: 0,
    status: "Out of Stock",
  },
];

const recentOrders = [
  {
    id: "#KK-24081",
    customer: "Ananya Sharma",
    item: "Mithila Peacock Painting",
    amount: 2850,
    status: "Delivered",
    date: "31 Aug 2026",
  },
  {
    id: "#KK-24042",
    customer: "Rohan Mehta",
    item: "Tree of Life — Mithila",
    amount: 4200,
    status: "Shipped",
    date: "29 Aug 2026",
  },
  {
    id: "#KK-23996",
    customer: "Priya Nair",
    item: "Madhubani Folk Couple",
    amount: 3150,
    status: "Processing",
    date: "27 Aug 2026",
  },
];

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#f8edcf] text-[#8b6828]">
        <Icon size={16} strokeWidth={1.7} />
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.12em] text-[#9a8778]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium text-[#531c1d]">
          {value}
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Package;
}) {
  return (
    <div className="rounded-lg border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
          {label}
        </p>
        <Icon size={16} className="text-[#9b772d]" />
      </div>

      <p className="mt-2 font-serif text-2xl font-bold text-[#531c1d]">
        {value}
      </p>
    </div>
  );
}

export default function AdminArtisanDetailPage() {
  const [status, setStatus] = useState<ArtisanStatus>(artisan.status);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showSuspend, setShowSuspend] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleStatusChange = (value: ArtisanStatus) => {
    setStatus(value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <Link
            href="/admin/artisans"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#806b5d] transition hover:text-[#641f20]"
          >
            <ArrowLeft size={16} />
            Back to Artisans
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/45 bg-[#f8edcf] font-serif text-2xl font-bold text-[#641f20]">
                MD
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-bold text-[#531c1d]">
                    {artisan.name}
                  </h1>

                  {status === "Verified" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#47734d]/30 bg-[#edf4e9] px-3 py-1 text-xs font-semibold text-[#416344]">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}

                  {status === "Pending" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9b772d]/30 bg-[#f8edcf] px-3 py-1 text-xs font-semibold text-[#856525]">
                      <Clock3 size={14} />
                      Pending
                    </span>
                  )}

                  {status === "Suspended" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9a3f3f]/25 bg-[#f9e8e4] px-3 py-1 text-xs font-semibold text-[#963d3d]">
                      <Ban size={14} />
                      Suspended
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-[#806b5d]">
                  {artisan.craft} · {artisan.region}, {artisan.state}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#531c1d] transition hover:bg-[#f8edcf]"
              >
                {saved ? <Check size={16} /> : <Edit3 size={16} />}
                {saved ? "Saved" : "Save Changes"}
              </button>

              {status !== "Suspended" && (
                <button
                  type="button"
                  onClick={() => setShowSuspend(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#9a3f3f]/30 bg-[#f9e8e4] px-4 py-2.5 text-sm font-semibold text-[#963d3d] transition hover:bg-[#f5ded8]"
                >
                  <Ban size={16} />
                  Suspend Artisan
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#9b772d]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* Overview metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Products"
            value={artisan.products.toString()}
            icon={Package}
          />

          <Metric
            label="Orders"
            value={artisan.orders.toLocaleString("en-IN")}
            icon={ShoppingBag}
          />

          <Metric
            label="Total Earnings"
            value={`₹${artisan.earnings.toLocaleString("en-IN")}`}
            icon={IndianRupee}
          />

          <Metric
            label="Completion Rate"
            value={`${artisan.completionRate}%`}
            icon={CheckCircle2}
          />
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-7">
            {/* Profile */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                    Artisan Profile
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                    About the Artisan
                  </h2>
                </div>

                <UserRound
                  size={22}
                  strokeWidth={1.5}
                  className="text-[#9b772d]"
                />
              </div>

              <p className="text-sm leading-7 text-[#69574d]">
                {artisan.bio}
              </p>

              <div className="mt-7 grid gap-5 border-t border-[#c9a45c]/20 pt-6 sm:grid-cols-2">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={artisan.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={artisan.phone}
                />

                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={`${artisan.region}, ${artisan.state}`}
                />

                <InfoItem
                  icon={CalendarDays}
                  label="Joined"
                  value={artisan.joined}
                />

                <InfoItem
                  icon={BriefcaseBusiness}
                  label="Artisan ID"
                  value={artisan.id}
                />

                <InfoItem
                  icon={Store}
                  label="Primary Craft"
                  value={artisan.craft}
                />
              </div>
            </section>

            {/* Products */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center justify-between border-b border-[#c9a45c]/20 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                    Catalogue
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-bold text-[#531c1d]">
                    Artisan Products
                  </h2>
                </div>

                <span className="rounded-full border border-[#c9a45c]/30 bg-[#f8edcf] px-3 py-1.5 text-xs font-semibold text-[#765c29]">
                  {artisan.products} total
                </span>
              </div>

              <div className="divide-y divide-[#c9a45c]/15">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 px-6 py-5 transition hover:bg-[#fffaf0] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#c9a45c]/30 bg-[#f8edcf] text-[#8b6828]">
                        <Package size={19} strokeWidth={1.6} />
                      </div>

                      <div>
                        <p className="font-serif font-semibold text-[#531c1d]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-[#806b5d]">
                          {product.category}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#641f20]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-[#806b5d]">Stock</p>
                        <p className="mt-1 text-sm font-semibold text-[#531c1d]">
                          {product.stock}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          product.status === "Active"
                            ? "border-[#47734d]/30 bg-[#edf4e9] text-[#416344]"
                            : "border-[#9a3f3f]/25 bg-[#f9e8e4] text-[#963d3d]"
                        }`}
                      >
                        {product.status}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === product.id
                              ? null
                              : product.id
                          )
                        }
                        className="rounded-md p-2 text-[#806b5d] hover:bg-[#f8edcf] hover:text-[#641f20]"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Orders */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center justify-between border-b border-[#c9a45c]/20 px-6 py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                    Activity
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-bold text-[#531c1d]">
                    Recent Orders
                  </h2>
                </div>

                <Package size={21} className="text-[#9b772d]" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#c9a45c]/20 bg-[#f8edcf]/40 text-left">
                      <th className="px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#806b5d]">
                        Order
                      </th>
                      <th className="px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#806b5d]">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#806b5d]">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#806b5d]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs uppercase tracking-[0.12em] text-[#806b5d]">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#c9a45c]/15 last:border-b-0 hover:bg-[#fffaf0]"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-[#531c1d]">
                            {order.id}
                          </p>
                          <p className="mt-1 text-xs text-[#806b5d]">
                            {order.item}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#69574d]">
                          {order.customer}
                        </td>

                        <td className="px-6 py-4 text-sm font-semibold text-[#531c1d]">
                          ₹{order.amount.toLocaleString("en-IN")}
                        </td>

                        <td className="px-6 py-4">
                          <span className="rounded-full border border-[#c9a45c]/30 bg-[#f8edcf] px-3 py-1.5 text-xs font-semibold text-[#765c29]">
                            {order.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#806b5d]">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Verification */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#47734d]/30 bg-[#edf4e9] text-[#416344]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="font-serif text-lg font-semibold text-[#531c1d]">
                    Verification
                  </p>
                  <p className="text-xs text-[#806b5d]">
                    Artisan account status
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                  Account Status
                </label>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) =>
                      handleStatusChange(
                        e.target.value as ArtisanStatus
                      )
                    }
                    className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 pr-10 text-sm font-medium text-[#531c1d] outline-none focus:border-[#641f20]"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Suspended">Suspended</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                  />
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-[#47734d]/20 bg-[#edf4e9]/60 p-4">
                <div className="flex gap-3">
                  <BadgeCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-[#416344]"
                  />
                  <p className="text-xs leading-5 text-[#496149]">
                    Identity and artisan profile information have been
                    verified for this marketplace record.
                  </p>
                </div>
              </div>
            </section>

            {/* Performance */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <Star size={19} />
                </div>

                <div>
                  <p className="font-serif text-lg font-semibold text-[#531c1d]">
                    Performance
                  </p>
                  <p className="text-xs text-[#806b5d]">
                    Marketplace indicators
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-[#806b5d]">
                    Customer Rating
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#531c1d]">
                    {artisan.rating}
                  </span>
                </div>

                <div className="mt-2 flex gap-1 text-[#9b772d]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="mt-2 text-xs text-[#806b5d]">
                  Based on {artisan.reviews} customer reviews
                </p>
              </div>

              <div className="mt-6 border-t border-[#c9a45c]/20 pt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#806b5d]">
                    Order completion
                  </span>
                  <span className="font-semibold text-[#531c1d]">
                    {artisan.completionRate}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e8dfca]">
                  <div
                    className="h-full rounded-full bg-[#641f20]"
                    style={{
                      width: `${artisan.completionRate}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Documents */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <FileText size={19} />
                </div>

                <div>
                  <p className="font-serif text-lg font-semibold text-[#531c1d]">
                    Documents
                  </p>
                  <p className="text-xs text-[#806b5d]">
                    Verification records
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Identity Verification",
                  "Bank Account Details",
                  "Artisan Declaration",
                ].map((document) => (
                  <div
                    key={document}
                    className="flex items-center justify-between rounded-lg border border-[#c9a45c]/20 bg-[#fffaf0] px-4 py-3"
                  >
                    <span className="text-sm text-[#5f4d43]">
                      {document}
                    </span>
                    <CheckCircle2
                      size={16}
                      className="text-[#47734d]"
                    />
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Suspend confirmation */}
      {showSuspend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#351716]/45 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#c9a45c]/40 bg-[#fbf7ed] shadow-[0_20px_60px_rgba(53,23,22,0.2)]">
            <div className="flex items-start justify-between border-b border-[#c9a45c]/20 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#963d3d]">
                  Account Action
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                  Suspend Artisan?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowSuspend(false)}
                className="rounded-md p-2 text-[#806b5d] hover:bg-[#f8edcf]"
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-lg border border-[#9a3f3f]/20 bg-[#f9e8e4] p-4">
                <div className="flex gap-3">
                  <XCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-[#963d3d]"
                  />
                  <p className="text-sm leading-6 text-[#714444]">
                    Suspending {artisan.name}&apos;s account will restrict
                    marketplace activity until the account is restored.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#806b5d]">
                This is currently a frontend-only administrative action.
                Backend permissions and audit logging will be connected
                during API integration.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#c9a45c]/20 px-6 py-5">
              <button
                type="button"
                onClick={() => setShowSuspend(false)}
                className="rounded-md border border-[#c9a45c]/40 px-4 py-2.5 text-sm font-semibold text-[#531c1d] hover:bg-[#f8edcf]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus("Suspended");
                  setShowSuspend(false);
                  setSaved(false);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[#963d3d] px-5 py-2.5 text-sm font-semibold text-[#fff8e9] hover:bg-[#843535]"
              >
                <Ban size={16} />
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product action menu */}
      {activeMenu !== null && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </main>
  );
}