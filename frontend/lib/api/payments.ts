import api from "@/lib/api/client";

export type PaymentMethod = "razorpay" | "upi" | "card" | "cod";

export type Payment = {
  id: number;
  order_id: number;
  amount: number | string;
  currency: string;
  method: string;
  status: string;
  transaction_id?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PaymentCreate = {
  order_id: number;
  amount: number;
  currency?: string;
  method: PaymentMethod;
};

export type PaymentStatusUpdate = {
  status: string;
};

export type RazorpayOrderCreate = {
  order_id: number;
};

export type RazorpayOrderResponse = {
  payment: Payment;
  razorpay_order_id: string;
  razorpay_key_id: string;
  amount: number;
  currency: string;
};

export type RazorpayVerifyRequest = {
  payment_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayVerifyResponse = {
  payment: Payment;
  verified: boolean;
};

export const paymentsApi = {
  create: async (data: PaymentCreate) => {
    const response = await api.post<Payment>("/payments", data);
    return response.data;
  },

  createRazorpayOrder: async (data: RazorpayOrderCreate) => {
    const response = await api.post<RazorpayOrderResponse>(
      "/payments/razorpay/order",
      data,
    );
    return response.data;
  },

  verifyRazorpayPayment: async (data: RazorpayVerifyRequest) => {
    const response = await api.post<RazorpayVerifyResponse>(
      "/payments/razorpay/verify",
      data,
    );
    return response.data;
  },

  get: async (paymentId: number) => {
    const response = await api.get<Payment>(`/payments/${paymentId}`);
    return response.data;
  },

  getByOrder: async (orderId: number) => {
    const response = await api.get<Payment | null>(
      `/payments/orders/${orderId}`,
    );
    return response.data;
  },

  updateStatus: async (
    paymentId: number,
    data: PaymentStatusUpdate,
  ) => {
    const response = await api.patch<Payment>(
      `/payments/${paymentId}/status`,
      data,
    );
    return response.data;
  },
};