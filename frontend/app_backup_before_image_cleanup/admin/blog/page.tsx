"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Image as ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";

type PostStatus = "Published" | "Draft" | "Scheduled";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  status: PostStatus;
  date: string;
  readTime: string;
  views: number;
  image: string;
};

const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Living Tradition of Madhubani Painting",
    excerpt:
      "Discover the stories, symbols and generations of artists behind one of India's most celebrated folk traditions.",
    category: "Craft Heritage",
    author: "Kalakriti Editorial",
    status: "Published",
    date: "28 Aug 2026",
    readTime: "6 min read",
    views: 2840,
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Meet the Hands Behind Every Handmade Story",
    excerpt:
      "A closer look at the artisans preserving India's traditional crafts through skill, patience and imagination.",
    category: "Artisans",
    author: "Kalakriti Editorial",
    status: "Published",
    date: "22 Aug 2026",
    readTime: "5 min read",
    views: 2165,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Why Handcrafted Brass Belongs in Modern Homes",
    excerpt:
      "From temple traditions to contemporary interiors, explore the timeless appeal of Indian brass craftsmanship.",
    category: "Home & Living",
    author: "Ananya Sharma",
    status: "Scheduled",
    date: "05 Sep 2026",
    readTime: "4 min read",
    views: 0,
    image:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "A Journey Through Rajasthan's Blue Pottery",
    excerpt:
      "Explore the distinctive colours, motifs and techniques that make Jaipur's blue pottery instantly recognisable.",
    category: "Craft Heritage",
    author: "Riya Mehta",
    status: "Draft",
    date: "—",
    readTime: "7 min read",
    views: 0,
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "The Art of Choosing an Authentic Handmade Gift",
    excerpt:
      "Simple ways to identify meaningful craftsmanship and choose a gift that carries a story.",
    category: "Buying Guide",
    author: "Kalakriti Editorial",
    status: "Published",
    date: "12 Aug 2026",
    readTime: "4 min read",
    views: 1742,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Preserving India's Craft Vocabulary",
    excerpt:
      "Why documenting regional techniques and traditional terminology matters for future generations.",
    category: "Heritage",
    author: "Kalakriti Editorial",
    status: "Draft",
    date: "—",
    readTime: "8 min read",
    views: 0,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All Categories",
  "Craft Heritage",
  "Artisans",
  "Home & Living",
  "Buying Guide",
  "Heritage",
];

const statuses = ["All Status", "Published", "Draft", "Scheduled"];

function statusClasses(status: PostStatus) {
  if (status === "Published") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "Scheduled") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-stone-100 text-stone-600 border-stone-200";
}

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Categories" || post.category === category;

      const matchesStatus =
        status === "All Status" || post.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const publishedCount = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const draftCount = posts.filter((post) => post.status === "Draft").length;

  const scheduledCount = posts.filter(
    (post) => post.status === "Scheduled"
  ).length;

  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <div className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <BookOpen className="h-4 w-4" />
                Journal & Stories
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Blog Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#725e51]">
                Create, organise and publish stories that celebrate Indian
                craftsmanship, artisans and living traditions.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#f8edcf] shadow-sm transition hover:bg-[#4e1819]"
            >
              <Plus className="h-4 w-4" />
              New Blog Post
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Published"
            value={publishedCount}
            detail="Live stories"
            icon={<FileText className="h-5 w-5" />}
          />

          <StatCard
            label="Drafts"
            value={draftCount}
            detail="Awaiting review"
            icon={<Edit3 className="h-5 w-5" />}
          />

          <StatCard
            label="Scheduled"
            value={scheduledCount}
            detail="Upcoming stories"
            icon={<CalendarDays className="h-5 w-5" />}
          />

          <StatCard
            label="Total Views"
            value={totalViews.toLocaleString("en-IN")}
            detail="Across published posts"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 rounded-xl border border-[#c9a45c]/35 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.06)]">
          <div className="border-b border-[#d8c9ae] p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#531c1d]">
                  All Stories
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  {filteredPosts.length} stories matching your filters
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8777]" />
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search stories..."
                    className="h-10 w-full rounded-md border border-[#d8c9ae] bg-white/70 pl-9 pr-4 text-sm outline-none transition placeholder:text-[#a69687] focus:border-[#9b772d] sm:w-64"
                  />
                </div>

                <select
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                  className="h-10 rounded-md border border-[#d8c9ae] bg-white/70 px-3 text-sm text-[#5c473b] outline-none focus:border-[#9b772d]"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                  }}
                  className="h-10 rounded-md border border-[#d8c9ae] bg-white/70 px-3 text-sm text-[#5c473b] outline-none focus:border-[#9b772d]"
                >
                  {statuses.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#d8c9ae] bg-[#f6efdf] text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Story
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Category
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Author
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Published
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Views
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[#e2d7c2] last:border-0 hover:bg-[#faf5e9]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex min-w-[340px] items-center gap-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-16 w-24 rounded-md object-cover"
                        />

                        <div>
                          <h3 className="font-serif text-base font-semibold text-[#531c1d]">
                            {post.title}
                          </h3>

                          <div className="mt-1 flex items-center gap-2 text-xs text-[#8a7667]">
                            <Clock3 className="h-3.5 w-3.5" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#685548]">
                      {post.category}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#685548]">
                        <User className="h-4 w-4 text-[#9b772d]" />
                        {post.author}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(
                          post.status
                        )}`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#685548]">
                      {post.date}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-[#685548]">
                        <Eye className="h-4 w-4 text-[#9b772d]" />
                        {post.views.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-1">
                        <ActionButton
                          label="View"
                          icon={<Eye className="h-4 w-4" />}
                        />
                        <ActionButton
                          label="Edit"
                          icon={<Edit3 className="h-4 w-4" />}
                        />
                        <ActionButton
                          label="More"
                          icon={<MoreHorizontal className="h-4 w-4" />}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 p-5 lg:hidden">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-lg border border-[#dccfb8] bg-white/50"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f1e6cf] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8b6828]">
                      {post.category}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                        post.status
                      )}`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold leading-snug text-[#531c1d]">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#786658]">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#806b5d]">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.date}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      {post.views.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-[#e3d8c5] pt-4">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#d4c3a6] px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f7efdf]"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>

                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#641f20] px-3 py-2 text-xs font-semibold text-[#f8edcf] hover:bg-[#4e1819]"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </button>

                    <button
                      type="button"
                      aria-label="Delete post"
                      className="rounded-md border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e5cf] text-[#8d6b2c]">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                No stories found
              </h3>

              <p className="mt-2 text-sm text-[#806b5d]">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-[#d8c9ae] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#806b5d]">
              Showing {filteredPosts.length} of {posts.length} stories
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-md border border-[#d4c3a6] p-2 text-[#705b4c] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-[#641f20] px-2 text-xs font-semibold text-[#f8edcf]">
                {page}
              </span>

              <button
                type="button"
                onClick={() => setPage(page + 1)}
                className="rounded-md border border-[#d4c3a6] p-2 text-[#705b4c]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <InsightCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Editorial Direction"
            text="Keep stories focused on craft heritage, artisan journeys and authentic Indian traditions."
          />

          <InsightCard
            icon={<ImageIcon className="h-5 w-5" />}
            title="Visual Storytelling"
            text="Use high-quality artisan and craft photography to preserve the handmade character of every story."
          />

          <InsightCard
            icon={<TrendingUp className="h-5 w-5" />}
            title="Audience Growth"
            text="Published stories are helping customers discover the people and traditions behind every product."
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl font-semibold text-[#531c1d]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#988678]">{detail}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f0e5d0] hover:text-[#641f20]"
    >
      {icon}
    </button>
  );
}

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#786658]">{text}</p>
    </div>
  );
}