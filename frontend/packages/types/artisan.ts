export interface Artisan {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  location?: string;
  craft?: string;
  image?: string;
  verified?: boolean;
  rating?: number;
  productCount?: number;
}
