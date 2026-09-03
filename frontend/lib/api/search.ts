import api from "./client";

export type SearchProductItem = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  compare_at_price?: number | null;
  sku: string;
  material?: string | null;
  craft_region?: string | null;
  is_featured: boolean;
  is_active: boolean;
};

export type SearchResponse = {
  items: SearchProductItem[];
  total: number;
  skip: number;
  limit: number;
  query: string;
};

export const searchApi = {
  products: (q: string, skip = 0, limit = 20) =>
    api.get<SearchResponse>("/search/products", {
      params: { q, skip, limit },
    }),
};
