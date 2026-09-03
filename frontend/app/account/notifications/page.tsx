"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  notificationsApi,
  type Notification,
} from "@/lib/api/notifications";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const response = await notificationsApi.list({
        limit: 100,
      });

      setItems(response.data.items);
      setUnreadCount(response.data.unread_count);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markRead = async (id: number) => {
    try {
      await notificationsApi.markRead(id);

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, is_read: true }
            : item
        )
      );

      setUnreadCount((count) => Math.max(0, count - 1));
    } catch {
      // Keep current UI state if request fails.
    }
  };

  const markAllRead = async () => {
    try {
      await notificationsApi.markAllRead();

      setItems((current) =>
        current.map((item) => ({
          ...item,
          is_read: true,
        }))
      );

      setUnreadCount(0);
    } catch {
      // Keep current UI state if request fails.
    }
  };

  const remove = async (id: number) => {
    try {
      const item = items.find((notification) => notification.id === id);

      await notificationsApi.remove(id);

      setItems((current) =>
        current.filter(
          (notification) => notification.id !== id
        )
      );

      if (item && !item.is_read) {
        setUnreadCount((count) =>
          Math.max(0, count - 1)
        );
      }
    } catch {
      // Keep current UI state if request fails.
    }
  };

  return (
    <main className="min-h-screen bg-[#f5efe2] px-4 py-8 text-[#4a1f1f]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#6b4a32] hover:text-[#7b1e2b]"
        >
          <ArrowLeft size={16} />
          Back to Account
        </Link>

        <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#b89b62] pb-5">
          <div>
            <div className="flex items-center gap-3">
              <Bell size={28} />
              <h1 className="font-serif text-3xl font-bold">
                Notifications
              </h1>
            </div>

            <p className="mt-2 text-sm text-[#725c47]">
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount === 1 ? "" : "s"
                  }`
                : "You're all caught up."}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-2 border border-[#7b1e2b] px-4 py-2 text-sm font-medium text-[#7b1e2b] transition hover:bg-[#7b1e2b] hover:text-white"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>

        {loading ? (
          <div className="border border-[#d2c2a4] bg-[#fffaf0] p-10 text-center">
            Loading notifications...
          </div>
        ) : items.length === 0 ? (
          <div className="border border-[#d2c2a4] bg-[#fffaf0] p-12 text-center">
            <Bell
              size={42}
              className="mx-auto mb-4 opacity-50"
            />
            <h2 className="font-serif text-xl font-semibold">
              No notifications
            </h2>
            <p className="mt-2 text-sm text-[#725c47]">
              New updates about your orders and account will
              appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className={`border bg-[#fffaf0] p-5 transition ${
                  item.is_read
                    ? "border-[#d2c2a4]"
                    : "border-[#b89b62] shadow-sm"
                }`}
              >
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7b1e2b] text-white">
                      <Bell size={18} />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-lg font-semibold">
                          {item.title}
                        </h2>

                        <p className="mt-1 text-xs uppercase tracking-wider text-[#9a7540]">
                          {item.type}
                        </p>
                      </div>

                      {!item.is_read && (
                        <span className="rounded-full bg-[#7b1e2b] px-2 py-1 text-xs text-white">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-3 leading-6 text-[#5e4a38]">
                      {item.message}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e0d4bd] pt-3">
                      <time className="text-xs text-[#8a765f]">
                        {new Date(
                          item.created_at
                        ).toLocaleString("en-IN")}
                      </time>

                      <div className="flex gap-2">
                        {!item.is_read && (
                          <button
                            onClick={() => markRead(item.id)}
                            className="inline-flex items-center gap-1 border border-[#b89b62] px-3 py-1.5 text-xs hover:bg-[#f0e4ce]"
                          >
                            <Check size={14} />
                            Mark read
                          </button>
                        )}

                        <button
                          onClick={() => remove(item.id)}
                          className="inline-flex items-center gap-1 border border-[#c9a9a9] px-3 py-1.5 text-xs text-[#7b1e2b] hover:bg-[#f5e0e0]"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
