"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Ban,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  IndianRupee,
  Mail,
  MapPin,
  Package,
  Save,
  ShieldCheck,
  ShoppingBag,
  Store,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import api from "@/lib/api/client";
import { getArtisan } from "@/lib/api/artisans";
import { productsApi, type Product } from "@/lib/api/products";

type Artisan = {
  id: string;
  user_id: string;
  shop_name: string;
  bio?: string | null;
  craft_specialization?: string | null;
  state?: string | null;
  district?: string | null;
  is_verified: boolean;
  is_active: boolean;
};

type ArtisanStatus = "Verified" | "Pending" | "Suspended";

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
          {value || "Not provided"}
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

function productPrice(product: Product) {
  const value = Number(product.price);
  if (!Number.isFinite(value)) return "—";

  return `₹${value.toLocaleString("en-IN")}`;
}

function getProductStatus(product: Product) {
  return product.is_active === false ? "Inactive" : "Active";
}

export default function AdminArtisanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const artisanId = params.id;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState("");
  const [productsError, setProductsError] = useState("");

  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [craft, setCraft] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadArtisan() {
      setLoading(true);
      setError("");

      try {
        const response = await getArtisan(artisanId);
        const data = response;

        if (!mounted) return;

        setArtisan(data);
        setShopName(data.shop_name ?? "");
        setBio(data.bio ?? "");
        setCraft(data.craft_specialization ?? "");
        setState(data.state ?? "");
        setDistrict(data.district ?? "");
      } catch (err: any) {
        if (!mounted) return;

        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "Unable to load artisan details.";

        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadArtisan();

    return () => {
      mounted = false;
    };
  }, [artisanId]);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      setProductsLoading(true);
      setProductsError("");

      try {
        const response = await productsApi.list({
          artisan_id: artisanId,
          limit: 100,
        });

        if (!mounted) return;

        const data = response?.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (!mounted) return;

        setProductsError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to load artisan products."
        );
      } finally {
        if (mounted) setProductsLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [artisanId]);

  const status: ArtisanStatus = useMemo(() => {
    if (!artisan) return "Pending";
    if (!artisan.is_active) return "Suspended";
    if (artisan.is_verified) return "Verified";
    return "Pending";
  }, [artisan]);

  const initials = useMemo(() => {
    const name = artisan?.shop_name || "Artisan";

    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [artisan]);

  async function saveChanges() {
    if (!artisan) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await api.patch<Artisan>(
        `/artisans/${artisan.id}`,
        {
          shop_name: shopName.trim(),
          bio: bio.trim() || null,
          craft_specialization: craft.trim() || null,
          state: state.trim() || null,
          district: district.trim() || null,
        }
      );

      const updated = response.data;

      setArtisan(updated);
      setShopName(updated.shop_name ?? "");
      setBio(updated.bio ?? "");
      setCraft(updated.craft_specialization ?? "");
      setState(updated.state ?? "");
      setDistrict(updated.district ?? "");
      setSaved(true);

      window.setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to save artisan changes."
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(
    nextStatus: "Verified" | "Pending" | "Suspended"
  ) {
    if (!artisan) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const payload =
        nextStatus === "Verified"
          ? { is_verified: true, is_active: true }
          : nextStatus === "Pending"
            ? { is_verified: false, is_active: true }
            : { is_active: false };

      const response = await api.patch<Artisan>(
        `/artisans/${artisan.id}`,
        payload
      );

      setArtisan(response.data);
      setShowSuspend(false);
      setSaved(true);

      window.setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to update artisan status."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f0df]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-10 text-center">
            <p className="font-serif text-2xl font-bold text-[#531c1d]">
              Loading artisan profile…
            </p>
            <p className="mt-2 text-sm text-[#806b5d]">
              Fetching the latest marketplace record.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="min-h-screen bg-[#f7f0df]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <Link
            href="/admin/artisans"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#806b5d] hover:text-[#641f20]"
          >
            <ArrowLeft size={16} />
            Back to Artisans
          </Link>

          <div className="mt-6 rounded-xl border border-[#9a3f3f]/25 bg-[#f9e8e4] p-6">
            <p className="font-semibold text-[#963d3d]">
              Artisan could not be loaded.
            </p>
            <p className="mt-2 text-sm text-[#714444]">
              {error || "The requested artisan record was not found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
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
                {initials || "A"}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-bold text-[#531c1d]">
                    {artisan.shop_name}
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
                  {artisan.craft_specialization || "Craft not specified"} ·{" "}
                  {artisan.district || "District not specified"},{" "}
                  {artisan.state || "State not specified"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={saveChanges}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#531c1d] transition hover:bg-[#f8edcf] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saved ? <Check size={16} /> : <Save size={16} />}
                {saving ? "Saving…" : saved ? "Saved" : "Save Changes"}
              </button>

              {status !== "Suspended" && (
                <button
                  type="button"
                  onClick={() => setShowSuspend(true)}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-[#9a3f3f]/30 bg-[#f9e8e4] px-4 py-2.5 text-sm font-semibold text-[#963d3d] transition hover:bg-[#f5ded8] disabled:opacity-60"
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
        {error && (
          <div className="mb-6 rounded-lg border border-[#9a3f3f]/25 bg-[#f9e8e4] px-4 py-3 text-sm text-[#963d3d]">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric
            label="Products"
            value={productsLoading ? "…" : products.length.toString()}
            icon={Package}
          />

          <Metric
            label="Account"
            value={artisan.is_active ? "Active" : "Suspended"}
            icon={ShoppingBag}
          />

          <Metric
            label="Verification"
            value={artisan.is_verified ? "Verified" : "Pending"}
            icon={ShieldCheck}
          />

          <Metric
            label="Profile ID"
            value={`${artisan.id.slice(0, 8)}…`}
            icon={BriefcaseBusiness}
          />
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-7">
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                    Shop Name
                  </label>
                  <input
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#531c1d] outline-none focus:border-[#641f20]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                    Biography
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={5}
                    className="w-full resize-y rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm leading-6 text-[#531c1d] outline-none focus:border-[#641f20]"
                    placeholder="Tell the artisan's story…"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                    Craft Specialization
                  </label>
                  <input
                    value={craft}
                    onChange={(e) => setCraft(e.target.value)}
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#531c1d] outline-none focus:border-[#641f20]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                    State
                  </label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#531c1d] outline-none focus:border-[#641f20]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                    District
                  </label>
                  <input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#531c1d] outline-none focus:border-[#641f20]"
                  />
                </div>
              </div>

              <div className="mt-7 grid gap-5 border-t border-[#c9a45c]/20 pt-6 sm:grid-cols-2">
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={[artisan.district, artisan.state]
                    .filter(Boolean)
                    .join(", ")}
                />

                <InfoItem
                  icon={BriefcaseBusiness}
                  label="Artisan ID"
                  value={artisan.id}
                />

                <InfoItem
                  icon={UserRound}
                  label="User ID"
                  value={artisan.user_id}
                />

                <InfoItem
                  icon={Store}
                  label="Primary Craft"
                  value={artisan.craft_specialization || ""}
                />
              </div>
            </section>

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
                  {products.length} total
                </span>
              </div>

              {productsError && (
                <div className="mx-6 my-5 rounded-lg border border-[#9a3f3f]/25 bg-[#f9e8e4] px-4 py-3 text-sm text-[#963d3d]">
                  {productsError}
                </div>
              )}

              {productsLoading ? (
                <div className="px-6 py-10 text-center text-sm text-[#806b5d]">
                  Loading products…
                </div>
              ) : products.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <Package
                    size={28}
                    className="mx-auto text-[#9b772d]"
                    strokeWidth={1.5}
                  />
                  <p className="mt-3 font-serif text-lg font-semibold text-[#531c1d]">
                    No products found
                  </p>
                  <p className="mt-1 text-sm text-[#806b5d]">
                    This artisan does not currently have products associated
                    with this profile.
                  </p>
                </div>
              ) : (
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

                        <div className="min-w-0">
                          <p className="font-serif font-semibold text-[#531c1d]">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-[#806b5d]">
                            {product.category_name ||
                              product.material ||
                              "Handcrafted product"}
                          </p>

                          <p className="mt-2 text-sm font-semibold text-[#641f20]">
                            {productPrice(product)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            product.is_active === false
                              ? "border-[#9a3f3f]/25 bg-[#f9e8e4] text-[#963d3d]"
                              : "border-[#47734d]/30 bg-[#edf4e9] text-[#416344]"
                          }`}
                        >
                          {getProductStatus(product)}
                        </span>

                        <Link
                          href={`/products/${product.slug}`}
                          className="rounded-md border border-[#c9a45c]/30 px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f8edcf]"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <ShoppingBag size={19} />
                </div>

                <div>
                  <p className="font-serif text-xl font-semibold text-[#531c1d]">
                    Marketplace Activity
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#806b5d]">
                    Order history, earnings, reviews and payout analytics
                    require artisan-specific reporting endpoints. This page
                    intentionally does not display fabricated marketplace
                    metrics.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
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
                    disabled={saving}
                    onChange={(e) =>
                      updateStatus(
                        e.target.value as "Verified" | "Pending" | "Suspended"
                      )
                    }
                    className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 pr-10 text-sm font-medium text-[#531c1d] outline-none focus:border-[#641f20] disabled:opacity-60"
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
                    {artisan.is_verified
                      ? "This artisan is currently verified in the marketplace."
                      : "This artisan has not yet been verified."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <FileText size={19} />
                </div>

                <div>
                  <p className="font-serif text-lg font-semibold text-[#531c1d]">
                    Record Status
                  </p>
                  <p className="text-xs text-[#806b5d]">
                    Current backend state
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-[#c9a45c]/20 bg-[#fffaf0] px-4 py-3">
                  <span className="text-sm text-[#5f4d43]">
                    Profile Active
                  </span>
                  {artisan.is_active ? (
                    <CheckCircle2 size={17} className="text-[#47734d]" />
                  ) : (
                    <XCircle size={17} className="text-[#963d3d]" />
                  )}
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[#c9a45c]/20 bg-[#fffaf0] px-4 py-3">
                  <span className="text-sm text-[#5f4d43]">
                    Identity Verified
                  </span>
                  {artisan.is_verified ? (
                    <CheckCircle2 size={17} className="text-[#47734d]" />
                  ) : (
                    <Clock3 size={17} className="text-[#9b772d]" />
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="font-serif text-lg font-semibold text-[#531c1d]">
                    User Association
                  </p>
                  <p className="text-xs text-[#806b5d]">
                    Linked account identifier
                  </p>
                </div>
              </div>

              <p className="mt-5 break-all rounded-lg border border-[#c9a45c]/20 bg-[#fffaf0] p-4 text-xs leading-5 text-[#5f4d43]">
                {artisan.user_id}
              </p>
            </section>
          </aside>
        </div>
      </div>

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
                    Suspending <strong>{artisan.shop_name}</strong> will mark
                    this artisan record as inactive in the backend.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#806b5d]">
                This action uses the existing artisan PATCH endpoint and can be
                reversed by setting the account status back to Verified or
                Pending.
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
                onClick={() => updateStatus("Suspended")}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-md bg-[#963d3d] px-5 py-2.5 text-sm font-semibold text-[#fff8e9] hover:bg-[#843535] disabled:opacity-60"
              >
                <Ban size={16} />
                {saving ? "Suspending…" : "Suspend Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
