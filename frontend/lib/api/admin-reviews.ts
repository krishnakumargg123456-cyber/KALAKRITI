import api from "./client";

export type AdminReviewStatus =
  | "pending"
  | "published"
  | "flagged"
  | "rejected";

export type AdminReview = {
  id: number;
  product_id: string;
  user_id: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  status: AdminReviewStatus;
  created_at: string;
  updated_at: string;
};

export type AdminReviewListParams = {
  status?: AdminReviewStatus;
  rating?: number;
  skip?: number;
  limit?: number;
};

export type AdminReviewListResponse = {
  items: AdminReview[];
  total: number;
  skip: number;
  limit: number;
};

export type AdminReviewStatusUpdate = {
  status: AdminReviewStatus;
};

export const adminReviewsApi = {
  list: (params?: AdminReviewListParams) =>
    api.get<AdminReviewListResponse>("/admin/reviews", {
      params,
    }),

  getById: (id: number) =>
    api.get<AdminReview>(`/admin/reviews/${id}`),

  updateStatus: (
    id: number,
    data: AdminReviewStatusUpdate,
  ) =>
    api.patch<AdminReview>(
      `/admin/reviews/${id}/status`,
      data,
    ),

  remove: (id: number) =>
    api.delete(`/admin/reviews/${id}`),
};
