"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

import { createOrder } from "@/lib/api/orders";
import { paymentsApi } from "@/lib/api/payments";
import { useCartStore } from "@/lib/store/cart-store";

type PaymentMethod = "razorpay" | "upi" | "card" | "cod";

type CheckoutAddress = {
  id: number;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function CheckoutPaymentPage() {
  const [method, setMethod] =
    useState<PaymentMethod>("razorpay");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] =
    useState<CheckoutAddress | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(true);

  const items = useCartStore((state) => state.items);
  const loadingCart = useCartStore((state) => state.loading);
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart().catch((err) => {
      console.error(err);
    });

    try {
      const stored = sessionStorage.getItem(
        "kalakriti_checkout_address",
      );

      if (stored) {
        const parsed = JSON.parse(stored);

        if (
          parsed &&
          typeof parsed.id === "number" &&
          typeof parsed.full_name === "string" &&
          typeof parsed.phone === "string" &&
          typeof parsed.address_line1 === "string" &&
          typeof parsed.city === "string" &&
          typeof parsed.state === "string" &&
          typeof parsed.postal_code === "string"
        ) {
          setAddress(parsed);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAddress(false);
    }
  }, [loadCart]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          Number(item.product?.price ?? 0) *
            item.quantity,
        0,
      ),
    [items],
  );

  const estimatedDelivery =
    subtotal === 0 || subtotal >= 999 ? 0 : 99;

  const estimatedTotal =
    subtotal + estimatedDelivery;

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existing = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      if (existing) {
        existing.addEventListener("load", () =>
          resolve(true),
        );
        existing.addEventListener("error", () =>
          resolve(false),
        );
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (processing) return;

    setError("");

    if (!address) {
      setError(
        "Please select a delivery address before continuing.",
      );
      return;
    }

    if (items.length === 0) {
      setError(
        "Your cart is empty. Please add a product first.",
      );
      return;
    }

    try {
      setProcessing(true);

      const order = await createOrder({
        shipping_full_name: address.full_name,
        shipping_phone: address.phone,
        shipping_address_line1:
          address.address_line1,
        shipping_address_line2:
          address.address_line2,
        shipping_city: address.city,
        shipping_state: address.state,
        shipping_postal_code:
          address.postal_code,
        shipping_country:
          address.country || "India",
      });

      if (!order?.id) {
        throw new Error(
          "Order creation failed.",
        );
      }

      if (method === "cod") {
        await paymentsApi.create({
          order_id: Number(order.id),
          amount: Number(
            order.total_amount ?? estimatedTotal,
          ),
          method: "cod",
          currency: "INR",
        });

        window.location.href =
          "/checkout/success";
        return;
      }

      const razorpayLoaded =
        await loadRazorpayScript();

      if (
        !razorpayLoaded ||
        !window.Razorpay
      ) {
        throw new Error(
          "Unable to load Razorpay checkout. Please try again.",
        );
      }

      const razorpayOrder =
        await paymentsApi.createRazorpayOrder({
          order_id: Number(order.id),
        });

      if (
        !razorpayOrder?.razorpay_order_id ||
        !razorpayOrder?.razorpay_key_id ||
        !razorpayOrder?.payment?.id
      ) {
        throw new Error(
          "Unable to initialize Razorpay payment.",
        );
      }

      const razorpay =
        new window.Razorpay({
          key: razorpayOrder.razorpay_key_id,
          amount: razorpayOrder.amount,
          currency:
            razorpayOrder.currency || "INR",
          name: "KALAKRITI",
          description: `Order ${
            order.order_number ?? order.id
          }`,
          order_id:
            razorpayOrder.razorpay_order_id,
          prefill: {
            name: address.full_name,
            contact: address.phone,
          },
          theme: {
            color: "#8b1e2d",
          },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              await paymentsApi.verifyRazorpayPayment(
                {
                  payment_id:
                    Number(
                      razorpayOrder.payment.id,
                    ),
                  razorpay_order_id:
                    response.razorpay_order_id,
                  razorpay_payment_id:
                    response.razorpay_payment_id,
                  razorpay_signature:
                    response.razorpay_signature,
                },
              );

              window.location.href =
                "/checkout/success";
            } catch (verificationError) {
              console.error(
                verificationError,
              );

              setProcessing(false);
              setError(
                "Payment verification failed. Please contact support before trying again.",
              );
            }
          },
          modal: {
            ondismiss: () => {
              setProcessing(false);
            },
          },
        });

      razorpay.open();
    } catch (err) {
      console.error(err);

      setProcessing(false);
      setError(
        "Unable to place your order right now. Please try again.",
      );
    }
  };

  if (loadingAddress || loadingCart) {
    return (
      <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <ShieldCheck className="mx-auto h-8 w-8 animate-pulse text-[#8b1e2d]" />

            <p className="mt-3 text-sm font-semibold text-[#80665d]">
              Loading secure checkout...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
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
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link
            href="/cart"
            className="hover:text-[#8b1e2d]"
          >
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

          <span className="font-semibold text-[#4a211c]">
            Payment
          </span>
        </div>

        <div className="mt-8 flex items-center">
          <CheckoutStep
            number="1"
            title="Address"
            completed
          />

          <CheckoutLine active />

          <CheckoutStep
            number="2"
            title="Payment"
            active
          />

          <CheckoutLine />

          <CheckoutStep
            number="3"
            title="Confirmation"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
              Step 2
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
              Choose your payment
            </h1>

            <p className="mt-2 text-sm text-[#6d5149]">
              Your payment information is protected by
              secure checkout technology.
            </p>

            {error && (
              <div className="mt-5 rounded-xl border border-[#8b1e2d]/30 bg-[#8b1e2d]/5 p-4 text-sm font-semibold text-[#8b1e2d]">
                {error}
              </div>
            )}

            <div className="mt-7 overflow-hidden rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9]">
              <PaymentOption
                active={method === "razorpay"}
                value="razorpay"
                title="Razorpay"
                description="UPI, cards, net banking & wallets"
                icon={
                  <WalletCards className="h-5 w-5" />
                }
                onSelect={() =>
                  setMethod("razorpay")
                }
              />

              <PaymentOption
                active={method === "upi"}
                value="upi"
                title="UPI"
                description="Pay securely through Razorpay"
                icon={
                  <Smartphone className="h-5 w-5" />
                }
                onSelect={() =>
                  setMethod("upi")
                }
              />

              <PaymentOption
                active={method === "card"}
                value="card"
                title="Credit / Debit Card"
                description="Visa, Mastercard, RuPay & more"
                icon={
                  <CreditCard className="h-5 w-5" />
                }
                onSelect={() =>
                  setMethod("card")
                }
              />

              <PaymentOption
                active={method === "cod"}
                value="cod"
                title="Cash on Delivery"
                description="Pay when your handcrafted order arrives"
                icon={
                  <Truck className="h-5 w-5" />
                }
                onSelect={() =>
                  setMethod("cod")
                }
                last
              />
            </div>

            {(method === "razorpay" ||
              method === "upi" ||
              method === "card") && (
              <div className="mt-5 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/60 p-6">
                <div className="flex gap-4">
                  {method === "upi" ? (
                    <Smartphone className="h-6 w-6 shrink-0 text-[#8b1e2d]" />
                  ) : method === "card" ? (
                    <CreditCard className="h-6 w-6 shrink-0 text-[#8b1e2d]" />
                  ) : (
                    <WalletCards className="h-6 w-6 shrink-0 text-[#8b1e2d]" />
                  )}

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                      {method === "upi"
                        ? "Pay with UPI"
                        : method === "card"
                          ? "Pay with Card"
                          : "Pay securely with Razorpay"}
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-[#6d5149]">
                      {method === "upi"
                        ? "Razorpay will open a secure checkout where you can choose your preferred UPI application."
                        : method === "card"
                          ? "Enter your card details securely inside Razorpay Checkout. KALAKRITI never stores your complete card details."
                          : "Continue to Razorpay Checkout to pay using UPI, cards, net banking or wallets."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(method === "upi"
                        ? ["UPI Apps", "QR", "UPI ID"]
                        : method === "card"
                          ? [
                              "Visa",
                              "Mastercard",
                              "RuPay",
                            ]
                          : [
                              "UPI",
                              "Cards",
                              "Net Banking",
                              "Wallets",
                            ]
                      ).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#b08a4a]/30 bg-[#fbf6e9] px-3 py-1.5 text-[10px] font-bold text-[#65443c]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
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
                      Pay the delivery partner when your
                      KALAKRITI order reaches you.
                    </p>

                    <p className="mt-3 text-xs font-semibold text-[#58704d]">
                      No online payment is required.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/50 p-5">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#58704d]" />

              <div>
                <p className="text-sm font-bold text-[#4a211c]">
                  Your payment is secure
                </p>

                <p className="mt-1 text-xs leading-5 text-[#80665d]">
                  KALAKRITI does not store your complete card
                  or payment credentials. Online transactions
                  are processed through Razorpay.
                </p>
              </div>
            </div>

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
                disabled={
                  processing ||
                  loadingCart ||
                  !address ||
                  items.length === 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e2d] px-7 py-3.5 text-sm font-bold text-[#fff8eb] transition hover:bg-[#711725] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {processing
                  ? method === "cod"
                    ? "Placing Order..."
                    : "Opening Secure Checkout..."
                  : method === "cod"
                    ? "Place COD Order"
                    : "Continue to Payment"}

                {!processing && (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 lg:sticky lg:top-6">
            <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 border-b border-[#b08a4a]/25 pb-6">
              {items.length === 0 ? (
                <p className="text-sm text-[#80665d]">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#4a211c]">
                        {item.product?.name ??
                          "Product"}
                      </p>

                      <p className="mt-1 text-[11px] text-[#80665d]">
                        Qty {item.quantity}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold">
                      {formatCurrency(
                        Number(
                          item.product?.price ?? 0,
                        ) * item.quantity,
                      )}
                    </span>
                  </div>
                ))
              )}

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-[#6d5149]">
                  Delivery
                </span>

                <span className="font-semibold text-[#58704d]">
                  {estimatedDelivery === 0
                    ? "FREE"
                    : formatCurrency(
                        estimatedDelivery,
                      )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-5">
              <span className="font-serif text-lg font-semibold">
                Estimated Total
              </span>

              <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                {formatCurrency(estimatedTotal)}
              </span>
            </div>

            <div className="rounded-xl bg-[#efe4ce]/70 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#58704d]" />

                <p className="text-[11px] leading-5 text-[#6d5149]">
                  Final order total is calculated by the
                  KALAKRITI backend when your order is
                  created.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function CheckoutStep({
  number,
  title,
  active = false,
  completed = false,
}: {
  number: string;
  title: string;
  active?: boolean;
  completed?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
          active
            ? "bg-[#8b1e2d] text-[#fff8eb]"
            : completed
              ? "bg-[#58704d] text-[#fff8eb]"
              : "border border-[#b08a4a]/50 bg-[#fbf6e9] text-[#80665d]"
        }`}
      >
        {completed ? (
          <Check className="h-4 w-4" />
        ) : (
          number
        )}
      </span>

      <span
        className={`hidden text-xs font-bold sm:block ${
          active
            ? "text-[#8b1e2d]"
            : completed
              ? "text-[#58704d]"
              : "text-[#80665d]"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function CheckoutLine({
  active = false,
}: {
  active?: boolean;
}) {
  return (
    <div
      className={`mx-3 h-px min-w-5 flex-1 ${
        active
          ? "bg-[#8b1e2d]/40"
          : "bg-[#b08a4a]/35"
      }`}
    />
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
        !last
          ? "border-b border-[#b08a4a]/25"
          : ""
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
        {active && (
          <Check className="h-3 w-3 text-[#fff8eb]" />
        )}
      </span>
    </button>
  );
}
