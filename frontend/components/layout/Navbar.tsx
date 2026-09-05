"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useI18n } from "@/lib/i18n/context";

const links = [
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "artisans", href: "/artisans" },
  { key: "joinAsArtisan", href: "/artisan" },
  { key: "craftHeritage", href: "/craft-heritage" },
  { key: "ourStory", href: "/our-story" },
] as const;

export default function Navbar() {
  const { messages } = useI18n();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        if (mounted) {
          setAuthenticated(false);
          setCheckingAuth(false);
        }
        return;
      }

      try {
        await authApi.me();

        if (mounted) {
          setAuthenticated(true);
        }
      } catch {
        localStorage.removeItem("access_token");

        if (mounted) {
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await authApi.logout();
    setAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <nav className="hidden border-b border-border bg-paper lg:block">
      <div className="kalakriti-container flex min-h-16 items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brown transition-colors hover:text-maroon"
            >
              {messages.navigation[link.key]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {!checkingAuth && !authenticated && (
            <>
              <Link
                href="/auth/login"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-brown transition-colors hover:bg-parchment hover:text-maroon xl:flex"
              >
                <LogIn className="h-4 w-4" />
                {messages.common.login}
              </Link>

              <Link
                href="/auth/register"
                className="hidden items-center gap-2 rounded-full border border-gold px-4 py-2 text-sm font-medium text-maroon transition-colors hover:bg-gold hover:text-cream xl:flex"
              >
                <UserPlus className="h-4 w-4" />
                {messages.common.createAccount}
              </Link>

              <Link
                href="/auth/login"
                aria-label="Login"
                className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon xl:hidden"
              >
                <User className="h-5 w-5" />
              </Link>
            </>
          )}

          {!checkingAuth && authenticated && (
            <>
              <Link
                href="/account"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-brown transition-colors hover:bg-parchment hover:text-maroon xl:flex"
              >
                <User className="h-4 w-4" />
                {messages.common.myAccount}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-brown transition-colors hover:bg-parchment hover:text-maroon xl:flex"
              >
                <LogOut className="h-4 w-4" />
                {messages.common.logout}
              </button>

              <Link
                href="/account"
                aria-label="My Account"
                className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon xl:hidden"
              >
                <User className="h-5 w-5" />
              </Link>
            </>
          )}

          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-parchment hover:text-maroon"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}


