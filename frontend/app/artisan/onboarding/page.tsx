"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserRound,
  Palette,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { createMyArtisan } from "@/lib/api/artisans";
import { usersApi } from "@/lib/api/users";
import { useAuthStore } from "@/lib/store/auth-store";

export default function ArtisanOnboardingPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [checkingAccount, setCheckingAccount] = useState(true);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      try {
        const response = await usersApi.getProfile();
        const profile = response?.data;

        if (!profile) {
          throw new Error("Unable to load your artisan account.");
        }

        const role = String(profile.role ?? "").toLowerCase();

        if (role !== "artisan") {
          router.replace("/artisan");
          return;
        }

        const name = profile.name ?? profile.full_name ?? "";
        const email = profile.email ?? "";

        if (active) {
          setAccountName(name);
          setAccountEmail(email);

          setUser({
            id: profile.id,
            name,
            email,
            role: profile.role,
          });

          setCheckingAccount(false);
        }
      } catch (err: any) {
        if (active) {
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Unable to verify your artisan account."
          );
          setCheckingAccount(false);
        }
      }
    }

    loadAccount();

    return () => {
      active = false;
    };
  }, [router, setUser]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const shopName = String(formData.get("shop_name") || "").trim();
    const craft = String(formData.get("craft") || "").trim();
    const bio = String(formData.get("bio") || "").trim();
    const state = String(formData.get("state") || "").trim();
    const district = String(formData.get("district") || "").trim();

    if (!shopName || !craft || !bio || !state) {
      setError("Please fill all required artisan details.");
      setLoading(false);
      return;
    }

    try {
      await createMyArtisan({
        shop_name: shopName,
        craft_specialization: craft,
        bio,
        state,
        district: district || null,
      });

      setSubmitted(true);
    } catch (err: any) {
      const responseMessage =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to create your artisan profile. Please try again.";

      setError(
        Array.isArray(responseMessage)
          ? responseMessage
              .map((item: any) => item?.msg || "Invalid information")
              .join(", ")
          : String(responseMessage)
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingAccount) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6 text-maroon">
        <div className="rounded-2xl border border-gold/30 bg-paper px-8 py-7 text-center shadow-sm">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold" />

          <p className="mt-4 font-serif text-lg font-semibold">
            Preparing Your Artisan Studio...
          </p>

          <p className="mt-1 text-sm text-muted">
            Verifying your artisan account.
          </p>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-paper p-8 text-center shadow-sm md:p-12">
          <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-green-700" />

          <h1 className="font-serif text-3xl font-bold text-maroon">
            Artisan Profile Created
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-brown/70">
            Your artisan profile has been successfully created and is now
            pending verification.
          </p>

          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-left">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

              <p className="text-sm leading-6 text-brown/70">
                Your profile is currently unverified. KALAKRITI verifies
                artisan identity and craft authenticity before final approval.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/artisan/verification"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
            >
              Continue Verification
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/artisan/profile"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-maroon/30 px-6 py-3 text-sm font-semibold text-maroon transition hover:bg-cream"
            >
              View Artisan Profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            KALAKRITI Artisan Studio
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon">
            Complete Your Artisan Profile
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-brown/70">
            Your artisan account is ready. Now tell us about your craft,
            tradition and the place where you create.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-gold/30 bg-paper p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-maroon">
              <UserRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Artisan Account
              </p>

              <p className="mt-1 font-serif text-lg font-bold text-maroon">
                {accountName || "Artisan"}
              </p>

              <p className="mt-1 truncate text-sm text-muted">
                {accountEmail}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-paper p-6 shadow-sm md:p-8"
        >
          {error && (
            <div className="mb-7 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-gold">
                <Palette className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Your Craft
                </h2>

                <p className="text-xs text-brown/55">
                  Tell us about the tradition you carry forward.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="craft"
                  className="mb-2 block text-sm font-medium text-brown"
                >
                  Primary Craft
                </label>

                <select
                  id="craft"
                  name="craft"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                >
                  <option value="" disabled>
                    Select craft
                  </option>
                  <option value="pottery">Pottery</option>
                  <option value="handloom">Handloom</option>
                  <option value="wood-craft">Wood Craft</option>
                  <option value="metal-craft">Metal Craft</option>
                  <option value="painting">Painting</option>
                  <option value="embroidery">Embroidery</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Field
                id="experience"
                name="experience"
                label="Years of Craft Experience"
                type="number"
                placeholder="e.g. 15"
                required
              />

              <div className="md:col-span-2">
                <label
                  htmlFor="bio"
                  className="mb-2 block text-sm font-medium text-brown"
                >
                  About Your Craft
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  required
                  placeholder="Tell us about your craft, techniques, tradition and what makes your work special..."
                  className="w-full resize-none rounded-lg border border-border bg-cream px-4 py-3 leading-6 outline-none focus:border-gold"
                />
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-border" />

          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-gold">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  Where You Create
                </h2>

                <p className="text-xs text-brown/55">
                  Help customers discover the region behind your craft.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                id="state"
                name="state"
                label="State"
                type="text"
                placeholder="Your state"
                required
              />

              <Field
                id="district"
                name="district"
                label="District"
                type="text"
                placeholder="Your district"
              />

              <div className="md:col-span-2">
                <Field
                  id="shop_name"
                  name="shop_name"
                  label="Artisan / Shop Name"
                  type="text"
                  placeholder="Name customers will see on KALAKRITI"
                  required
                />
              </div>
            </div>
          </section>

          <div className="mt-7 flex gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

            <p className="text-sm leading-6 text-brown/70">
              Your artisan account is already securely created. KALAKRITI
              verifies artisan identity and craft authenticity before approving
              an artisan profile.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-5 py-3 font-semibold text-cream transition hover:bg-maroon/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Artisan Profile...
              </>
            ) : (
              <>
                Continue to Verification
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  id,
  name,
  label,
  type,
  placeholder,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-brown"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required={required}
        min={type === "number" ? "0" : undefined}
        className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
        placeholder={placeholder}
      />
    </div>
  );
}
