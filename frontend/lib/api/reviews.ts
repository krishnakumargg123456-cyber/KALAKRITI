import api from "./client";

export type Review = {
  id: number;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
};

export type ReviewListResponse = {
  items: Review[];
  total: number;
  skip: number;
  limit: number;
};

export type ReviewCreate = {
  rating: number;
  title?: string | null;
  comment?: string | null;
};

export type ReviewUpdate = {
  rating?: number;
  title?: string | null;
  comment?: string | null;
};

export const reviewsApi = {
  listMine: (params?: { skip?: number; limit?: number }) =>
    api.get<ReviewListResponse>("/reviews/me", {
      params,
    }),

  listByProduct: (
    productId: string,
    params?: { skip?: number; limit?: number },
  ) =>
    api.get<ReviewListResponse>(
      `/reviews/products/${productId}`,
      { params },
    ),

  create: (productId: string, data: ReviewCreate) =>
    api.post<Review>(
      `/reviews/products/${productId}`,
      data,
    ),

  update: (reviewId: number, data: ReviewUpdate) =>
    api.patch<Review>(
      `/reviews/${reviewId}`,
      data,
    ),

  remove: (reviewId: number) =>
    api.delete(`/reviews/${reviewId}`),
};
