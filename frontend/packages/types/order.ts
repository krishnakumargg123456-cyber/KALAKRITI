export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}
