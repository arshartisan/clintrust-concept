/**
 * All landing-page copy in one place. Facts and figures are carried over from
 * the previous clintrust.ai site; wording was tightened in sprint 1 and should
 * be reviewed by the ClinTrust team before launch (see docs/sop/04-sprint-log.md).
 */

/**
 * The product and site name is "ClinTrust" (renamed from "ClinTrust.ai" in
 * sprint 2). `legalEntity` is the registered company name and is deliberately
 * NOT changed by the rename: update it only if the company itself is renamed.
 */
export const brand = {
  name: "ClinTrust",
  legalEntity: "ClinTrust.ai Pte. Ltd.",
} as const;

/**
 * Primary navigation. An entry with `items` is a dropdown menu; one with
 * `href` is a plain link. `icon` is a key into ICONS in site-header.tsx.
 */
export const nav = [
  {
    label: "Our approach",
    items: [
      { label: "For sponsors", text: "Capital efficiency and accrual visibility", href: "/approach#sponsors", icon: "sponsors" },
      { label: "For CROs", text: "Less reconciliation, fewer disputes", href: "/approach#cros", icon: "cros" },
      { label: "For sites", text: "Earned versus paid, in real time", href: "/approach#sites", icon: "sites" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", text: "Mission, values and roadmap", href: "/about", icon: "about" },
      { label: "Leadership", text: "The founding team and advisors", href: "/about#leadership", icon: "leadership" },
      { label: "Contact", text: "Request a demo or ask a question", href: "/contact", icon: "contact" },
    ],
  },
  { label: "Insights", href: "/insights" },
] as const;

export const hero = {
  status: "In stealth. Working with a small group of sponsors and CROs.",
  title: "Site payments that settle when the work is done.",
  lead: "ClinTrust is the payment layer between sponsors, CROs and research sites. Every completed visit is verified once, reconciled against the budget, and paid within five days.",
  primaryCta: { label: "Request a demo", href: "/contact" },
  secondaryCta: { label: "See how it works", href: "/#how-it-works" },
  compliance: [
    "21 CFR Part 11",
    "ICH E6(R3) aligned",
    "GDPR compliant",
    "Immutable audit trails",
  ],
};

export const problem = {
  title: "The money moves slower than the trial.",
  continuation:
    "Each handoff between sponsor, CRO and site adds an advance, a spreadsheet and a wait.",
  // Today's chain, in order.
  chain: [
    { name: "Sponsor advances funds", text: "$100M+ sits in large upfront advances." },
    { name: "CRO holds escrow", text: "Money waits while it is reconciled by hand." },
    { name: "Site sends an invoice", text: "Completed visits are billed after the fact." },
    { name: "Payment arrives", text: "90\u2013140 days after the work was done." },
  ],
  flow: {
    inputsLabel: "Today",
    inputs: ["Upfront advances", "Manual reconciliation", "Invoices after the fact", "A 90\u2013140 day wait"],
    core: ["One verified record", "Dynamic funding"],
    results: [
      { who: "Sponsors", figure: "70\u201380% less escrow", text: "Funding follows verified work, not forecasts." },
      { who: "Sites", figure: "Paid at T+5", text: "Five days after a visit is verified." },
    ],
  },
};

export const steps = [
  {
    id: "record",
    name: "Record",
    text: "Sites log completed visits and procedures. Each entry is checked against EDC data, so every party works from the same record.",
  },
  {
    id: "reconcile",
    name: "Reconcile",
    text: "An AI engine matches visits to protocol milestones and budget lines. Every match carries a confidence score and its full audit lineage.",
  },
  {
    id: "pay",
    name: "Pay",
    text: "Verified payables trigger funding instructions and pay out over FX rails in the site's own currency, settling at T+5.",
  },
] as const;

export const capital = {
  title: "Stop funding forecasts.",
  continuation: "Fund the work that has been verified, and release the rest.",
  aside: {
    lead: "Less capital locked, faster site payments,",
    rest: "and one record that sponsor, CRO and site all trust.",
  },
  // Each card: a sentence (accented lead + rest), a label and a figure.
  cards: [
    {
      lead: "Upfront advances",
      rest: "sit in escrow long before the visits they pay for have happened.",
      label: "Idle on a $100M portfolio",
      figure: "$15–25M",
    },
    {
      lead: "Dynamic funding",
      rest: "sizes the buffer to verified activity instead of a forecast.",
      label: "Less escrow required",
      figure: "70–80%",
    },
    {
      lead: "A small buffer",
      rest: "replaces the large advance, and the difference goes back to research.",
      label: "Capital released on $100M",
      figure: "$15M",
    },
  ],
  bars: [
    { label: "Escrow today", value: "$20M", percent: 100 },
    { label: "Buffer with ClinTrust", value: "$5M", percent: 25 },
  ],
  note: "Illustrative model for a $100M portfolio: a 20% escrow advance today against a 5% dynamic buffer, the midpoints of the typical 15–25% escrow range and a 70–80% reduction.",
};

export const audiences = [
  {
    id: "sponsors",
    label: "Sponsors",
    stat: "70\u201380%",
    statLabel: "less capital held in escrow",
    summary: "See what you owe as the work happens, and fund only that.",
    points: [
      "Real-time accrual visibility across studies",
      "Lower escrow requirements",
      "CRO-neutral orchestration",
      "21 CFR Part 11 audit trails",
      "Budget versus actuals at study level",
    ],
    cta: "Request a demo",
    href: "/contact",
  },
  {
    id: "cros",
    label: "CROs",
    stat: "~80%",
    statLabel: "less manual reconciliation",
    summary: "Take reconciliation off your finance team's desk.",
    points: [
      "Fewer payment disputes",
      "Payment status dashboards",
      "CTMS and EDC ingestion",
      "Multiple sponsors and protocols",
      "Audit-ready reporting",
    ],
    cta: "See the CRO view",
    href: "/approach#cros",
  },
  {
    id: "sites",
    label: "Sites",
    stat: "T+5",
    statLabel: "days from verified visit to payment",
    summary: "Know what you have earned, and when it lands.",
    points: [
      "Earned versus paid, always visible",
      "No invoice chasing",
      "Predictable cash flow",
      "Dashboards for each investigator",
      "Disputes resolved with full data lineage",
    ],
    cta: "See the site view",
    href: "/approach#sites",
  },
] as const;

export const modules = [
  {
    name: "Budget Intelligence Engine",
    text: "Turns study budgets and site contracts into structured, payable line items.",
  },
  {
    name: "Multi-Source Execution Capture",
    text: "Brings in visit activity from EDC, CTMS and site logs.",
  },
  {
    name: "AI-Assisted Reconciliation",
    text: "Matches activity to budget lines and scores every match.",
  },
  {
    name: "Continuous Payable Formation",
    text: "Builds payables as work is verified, not when an invoice arrives.",
  },
  {
    name: "Dynamic Funding Model",
    text: "Sizes funding to verified activity in place of large upfront advances.",
  },
  {
    name: "Fintech Payment Orchestration",
    text: "Pays out in local currency over regional rails, with transparent FX.",
  },
] as const;

export const region = {
  title: "Built in Singapore for trials across APAC.",
  continuation:
    "Cross-border studies are where site payments break down most often, so that is where we started.",
  points: [
    { name: "Local regulatory expertise", text: "Requirements differ in every market a study runs in. We work to each of them." },
    { name: "Regional payment rails", text: "Payouts are routed over the fastest local rail available in each market." },
    { name: "Transparent cross-border FX", text: "Sites see the rate and the amount in their own currency before it lands." },
  ],
};

export const demo = {
  title: "See it on your own payment flow.",
  text: "A 45-minute walkthrough. We review how your site payments run today and model the capital you could release. Implementation support is included.",
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
        { label: "Contact", href: "/about#contact" },
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
        { label: "The problem", href: "/#problem" },
        { label: "How it works", href: "/#how-it-works" },
        { label: "Capital model", href: "/#capital" },
        { label: "Modules", href: "/#platform" },
      ],
    },
    {
      title: "Insights",
      links: [{ label: "All insights", href: "/insights" }],
    },
  ],
  certifications: ["21 CFR Part 11", "ICH E6(R3)", "GDPR", "SOC 2"],
  legal: `© 2026 ${brand.legalEntity}, Singapore.`,
};
