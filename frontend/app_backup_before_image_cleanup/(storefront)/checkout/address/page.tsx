"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";

type Address = {
  id: number;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  type: "Home" | "Work";
};

const savedAddresses: Address[] = [
  {
    id: 1,
    name: "Krishna Kumar",
    phone: "+91 98765 43210",
    line1: "24, Heritage Colony",
    line2: "Near Main Market",
    city: "Mathura",
    state: "Uttar Pradesh",
    pincode: "281001",
    type: "Home",
  },
];

export default function CheckoutAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses);
  const [selectedId, setSelectedId] = useState<number | null>(
    savedAddresses[0]?.id ?? null,
  );
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home" as "Home" | "Work",
  });

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newAddress: Address = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      line1: form.line1,
      line2: form.line2,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      type: form.type,
    };

    setAddresses((current) => [...current, newAddress]);
    setSelectedId(newAddress.id);
    setShowForm(false);

    setForm({
      name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link href="/cart" className="hover:text-[#8b1e2d]">
            Cart
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <span className="font-semibold text-[#4a211c]">
            Delivery Address
          </span>

          <ChevronRight className="hidden h-3.5 w-3.5 sm:block" />

          <span className="hidden sm:block">Payment</span>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8b1e2d] text-xs font-bold text-[#fff8eb]">
              1
            </span>
            <span className="hidden text-xs font-bold text-[#8b1e2d] sm:block">
              Address
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#b08a4a]/35" />

          <div className="flex items-center gap-2 opacity-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b08a4a]/50 text-xs font-bold">
              2
            </span>
            <span className="hidden text-xs font-bold sm:block">
              Payment
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#b08a4a]/35" />

          <div className="flex items-center gap-2 opacity-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b08a4a]/50 text-xs font-bold">
              3
            </span>
            <span className="hidden text-xs font-bold sm:block">
              Confirmation
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Address section */}
          <section>
            <div className="flex items-end justify-between gap-4">
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
            </div>

            {/* Saved addresses */}
            {addresses.length > 0 && (
              <div className="mt-7 space-y-4">
                {addresses.map((address) => {
                  const selected = selectedId === address.id;

                  return (
                    <button
                      key={address.id}
                      type="button"
                      onClick={() => setSelectedId(address.id)}
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
                              {address.name}
                            </h2>

                            <span className="rounded-full bg-[#efe4ce] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                              {address.type}
                            </span>
                          </div>

                          <p className="mt-2 text-sm leading-6 text-[#604940]">
                            {address.line1}
                            {address.line2 && (
                              <>
                                <br />
                                {address.line2}
                              </>
                            )}
                            <br />
                            {address.city}, {address.state} -{" "}
                            {address.pincode}
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

            {/* Add address */}
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
                      Enter the address where you would like your order
                      delivered.
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
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Full Name *
                    </span>

                    <input
                      required
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Enter full name"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Phone Number *
                    </span>

                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9+\-\s]{10,15}"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="10-digit mobile number"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      PIN Code *
                    </span>

                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={form.pincode}
                      onChange={(event) =>
                        updateField(
                          "pincode",
                          event.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="6-digit PIN"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Address *
                    </span>

                    <input
                      required
                      value={form.line1}
                      onChange={(event) =>
                        updateField("line1", event.target.value)
                      }
                      placeholder="House / flat / street / locality"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Landmark
                    </span>

                    <input
                      value={form.line2}
                      onChange={(event) =>
                        updateField("line2", event.target.value)
                      }
                      placeholder="Nearby landmark (optional)"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      City *
                    </span>

                    <input
                      required
                      value={form.city}
                      onChange={(event) =>
                        updateField("city", event.target.value)
                      }
                      placeholder="City"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      State *
                    </span>

                    <input
                      required
                      value={form.state}
                      onChange={(event) =>
                        updateField("state", event.target.value)
                      }
                      placeholder="State"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#8b1e2d]"
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-bold text-[#4a211c]">
                    Address Type
                  </p>

                  <div className="flex gap-3">
                    {(["Home", "Work"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("type", type)}
                        className={`rounded-lg border px-5 py-2.5 text-xs font-bold transition ${
                          form.type === type
                            ? "border-[#8b1e2d] bg-[#8b1e2d] text-[#fff8eb]"
                            : "border-[#b08a4a]/35 text-[#65443c]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-6 py-3.5 text-sm font-bold text-[#fff8eb]"
                >
                  Save Address
                  <Check className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Delivery note */}
            <div className="mt-6 flex gap-4 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/65 p-5">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#8b1e2d]" />

              <div>
                <p className="text-sm font-bold text-[#4a211c]">
                  Handcrafted with care
                </p>

                <p className="mt-1 text-xs leading-5 text-[#6d5149]">
                  Delivery timelines may vary because your pieces are carefully
                  prepared and packed by artisan partners.
                </p>
              </div>
            </div>
          </section>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-[#b08a4a]/25 pb-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">Handmade Wall Art × 1</span>
                <span className="font-semibold">₹2,499</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">Blue Pottery Vase × 1</span>
                <span className="font-semibold">₹1,899</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">Delivery</span>
                <span className="font-semibold text-[#58704d]">
                  FREE
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-4 py-5">
              <span className="font-serif text-lg font-semibold">
                Total
              </span>

              <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                ₹4,398
              </span>
            </div>

            <Link
              href={
                selectedId
                  ? "/checkout/payment"
                  : "#"
              }
              aria-disabled={!selectedId}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold transition ${
                selectedId
                  ? "bg-[#8b1e2d] text-[#fff8eb] hover:bg-[#711725]"
                  : "pointer-events-none bg-[#b8aa99] text-[#f7f0df]"
              }`}
            >
              Continue to Payment
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/cart"
              className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#8b1e2d]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to Cart
            </Link>

            <div className="mt-6 flex items-center gap-3 border-t border-[#b08a4a]/25 pt-5">
              <MapPin className="h-4 w-4 shrink-0 text-[#8b1e2d]" />

              <p className="text-[11px] leading-5 text-[#80665d]">
                Your delivery address is used only to fulfil your KALAKRITI
                order.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}