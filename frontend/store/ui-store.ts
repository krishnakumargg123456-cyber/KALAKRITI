"use client";

import { create } from "zustand";

interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  closeOverlays: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,

  setMobileMenuOpen: (mobileMenuOpen) =>
    set({ mobileMenuOpen }),

  setSearchOpen: (searchOpen) =>
    set({ searchOpen }),

  closeOverlays: () =>
    set({
      mobileMenuOpen: false,
      searchOpen: false,
    }),
}));
