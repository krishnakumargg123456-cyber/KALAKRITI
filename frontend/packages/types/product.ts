export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  currency?: string;
  stock?: number;
  categoryId?: string;
  categoryName?: string;
  artisanId?: string;
  artisanName?: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  createdAt?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}
