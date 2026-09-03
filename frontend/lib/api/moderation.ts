import api from "./client";

export type ModerationContentType =
  | "Product"
  | "Review"
  | "Artisan"
  | "Story";

export type ModerationStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export type ModerationPriority =
  | "Normal"
  | "High";

export type ModerationItem = {
  id: number;
  content_type: ModerationContentType;
  content_id: string;
  submitted_by?: string | null;
  title: string;
  description?: string | null;
  image_url?: string | null;
  status: ModerationStatus;
  priority: ModerationPriority;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  rejection_reason?: string | null;
  created_at: string;
  updated_at: string;
};

export type ModerationListParams = {
  status?: ModerationStatus;
  content_type?: ModerationContentType;
  priority?: ModerationPriority;
};

export type ModerationCreateData = {
  content_type: ModerationContentType;
  content_id: string;
  submitted_by?: string | null;
  title: string;
  description?: string | null;
  image_url?: string | null;
  priority?: ModerationPriority;
};

export type ModerationRejectData = {
  reason: string;
};

export const moderationApi = {
  list: (params?: ModerationListParams) =>
    api.get<ModerationItem[]>("/admin/moderation", {
      params,
    }),

  getById: (id: number) =>
    api.get<ModerationItem>(`/admin/moderation/${id}`),

  create: (data: ModerationCreateData) =>
    api.post<ModerationItem>("/admin/moderation", data),

  approve: (id: number) =>
    api.patch<ModerationItem>(
      `/admin/moderation/${id}/approve`,
    ),

  reject: (id: number, data: ModerationRejectData) =>
    api.patch<ModerationItem>(
      `/admin/moderation/${id}/reject`,
      data,
    ),
};
