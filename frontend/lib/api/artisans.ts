import api from "./client";

export type Artisan = {
  id: string;
  user_id: string;
  shop_name: string;
  bio?: string | null;
  craft_specialization?: string | null;
  state?: string | null;
  district?: string | null;
  is_verified: boolean;
  is_active: boolean;
};

export type ArtisanCreateData = {
  shop_name: string;
  bio?: string | null;
  craft_specialization?: string | null;
  state?: string | null;
  district?: string | null;
};

export type ArtisanUpdateData = Partial<ArtisanCreateData>;

export async function getArtisans() {
  const response = await api.get<Artisan[]>("/artisans");
  return response.data;
}

export async function getArtisan(id: string) {
  const response = await api.get<Artisan>(`/artisans/${id}`);
  return response.data;
}

export async function getMyArtisan() {
  const response = await api.get<Artisan>("/artisans/me");
  return response.data;
}

export async function createMyArtisan(data: ArtisanCreateData) {
  const response = await api.post<Artisan>("/artisans/me", data);
  return response.data;
}

export async function updateMyArtisan(data: ArtisanUpdateData) {
  const response = await api.patch<Artisan>("/artisans/me", data);
  return response.data;
}
