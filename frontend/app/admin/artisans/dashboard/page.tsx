"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Package,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

const links = [
  {
    title: "All Artisans",
    description:
      "Review artisan profiles, shop information, verification and account status.",
    href: "/admin/artisans",
    icon: Users,
  },
  {
    title: "Artisan Verification",
    description:
      "Review artisan verification information through the administration workflow.",
    href: "/admin/artisans",
    icon: ShieldCheck,
  },
  {
    title: "Marketplace Dashboard",
    description:
      "View real marketplace-wide users, artisans, products, orders, revenue and inventory metrics.",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Product Management",
    description:
      "Review marketplace products and manage product-level administration.",
    href: "/admin/products",
    icon: Package,
  },
];

export default function AdminArtisanDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-2xl border border-[#c9a45c]/30 bg-[#fbf7ed] px-6 py-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
              <Store size={22} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                Kalakriti Administration
              </p>

              <h1 className="mt-2 font-serif text-3xl font-bold text-[#531c1d] sm:text-4xl">
                Artisan Administration
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Manage artisan records, verification and marketplace activity
                from the administration workspace.
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-[#c9a45c]/30 bg-[#641f20] p-6 text-[#f8edcf] shadow-sm md:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#d7bd78]">
              <CheckCircle2 size={19} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Verified Data Only
              </span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">
              Artisan metrics stay connected to the real administration data.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#eadbb9]">
              This workspace does not display sample sales, customer names,
              ratings, order values or verification results. Those values
              should only be shown when supplied by a verified backend
              endpoint.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-[#d8c8a8] bg-[#fffaf0] p-6 shadow-sm transition hover:border-[#c9a45c] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8edcf] text-[#641f20]">
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-[#9b772d] transition-transform group-hover:translate-x-1"
                  />
                </div>

                <h2 className="mt-5 font-serif text-xl font-bold text-[#531c1d]">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#806b5d]">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </section>

        <section className="mt-8 rounded-2xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <h2 className="font-serif text-xl font-bold text-[#531c1d]">
            Artisan Administration Workflow
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#eadfc9] bg-[#f8edcf]/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                01
              </p>

              <h3 className="mt-2 font-semibold text-[#531c1d]">
                Review
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Inspect artisan profile and shop information.
              </p>
            </div>

            <div className="rounded-xl border border-[#eadfc9] bg-[#f8edcf]/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                02
              </p>

              <h3 className="mt-2 font-semibold text-[#531c1d]">
                Verify
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Handle verification through the administration workflow.
              </p>
            </div>

            <div className="rounded-xl border border-[#eadfc9] bg-[#f8edcf]/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b772d]">
                03
              </p>

              <h3 className="mt-2 font-semibold text-[#531c1d]">
                Manage
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Monitor the artisan&apos;s marketplace presence and products.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 border-t border-[#c9a45c]/25 pt-5 text-center text-xs text-[#806b5d]">
          KALAKRITI · Preserving tradition through responsible digital
          craftsmanship
        </div>
      </div>
    </main>
  );
}
