"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";

interface MobileNavProps {
  onMenuClick?: () => void;
}

export default function MobileNav({
  onMenuClick,
}: MobileNavProps) {
  return (
    <div className="flex items-center gap-1 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link
        href="/search"
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <Search className="h-5 w-5" />
      </Link>

      <Link
        href="/cart"
        aria-label="Shopping bag"
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <ShoppingBag className="h-5 w-5" />
      </Link>
    </div>
  );
}
