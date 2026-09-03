import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "@/lib/api/cart";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

export const commerceService = {
  getCart,

  addToCart,

  updateCartItem,

  removeCartItem,

  clearCart,

  getWishlist,

  addToWishlist,

  removeFromWishlist,
};
