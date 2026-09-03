import api from "./client";

export async function getOrders() {
  const response = await api.get("/orders");
  return response.data;
}

export async function getOrder(id: number | string) {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

export type CreateOrderData = {
  shipping_full_name: string;
  shipping_phone: string;
  shipping_address_line1: string;
  shipping_address_line2?: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country?: string;
  notes?: string | null;
};

export async function createOrder(data: CreateOrderData) {
  const response = await api.post("/orders", data);
  return response.data;
}
