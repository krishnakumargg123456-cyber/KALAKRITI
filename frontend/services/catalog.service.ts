import { productsApi } from "@/lib/api/products";
import { getCategories, getCategory } from "@/lib/api/categories";

export const catalogService = {
  listProducts: (params?: Parameters<typeof productsApi.list>[0]) =>
    productsApi.list(params),

  getProductBySlug: (slug: string) =>
    productsApi.getBySlug(slug),

  getProductById: (id: string) =>
    productsApi.getById(id),

  createProduct: (data: Record<string, unknown>) =>
    productsApi.create(data),

  updateProduct: (id: string, data: Record<string, unknown>) =>
    productsApi.update(id, data),

  deleteProduct: (id: string) =>
    productsApi.remove(id),

  getCategories,

  getCategory,
};
