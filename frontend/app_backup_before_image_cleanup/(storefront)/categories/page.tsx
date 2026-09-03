"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  count: string;
};

const categories: Category[] = [
  {
    name: "Pottery",
    slug: "pottery",
    description: "Hand-shaped terracotta, clayware and traditional pottery.",
    image: "/images/products/pottery/pottery-1.jpg",
    count: "Traditional Clay Crafts",
  },
  {
    name: "Handloom",
    slug: "handloom",
    description: "Timeless Indian textiles woven by skilled artisans.",
    image: "/images/products/handloom/handloom-1.jpg",
    count: "Woven Heritage",
  },
  {
    name: "Jewellery",
    slug: "jewellery",
    description: "Traditional handcrafted jewellery inspired by Indian culture.",
    image: "/images/products/jewellery/jewellery-1.jpg",
    count: "Artisan Jewellery",
  },
  {
    name: "Paintings",
    slug: "paintings",
    description: "Madhubani, folk and contemporary Indian art traditions.",
    image: "/images/products/paintings/painting-1.jpg",
    count: "Folk Art",
  },
  {
    name: "Wooden Crafts",
    slug: "wooden-crafts",
    description: "Carved and handcrafted wooden pieces with heritage character.",
    image: "/images/products/wooden-crafts/wooden-1.jpg",
    count: "Woodcraft",
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    description: "Bring Indian craftsmanship and warmth into your home.",
    image: "/images/products/home-decor/home-decor-1.jpg",
    count: "Heritage Decor",
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Handcrafted bags combining traditional techniques with daily use.",
    image: "/images/products/bags/bag-1.jpg",
    count: "Artisan Bags",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#f6efdf] text-[#4a1717]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b68b45]/30">
        <div className="absolute inset-0 bg-[url('/textures/paper.png')] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#b68b45]/50 bg-[#fffaf0]/70 px-4 py-2 text-sm font-medium text-[#76551f]">
            <Sparkles size={16} />
            Discover Indian Craft Traditions
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Explore Our Categories
          </h1>

          <div className="mx-auto mt-5 h-px w-28 bg-[#a87528]" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6e5145] md:text-lg">
            From handwoven textiles to timeless pottery, discover handcrafted
            treasures created by skilled Indian artisans and rooted in centuries
            of tradition.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group overflow-hidden rounded-sm border border-[#b68b45]/35 bg-[#fffaf0] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eadfc9]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                <div className="absolute bottom-4 left-5">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#f3d99a]">
                    {category.count}
                  </span>

                  <h2 className="mt-1 font-serif text-2xl font-semibold text-white">
                    {category.name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="min-h-[52px] text-sm leading-7 text-[#72594d]">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#b68b45]/20 pt-4">
                  <span className="text-sm font-semibold text-[#701f24]">
                    Explore Collection
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b68b45]/40 transition group-hover:bg-[#701f24] group-hover:text-white">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Heritage CTA */}
      <section className="border-y border-[#b68b45]/30 bg-[#eadfc9]/50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#96702f]">
            Beyond Products
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
            Every Craft Carries a Story
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e5145] md:text-base">
            Learn about the regions, communities, techniques and traditions
            behind the crafts you bring home.
          </p>

          <Link
            href="/craft-heritage"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#701f24] px-6 py-3 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#531419]"
          >
            Explore Craft Heritage
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}