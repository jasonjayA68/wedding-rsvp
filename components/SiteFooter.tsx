import { Botanical } from "@/components/Botanical";
import { siteContent } from "@/data/site-content";
import { formatLongDate } from "@/lib/format";

export function SiteFooter() {
  const { couple, footer, event } = siteContent;

  return (
    <footer className="relative overflow-hidden border-t border-cream-200 bg-cream-100/60 px-6 py-16 text-center">
      <Botanical className="pointer-events-none absolute -left-4 bottom-0 h-32 w-24 -scale-y-100 text-sage-300 opacity-70" />
      <Botanical className="pointer-events-none absolute -right-4 bottom-0 h-32 w-24 -scale-100 text-sage-300 opacity-70" />

      <div className="relative z-10 mx-auto max-w-xl">
        <p className="font-serif text-base italic text-ink-500">{footer.closing}</p>
        <p className="mt-3 font-script text-6xl text-sage-700">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </p>
        <div className="rule mx-auto mt-6 w-40">
          <span>❦</span>
        </div>
        <p className="mt-6 text-sm text-ink-500">{formatLongDate(event.date)}</p>
        <p className="mt-2 eyebrow text-xs text-sage-600">{footer.hashtag}</p>
      </div>
    </footer>
  );
}
