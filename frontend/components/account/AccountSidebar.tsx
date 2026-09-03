"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Bell,
  Settings,
  Star,
} from "lucide-react";

const items = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/reviews", label: "My Reviews", icon: Star },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-card border border-border bg-paper p-4 shadow-soft">
      <div className="mb-5 border-b border-border pb-4">
        <p className="font-serif text-xl font-bold text-maroon">
          My Account
        </p>
        <p className="mt-1 text-sm text-muted">
          Manage your Kalakriti journey
        </p>
      </div>

      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-maroon text-white"
                  : "text-ink hover:bg-parchment hover:text-maroon"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
