/**
 * Full text of the three Insights articles, keyed by the `slug` on each entry
 * in `insights.articles` (content/pages.ts), which holds the card copy
 * (category, title, teaser, reading time, tags).
 *
 * Source: the previous clintrust.ai/insights page (#article-1 to #article-3),
 * fetched in sprint 8. The client's wording is kept; only the headings were
 * moved to sentence case and "ClinTrust.ai" shortened to "ClinTrust" to match
 * the rest of the site. Needs sign-off from the ClinTrust team.
 */

export type ArticleBlock =
  /** The opening paragraph, set one step louder than the body. */
  | { type: "intro"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string };

export const articleBodies: Record<string, ArticleBlock[]> = {
  "why-site-payments-are-still-delayed": [
    {
      type: "intro",
      text: "Clinical trials have become increasingly digital. Protocols are managed through EDC systems, monitoring is increasingly risk-based, and sponsors have more operational data than ever before. Yet one critical workflow still behaves as if trials are paper-based: investigator grant payments.",
    },
    {
      type: "p",
      text: "Across the industry, sites often complete visits, procedures and milestones weeks or months before receiving payment. The problem is not simply that invoices move slowly. The deeper issue is that payments are still formed through a retrospective, invoice-centric process rather than being tied directly to clinical execution.",
    },
    { type: "p", text: "That distinction matters." },

    { type: "h2", text: "The payment delay problem is real" },
    {
      type: "p",
      text: "Industry data consistently shows that investigator sites wait 90 to 140 days from the point of patient visit to the point of payment receipt. This is not primarily a technology problem. It is a process architecture problem, one built into how the industry has always done things.",
    },
    {
      type: "p",
      text: "The typical payment chain looks like this: a patient attends a visit, the data is entered into the EDC system, the site waits for data lock, then generates an invoice, which is submitted to the CRO, reviewed by the sponsor, approved, and finally paid. Each step in that sequence adds days or weeks. The aggregate latency is enormous.",
    },

    { type: "h2", text: "Why the invoice-centric model is the root cause" },
    {
      type: "p",
      text: "The invoice is the wrong trigger for a payment. By the time a site submits an invoice, the work has already been done, often weeks or months earlier. The invoice is a retrospective document that initiates a financial process that should have been initiated by the clinical event itself.",
    },
    {
      type: "p",
      text: "In a well-designed system, the moment a visit is completed and verified in the EDC, a payable obligation is formed automatically. The payment process begins at execution, not at invoicing.",
    },
    {
      type: "p",
      text: "This shift from invoice-triggered to execution-triggered payables is the structural change the industry needs. It requires a platform that sits between clinical data systems and financial infrastructure, and translates execution events into verified, compliant payment instructions in real time.",
    },

    { type: "h2", text: "What execution-aligned payments look like" },
    {
      type: "p",
      text: "In an execution-aligned model, the payment lifecycle looks fundamentally different. When a site completes a visit, the EDC records it. That event is captured by the payment platform, matched to the site's budget schedule, validated against protocol requirements, and converted into a payable, all automatically, and all before the site submits any invoice.",
    },
    {
      type: "p",
      text: "The site does not need to chase payment. The payment is already in formation by the time the site would have started preparing an invoice under the old model.",
    },
    {
      type: "p",
      text: "This is not a theoretical improvement. It is a structural one, and it requires purpose-built infrastructure to deliver.",
    },

    { type: "h2", text: "The compliance dimension" },
    {
      type: "p",
      text: "Clinical trial payments are not ordinary commercial transactions. They are subject to regulatory requirements around documentation, audit trails and payment substantiation. Any payment system must meet 21 CFR Part 11, ICH E6(R3) and local regulatory requirements.",
    },
    {
      type: "p",
      text: "Execution-aligned systems can meet these requirements more completely than invoice-driven ones, because every payment is grounded in a verified clinical data event with a full audit trail. The documentation exists before payment, not as an afterthought.",
    },

    { type: "h2", text: "What needs to change" },
    {
      type: "p",
      text: "The industry needs to stop treating investigator site payments as an administrative function and start treating them as a clinical operations function. Payment timing affects site financial sustainability, which affects trial execution, which affects drug development timelines.",
    },
    {
      type: "p",
      text: "The technology to do this exists. What has been missing is a platform purpose-built for clinical trial payment infrastructure: one that understands both the clinical data layer and the financial infrastructure layer, and connects them in a compliant, auditable way.",
    },
    { type: "p", text: "That is what ClinTrust is designed to be." },
  ],

  "hidden-crc-burden-of-site-invoicing": [
    {
      type: "intro",
      text: "Clinical research coordinators are often described as the operational backbone of a clinical trial site. They manage visits, support patients, coordinate investigators, maintain documentation and keep the trial moving. But in many studies, CRCs also carry another responsibility: financial administration.",
    },
    {
      type: "p",
      text: "They track billable activity, prepare invoices, reconcile payments, chase missing line items, respond to sponsor or CRO questions, and try to understand why completed work has not yet been paid.",
    },
    {
      type: "p",
      text: "This work is often dismissed as “admin”. In reality, it is a hidden operational burden that affects site capacity, staff morale and trial execution.",
    },

    { type: "h2", text: "Site invoicing is not a small task" },
    {
      type: "p",
      text: "At a busy investigator site running multiple concurrent studies, the invoicing burden can be substantial. Each study has its own budget schedule, its own payment timeline, its own CRO contact and its own reconciliation process. CRCs must track billable activity study by study, match it against negotiated rates, prepare structured invoices, and submit them through each sponsor or CRO's preferred channel.",
    },
    {
      type: "p",
      text: "When payments are delayed, as they frequently are, the CRC must follow up. When line items are disputed, the CRC must provide supporting documentation. When payment amounts differ from expectations, the CRC must reconcile the difference, often without adequate visibility into the sponsor's or CRO's calculations.",
    },

    { type: "h2", text: "The time cost is significant" },
    {
      type: "p",
      text: "Experienced site staff estimate that financial administration can consume 10 to 20 percent of a CRC's working time on complex multi-sponsor studies. That is time not spent on patient-facing activity, data quality or protocol adherence.",
    },
    {
      type: "p",
      text: "For sites under resource pressure (which describes most investigator sites), this is a meaningful operational constraint. The financial administration burden effectively reduces the clinical capacity of the site without reducing its cost base.",
    },

    { type: "h2", text: "The visibility problem" },
    {
      type: "p",
      text: "The frustration is compounded by a lack of visibility. Sites typically do not know what they have been paid for, what is pending, or why a specific payment has not arrived. They receive remittance advice that may not align with their invoice, and they lack tools to reconcile the difference without manual effort.",
    },
    {
      type: "p",
      text: "This creates a real-time earned-vs-paid gap: the site knows what work it has completed, but has no reliable view of where each payment stands in the processing chain. This uncertainty makes cash flow planning difficult and creates unnecessary follow-up loops between sites, CROs and sponsors.",
    },

    { type: "h2", text: "What changes when payments are execution-triggered" },
    {
      type: "p",
      text: "When payments are formed at the point of clinical execution rather than through invoicing, the CRC's financial burden is fundamentally reduced. The site does not need to prepare invoices; the payable is already in formation based on verified EDC data. The site does not need to chase payments; it has real-time visibility into what has been earned and what is pending.",
    },
    {
      type: "p",
      text: "The site portal becomes an earned-vs-paid dashboard rather than an invoicing workstation. CRCs spend less time on financial administration and more time on what they were hired to do.",
    },

    { type: "h2", text: "The broader implication" },
    {
      type: "p",
      text: "Investigator sites are under sustained pressure from regulatory demands, patient recruitment challenges and resource constraints. Adding an avoidable financial administration burden to an already stretched workforce is an own goal for the industry.",
    },
    {
      type: "p",
      text: "Reducing that burden requires more than a better invoicing tool. It requires removing the invoice as the trigger for payment altogether, and replacing it with a system that is grounded in clinical execution data.",
    },
    { type: "p", text: "That is a structural change. And it is overdue." },
  ],

  "just-in-time-site-payment-funding": [
    {
      type: "intro",
      text: "Clinical trial payment delays are usually discussed from the site perspective, and for good reason. Sites perform the work, incur the costs, and often wait months to be reimbursed. But there is another side to the problem.",
    },
    {
      type: "p",
      text: "Sponsors also suffer from an inefficient payment architecture. Because they lack real-time visibility into what has been completed, validated and earned, they often pre-fund large balances with CROs or payment intermediaries.",
    },
    {
      type: "p",
      text: "This creates a paradox: capital is advanced early, but sites are still paid late. That is a sign of a broken system.",
    },

    { type: "h2", text: "Why sponsors pre-fund investigator payments" },
    {
      type: "p",
      text: "Pre-funding exists for a rational reason. Clinical trials cannot stop because a payment account runs dry mid-study. Sponsors advance capital to CROs to ensure payment availability throughout the trial lifecycle. This is a form of operational insurance.",
    },
    {
      type: "p",
      text: "But the amount of capital that needs to be pre-funded under a traditional model is far larger than a well-designed system would require. Without real-time visibility into execution rates, payment velocity and earned-vs-paid status, sponsors and CROs apply conservative buffers, typically 15 to 25 percent of total trial budgets held in escrow at any given time.",
    },
    {
      type: "p",
      text: "On a $100M trial portfolio, that means $15 to $25M sitting idle in accounts earning no research return.",
    },

    { type: "h2", text: "The cost of idle capital" },
    {
      type: "p",
      text: "The opportunity cost of this idle capital is rarely quantified in clinical operations. Finance teams focus on ensuring payment availability; they do not typically model the return on capital that could be generated if escrow requirements were reduced.",
    },
    {
      type: "p",
      text: "At a 5 percent annual opportunity cost, $15M in idle escrow represents $750,000 in foregone annual return. Across a portfolio of studies, the aggregate figure is material. For a mid-size biotech running multiple concurrent trials, excess escrow can represent millions in capital that is not working.",
    },

    { type: "h2", text: "Why the escrow is larger than it needs to be" },
    {
      type: "p",
      text: "The core problem is that traditional payment models cannot calibrate escrow requirements to actual payment velocity. Because payments are invoice-triggered rather than execution-triggered, there is a lag between execution and payment that makes it impossible to predict, in real time, how much capital is actually needed at any given point in a study.",
    },
    {
      type: "p",
      text: "The conservative response is to over-fund. This is rational under uncertainty, but it is expensive.",
    },
    {
      type: "p",
      text: "A just-in-time funding model, calibrated to actual execution rates, site payment velocity and protocol schedules, can reduce escrow requirements significantly. Not by removing the buffer, but by making it precise rather than conservative.",
    },

    { type: "h2", text: "What just-in-time funding requires" },
    {
      type: "p",
      text: "Just-in-time funding is not simply a funding policy change. It requires a platform that can translate real-time execution data into forward-looking payment velocity models. The system needs to know what has been completed, what is scheduled, what the payment lag per corridor is, and how much capital needs to be available at each horizon.",
    },
    {
      type: "p",
      text: "This is an infrastructure problem, not a policy problem. The data exists in the EDC system. The payment schedule exists in the budget. The missing component is a platform that connects them and translates them into a dynamic funding requirement.",
    },

    { type: "h2", text: "The commercial implication" },
    {
      type: "p",
      text: "Reducing escrow requirements by 70 to 80 percent (from 20 percent to 4 to 6 percent of portfolio) releases capital that can be redeployed into active research. For a sponsor with a $100M portfolio, that is $14 to $16M in capital returned to the working capital base.",
    },
    {
      type: "p",
      text: "This is not a marginal improvement. It is a structural one, enabled by a payment infrastructure that is calibrated to clinical execution rather than conservative estimates.",
    },
    {
      type: "p",
      text: "ClinTrust's dynamic funding model is designed to deliver exactly this. By combining real-time execution data with payment velocity modelling, it produces a statistically sufficient buffer that maintains continuous payment availability without holding excess capital idle.",
    },
    {
      type: "p",
      text: "Just-in-time funding for clinical trial payments is not a future concept. The infrastructure exists to deliver it today.",
    },
  ],
};

/** Interface labels for the article cards and article pages. */
export const articleLabels = {
  readArticle: "Read article",
  back: "All insights",
  contents: "In this article",
  more: "More insights",
};
