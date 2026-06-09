import { DressIcon } from "@/components/Icons";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/data/site-content";

/**
 * Dress code section: an attire preference note plus a "Wedding Colors" swatch
 * guide so guests can dress in the palette. All content (including the swatch
 * names and hex values) is editable in `data/site-content.ts` → `attire`.
 */
export function WeddingColors() {
  const { attire } = siteContent;

  return (
    <Section id="attire" eyebrow="What to Wear" title={attire.heading} subtitle={attire.subheading}>
      {/* Attire preference */}
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50 text-sage-600 ring-1 ring-sage-100">
          <DressIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-ink-800">{attire.preferenceTitle}</h3>
        <div className="mt-3 space-y-1 text-ink-500">
          {attire.preference.map((line, i) => (
            <p key={i} className={i === 0 ? "font-medium text-ink-700" : undefined}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Wedding colors */}
      <div className="mt-16">
        <h3 className="text-center font-serif text-3xl text-ink-800">{attire.colorsTitle}</h3>
        <p className="mt-2 text-center text-sm text-ink-400">{attire.colorsNote}</p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-start justify-center gap-x-8 gap-y-8 sm:gap-x-12">
          {attire.colors.map((c) => (
            <div key={c.name} className="flex w-20 flex-col items-center text-center sm:w-24">
              <span
                aria-hidden
                style={{ backgroundColor: c.hex }}
                className="h-20 w-20 rounded-full shadow-sm ring-1 ring-ink-900/10 transition-transform duration-300 hover:scale-105 sm:h-24 sm:w-24"
              />
              <span className="mt-3 font-serif text-base italic text-sage-700">{c.name}</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ink-400">{c.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
