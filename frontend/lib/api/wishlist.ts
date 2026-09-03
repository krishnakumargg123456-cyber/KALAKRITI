import api from "./client";

export async function getWishlist() {
  const response = await api.get("/wishlist");
  return response.data;
}

export async function addToWishlist(productId: number | string) {
  const response = await api.post(`/wishlist/items/${productId}`);
  return response.data;
}

export async function removeFromWishlist(productId: number | string) {
  const response = await api.delete(`/wishlist/items/${productId}`);
  return response.data;
}
