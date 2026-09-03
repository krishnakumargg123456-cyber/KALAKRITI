import api from "./client";

export const usersApi = {
  getProfile: () =>
    api.get("/users/me"),

  updateProfile: (data: {
    name?: string;
    email?: string;
    phone?: string;
  }) =>
    api.patch("/users/me", data),

  getAddresses: () =>
    api.get("/users/me/addresses"),

  getNotifications: () =>
    api.get("/users/me/notifications"),
};
