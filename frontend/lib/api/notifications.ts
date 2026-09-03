import api from "./client";

export type Notification = {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
};

export type NotificationListResponse = {
  items: Notification[];
  total: number;
  unread_count: number;
};

export const notificationsApi = {
  list: (params?: {
    unread_only?: boolean;
    skip?: number;
    limit?: number;
  }) =>
    api.get<NotificationListResponse>("/notifications", {
      params,
    }),

  getById: (id: number) =>
    api.get<Notification>(`/notifications/${id}`),

  markRead: (id: number) =>
    api.patch<Notification>(
      `/notifications/${id}/read`
    ),

  markAllRead: () =>
    api.patch("/notifications/read-all"),

  remove: (id: number) =>
    api.delete(`/notifications/${id}`),
};
