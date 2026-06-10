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
    receptionAddress: "Purok 7, Salvacion, Bayugan City",
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
        lines: ["5:00 PM", "Multipurpose Hall", "Purok 7, Salvacion, Bayugan City"],
        action: {
          label: "View map",
          href: "https://maps.app.goo.gl/noVF23FxvongKdRB9",
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
      { time: "5:00 PM", title: "Reception", description: "Dinner, toasts & dancing" },
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
      { name: "Emerald", hex: "#1f7a54" },
      { name: "Eucalyptus", hex: "#5f6b43" },
      { name: "Sage", hex: "#95a373" },
      { name: "Sea Glass", hex: "#c4d2bd" },
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

  /**
   * Wedding entourage — shown in a pop-up triggered from the hero.
   * Transcribed from the printed program images. PLEASE PROOFREAD the names
   * and spellings; everything here is freely editable.
   */
  entourage: {
    triggerLabel: "The Entourage",
    title: "The Entourage",
    subtitle: "Uy – Pitogo Nuptials",

    officiant: { role: "Officiating Priest", names: ["Fr. Wesly S. Montalban"] },

    parents: [
      { role: "Bride's Parents", names: ["Mr. Teodoro M. Pitogo Jr.", "Mrs. Elizabeth C. Pitogo"] },
      { role: "Groom's Parents", names: ["Mr. Manuel T. Uy Jr.", "Mrs. Minerva A. Uy"] },
    ],

    principalSponsors: {
      title: "Principal Sponsors",
      note: "To stand as principal witness to our vows",
      left: [
        "Dr. Janry B. Colonia",
        "Dr. Nilo Aviola",
        "Mr. Edgardo Biscocho",
        "Mr. Benjamin Uñalan",
        "Mr. Antonio Amarga",
        "Mr. Mardel Monterola",
        "Mr. Earl A. Taluban",
        "Mr. Donald Seronay",
        "Mr. Romel Seronay",
        "Mr. Bernie Cilmar",
        "Mr. Ryan Jess Dapogracion",
        "Mr. Jack Gorgod",
        "Mr. Cerello Gumban",
        "Mr. Teofanes Cilmar",
        "Mr. Ignacio Latras",
        "Mr. Mario O. Agunat",
        "Mr. Jojo Sumalhag",
        "Mr. Coridilito Mindajao",
        "Mr. Roldan A. Luzano",
        "Mr. Wendell Lee Quilaman",
        "Mr. Raul Sabornido",
        "Mr. Ronnie M. Cultura",
        "Mr. Louie Lagbas",
        "Mr. Miguel Ababao",
        "Mr. Fred Dagani",
        "Mr. Jasper Ababao",
        "Mr. Franklin Butawan",
        "Mr. Ramon Alope",
        "Mr. Jeffrey Cilmar",
        "Mr. Janilou Cilmar",
        "Mr. Danilo Sumaljag",
        "Mr. Rogelio Demana",
        "Mr. Jessie Castino",
        "Ms. Maricris Bullecer",
        "Ms. Julian B. Castillo",
        "Ms. Nida Pamad",
        "Ms. Terisita Babayo",
        "Mr. Charly Figura",
        "Ms. Jill Mangayan",
        "Ms. Pablia Ortiz",
        "Ms. Curvada Curveua",
      ],
      right: [
        "Mrs. Aura V. Colonia",
        "Mrs. Myrna Juventud",
        "Mrs. Merlyn Uy Biscocho",
        "Mrs. Daryn Uñalan",
        "Mrs. Bella S. Amarga",
        "Mrs. Barbara Montalban",
        "Mrs. Andrina C. Taluban",
        "Mrs. Perla Seronay",
        "Mrs. Grace Seronay",
        "Mrs. Sharon Cilmar",
        "Mrs. Stella Mae Dapogracion",
        "Mrs. Janice Gorgod",
        "Mrs. Deliah Gumban",
        "Mrs. Ginalie Cilmar",
        "Mrs. Mary Jane Latras",
        "Mrs. Chona C. Agunat",
        "Mrs. Jean Juventud",
        "Mrs. Juliet Mindajao",
        "Mrs. Maureen B. Luzano",
        "Mrs. Edmacel C. Quilaman",
        "Mrs. Imelda Sabornido",
        "Mrs. Elenita C. Cultura",
        "Mrs. Cheryl A. Magdamo",
        "Mrs. Rodelia A. Jadulco",
        "Mrs. Betty Denque",
        "Mrs. Rita Eugenio",
        "Ms. Bess Kenneth Uy",
        "Ms. Lilibeth Aspacio",
        "Ms. Merychell A. Seronay",
        "Ms. Felipa M. Asis",
        "Ms. Marilyn H. Inson",
        "Ms. Nimfa Gella",
        "Ms. Mercedita Claros",
        "Ms. Xyrus Amatong",
        "Ms. Vivena C. Encong",
        "Ms. Gina Rose Balaba",
        "Ms. Carmela Hortilano",
        "Ms. Emma Taluban",
        "Ms. Charlyn Gongob",
        "Ms. Annie Mangayan",
        "Ms. Noreen Ipanag",
      ],
    },

    assist: {
      note: "To assist us in our needs",
      pair: [
        { role: "Best Man", names: ["Mr. Jason Jay A. Ababao"] },
        { role: "Maid of Honor", names: ["Ms. Jubille C. Pitogo"] },
      ],
    },

    party: {
      note: "To guide us on our way ahead",
      columns: [
        {
          title: "Groomsmen",
          names: [
            "Mr. Jade Gorgod",
            "Mr. Reynald Ihong",
            "Mr. Santiago Micabalo",
            "Mr. Ryan Requiz",
            "Mr. Chris Gerson Balana",
            "Mr. Carl Albert Agunat",
          ],
        },
        {
          title: "Bridesmaids",
          names: [
            "Ms. Lisley A. Uy",
            "Ms. Jhai Gorgod",
            "Ms. April Joy Cilmar",
            "Ms. Jubie Mae Butawan",
            "Ms. Joeveyjane Baclayun",
            "Ms. May Climar",
          ],
        },
      ],
    },

    usherettes: {
      role: "Usherettes",
      names: [
        "Nikki Macatol",
        "Berlina Cilmar",
        "Analyn Cilmar",
        "Rose Marie Castino",
        "Floraniel Aragos",
        "Alexa Rose Amatong",
      ],
    },

    secondarySponsors: {
      title: "Secondary Sponsors",
      rites: [
        { role: "Candle", note: "To light our path", names: ["Mr. Jarold Pitogo", "Mrs. Jessa Pitogo"] },
        { role: "Cord", note: "To bind us together", names: ["Mr. Lemuel Luzano", "Mrs. Cherryl Luzano"] },
        { role: "Veil", note: "To cover us as one", names: ["Mr. Michael Dave L. Limbaco", "Mrs. Mira Lee Uy-Limbaco"] },
      ],
      bearers: [
        { role: "Ring Bearer", names: ["Jhon Herville Pitogo"] },
        { role: "Bible Bearer", names: ["Lee Sebastian P. Luzano"] },
        { role: "Coin Bearer", names: ["Mark Ethan G. Uy"] },
      ],
      offertory: [
        { role: "Wine & Ostiya", names: ["Mr. Claudio Gomonit", "Mrs. Messhie Jane Gomonit"] },
        {
          role: "Fruits & Gifts",
          names: ["Jay Patrick Uy | Marites Ganzan", "Rey Humbert Uy | Glory Mae Racho"],
        },
      ],
      flowerGirls: {
        role: "Flower Girls",
        names: [
          "Athena Celestin R. Uy",
          "Chrisle Ann Pitogo | Janrich Gorgod",
          "Chenny Mae Luzano | Junmark Pitogo",
          "Scarlet Sophia Pitogo",
          "Abigael Cilmar",
          "Christianne Macatol",
          "Bella Rae C. Taluban",
        ],
      },
      littles: [
        { role: "Little Groom", names: ["Austin Theo P. Uy"] },
        { role: "Little Bride", names: ["Mi Kaellee U. Limbaco"] },
      ],
    },
  },

  /** Footer. */
  footer: {
    hashtag: "#DAVEstinedForEliza",
    closing: "With love and gratitude,",
  },
} as const;

export type SiteContent = typeof siteContent;
