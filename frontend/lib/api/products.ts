import api from "./client";

export type ProductImage = {
  id?: string;
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
  is_primary?: boolean;
};

export type ProductStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "Rejected";

export type Product = {
  id: string;
  artisan_id?: string | null;
  category_id?: string | null;

  name: string;
  slug: string;
  description?: string | null;

  price: string | number;
  compare_at_price?: string | number | null;

  sku?: string | null;
  material?: string | null;
  dimensions?: string | null;
  craft_region?: string | null;

  status?: ProductStatus;

  is_featured?: boolean;
  is_active?: boolean;

  images?: ProductImage[];

  artisan_name?: string | null;
  category_name?: string | null;
};

export type ProductCreateData = {
  category_id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  compare_at_price?: number | null;
  sku: string;
  material?: string | null;
  dimensions?: string | null;
  craft_region?: string | null;
};

export type ProductUpdateData = Partial<ProductCreateData>;

export type ProductListParams = {
  search?: string;
  category_id?: string;
  artisan_id?: string;
  min_price?: number;
  max_price?: number;
  skip?: number;
  limit?: number;
  is_featured?: boolean;
};

export type MyProductParams = {
  skip?: number;
  limit?: number;
  product_status?: ProductStatus;
};

export type ProductImageCreateData = {
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
  is_primary?: boolean;
};

export const productsApi = {
  list: (params?: ProductListParams) =>
    api.get<Product[]>("/products", {
      params,
    }),

  listMine: (params?: MyProductParams) =>
    api.get<Product[]>("/products/me", {
      params,
    }),

  getBySlug: (slug: string) =>
    api.get<Product>(`/products/slug/${slug}`),

  getById: (id: string) =>
    api.get<Product>(`/products/${id}`),

  create: (data: ProductCreateData) =>
    api.post<Product>("/products", data),

  update: (id: string, data: ProductUpdateData) =>
    api.patch<Product>(`/products/${id}`, data),

  remove: (id: string) =>
    api.delete(`/products/${id}`),

  submit: (id: string) =>
    api.post<Product>(`/products/${id}/submit`),

  listImages: (productId: string) =>
    api.get<ProductImage[]>(`/products/${productId}/images`),

  addImage: (
    productId: string,
    data: ProductImageCreateData,
  ) =>
    api.post<ProductImage>(
      `/products/${productId}/images`,
      data,
    ),

  deleteImage: (
    productId: string,
    imageId: string,
  ) =>
    api.delete(
      `/products/${productId}/images/${imageId}`,
    ),
};
