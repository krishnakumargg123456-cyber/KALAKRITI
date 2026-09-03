"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Home,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CheckoutAddress = {
  id?: number;
  full_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string | null;
  landmark?: string | null;
  city?: string;
  district?: string | null;
  state?: string;
  postal_code?: string;
  country?: string;
};

type CheckoutItem = {
  id?: number | string;
  quantity: number;
  product?: {
    id?: string;
    name?: string;
    price?: number | string;
    slug?: string;
    material?: string | null;
  } | null;
};

type StoredOrder = {
  id?: number | string;
  order_number?: string | null;
  total_amount?: number | string | null;
  status?: string | null;
  payment_status?: string | null;
};

export default function CheckoutSuccessPage() {
  const [copied, setCopied] = useState(false);
  const [address, setAddress] =
    useState<CheckoutAddress | null>(null);
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [order, setOrder] =
    useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const storedAddress = sessionStorage.getItem(
        "kalakriti_checkout_address",
      );

      if (storedAddress) {
        const parsed = JSON.parse(storedAddress);

        if (parsed && typeof parsed === "object") {
          setAddress(parsed);
        }
      }

      const storedItems = sessionStorage.getItem(
        "kalakriti_checkout_items",
      );

      if (storedItems) {
        const parsed = JSON.parse(storedItems);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }

      const storedOrder = sessionStorage.getItem(
        "kalakriti_checkout_order",
      );

      if (storedOrder) {
        const parsed = JSON.parse(storedOrder);

        if (parsed && typeof parsed === "object") {
          setOrder(parsed);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const orderNumber =
    order?.order_number ??
    (order?.id ? `Order #${order.id}` : "Order confirmed");

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

  const backendTotal =
    order?.total_amount !== null &&
    order?.total_amount !== undefined
      ? Number(order.total_amount)
      : null;

  const total =
    backendTotal !== null
      ? backendTotal
      : subtotal;

  const delivery =
    total > 0 && subtotal < 999 ? 99 : 0;

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(
        orderNumber,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const hasAddress =
    Boolean(address?.full_name) ||
    Boolean(address?.address_line1) ||
    Boolean(address?.city);

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
            <ShieldCheck className="h-4 w-4 text-[#58704d]" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="flex items-center gap-2 text-xs text-[#80665d]">
          <Link
            href="/"
            className="hover:text-[#8b1e2d]"
          >
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <span className="font-semibold text-[#4a211c]">
            Order Confirmation
          </span>
        </div>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#b08a4a]/30 bg-[#fbf6e9] text-center shadow-[0_15px_45px_rgba(67,35,25,0.06)]">
          <div className="border-b border-[#b08a4a]/25 bg-[#8b1e2d] px-6 py-12 sm:px-10 sm:py-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#e5c98b] bg-[#58704d]">
              <Check
                className="h-10 w-10 text-[#fff8eb]"
                strokeWidth={3}
              />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c98b]">
              Order Confirmed
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#fff8eb] sm:text-5xl">
              Thank you for choosing handmade.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#f1dfc9]">
              Your KALAKRITI order has been placed
              successfully. Our artisan partners will
              carefully prepare your pieces for their
              journey to you.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#80665d]">
              Order Number
            </p>

            <div className="mx-auto mt-3 flex w-fit items-center gap-3 rounded-xl border border-[#b08a4a]/35 bg-[#efe4ce]/60 px-4 py-3">
              <span className="font-mono text-sm font-bold tracking-wide text-[#4a211c]">
                {orderNumber}
              </span>

              <button
                type="button"
                onClick={copyOrderNumber}
                aria-label="Copy order number"
                className="text-[#8b1e2d] transition hover:text-[#711725]"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {copied && (
              <p className="mt-2 text-xs font-semibold text-[#58704d]">
                Order number copied
              </p>
            )}

            <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
              <InfoCard
                icon={
                  <Package className="h-5 w-5" />
                }
                title="Status"
                text={
                  order?.status
                    ? formatStatus(order.status)
                    : "Order received"
                }
              />

              <InfoCard
                icon={
                  <MapPin className="h-5 w-5" />
                }
                title="Delivering To"
                text={
                  address?.city &&
                  address?.state
                    ? `${address.city}, ${address.state}`
                    : "Address saved at checkout"
                }
              />

              <InfoCard
                icon={
                  <ShoppingBag className="h-5 w-5" />
                }
                title="Order Total"
                text={
                  total > 0
                    ? formatCurrency(total)
                    : "Total confirmed at checkout"
                }
              />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
              What happens next
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
              Your handmade journey
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <TimelineStep
              number="01"
              title="Crafted"
              description="Our artisan partner prepares and checks each piece with care."
              active
            />

            <TimelineStep
              number="02"
              title="Packed"
              description="Your order is safely wrapped and prepared for dispatch."
            />

            <TimelineStep
              number="03"
              title="Delivered"
              description="Your handcrafted pieces make their way to your doorstep."
            />
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                  Order Details
                </h2>

                <p className="mt-1 text-xs text-[#80665d]">
                  {items.length > 0
                    ? `${items.length} ${
                        items.length === 1
                          ? "product"
                          : "products"
                      }`
                    : "Order details are available in My Orders."}
                </p>
              </div>

              <ShoppingBag className="h-6 w-6 text-[#8b1e2d]" />
            </div>

            {items.length > 0 ? (
              <>
                <div className="mt-6 divide-y divide-[#b08a4a]/25">
                  {items.map((item, index) => (
                    <OrderItem
                      key={
                        item.id ??
                        item.product?.id ??
                        index
                      }
                      name={
                        item.product?.name ??
                        "Handcrafted Product"
                      }
                      material={
                        item.product?.material ??
                        null
                      }
                      quantity={item.quantity}
                      price={
                        Number(
                          item.product?.price ?? 0,
                        )
                      }
                      slug={
                        item.product?.slug ??
                        null
                      }
                    />
                  ))}
                </div>

                <div className="mt-6 border-t border-[#b08a4a]/25 pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6d5149]">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-[#6d5149]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#58704d]">
                      {delivery === 0
                        ? "FREE"
                        : formatCurrency(
                            delivery,
                          )}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-between border-t border-[#b08a4a]/25 pt-5">
                    <span className="font-serif text-lg font-semibold">
                      Total
                    </span>

                    <span className="font-serif text-xl font-bold text-[#8b1e2d]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-6 rounded-xl bg-[#efe4ce]/60 p-5">
                <p className="text-sm leading-6 text-[#6d5149]">
                  Your order was successfully submitted.
                  Open My Orders to view the complete
                  product, payment and delivery details.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-[#b08a4a]/30 bg-[#fbf6e9] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
                <MapPin className="h-5 w-5" />
              </span>

              <h2 className="font-serif text-2xl font-semibold text-[#4a211c]">
                Delivery Address
              </h2>
            </div>

            {hasAddress ? (
              <div className="mt-6 rounded-xl bg-[#efe4ce]/65 p-5">
                {address?.full_name && (
                  <p className="text-sm font-bold text-[#4a211c]">
                    {address.full_name}
                  </p>
                )}

                <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                  {address?.address_line1}

                  {address?.address_line2 && (
                    <>
                      <br />
                      {address.address_line2}
                    </>
                  )}

                  {address?.landmark && (
                    <>
                      <br />
                      {address.landmark}
                    </>
                  )}

                  {(address?.city ||
                    address?.state ||
                    address?.postal_code) && (
                    <>
                      <br />
                      {address.city}
                      {address.city &&
                      address.district
                        ? `, ${address.district}`
                        : ""}
                      {address.state
                        ? `, ${address.state}`
                        : ""}
                      {address.postal_code
                        ? ` - ${address.postal_code}`
                        : ""}
                    </>
                  )}
                </p>

                {address?.phone && (
                  <p className="mt-3 text-xs text-[#80665d]">
                    Phone: {address.phone}
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-[#efe4ce]/65 p-5">
                <p className="text-sm leading-6 text-[#6d5149]">
                  Your delivery address is available with
                  your order record.
                </p>
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <TruckIcon />

              <p className="text-xs leading-5 text-[#80665d]">
                Estimated delivery details will be
                updated once your artisan partner
                dispatches the order.
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#b08a4a]/30 bg-[#efe4ce]/55 p-6 sm:flex-row sm:p-7">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
              Keep discovering India&apos;s craft
              heritage.
            </h2>

            <p className="mt-1 text-xs text-[#80665d]">
              Explore more handcrafted pieces from
              artisans across India.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 rounded-lg border border-[#8b1e2d]/30 px-5 py-3 text-xs font-bold text-[#8b1e2d] transition hover:bg-[#fbf6e9]"
            >
              View My Orders
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-[#8b1e2d] px-5 py-3 text-xs font-bold text-[#fff8eb] transition hover:bg-[#711725]"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center text-xs text-[#80665d] sm:flex-row">
          <Home className="h-4 w-4 text-[#8b1e2d]" />

          <span>
            Need help with your order? Visit our{" "}
            <Link
              href="/contact"
              className="font-bold text-[#8b1e2d] hover:underline"
            >
              Contact page
            </Link>
            .
          </span>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-[#b08a4a]/25 bg-[#efe4ce]/55 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b1e2d] text-[#fff8eb]">
        {icon}
      </span>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#8b1e2d]">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-[#6d5149]">
        {text}
      </p>
    </div>
  );
}

function TimelineStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
            active
              ? "bg-[#8b1e2d] text-[#fff8eb]"
              : "border border-[#b08a4a]/40 bg-[#efe4ce] text-[#80665d]"
          }`}
        >
          {number}
        </span>

        <h3 className="font-serif text-lg font-semibold text-[#4a211c]">
          {title}
        </h3>
      </div>

      <p className="mt-3 pl-12 text-xs leading-5 text-[#80665d]">
        {description}
      </p>
    </div>
  );
}

function OrderItem({
  name,
  material,
  quantity,
  price,
  slug,
}: {
  name: string;
  material: string | null;
  quantity: number;
  price: number;
  slug: string | null;
}) {
  const content = (
    <div className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#efe4ce] text-[#8b1e2d]">
        <Package className="h-6 w-6" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-lg font-semibold text-[#4a211c]">
          {name}
        </h3>

        {material && (
          <p className="mt-1 text-xs text-[#80665d]">
            {material}
          </p>
        )}

        <p className="mt-2 text-[11px] font-semibold text-[#80665d]">
          Qty {quantity}
        </p>
      </div>

      <span className="shrink-0 text-sm font-bold text-[#4a211c]">
        {formatItemPrice(price, quantity)}
      </span>
    </div>
  );

  if (!slug) {
    return content;
  }

  return (
    <Link
      href={`/product/${slug}`}
      className="block transition hover:bg-[#efe4ce]/25"
    >
      {content}
    </Link>
  );
}

function formatItemPrice(
  price: number,
  quantity: number,
) {
  return `₹${(
    price * quantity
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
}

function formatStatus(status: string) {
  return status
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function TruckIcon() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#8b1e2d] text-[#fff8eb]">
      <Truck className="h-4 w-4" />
    </div>
  );
}
