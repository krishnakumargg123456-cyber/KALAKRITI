"use client";

import { create } from "zustand";

interface CheckoutState {
  addressId: number | null;
  paymentMethod: string | null;
  setAddressId: (id: number | null) => void;
  setPaymentMethod: (method: string | null) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  addressId: null,
  paymentMethod: null,

  setAddressId: (addressId) => set({ addressId }),

  setPaymentMethod: (paymentMethod) =>
    set({ paymentMethod }),

  resetCheckout: () =>
    set({
      addressId: null,
      paymentMethod: null,
    }),
}));
