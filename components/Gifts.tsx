import { GiftIcon } from "@/components/Icons";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/data/site-content";

/**
 * A gracious note about gifts. All copy is editable in
 * `data/site-content.ts` → `gifts`.
 */
export function Gifts() {
  const { gifts } = siteContent;

  return (
    <Section id="gifts" eyebrow="With Gratitude" title={gifts.heading}>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50 text-sage-600 ring-1 ring-sage-100">
          <GiftIcon className="h-8 w-8" />
        </span>

        <p className="mt-6 max-w-md text-balance font-serif text-xl italic text-ink-700 sm:text-2xl">
          {gifts.lead}
        </p>

        <div className="mt-5 space-y-4 leading-relaxed text-ink-500">
          {gifts.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <p className="mt-8 font-serif text-lg italic text-sage-700">{gifts.closing}</p>
      </div>
    </Section>
  );
}
