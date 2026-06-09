import { EventDetails } from "@/components/EventDetails";
import { Hero } from "@/components/Hero";
import { RSVPForm } from "@/components/RSVPForm";
import { SiteFooter } from "@/components/SiteFooter";
import { WeddingColors } from "@/components/WeddingColors";
import { Section } from "@/components/ui/Section";
import { siteContent } from "@/data/site-content";
import { formatLongDate } from "@/lib/format";

export default function Home() {
  const { rsvp } = siteContent;

  return (
    <main>
      <Hero />
      <EventDetails />
      <WeddingColors />

      <Section
        id="rsvp"
        eyebrow="Kindly Respond"
        title={rsvp.heading}
        subtitle={rsvp.description}
        className="bg-sage-50/40"
      >
        <p className="mx-auto mb-10 w-fit rounded-full bg-white/70 px-5 py-2 text-center text-sm text-ink-500 shadow-sm ring-1 ring-cream-200">
          Please reply by{" "}
          <span className="font-medium text-sage-700">{formatLongDate(rsvp.deadline)}</span>
        </p>
        <RSVPForm />
      </Section>

      <SiteFooter />
    </main>
  );
}
