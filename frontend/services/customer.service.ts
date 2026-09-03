import { addressesApi } from "@/lib/api/addresses";
import { usersApi } from "@/lib/api/users";
import { getOrders, getOrder } from "@/lib/api/orders";

export const customerService = {
  getProfile: () =>
    usersApi.getProfile(),

  updateProfile: (data: {
    name?: string;
    email?: string;
    phone?: string;
  }) =>
    usersApi.updateProfile(data),

  getUserAddresses: () =>
    usersApi.getAddresses(),

  getAddresses: () =>
    addressesApi.list(),

  getAddress: (id: number) =>
    addressesApi.get(id),

  createAddress: (data: Parameters<typeof addressesApi.create>[0]) =>
    addressesApi.create(data),

  updateAddress: (
    id: number,
    data: Parameters<typeof addressesApi.update>[1]
  ) =>
    addressesApi.update(id, data),

  setDefaultAddress: (id: number) =>
    addressesApi.setDefault(id),

  deleteAddress: (id: number) =>
    addressesApi.delete(id),

  getOrders,

  getOrder,
};
