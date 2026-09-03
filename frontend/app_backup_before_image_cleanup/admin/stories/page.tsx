"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";

type StoryStatus = "Published" | "Draft" | "Scheduled";

type Story = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  status: StoryStatus;
  date: string;
  readTime: string;
  views: number;
};

const initialStories: Story[] = [
  {
    id: 1,
    title: "The Hands Behind Madhubani",
    excerpt:
      "Discover the generations of artists preserving the intricate visual language of Mithila painting.",
    author: "KALAKRITI Editorial",
    category: "Craft Heritage",
    status: "Published",
    date: "28 Aug 2026",
    readTime: "6 min",
    views: 1842,
  },
  {
    id: 2,
    title: "From Soil to Story: The Terracotta Tradition",
    excerpt:
      "A journey through the hands, earth and traditions that shape India&apos;s beloved terracotta craft.",
    author: "Meera Sharma",
    category: "Artisan Stories",
    status: "Published",
    date: "24 Aug 2026",
    readTime: "8 min",
    views: 1264,
  },
  {
    id: 3,
    title: "Threads of Rajasthan",
    excerpt:
      "Explore the vibrant embroidery traditions carried forward by artisan communities across Rajasthan.",
    author: "KALAKRITI Editorial",
    category: "Traditions",
    status: "Scheduled",
    date: "05 Sep 2026",
    readTime: "7 min",
    views: 0,
  },
  {
    id: 4,
    title: "A Day in the Life of a Blue Pottery Artisan",
    excerpt:
      "Inside the workshop where careful hands turn mineral colours and clay into Jaipur&apos;s iconic blue pottery.",
    author: "Arjun Verma",
    category: "Artisan Stories",
    status: "Draft",
    date: "â€”",
    readTime: "5 min",
    views: 0,
  },
  {
    id: 5,
    title: "Why Handmade Matters",
    excerpt:
      "Understanding the cultural, human and environmental value behind thoughtfully made Indian crafts.",
    author: "KALAKRITI Editorial",
    category: "Journal",
    status: "Published",
    date: "18 Aug 2026",
    readTime: "4 min",
    views: 973,
  },
];

const statusStyles: Record<StoryStatus, string> = {
  Published:
    "border-[#47734d]/30 bg-[#edf4e9] text-[#416344]",
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

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | StoryStatus>(
    "All"
  );
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filteredStories = useMemo(() => {
    const query = search.toLowerCase().trim();

    return stories.filter((story) => {
      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || story.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stories, search, statusFilter]);

  const publishedCount = stories.filter(
    (story) => story.status === "Published"
  ).length;

  const draftCount = stories.filter(
    (story) => story.status === "Draft"
  ).length;

  const scheduledCount = stories.filter(
    (story) => story.status === "Scheduled"
  ).length;

  const totalViews = stories.reduce((sum, story) => sum + story.views, 0);

  const deleteStory = (id: number) => {
    setStories((current) => current.filter((story) => story.id !== id));
    setActiveMenu(null);
  };

  const publishStory = (id: number) => {
    setStories((current) =>
      current.map((story) =>
        story.id === id
          ? {
              ...story,
              status: "Published",
              date: "02 Sep 2026",
            }
          : story
      )
    );
    setActiveMenu(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
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
                thoughtful stories that bring India&apos;s handmade culture closer
                to every visitor.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#fff8e9] shadow-sm transition hover:bg-[#53191a]"
            >
              <Plus size={18} />
              Create Story
            </button>
          </div>
        </div>
      </header>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#9b772d]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Stories"
            value={stories.length.toString()}
            icon={BookOpen}
            detail="Editorial stories in the library"
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
            detail={`${draftCount} drafts Â· ${scheduledCount} scheduled`}
          />

          <StatCard
            label="Total Views"
            value={totalViews.toLocaleString("en-IN")}
            icon={Eye}
            detail="Combined published story views"
          />
        </div>

        {/* Decorative heritage banner */}
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
                  Keep the people, process and heritage at the heart of every
                  editorial piece.
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-[#e6ca83]/25 sm:block" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e6ca83]">
              Crafted in India
            </p>
          </div>
        </div>

        {/* Filters */}
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse">
              <thead>
                <tr className="border-b border-[#c9a45c]/20 bg-[#f8edcf]/45 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Story
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Author
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Category
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Published
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.13em] text-[#806b5d]">
                    Views
                  </th>
                  <th className="w-14 px-5 py-4" />
                </tr>
              </thead>

              <tbody>
                {filteredStories.map((story) => (
                  <tr
                    key={story.id}
                    className="border-b border-[#c9a45c]/15 transition hover:bg-[#fffaf0]"
                  >
                    <td className="px-5 py-5">
                      <div className="flex max-w-md gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                          <BookOpen size={18} strokeWidth={1.6} />
                        </div>

                        <div>
                          <p className="font-serif text-base font-semibold text-[#531c1d]">
                            {story.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#806b5d]">
                            {story.excerpt}
                          </p>
                          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9b772d]">
                            {story.readTime} read
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#5f4d43]">
                        <UserRound size={15} className="text-[#9b772d]" />
                        {story.author}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="rounded-full border border-[#c9a45c]/30 bg-[#f8edcf]/60 px-3 py-1.5 text-xs font-medium text-[#765c29]">
                        {story.category}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[story.status]}`}
                      >
                        <StatusIcon status={story.status} />
                        {story.status}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#806b5d]">
                        <CalendarDays size={15} />
                        {story.date}
                      </div>
                    </td>

                    <td className="px-5 py-5 text-right text-sm font-semibold text-[#531c1d]">
                      {story.views.toLocaleString("en-IN")}
                    </td>

                    <td className="relative px-5 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === story.id ? null : story.id
                          )
                        }
                        className="rounded-md p-2 text-[#806b5d] transition hover:bg-[#f8edcf] hover:text-[#641f20]"
                        aria-label={`Actions for ${story.title}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenu === story.id && (
                        <div className="absolute right-5 top-14 z-20 w-44 overflow-hidden rounded-lg border border-[#c9a45c]/30 bg-[#fffaf0] py-1 shadow-[0_12px_30px_rgba(83,28,29,0.12)]">
                          <button
                            type="button"
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#531c1d] hover:bg-[#f8edcf]/70"
                            onClick={() => setActiveMenu(null)}
                          >
                            <Eye size={15} />
                            Preview
                          </button>

                          <button
                            type="button"
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#531c1d] hover:bg-[#f8edcf]/70"
                            onClick={() => setActiveMenu(null)}
                          >
                            <Edit3 size={15} />
                            Edit Story
                          </button>

                          {story.status !== "Published" && (
                            <button
                              type="button"
                              onClick={() => publishStory(story.id)}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#416344] hover:bg-[#edf4e9]"
                            >
                              <CheckCircle2 size={15} />
                              Publish
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteStory(story.id)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#9a3f3f] hover:bg-[#f9e8e4]"
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

            {filteredStories.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a45c]/35 bg-[#f8edcf] text-[#8b6828]">
                  <BookOpen size={22} />
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                  No stories found
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#806b5d]">
                  Try changing your search or status filter, or create a new
                  story for the KALAKRITI journal.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[#c9a45c]/20 px-5 py-4">
            <p className="text-xs text-[#806b5d]">
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredStories.length}
              </span>{" "}
              of {stories.length} stories
            </p>

            <p className="hidden text-xs text-[#9b772d] sm:block">
              Editorial workspace
            </p>
          </div>
        </section>
      </div>

      {/* Create Story Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#351716]/45 p-5 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-[#c9a45c]/40 bg-[#fbf7ed] shadow-[0_20px_60px_rgba(53,23,22,0.2)]">
            <div className="flex items-start justify-between border-b border-[#c9a45c]/20 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b772d]">
                  Editorial
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[#531c1d]">
                  Create New Story
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md p-2 text-[#806b5d] hover:bg-[#f8edcf] hover:text-[#641f20]"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#531c1d]">
                  Story Title
                </label>
                <input
                  placeholder="Enter story title"
                  className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none focus:border-[#641f20]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#531c1d]">
                  Category
                </label>
                <select className="w-full rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none focus:border-[#641f20]">
                  <option>Artisan Stories</option>
                  <option>Craft Heritage</option>
                  <option>Traditions</option>
                  <option>Journal</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#531c1d]">
                  Short Excerpt
                </label>
                <textarea
                  rows={4}
                  placeholder="Introduce the story..."
                  className="w-full resize-none rounded-md border border-[#c9a45c]/40 bg-[#fffaf0] px-4 py-3 text-sm outline-none focus:border-[#641f20]"
                />
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-[#c9a45c]/25 bg-[#f8edcf]/45 p-4">
                <Sparkles size={17} className="shrink-0 text-[#9b772d]" />
                <p className="text-xs leading-5 text-[#806b5d]">
                  Story creation is currently a frontend mock. The editor,
                  media upload and FastAPI integration will be connected in
                  the next phase.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#c9a45c]/20 px-6 py-5">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md border border-[#c9a45c]/40 px-4 py-2.5 text-sm font-semibold text-[#531c1d] hover:bg-[#f8edcf]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-md bg-[#641f20] px-5 py-2.5 text-sm font-semibold text-[#fff8e9] hover:bg-[#53191a]"
              >
                Create Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}