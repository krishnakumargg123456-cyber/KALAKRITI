import api from "./client";

export type PayoutStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "cancelled";

export type Payout = {
  id: number;
  artisan_id: string;
  order_id: number;
  gross_amount: string | number;
  commission_amount: string | number;
  net_amount: string | number;
  status: PayoutStatus;
  payout_reference?: string | null;
  failure_reason?: string | null;
  payment_gateway?: string | null;
  transaction_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type PayoutListParams = {
  artisan_id?: string;
  order_id?: number;
  status?: PayoutStatus;
};

export type PayoutCreateData = {
  artisan_id: string;
  order_id: number;
  gross_amount: number;
  commission_amount?: number;
  net_amount: number;
  payment_gateway?: string | null;
};

export type PayoutStatusUpdateData = {
  status: PayoutStatus;
  payout_reference?: string | null;
  transaction_id?: string | null;
  failure_reason?: string | null;
};

export const payoutsApi = {
  list: (params?: PayoutListParams) =>
    api.get<Payout[]>("/admin/payouts", { params }),

  getById: (id: number) =>
    api.get<Payout>(`/admin/payouts/${id}`),

  create: (data: PayoutCreateData) =>
    api.post<Payout>("/admin/payouts", data),

  updateStatus: (id: number, data: PayoutStatusUpdateData) =>
    api.patch<Payout>(`/admin/payouts/${id}/status`, data),
};
