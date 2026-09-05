"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { messages } = useI18n();

  const exploreLinks = [
    [messages.footer.shop, "/shop"],
    [messages.footer.artisans, "/artisans"],
    [messages.footer.craftHeritage, "/craft-heritage"],
    [messages.footer.ourStory, "/our-story"],
  ];

  const helpLinks = [
    [messages.footer.contactUs, "/contact"],
    [messages.footer.shippingDelivery, "/shipping"],
    [messages.footer.returns, "/returns"],
    [messages.footer.faqs, "/faq"],
  ];

  return (
    <footer className="border-t border-gold/50 bg-maroon-deep text-white">
      <div className="kalakriti-container px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-gold-light">
              KALAKRITI
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
              {messages.footer.description}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold-light">
              {messages.footer.explore}
            </h3>

            <div className="mt-4 space-y-3">
              {exploreLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-white/70 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold-light">
              {messages.footer.help}
            </h3>

            <div className="mt-4 space-y-3">
              {helpLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm text-white/70 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold-light">
              {messages.footer.ourPromise}
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/70">
              {messages.footer.promiseDescription}
            </p>
          </div>
        </div>

        <div className="mt-12 h-px bg-gold/30" />

        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Kalakriti. {messages.footer.copyright}
          </p>

          <p>{messages.footer.heritageRespect}</p>
          <p className="text-gold-light/80">
            Created by Krishna &amp; Minakshi
          </p>
        </div>
      </div>
    </footer>
  );
}