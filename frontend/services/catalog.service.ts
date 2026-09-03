import { productsApi, ProductCreateData, ProductUpdateData } from "@/lib/api/products";
import { getCategories, getCategory } from "@/lib/api/categories";

export const catalogService = {
  listProducts: (params?: Parameters<typeof productsApi.list>[0]) =>
    productsApi.list(params),

  getProductBySlug: (slug: string) =>
    productsApi.getBySlug(slug),

  getProductById: (id: string) =>
    productsApi.getById(id),

  createProduct: (data: ProductCreateData) =>
    productsApi.create(data),

  updateProduct: (id: string, data: ProductUpdateData) =>
    productsApi.update(id, data),

  deleteProduct: (id: string) =>
    productsApi.remove(id),

  getCategories,

  getCategory,
};