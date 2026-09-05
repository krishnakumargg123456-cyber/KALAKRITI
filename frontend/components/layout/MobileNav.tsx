"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface MobileNavProps {
  onMenuClick?: () => void;
}

export default function MobileNav({
  onMenuClick,
}: MobileNavProps) {
  const { messages } = useI18n();

  return (
    <div className="flex items-center gap-1 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label={messages.common.openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link
        href="/search"
        aria-label={messages.common.search}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <Search className="h-5 w-5" />
      </Link>

      <Link
        href="/cart"
        aria-label={messages.common.shoppingBag}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
      >
        <ShoppingBag className="h-5 w-5" />
      </Link>
    </div>
  );
}