import { HeartHandshake, PackageCheck, Search, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    text: "Find authentic crafts from different regions and traditions of India.",
  },
  {
    icon: Users,
    number: "02",
    title: "Meet the Artisan",
    text: "Learn about the maker, their community, and the tradition behind each piece.",
  },
  {
    icon: HeartHandshake,
    number: "03",
    title: "Support Tradition",
    text: "Your purchase directly contributes to sustaining artisan livelihoods.",
  },
  {
    icon: PackageCheck,
    number: "04",
    title: "Bring Heritage Home",
    text: "Receive a handcrafted piece carrying a story that deserves to continue.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-border bg-cream py-20 md:py-24">
      <div className="kalakriti-container px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            The Kalakriti way
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-deep-maroon md:text-5xl">
            From artisan hands to your home
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-paper text-maroon">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </div>

                <span className="mt-5 block text-xs font-semibold tracking-[0.2em] text-gold">
                  {step.number}
                </span>

                <h3 className="mt-2 font-serif text-xl font-semibold text-deep-maroon">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
