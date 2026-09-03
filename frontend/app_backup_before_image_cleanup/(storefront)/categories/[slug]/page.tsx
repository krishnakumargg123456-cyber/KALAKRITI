
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

type CategoryData = {
  name: string;
  description: string;
  heritage: string;
  image: string;
};

const categoryData: Record<string, CategoryData> = {
  pottery: {
    name: "Pottery",
    description:
      "Discover handcrafted pottery shaped by Indian artisans using generations-old clay traditions.",
    heritage:
      "Indian pottery is one of the country's oldest craft traditions, with every region carrying its own forms, textures and techniques.",
    image: "/images/products/pottery/pottery-1.jpg",
  },
  handloom: {
    name: "Handloom",
    description:
      "Explore beautifully woven textiles created with patience, skill and traditional Indian weaving techniques.",
    heritage:
      "India's handloom heritage represents centuries of weaving knowledge passed from one generation of artisans to the next.",
    image: "/images/products/handloom/handloom-1.jpg",
  },
  jewellery: {
    name: "Jewellery",
    description:
      "Traditional handcrafted jewellery inspired by India's diverse cultures, communities and artistic traditions.",
    heritage:
      "Indian jewellery traditions reflect regional craftsmanship, symbolism and techniques refined over centuries.",
    image: "/images/products/jewellery/jewellery-1.jpg",
  },
  paintings: {
    name: "Paintings",
    description:
      "Bring India's vibrant folk-art traditions home through handcrafted paintings and artistic expressions.",
    heritage:
      "From Madhubani to regional folk traditions, Indian paintings preserve stories, rituals and everyday life through colour and form.",
    image: "/images/products/paintings/painting-1.jpg",
  },
  "wooden-crafts": {
    name: "Wooden Crafts",
    description:
      "Discover beautifully carved wooden crafts created by skilled artisans using traditional techniques.",
    heritage:
      "Indian woodcraft traditions combine natural materials with intricate carving techniques unique to different regions.",
    image: "/images/products/wooden-crafts/wooden-1.jpg",
  },
  "home-decor": {
    name: "Home Decor",
    description:
      "Add warmth and character to your home with handcrafted pieces inspired by India's artistic heritage.",
    heritage:
      "Indian decorative crafts transform everyday objects into expressions of regional identity and craftsmanship.",
    image: "/images/products/home-decor/home-decor-1.jpg",
    },
  bags: {
    name: "Bags",
    description:
      "Functional handcrafted bags made with traditional materials, patterns and artisan techniques.",
    heritage:
      "Indian textile, embroidery and weaving traditions continue to inspire contemporary handcrafted bags.",
    image: "/images/products/bags/bag-1.jpg",
  },
};

const products = [
  {
    id: 1,
    name: "Handcrafted Heritage Collection",
    price: "â‚¹1,299",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: 2,
    name: "Traditional Artisan Craft",
    price: "â‚¹1,799",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: 3,
    name: "Indian Heritage Handmade",
    price: "â‚¹2,199",
    image: "/images/products/placeholder.jpg",
  },
  {
    id: 4,
    name: "Artisan Signature Piece",
    price: "â‚¹1,599",
    image: "/images/products/placeholder.jpg",
  },
];

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const category = categoryData[slug];

  const [wishlist, setWishlist] = useState<number[]>([]);

  if (!category) {
    return (
      <main className="min-h-screen bg-[#f6efdf] px-6 py-24 text-center text-[#4a1717]">
        <div className="mx-auto max-w-xl">
          <Sparkles className="mx-auto mb-5 text-[#a87528]" size={34} />

          <h1 className="font-serif text-4xl font-semibold">
            Category Not Found
          </h1>

          <p className="mt-4 leading-7 text-[#72594d]">
            The craft category you are looking for could not be found.
          </p>

          <Link
            href="/categories"
            className="mt-8 inline-flex items-center gap-2 bg-[#701f24] px-6 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#f6efdf] text-[#4a1717]">
      {/* Breadcrumb */}
      <div className="border-b border-[#b68b45]/25 bg-[#fffaf0]/60">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#765b4d]">
            <Link href="/" className="hover:text-[#701f24]">
              Home
            </Link>

            <span>/</span>

            <Link href="/categories" className="hover:text-[#701f24]">
              Categories
            </Link>

            <span>/</span>

            <span className="font-medium text-[#701f24]">
              {category.name}
            </span>
          </div>
        </div>
      </div>

      {/* Category Hero */}
      <section className="relative overflow-hidden border-b border-[#b68b45]/30">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden bg-[#e8dcc5]">
            <img
              src={category.image}
              alt={category.name}
              className="h-full min-h-[420px] w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#f1d89d]">
                Indian Craft Heritage
              </span>

              <h2 className="mt-2 font-serif text-4xl font-semibold text-white">
                {category.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center bg-[#fffaf0] px-7 py-14 md:px-12 lg:px-16">
            <div className="max-w-xl">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#96702f]">
                <Sparkles size={17} />
                The Collection
              </div>

              <h1 className="font-serif text-4xl font-semibold md:text-5xl">
                {category.name}
              </h1>

              <div className="mt-5 h-px w-24 bg-[#a87528]" />

              <p className="mt-6 text-base leading-8 text-[#6e5145]">
                {category.description}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#806557]">
                {category.heritage}
              </p>

              <Link
                href="#collection"
                className="mt-8 inline-flex items-center gap-2 bg-[#701f24] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#531419]"
              >
                Explore Collection
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#b68b45]/25 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#96702f]">
              Handpicked For You
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
              {category.name} Collection
            </h2>
          </div>

          <span className="text-sm text-[#806557]">
            {products.length} featured pieces
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="group overflow-hidden border border-[#b68b45]/30 bg-[#fffaf0] shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-[#eadfc9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <button
                    type="button"
                    aria-label={
                      isWishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf0]/90 shadow-sm transition hover:bg-white"
                  >
                    <Heart
                      size={18}
                      className={
                        isWishlisted
                          ? "fill-[#701f24] text-[#701f24]"
                          : "text-[#701f24]"
                      }
                    />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-[#701f24]">
                    {product.price}
                  </p>

                  <button
                    type="button"
                    className="mt-4 flex w-full items-center justify-center gap-2 border border-[#701f24] px-4 py-2.5 text-sm font-semibold text-[#701f24] transition hover:bg-[#701f24] hover:text-white"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Heritage CTA */}
      <section className="border-y border-[#b68b45]/30 bg-[#eadfc9]/45">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <Sparkles className="mx-auto text-[#a87528]" size={25} />

          <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
            Discover the Story Behind the Craft
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e5145] md:text-base">
            Explore the communities, techniques and traditions that make
            India&apos;s craft heritage so extraordinary.
          </p>

          <Link
            href="/craft-heritage"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#701f24] hover:underline"
          >
            Explore Craft Heritage
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}


