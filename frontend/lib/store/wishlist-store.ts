"use client";

import { create } from "zustand";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

type WishlistState = {
  productIds: string[];
  setProductIds: (ids: string[]) => void;
  add: (productId: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],

  setProductIds: (ids) =>
    set({
      productIds: Array.from(new Set(ids)),
    }),

  add: async (productId) => {
    await addToWishlist(productId);

    set((state) => ({
      productIds: state.productIds.includes(productId)
        ? state.productIds
        : [...state.productIds, productId],
    }));
  },

  remove: async (productId) => {
    await removeFromWishlist(productId);

    set((state) => ({
      productIds: state.productIds.filter((id) => id !== productId),
    }));
  },

  has: (productId) =>
    get().productIds.includes(productId),

  clear: () =>
    set({
      productIds: [],
    }),
}));
