"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { addressesApi, type Address } from "@/lib/api/addresses";
import { useCartStore } from "@/lib/store/cart-store";

export default function CheckoutAddressPage() {
  const items = useCartStore((state) => state.items);
  const loadingCart = useCartStore((state) => state.loading);
  const loadCart = useCartStore((state) => state.loadCart);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    loadCart().catch((err) => {
      console.error(err);
    });
  }, [loadCart]);

  useEffect(() => {
    async function loadAddresses() {
      try {
        setLoadingAddresses(true);
        setError("");

        const data = await addressesApi.list();

        setAddresses(data);

        const defaultAddress =
          data.find((address) => address.is_default) ?? data[0];

        setSelectedId(defaultAddress?.id ?? null);

        if (defaultAddress) {
          sessionStorage.setItem(
            "kalakriti_checkout_address",
            JSON.stringify(defaultAddress),
          );
        }

        setShowForm(data.length === 0);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load your saved addresses. Please try again.",
        );
      } finally {
        setLoadingAddresses(false);
      }
    }

    loadAddresses();
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + Number(item.product?.price ?? 0) * item.quantity,
        0,
      ),
    [items],
  );

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 99;
  const total = subtotal + delivery;

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const selectAddress = (address: Address) => {
    setSelectedId(address.id);

    sessionStorage.setItem(
      "kalakriti_checkout_address",
      JSON.stringify(address),
    );
  };

  const addAddress = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const newAddress = await addressesApi.create({
        full_name: form.name.trim(),
        phone: form.phone.trim(),
        address_line1: form.line1.trim(),
        address_line2: form.line2.trim() || null,
        landmark: form.landmark.trim() || null,
        district: form.district.trim() || null,
        city: form.city.trim(),
        state: form.state.trim(),
        postal_code: form.pincode.trim(),
        country: "India",
        is_default: addresses.length === 0,
      });

      setAddresses((current) => {
        if (newAddress.is_default) {
          return [
            ...current.map((address) => ({
              ...address,
              is_default: false,
            })),
            newAddress,
          ];
        }

        return [...current, newAddress];
      });

      setSelectedId(newAddress.id);

      sessionStorage.setItem(
        "kalakriti_checkout_address",
        JSON.stringify(newAddress),
      );

      setShowForm(false);

      setForm({
        name: "",
        phone: "",
        line1: "",
        line2: "",
        landmark: "",
        district: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      console.error(err);
      setError(
        "Unable to save this address. Please check your details and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const canContinue =
    selectedId !== null &&
    items.length > 0 &&
    !loadingCart;

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <header className="border-b border-[#b08a4a]/30 bg-[#fbf6e9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wide text-[#8b1e2d]"
          >
            KALAKRITI
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#80665d]">
            <ShieldCheck className="h-4 w-4 text-[#8b1e2d]" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link
            href="/cart"
            className="transition hover:text-[#8b1e2d]"
          >
            Cart
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <span className="font-semibold text-[#4a211c]">
            Delivery Address
          </span>

          <ChevronRight className="hidden h-3.5 w-3.5 sm:block" />

          <span className="hidden sm:block">Payment</span>
        </div>

        <div className="mt-8 flex items-center">
          <CheckoutStep
            number="1"
            title="Address"
            active
          />

          <CheckoutLine active />

          <CheckoutStep
            number="2"
            title="Payment"
          />

          <CheckoutLine />

          <CheckoutStep
            number="3"
            title="Confirmation"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Step 1
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
                Where should we deliver?
              </h1>

              <p className="mt-2 text-sm text-[#6d5149]">
                Choose a saved address or add a new delivery address.
              </p>
            </div>

            {error && (
              <p className="mt-5 rounded-xl border border-[#8b1e2d]/20 bg-[#8b1e2d]/5 px-4 py-3 text-sm text-[#8b1e2d]">
                {error}
              </p>
            )}

            {loadingAddresses ? (
              <div className="mt-7 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-8 text-center">
                <MapPin className="mx-auto h-7 w-7 animate-pulse text-[#8b1e2d]" />

                <p className="mt-3 text-sm text-[#80665d]">
                  Loading saved addresses...
                </p>
              </div>
            ) : (
              <>
                {addresses.length > 0 && (
                  <div className="mt-7 space-y-4">
                    {addresses.map((address) => {
                      const selected =
                        selectedId === address.id;

                      return (
                        <button
                          key={address.id}
                          type="button"
                          onClick={() =>
                            selectAddress(address)
                          }
                          className={`w-full rounded-2xl border p-5 text-left transition ${
                            selected
                              ? "border-[#8b1e2d] bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.06)]"
                              : "border-[#b08a4a]/30 bg-[#fbf6e9] hover:border-[#8b1e2d]/40"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                selected
                                  ? "border-[#8b1e2d] bg-[#8b1e2d]"
                                  : "border-[#b08a4a]"
                              }`}
                            >
                              {selected && (
                                <Check className="h-3 w-3 text-[#fff8eb]" />
                              )}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h2 className="font-semibold text-[#4a211c]">
                                  {address.full_name}
                                </h2>

                                {address.is_default && (
                                  <span className="rounded-full bg-[#efe4ce] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                                    Default
                                  </span>
                                )}
                              </div>

                              <p className="mt-2 text-sm leading-6 text-[#604940]">
                                {address.address_line1}

                                {address.address_line2 && (
                                  <>
                                    <br />
                                    {address.address_line2}
                                  </>
                                )}

                                {address.landmark && (
                                  <>
                                    <br />
                                    {address.landmark}
                                  </>
                                )}

                                <br />

                                {address.city}
                                {address.district
                                  ? `, ${address.district}`
                                  : ""}
                                , {address.state} -{" "}
                                {address.postal_code}
                              </p>

                              <p className="mt-2 text-xs text-[#80665d]">
                                Phone: {address.phone}
                              </p>
                            </div>

                            {selected && (
                              <span className="hidden text-xs font-bold text-[#8b1e2d] sm:block">
                                Selected
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {!showForm && (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#8b1e2d]/40 bg-[#fbf6e9] px-5 py-4 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#efe4ce]"
                  >
                    <Plus className="h-4 w-4" />
                    Add a New Address
                  </button>
                )}

                {showForm && (
                  <form
                    onSubmit={addAddress}
                    className="mt-7 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                          Add New Address
                        </h2>

                        <p className="mt-1 text-xs text-[#80665d]">
                          Enter the address where you would like your
                          order delivered.
                        </p>
                      </div>

                      {addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="text-xs font-bold text-[#8b1e2d]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <AddressField
                        label="Full Name *"
                        value={form.name}
                        onChange={(value) =>
                          updateField("name", value)
                        }
                        placeholder="Enter full name"
                        required
                        className="sm:col-span-2"
                      />

                      <AddressField
                        label="Phone Number *"
                        value={form.phone}
                        onChange={(value) =>
                          updateField("phone", value)
                        }
                        placeholder="10-digit mobile number"
                        required
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9+\-\s]{10,15}"
                      />

                      <AddressField
                        label="PIN Code *"
                        value={form.pincode}
                        onChange={(value) =>
                          updateField(
                            "pincode",
                            value.replace(/\D/g, "").slice(0, 6),
                          )
                        }
                        placeholder="6-digit PIN"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                      />

                      <AddressField
                        label="Address *"
                        value={form.line1}
                        onChange={(value) =>
                          updateField("line1", value)
                        }
                        placeholder="House / flat / street / locality"
                        required
                        className="sm:col-span-2"
                      />

                      <AddressField
                        label="Address Line 2"
                        value={form.line2}
                        onChange={(value) =>
                          updateField("line2", value)
                        }
                        placeholder="Apartment / area (optional)"
                        className="sm:col-span-2"
                      />

                      <AddressField
                        label="Landmark"
                        value={form.landmark}
                        onChange={(value) =>
                          updateField("landmark", value)
                        }
                        placeholder="Nearby landmark (optional)"
                        className="sm:col-span-2"
                      />

                      <AddressField
                        label="City *"
                        value={form.city}
                        onChange={(value) =>
                          updateField("city", value)
                        }
                        placeholder="City"
                        required
                      />

                      <AddressField
                        label="District"
                        value={form.district}
                        onChange={(value) =>
                          updateField("district", value)
                        }
                        placeholder="District (optional)"
                      />

                      <AddressField
                        label="State *"
                        value={form.state}
                        onChange={(value) =>
                          updateField("state", value)
                        }
                        placeholder="State"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Address"}
                      <Check className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </>
            )}

            <div className="mt-6 flex gap-4 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/65 p-5">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <div>
                <p className="text-sm font-bold text-[#4a211c]">
                  Handcrafted with care
                </p>

                <p className="mt-1 text-xs leading-5 text-[#6d5149]">
                  Delivery timelines may vary because your pieces
                  are carefully prepared and packed by artisan
                  partners.
                </p>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#8b1e2d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Cart
            </Link>
          </section>

          <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-[#b08a4a]/25 pb-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">
                  Items ({itemCount})
                </span>

                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">
                  Delivery
                </span>

                <span className="font-semibold text-[#58704d]">
                  {delivery === 0
                    ? "FREE"
                    : formatCurrency(delivery)}
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-4 py-5">
              <span className="font-serif text-lg font-semibold">
                Total
              </span>

              <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                {formatCurrency(total)}
              </span>
            </div>

            <Link
              href={
                canContinue
                  ? "/checkout/payment"
                  : "#"
              }
              aria-disabled={!canContinue}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold transition ${
                canContinue
                  ? "bg-[#8b1e2d] text-[#fff8eb] hover:bg-[#711725]"
                  : "pointer-events-none bg-[#b8aa99] text-[#f7f0df]"
              }`}
            >
              Continue to Payment
              <ArrowRight className="h-4 w-4" />
            </Link>

            {!selectedId && addresses.length > 0 && (
              <p className="mt-3 text-center text-[11px] text-[#8b1e2d]">
                Please select a delivery address to continue.
              </p>
            )}

            <div className="mt-6 flex items-center gap-3 border-t border-[#b08a4a]/25 pt-5">
              <MapPin className="h-4 w-4 shrink-0 text-[#8b1e2d]" />

              <p className="text-[11px] leading-5 text-[#80665d]">
                Your selected address will be used for this
                checkout.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#8b1e2d]" />

              <p className="text-[11px] leading-5 text-[#80665d]">
                {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"} in your order.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function CheckoutStep({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
          active
            ? "bg-[#8b1e2d] text-[#fff8eb]"
            : "border border-[#b08a4a]/50 bg-[#fbf6e9] text-[#80665d]"
        }`}
      >
        {active ? (
          <Check className="h-4 w-4" />
        ) : (
          number
        )}
      </span>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active
            ? "text-[#8b1e2d]"
            : "text-[#80665d]"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function CheckoutLine({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`mx-3 h-px min-w-5 flex-1 ${
        active
          ? "bg-[#8b1e2d]/40"
          : "bg-[#b08a4a]/35"
      }`}
    />
  );
}

function AddressField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  inputMode,
  pattern,
  maxLength,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  pattern?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-bold text-[#4a211c]">
        {label}
      </span>

      <input
        required={required}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d] focus:ring-1 focus:ring-[#8b1e2d]/20"
      />
    </label>
  );
}
