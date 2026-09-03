export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  ARTISANS: "/artisans",
  CRAFT_HERITAGE: "/craft-heritage",
  CART: "/cart",
  WISHLIST: "/wishlist",
  CHECKOUT: "/checkout",
  ACCOUNT: "/account",
  ORDERS: "/orders",
  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  ARTISAN_DASHBOARD: "/artisan/dashboard",
  ADMIN_DASHBOARD: "/admin/dashboard",
} as const;

export const SITE = {
  name: "KALAKRITI",
  tagline: "India's Living Craft Heritage",
  description:
    "Discover authentic Indian handicrafts directly from India's artisan communities.",
  currency: "INR",
  locale: "en-IN",
} as const;
