"use client";

import ArtisanRouteGuard from "@/components/artisan/ArtisanRouteGuard";

export default function ArtisanReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArtisanRouteGuard>{children}</ArtisanRouteGuard>;
}