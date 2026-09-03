"use client";

import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  Heart,
  Bell,
  Star,
  Settings,
  ChevronRight,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

const accountSections = [
  {
    title: "Profile",
    description: "Manage your personal information.",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "My Addresses",
    description: "Manage your saved delivery addresses.",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "My Orders",
    description: "View and track your handcrafted orders.",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Wishlist",
    description: "View products you saved for later.",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Notifications",
    description: "Manage your KALAKRITI notifications.",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    title: "My Reviews",
    description: "View and manage your product reviews.",
    href: "/account/reviews",
    icon: Star,
  },
  {
    title: "Settings",
    description: "Manage your account preferences.",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="kalakriti-container px-4 py-10 md:py-14">

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-deep-maroon/10 bg-white/70 p-7 shadow-sm md:p-10">

          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-gold/20" />
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-gold/20" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              KALAKRITI
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
              My Account
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-brown">
              Manage your profile, orders, addresses, wishlist and
              preferences from one place.
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/shop"
            className="group flex items-center gap-4 rounded-2xl border border-deep-maroon/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-deep-maroon text-cream">
              <ShoppingBag size={21} />
            </div>

            <div>
              <p className="font-semibold text-deep-maroon">
                Continue Shopping
              </p>

              <p className="mt-1 text-xs text-brown/60">
                Explore handcrafted products
              </p>
            </div>

            <ChevronRight
              size={18}
              className="ml-auto text-brown/40 transition group-hover:text-deep-maroon"
            />
          </Link>

          <Link
            href="/account/orders"
            className="group flex items-center gap-4 rounded-2xl border border-deep-maroon/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6eedf] text-deep-maroon">
              <Package size={21} />
            </div>

            <div>
              <p className="font-semibold text-deep-maroon">
                Track Orders
              </p>

              <p className="mt-1 text-xs text-brown/60">
                Check your order status
              </p>
            </div>

            <ChevronRight
              size={18}
              className="ml-auto text-brown/40 transition group-hover:text-deep-maroon"
            />
          </Link>

          <Link
            href="/wishlist"
            className="group flex items-center gap-4 rounded-2xl border border-deep-maroon/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6eedf] text-deep-maroon">
              <Heart size={21} />
            </div>

            <div>
              <p className="font-semibold text-deep-maroon">
                Wishlist
              </p>

              <p className="mt-1 text-xs text-brown/60">
                Your saved crafts
              </p>
            </div>

            <ChevronRight
              size={18}
              className="ml-auto text-brown/40 transition group-hover:text-deep-maroon"
            />
          </Link>

          <Link
            href="/account/addresses"
            className="group flex items-center gap-4 rounded-2xl border border-deep-maroon/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6eedf] text-deep-maroon">
              <MapPin size={21} />
            </div>

            <div>
              <p className="font-semibold text-deep-maroon">
                Addresses
              </p>

              <p className="mt-1 text-xs text-brown/60">
                Delivery addresses
              </p>
            </div>

            <ChevronRight
              size={18}
              className="ml-auto text-brown/40 transition group-hover:text-deep-maroon"
            />
          </Link>

        </section>

        {/* Account Sections */}
        <section className="mt-12">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              Account Management
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-deep-maroon">
              Manage Your Account
            </h2>

            <p className="mt-2 text-brown">
              Everything you need to manage your KALAKRITI experience.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {accountSections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  className="group flex min-h-[150px] flex-col rounded-2xl border border-deep-maroon/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6eedf] text-deep-maroon transition group-hover:bg-deep-maroon group-hover:text-cream">
                      <Icon size={22} />
                    </div>

                    <ChevronRight
                      size={20}
                      className="text-brown/30 transition group-hover:translate-x-1 group-hover:text-deep-maroon"
                    />

                  </div>

                  <h3 className="mt-6 font-serif text-xl font-bold text-deep-maroon">
                    {section.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-brown/70">
                    {section.description}
                  </p>
                </Link>
              );
            })}

          </div>
        </section>

        {/* Trust Section */}
        <section className="mt-14 rounded-2xl border border-gold/30 bg-[#f6eedf] p-7 md:p-9">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-deep-maroon text-cream">
              <ShieldCheck size={27} />
            </div>

            <div>
              <p className="font-serif text-2xl font-bold text-deep-maroon">
                Your KALAKRITI Account
              </p>

              <p className="mt-2 max-w-3xl leading-7 text-brown">
                Your account helps us provide a smoother shopping
                experience while keeping your orders, addresses and
                preferences organized.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
