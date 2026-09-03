import Link from "next/link";

const exploreLinks = [
  ["Shop", "/shop"],
  ["Artisans", "/artisans"],
  ["Craft Heritage", "/craft-heritage"],
  ["Our Story", "/our-story"],
];

const helpLinks = [
  ["Contact Us", "/contact"],
  ["Shipping & Delivery", "/shipping"],
  ["Returns", "/returns"],
  ["FAQs", "/faq"],
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/50 bg-maroon-deep text-white">
      <div className="kalakriti-container px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-gold-light">
              KALAKRITI
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
              Discover authentic Indian handicrafts and the stories of the
              artisans who keep India&apos;s living craft traditions alive.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-gold-light">
              Explore
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
              Help
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
              Our Promise
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/70">
              Every purchase supports Indian artisans and helps preserve
              generations of traditional craftsmanship.
            </p>
          </div>
        </div>

        <div className="mt-12 h-px bg-gold/30" />

        <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Kalakriti. All rights reserved.
          </p>

          <p>Made with respect for Indian craft heritage.</p>
        </div>
      </div>
    </footer>
  );
}
