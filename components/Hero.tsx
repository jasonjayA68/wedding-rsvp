import { Botanical } from "@/components/Botanical";
import { Countdown } from "@/components/Countdown";
import { buttonVariants } from "@/components/ui/Button";
import { siteContent } from "@/data/site-content";
import { cn } from "@/lib/cn";

/**
 * Full-screen hero with the couple's names in script, a date block echoing the
 * invitation, a countdown, and the primary RSVP call to action.
 */
export function Hero() {
  const { couple, hero, event } = siteContent;

  return (
    <header className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Botanical corner accents */}
      <Botanical className="pointer-events-none absolute -left-6 -top-8 h-56 w-40 text-sage-500 sm:h-72 sm:w-52" />
      <Botanical className="pointer-events-none absolute -right-6 -top-8 h-56 w-40 -scale-x-100 text-sage-500 sm:h-72 sm:w-52" />
      <Botanical className="pointer-events-none absolute -bottom-10 -left-6 h-48 w-36 -scale-y-100 text-sage-400 opacity-80 sm:h-60 sm:w-44" />
      <Botanical className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-36 -scale-100 text-sage-400 opacity-80 sm:h-60 sm:w-44" />

      <div className="animate-fade-up relative z-10 flex flex-col items-center">
        <p className="eyebrow text-xs text-sage-600 sm:text-sm">{hero.eyebrow}</p>

        <h1 className="mt-6 font-script leading-[0.85] text-sage-700">
          <span className="block text-7xl sm:text-8xl lg:text-[9rem]">{couple.partnerOne}</span>
          <span className="my-1 block text-5xl text-sage-500 sm:text-6xl">&amp;</span>
          <span className="block text-7xl sm:text-8xl lg:text-[9rem]">{couple.partnerTwo}</span>
        </h1>

        <p className="mt-8 max-w-md text-balance font-serif text-lg italic text-ink-600 sm:text-xl">
          {hero.invitation}
        </p>

        {/* Date block */}
        <div className="mt-10 flex items-stretch gap-5 text-ink-700">
          <div className="flex flex-col items-center justify-center">
            <span className="eyebrow text-xs text-sage-600">{hero.dateBlock.month}</span>
            <span className="-mt-1 font-serif text-5xl leading-none text-ink-800 sm:text-6xl">
              {hero.dateBlock.day}
            </span>
            <span className="mt-2 eyebrow text-xs text-sage-600">{hero.dateBlock.year}</span>
          </div>
          <div className="w-px self-stretch bg-sage-300" />
          <div className="flex flex-col items-start justify-center text-left">
            <span className="eyebrow text-sm text-ink-700">{hero.dateBlock.weekday}</span>
            <span className="mt-1 text-sm text-ink-500">{hero.dateBlock.time}</span>
            <span className="mt-2 max-w-[14rem] text-sm text-ink-500">{hero.venueShort}</span>
          </div>
        </div>

        <div className="mt-12">
          <Countdown targetISO={event.date} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#rsvp" className={buttonVariants("primary", "lg")}>
            {hero.ctaLabel}
          </a>
          <a href="#details" className={cn(buttonVariants("ghost", "lg"))}>
            View details
          </a>
        </div>
      </div>
    </header>
  );
}
