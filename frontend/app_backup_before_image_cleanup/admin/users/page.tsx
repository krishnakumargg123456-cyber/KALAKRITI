"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  UserCheck,
  UserX,
  Shield,
} from "lucide-react";

type UserRole = "customer" | "artisan" | "admin";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  verified: boolean;
  joined: string;
};

const initialUsers: User[] = [];

const roleClasses: Record<UserRole, string> = {
  customer: "bg-blue-100 text-blue-800",
  artisan: "bg-purple-100 text-purple-800",
  admin: "bg-[#ead8a8] text-[#641f2b]",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.active) ||
        (statusFilter === "inactive" && !user.active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const toggleActive = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, active: !user.active }
          : user
      )
    );
  };

  const toggleVerified = (id: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? { ...user, verified: !user.verified }
          : user
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Users
          </h1>

          <p className="mt-2 text-[#765f45]">
            Manage customers, artisans and administrators.
          </p>
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Total Users
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {users.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Customers
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {users.filter((u) => u.role === "customer").length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Artisans
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {users.filter((u) => u.role === "artisan").length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
            <p className="text-sm text-[#765f45]">
              Active Users
            </p>
            <p className="mt-2 text-3xl font-bold text-[#641f2b]">
              {users.filter((u) => u.active).length}
            </p>
          </div>

        </section>

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email..."
                className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 outline-none focus:border-[#641f2b]"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customers</option>
                <option value="artisan">Artisans</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

            </div>
          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[950px] text-left">

              <thead>
                <tr className="border-b border-[#d8c8a8] text-sm text-[#765f45]">
                  <th className="px-3 py-4">User</th>
                  <th className="px-3 py-4">Role</th>
                  <th className="px-3 py-4">Verification</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Joined</th>
                  <th className="px-3 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#eadfc9]"
                  >

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eadfc9]">
                          <span className="font-bold text-[#641f2b]">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-[#641f2b]">
                            {user.name}
                          </p>

                          <p className="text-sm text-[#765f45]">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          roleClasses[user.role]
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-3 py-4">

                      <button
                        onClick={() => toggleVerified(user.id)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.verified
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.verified ? (
                          <>
                            <UserCheck size={13} />
                            Verified
                          </>
                        ) : (
                          <>
                            <UserX size={13} />
                            Unverified
                          </>
                        )}
                      </button>

                    </td>

                    <td className="px-3 py-4">

                      <button
                        onClick={() => toggleActive(user.id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </button>

                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {user.joined}
                    </td>

                    <td className="px-3 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          title="View user"
                          className="rounded-lg border border-[#d8c8a8] p-2 text-[#641f2b] hover:bg-[#f5eddd]"
                        >
                          <Eye size={17} />
                        </button>

                        {user.role === "admin" && (
                          <button
                            title="Administrator"
                            className="rounded-lg border border-[#d8c8a8] p-2 text-[#a27b2d]"
                          >
                            <Shield size={17} />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-16 text-center"
                    >
                      <UserCheck
                        size={40}
                        className="mx-auto text-[#bca98b]"
                      />

                      <p className="mt-4 font-semibold text-[#641f2b]">
                        No users found
                      </p>

                      <p className="mt-1 text-sm text-[#765f45]">
                        Users will appear here after the final API connection.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

          </div>
        </section>
      </div>
    </main>
  );
}
