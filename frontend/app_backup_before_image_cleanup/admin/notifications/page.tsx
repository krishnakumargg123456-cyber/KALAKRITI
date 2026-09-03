"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  
  
  ChevronRight,
  Clock3,
  Eye,
  Mail,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  Smartphone,
  Users,
  
} from "lucide-react";

type NotificationStatus = "Sent" | "Scheduled" | "Draft";
type NotificationChannel = "Email" | "Push" | "SMS";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  audience: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  date: string;
  recipients: number;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Diwali Craft Collection is Live",
    message:
      "Discover handcrafted treasures created by India's traditional artisans.",
    audience: "All Customers",
    channel: "Email",
    status: "Sent",
    date: "01 Sep 2026, 09:00 AM",
    recipients: 6842,
  },
  {
    id: 2,
    title: "Your order has been shipped",
    message:
      "Your KALAKRITI order #KK-1047 is on its way to you.",
    audience: "Order Customers",
    channel: "Push",
    status: "Sent",
    date: "01 Sep 2026, 04:30 PM",
    recipients: 128,
  },
  {
    id: 3,
    title: "Weekend Artisan Showcase",
    message:
      "Meet this week's featured artisans and explore their newest creations.",
    audience: "All Customers",
    channel: "Push",
    status: "Scheduled",
    date: "05 Sep 2026, 10:00 AM",
    recipients: 6842,
  },
  {
    id: 4,
    title: "Complete your collection",
    message:
      "A few handcrafted pieces are waiting in your wishlist.",
    audience: "Wishlist Customers",
    channel: "Email",
    status: "Draft",
    date: "â€”",
    recipients: 932,
  },
  {
    id: 5,
    title: "Review your recent purchase",
    message:
      "Share your experience and help support the artisan who created your piece.",
    audience: "Delivered Customers",
    channel: "Email",
    status: "Sent",
    date: "30 Aug 2026, 11:00 AM",
    recipients: 246,
  },
];

const channelOptions = ["All Channels", "Email", "Push", "SMS"];
const statusOptions = ["All Status", "Sent", "Scheduled", "Draft"];

function statusClass(status: NotificationStatus) {
  if (status === "Sent") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Scheduled") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-stone-200 bg-stone-100 text-stone-600";
}

function ChannelIcon({ channel }: { channel: NotificationChannel }) {
  if (channel === "Email") {
    return <Mail className="h-4 w-4" />;
  }

  if (channel === "SMS") {
    return <Smartphone className="h-4 w-4" />;
  }

  return <Bell className="h-4 w-4" />;
}

export default function AdminNotificationsPage() {
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("All Channels");
  const [status, setStatus] = useState("All Status");

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.audience.toLowerCase().includes(query);

      const matchesChannel =
        channel === "All Channels" || notification.channel === channel;

      const matchesStatus =
        status === "All Status" || notification.status === status;

      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [search, channel, status]);

  const sentCount = notifications.filter(
    (item) => item.status === "Sent"
  ).length;

  const scheduledCount = notifications.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const draftCount = notifications.filter(
    (item) => item.status === "Draft"
  ).length;

  const totalRecipients = notifications.reduce(
    (sum, item) => sum + item.recipients,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#351716]">
      <header className="border-b border-[#c9a45c]/30 bg-[#fbf7ed]">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9b772d]">
                <BellRing className="h-4 w-4" />
                Customer Communication
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d] sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806b5d]">
                Create and manage important marketplace communications across
                email, push notifications and SMS.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#641f20] px-5 py-3 text-sm font-semibold text-[#f8edcf] shadow-sm transition hover:bg-[#4f1819]"
            >
              <Plus className="h-4 w-4" />
              Create Notification
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Sent"
            value={sentCount}
            detail="Successfully delivered campaigns"
            icon={<Send className="h-5 w-5" />}
          />

          <SummaryCard
            label="Scheduled"
            value={scheduledCount}
            detail="Upcoming notifications"
            icon={<Clock3 className="h-5 w-5" />}
          />

          <SummaryCard
            label="Drafts"
            value={draftCount}
            detail="Not yet published"
            icon={<Mail className="h-5 w-5" />}
          />

          <SummaryCard
            label="Recipients"
            value={totalRecipients.toLocaleString("en-IN")}
            detail="Across recent campaigns"
            icon={<Users className="h-5 w-5" />}
          />
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <ChannelCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            value="72%"
            detail="Open rate"
          />

          <ChannelCard
            icon={<Bell className="h-5 w-5" />}
            title="Push Notifications"
            value="88%"
            detail="Delivery rate"
          />

          <ChannelCard
            icon={<Smartphone className="h-5 w-5" />}
            title="SMS"
            value="96%"
            detail="Delivery rate"
          />
        </section>

        <section className="mt-8 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] shadow-[0_8px_30px_rgba(82,45,25,0.05)]">
          <div className="border-b border-[#ded1ba] p-5 sm:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#531c1d]">
                  Notification History
                </h2>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Review recent and upcoming customer communications.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8777]" />

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search notifications..."
                    className="h-10 w-full rounded-md border border-[#d6c6a9] bg-white/70 pl-9 pr-4 text-sm outline-none placeholder:text-[#a9998a] focus:border-[#9b772d] sm:w-64"
                  />
                </div>

                <select
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                  className="h-10 rounded-md border border-[#d6c6a9] bg-white/70 px-3 text-sm text-[#705b4c] outline-none focus:border-[#9b772d]"
                >
                  {channelOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-10 rounded-md border border-[#d6c6a9] bg-white/70 px-3 text-sm text-[#705b4c] outline-none focus:border-[#9b772d]"
                >
                  {statusOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#ded1ba] bg-[#f6efdf] text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Notification
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Audience
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Channel
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Date
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Recipients
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#806b5d]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredNotifications.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e3d8c5] last:border-0 hover:bg-[#faf5e9]"
                  >
                    <td className="px-6 py-5">
                      <div className="flex min-w-[350px] gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
                          <Megaphone className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="font-serif text-base font-semibold text-[#531c1d]">
                            {item.title}
                          </p>

                          <p className="mt-1 line-clamp-1 text-xs text-[#8b796b]">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#685548]">
                      {item.audience}
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#685548]">
                        <ChannelIcon channel={item.channel} />
                        {item.channel}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#685548]">
                      {item.date}
                    </td>

                    <td className="px-5 py-5 text-sm font-medium text-[#531c1d]">
                      {item.recipients.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-1">
                        <IconButton
                          label="View"
                          icon={<EyeIcon />}
                        />
                        <IconButton
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
            {filteredNotifications.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-[#ddd0b9] bg-white/50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
                      <Megaphone className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="font-serif text-base font-semibold text-[#531c1d]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#806b5d]">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${statusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e2d7c2] pt-4">
                  <Info label="Audience" value={item.audience} />
                  <Info label="Channel" value={item.channel} />
                  <Info label="Date" value={item.date} />
                  <Info
                    label="Recipients"
                    value={item.recipients.toLocaleString("en-IN")}
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#d4c3a6] px-3 py-2 text-xs font-semibold text-[#641f20] hover:bg-[#f4ead8]"
                  >
                    <EyeIcon />
                    View
                  </button>

                  {item.status === "Draft" && (
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-[#641f20] px-3 py-2 text-xs font-semibold text-[#f8edcf] hover:bg-[#4f1819]"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label="More actions"
                    className="rounded-md border border-[#d4c3a6] px-3 text-[#806b5d]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e5d0] text-[#8b6828]">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#531c1d]">
                No notifications found
              </h3>

              <p className="mt-2 text-sm text-[#806b5d]">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <div className="border-t border-[#ded1ba] px-5 py-4 sm:px-6">
            <p className="text-xs text-[#806b5d]">
              Showing {filteredNotifications.length} of{" "}
              {notifications.length} notifications
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
                <Settings2 className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-[#531c1d]">
                  Notification Preferences
                </h3>
                <p className="mt-1 text-sm text-[#806b5d]">
                  Configure default channels, delivery behaviour and customer
                  communication preferences.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#c9a45c] px-4 py-2.5 text-xs font-semibold text-[#641f20] hover:bg-[#f3e9d5]"
            >
              Manage Settings
              <ChevronRight className="h-4 w-4" />
            </button>
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
}: {
  label: string;
  value: number | string;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5 shadow-[0_5px_20px_rgba(82,45,25,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#806b5d]">
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

function ChannelCard({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#c9a45c]/30 bg-[#fbf7ed] p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0e4ca] text-[#8b6828]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-[#531c1d]">{title}</p>
        <p className="mt-1 text-xs text-[#806b5d]">
          <span className="font-semibold text-[#641f20]">{value}</span>{" "}
          {detail}
        </p>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a897c]">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-medium text-[#685548]">
        {value}
      </p>
    </div>
  );
}

function IconButton({
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
      className="rounded-md p-2 text-[#806b5d] hover:bg-[#f0e5d0] hover:text-[#641f20]"
    >
      {icon}
    </button>
  );
}

function EyeIcon() {
  return <Eye className="h-4 w-4" />;
}