"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  slug: string;
  name: string;
  artisan: string;
  craft: string;
  category: string;
  region: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    slug: "madhubani-heritage-artwork",
    name: "Hand-Painted Madhubani Heritage Artwork",
    artisan: "Sita Devi",
    craft: "Madhubani Painting",
    category: "art",
    region: "Bihar",
    price: 2850,
    originalPrice: 3400,
    rating: 4.9,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    slug: "jaipur-blue-pottery-vase",
    name: "Jaipur Blue Pottery Vase",
    artisan: "Mohan Kumar",
    craft: "Blue Pottery",
    category: "home-decor",
    region: "Rajasthan",
    price: 1850,
    rating: 4.8,
    reviews: 26,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    slug: "bagru-block-print-dupatta",
    name: "Bagru Hand Block Printed Dupatta",
    artisan: "Ramesh Lal",
    craft: "Block Printing",
    category: "textiles",
    region: "Rajasthan",
    price: 1450,
    originalPrice: 1750,
    rating: 4.9,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    slug: "dokra-artisan-figurine",
    name: "Traditional Dokra Artisan Figurine",
    artisan: "Bela Devi",
    craft: "Dokra Metal Craft",
    category: "decor",
    region: "Chhattisgarh",
    price: 2150,
    rating: 4.7,
    reviews: 19,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    slug: "banarasi-handwoven-saree",
    name: "Handwoven Banarasi Silk Saree",
    artisan: "Arvind Kumar",
    craft: "Banarasi Weaving",
    category: "textiles",
    region: "Uttar Pradesh",
    price: 7800,
    originalPrice: 9200,
    rating: 5,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1610189022906-4c3bde2f0b5d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    slug: "warli-wall-art",
    name: "Warli Folk Story Wall Art",
    artisan: "Savita Pawar",
    craft: "Warli Painting",
    category: "art",
    region: "Maharashtra",
    price: 2400,
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    slug: "handmade-terracotta-diyas",
    name: "Handmade Terracotta Diya Set",
    artisan: "Kamal Prajapati",
    craft: "Terracotta",
    category: "home-decor",
    region: "West Bengal",
    price: 850,
    rating: 4.8,
    reviews: 47,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    slug: "kutch-embroidery-bag",
    name: "Kutch Hand Embroidered Shoulder Bag",
    artisan: "Meera Ben",
    craft: "Kutch Embroidery",
    category: "accessories",
    region: "Gujarat",
    price: 1650,
    originalPrice: 1950,
    rating: 4.9,
    reviews: 36,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 9,
    slug: "phulkari-hand-embroidered-dupatta",
    name: "Phulkari Hand Embroidered Dupatta",
    artisan: "Harpreet Kaur",
    craft: "Phulkari",
    category: "textiles",
    region: "Punjab",
    price: 2950,
    rating: 4.9,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85",
  },
];

const categoryInfo: Record<
  string,
  {
    title: string;
    description: string;
    eyebrow: string;
  }
> = {
  art: {
    eyebrow: "Indian Art",
    title: "Art That Tells a Story",
    description:
      "Discover paintings and folk artworks shaped by India's rich visual traditions, created by artists who carry these stories forward.",
  },
  textiles: {
    eyebrow: "Indian Textiles",
    title: "Woven With Tradition",
    description:
      "From hand block printing to intricate weaving and embroidery, discover textiles where every pattern carries a piece of heritage.",
  },
  "home-decor": {
    eyebrow: "Home & Living",
    title: "Heritage for Your Home",
    description:
      "Bring warmth and character into your spaces with handmade pottery, lamps, vessels, and decorative pieces from Indian craft communities.",
  },
  decor: {
    eyebrow: "Traditional Decor",
    title: "Objects With Soul",
    description:
      "Handcrafted objects that transform everyday spaces while preserving techniques passed from one generation to the next.",
  },
  accessories: {
    eyebrow: "Accessories",
    title: "Carry Indian Craft",
    description:
      "Thoughtfully made accessories featuring embroidery, textiles, and traditional details from artisan communities across India.",
  },
};

const fallbackCategory = {
  eyebrow: "KALAKRITI Collection",
  title: "Explore Handmade Treasures",
  description:
    "Discover authentic Indian crafts made by skilled artisans and rooted in generations of tradition.",
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CategoryShopPage({
  params,
}: {
  params: { category: string };
}) {
  const categorySlug = decodeURIComponent(params.category).toLowerCase();
  const info = categoryInfo[categorySlug] ?? fallbackCategory;

  const [sort, setSort] = useState("Featured");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categoryProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => product.category === categorySlug
    );

    return [...filtered].sort((a, b) => {
      if (sort === "Price: Low to High") {
        return a.price - b.price;
      }

      if (sort === "Price: High to Low") {
        return b.price - a.price;
      }

      if (sort === "Top Rated") {
        return b.rating - a.rating;
      }

      return a.id - b.id;
    });
  }, [categorySlug, sort]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b08a4a]/25 bg-[#efe4ce]/55">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs text-[#80665d]">
            <Link href="/" className="hover:text-[#8b1e2d]">
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <Link href="/shop" className="hover:text-[#8b1e2d]">
              Shop
            </Link>

            <ChevronRight className="h-3.5 w-3.5" />

            <span className="font-medium capitalize text-[#4a211c]">
              {categorySlug.replaceAll("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/65">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 lg:px-12 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
            {info.eyebrow}
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-4xl font-semibold text-[#4a211c] sm:text-5xl">
            {info.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d5149] sm:text-base">
            {info.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-9 sm:px-8 lg:px-12 lg:py-12">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[#b08a4a]/25 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#80665d]">
              <span className="font-bold text-[#4a211c]">
                {categoryProducts.length}
              </span>{" "}
              handmade{" "}
              {categoryProducts.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#80665d]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 appearance-none rounded-lg border border-[#b08a4a]/35 bg-[#fbf6e9] pl-3 pr-9 text-xs font-semibold text-[#4a211c] outline-none"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-[#80665d]" />
            </div>
          </div>
        </div>

        {/* Product grid */}
        {categoryProducts.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => {
              const liked = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-[#b08a4a]/30 bg-[#fbf6e9] shadow-[0_8px_25px_rgba(67,35,25,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(67,35,25,0.1)]"
                >
                  <div className="relative overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <div className="aspect-[4/4.5] bg-[#efe4ce]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {product.originalPrice && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#8b1e2d] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#fff8eb]">
                        Special Price
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        liked
                          ? "Remove product from wishlist"
                          : "Add product to wishlist"
                      }
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition ${
                        liked
                          ? "border-[#8b1e2d] bg-[#8b1e2d] text-white"
                          : "border-[#b08a4a]/30 bg-[#fbf6e9]/95 text-[#8b1e2d]"
                      }`}
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={liked ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b1e2d]">
                        {product.craft}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-bold text-[#4a211c]">
                        <Star className="h-3.5 w-3.5 fill-[#b08a4a] text-[#b08a4a]" />
                        {product.rating}
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h2 className="mt-2 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#4a211c] transition group-hover:text-[#8b1e2d]">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-1 text-xs text-[#80665d]">
                      By {product.artisan} · {product.region}
                    </p>

                    <div className="mt-4 flex items-end gap-2">
                      <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                        {formatPrice(product.price)}
                      </span>

                      {product.originalPrice && (
                        <span className="text-sm text-[#80665d] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/30 text-xs font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d] hover:text-[#fff8eb]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Explore Piece
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[#b08a4a]/40 bg-[#fbf6e9] px-6 py-20 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-[#8b1e2d]" />

            <h2 className="mt-5 font-serif text-3xl font-semibold text-[#4a211c]">
              This collection is coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6d5149]">
              We are carefully bringing more authentic handmade pieces to this
              collection.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
            >
              Explore All Crafts
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Craft discovery */}
        <section className="mt-14 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#8b1e2d]">
          <div className="px-7 py-9 text-center sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e5c98b]">
              More Than a Product
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#fff8eb] sm:text-3xl">
              Know the hands behind the craft
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#f1dfc9]">
              Every KALAKRITI piece connects you to an artisan, a region, and a
              tradition worth preserving.
            </p>

            <Link
              href="/artisans"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e5c98b] px-6 py-3 text-sm font-bold text-[#4a211c] transition hover:bg-[#f0dcae]"
            >
              Meet Our Artisans
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}