import {
  ArrowDown,
  HeartHandshake,
  PackageCheck,
  Search,
  Users,
} from "lucide-react";

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
    <section className="relative overflow-hidden border-y border-border bg-cream py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-[-120px] top-20 h-64 w-64 rounded-full border border-gold/40" />
        <div className="absolute right-[-100px] bottom-10 h-72 w-72 rounded-full border border-maroon/20" />
      </div>

      <div className="kalakriti-container relative px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            The Kalakriti way
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-deep-maroon md:text-5xl">
            From artisan hands to your home
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted md:text-base">
            A thoughtful journey that connects you with authentic Indian
            craftsmanship while keeping the artisan and their tradition at the
            heart of every purchase.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px border-t border-dashed border-gold/60 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-card border border-gold/40 bg-paper p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card"
                >
                  <div className="absolute right-4 top-4 font-serif text-3xl font-bold text-gold/20">
                    {step.number}
                  </div>

                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-cream shadow-soft transition-transform duration-300 group-hover:scale-105">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-maroon/30 bg-parchment">
                      <Icon
                        className="h-6 w-6 text-maroon"
                        strokeWidth={1.4}
                      />
                    </div>
                  </div>

                  <span className="mt-5 inline-flex items-center rounded-full border border-gold/40 bg-cream px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-gold">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-4 font-serif text-xl font-semibold text-deep-maroon">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {step.text}
                  </p>

                  {index < steps.length - 1 && (
                    <ArrowDown className="mx-auto mt-5 h-4 w-4 text-gold/50 lg:hidden" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
