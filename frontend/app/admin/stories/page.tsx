"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserRound,
  XCircle,
  Loader2,
} from "lucide-react";
import api from "@/lib/api/client";

type StoryStatus = "Published" | "Draft" | "Scheduled";

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

type Story = ApiStory & {
  displayStatus: StoryStatus;
  author: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
};

const statusStyles: Record<StoryStatus, string> = {
  Published:
    "border-green-200 bg-green-50 text-green-800",
  Draft:
    "border-[#9b772d]/30 bg-[#f8edcf] text-[#856525]",
  Scheduled:
    "border-[#6a596f]/20 bg-[#eee9f1] text-[#62556a]",
};

function StatusIcon({ status }: { status: StoryStatus }) {
  if (status === "Published") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "Scheduled") {
    return <Clock3 size={14} />;
  }

  return <Edit3 size={14} />;
}

function StatCard({
  label,
  value,
  icon: Icon,
  detail,
}: {
  label: string;
  value: string;
  icon: typeof BookOpen;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_6px_24px_rgba(83,28,29,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#806b5d]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl font-bold text-[#531c1d]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
          <Icon size={19} strokeWidth={1.7} />
        </div>
      </div>

      <p className="mt-3 text-xs text-[#806b5d]">{detail}</p>
    </div>
  );
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
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function normalizeStory(story: ApiStory): Story {
  const displayStatus =
    story.status === "published"
      ? "Published"
      : story.status === "scheduled"
        ? "Scheduled"
        : "Draft";

  return {
    ...story,
    displayStatus,
    author: story.artisan?.shop_name || "Artisan",
    category:
      story.artisan?.craft_specialization || "Artisan Stories",
    date: formatDate(
      story.published_at ||
        story.scheduled_at ||
        story.created_at
    ),
    readTime: calculateReadTime(story.content),
    views: 0,
  };
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | StoryStatus
  >("All");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadStories() {
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

      setStories(response.data.items.map(normalizeStory));
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
    loadStories();
  }, []);

  const filteredStories = useMemo(() => {
    const query = search.toLowerCase().trim();

    return stories.filter((story) => {
      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        story.displayStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stories, search, statusFilter]);

  const publishedCount = stories.filter(
    (story) => story.displayStatus === "Published"
  ).length;

  const draftCount = stories.filter(
    (story) => story.displayStatus === "Draft"
  ).length;

  const scheduledCount = stories.filter(
    (story) => story.displayStatus === "Scheduled"
  ).length;

  async function publishStory(id: string) {
    try {
      setActionId(id);
      setActiveMenu(null);
      setError("");

      const response = await api.patch<ApiStory>(
        `/admin/stories/${id}`,
        {
          status: "published",
        }
      );

      const updatedStory = normalizeStory(response.data);

      setStories((current) =>
        current.map((story) =>
          story.id === id ? updatedStory : story
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

  async function deleteStory(story: Story) {
    const confirmed = window.confirm(
      `Delete "${story.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setActionId(story.id);
      setActiveMenu(null);
      setError("");

      await api.delete(`/admin/stories/${story.id}`);

      setStories((current) =>
        current.filter((item) => item.id !== story.id)
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
    <main
      className="min-h-screen bg-[#f7f0df] text-[#351716]"
      onClick={() => setActiveMenu(null)}
    >
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <span className="h-px w-8 bg-[#9b772d]" />
                Content Studio
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-[#531c1d] sm:text-4xl">
                Stories
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d] sm:text-base">
                Curate artisan journeys, craft heritage, traditions and
                thoughtful stories that bring India&apos;s handmade culture
                closer to every visitor.
              </p>
            </div>

            <Link
              href="/artisan/stories/new"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#fff8e9] shadow-sm transition hover:bg-[#53191a]"
            >
              <Plus size={18} />
              Create Story
            </Link>
          </div>
        </div>
      </header>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#9b772d]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <XCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Stories"
            value={stories.length.toString()}
            icon={BookOpen}
            detail="Stories in the library"
          />

          <StatCard
            label="Published"
            value={publishedCount.toString()}
            icon={CheckCircle2}
            detail="Stories currently visible"
          />

          <StatCard
            label="In Progress"
            value={(draftCount + scheduledCount).toString()}
            icon={Clock3}
            detail={`${draftCount} drafts · ${scheduledCount} scheduled`}
          />

          <StatCard
            label="Total Views"
            value="—"
            icon={Eye}
            detail="View analytics not provided by Story API"
          />
        </div>

        <div className="my-8 overflow-hidden rounded-xl border border-[#c9a45c]/30 bg-[#641f20]">
          <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e6ca83]/40 bg-[#fff8e9]/10 text-[#e6ca83]">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="font-serif text-lg font-semibold text-[#fff8e9]">
                  Every craft carries a story.
                </p>

                <p className="mt-1 text-sm text-[#f3e5c9]/75">
                  Keep the people, process and heritage at the heart of
                  every editorial piece.
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-[#e6ca83]/25 sm:block" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e6ca83]">
              Crafted in India
            </p>
          </div>
        </div>

        <section className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(83,28,29,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[#c9a45c]/20 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                Story Library
              </h2>

              <p className="mt-1 text-sm text-[#806b5d]">
                Manage and review your editorial collection.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search stories..."
                  className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none transition placeholder:text-[#a39382] focus:border-[#641f20] sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#806b5d]"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as "All" | StoryStatus
                    )
                  }
                  className="w-full appearance-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] py-2.5 pl-10 pr-9 text-sm text-[#531c1d] outline-none focus:border-[#641f20] sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#806b5d]">
                <Loader2 className="h-5 w-5 animate-spin text-[#9b772d]" />
                Loading stories...
              </div>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <BookOpen className="h-10 w-10 text-[#9b772d]" />

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                No stories found
              </h3>

              <p className="mt-2 max-w-md text-sm text-[#806b5d]">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-[#c9a45c]/20 bg-[#fffaf0] text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Story
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Author
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Read
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#806b5d]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStories.map((story) => (
                    <tr
                      key={story.id}
                      className="border-b border-[#c9a45c]/15 transition hover:bg-[#fffaf0]"
                    >
                      <td className="max-w-[360px] px-5 py-5">
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f8edcf] text-[#8b6828]">
                            <BookOpen size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-serif text-base font-semibold text-[#531c1d]">
                              {story.title}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#806b5d]">
                              {story.excerpt || "No excerpt provided."}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#531c1d]">
                          <UserRound size={15} className="text-[#9b772d]" />
                          <span>{story.author}</span>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#806b5d]">
                        {story.category}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[story.displayStatus]}`}
                        >
                          <StatusIcon status={story.displayStatus} />
                          {story.displayStatus}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-[#806b5d]">
                          <CalendarDays
                            size={14}
                            className="text-[#9b772d]"
                          />
                          {story.date}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#806b5d]">
                        {story.readTime}
                      </td>

                      <td className="relative px-5 py-5 text-right">
                        {actionId === story.id ? (
                          <Loader2 className="ml-auto h-5 w-5 animate-spin text-[#9b772d]" />
                        ) : (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveMenu(
                                activeMenu === story.id
                                  ? null
                                  : story.id
                              );
                            }}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#c9a45c]/30 text-[#806b5d] transition hover:bg-[#f8edcf] hover:text-[#531c1d]"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        )}

                        {activeMenu === story.id && (
                          <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-5 top-14 z-20 w-48 rounded-lg border border-[#c9a45c]/30 bg-[#fbf7ed] p-1.5 text-left shadow-xl"
                          >
                            {story.displayStatus === "Published" && (
                              <Link
                                href={`/stories/${story.slug}`}
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-[#531c1d] hover:bg-[#f8edcf]"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Eye size={15} />
                                Preview
                              </Link>
                            )}

                            {story.displayStatus !== "Published" && (
                              <button
                                type="button"
                                onClick={() => publishStory(story.id)}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-[#531c1d] hover:bg-[#f8edcf]"
                              >
                                <CheckCircle2 size={15} />
                                Publish
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => deleteStory(story)}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="border-t border-[#c9a45c]/20 px-5 py-4">
            <p className="text-xs text-[#806b5d]">
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredStories.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#531c1d]">
                {stories.length}
              </span>{" "}
              stories
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
