"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-40">
      <TopBar />

      <div className="border-b border-border bg-cream">
        <div className="kalakriti-container flex min-h-20 items-center justify-between px-4">
          <Link
            href="/"
            className="group flex flex-col leading-none"
            aria-label="Kalakriti home"
          >
            <span className="font-serif text-2xl font-bold tracking-wide text-maroon md:text-3xl">
              KALAKRITI
            </span>

            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-gold">
              India&apos;s Living Craft Heritage
            </span>
          </Link>

          <MobileNav
            onMenuClick={() =>
              setMobileMenuOpen((current) => !current)
            }
          />
        </div>
      </div>

      <Navbar />

      {mobileMenuOpen && (
        <div className="border-b border-border bg-paper lg:hidden">
          <nav className="kalakriti-container px-4 py-4">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["Artisans", "/artisans"],
              ["Craft Heritage", "/craft-heritage"],
              ["Our Story", "/our-story"],
              ["Wishlist", "/wishlist"],
              ["Account", "/account"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-border py-3 font-serif text-base text-brown last:border-b-0 hover:text-maroon"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
