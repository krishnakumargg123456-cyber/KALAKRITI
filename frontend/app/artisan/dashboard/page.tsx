"use client";

import { useAuthStore } from "@/lib/store/auth-store";

import {
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  Info,
  Package,
  ShoppingBag,
  Star,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";

const tools = [
  {
    href: "/artisan/products",
    icon: Package,
    title: "Manage Products",
    description: "View and manage your handmade product listings.",
  },
  {
    href: "/artisan/orders",
    icon: ShoppingBag,
    title: "Manage Orders",
    description: "Review orders available through the verified API.",
  },
  {
    href: "/artisan/earnings",
    icon: Wallet,
    title: "View Earnings",
    description: "Review payout-derived earnings information.",
  },
  {
    href: "/artisan/stories",
    icon: BookOpen,
    title: "Your Stories",
    description: "Create and manage your artisan stories.",
  },
];

export default function ArtisanDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const artisanName = user?.name?.trim() || "Artisan";
  return (
    <ArtisanRouteGuard>
      <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-col gap-5 rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
              <span className="h-px w-7 bg-[#9b772d]" />
              Artisan Studio
            </div>

            <h1 className="font-serif text-3xl font-bold text-[#531c1d] sm:text-4xl">
              Namaste, {artisanName}
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#806b5d]">
              Manage your craft, products, orders, earnings and stories from
              one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/artisan/stories"
              className="inline-flex items-center gap-2 rounded-xl border border-[#c9a45c]/35 bg-[#f8edcf] px-4 py-3 text-sm font-semibold text-[#641f20] transition hover:bg-[#f2e3bd]"
            >
              <BookOpen className="h-4 w-4" />
              Stories
            </Link>

            <Link
              href="/artisan/profile"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a45c]/35 bg-[#fffaf0] text-[#641f20] transition hover:bg-[#f8edcf]"
              aria-label="Artisan profile"
            >
              <Star className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Sales"
            value="—"
            icon={<BarChart3 className="h-5 w-5" />}
          />

          <MetricCard
            label="Orders"
            value="—"
            icon={<ShoppingBag className="h-5 w-5" />}
          />

          <MetricCard
            label="Products"
            value="—"
            icon={<Package className="h-5 w-5" />}
          />

          <MetricCard
            label="Earnings"
            value="—"
            icon={<Wallet className="h-5 w-5" />}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                  Sales Overview
                </h2>

                <p className="mt-1 text-sm text-[#806b5d]">
                  Verified sales analytics are not currently connected to the
                  artisan dashboard.
                </p>
              </div>
            </div>

            <div className="mt-7 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-[#d8c9ad] bg-[#f9f1df] px-6 text-center">
              <BarChart3 className="h-10 w-10 text-[#bca98b]" />

              <h3 className="mt-4 font-semibold text-[#531c1d]">
                Sales analytics unavailable
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#806b5d]">
                No fabricated revenue, growth percentage or chart is shown.
                Sales analytics will appear here when a verified artisan
                analytics contract is available.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#641f20] p-5 text-[#f8edcf] shadow-sm sm:p-6">
            <div className="flex items-center gap-2 text-[#d7bd78]">
              <Star className="h-5 w-5" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Artisan Tools
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-bold">
              Grow your craft
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#eadbb9]">
              Use the verified artisan workspaces to manage your marketplace
              presence.
            </p>

            <div className="mt-6 space-y-3">
              {tools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-4 rounded-xl border border-[#d7bd78]/25 bg-[#531c1d] p-4 transition hover:bg-[#722829]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f8edcf] text-[#641f20]">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {tool.title}
                      </p>

                      <p className="mt-0.5 text-xs leading-5 text-[#decda7]">
                        {tool.description}
                      </p>
                    </div>

                    <ChevronRight className="h-[17px] text-[#d7bd78]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <DashboardCard
            href="/artisan/products"
            icon={<Package className="h-5 w-5" />}
            title="Products"
            description="View your product catalogue and manage existing listings."
            action="Open Products"
          />

          <DashboardCard
            href="/artisan/orders"
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Orders"
            description="Review available artisan order records from the backend."
            action="Open Orders"
          />

          <DashboardCard
            href="/artisan/earnings"
            icon={<Wallet className="h-5 w-5" />}
            title="Earnings & Payouts"
            description="Review payout-derived earnings and payment information."
            action="View Earnings"
          />

          <DashboardCard
            href="/artisan/stories"
            icon={<BookOpen className="h-5 w-5" />}
            title="Artisan Stories"
            description="Share your craft journey and heritage story with customers."
            action="Manage Stories"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
                <Bell className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                  Notifications
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                  Artisan-specific notification analytics and unread counts
                  are not exposed by the verified dashboard contract.
                </p>

                <Link
                  href="/account/notifications"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#641f20] hover:text-[#8b6828]"
                >
                  Open notifications
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fffaf0] p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6f0e3] text-[#47734a]">
                <Star className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-[#531c1d]">
                  Shop Health
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                  Profile completeness, fulfilment percentages and rating
                  summaries are shown only when supplied by a verified
                  backend source.
                </p>

                <div className="mt-5 rounded-xl border border-dashed border-[#d8c9ad] bg-[#f9f1df] p-5">
                  <p className="text-sm font-semibold text-[#531c1d]">
                    Analytics unavailable
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                    No invented percentages or ratings are displayed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 flex gap-3 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9b772d]" />

          <div>
            <h3 className="font-semibold text-[#531c1d]">
              Artisan dashboard analytics contract required
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#806b5d]">
              This dashboard intentionally does not fabricate sales,
              customer counts, order totals, ratings, growth percentages or
              shop-health scores. Existing connected artisan modules remain
              accessible through the workspace cards above.
            </p>
          </div>
        </section>

        <footer className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-[#c9a45c]/25 pt-5 text-xs text-[#806b5d] sm:flex-row sm:items-center">
          <p>KALAKRITI Artisan Studio</p>

          <p>Made with tradition • Crafted with pride</p>
        </footer>
      </div>
    </main>
    </ArtisanRouteGuard>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>

          <p className="mt-2 font-serif text-2xl font-bold text-[#531c1d]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-[#aa9889]">
        Verified backend data unavailable
      </p>
    </div>
  );
}

function DashboardCard({
  href,
  icon,
  title,
  description,
  action,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9b772d]/50 hover:bg-[#fffaf0]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
          {icon}
        </div>

        <ArrowUpRight className="h-5 w-5 text-[#9b772d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <h2 className="mt-5 font-serif text-xl font-bold text-[#531c1d]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#806b5d]">
        {description}
      </p>

      <span className="mt-5 inline-flex text-sm font-semibold text-[#641f20]">
        {action}
      </span>
    </Link>
  );
}


