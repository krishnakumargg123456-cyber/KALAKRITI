"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  MapPin,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import {
  addressesApi,
  type Address,
  type AddressCreate,
} from "@/lib/api/addresses";

const emptyForm: AddressCreate = {
  full_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  landmark: "",
  city: "",
  district: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState<AddressCreate>(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [defaultId, setDefaultId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const loadAddresses = async () => {
    try {
      setError("");
      const data = await addressesApi.list();
      setAddresses(data);
    } catch {
      setError("Unable to load your addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const updateField = (
    field: keyof AddressCreate,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addAddress = async () => {
    if (
      !form.full_name ||
      !form.phone ||
      !form.address_line1 ||
      !form.city ||
      !form.state ||
      !form.postal_code
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const created = await addressesApi.create(form);

      setAddresses((current) => {
        if (created.is_default) {
          return [
            ...current.map((item) => ({
              ...item,
              is_default: false,
            })),
            created,
          ];
        }

        return [...current, created];
      });

      setForm(emptyForm);
      setShowForm(false);
    } catch {
      setError("Unable to save address.");
    } finally {
      setSaving(false);
    }
  };

  const removeAddress = async (id: number) => {
    try {
      setDeletingId(id);
      setError("");

      await addressesApi.delete(id);

      setAddresses((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch {
      setError("Unable to delete address.");
    } finally {
      setDeletingId(null);
    }
  };

  const makeDefault = async (id: number) => {
    try {
      setDefaultId(id);
      setError("");

      const updated = await addressesApi.setDefault(id);

      setAddresses((current) =>
        current.map((item) => ({
          ...item,
          is_default: item.id === updated.id,
        }))
      );
    } catch {
      setError("Unable to change default address.");
    } finally {
      setDefaultId(null);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              My Account
            </p>

            <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
              My Addresses
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              setShowForm((value) => !value);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 font-semibold text-white transition hover:bg-maroon-light"
          >
            {showForm ? (
              <X className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}

            {showForm ? "Close" : "Add Address"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <section className="mb-8 rounded-card border border-gold/30 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-serif text-xl font-bold text-maroon">
              Add New Address
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.full_name}
                onChange={(e) =>
                  updateField("full_name", e.target.value)
                }
                placeholder="Full Name *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                placeholder="Phone Number *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.address_line1}
                onChange={(e) =>
                  updateField("address_line1", e.target.value)
                }
                placeholder="Address Line 1 *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon md:col-span-2"
              />

              <input
                value={form.address_line2 ?? ""}
                onChange={(e) =>
                  updateField("address_line2", e.target.value)
                }
                placeholder="Address Line 2"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.landmark ?? ""}
                onChange={(e) =>
                  updateField("landmark", e.target.value)
                }
                placeholder="Landmark"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.city}
                onChange={(e) =>
                  updateField("city", e.target.value)
                }
                placeholder="City *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.district ?? ""}
                onChange={(e) =>
                  updateField("district", e.target.value)
                }
                placeholder="District"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.state}
                onChange={(e) =>
                  updateField("state", e.target.value)
                }
                placeholder="State *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />

              <input
                value={form.postal_code}
                onChange={(e) =>
                  updateField("postal_code", e.target.value)
                }
                placeholder="PIN Code *"
                className="rounded-lg border border-gold/30 bg-cream px-4 py-3 outline-none focus:border-maroon"
              />
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.is_default}
                onChange={(e) =>
                  updateField("is_default", e.target.checked)
                }
                className="h-4 w-4 accent-maroon"
              />
              Make this my default address
            </label>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={addAddress}
                className="inline-flex items-center gap-2 rounded-lg bg-maroon px-5 py-3 font-semibold text-white hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Save Address
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setShowForm(false);
                }}
                className="rounded-lg border border-gold px-5 py-3 font-semibold text-maroon hover:bg-gold/10"
              >
                Cancel
              </button>
            </div>
          </section>
        )}

        {loading ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold" />
            <p className="mt-3 text-sm text-gray-600">
              Loading addresses...
            </p>
          </section>
        ) : addresses.length === 0 ? (
          <section className="rounded-card border border-gold/30 bg-white p-12 text-center shadow-sm">
            <MapPin className="mx-auto h-10 w-10 text-gold" />

            <h2 className="mt-4 font-serif text-xl font-bold text-maroon">
              No Saved Addresses
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Add an address to make checkout faster.
            </p>
          </section>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((item) => (
              <article
                key={item.id}
                className="rounded-card border border-gold/30 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-maroon" />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold text-maroon">
                          {item.full_name}
                        </h2>

                        {item.is_default && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-xs font-semibold text-maroon">
                            <Star className="h-3 w-3 fill-current" />
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        {item.phone}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-gray-700">
                        {item.address_line1}
                        {item.address_line2 && (
                          <>
                            <br />
                            {item.address_line2}
                          </>
                        )}

                        {item.landmark && (
                          <>
                            <br />
                            Landmark: {item.landmark}
                          </>
                        )}

                        <br />
                        {item.city}
                        {item.district && `, ${item.district}`}
                        <br />
                        {item.state} - {item.postal_code}
                        <br />
                        {item.country}
                      </p>

                      {!item.is_default && (
                        <button
                          type="button"
                          disabled={defaultId === item.id}
                          onClick={() => makeDefault(item.id)}
                          className="mt-4 text-sm font-semibold text-maroon hover:underline disabled:opacity-50"
                        >
                          {defaultId === item.id
                            ? "Setting..."
                            : "Make Default"}
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => removeAddress(item.id)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    aria-label="Delete address"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
