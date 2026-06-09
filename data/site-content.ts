/**
 * =============================================================================
 *  EDIT EVERYTHING HERE
 * =============================================================================
 *  This is the single source of truth for all text and event information shown
 *  on the public site. Change names, dates, copy, venue, links, and the photo
 *  here — no other files need to be touched for content edits.
 *
 *  To change COLORS and FONTS, see `app/globals.css` (the `@theme` block).
 * =============================================================================
 */

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
};

export type DetailCard = {
  /** Name of an icon from `components/Icons.tsx` */
  icon: "rings" | "calendar" | "location" | "clock" | "dress" | "heart";
  title: string;
  lines: string[];
  /** Optional link rendered as a button under the card */
  action?: { label: string; href: string };
};

export const siteContent = {
  /** Couple — shown in the hero and throughout the site. */
  couple: {
    partnerOne: "Dave",
    partnerTwo: "Eliza",
  },

  /** Browser tab title + share description. */
  meta: {
    title: "Dave & Eliza — Wedding RSVP",
    description:
      "Join us as we celebrate the wedding of Dave & Eliza on June 27, 2026 in Bayugan City. RSVP today.",
  },

  /** Hero (the first thing guests see). */
  hero: {
    eyebrow: "Together with their families",
    invitation: "request the pleasure of your company at the celebration of their marriage",
    /** Used for the stacked date block in the hero. */
    dateBlock: {
      month: "June",
      day: "27",
      year: "2026",
      weekday: "Saturday",
      time: "1:00 in the afternoon",
    },
    venueShort: "Sacred Heart of Jesus Parish · Bayugan City",
    ctaLabel: "RSVP",
  },

  /** Canonical event date/time — drives the countdown and formatted dates. */
  event: {
    /** ISO date (YYYY-MM-DD). Used for countdown + formatting. */
    date: "2026-06-27",
    /** Human-friendly time, shown as-is. */
    time: "1:00 PM",
    ceremonyVenue: "Sacred Heart of Jesus Parish",
    ceremonyAddress: "Poblacion, Bayugan City, Agusan del Sur",
    receptionVenue: "Multipurpose Hall",
    receptionAddress: "Purok 9, Salvacion, Bayugan City",
    /** Opens in Google Maps. Replace with your venue's link. */
    mapUrl: "https://maps.google.com/?q=Sacred+Heart+of+Jesus+Parish+Bayugan+City",
  },

  /** "Details" section cards. Add, remove, or reorder freely. */
  details: {
    heading: "The Details",
    subheading: "Everything you need to know for our special day.",
    cards: [
      {
        icon: "calendar",
        title: "The Date",
        lines: ["Saturday", "June 27, 2026"],
      },
      {
        icon: "rings",
        title: "The Ceremony",
        lines: ["1:00 PM", "Sacred Heart of Jesus Parish", "Bayugan City"],
        action: { label: "View map", href: "https://maps.google.com/?q=Sacred+Heart+of+Jesus+Parish+Bayugan+City" },
      },
      {
        icon: "heart",
        title: "The Reception",
        lines: ["4:00 PM", "Multipurpose Hall", "Purok 9, Salvacion, Bayugan City"],
        action: {
          label: "View map",
          href: "https://maps.google.com/?q=Multipurpose+Hall+Purok+9+Salvacion+Bayugan+City",
        },
      },
    ] as DetailCard[],
  },

  /** Optional timeline shown under the details. Set to [] to hide. */
  schedule: {
    heading: "Order of the Day",
    items: [
      { time: "1:00 PM", title: "Ceremony", description: "Sacred Heart of Jesus Parish" },
      { time: "3:00 PM", title: "Cocktails & Photos", description: "Garden terrace" },
      { time: "4:00 PM", title: "Reception", description: "Dinner, toasts & dancing" },
      { time: "9:00 PM onwards", title: "Disco", description: "Dancing into the night" },
    ] as ScheduleItem[],
  },

  /** Dress code + wedding color palette (rendered as swatches). */
  attire: {
    heading: "Dress Code",
    subheading: "We can't wait to see you all dressed up.",
    preferenceTitle: "Attire Preference",
    preference: [
      "Formal / Semi-Formal",
      "Come dressed elegantly, but stay comfortable!",
      "We'd love to see you wearing our wedding colors.",
      "Kindly, no jeans or shorts :)",
    ],
    colorsTitle: "Wedding Colors",
    colorsNote: "A little palette to guide your outfit.",
    /** Edit names/hex freely — drawn from the invitation's sage & cream palette. */
    colors: [
      { name: "Eucalyptus", hex: "#5f6b43" },
      { name: "Sage", hex: "#95a373" },
      { name: "Sea Glass", hex: "#c4d2bd" },
      { name: "Dusty Blue", hex: "#9fb6c9" },
      { name: "Ivory", hex: "#efe9dc" },
    ],
  },

  /** A note on gifts. */
  gifts: {
    heading: "On Gifts",
    lead: "Your presence is truly the only gift we need.",
    body: [
      "However, if you would like to honor us with a gift, a monetary contribution toward our future together would be greatly appreciated.",
      "For guests who prefer to give a physical gift, a designated gift table will be available at the reception.",
    ],
    closing: "Thank you for celebrating this special day with us.",
  },

  /** RSVP section. */
  rsvp: {
    heading: "Will you celebrate with us?",
    description:
      "We would be honored to have you. Kindly let us know if you can make it by the date below.",
    /** ISO date — shown as the RSVP deadline. */
    deadline: "2026-06-24",
    /** Shown after a successful submission. */
    successTitle: "Thank you!",
    successMessage:
      "Your RSVP has been received. We can't wait to celebrate with you — keep an eye on your inbox for more details.",
  },

  /** Footer. */
  footer: {
    hashtag: "#DAVEstinedForEliza",
    closing: "With love and gratitude,",
  },
} as const;

export type SiteContent = typeof siteContent;
