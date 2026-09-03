"use client";

import {
  Check,
  CheckCircle2,
  ChevronDown,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trash2,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

type ReviewStatus = "Published" | "Pending" | "Flagged" | "Rejected";

type Review = {
  id: string;
  customer: string;
  product: string;
  artisan: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: ReviewStatus;
  helpful: number;
};

const reviews: Review[] = [
  {
    id: "REV-8421",
    customer: "Meera Kapoor",
    product: "Banarasi Silk Dupatta",
    artisan: "Savitri Devi",
    rating: 5,
    title: "Absolutely beautiful craftsmanship",
    comment:
      "The weaving and colours are even more beautiful in person. You can truly see the handwork in every detail.",
    date: "02 Sep 2026",
    status: "Published",
    helpful: 18,
  },
  {
    id: "REV-8420",
    customer: "Aarav Sharma",
    product: "Blue Pottery Tea Set",
    artisan: "Ramesh Lal",
    rating: 5,
    title: "A wonderful handmade piece",
    comment:
      "The finish is excellent and the traditional design looks beautiful on our dining table.",
    date: "02 Sep 2026",
    status: "Published",
    helpful: 12,
  },
  {
    id: "REV-8419",
    customer: "Ishita Singh",
    product: "Madhubani Wall Art",
    artisan: "Laxmi Bai",
    rating: 4,
    title: "Lovely artwork",
    comment:
      "The colours are vibrant and the artwork adds a beautiful traditional touch to the room.",
    date: "01 Sep 2026",
    status: "Pending",
    helpful: 7,
  },
  {
    id: "REV-8418",
    customer: "Kabir Malhotra",
    product: "Dhokra Elephant Sculpture",
    artisan: "Kamal Singh",
    rating: 2,
    title: "Not as expected",
    comment:
      "The product arrived safely, but the finish was different from what I expected from the photos.",
    date: "01 Sep 2026",
    status: "Flagged",
    helpful: 3,
  },
  {
    id: "REV-8417",
    customer: "Ananya Gupta",
    product: "Chikankari Kurta",
    artisan: "Farida Begum",
    rating: 5,
    title: "Elegant and comfortable",
    comment:
      "The embroidery is delicate and the fabric feels comfortable. Very happy with this purchase.",
    date: "31 Aug 2026",
    status: "Published",
    helpful: 15,
  },
  {
    id: "REV-8416",
    customer: "Rohan Verma",
    product: "Terracotta Diya Set",
    artisan: "Mohan Prajapati",
    rating: 1,
    title: "Inappropriate content",
    comment:
      "This review contains content that does not relate to the purchased product.",
    date: "30 Aug 2026",
    status: "Rejected",
    helpful: 0,
  },
  {
    id: "REV-8415",
    customer: "Diya Mehta",
    product: "Phulkari Handbag",
    artisan: "Anita Kumari",
    rating: 5,
    title: "So much detail",
    comment:
      "The embroidery is gorgeous. I love that every piece feels unique and handmade.",
    date: "29 Aug 2026",
    status: "Published",
    helpful: 21,
  },
];

const statusStyles: Record<
  ReviewStatus,
  { className: string; icon: React.ReactNode }
> = {
  Published: {
    className: "bg-[#e7f2e6] text-[#35613a] border-[#8bb58b]/40",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  Pending: {
    className: "bg-[#fff3d7] text-[#8b6828] border-[#d2a94d]/40",
    icon: <MessageSquare className="h-3.5 w-3.5" />,
  },
  Flagged: {
    className: "bg-[#f9e8df] text-[#985239] border-[#d5a18b]/40",
    icon: <Flag className="h-3.5 w-3.5" />,
  },
  Rejected: {
    className: "bg-[#f9e5e2] text-[#9b3d35] border-[#d99a91]/40",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | ReviewStatus
  >("All");
  const [ratingFilter, setRatingFilter] = useState<"All" | string>("All");

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        !query ||
        review.customer.toLowerCase().includes(query) ||
        review.product.toLowerCase().includes(query) ||
        review.artisan.toLowerCase().includes(query) ||
        review.title.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || review.status === statusFilter;

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [search, statusFilter, ratingFilter]);

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      {/* Header */}
      <section className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                <MessageSquare className="h-4 w-4" />
                Customer Voice
              </div>

              <h1 className="font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Reviews
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Moderate customer feedback, protect marketplace quality and
                help artisans build trust through authentic reviews.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#c9a45c]/30 bg-[#fffaf0] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5e8d0] text-[#9b772d]">
                <Star className="h-4 w-4 fill-current" />
              </div>

              <div>
                <p className="text-xs text-[#9a8878]">Marketplace Rating</p>
                <p className="text-sm font-bold text-[#531c1d]">
                  4.7 / 5.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Reviews"
            value="2,486"
            detail="+12.4% this month"
            icon={<MessageSquare className="h-5 w-5" />}
            tone="maroon"
          />

          <SummaryCard
            label="Published"
            value="2,318"
            detail="93.2% of all reviews"
            icon={<CheckCircle2 className="h-5 w-5" />}
            tone="green"
          />

          <SummaryCard
            label="Awaiting Review"
            value="126"
            detail="Needs moderation"
            icon={<MessageSquare className="h-5 w-5" />}
            tone="gold"
          />

          <SummaryCard
            label="Flagged"
            value="42"
            detail="Requires attention"
            icon={<Flag className="h-5 w-5" />}
            tone="red"
          />
        </section>

        {/* Rating distribution */}
        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Rating Overview
            </h2>
            <p className="text-sm text-[#806b5d]">
              Customer sentiment across the KALAKRITI marketplace.
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#dfd2ba] bg-[#fdf8ed] p-6">
              <div className="flex items-center gap-2">
                <Star className="h-7 w-7 fill-[#9b772d] text-[#9b772d]" />
                <span className="font-serif text-4xl font-bold text-[#531c1d]">
                  4.7
                </span>
              </div>

              <div className="mt-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#9b772d] text-[#9b772d]"
                  />
                ))}
              </div>

              <p className="mt-3 text-xs text-[#806b5d]">
                Based on 2,486 reviews
              </p>
            </div>

            <div className="space-y-3">
              <RatingBar rating={5} percentage={78} count="1,938" />
              <RatingBar rating={4} percentage={15} count="373" />
              <RatingBar rating={3} percentage={4} count="99" />
              <RatingBar rating={2} percentage={2} count="50" />
              <RatingBar rating={1} percentage={1} count="26" />
            </div>
          </div>
        </section>

        {/* Review moderation */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
              Review Moderation
            </h2>
            <p className="mt-1 text-sm text-[#806b5d]">
              Review customer feedback before it reaches the public marketplace.
            </p>
          </div>

          <div className="rounded-t-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-4">
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a18e7e]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customer, product, artisan or review..."
                  className="w-full rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-10 pr-4 text-sm text-[#351716] outline-none placeholder:text-[#aa9889] focus:border-[#9b772d] focus:ring-2 focus:ring-[#9b772d]/10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <FilterSelect
                  value={statusFilter}
                  onChange={(value) =>
                    setStatusFilter(value as "All" | ReviewStatus)
                  }
                  options={[
                    "All",
                    "Published",
                    "Pending",
                    "Flagged",
                    "Rejected",
                  ]}
                />

                <FilterSelect
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  options={["All", "5", "4", "3", "2", "1"]}
                  prefix="Rating"
                />
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] lg:block">
            <div className="divide-y divide-[#eadfce]">
              {filteredReviews.map((review) => (
                <ReviewRow key={review.id} review={review} />
              ))}
            </div>

            {filteredReviews.length === 0 && <EmptyReviews />}
          </div>

          {/* Mobile */}
          <div className="space-y-3 rounded-b-2xl border-x border-b border-[#c9a45c]/25 bg-[#fffaf0] p-4 lg:hidden">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <EmptyReviews />
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[#806b5d] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-[#531c1d]">
                {filteredReviews.length}
              </span>{" "}
              of {reviews.length} reviews
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-lg border border-[#d8c9ad] bg-[#f6eedf] px-3 py-2 text-xs font-medium text-[#aa9889]"
              >
                Previous
              </button>

              <span className="rounded-lg bg-[#641f20] px-3 py-2 text-xs font-semibold text-[#fff8e9]">
                1
              </span>

              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20]"
              >
                2
              </button>

              <button
                type="button"
                className="rounded-lg border border-[#d8c9ad] bg-[#fffaf0] px-3 py-2 text-xs font-medium text-[#641f20]"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Moderation guidelines */}
        <section className="mt-7 rounded-2xl border border-[#c9a45c]/25 bg-[#f8edcf]/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#641f20] text-[#f8edcf]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#531c1d]">
                Review moderation principles
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#806b5d]">
                Keep reviews authentic and useful. Remove spam, abusive
                content, personal information and content unrelated to the
                purchased product while preserving genuine negative feedback.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Authentic feedback",
                  "No personal information",
                  "No abusive content",
                  "Product relevant",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a45c]/30 bg-[#fffaf0] px-3 py-1.5 text-xs font-medium text-[#665448]"
                  >
                    <Check className="h-3 w-3 text-[#47734a]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  tone: "maroon" | "green" | "gold" | "red";
}) {
  const iconClass =
    tone === "maroon"
      ? "bg-[#f2dfd8] text-[#641f20]"
      : tone === "green"
        ? "bg-[#e5efe2] text-[#416846]"
        : tone === "gold"
          ? "bg-[#f8edcf] text-[#8b6828]"
          : "bg-[#f9e5e2] text-[#9b3d35]";

  return (
    <div className="rounded-2xl border border-[#c9a45c]/25 bg-[#fffaf0] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#806b5d]">{label}</p>
          <p className="mt-2 text-2xl font-bold text-[#531c1d]">{value}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-[#9a8878]">{detail}</p>
    </div>
  );
}

function RatingBar({
  rating,
  percentage,
  count,
}: {
  rating: number;
  percentage: number;
  count: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex w-8 items-center gap-1 text-sm font-semibold text-[#531c1d]">
        {rating}
        <Star className="h-3 w-3 fill-[#9b772d] text-[#9b772d]" />
      </div>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e8ddc8]">
        <div
          className="h-full rounded-full bg-[#9b772d]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="w-14 text-right text-xs text-[#806b5d]">
        {count}
      </span>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  prefix,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  prefix?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-[#d8c9ad] bg-[#fffdf7] py-2.5 pl-4 pr-10 text-sm text-[#531c1d] outline-none focus:border-[#9b772d] sm:min-w-[155px]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {prefix && option === "All"
              ? `All ${prefix}s`
              : prefix && option !== "All"
                ? `${option} ${prefix}`
                : option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5d]" />
    </div>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.icon}
      {status}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating
              ? "fill-[#9b772d] text-[#9b772d]"
              : "text-[#d4c6ae]"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <div className="p-5 transition hover:bg-[#fdf8ed]">
      <div className="flex gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3e6d0] text-[#641f20]">
          <UserRound className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-[#531c1d]">
                  {review.customer}
                </p>
                <Stars rating={review.rating} />
                <StatusBadge status={review.status} />
              </div>

              <p className="mt-1 text-xs text-[#9a8878]">
                {review.date} · {review.id}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <ActionButton
                label="Approve"
                icon={<Check className="h-4 w-4" />}
                className="text-[#47734a] hover:bg-[#e8f1e5]"
              />
              <ActionButton
                label="Reject"
                icon={<X className="h-4 w-4" />}
                className="text-[#9b3d35] hover:bg-[#f8e5e2]"
              />
              <button
                type="button"
                className="rounded-lg p-2 text-[#806b5d] hover:bg-[#f2e7d0] hover:text-[#641f20]"
                aria-label={`More actions for ${review.id}`}
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#e2d6c1] bg-[#fdf9f0] p-4">
            <p className="text-sm font-semibold text-[#531c1d]">
              {review.title}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#665448]">
              {review.comment}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#806b5d]">
            <span>
              Product:{" "}
              <strong className="font-semibold text-[#641f20]">
                {review.product}
              </strong>
            </span>

            <span>
              Artisan:{" "}
              <strong className="font-semibold text-[#641f20]">
                {review.artisan}
              </strong>
            </span>

            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {review.helpful} found helpful
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-[#dfd2ba] bg-[#fffdf7] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3e6d0] text-[#641f20]">
            <UserRound className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#531c1d]">
              {review.customer}
            </p>
            <p className="mt-1 text-xs text-[#9a8878]">{review.date}</p>
          </div>
        </div>

        <StatusBadge status={review.status} />
      </div>

      <div className="mt-4">
        <Stars rating={review.rating} />

        <h3 className="mt-2 text-sm font-semibold text-[#531c1d]">
          {review.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#665448]">
          {review.comment}
        </p>
      </div>

      <div className="mt-4 rounded-lg bg-[#f8f0df] p-3 text-xs text-[#806b5d]">
        <p>
          Product:{" "}
          <span className="font-semibold text-[#641f20]">
            {review.product}
          </span>
        </p>
        <p className="mt-1">
          Artisan:{" "}
          <span className="font-semibold text-[#641f20]">
            {review.artisan}
          </span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#eadfce] pt-3">
        <span className="inline-flex items-center gap-1 text-xs text-[#806b5d]">
          <ThumbsUp className="h-3.5 w-3.5" />
          {review.helpful} helpful
        </span>

        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-[#47734a] hover:bg-[#e8f1e5]"
            aria-label="Approve review"
          >
            <Check className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-[#9b3d35] hover:bg-[#f8e5e2]"
            aria-label="Reject review"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}

function EmptyReviews() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e8d3] text-[#9b772d]">
        <Search className="h-6 w-6" />
      </div>

      <h3 className="mt-4 font-serif text-lg font-semibold text-[#531c1d]">
        No reviews found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-[#806b5d]">
        Try changing the search term, status or rating filter.
      </p>
    </div>
  );
}