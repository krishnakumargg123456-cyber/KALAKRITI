import api from "./client";

export type AdminSettings = {
  id: number;

  marketplace_name: string;
  support_email: string;
  support_phone?: string | null;

  currency: string;
  language: string;
  timezone: string;

  order_confirmation: boolean;
  shipping_updates: boolean;
  customer_reviews: boolean;
  artisan_notifications: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;

  tax_enabled: boolean;
  tax_rate: string | number;
  commission_rate: string | number;

  cod_enabled: boolean;
  razorpay_enabled: boolean;

  maintenance_mode: boolean;
  new_registrations: boolean;
  admin_approval: boolean;

  created_at: string;
  updated_at: string;
};

export type AdminSettingsUpdate = Partial<
  Omit<AdminSettings, "id" | "created_at" | "updated_at">
>;

export const adminSettingsApi = {
  get: () =>
    api.get<AdminSettings>("/admin/settings"),

  update: (data: AdminSettingsUpdate) =>
    api.patch<AdminSettings>("/admin/settings", data),
};
