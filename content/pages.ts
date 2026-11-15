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
  },
  mission: {
    title: "To become the system of record for clinical trial payables.",
    text: [
      "We are building a platform where sponsors authorize once, execution drives payment automatically, and every transaction is immutably recorded, explainable and audit-ready.",
      "The aim is to take financial friction, payment uncertainty and compliance ambiguity out of trial operations. We start with the payment lifecycle and will extend to other workflows.",
    ],
  },
  values: [
    { name: "Infrastructure first", text: "Built as core infrastructure, not a point solution." },
    { name: "Aligned to execution", text: "Payments should reflect what has been done, not what has been invoiced." },
    { name: "Compliance as the foundation", text: "Compliance is the base of every architectural decision, not a feature added later." },
    { name: "APAC as the primary market", text: "First-class payment infrastructure for the region, with a depth global players cannot match." },
  ],
  leadership: {
    title: "Founded by operators, built by builders.",
    people: [
      {
        name: "Larisa Nagra",
        role: "CEO and co-founder",
        bio: "More than 20 years in clinical operations at pharma sponsors and major CROs, with expertise in investigator site payments, trial execution and APAC clinical operations.",
        tags: ["Clinical finance", "APAC operations"],
      },
      {
        name: "Vivek Gujral",
        role: "CTO and co-founder",
        bio: "Fintech infrastructure specialist who has built payment solutions for the insurance sector, including payment rail architecture and AI-assisted financial systems in Singapore and internationally.",
        tags: ["Fintech infrastructure", "AI systems"],
      },
      {
        name: "Amanvir Mundra",
        role: "CPO and co-founder",
        bio: "Digital product and transformation leader across healthcare, defense, retail and construction, delivering enterprise platforms.",
        tags: ["Digital transformation", "Product leadership"],
      },
    ],
  },
  advisors: {
    title: "Guided by people who have run this.",
    areas: [
      { name: "Clinical research operations", text: "Senior clinical operations advisors from global pharma, on sponsor payment workflows, CRO management and site selection." },
      { name: "Regulatory and compliance", text: "Former regulators and consultants experienced with ICH, FDA 21 CFR and APAC regulators." },
      { name: "Fintech and payments", text: "Executives from Singapore's MAS-regulated ecosystem, with expertise in cross-border payment rails, FX and banking infrastructure." },
      { name: "APAC life sciences", text: "Regional leaders with networks across APAC sponsors, CROs and research sites." },
    ],
  },
  roadmap: {
    title: "Our path to becoming the system of record.",
    phases: [
      {
        when: "Now",
        name: "APAC payment infrastructure",
        text: "Launch in Singapore with an APAC payment rail network, establish sponsor and CRO partnerships, and build the core modules and compliance infrastructure.",
      },
      {
        when: "Next",
        name: "Full APAC coverage and integrations",
        text: "Complete coverage across Southeast Asia, deepen EDC integrations, launch self-serve sponsor onboarding and build network effects.",
      },
      {
        when: "Later",
        name: "Global system of record",
        text: "Expand to Europe and the Americas, and launch sponsor-facing accrual and working capital products.",
      },
    ],
  },
  principles: {
    title: "How we build.",
    items: [
      { name: "Structural, not symptomatic", text: "We solve root causes, not workarounds." },
      { name: "Compliance first, features second", text: "The compliance architecture is built before the user interface." },
      { name: "Explainability as standard", text: "AI-assisted decisions must be explainable, reviewable and attributable." },
      { name: "Site sustainability matters", text: "The financial sustainability of investigator sites is a primary design objective." },
    ],
  },
  contact: {
    title: "Get in touch.",
    text: "Tell us whether you are a sponsor, a CRO or a site, and what you would like to see.",
    office: ["ClinTrust.ai Pte. Ltd.", "Singapore 048946"],
  },
};

export const approach = {
  hero: {
    title: "Built for every role in the chain.",
    lead: "ClinTrust serves sponsors, CROs and sites from one infrastructure layer. Each gets its own dashboards, access controls and view of the same verified data.",
  },
  roles: [
    {
      id: "sponsors",
      label: "For sponsors",
      title: "Working capital efficiency and full accrual visibility.",
      text: "Pharma and biotech sponsors carry the full financial burden of a trial. ClinTrust gives you direct control over payment authorization, real-time accrual visibility and less capital tied up in escrow, without compromising compliance.",
      stats: [
        { figure: "70–80%", label: "less escrow capital required" },
        { figure: "Real time", label: "accrual visibility across enrolled sites" },
        { figure: "~85%", label: "less finance reconciliation workload" },
        { figure: "Day 1", label: "authorization from execution confirmation" },
      ],
      features: [
        { name: "Dynamic capital management", text: "Execution-calibrated funding buffers replace oversized escrow advances. On a $100M portfolio this frees $10–15M of idle capital." },
        { name: "Real-time accrual dashboard", text: "Earned-but-unpaid liabilities by site, study and cost center." },
        { name: "CRO-neutral architecture", text: "Sits above the CRO relationship, so payment visibility is consistent whichever CRO runs the study." },
        { name: "Automated compliance", text: "Every payment is traced from execution event to bank receipt, with a 21 CFR Part 11 audit trail generated automatically." },
        { name: "Configurable authorization", text: "Threshold-based auto-approval, multi-tier approval and budget-owner routing, set per study protocol." },
      ],
    },
    {
      id: "cros",
      label: "For CROs",
      title: "Take out the reconciliation burden and the disputes.",
      text: "CROs spend significant resources reconciling site payments. ClinTrust absorbs that workload, cutting the load on CRO finance teams while sites are paid faster and more accurately.",
      stats: [
        { figure: "~80%", label: "less manual reconciliation" },
        { figure: "Fewer", label: "site payment disputes and queries" },
        { figure: "Real time", label: "payment status for every study" },
        { figure: "Native", label: "EDC and CTMS integration" },
      ],
      features: [
        { name: "Smoother invoice generation", text: "Execution-triggered payables let sites raise invoices for completed visits quickly. The AI engine closes the reconciliation loop." },
        { name: "Less work for CRO teams", text: "Clinical operations and grant payment teams spend less time matching site payables to EDC activity." },
        { name: "Operations dashboard", text: "Payment status across all sites and studies, with overdue and disputed payments flagged." },
        { name: "Multi-sponsor support", text: "Multiple sponsors and protocols in one environment, with strict data segregation and sponsor-configurable access." },
        { name: "Fewer disputes", text: "Verified payables and full data lineage settle whether an activity was completed at the data layer, before payment is triggered." },
        { name: "Audit-ready reporting", text: "Structured reconciliation reports and audit packages for sponsor and regulatory inspections, with no manual assembly." },
      ],
    },
    {
      id: "sites",
      label: "For sites",
      title: "Earned versus paid, in real time.",
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
  },
  articles: [
    {
      category: "Payment delays",
      title: "Why clinical trial site payments are still delayed",
      teaser: "Sites complete visits months before they are paid. Not because invoices move slowly, but because payment is still triggered by retrospective invoicing rather than by clinical execution. Here is what needs to change.",
      readingTime: "8 min read",
      tags: ["Sponsors", "Sites", "Payment infrastructure"],
    },
    {
      category: "Site operations",
      title: "The hidden CRC burden of clinical trial site invoicing",
      teaser: "Clinical research coordinators can spend 10–20% of their time on financial administration: chasing payments, reconciling invoices and managing disputes. That is capacity lost to work a better system would remove.",
      readingTime: "7 min read",
      tags: ["Sites", "CRCs", "Operations"],
    },
    {
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
    lead: "Ask for a demo or tell us what you are working on. A demo is a 45-minute walkthrough of how your site payments run today and the capital you could release.",
  },
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
