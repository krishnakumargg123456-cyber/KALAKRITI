"use client";

import { useState } from "react";
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

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    marketplaceName: "KALAKRITI",
    supportEmail: "support@kalakriti.in",
    supportPhone: "+91 98765 43210",
    currency: "INR",
    language: "English",
    timezone: "Asia/Kolkata",

    orderConfirmation: true,
    shippingUpdates: true,
    customerReviews: true,
    artisanNotifications: true,

    emailNotifications: true,
    smsNotifications: false,

    taxEnabled: true,
    taxRate: "5",
    commissionRate: "15",

    codEnabled: true,
    razorpayEnabled: true,

    maintenanceMode: false,
    newRegistrations: true,
    adminApproval: true,
  });

  const updateSetting = (
    key: keyof typeof settings,
    value: string | boolean
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
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
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <span className="h-px w-8 bg-[#9b772d]" />
                Administration
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#531c1d] sm:text-4xl">
                Marketplace Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d] sm:text-base">
                Configure the identity, commerce rules, notifications,
                security and operational preferences of KALAKRITI.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#fff8e9] shadow-sm transition hover:bg-[#53191a]"
            >
              {saved ? <Check size={17} /> : <Save size={17} />}
              {saved ? "Changes Saved" : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      {/* Decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#9b772d]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid gap-7 xl:grid-cols-[1fr_320px]">
          <div className="space-y-7">
            {/* Store Identity */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <SectionHeader
                icon={Store}
                title="Store Identity"
                description="Basic information displayed across the marketplace."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Marketplace Name
                  </span>
                  <input
                    value={settings.marketplaceName}
                    onChange={(e) =>
                      updateSetting("marketplaceName", e.target.value)
                    }
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none transition focus:border-[#641f20] focus:ring-2 focus:ring-[#641f20]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Support Email
                  </span>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      updateSetting("supportEmail", e.target.value)
                    }
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none transition focus:border-[#641f20] focus:ring-2 focus:ring-[#641f20]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Support Phone
                  </span>
                  <input
                    value={settings.supportPhone}
                    onChange={(e) =>
                      updateSetting("supportPhone", e.target.value)
                    }
                    className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none transition focus:border-[#641f20] focus:ring-2 focus:ring-[#641f20]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Default Language
                  </span>
                  <div className="relative">
                    <select
                      value={settings.language}
                      onChange={(e) =>
                        updateSetting("language", e.target.value)
                      }
                      className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none focus:border-[#641f20]"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806b5d]"
                    />
                  </div>
                </label>
              </div>
            </section>

            {/* Regional */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <SectionHeader
                icon={Globe2}
                title="Regional Preferences"
                description="Control currency and regional settings used throughout the store."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Currency
                  </span>
                  <div className="relative">
                    <select
                      value={settings.currency}
                      onChange={(e) =>
                        updateSetting("currency", e.target.value)
                      }
                      className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none focus:border-[#641f20]"
                    >
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806b5d]"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Timezone
                  </span>
                  <div className="relative">
                    <select
                      value={settings.timezone}
                      onChange={(e) =>
                        updateSetting("timezone", e.target.value)
                      }
                      className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm text-[#351716] outline-none focus:border-[#641f20]"
                    >
                      <option value="Asia/Kolkata">
                        Asia/Kolkata — IST
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#806b5d]"
                    />
                  </div>
                </label>
              </div>
            </section>

            {/* Commerce */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <SectionHeader
                icon={CreditCard}
                title="Commerce & Payments"
                description="Manage marketplace commission, taxation and accepted payment methods."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Marketplace Commission
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.commissionRate}
                      onChange={(e) =>
                        updateSetting("commissionRate", e.target.value)
                      }
                      className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 pr-10 text-sm text-[#351716] outline-none focus:border-[#641f20]"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#806b5d]">
                      %
                    </span>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#531c1d]">
                    Tax Rate
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.taxRate}
                      onChange={(e) =>
                        updateSetting("taxRate", e.target.value)
                      }
                      className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 pr-10 text-sm text-[#351716] outline-none focus:border-[#641f20]"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#806b5d]">
                      %
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-5 border-t border-[#c9a45c]/20 pt-2">
                <Toggle
                  label="Tax Calculation"
                  description="Automatically calculate applicable taxes during checkout."
                  enabled={settings.taxEnabled}
                  onChange={() =>
                    updateSetting("taxEnabled", !settings.taxEnabled)
                  }
                />

                <Toggle
                  label="Razorpay Payments"
                  description="Allow customers to pay through supported online payment methods."
                  enabled={settings.razorpayEnabled}
                  onChange={() =>
                    updateSetting(
                      "razorpayEnabled",
                      !settings.razorpayEnabled
                    )
                  }
                />

                <Toggle
                  label="Cash on Delivery"
                  description="Allow eligible customers to place cash-on-delivery orders."
                  enabled={settings.codEnabled}
                  onChange={() =>
                    updateSetting("codEnabled", !settings.codEnabled)
                  }
                />
              </div>
            </section>

            {/* Notifications */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <SectionHeader
                icon={Bell}
                title="Notifications"
                description="Choose which marketplace events should trigger notifications."
              />

              <Toggle
                label="Order Confirmations"
                description="Notify customers when their order has been successfully placed."
                enabled={settings.orderConfirmation}
                onChange={() =>
                  updateSetting(
                    "orderConfirmation",
                    !settings.orderConfirmation
                  )
                }
              />

              <Toggle
                label="Shipping Updates"
                description="Send updates when an order is packed, shipped or delivered."
                enabled={settings.shippingUpdates}
                onChange={() =>
                  updateSetting(
                    "shippingUpdates",
                    !settings.shippingUpdates
                  )
                }
              />

              <Toggle
                label="Customer Reviews"
                description="Notify administrators when customers submit new reviews."
                enabled={settings.customerReviews}
                onChange={() =>
                  updateSetting(
                    "customerReviews",
                    !settings.customerReviews
                  )
                }
              />

              <Toggle
                label="Artisan Notifications"
                description="Notify artisans about relevant orders and marketplace activity."
                enabled={settings.artisanNotifications}
                onChange={() =>
                  updateSetting(
                    "artisanNotifications",
                    !settings.artisanNotifications
                  )
                }
              />

              <Toggle
                label="Email Notifications"
                description="Enable transactional and administrative email notifications."
                enabled={settings.emailNotifications}
                onChange={() =>
                  updateSetting(
                    "emailNotifications",
                    !settings.emailNotifications
                  )
                }
              />

              <Toggle
                label="SMS Notifications"
                description="Enable SMS notifications for supported marketplace events."
                enabled={settings.smsNotifications}
                onChange={() =>
                  updateSetting(
                    "smsNotifications",
                    !settings.smsNotifications
                  )
                }
              />
            </section>

            {/* Security */}
            <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-[0_8px_30px_rgba(83,28,29,0.05)] sm:p-8">
              <SectionHeader
                icon={ShieldCheck}
                title="Security & Access"
                description="Control registration and administrative approval policies."
              />

              <Toggle
                label="New User Registrations"
                description="Allow new customers and marketplace users to create accounts."
                enabled={settings.newRegistrations}
                onChange={() =>
                  updateSetting(
                    "newRegistrations",
                    !settings.newRegistrations
                  )
                }
              />

              <Toggle
                label="Admin Approval"
                description="Require administrative approval for sensitive marketplace accounts."
                enabled={settings.adminApproval}
                onChange={() =>
                  updateSetting("adminApproval", !settings.adminApproval)
                }
              />
            </section>

            {/* Maintenance */}
            <section className="rounded-xl border border-[#9b772d]/40 bg-[#f8edcf] p-6 sm:p-8">
              <SectionHeader
                icon={Wrench}
                title="Maintenance Mode"
                description="Temporarily restrict storefront activity while maintenance is being performed."
              />

              <div className="rounded-lg border border-[#9b772d]/30 bg-[#fbf7ed]/70 px-5">
                <Toggle
                  label="Enable Maintenance Mode"
                  description="Visitors will see a maintenance message instead of the normal marketplace."
                  enabled={settings.maintenanceMode}
                  onChange={() =>
                    updateSetting(
                      "maintenanceMode",
                      !settings.maintenanceMode
                    )
                  }
                />
              </div>
            </section>
          </div>

          {/* Side information */}
          <aside className="space-y-6">
            <div className="sticky top-6 rounded-xl border border-[#c9a45c]/30 bg-[#641f20] p-6 text-[#fff8e9] shadow-[0_12px_35px_rgba(83,28,29,0.12)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7bb77]/40 bg-[#fff8e9]/10 text-[#e6ca83]">
                <Building2 size={21} strokeWidth={1.6} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e6ca83]">
                KALAKRITI
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold">
                Marketplace Control
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#f3e5c9]/80">
                These settings are currently stored locally as frontend
                configuration. They will be connected to the FastAPI
                administration API later.
              </p>

              <div className="mt-6 border-t border-[#f3e5c9]/15 pt-5">
                <div className="flex items-center gap-3">
                  <LockKeyhole size={17} className="text-[#e6ca83]" />
                  <span className="text-sm text-[#f3e5c9]/90">
                    Admin-only configuration
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Check size={17} className="text-[#e6ca83]" />
                  <span className="text-sm text-[#f3e5c9]/90">
                    Frontend configuration ready
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-md border border-[#e6ca83]/50 bg-[#fff8e9]/10 px-4 py-3 text-sm font-semibold text-[#fff8e9] transition hover:bg-[#fff8e9]/15"
              >
                {saved ? <Check size={16} /> : <Save size={16} />}
                {saved ? "Saved Successfully" : "Save Configuration"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}