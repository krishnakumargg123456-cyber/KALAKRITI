"use client";

import { useI18n } from "@/lib/i18n/context";

export default function TopBar() {
  const { messages } = useI18n();

  return (
    <div className="bg-maroon-deep text-white">
      <div className="kalakriti-container flex min-h-9 items-center justify-center px-4 text-center text-xs">
        <p>{messages.home.announcement}</p>
      </div>
    </div>
  );
}