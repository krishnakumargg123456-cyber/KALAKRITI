"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Hand-Painted Madhubani Wall Art",
    craft: "Madhubani",
    region: "Bihar",
    price: 1890,
    rating: 4.9,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Blue Pottery Decorative Bowl",
    craft: "Blue Pottery",
    region: "Rajasthan",
    price: 1450,
    rating: 4.8,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Handwoven Banarasi Silk Dupatta",
    craft: "Banarasi Weaving",
    region: "Uttar Pradesh",
    price: 3290,
    rating: 4.9,
    reviews: 58,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Terracotta Folk Horse",
    craft: "Terracotta",
    region: "West Bengal",
    price: 1190,
    rating: 4.7,
    reviews: 27,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Kutch Embroidered Cushion",
    craft: "Embroidery",
    region: "Gujarat",
    price: 980,
    rating: 4.8,
    reviews: 36,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Hand-Carved Wooden Dhokra Panel",
    craft: "Wood Craft",
    region: "Odisha",
    price: 2450,
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = [
  ["All Crafts", "all"],
  ["Paintings", "paintings"],
  ["Textiles", "textiles"],
  ["Pottery", "pottery"],
  ["Wood Craft", "wood"],
  ["Embroidery", "embroidery"],
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.craft.toLowerCase().includes(search.toLowerCase()) ||
        product.region.toLowerCase().includes(search.toLowerCase());

      let matchesCategory = true;

      if (category === "paintings") {
        matchesCategory = product.craft === "Madhubani";
      }

      if (category === "textiles") {
        matchesCategory =
          product.craft === "Banarasi Weaving" ||
          product.craft === "Embroidery";
      }

      if (category === "pottery") {
        matchesCategory =
          product.craft === "Blue Pottery" ||
          product.craft === "Terracotta";
      }

      if (category === "wood") {
        matchesCategory = product.craft === "Wood Craft";
      }

      if (category === "embroidery") {
        matchesCategory = product.craft === "Embroidery";
      }

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-paper">
        <div className="kalakriti-container px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <Sparkles size={15} />
              The Living Craft Collection
            </div>

            <h1 className="font-serif text-4xl font-bold text-maroon md:text-5xl lg:text-6xl">
              Shop Indian Handicrafts
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-brown md:text-base">
              Discover handmade treasures created by skilled Indian artisans.
              Every piece carries the character of its material, its maker and
              the tradition from which it comes.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-brown"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search crafts, products or regions..."
                className="h-12 w-full border border-border bg-cream pl-11 pr-4 text-sm text-brown outline-none transition focus:border-maroon"
              />
            </div>

            <button
              onClick={() => setShowFilters((value) => !value)}
              className="flex h-12 items-center justify-center gap-2 border border-border bg-cream px-5 text-sm font-semibold text-maroon hover:border-maroon"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-12 w-full appearance-none border border-border bg-cream px-5 pr-11 text-sm font-medium text-brown outline-none md:w-52"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 border border-border bg-cream p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                <Filter size={14} />
                Browse by craft
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map(([label, value]) => (
                  <button
                    key={value}
                    onClick={() => setCategory(value)}
                    className={`border px-4 py-2 text-xs font-semibold transition ${
                      category === value
                        ? "border-maroon bg-maroon text-cream"
                        : "border-border bg-paper text-brown hover:border-maroon hover:text-maroon"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="kalakriti-container px-4 py-10 md:py-14">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Curated for you
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-maroon">
              Handmade Treasures
            </h2>
          </div>

          <p className="text-sm text-brown">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}{" "}
            found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-border bg-paper px-6 py-16 text-center">
            <ShoppingBag className="mx-auto text-gold" size={36} />
            <h3 className="mt-4 font-serif text-2xl font-bold text-maroon">
              No craft found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brown">
              Try another search term or explore all our craft categories.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-6 bg-maroon px-6 py-3 text-sm font-semibold text-cream"
            >
              View All Crafts
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const liked = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden border border-border bg-paper"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e9dfcc]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={
                        liked ? "Remove from wishlist" : "Add to wishlist"
                      }
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/95 text-maroon shadow-sm"
                    >
                      <Heart
                        size={18}
                        fill={liked ? "currentColor" : "none"}
                      />
                    </button>

                    <span className="absolute bottom-3 left-3 bg-maroon px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-cream">
                      {product.craft}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-gold">
                      {product.region}
                    </p>

                    <h3 className="mt-2 min-h-[52px] font-serif text-xl font-bold text-maroon">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-1 text-sm">
                      <Star size={15} fill="currentColor" className="text-gold" />
                      <span className="font-semibold text-brown">
                        {product.rating}
                      </span>
                      <span className="text-brown">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-serif text-xl font-bold text-maroon">
                        ?{product.price.toLocaleString("en-IN")}
                      </span>

                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-2 text-sm font-semibold text-maroon hover:text-gold"
                      >
                        View Piece
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-y border-border bg-maroon">
        <div className="kalakriti-container px-4 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Beyond a purchase
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-cream">
            Every purchase keeps a tradition alive.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-cream/75">
            Choose handmade. Celebrate the maker. Carry a piece of India&apos;s
            living heritage into your home.
          </p>
        </div>
      </section>
    </main>
  );
}
