"use client";

import { useState } from "react";
import {
  Bell,
  BellRing,
  ChevronRight,
  Info,
  Mail,
  Settings2,
  Smartphone,
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [notice, setNotice] = useState("");

  const handleUnavailableAction = (action: string) => {
    setNotice(
      `${action} is not available because the verified admin notification-management API contract is not connected yet.`
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <BellRing className="h-4 w-4" />
                Customer Communication
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Manage the notification area for the KALAKRITI administration
                workspace without displaying unverified campaign data.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleUnavailableAction("Create Notification")}
              className="inline-flex w-fit items-center gap-2 rounded-md border border-[#c9a45c] bg-[#f8edcf] px-5 py-3 text-sm font-semibold text-[#641f20] shadow-sm transition hover:bg-[#f1e3c4]"
            >
              <Bell className="h-4 w-4" />
              Create Notification
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        {notice && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#c9a45c]/40 bg-[#fff8e8] p-4 text-sm text-[#6d5547]">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9b772d]" />
            <p>{notice}</p>
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Campaigns"
            value="—"
            detail="Admin campaign data is not connected"
            icon={<Bell className="h-5 w-5" />}
          />

          <SummaryCard
            label="Scheduled"
            value="—"
            detail="No verified scheduling data available"
            icon={<BellRing className="h-5 w-5" />}
          />

          <SummaryCard
            label="Recipients"
            value="—"
            detail="No verified campaign recipient totals"
            icon={<Smartphone className="h-5 w-5" />}
          />

          <SummaryCard
            label="Delivery"
            value="—"
            detail="No verified campaign analytics"
            icon={<Mail className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
          <div className="border-b border-[#ded1ba] p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-semibold text-[#531c1d]">
              Notification History
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#806b5d]">
              No admin notification campaigns are displayed until a verified
              campaign-management response is available from the backend.
            </p>
          </div>

          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
              <Bell className="h-6 w-6" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
              No verified notification campaigns available
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#806b5d]">
              The current verified notification functionality does not provide
              an admin campaign history contract for this dashboard. No sample
              campaigns, recipients, delivery rates or fabricated activity are
              shown here.
            </p>

            <button
              type="button"
              onClick={() => handleUnavailableAction("Notification history")}
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#c9a45c] px-4 py-2.5 text-xs font-semibold text-[#641f20] hover:bg-[#f3e9d5]"
            >
              Check Notification Data
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
                <Settings2 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-[#531c1d]">
                  Notification Preferences
                </h3>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#806b5d]">
                  Notification preference management is currently handled by
                  the verified platform notification system. This dashboard
                  does not expose unsupported admin-only preference controls.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleUnavailableAction("Notification settings")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#c9a45c] px-4 py-2.5 text-xs font-semibold text-[#641f20] hover:bg-[#f3e9d5]"
            >
              Manage Settings
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#d8c8a8] bg-[#f5ead5] p-5">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9b772d]" />

            <div>
              <h3 className="font-semibold text-[#531c1d]">
                Verified backend boundary
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                This page intentionally avoids inventing notification
                campaigns, recipient counts, delivery percentages, scheduling
                records or send operations. Those values will only appear when
                their corresponding backend contract is confirmed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: number | string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl font-semibold text-[#531c1d]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#988678]">{detail}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}
