import {
  ArrowDown,
  ArrowRight,
  HeartHandshake,
  PackageCheck,
  Search,
  Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import type { TranslationMessages } from "@/lib/i18n";

const steps: Array<{
  number: string;
  icon: typeof Search;
  titleKey: keyof TranslationMessages["home"];
  textKey: keyof TranslationMessages["home"];
}> = [
  {
    icon: Search,
    number: "01",
    titleKey: "journeyDiscover",
    textKey: "journeyDiscoverText",
  },
  {
    icon: Users,
    number: "02",
    titleKey: "journeyMeetArtisan",
    textKey: "journeyMeetArtisanText",
  },
  {
    icon: HeartHandshake,
    number: "03",
    titleKey: "journeySupportTradition",
    textKey: "journeySupportTraditionText",
  },
  {
    icon: PackageCheck,
    number: "04",
    titleKey: "journeyBringHeritageHome",
    textKey: "journeyBringHeritageHomeText",
  },
];

export default function HowItWorks() {
  const { messages } = useI18n();
  return (
    <section className="relative overflow-hidden border-y border-[#b08d57]/30 bg-[#fffaf0] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#b08d57]/25" />
        <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full border border-[#641f20]/10" />
      </div>

      <div className="kalakriti-container relative px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kalakriti-eyebrow">{messages.home.journeyEyebrow}</p>

          <h2 className="kalakriti-heading mt-4 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            From artisan hands
            <span className="block text-[#7a3030]">to your home.</span>
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#b08d57]" />

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#75665b] md:text-base">{messages.home.journeyDescription}</p>
        </div>

        <div className="relative mt-16 md:mt-20">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[48px] hidden h-px bg-[#b08d57]/40 lg:block" />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="group relative">
                  <div className="relative border-t border-[#b08d57]/50 pt-5">
                    <div className="flex items-start justify-between">
                      <span className="font-serif text-5xl font-medium leading-none text-[#b08d57]/35">
                        {step.number}
                      </span>

                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b08d57] bg-[#fbf7ee] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#f4ead8]">
                        <Icon
                          className="h-6 w-6 text-[#641f20]"
                          strokeWidth={1.35}
                        />
                      </div>
                    </div>

                    <div className="mt-7 h-px w-10 bg-[#641f20]/30 transition-all duration-500 group-hover:w-16 group-hover:bg-[#b08d57]" />

                    <h3 className="mt-5 font-serif text-2xl font-medium text-[#641f20]">
                      {messages.home[step.titleKey]}
                    </h3>

                    <p className="mt-3 max-w-xs text-sm leading-7 text-[#75665b]">
                      {messages.home[step.textKey]}
                    </p>

                    {index < steps.length - 1 && (
                      <div className="mt-6 flex items-center gap-2 text-[#b08d57] lg:absolute lg:-right-5 lg:top-[35px] lg:mt-0 lg:translate-x-1/2">
                        <ArrowRight className="hidden h-4 w-4 lg:block" />
                        <ArrowDown className="h-4 w-4 lg:hidden" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-3 text-center">
          <span className="h-px flex-1 bg-[#b08d57]/25" />
          <span className="font-serif text-sm italic text-[#75665b]">
            {messages.home.journeyClosing}
          </span>
          <span className="h-px flex-1 bg-[#b08d57]/25" />
        </div>
      </div>
    </section>
  );
}