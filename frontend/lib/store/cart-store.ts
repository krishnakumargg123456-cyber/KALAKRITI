"use client";

import { create } from "zustand";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/api/cart";

export type CartItem = {
  id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
    slug?: string;
    price: number | string;
    image?: string;
    image_url?: string;
  };
  quantity: number;
};

type CartState = {
  items: CartItem[];
  loading: boolean;
  setItems: (items: CartItem[]) => void;
  loadCart: () => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  totalItems: () => number;
  subtotal: () => number;
};

function normalizeCart(data: any): CartItem[] {
  const raw = Array.isArray(data)
    ? data
    : data?.items ??
      data?.cart_items ??
      data?.cart?.items ??
      data?.data ??
      [];

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((item: any) => ({
      id: String(item.id ?? item.cart_item_id ?? ""),
      product_id: String(
        item.product_id ?? item.product?.id ?? ""
      ),
      product: item.product
        ? {
            id: String(item.product.id),
            name: item.product.name ?? "Product",
            slug: item.product.slug,
            price: item.product.price ?? 0,
            image:
              item.product.image ??
              item.product.image_url ??
              item.product.images?.[0]?.image_url,
            image_url: item.product.image_url,
          }
        : undefined,
      quantity: Number(item.quantity ?? 1),
    }))
    .filter(
      (item: CartItem) =>
        item.id && item.product_id && item.quantity > 0
    );
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  setItems: (items) => set({ items }),

  loadCart: async () => {
    set({ loading: true });

    try {
      const data = await getCart();
      set({ items: normalizeCart(data) });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (item) => {
    await addToCart(Number(item.product_id), item.quantity);

    const data = await getCart();

    set({
      items: normalizeCart(data),
    });
  },

  updateQuantity: async (id, quantity) => {
    if (quantity <= 0) {
      await removeCartItem(id);

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));

      return;
    }

    await updateCartItem(id, quantity);

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  removeItem: async (id) => {
    await removeCartItem(id);

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  clear: async () => {
    await clearCart();
    set({ items: [] });
  },

  totalItems: () =>
    get().items.reduce(
      (total, item) => total + item.quantity,
      0
    ),

  subtotal: () =>
    get().items.reduce(
      (total, item) =>
        total +
        Number(item.product?.price ?? 0) *
          item.quantity,
      0
    ),
}));
