"use client";

import {
  Info,
  Search,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

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

const users: User[] = [];

const roleClasses: Record<UserRole, string> = {
  customer: "bg-blue-100 text-blue-800",
  artisan: "bg-purple-100 text-purple-800",
  admin: "bg-[#ead8a8] text-[#641f2b]",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
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
  }, [search, roleFilter, statusFilter]);

  const customerCount = users.filter(
    (user) => user.role === "customer",
  ).length;

  const artisanCount = users.filter(
    (user) => user.role === "artisan",
  ).length;

  const activeCount = users.filter(
    (user) => user.active,
  ).length;

  return (
    <main className="min-h-screen bg-[#f5eddd] p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a27b2d]">
            Kalakriti Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#641f2b]">
            Users
          </h1>

          <p className="mt-2 max-w-2xl text-[#765f45]">
            Monitor customers, artisans and administrators using verified
            marketplace user records.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Users"
            value={users.length}
            icon={<Users className="h-5 w-5" />}
          />

          <StatCard
            label="Customers"
            value={customerCount}
            icon={<Users className="h-5 w-5" />}
          />

          <StatCard
            label="Artisans"
            value={artisanCount}
            icon={<UserCheck className="h-5 w-5" />}
          />

          <StatCard
            label="Active Users"
            value={activeCount}
            icon={<Shield className="h-5 w-5" />}
          />
        </section>

        <section className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#531c1d]">
                User Directory
              </h2>

              <p className="mt-1 text-sm text-[#765f45]">
                Search and filter verified marketplace accounts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full xl:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b765c]"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search name or email..."
                  className="w-full rounded-lg border border-[#d8c8a8] bg-white py-3 pl-10 pr-4 text-[#641f2b] outline-none placeholder:text-[#a89582] focus:border-[#641f2b]"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(event.target.value)
                }
                className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none focus:border-[#641f2b]"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customers</option>
                <option value="artisan">Artisans</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-lg border border-[#d8c8a8] bg-white px-4 py-3 text-[#641f2b] outline-none focus:border-[#641f2b]"
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
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleClasses[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <span
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
                          "Unverified"
                        )}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-3 py-4 text-[#765f45]">
                      {user.joined}
                    </td>

                    <td className="px-3 py-4 text-right">
                      <button
                        type="button"
                        disabled
                        title="User management API unavailable"
                        className="rounded-lg border border-[#d8c8a8] p-2 text-[#bca98b]"
                      >
                        <Shield size={17} />
                      </button>
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
                        No verified user records available
                      </p>

                      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#765f45]">
                        User records are not currently loaded from a
                        verified admin user-management API. No sample
                        names, emails, roles, statuses or dates are
                        displayed.
                      </p>

                      {(search ||
                        roleFilter !== "all" ||
                        statusFilter !== "all") && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setRoleFilter("all");
                            setStatusFilter("all");
                          }}
                          className="mt-5 rounded-lg border border-[#d8c8a8] bg-[#fffaf0] px-4 py-2.5 text-sm font-semibold text-[#641f2b] transition hover:bg-[#f5eddd]"
                        >
                          Clear Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 flex gap-3 rounded-xl border border-[#d8c8a8] bg-[#f8edcf] p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#a27b2d]" />

          <div>
            <h3 className="font-semibold text-[#641f2b]">
              User management API required
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#765f45]">
              Account activation, verification, role changes and user
              details are intentionally read-only here. These actions
              will be enabled only after the verified admin
              user-management API contract is connected.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#d8c8a8] bg-[#fffaf0] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#765f45]">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#641f2b]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eadfc9] text-[#641f2b]">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#a89582]">
        Verified backend data unavailable
      </p>
    </div>
  );
}
