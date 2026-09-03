"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  HelpCircle,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getOrder } from "@/lib/api/orders";

type RawItem = Record<string, unknown>;
type RawOrder = Record<string, unknown>;

type OrderItem = {
  id: string;
  name: string;
  artisan: string | null;
  quantity: number;
  price: number;
  image: string | null;
};

type OrderData = {
  id: string;
  orderNumber: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string | null;
  paymentStatus: string | null;
  estimatedDelivery: string | null;
  address: {
    fullName: string | null;
    phone: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    state: string | null;
    postalCode: string | null;
    country: string | null;
  };
};

const fallbackImage =
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=700&q=85";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: unknown) {
  if (!value) return "Date unavailable";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getArray(value: unknown): RawItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is RawItem =>
      typeof item === "object" && item !== null
  );
}

function normalizeStatus(value: unknown) {
  const status = String(value ?? "Processing")
    .replace(/_/g, " ")
    .trim();

  if (!status) return "Processing";

  return status
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getProduct(item: RawItem) {
  return typeof item.product === "object" && item.product !== null
    ? (item.product as RawItem)
    : null;
}

function getItemImage(item: RawItem) {
  const product = getProduct(item);
  const images = getArray(product?.images);
  const firstImage = images[0];

  return (
    (typeof item.image_url === "string" ? item.image_url : null) ??
    (typeof item.product_image === "string"
      ? item.product_image
      : null) ??
    (typeof product?.image_url === "string"
      ? product.image_url
      : null) ??
    (typeof firstImage?.image_url === "string"
      ? firstImage.image_url
      : null)
  );
}

function normalizeItem(item: RawItem, index: number): OrderItem {
  const product = getProduct(item);

  const rawPrice =
    item.price ??
    item.unit_price ??
    item.product_price ??
    product?.price ??
    0;

  const rawQuantity = Number(item.quantity ?? item.qty ?? 1);

  const artisan =
    typeof item.artisan_name === "string"
      ? item.artisan_name
      : typeof product?.artisan_name === "string"
        ? product.artisan_name
        : typeof product?.artisan === "object" &&
            product.artisan !== null &&
            typeof (product.artisan as RawItem).name === "string"
          ? String((product.artisan as RawItem).name)
          : null;

  return {
    id: String(item.id ?? item.item_id ?? index),
    name: String(
      item.product_name ??
        item.name ??
        product?.name ??
        "KALAKRITI Handmade Product"
    ),
    artisan,
    quantity:
      Number.isFinite(rawQuantity) && rawQuantity > 0
        ? rawQuantity
        : 1,
    price: Number.isFinite(Number(rawPrice))
      ? Number(rawPrice)
      : 0,
    image: getItemImage(item),
  };
}

function normalizeOrder(raw: RawOrder): OrderData {
  const rawItems = getArray(
    raw.items ?? raw.order_items ?? raw.orderItems
  );

  const items = rawItems.map(normalizeItem);

  const subtotalValue = Number(
    raw.subtotal ??
      raw.sub_total ??
      raw.items_total ??
      raw.products_total ??
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
  );

  const shippingValue = Number(
    raw.shipping_amount ??
      raw.shipping_fee ??
      raw.delivery_charge ??
      raw.shipping ??
      0
  );

  const discountValue = Number(
    raw.discount_amount ??
      raw.discount ??
      raw.coupon_discount ??
      0
  );

  const totalValue = Number(
    raw.total_amount ??
      raw.grand_total ??
      raw.total ??
      subtotalValue + shippingValue - discountValue
  );

  const rawAddress =
    typeof raw.shipping_address === "object" &&
    raw.shipping_address !== null
      ? (raw.shipping_address as RawOrder)
      : raw;

  const rawId = raw.id ?? raw.order_id ?? raw.uuid ?? "";

  return {
    id: String(rawId),
    orderNumber: String(
      raw.order_number ??
        raw.orderNumber ??
        raw.number ??
        (rawId ? `Order #${rawId}` : "Order")
    ),
    status: normalizeStatus(raw.status ?? raw.order_status),
    createdAt: String(
      raw.created_at ??
        raw.createdAt ??
        raw.order_date ??
        raw.date ??
        ""
    ),
    items,
    subtotal: Number.isFinite(subtotalValue) ? subtotalValue : 0,
    shipping: Number.isFinite(shippingValue) ? shippingValue : 0,
    discount: Number.isFinite(discountValue) ? discountValue : 0,
    total: Number.isFinite(totalValue) ? totalValue : 0,
    paymentMethod:
      typeof raw.payment_method === "string"
        ? raw.payment_method
        : typeof (raw.payment as { method?: string } | null)?.method === "string"
          ? (raw.payment as { method?: string }).method ?? null
          : null,
    paymentStatus:
      typeof raw.payment_status === "string"
        ? raw.payment_status
        : typeof (raw.payment as { status?: string } | null)?.status === "string"
          ? (raw.payment as { status?: string }).status ?? null
          : null,
    estimatedDelivery:
      raw.estimated_delivery ??
      raw.expected_delivery ??
      raw.delivery_date
        ? String(
            raw.estimated_delivery ??
              raw.expected_delivery ??
              raw.delivery_date
          )
        : null,
    address: {
      fullName:
        typeof rawAddress.full_name === "string"
          ? rawAddress.full_name
          : null,
      phone:
        typeof rawAddress.phone === "string"
          ? rawAddress.phone
          : null,
      addressLine1:
        typeof rawAddress.address_line1 === "string"
          ? rawAddress.address_line1
          : null,
      addressLine2:
        typeof rawAddress.address_line2 === "string"
          ? rawAddress.address_line2
          : null,
      city:
        typeof rawAddress.city === "string"
          ? rawAddress.city
          : null,
      state:
        typeof rawAddress.state === "string"
          ? rawAddress.state
          : null,
      postalCode:
        typeof rawAddress.postal_code === "string"
          ? rawAddress.postal_code
          : null,
      country:
        typeof rawAddress.country === "string"
          ? rawAddress.country
          : null,
    },
  };
}

function getTrackingSteps(order: OrderData) {
  const status = order.status.toLowerCase();

  const delivered = status.includes("deliver");
  const shipped = status.includes("ship");
  const crafted =
    status.includes("craft") ||
    status.includes("process") ||
    status.includes("confirm") ||
    status.includes("paid");

  return [
    {
      title: "Order Placed",
      completed: true,
      description: "Your order has been successfully placed.",
    },
    {
      title: "Confirmed",
      completed: crafted || shipped || delivered,
      description: "Your order has been received and confirmed.",
    },
    {
      title: "Being Crafted",
      completed: crafted || shipped || delivered,
      description: "Your handmade pieces are being prepared.",
    },
    {
      title: "Shipped",
      completed: shipped || delivered,
      description: "Your package has been handed to the delivery partner.",
    },
    {
      title: "Delivered",
      completed: delivered,
      description: "Your KALAKRITI order has reached its destination.",
    },
  ];
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const response = await getOrder(params.id);

        if (!mounted) return;

        const raw =
          typeof response === "object" &&
          response !== null &&
          "data" in response &&
          typeof (response as RawOrder).data === "object" &&
          (response as RawOrder).data !== null
            ? ((response as RawOrder).data as RawOrder)
            : (response as RawOrder);

        setOrder(normalizeOrder(raw));
      } catch (err) {
        console.error("Failed to load order:", err);

        if (mounted) {
          setError(
            "We could not load this order. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      mounted = false;
    };
  }, [params.id]);

  const trackingSteps = useMemo(
    () => (order ? getTrackingSteps(order) : []),
    [order]
  );

  const copyOrderId = async () => {
    if (!order) return;

    try {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f0df] px-6 py-20 text-[#3d1f1b]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] px-6 py-16 text-center">
          <Clock3 className="mx-auto h-9 w-9 animate-pulse text-[#8b1e2d]" />

          <h1 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
            Loading order details
          </h1>

          <p className="mt-2 text-sm text-[#6d5149]">
            Gathering the details of your handmade order.
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f7f0df] px-6 py-20 text-[#3d1f1b]">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#8b1e2d]/25 bg-[#fbf6e9] px-6 py-16 text-center">
          <Package className="mx-auto h-9 w-9 text-[#8b1e2d]" />

          <h1 className="mt-5 font-serif text-2xl font-semibold text-[#4a211c]">
            Order details unavailable
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d5149]">
            {error || "We could not find this order."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[#8b1e2d] px-5 py-3 text-sm font-bold text-[#fff8eb]"
            >
              Try Again
            </button>

            <Link
              href="/orders"
              className="rounded-lg border border-[#8b1e2d]/30 px-5 py-3 text-sm font-bold text-[#8b1e2d]"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#3d1f1b]">
      <section className="border-b border-[#b08a4a]/30 bg-[#efe4ce]/60">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#72554c] transition hover:text-[#8b1e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Orders
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1e2d]">
                Order Details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl font-semibold text-[#4a211c] sm:text-4xl">
                  {order.orderNumber}
                </h1>

                <button
                  type="button"
                  onClick={copyOrderId}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#b08a4a]/40 bg-[#fbf6e9] px-3 py-1.5 text-xs font-semibold text-[#72554c] transition hover:text-[#8b1e2d]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <p className="mt-2 text-sm text-[#80665d]">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#8b1e2d] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#fff8eb]">
              <Package className="h-4 w-4" />
              {order.status}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_8px_30px_rgba(67,35,25,0.05)] sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Order Journey
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                Follow your handmade order
              </h2>
            </div>

            {order.estimatedDelivery && (
              <p className="text-sm font-medium text-[#80665d]">
                Estimated delivery:{" "}
                <span className="font-bold text-[#4a211c]">
                  {formatDate(order.estimatedDelivery)}
                </span>
              </p>
            )}
          </div>

          <div className="mt-10">
            {trackingSteps.map((step, index) => {
              const current =
                step.completed &&
                !trackingSteps[index + 1]?.completed;

              const isLast = index === trackingSteps.length - 1;

              return (
                <div key={step.title} className="relative flex gap-5">
                  {!isLast && (
                    <div
                      className={`absolute left-[17px] top-9 h-[calc(100%-8px)] w-px ${
                        step.completed
                          ? "bg-[#8b1e2d]"
                          : "bg-[#b08a4a]/30"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                      step.completed
                        ? "border-[#8b1e2d] bg-[#8b1e2d] text-[#fff8eb]"
                        : "border-[#b08a4a]/40 bg-[#f7f0df] text-[#80665d]"
                    } ${
                      current
                        ? "ring-4 ring-[#8b1e2d]/10"
                        : ""
                    }`}
                  >
                    {step.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-[#b08a4a]" />
                    )}
                  </div>

                  <div
                    className={`${
                      isLast ? "pb-0" : "pb-8"
                    } pt-0.5`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3
                        className={`font-serif text-lg font-semibold ${
                          step.completed
                            ? "text-[#4a211c]"
                            : "text-[#80665d]"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {step.completed && index === 0 && (
                        <span className="text-xs font-medium text-[#8b1e2d]">
                          {formatDate(order.createdAt)}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-[#6d5149]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                    Your Items
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                    Handmade with care
                  </h2>
                </div>

                <span className="text-sm text-[#80665d]">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="mt-7 divide-y divide-[#b08a4a]/20">
                {order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#b08a4a]/30 bg-[#efe4ce]">
                        <img
                          src={item.image || fallbackImage}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-semibold text-[#4a211c]">
                          {item.name}
                        </h3>

                        {item.artisan && (
                          <p className="mt-1 text-xs text-[#80665d]">
                            Artisan: {item.artisan}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-[#80665d]">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-[#4a211c]">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-6 text-sm text-[#80665d]">
                    Item details are not available for this order.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b1e2d]/10">
                  <Truck className="h-5 w-5 text-[#8b1e2d]" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1e2d]">
                    Delivery
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold text-[#4a211c]">
                    Shipping to your address
                  </h2>
                </div>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <p className="text-sm font-semibold text-[#4a211c]">
                      Delivery Address
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                      {order.address.fullName && (
                        <>
                          {order.address.fullName}
                          <br />
                        </>
                      )}

                      {order.address.addressLine1 && (
                        <>
                          {order.address.addressLine1}
                          <br />
                        </>
                      )}

                      {order.address.addressLine2 && (
                        <>
                          {order.address.addressLine2}
                          <br />
                        </>
                      )}

                      {(order.address.city ||
                        order.address.state ||
                        order.address.postalCode) && (
                        <>
                          {[
                            order.address.city,
                            order.address.state,
                            order.address.postalCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                          <br />
                        </>
                      )}

                      {order.address.country || "India"}

                      {order.address.phone && (
                        <>
                          <br />
                          {order.address.phone}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <p className="text-sm font-semibold text-[#4a211c]">
                      Delivery Estimate
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#6d5149]">
                      {order.estimatedDelivery ? (
                        <>
                          Expected by
                          <br />
                          <strong className="text-[#4a211c]">
                            {formatDate(
                              order.estimatedDelivery
                            )}
                          </strong>
                        </>
                      ) : (
                        "Delivery estimate will appear when available."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#b08a4a]/35 bg-[#efe4ce]/70 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-[#8b1e2d]" />

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#4a211c]">
                      Need help with your order?
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#6d5149]">
                      Our support team is here to help with delivery,
                      returns, or anything else.
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#8b1e2d]"
                >
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>

          <aside>
            <section className="sticky top-6 rounded-2xl border border-[#b08a4a]/35 bg-[#fbf6e9] p-6 shadow-[0_8px_30px_rgba(67,35,25,0.05)]">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b1e2d]">
                Payment Summary
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#4a211c]">
                Order Total
              </h2>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-[#6d5149]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#4a211c]">
                    {formatPrice(order.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-[#6d5149]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#4a211c]">
                    {formatPrice(order.shipping)}
                  </span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between gap-4 text-[#6d5149]">
                    <span>Discount</span>
                    <span className="font-medium text-[#8b1e2d]">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-6 border-t border-[#b08a4a]/25" />

              <div className="flex items-end justify-between gap-4">
                <span className="font-serif text-lg font-semibold text-[#4a211c]">
                  Total
                </span>

                <span className="font-serif text-2xl font-bold text-[#8b1e2d]">
                  {formatPrice(order.total)}
                </span>
              </div>

              {(order.paymentMethod || order.paymentStatus) && (
                <div className="mt-6 rounded-lg border border-[#b08a4a]/25 bg-[#efe4ce]/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#80665d]">
                    Payment
                  </p>

                  {order.paymentMethod && (
                    <p className="mt-2 text-sm font-semibold text-[#4a211c]">
                      {order.paymentMethod
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (letter) =>
                          letter.toUpperCase()
                        )}
                    </p>
                  )}

                  {order.paymentStatus && (
                    <p className="mt-1 text-xs text-[#80665d]">
                      Status: {order.paymentStatus}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#80665d]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8b1e2d]" />

                <span>
                  Your payment and order are protected by KALAKRITI&apos;s
                  customer support policy.
                </span>
              </div>

              <Link
                href="/orders"
                className="mt-7 flex h-12 items-center justify-center gap-2 rounded-lg border border-[#8b1e2d]/35 text-sm font-bold text-[#8b1e2d] transition hover:bg-[#8b1e2d]/5"
              >
                View All Orders
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}







