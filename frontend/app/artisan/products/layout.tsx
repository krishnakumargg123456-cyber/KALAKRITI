"use client";

import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";

export default function ArtisanProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArtisanRouteGuard>{children}</ArtisanRouteGuard>;
}
