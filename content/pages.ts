import { DoodleBriefcase, DoodleBuilding, DoodleChartUp, DoodleFileList, DoodleFileShield, DoodleFlow, DoodleGauge, DoodleGlobe, DoodleLayers, DoodleLock, DoodleMail, DoodleMerge, DoodlePin, DoodleScales, DoodleShieldCheck, DoodleTarget, DoodleTimer } from "@/components/marketing/doodle-icons";
import { brand } from "./landing";

/**
 * Copy for the inner pages (About, Our approach, Insights, Contact).
 *
 * Facts, names, figures and section structure are carried over from the
 * previous clintrust.ai site (about.html, solutions.html, insights.html);
 * wording was tightened in sprint 3. Needs sign-off from the ClinTrust team,
 * the leadership bios especially (see docs/sop/04-sprint-log.md).
 */

export const about = {
  hero: {
    title: "Financial infrastructure for the next era of clinical research.",
    lead: "ClinTrust was founded on one conviction: the way clinical trial sites are paid is broken at the infrastructure level, and fixing it takes a structural rebuild, not another workaround.",
    /** The hero scene's labels (decorative, aria-hidden): the rebuild, block by block, bottom first. */
    scene: {
      blocks: ["Record", "Verify", "Paid"],
      workaround: "Workaround",
    },
  },
  mission: {
    title: "To become the system of record for clinical trial payables.",
    text: [
      "We are building a platform where sponsors authorize once, execution drives payment automatically, and every transaction is immutably recorded, explainable and audit-ready.",
      "The aim is to take financial friction, payment uncertainty and compliance ambiguity out of trial operations. We start with the payment lifecycle and will extend to other workflows.",
    ],
  },
  values: [
    { name: "Infrastructure first", icon: DoodleLayers, text: "Built as core infrastructure, not a point solution." },
    { name: "Aligned to execution", icon: DoodleTarget, text: "Payments should reflect what has been done, not what has been invoiced." },
    { name: "Compliance as the foundation", icon: DoodleShieldCheck, text: "Compliance is the base of every architectural decision, not a feature added later." },
    { name: "APAC as the primary market", icon: DoodleGlobe, text: "First-class payment infrastructure for the region, with a depth global players cannot match." },
  ],
  leadership: {
    title: "Founded by operators, built by builders.",
    // Photos are from the previous site (clintrust.ai/images/team-*.jpg), each
    // placed beside the same name the previous site shows it with. NOTE: on
    // that site the file names for two of them are crossed (team-amanvir.jpg
    // is shown as Larisa Nagra, team-larisa.jpg as Amanvir Mundra). The
    // placement was followed, not the file names. Confirm who is who.
    people: [
      {
        name: "Larisa Nagra",
        photo: "/team/larisa-nagra.webp",
        role: "CEO and co-founder",
        bio: "More than 20 years in clinical operations at pharma sponsors and major CROs, with expertise in investigator site payments, trial execution and APAC clinical operations.",
        tags: ["Clinical finance", "APAC operations"],
      },
      {
        // Replaces Vivek Gujral (client, 2026-11-19). No photo or bio supplied
        // yet: the card shows a monogram and the title. Add `photo`, `bio`
        // and `tags` when they arrive.
        name: "Nicole Lee",
        photo: null,
        role: "Chief Product Officer",
        bio: null,
        tags: [],
      },
      {
        name: "Amanvir Mundra",
        photo: "/team/amanvir-mundra.webp",
        // CTO since 2026-11-19 (client); was CPO. Bio and tags still describe
        // the product role: confirm with the client.
        role: "CTO and co-founder",
        bio: "Digital product and transformation leader across healthcare, defense, retail and construction, delivering enterprise platforms.",
        tags: ["Digital transformation", "Product leadership"],
      },
      {
        // As on the previous site: no name or photo published yet, so the
        // card shows the title and a monogram. Add `photo` and the name here
        // when they are announced.
        name: "Chief Commercial Officer",
        photo: null,
        role: null,
        monogram: "C",
        bio: "Commercial leader with extensive business development and partnership experience in the CRO industry. Has built sponsor and site relationships across global clinical trial programs, driven revenue growth, and turned complex operational needs into commercial strategy.",
        tags: ["Business development", "CRO industry"],
      },
    ],
  },
  advisors: {
    eyebrow: "Advisory board",
    title: "Guided by people who have run this.",
    text: "Our advisory board brings sector-specific expertise in clinical operations, regulatory affairs, fintech and APAC markets.",
    /** Shown above each card's number. The numbers are an index, not a metric. */
    figureLabel: "Advisory area",
    /** Accessible name for each card's arrow, followed by the area name. */
    ctaLabel: "Talk to us about",
    ctaHref: "/contact",
    areas: [
      { name: "Clinical research operations", tag: "Global pharma", text: "Senior clinical operations advisors from global pharma, on sponsor payment workflows, CRO management and site selection." },
      { name: "Regulatory and compliance", tag: "ICH · FDA · APAC", text: "Former regulators and consultants experienced with ICH, FDA 21 CFR and APAC regulators." },
      { name: "Fintech and payments", tag: "MAS ecosystem", text: "Executives from Singapore's MAS-regulated ecosystem, with expertise in cross-border payment rails, FX and banking infrastructure." },
      { name: "APAC life sciences", tag: "Regional network", text: "Regional leaders with networks across APAC sponsors, CROs and research sites." },
    ],
  },
  roadmap: {
    title: "Our path to becoming the system of record.",
    continuation: "We are building in phases, each widening the infrastructure and deepening the network effects.",
    phases: [
      {
        phase: "Phase 1",
        when: "Now",
        name: "APAC payment infrastructure",
        text: "Launch in Singapore with an APAC payment rail network, establish sponsor and CRO partnerships, and build the core modules and compliance infrastructure.",
        // Country codes are shown as small text tags (emoji flags do not render on Windows).
        markets: [
          { code: "SG", name: "Singapore" },
          { code: "AU", name: "Australia" },
          { code: "IN", name: "India" },
          { code: "KR", name: "Korea" },
          { code: "MY", name: "Malaysia" },
          { code: "ID", name: "Indonesia" },
          { code: "PH", name: "Philippines" },
          { code: "TH", name: "Thailand" },
          { code: "VN", name: "Vietnam" },
          { code: "TW", name: "Taiwan" },
        ],
      },
      {
        phase: "Phase 2",
        when: "2026",
        name: "Full APAC coverage and integrations",
        text: "Complete coverage across Southeast Asia, deepen EDC integrations, launch self-serve sponsor onboarding and build network effects.",
        markets: [
          { code: "MY", name: "Malaysia" },
          { code: "TH", name: "Thailand" },
          { code: "TW", name: "Taiwan" },
          { code: null, name: "+4 markets" },
        ],
      },
      {
        phase: "Phase 3",
        when: "2027 and beyond",
        name: "Global system of record",
        text: "Expand to Europe and the Americas, and launch sponsor-facing accrual and working capital products.",
        markets: [
          { code: null, name: "Europe" },
          { code: null, name: "Americas" },
          { code: null, name: "Global system of record" },
        ],
      },
    ],
  },
  principles: {
    eyebrow: "Operating principles",
    title: "How we build.",
    // UI copy written for the redesign, not from the previous site: confirm with the client.
    intro: "Four rules every product decision at ClinTrust is held to.",
    // `tagline` is the short line; `text` is the fuller wording from the previous site.
    items: [
      {
        name: "Structural, not symptomatic",
        tagline: "We solve root causes, not workarounds.",
        text: "Every product decision must solve a structural problem in the clinical trial payment ecosystem, not provide a workaround for a broken process.",
      },
      {
        name: "Compliance first, features second",
        tagline: "The compliance architecture is built before the user interface.",
        text: "Regulatory compliance is never traded against product velocity, because our customers' regulatory obligations are non-negotiable.",
      },
      {
        name: "Explainability as standard",
        tagline: "AI-assisted decisions must be explainable, reviewable and attributable.",
        text: "We do not deploy black-box processes in a regulated environment. Trust is built through transparency.",
      },
      {
        name: "Site sustainability matters",
        tagline: "The financial sustainability of investigator sites is a primary design objective.",
        text: "Investigator sites are the most vulnerable participants in the clinical trial payment chain. Their financial health is not a secondary consideration.",
      },
    ],
  },
};

export const approach = {
  hero: {
    eyebrow: "Our approach by stakeholder",
    title: "Built for every role in the chain.",
    lead: "ClinTrust serves sponsors, CROs and sites from one infrastructure layer. Each gets its own dashboards, access controls and view of the same verified data.",
  },
  /**
   * Platform overview video, in the hero beside the title. Self-hosted in
   * public/video/: WebM first (smaller), MP4 as the fallback for browsers
   * without WebM. Click to play; nothing loads until then.
   */
  video: {
    eyebrow: "Platform overview",
    label: "Play the ClinTrust platform overview (60 seconds)",
    caption:
      "See how ClinTrust replaces manual, invoice-driven payment cycles with execution-triggered, compliant disbursements, from data capture to site receipt.",
    sources: [
      { src: "/video/clintrust-overview.webm", type: "video/webm" },
      { src: "/video/clintrust-overview.mp4", type: "video/mp4" },
    ],
    poster: null as string | null,
  },
  /** Illustrative product view beside the sponsor features (example data, from the previous site). */
  commandCenter: {
    title: "Sponsor command center",
    status: "Live",
    tiles: [
      { label: "Active portfolio", value: "$127.4M" },
      { label: "Escrow buffer", value: "$8.2M" },
      { label: "Capital freed", value: "$14.6M", highlight: true },
    ],
    columns: ["Study", "Sites", "Accrued", "Paid", "Balance"],
    rows: [
      { study: "CTR-2401", sites: "12", accrued: "$2.1M", paid: "$1.8M", balance: "$318K" },
      { study: "CTR-2318", sites: "8", accrued: "$1.4M", paid: "$1.4M", balance: "Current" },
      { study: "CTR-2276", sites: "19", accrued: "$3.8M", paid: "$3.2M", balance: "$584K" },
    ],
  },
  roles: [
    {
      id: "sponsors",
      label: "For sponsors",
      title: "Working capital efficiency and full accrual visibility.",
      experienceTitle: "The sponsor experience",
      text: "Pharma and biotech sponsors carry the full financial burden of a trial. ClinTrust gives you direct control over payment authorization, real-time accrual visibility and less capital tied up in escrow, without compromising compliance.",
      // `meter` drives the bar above each stat: "percent" plots the figure on a
      // 0-100% scale (`from` shades a range); the other kinds are indicators
      // for figures that are not numbers, with no scale.
      stats: [
        { figure: "70–80%", label: "less escrow capital required", meter: { kind: "percent", value: 80, from: 70 } },
        { figure: "Real time", label: "accrual visibility across enrolled sites", meter: { kind: "live" } },
        { figure: "~85%", label: "less finance reconciliation workload", meter: { kind: "percent", value: 85 } },
        { figure: "Day 1", label: "authorization from execution confirmation", meter: { kind: "start" } },
      ],
      features: [
        { name: "Dynamic capital management", icon: DoodleChartUp, text: "Execution-calibrated funding buffers replace oversized escrow advances. On a $100M portfolio this frees $10–15M of idle capital." },
        { name: "Real-time accrual dashboard", icon: DoodleGauge, text: "Earned-but-unpaid liabilities by site, study and cost center." },
        { name: "CRO-neutral architecture", icon: DoodleMerge, text: "Sits above the CRO relationship, so payment visibility is consistent whichever CRO runs the study." },
        { name: "Automated compliance", icon: DoodleShieldCheck, text: "Every payment is traced from execution event to bank receipt, with a 21 CFR Part 11 audit trail generated automatically." },
        { name: "Configurable authorization", icon: DoodleFlow, text: "Threshold-based auto-approval, multi-tier approval and budget-owner routing, set per study protocol." },
      ],
    },
    {
      id: "cros",
      label: "For CROs",
      title: "Take out the reconciliation burden and the disputes.",
      experienceTitle: "The CRO experience",
      text: "CROs spend significant resources reconciling site payments. ClinTrust absorbs that workload, cutting the load on CRO finance teams while sites are paid faster and more accurately.",
      stats: [
        { figure: "~80%", label: "less manual reconciliation", meter: { kind: "percent", value: 80 } },
        { figure: "Fewer", label: "site payment disputes and queries", meter: { kind: "down" } },
        { figure: "Real time", label: "payment status for every study", meter: { kind: "live" } },
        { figure: "Plugs in", label: "to the trial systems you already run", meter: { kind: "full" } },
      ],
      features: [
        { name: "Smoother invoice generation", icon: DoodleFileList, text: "Execution-triggered payables let sites raise invoices for completed visits quickly. The AI engine closes the reconciliation loop." },
        { name: "Less work for CRO teams", icon: DoodleTimer, text: "Clinical operations and grant payment teams spend less time matching site payables to EDC activity." },
        { name: "Operations dashboard", icon: DoodleGauge, text: "Payment status across all sites and studies, with overdue and disputed payments flagged." },
        { name: "Multi-sponsor support", icon: DoodleBuilding, text: "Multiple sponsors and protocols in one environment, with strict data segregation and sponsor-configurable access." },
        { name: "Fewer disputes", icon: DoodleScales, text: "Verified payables and full data lineage settle whether an activity was completed at the data layer, before payment is triggered." },
        { name: "Audit-ready reporting", icon: DoodleFileShield, text: "Structured reconciliation reports and audit packages for sponsor and regulatory inspections, with no manual assembly." },
      ],
    },
    {
      id: "sites",
      label: "For sites",
      title: "Earned versus paid, in real time.",
      experienceTitle: "The site experience",
      text: "Investigator sites are the backbone of clinical research and carry the most financial risk. ClinTrust shows what a site has earned, what has been approved and what is in transit, so research finance becomes predictable instead of reactive.",
      stats: [],
      features: [
        { name: "Live earned versus paid", text: "Every completed visit, procedure and milestone shows its payment status." },
        { name: "No more invoice chasing", text: "Payments are triggered by execution data, not invoice approval. Sites are notified when a disbursement is in transit." },
        { name: "Cash flow forecasting", text: "Upcoming receipts projected from enrolled patients and scheduled visits, to support staffing plans." },
        { name: "Disputes with data lineage", text: "Sites can see the full reconciliation trail: which data points formed each payable." },
        { name: "Per-PI, per-study view", text: "Coordinators and investigators track completion rates, pending payables and cumulative grant receipts per study." },
      ],
    },
  ],
} as const;

export const insights = {
  hero: {
    title: "Perspectives on clinical trial payments.",
    lead: "Analysis, commentary and practical thinking on investigator grant administration, payment infrastructure and the financial realities of running clinical trials.",

    /** The hero scene's one visible word, on the quote bubble (decorative, aria-hidden). */
    quote: "Hmm…",
  },
  /** Under the article cards (sprint 10): a short line and a button down to the demo form on this page. */
  cta: {
    text: "Seen your own payments in one of these?",
    label: "Request a demo",
    href: "#demo",
  },
  articles: [
    {
      slug: "why-site-payments-are-still-delayed",
      category: "Payment delays",
      title: "Why clinical trial site payments are still delayed",
      teaser: "Sites complete visits months before they are paid. Not because invoices move slowly, but because payment is still triggered by retrospective invoicing rather than by clinical execution. Here is what needs to change.",
      readingTime: "8 min read",
      tags: ["Sponsors", "Sites", "Payment infrastructure"],
    },
    {
      slug: "hidden-crc-burden-of-site-invoicing",
      category: "Site operations",
      title: "The hidden CRC burden of clinical trial site invoicing",
      teaser: "Clinical research coordinators can spend 10–20% of their time on financial administration: chasing payments, reconciling invoices and managing disputes. That is capacity lost to work a better system would remove.",
      readingTime: "7 min read",
      tags: ["Sites", "CRCs", "Operations"],
    },
    {
      slug: "just-in-time-site-payment-funding",
      category: "Capital efficiency",
      title: "Why clinical trials need just-in-time site payment funding",
      teaser: "Sponsors routinely hold 15–25% of trial budgets idle in escrow while sites wait months to be paid. The paradox is structural. Just-in-time funding, calibrated to real execution data, can free $14–16M on a $100M portfolio.",
      readingTime: "8 min read",
      tags: ["Sponsors", "Capital efficiency", "Dynamic funding"],
    },
  ],
};

export const contact = {
  hero: {
    title: "Talk to us.",
    /** Lighter second half of the title; `mark` goes on a coral sticker (sprint 10, like the home section headings). */
    continuation: "Tell us what is slowing your payments down.",
    mark: "slowing",
    lead: "Ask for a demo or tell us what you are working on. A demo is a 45-minute walkthrough of how your site payments run today and the capital you could release.",
  },
  /** Ways to reach the team, from the previous site's contact block. */
  channels: [
    { icon: DoodlePin, label: "Headquarters", lines: [brand.legalEntity, "Singapore 048946"] },
    { icon: DoodleMail, label: "General inquiries", email: "info@clintrust.ai" },
    { icon: DoodleBriefcase, label: "Business development", email: "partnerships@clintrust.ai" },
    { icon: DoodleLock, label: "Security and compliance", email: "security@clintrust.ai" },
  ],
  subjects: [
    "Request a demo",
    "Sponsor inquiry",
    "CRO partnership",
    "Site onboarding",
    "Media or press",
    "Investment inquiry",
    "Other",
  ],
};
