"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
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
  Loader2,
  XCircle,
} from "lucide-react";
import api from "@/lib/api/client";

type PostStatus = "Published" | "Draft" | "Scheduled";

type ApiStory = {
  id: string;
  artisan_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  artisan: {
    id: string;
    shop_name: string;
    bio: string | null;
    craft_specialization: string | null;
    state: string | null;
    district: string | null;
    is_verified: boolean;
  };
};

type StoryListResponse = {
  items: ApiStory[];
  total: number;
};

type BlogPost = ApiStory & {
  displayStatus: PostStatus;
  category: string;
  author: string;
  date: string;
  readTime: string;
};

function statusClasses(status: PostStatus) {
  if (status === "Published") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "Scheduled") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-stone-100 text-stone-600 border-stone-200";
}

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function calculateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function normalizeStory(story: ApiStory): BlogPost {
  const displayStatus =
    story.status === "published"
      ? "Published"
      : story.status === "scheduled"
        ? "Scheduled"
        : "Draft";

  return {
    ...story,
    displayStatus,
    category:
      story.artisan?.craft_specialization || "Craft Heritage",
    author:
      story.artisan?.shop_name || "KALAKRITI Editorial",
    date: formatDate(
      story.published_at ||
        story.scheduled_at ||
        story.created_at
    ),
    readTime: calculateReadTime(story.content),
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const pageSize = 10;

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<StoryListResponse>(
        "/admin/stories",
        {
          params: {
            limit: 100,
          },
        }
      );

      setPosts(response.data.items.map(normalizeStory));
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to load stories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const values = Array.from(
      new Set(posts.map((post) => post.category))
    );

    return ["All Categories", ...values];
  }, [posts]);

  const statuses = [
    "All Status",
    "Published",
    "Draft",
    "Scheduled",
  ];

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Categories" ||
        post.category === category;

      const matchesStatus =
        status === "All Status" ||
        post.displayStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, search, category, status]);

  const publishedCount = posts.filter(
    (post) => post.displayStatus === "Published"
  ).length;

  const draftCount = posts.filter(
    (post) => post.displayStatus === "Draft"
  ).length;

  const scheduledCount = posts.filter(
    (post) => post.displayStatus === "Scheduled"
  ).length;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  async function publishPost(post: BlogPost) {
    try {
      setActionId(post.id);
      setError("");

      const response = await api.patch<ApiStory>(
        `/admin/stories/${post.id}`,
        {
          status: "published",
        }
      );

      const updated = normalizeStory(response.data);

      setPosts((current) =>
        current.map((item) =>
          item.id === post.id ? updated : item
        )
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "The story could not be published."
      );
    } finally {
      setActionId(null);
    }
  }

  async function deletePost(post: BlogPost) {
    const confirmed = window.confirm(
      `Delete "${post.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setActionId(post.id);
      setError("");

      await api.delete(`/admin/stories/${post.id}`);

      setPosts((current) =>
        current.filter((item) => item.id !== post.id)
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "The story could not be deleted."
      );
    } finally {
      setActionId(null);
    }
  }

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

            <Link
              href="/artisan/stories/new"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#f8edcf] shadow-sm transition hover:bg-[#4e1819]"
            >
              <Plus className="h-4 w-4" />
              New Story
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <XCircle className="h-5 w-5" />
            {error}
          </div>
        )}

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
            detail="Awaiting publication"
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
            value="—"
            detail="Analytics not available in Story API"
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

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#806b5d]">
                <Loader2 className="h-5 w-5 animate-spin text-[#9b772d]" />
                Loading stories...
              </div>
            </div>
          ) : (
            <>
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
                        Date
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                        Read
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-[#e2d7c2] last:border-0 hover:bg-[#faf5e9]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex min-w-[340px] items-center gap-4">
                            {post.cover_image_url ? (
                              <img
                                src={post.cover_image_url}
                                alt={post.title}
                                className="h-16 w-24 rounded-md object-cover"
                              />
                            ) : (
                              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-md bg-[#f0e4ca] text-[#8b6828]">
                                <BookOpen className="h-6 w-6" />
                              </div>
                            )}

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
                              post.displayStatus
                            )}`}
                          >
                            {post.displayStatus}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-sm text-[#685548]">
                          {post.date}
                        </td>

                        <td className="px-5 py-5 text-sm text-[#685548]">
                          {post.readTime}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-1">
                            {post.displayStatus === "Published" && (
                              <Link
                                href={`/stories/${post.slug}`}
                                aria-label="View story"
                                className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f0e5d0] hover:text-[#641f20]"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                            )}

                            {post.displayStatus !== "Published" && (
                              <button
                                type="button"
                                disabled={actionId === post.id}
                                onClick={() => publishPost(post)}
                                aria-label="Publish story"
                                className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f0e5d0] hover:text-[#641f20] disabled:opacity-40"
                              >
                                {actionId === post.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4" />
                                )}
                              </button>
                            )}

                            <button
                              type="button"
                              disabled={actionId === post.id}
                              onClick={() => deletePost(post)}
                              aria-label="Delete story"
                              className="rounded-md p-2 text-[#806b5d] transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              aria-label="More actions"
                              className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f0e5d0] hover:text-[#641f20]"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-5 lg:hidden">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-lg border border-[#dccfb8] bg-white/50"
                  >
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-[#f0e4ca] text-[#8b6828]">
                        <BookOpen className="h-10 w-10" />
                      </div>
                    )}

                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#f1e6cf] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8b6828]">
                          {post.category}
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                            post.displayStatus
                          )}`}
                        >
                          {post.displayStatus}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold leading-snug text-[#531c1d]">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#786658]">
                        {post.excerpt || "No excerpt provided."}
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
                      </div>

                      <div className="mt-5 flex gap-2 border-t border-[#e3d8c5] pt-4">
                        {post.displayStatus === "Published" && (
                          <Link
                            href={`/stories/${post.slug}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#d4c3a6] px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f7efdf]"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        )}

                        {post.displayStatus !== "Published" && (
                          <button
                            type="button"
                            disabled={actionId === post.id}
                            onClick={() => publishPost(post)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#641f20] px-3 py-2 text-xs font-semibold text-[#f8edcf] hover:bg-[#4e1819] disabled:opacity-50"
                          >
                            {actionId === post.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                            Publish
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={actionId === post.id}
                          onClick={() => deletePost(post)}
                          aria-label="Delete story"
                          className="rounded-md border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {paginatedPosts.length === 0 && (
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
                  Showing {paginatedPosts.length} of{" "}
                  {filteredPosts.length} stories
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPage(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-md border border-[#d4c3a6] p-2 text-[#705b4c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-[#641f20] px-2 text-xs font-semibold text-[#f8edcf]">
                    {currentPage}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage >= totalPages}
                    className="rounded-md border border-[#d4c3a6] p-2 text-[#705b4c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
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
            text="Story view analytics will be shown here when the backend analytics field is available."
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


