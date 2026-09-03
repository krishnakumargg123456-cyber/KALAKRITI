"use client";

import { FormEvent, useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            My Account
          </p>

          <h1 className="mt-2 font-serif text-3xl font-bold text-maroon">
            Personal Profile
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage your personal information and contact details.
          </p>
        </div>

        <section className="rounded-card border border-gold/30 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7 flex items-center gap-4 border-b border-gold/20 pb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-maroon">
              <User className="h-7 w-7" />
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-maroon">
                Profile Information
              </h2>
              <p className="text-sm text-gray-500">
                Keep your account details up to date.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-maroon"
              >
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gold/30 bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-maroon"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gold/30 bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-maroon"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-gold/30 bg-cream py-3 pl-11 pr-4 outline-none transition focus:border-maroon"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-gold/20 pt-6 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 font-semibold text-white transition hover:bg-maroon-light"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>

              {saved && (
                <p className="text-sm font-semibold text-green-700">
                  Profile changes saved successfully.
                </p>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
