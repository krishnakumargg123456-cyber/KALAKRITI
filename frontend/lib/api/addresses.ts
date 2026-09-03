import api from "@/lib/api/client";

export type Address = {
  id: number;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  landmark: string | null;
  city: string;
  district: string | null;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type AddressCreate = {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string | null;
  landmark?: string | null;
  city: string;
  district?: string | null;
  state: string;
  postal_code: string;
  country?: string;
  is_default?: boolean;
};

export type AddressUpdate = Partial<AddressCreate>;

export const addressesApi = {
  list: async () => {
    const response = await api.get<Address[]>("/addresses");
    return response.data;
  },

  get: async (id: number) => {
    const response = await api.get<Address>(`/addresses/${id}`);
    return response.data;
  },

  create: async (data: AddressCreate) => {
    const response = await api.post<Address>("/addresses", data);
    return response.data;
  },

  update: async (id: number, data: AddressUpdate) => {
    const response = await api.patch<Address>(
      `/addresses/${id}`,
      data
    );
    return response.data;
  },

  setDefault: async (id: number) => {
    const response = await api.patch<Address>(
      `/addresses/${id}/default`
    );
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/addresses/${id}`);
  },
};
