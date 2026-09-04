"use client";

import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";

export default function ArtisanStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArtisanRouteGuard>{children}</ArtisanRouteGuard>;
}