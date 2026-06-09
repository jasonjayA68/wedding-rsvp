import { DetailIcon } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/data/site-content";

/**
 * "The Details" section: a responsive grid of detail cards plus an optional
 * order-of-the-day timeline. All content comes from `data/site-content.ts`.
 */
export function EventDetails() {
  const { details, schedule } = siteContent;

  return (
    <Section id="details" eyebrow="When & Where" title={details.heading} subtitle={details.subheading}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {details.cards.map((card) => (
          <article
            key={card.title}
            className="group flex flex-col items-center rounded-2xl border border-cream-200 bg-white/60 p-7 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-md"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-50 text-sage-600 ring-1 ring-sage-100 transition-colors group-hover:bg-sage-100">
              <DetailIcon name={card.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-serif text-2xl text-ink-800">{card.title}</h3>
            <div className="mt-3 space-y-1 text-sm text-ink-500">
              {card.lines.map((line, i) => (
                <p key={i} className={i === 0 ? "font-medium text-ink-700" : undefined}>
                  {line}
                </p>
              ))}
            </div>
            {card.action && (
              <a
                href={card.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonVariants("outline", "sm")} mt-5`}
              >
                {card.action.label}
              </a>
            )}
          </article>
        ))}
      </div>

      {schedule.items.length > 0 && (
        <div className="mx-auto mt-20 max-w-2xl">
          <h3 className="text-center font-serif text-3xl text-ink-800">{schedule.heading}</h3>
          <ol className="mt-10 space-y-0">
            {schedule.items.map((item, i) => (
              <li key={i} className="relative flex gap-6 pb-10 last:pb-0">
                {/* connector line */}
                {i < schedule.items.length - 1 && (
                  <span className="absolute left-[7px] top-4 h-full w-px bg-sage-200" aria-hidden />
                )}
                <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-sage-400 bg-cream-50" />
                <div className="flex-1">
                  <p className="eyebrow text-xs text-sage-600">{item.time}</p>
                  <p className="mt-1 font-serif text-xl text-ink-800">{item.title}</p>
                  {item.description && (
                    <p className="mt-0.5 text-sm text-ink-500">{item.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
