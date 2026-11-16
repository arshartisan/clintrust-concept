import type { Metadata } from "next";
import { ArticleCard } from "@/components/marketing/article-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section } from "@/components/marketing/frame";
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
      <PageHero {...insights.hero} />

      <Section>
        <ul className="grid gap-4 lg:grid-cols-3">
          {insights.articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
