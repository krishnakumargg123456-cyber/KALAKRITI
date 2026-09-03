import api from "./client";

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

export async function getCategory(slug: string) {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
}

export const categoriesApi = {
  list: async () => {
    const response = await api.get("/categories");
    return response;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response;
  },
};
