"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  Globe2,
  LockKeyhole,
  Save,
  ShieldCheck,
  Store,
  Wrench,
} from "lucide-react";

import {
  adminSettingsApi,
  type AdminSettings,
  type AdminSettingsUpdate,
} from "@/lib/api/settings";

type ToggleProps = {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
};

function Toggle({
  label,
  description,
  enabled,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-[#c9a45c]/20 py-5 last:border-b-0">
      <div>
        <p className="font-medium text-[#531c1d]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-[#806b5d]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          enabled
            ? "border-[#641f20] bg-[#641f20]"
            : "border-[#bca98b] bg-[#e8dfca]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-[#fbf7ed] shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Store;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/40 bg-[#f8edcf] text-[#8b6828]">
        <Icon size={20} strokeWidth={1.7} />
      </div>

      <div>
        <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#806b5d]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#531c1d]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#c9a45c]/35 bg-[#fffdf7] px-4 py-3 text-sm text-[#531c1d] outline-none transition placeholder:text-[#a89582] focus:border-[#8b6828] focus:ring-2 focus:ring-[#c9a45c]/15"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#531c1d]">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-[#c9a45c]/35 bg-[#fffdf7] px-4 py-3 pr-10 text-sm text-[#531c1d] outline-none transition focus:border-[#8b6828] focus:ring-2 focus:ring-[#c9a45c]/15"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6828]"
        />
      </div>
    </label>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [draft, setDraft] = useState<AdminSettingsUpdate>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await adminSettingsApi.get();

        if (!mounted) {
          return;
        }

        setSettings(response.data);
        setDraft(response.data);
      } catch (err) {
        console.error("Failed to load admin settings:", err);

        if (mounted) {
          setError(
            "Unable to load marketplace settings. Please try again.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const updateSetting = (
    key: keyof AdminSettingsUpdate,
    value: string | boolean,
  ) => {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const payload: AdminSettingsUpdate = {
        ...draft,
      };

      if (payload.tax_rate !== undefined) {
        payload.tax_rate = Number(payload.tax_rate);
      }

      if (payload.commission_rate !== undefined) {
        payload.commission_rate = Number(payload.commission_rate);
      }

      const response = await adminSettingsApi.update(payload);

      setSettings(response.data);
      setDraft(response.data);
      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to save admin settings:", err);
      setError(
        "Unable to save settings. Please check the values and try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5eddd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c9a45c]/30 border-t-[#641f20]" />
            <p className="mt-4 text-sm text-[#806b5d]">
              Loading marketplace settings...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!settings) {
    return (
      <main className="min-h-screen bg-[#f5eddd] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#a84b45]/25 bg-[#fffaf0] p-8 text-center shadow-sm">
          <Wrench className="mx-auto text-[#8b6828]" size={32} />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-[#531c1d]">
            Settings unavailable
          </h1>
          <p className="mt-2 text-sm text-[#806b5d]">
            {error || "The marketplace settings could not be loaded."}
          </p>
        </div>
      </main>
    );
  }

  const value = (key: keyof AdminSettingsUpdate) => {
    return draft[key] ?? "";
  };

  const boolValue = (key: keyof AdminSettingsUpdate) => {
    return Boolean(draft[key]);
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6828]">
              Administration
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
              Marketplace Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
              Manage KALAKRITI store identity, regional preferences,
              commerce rules, notifications, security and maintenance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#fffaf0] shadow-sm transition hover:bg-[#531c1d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#fffaf0]/30 border-t-[#fffaf0]" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check size={17} />
                Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-[#a84b45]/25 bg-[#fff3ef] px-4 py-3 text-sm text-[#8f302c]">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={Store}
                title="Store Identity"
                description="Core marketplace information displayed across KALAKRITI."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Marketplace Name"
                  value={String(value("marketplace_name"))}
                  onChange={(next) =>
                    updateSetting("marketplace_name", next)
                  }
                />

                <Field
                  label="Support Email"
                  type="email"
                  value={String(value("support_email"))}
                  onChange={(next) =>
                    updateSetting("support_email", next)
                  }
                />

                <Field
                  label="Support Phone"
                  type="tel"
                  value={String(value("support_phone"))}
                  onChange={(next) =>
                    updateSetting("support_phone", next)
                  }
                />

                <SelectField
                  label="Language"
                  value={String(value("language"))}
                  options={["English", "Hindi"]}
                  onChange={(next) =>
                    updateSetting("language", next)
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={Globe2}
                title="Regional Settings"
                description="Currency and timezone used by the marketplace."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <SelectField
                  label="Currency"
                  value={String(value("currency"))}
                  options={["INR", "USD", "EUR", "GBP"]}
                  onChange={(next) =>
                    updateSetting("currency", next)
                  }
                />

                <SelectField
                  label="Timezone"
                  value={String(value("timezone"))}
                  options={[
                    "Asia/Kolkata",
                    "Asia/Dubai",
                    "Asia/Singapore",
                    "UTC",
                  ]}
                  onChange={(next) =>
                    updateSetting("timezone", next)
                  }
                />
              </div>

              <p className="mt-4 text-xs text-[#8b7768]">
                INR — Indian Rupee · Asia/Kolkata — IST
              </p>
            </section>

            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={CreditCard}
                title="Commerce & Payments"
                description="Configure tax, artisan commission and available payment methods."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Tax Rate (%)"
                  type="number"
                  value={String(value("tax_rate"))}
                  onChange={(next) => updateSetting("tax_rate", next)}
                />

                <Field
                  label="Commission Rate (%)"
                  type="number"
                  value={String(value("commission_rate"))}
                  onChange={(next) =>
                    updateSetting("commission_rate", next)
                  }
                />
              </div>

              <div className="mt-5 divide-y divide-[#c9a45c]/20">
                <Toggle
                  label="Tax Enabled"
                  description="Apply configured tax rules to marketplace orders."
                  enabled={boolValue("tax_enabled")}
                  onChange={() =>
                    updateSetting(
                      "tax_enabled",
                      !boolValue("tax_enabled"),
                    )
                  }
                />

                <Toggle
                  label="Razorpay Payments"
                  description="Allow customers to pay through Razorpay."
                  enabled={boolValue("razorpay_enabled")}
                  onChange={() =>
                    updateSetting(
                      "razorpay_enabled",
                      !boolValue("razorpay_enabled"),
                    )
                  }
                />

                <Toggle
                  label="Cash on Delivery"
                  description="Allow eligible customers to choose COD."
                  enabled={boolValue("cod_enabled")}
                  onChange={() =>
                    updateSetting(
                      "cod_enabled",
                      !boolValue("cod_enabled"),
                    )
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Control operational notifications sent by the marketplace."
              />

              <div className="divide-y divide-[#c9a45c]/20">
                <Toggle
                  label="Order Confirmations"
                  description="Notify customers when their order is confirmed."
                  enabled={boolValue("order_confirmation")}
                  onChange={() =>
                    updateSetting(
                      "order_confirmation",
                      !boolValue("order_confirmation"),
                    )
                  }
                />

                <Toggle
                  label="Shipping Updates"
                  description="Notify customers about shipping and delivery changes."
                  enabled={boolValue("shipping_updates")}
                  onChange={() =>
                    updateSetting(
                      "shipping_updates",
                      !boolValue("shipping_updates"),
                    )
                  }
                />

                <Toggle
                  label="Customer Reviews"
                  description="Notify administrators when customers submit reviews."
                  enabled={boolValue("customer_reviews")}
                  onChange={() =>
                    updateSetting(
                      "customer_reviews",
                      !boolValue("customer_reviews"),
                    )
                  }
                />

                <Toggle
                  label="Artisan Notifications"
                  description="Send relevant marketplace updates to artisans."
                  enabled={boolValue("artisan_notifications")}
                  onChange={() =>
                    updateSetting(
                      "artisan_notifications",
                      !boolValue("artisan_notifications"),
                    )
                  }
                />

                <Toggle
                  label="Email Notifications"
                  description="Allow operational email notifications."
                  enabled={boolValue("email_notifications")}
                  onChange={() =>
                    updateSetting(
                      "email_notifications",
                      !boolValue("email_notifications"),
                    )
                  }
                />

                <Toggle
                  label="SMS Notifications"
                  description="Allow operational SMS notifications when configured."
                  enabled={boolValue("sms_notifications")}
                  onChange={() =>
                    updateSetting(
                      "sms_notifications",
                      !boolValue("sms_notifications"),
                    )
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={ShieldCheck}
                title="Security & Access"
                description="Control account registration and administrative approval."
              />

              <div className="divide-y divide-[#c9a45c]/20">
                <Toggle
                  label="New Registrations"
                  description="Allow new customer and artisan registrations."
                  enabled={boolValue("new_registrations")}
                  onChange={() =>
                    updateSetting(
                      "new_registrations",
                      !boolValue("new_registrations"),
                    )
                  }
                />

                <Toggle
                  label="Admin Approval"
                  description="Require administrative approval for applicable accounts."
                  enabled={boolValue("admin_approval")}
                  onChange={() =>
                    updateSetting(
                      "admin_approval",
                      !boolValue("admin_approval"),
                    )
                  }
                />
              </div>
            </section>

            <section className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5 shadow-sm sm:p-7">
              <SectionHeader
                icon={Wrench}
                title="Maintenance"
                description="Temporarily restrict marketplace access when maintenance is required."
              />

              <Toggle
                label="Maintenance Mode"
                description="Temporarily place the marketplace into maintenance mode."
                enabled={boolValue("maintenance_mode")}
                onChange={() =>
                  updateSetting(
                    "maintenance_mode",
                    !boolValue("maintenance_mode"),
                  )
                }
              />
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#641f20] p-6 text-[#fffaf0] shadow-sm">
              <Building2 size={22} className="text-[#e4c477]" />

              <h2 className="mt-4 font-serif text-xl font-semibold">
                KALAKRITI Administration
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#f1dfbd]">
                These settings are stored securely in the marketplace
                database and are shared across the administrative system.
              </p>
            </div>

            <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6 shadow-sm">
              <LockKeyhole size={21} className="text-[#8b6828]" />

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
                Administrative Access
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#806b5d]">
                Only authenticated administrators can read or modify these
                marketplace settings.
              </p>
            </div>

            <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6828]">
                Last Updated
              </p>

              <p className="mt-2 text-sm font-medium text-[#531c1d]">
                {new Date(settings.updated_at).toLocaleString("en-IN")}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#641f20] px-6 py-3 text-sm font-semibold text-[#fffaf0] shadow-sm transition hover:bg-[#531c1d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#fffaf0]/30 border-t-[#fffaf0]" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check size={17} />
                Settings Saved
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
