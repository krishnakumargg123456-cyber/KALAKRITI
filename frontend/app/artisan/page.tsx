"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, Store } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function ArtisanPortalPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user?.role === "artisan") {
      router.replace("/artisan/dashboard");
      return;
    }

    setChecking(false);
  }, [isAuthenticated, user, router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream text-maroon">
        <p className="text-sm font-medium">Opening Artisan Portal...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-16 text-ink">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-2xl border border-gold/40 bg-paper p-8 text-center shadow-card sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-cream">
            <Store className="h-8 w-8 text-maroon" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            KALAKRITI Artisan Portal
          </p>

          <h1 className="font-serif text-4xl font-semibold text-maroon sm:text-5xl">
            Share Your Craft With India
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            Join KALAKRITI and bring your traditional craft to customers
            looking for authentic Indian handmade products.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/artisan/login"
              className="group flex items-center justify-center gap-3 rounded-lg bg-maroon px-6 py-4 font-semibold text-white transition hover:bg-maroon-light"
            >
              <LogIn className="h-5 w-5" />
              Artisan Login
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/artisan/register"
              className="group flex items-center justify-center gap-3 rounded-lg border border-gold px-6 py-4 font-semibold text-maroon transition hover:bg-cream"
            >
              <Store className="h-5 w-5" />
              Register as Artisan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted">
            Already registered? Login to continue to your artisan dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}
