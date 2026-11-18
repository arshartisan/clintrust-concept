import {
  RiBriefcase4Line,
  RiBuilding2Line,
  RiFileList3Line,
  RiFlowChart,
  RiFocus3Line,
  RiHospitalLine,
  RiInformationLine,
  RiLineChartLine,
  RiMailLine,
  RiQuestionLine,
  RiRoadMapLine,
  RiShieldCheckLine,
  RiStethoscopeLine,
  RiTeamLine,
  RiTimeLine,
  RiTimerLine,
} from "@remixicon/react";

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
 */
export const nav = [
  {
    label: "Our approach",
    heading: "By role",
    items: [
      { label: "For sponsors", href: "/approach#sponsors", icon: RiBuilding2Line, description: "Fund trials against verified work, not forecasts." },
      { label: "For CROs", href: "/approach#cros", icon: RiBriefcase4Line, description: "Reconcile site payments without the spreadsheets." },
      { label: "For sites", href: "/approach#sites", icon: RiHospitalLine, description: "One clean invoice a month, no chasing." },
      { label: "How it works", href: "/#how-it-works", icon: RiFlowChart, description: "Record, reconcile, pay. Three plain steps." },
      { label: "Which one is you?", href: "/#pain", icon: RiQuestionLine, description: "Pick your worry and see the fix." },
      { label: "Waiting time", href: "/#waiting", icon: RiTimerLine, description: "90\u2013140 days against one clean invoice a month." },
    ],
  },
  {
    label: "Company",
    heading: "About ClinTrust",
    items: [
      { label: "About", href: "/about", icon: RiInformationLine, description: "Who we are and why we’re building ClinTrust." },
      { label: "Mission", href: "/about#mission", icon: RiFocus3Line, description: "Why trial money should move at trial speed." },
      { label: "Leadership", href: "/about#leadership", icon: RiTeamLine, description: "The people behind ClinTrust." },
      { label: "Roadmap", href: "/about#roadmap", icon: RiRoadMapLine, description: "What has shipped and what comes next." },
      { label: "How we build", href: "/about#principles", icon: RiShieldCheckLine, description: "Audit trails, compliance and privacy first." },
      { label: "Contact", href: "/contact", icon: RiMailLine, description: "Talk to us or request a demo." },
    ],
  },
  { label: "Insights", href: "/insights" },
] as const;

/** The site-wide "Request a demo" action (header, mobile menu). */
export const demoCta = { label: "Request a demo", href: "/contact" } as const;

export const hero = {
  /**
   * The headline rotates through these questions (one every `intervalMs`),
   * then flips to `answer`, then starts again. Visitors can pause it. Under
   * reduced motion it does not rotate: the first question shows, with the
   * answer under it.
   */
  questions: [
    "Is your investigator grant payment late again?",
    "Do you actually know your cash flow for the next 90 days?",
    "Dreading reconciliation month-end?",
    "Still chasing invoices 140 days later?",
  ],
  answer: "One verified record. A clean invoice every month. Paid faster than 90–140 days.",
  intervalMs: 4000,
  /** The answer stays up a little longer than a question. */
  answerMs: 6000,
  /** ClinTrust in one line, under the headline. */
  lead: "ClinTrust keeps one record of trial work that sponsors, CROs and sites all agree on, and turns it into a clean invoice every month.",
  pauseLabel: "Pause the rotating questions",
  playLabel: "Play the rotating questions",
  primaryCta: { label: "Yes, that’s me", href: "#pain" },
  secondaryCta: { label: "Request a demo", href: "#demo" },
};

/** "Which one is you?": four tappable worries, each opening a one-line fix. */
export const pains = {
  title: "Which one is you?",
  continuation: "Tap the one that keeps you up at night.",
  items: [
    {
      id: "cash-flow",
      label: "Cash flow",
      icon: RiLineChartLine,
      worry: "I can’t see what’s coming in next quarter.",
      fix: "See what you have earned and when it lands, visit by visit, so the next 90 days stop being a guess.",
    },
    {
      id: "investigator-grants",
      label: "Investigator grants",
      icon: RiStethoscopeLine,
      worry: "Our investigators are paid late. Again.",
      fix: "Each completed visit is recorded once and billed on the next monthly invoice, so grants stop slipping.",
    },
    {
      id: "reconciliation",
      label: "Reconciliation",
      icon: RiFileList3Line,
      worry: "Month-end means a week of spreadsheets.",
      fix: "Visits are matched to the budget as they happen, so month-end becomes a quick review, not a rebuild.",
    },
    {
      id: "late-payments",
      label: "Late payments",
      icon: RiTimeLine,
      worry: "I’m still chasing invoices from months ago.",
      fix: "One clean invoice goes out every month after a 5-day review. Nothing left to chase.",
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
  scaleDays: 140,
  oldWay: {
    label: "The old way",
    prefix: "90–",
    days: 140,
    from: 90,
    unit: "days",
    text: "From a completed visit to money in the bank. Invoices go out after the fact, get queried, then wait in a queue.",
  },
  newWay: {
    label: "The ClinTrust way",
    prefix: "≤ ",
    days: 35,
    unit: "days",
    text: "From a completed visit to a clean final invoice. A pre-invoice goes out each month, the sponsor or CRO has 5 days to review it (T+5), then the invoice is sent.",
  },
  note: "T+5 is the 5-day review window before the monthly invoice is sent. It is not a promise of payment in five days.",
};

export const steps = [
  {
    id: "record",
    name: "Record",
    text: "Your team logs a completed visit once. We check it against the trial data, so everyone works from the same record.",
  },
  {
    id: "reconcile",
    name: "Reconcile",
    text: "We match each visit to the budget for you. Anything that doesn’t fit is flagged for a person to check.",
  },
  {
    id: "pay",
    name: "Pay",
    text: "Each month the sponsor or CRO reviews a pre-invoice for 5 days. Then the final invoice goes out and the site is paid in its own currency.",
  },
] as const;

/** Audience tabs: each role gets its own questions and one benefit. */
export const audiences = [
  {
    id: "sponsors",
    label: "Sponsors",
    questions: [
      "Is money sitting in escrow while sites wait to be paid?",
      "Do you know what you actually owe this month?",
    ],
    benefit: "Fund the work that has been done, not a forecast, and hold far less cash in escrow.",
    stat: "70–80%",
    statLabel: "less capital held in escrow",
    cta: "More for sponsors",
    href: "/approach#sponsors",
  },
  {
    id: "cros",
    label: "CROs",
    questions: [
      "Is your finance team rebuilding the same spreadsheet every month?",
      "How many site payment disputes are open right now?",
    ],
    benefit: "Visits arrive already matched to the budget, so reconciliation shrinks to a review and every dispute comes with the evidence attached.",
    stat: "~80%",
    statLabel: "less manual reconciliation",
    cta: "More for CROs",
    href: "/approach#cros",
  },
  {
    id: "sites",
    label: "Sites",
    questions: [
      "Do you know what you’ve earned but not yet been paid?",
      "How many hours a week go on chasing invoices?",
    ],
    benefit: "See earned versus paid for every visit, and get one clean invoice every month without the chasing.",
    stat: "Monthly",
    statLabel: "clean invoice, sent after a 5-day review",
    cta: "More for sites",
    href: "/approach#sites",
  },
] as const;

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
  stats: [
    { label: "Capital released on a $100M trial portfolio*", value: "$15M" },
    { label: "Less capital held in escrow*", value: "70–80%" },
  ],
  footnote: "*Modelled: a 20% escrow advance today against a 5% buffer sized to verified work.",
  title: "Less money waiting, more money working.",
  text: "Sponsors fund the work that has been done, not a forecast, so capital stops sitting in escrow while sites wait to be paid.",
  cta: { label: "Request a demo", href: "#demo" },
  quote: null as null | { text: string; name: string; role: string; photo: string | null },
};

export const demo = {
  title: "Bring us your messiest reconciliation.",
  text: "A 45-minute walkthrough on your own numbers. We look at how your site payments run today and show you what changes.",
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
  // Only pages and sections that exist. Legal pages (privacy, terms, security)
  // are not listed because their text has not been written yet.
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Mission", href: "/about#mission" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Our approach",
      links: [
        { label: "For sponsors", href: "/approach#sponsors" },
        { label: "For CROs", href: "/approach#cros" },
        { label: "For sites", href: "/approach#sites" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Which one is you?", href: "/#pain" },
        { label: "Waiting time", href: "/#waiting" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Request a demo", href: "/#demo" },
      ],
    },
    {
      title: "Insights",
      links: [{ label: "All insights", href: "/insights" }],
    },
  ],
  // The one place the standards appear on any page (client feedback: once, in
  // one tidy row). Confirm SOC 2 with the ClinTrust team before launch.
  certifications: ["21 CFR Part 11", "ICH E6(R3)", "GDPR", "SOC 2"],
  legal: `© 2026 ${brand.legalEntity}, Singapore.`,
};
