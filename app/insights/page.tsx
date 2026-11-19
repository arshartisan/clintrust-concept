import type { Metadata } from "next";
import { RiArrowDownLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { ArticleCard } from "@/components/marketing/article-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section } from "@/components/marketing/frame";
import { InsightsHeroScene } from "@/components/marketing/insights-hero-scene";
import { PageHero } from "@/components/marketing/page-hero";
import { insights } from "@/content/pages";

export const metadata: Metadata = {
  title: "Insights",
  description: insights.hero.lead,
};

/** Article summaries. Each card links to the full article at /insights/[slug]. */
export default function InsightsPage() {
  return (
    <>
      <PageHero title={insights.hero.title} lead={insights.hero.lead} large aside={<InsightsHeroScene />} />

      <Section>
        <ul className="grid gap-4 lg:grid-cols-3">
          {insights.articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>

        {/* A nudge to the demo form at the foot of this page (sprint 10). */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border-2 border-text-primary bg-accent-100 p-6 shadow-sticker sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="title-chunky text-subsection text-balance text-text-primary">{insights.cta.text}</p>
          <ButtonLink
            href={insights.cta.href}
            trailingIcon={RiArrowDownLine}
            className="shrink-0"
            data-track="request_demo_click"
            data-track-location="insights-cards"
          >
            {insights.cta.label}
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
