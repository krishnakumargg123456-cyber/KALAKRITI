"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Truck,
  WalletCards,
} from "lucide-react";

type PaymentMethod = "razorpay" | "upi" | "card" | "cod";

export default function CheckoutPaymentPage() {
  const [method, setMethod] = useState<PaymentMethod>("razorpay");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);

    window.setTimeout(() => {
      window.location.href = "/checkout/success";
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      {/* Header */}
      <header className="border-b border-[#b08a4a]/30 bg-[#fbf6e9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wide text-[#8b1e2d]"
          >
            KALAKRITI
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#80665d]">
            <ShieldCheck className="h-4 w-4 text-[#8b1e2d]" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link href="/cart" className="hover:text-[#8b1e2d]">
            Cart
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <Link
            href="/checkout/address"
            className="hover:text-[#8b1e2d]"
          >
            Address
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <span className="font-semibold text-[#4a211c]">Payment</span>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#58704d] text-xs font-bold text-[#fff8eb]">
              <Check className="h-4 w-4" />
            </span>
            <span className="hidden text-xs font-bold text-[#58704d] sm:block">
              Address
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#8b1e2d]/40" />

          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8b1e2d] text-xs font-bold text-[#fff8eb]">
              2
            </span>
            <span className="hidden text-xs font-bold text-[#8b1e2d] sm:block">
              Payment
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#b08a4a]/35" />

          <div className="flex items-center gap-2 opacity-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#b08a4a]/50 text-xs font-bold">
              3
            </span>
            <span className="hidden text-xs font-bold sm:block">
              Confirmation
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Payment */}
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Step 2
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              Choose your payment
            </h1>

            <p className="mt-2 text-sm text-[#6d5149]">
              Your payment information is protected by secure checkout
              technology.
            </p>

            {/* Payment methods */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
              <PaymentOption
                active={method === "razorpay"}
                value="razorpay"
                title="Razorpay"
                description="UPI, cards, net banking & wallets"
                icon={<WalletCards className="h-5 w-5" />}
                onSelect={() => setMethod("razorpay")}
              />

              <PaymentOption
                active={method === "upi"}
                value="upi"
                title="UPI"
                description="Pay directly using your UPI ID"
                icon={<Smartphone className="h-5 w-5" />}
                onSelect={() => setMethod("upi")}
              />

              <PaymentOption
                active={method === "card"}
                value="card"
                title="Credit / Debit Card"
                description="Visa, Mastercard, RuPay & more"
                icon={<CreditCard className="h-5 w-5" />}
                onSelect={() => setMethod("card")}
              />

              <PaymentOption
                active={method === "cod"}
                value="cod"
                title="Cash on Delivery"
                description="Pay when your handcrafted order arrives"
                icon={<Truck className="h-5 w-5" />}
                onSelect={() => setMethod("cod")}
                last
              />
            </div>

            {/* Dynamic payment details */}
            {method === "razorpay" && (
              <div className="mt-5 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6">
                <div className="flex gap-4">
                  <WalletCards className="h-6 w-6 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                      Pay securely with Razorpay
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-[#6d5149]">
                      You will be securely redirected to the Razorpay payment
                      experience to complete your order using your preferred
                      payment method.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {["UPI", "Cards", "Net Banking", "Wallets"].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#b08a4a]/30 bg-[#fbf6e9] px-3 py-1.5 text-[10px] font-bold text-[#65443c]"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {method === "upi" && (
              <div className="mt-5 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6">
                <label>
                  <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                    UPI ID
                  </span>

                  <input
                    type="text"
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                    placeholder="example@upi"
                    className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                  />
                </label>

                <p className="mt-3 text-[11px] leading-5 text-[#80665d]">
                  You will receive a payment request on your selected UPI
                  application.
                </p>
              </div>
            )}

            {method === "card" && (
              <div className="mt-5 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6">
                <div className="grid gap-5">
                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Card Number
                    </span>

                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#80665d]" />

                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] pl-11 pr-4 text-sm outline-none focus:border-[#8b1e2d]"
                      />
                    </div>
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                        Expiry
                      </span>

                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                      />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                        CVV
                      </span>

                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="•••"
                        className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                      />
                    </label>
                  </div>

                  <label>
                    <span className="mb-2 block text-xs font-bold text-[#4a211c]">
                      Name on Card
                    </span>

                    <input
                      type="text"
                      placeholder="Enter cardholder name"
                      className="h-12 w-full rounded-lg border border-[#b08a4a]/35 bg-[#fffaf0] px-4 text-sm outline-none focus:border-[#8b1e2d]"
                    />
                  </label>
                </div>
              </div>
            )}

            {method === "cod" && (
              <div className="mt-5 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6">
                <div className="flex gap-4">
                  <Truck className="h-6 w-6 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                      Cash on Delivery
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-[#6d5149]">
                      Pay the delivery partner when your KALAKRITI order
                      reaches you.
                    </p>

                    <p className="mt-3 text-xs font-semibold text-[#58704d]">
                      No online payment is required.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/50 p-5">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#58704d]" />

              <div>
                <p className="text-sm font-bold text-[#4a211c]">
                  Your payment is secure
                </p>

                <p className="mt-1 text-xs leading-5 text-[#80665d]">
                  KALAKRITI does not store your complete card or payment
                  credentials. Transactions are processed through secure
                  payment infrastructure.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/checkout/address"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#b08a4a]/40 px-5 py-3.5 text-sm font-bold text-[#65443c] transition hover:bg-[#efe4ce]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Address
              </Link>

              <button
                type="button"
                onClick={handlePayment}
                disabled={processing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725] disabled:cursor-wait disabled:opacity-70"
              >
                {processing ? "Processing..." : "Place Order"}
                {!processing && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </section>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-[#b08a4a]/25 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#4a211c]">
                    Madhubani Wall Art
                  </p>
                  <p className="mt-1 text-[11px] text-[#80665d]">
                    Qty 1
                  </p>
                </div>

                <span className="text-sm font-semibold">₹2,499</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#4a211c]">
                    Jaipur Blue Pottery
                  </p>
                  <p className="mt-1 text-[11px] text-[#80665d]">
                    Qty 1
                  </p>
                </div>

                <span className="text-sm font-semibold">₹1,899</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">Delivery</span>
                <span className="font-semibold text-[#58704d]">
                  FREE
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-5">
              <span className="font-serif text-lg font-semibold">
                Total
              </span>

              <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                ₹4,398
              </span>
            </div>

            <div className="rounded-xl bg-[#efe4ce]/70 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#58704d]" />

                <p className="text-[11px] leading-5 text-[#6d5149]">
                  Secure payment and careful delivery from our artisan
                  partners.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PaymentOption({
  active,
  value,
  title,
  description,
  icon,
  onSelect,
  last = false,
}: {
  active: boolean;
  value: PaymentMethod;
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: () => void;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 p-5 text-left transition hover:bg-[#efe4ce]/50 ${
        !last ? "border-b border-[#b08a4a]/25" : ""
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-[#8b1e2d] text-[#fff8eb]"
            : "bg-[#efe4ce] text-[#8b1e2d]"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#4a211c]">
            {title}
          </span>

          {value === "razorpay" && (
            <span className="rounded-full bg-[#58704d]/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#58704d]">
              Recommended
            </span>
          )}
        </span>

        <span className="mt-1 block text-xs text-[#80665d]">
          {description}
        </span>
      </span>

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          active
            ? "border-[#8b1e2d] bg-[#8b1e2d]"
            : "border-[#b08a4a]/50"
        }`}
      >
        {active && <Check className="h-3 w-3 text-[#fff8eb]" />}
      </span>
    </button>
  );
}