"use client";

import { FormEvent, useState } from "react";
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

export default function ArtisanOnboardingPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      router.replace("/artisan/verification");
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
            pending verification. You can continue preparing your KALAKRITI
            artisan profile while verification is completed.
          </p>

          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4 text-left">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />

              <p className="text-sm leading-6 text-brown/70">
                Your profile is currently marked as unverified. KALAKRITI
                verifies artisan identity and craft authenticity before final
                approval.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/artisan/profile"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 text-sm font-semibold text-cream transition hover:bg-maroon/90"
            >
              View Artisan Profile
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/artisan/verification"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-maroon/30 px-6 py-3 text-sm font-semibold text-maroon transition hover:bg-cream"
            >
              Continue Verification
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
            Join KALAKRITI
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold text-maroon">
            Artisan Onboarding
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-brown/70">
            Tell us about yourself and the traditional craft you practise.
            These details help build your artisan profile and begin the
            verification journey.
          </p>
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
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-maroon">
                  About You
                </h2>

                <p className="text-xs text-brown/55">
                  Basic information for your artisan profile.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field
                id="name"
                name="name"
                label="Full Name"
                type="text"
                placeholder="Your full name"
                required
              />

              <Field
                id="phone"
                name="phone"
                label="Phone"
                type="tel"
                placeholder="+91"
                required
              />

              <div className="md:col-span-2">
                <Field
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-border" />

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
                  className="w-full rounded-lg border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
                  defaultValue=""
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
              KALAKRITI verifies artisan identity and craft authenticity before
              approving an artisan profile. Please provide accurate
              information.
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
