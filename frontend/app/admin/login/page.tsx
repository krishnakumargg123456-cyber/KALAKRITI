"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Admin authentication is not connected to the verified backend contract yet."
    );
  }

  return (
    <main className="min-h-screen bg-[#f5eddb] text-[#351716]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#5a1d1e] lg:flex">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full border-[28px] border-[#c9a45c]" />
            <div className="absolute bottom-16 right-[-80px] h-96 w-96 rounded-full border-[38px] border-[#c9a45c]" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#e2c878]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#e2c878]" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a45c] bg-[#f2dfae]/10">
                  <Sparkles className="h-5 w-5 text-[#e4c76f]" />
                </div>

                <div>
                  <p className="font-serif text-2xl font-semibold tracking-wide text-[#f8edcf]">
                    KALAKRITI
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8bb6b]">
                    India&apos;s Craft Marketplace
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d8bb6b]">
                Administrator Portal
              </p>

              <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-[#fff5dc] xl:text-6xl">
                Preserving
                <br />
                India&apos;s Living
                <br />
                Heritage.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#eadcbd]">
                Manage artisans, handcrafted products, orders and stories from
                one place while helping traditional Indian craftsmanship reach
                the world.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <HeritagePill text="Authentic Crafts" />
                <HeritagePill text="Verified Artisans" />
                <HeritagePill text="Living Traditions" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#d8c69e]">
              <ShieldCheck className="h-4 w-4" />
              Secure administrative access
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#641f20] text-[#f4dfaa]">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-serif text-2xl font-semibold text-[#531c1d]">
                    KALAKRITI
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#8b6828]">
                    India&apos;s Craft Marketplace
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#c9a45c]/40 bg-[#fbf7ed] p-7 shadow-[0_15px_50px_rgba(82,45,25,0.08)] sm:p-9">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b772d]">
                  Welcome Back
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#531c1d]">
                  Admin Sign In
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#806b5d]">
                  Sign in to manage the KALAKRITI marketplace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#685548]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8777]" />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@kalakriti.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-lg border border-[#d6c6a9] bg-white/70 pl-11 pr-4 text-sm text-[#4e3830] outline-none transition placeholder:text-[#ad9d8d] focus:border-[#9b772d] focus:ring-2 focus:ring-[#c9a45c]/15"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#685548]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b8777]" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-12 w-full rounded-lg border border-[#d6c6a9] bg-white/70 pl-11 pr-12 text-sm text-[#4e3830] outline-none transition placeholder:text-[#ad9d8d] focus:border-[#9b772d] focus:ring-2 focus:ring-[#c9a45c]/15"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b796b] hover:text-[#641f20]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 rounded border-[#c9b99b] accent-[#641f20]"
                    />

                    <span className="text-xs text-[#806b5d]">
                      Remember me
                    </span>
                  </label>

                  <span className="cursor-not-allowed text-xs font-semibold text-[#a18f7f]">
                    Forgot password?
                  </span>
                </div>

                {message && (
                  <div
                    role="status"
                    className="rounded-lg border border-[#d8c8a8] bg-[#f5eddb] px-4 py-3 text-xs leading-5 text-[#765f45]"
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#641f20] text-sm font-semibold text-[#f8edcf] shadow-sm transition hover:bg-[#4f1819] hover:shadow-md"
                >
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#ded1ba]" />

                <span className="text-[10px] uppercase tracking-[0.18em] text-[#a18f7f]">
                  KALAKRITI
                </span>

                <div className="h-px flex-1 bg-[#ded1ba]" />
              </div>

              <div className="rounded-lg border border-[#dfd1b7] bg-[#f5eddb] p-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8b6828]" />

                  <div>
                    <p className="text-xs font-semibold text-[#641f20]">
                      Protected Area
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#806b5d]">
                      This portal is restricted to authorised KALAKRITI
                      administrators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-[#9a897c]">
              <LockKeyhole className="h-3 w-3" />
              Secure authentication will be handled by the KALAKRITI backend.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeritagePill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[#d4b96d]/40 bg-[#f5e7bd]/10 px-3 py-1.5 text-[11px] font-medium text-[#ead7a5]">
      {text}
    </span>
  );
}
