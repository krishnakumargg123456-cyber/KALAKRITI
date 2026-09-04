"use client";

import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";

export default function ArtisanCustomOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArtisanRouteGuard>{children}</ArtisanRouteGuard>;
}