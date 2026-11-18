import { RiFileList3Line, RiLineChartLine, RiStethoscopeLine, RiTimeLine } from "@remixicon/react";
import type { RemixiconComponentType } from "@remixicon/react";

/**
 * All landing-page copy in one place. Facts and figures are carried over from
 * the previous clintrust.ai site; wording was tightened in sprint 1 and should
 * be reviewed by the ClinTrust team before launch (see docs/sop/04-sprint-log.md).
 */

/**
 * The name is spelled exactly "ClinTrust" everywhere, with no suffix (client
 * feedback, sprint 8). That now includes the legal line: confirm with the
 * client that the registered entity is "ClinTrust Pte. Ltd.".
 */
export const brand = {
  name: "ClinTrust",
  legalEntity: "ClinTrust Pte. Ltd.",
} as const;

/**
 * Primary navigation. An entry with `items` is a dropdown menu (a heading and
 * a two-column list of links, each with an icon tile and a one-line
 * description); one with `href` is a plain link.
 *
 * Sprint 9 (client feedback: "more narrow content-wise"): the site is one
 * page, so the nav is three anchors into it. The inner pages (/approach,
 * /about, /insights, /contact) still build but are no longer linked.
 */
type NavLink = { label: string; href: string };
type NavMenu = {
  label: string;
  heading: string;
  items: readonly { label: string; href: string; icon: RemixiconComponentType; description: string }[];
};
export const nav: readonly (NavLink | NavMenu)[] = [
  { label: "Which one is you?", href: "/#pain" },
  { label: "Waiting time", href: "/#waiting" },
  { label: "How it works", href: "/#how-it-works" },
];

/** The site-wide "Request a demo" action (header, mobile menu). */
export const demoCta = { label: "Request a demo", href: "/#demo" } as const;

export const hero = {
  /**
   * Each question shows for `intervalMs`, then flips to `answer` for
   * `answerMs`, then the next question comes in (the brief: "one large
   * question rotates every ~4 seconds, then flips to its answer"). Visitors
   * can pause it. Under reduced motion it does not rotate: the first question
   * shows, with the answer under it.
   */
  questions: [
    "Is your investigator grant payment late again?",
    "Do you actually know your cash flow for the next 90 days?",
    "Dreading reconciliation month-end?",
    "Still chasing invoices 140 days later?",
  ],
  /**
   * One phrase of each question, set on a tilted sticker box (chunky titles,
   * sprint 9). Must appear in its question exactly as written.
   */
  questionMarks: ["late again", "90 days", "month-end", "140 days"],
  answer: "One verified record. A clean invoice every month. Paid faster than 90–140 days.",
  /** The same answer, split at its full stops: the hero builds it as a checklist, row by row. */
  answerParts: ["One verified record.", "A clean invoice every month.", "Paid faster than 90–140 days."],
  intervalMs: 4000,
  /** How long the answer stays up after each question (its rows take ~1.3 s to build). */
  answerMs: 5000,
  /** ClinTrust in one line, under the headline. */
  lead: "ClinTrust: one record of trial work everyone agrees on, and a clean invoice from it every month.",
  pauseLabel: "Pause the rotating questions",
  playLabel: "Play the rotating questions",
  /**
   * The people beside the headline (the brief: "real people: coordinators,
   * finance leads, investigators"). Photo slots until photos are cleared;
   * each gets a tag sticker.
   */
  // Stock photos (Unsplash License: free for commercial use, no attribution
  // required), downloaded 2026-11-18. Replace with real team or customer
  // photos when the client supplies them. `focus` is the crop's focal point.
  //   site-coordinator.jpg  Beatriz Mendez   unsplash.com/photos/_4xStiTXY1o
  //   finance-lead.jpg      Vitaly Gariev    unsplash.com/photos/Xe-turIIQoE
  //   investigator.jpg      Vitaly Gariev    unsplash.com/photos/XqMo4OlBnh0
  people: [
    { role: "Site coordinator", tag: "Invoice sent", photo: "/people/site-coordinator.jpg", focus: "50% 25%" },
    { role: "Finance lead", tag: "Month-end: done", photo: "/people/finance-lead.jpg", focus: "60% 35%" },
    { role: "Investigator", tag: "Grant on time", photo: "/people/investigator.jpg", focus: "55% 30%" },
  ],
  photoNote: "Photo to come",
  /** The starburst sticker in the hero. */
  burst: "No more chasing!",
  /** The text ring that turns round the starburst. Decorative. */
  ring: "Paid faster • One record • Clean invoices • ",
  /** Typed out on the hero's 3D keycaps, one letter per key. */
  keys: "paid",
  /**
   * The keycap strip under the hero (after overflow.sui.io's keycap marquee):
   * short phrases that loop sideways. Decorative; the page says each of these
   * in full elsewhere.
   */
  marquee: ["Paid on time", "One record", "Clean invoices", "No more chasing", "Month-end, done", "Grants on time"],
  primaryCta: { label: "Yes, that’s me", href: "#pain" },
  secondaryCta: { label: "Request a demo", href: "#demo" },
};

/** "Which one is you?": four tappable worries, each opening a one-line fix. */
export const pains = {
  title: "Which one is you?",
  continuation: "Tap the one that keeps you up at night.",
  /** Set on a sticker box in the heading. */
  mark: "at night",
  cardHint: "Tap to see the fix",
  cardOpenHint: "Tap again to close",
  items: [
    {
      id: "cash-flow",
      label: "Cash flow",
      icon: RiLineChartLine,
      worry: "I can’t see what’s coming in next quarter.",
      fix: "See what you’ve earned and when it lands, visit by visit.",
    },
    {
      id: "investigator-grants",
      label: "Investigator grants",
      icon: RiStethoscopeLine,
      worry: "Our investigators are paid late. Again.",
      fix: "Every finished visit lands on next month’s invoice. No more slipping.",
    },
    {
      id: "reconciliation",
      label: "Reconciliation",
      icon: RiFileList3Line,
      worry: "Month-end means a week of spreadsheets.",
      fix: "Visits match the budget as they happen. Month-end is a quick check.",
    },
    {
      id: "late-payments",
      label: "Late payments",
      icon: RiTimeLine,
      worry: "I’m still chasing invoices from months ago.",
      fix: "One clean invoice a month, after a 5-day review. Nothing to chase.",
    },
  ],
  cta: { label: "Fix mine: request a demo", href: "#demo" },
};

/**
 * Waiting-time counter: the old way against the ClinTrust way, on one day scale.
 *
 * T+5 means the final invoice is sent each month after the sponsor or CRO has
 * had 5 days to review the pre-invoice. It is NOT a payment date. The
 * ClinTrust bar therefore measures visit to final invoice: a visit early in
 * the month waits at most a month for the pre-invoice, plus 5 days of review.
 * Confirm `newWay.days` with the ClinTrust team.
 */
export const waiting = {
  title: "Your cash flow called.",
  continuation: "It wants to know why it waits 140 days.",
  /** Set on a sticker box in the heading. */
  mark: "140 days",
  scaleDays: 140,
  oldWay: {
    label: "The old way",
    prefix: "90–",
    days: 140,
    from: 90,
    unit: "days",
    text: "Visit done. Invoice late, queried, queued. Then, finally, paid.",
  },
  newWay: {
    label: "The ClinTrust way",
    prefix: "≤ ",
    days: 35,
    unit: "days",
    text: "Visit done. Monthly pre-invoice, 5 days to review (T+5), clean invoice out.",
  },
  note: "T+5 is the 5-day review before the monthly invoice goes out, not payment in five days.",
};

export const steps = [
  {
    id: "record",
    name: "Record",
    text: "Your team logs a finished visit once. Everyone works from that one record.",
    /** The scalloped badge on the card's corner (after the Moxie cards). */
    badge: "logged.",
  },
  {
    id: "reconcile",
    name: "Reconcile",
    text: "We match it to the budget. Anything odd is flagged for a person.",
    badge: "checked.",
  },
  {
    id: "pay",
    name: "Pay",
    text: "Pre-invoice each month, 5 days to review, then the final invoice. Paid in your currency.",
    badge: "paid.",
  },
] as const;

/** Audience tabs: each role gets its own questions and one benefit. */
export const audiences = [
  {
    id: "sponsors",
    label: "Sponsors",
    questions: ["Is your money sitting in escrow?", "Do you know what you owe this month?"],
    benefit: "Fund the work that’s done, not a forecast.",
  },
  {
    id: "cros",
    label: "CROs",
    questions: ["Rebuilding the same spreadsheet every month?", "How many payment disputes are open right now?"],
    benefit: "Visits arrive matched to the budget, with the evidence attached.",
  },
  {
    id: "sites",
    label: "Sites",
    questions: ["Do you know what you’ve earned but not been paid?", "How many hours a week go on chasing?"],
    benefit: "See earned versus paid for every visit. One clean invoice a month.",
  },
] as const;

/** The action at the foot of each audience panel. */
export const audienceCta = { label: "Show me how", href: "#demo" } as const;

/** Labels on the audience panel (after the Moxie curriculum layout). */
export const audienceLabels = {
  /** Small caps line over the benefit: "For sponsors · 01". */
  eyebrow: "For",
  /** The text ring turning round the panel number. Decorative. */
  ring: "Role by role ✱ role by role ✱ ",
} as const;

/**
 * Proof. The brief asks for one short quote or number, ideally with a real
 * face. No customer quote is cleared for publication yet, so this shows one
 * number with its basis. When a quote is approved, fill `quote` and the
 * section shows it beside the number.
 */
export const proof = {
  /** Small tag at the top of the dark stats card. */
  eyebrow: "The ClinTrust model",
  /**
   * Both figures come from the same model (see `footnote`): on a $100M
   * portfolio a 20% advance holds $20M; a 5% buffer holds $5M. That frees
   * $15M, 75% less held, inside the "70–80%" quoted for sponsors.
   */
  // Sprint 9: one number, as the brief asks. Confirm it with the client.
  stats: [{ label: "Less capital held in escrow*", value: "70–80%" }],
  footnote: "*Modelled: a 5% buffer sized to verified work, against a typical 20% escrow advance.",
  title: "Less money waiting, more money working.",
  text: "Pay for work that’s done, not a forecast.",
  cta: { label: "Request a demo", href: "#demo" },
  quote: null as null | { text: string; name: string; role: string; photo: string | null },
};

export const demo = {
  title: "Bring us your messiest reconciliation.",
  text: "45 minutes, on your own numbers. Bring the spreadsheet you dread.",
  roles: [
    "Sponsor",
    "CRO operations or finance",
    "Site PI, finance or administration",
    "Consultant or advisor",
    "Other",
  ],
  volumes: ["Under $5M", "$5M to $25M", "$25M to $100M", "Over $100M"],
};

export const footer = {
  // Sprint 9: anchors into the home page, plus the inner pages (kept out of
  // the main nav to keep it narrow).
  columns: [
    {
      title: "On this page",
      links: [
        { label: "Which one is you?", href: "/#pain" },
        { label: "Waiting time", href: "/#waiting" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Request a demo", href: "/#demo" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Our approach", href: "/approach" },
        { label: "About", href: "/about" },
        { label: "Insights", href: "/insights" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  // The one place the standards appear on any page (client feedback: once, in
  // one tidy row). Confirm SOC 2 with the ClinTrust team before launch.
  certifications: ["21 CFR Part 11", "ICH E6(R3)", "GDPR", "SOC 2"],
  legal: `© 2026 ${brand.legalEntity}, Singapore.`,
  /** Small pill labels over each footer column (after the truus footer reference). */
  contactLabel: "Reach out",
  contactLine: "A 45-minute walkthrough of your payment flow.",
  standardsLabel: "Built to",
  /** Short lines on the stickers stuck to the footer wordmark. Decorative. */
  stickers: { burst: "On time!", stamp: "Paid" },
};

/**
 * Hero concepts for client review (sprint 9; the brief's first deliverable:
 * "two or three hero concepts first for review"). Each lives at its own route
 * under /concepts and uses `hero.questions` and `hero.answer` above, so only
 * the framing differs. Not linked from the site; noindex.
 */
export const heroConcepts = {
  indexTitle: "Three hero concepts",
  indexText:
    "Same questions, same answer, three ways to open the page. Pick one (or the bits you like from each) and we build the full page in that direction.",
  reviewLabel: "Hero concept for review",
  backLabel: "All concepts",
  items: [
    {
      slug: "big-question",
      letter: "A",
      name: "The big question",
      eyebrow: "Quick question",
      summary:
        "One huge question in the middle of a white page, a sunny highlighter swipe, doodles round the edges. Flips to the answer with a PAID stamp and a little confetti.",
    },
    {
      slug: "your-cash-flow-called",
      letter: "B",
      name: "Your cash flow called",
      summary:
        "The worries arrive as chat messages from your own cash flow. ClinTrust answers in teal. Beside it, a real person on a sticker card.",
      chatFrom: "Your cash flow",
      chatReplyFrom: "ClinTrust",
      chatStatus: "calling…",
      chatHeadline: "Your cash flow called.",
      chatHeadlineContinuation: "It wants answers.",
      people: [
        { role: "Site coordinator", tag: "Paid on time" },
        { role: "Finance lead", tag: "Month-end: done" },
      ],
    },
    {
      slug: "invoice-flip",
      letter: "C",
      name: "The invoice flip",
      summary:
        "A big yellow invoice card. The front asks the question, then it flips over to show the answer, stamped PAID. A day counter beside it ticks 140 down to one month.",
      cardEyebrow: "Invoice #140",
      cardBackEyebrow: "Invoice: this month",
      eyebrow: "Clinical trial payments",
      headline: "Sound familiar?",
      counterFrom: 140,
      counterTo: 35,
      counterLabel: "days from visit to clean invoice",
    },
  ],
} as const;
