import type { Metadata } from "next";
import { BorderGlow } from "@/components/marketing/border-glow";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section } from "@/components/marketing/frame";
import { PageHero } from "@/components/marketing/page-hero";
import { insights } from "@/content/pages";

export const metadata: Metadata = {
  title: "Insights",
  description: insights.hero.lead,
};

/**
 * Summaries only. The previous site published a teaser for each article and
 * no full text, so there are no article pages to link to yet. When the
 * articles are written, give each a route and turn these cards into links.
 */
export default function InsightsPage() {
  return (
    <>
      <PageHero {...insights.hero} />

      <Section>
        <ul className="grid gap-4 lg:grid-cols-3">
          {insights.articles.map((article, index) => (
            <li key={article.title}>
              <BorderGlow
                sweepDelay={index * 140}
                className="h-full rounded-3xl border border-border-button-default bg-background-full"
              >
                <article className="flex h-full flex-col p-7">
                  <p className="flex items-center justify-between gap-4 text-body-2-medium">
                    <span className="text-accent-600">{article.category}</span>
                    <span className="text-text-secondary">{article.readingTime}</span>
                  </p>
                  <h2 className="mt-5 text-subsection text-balance text-text-primary">{article.title}</h2>
                  <p className="mt-4 mb-7 text-body-regular text-text-secondary">{article.teaser}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border-button-default px-2.5 py-1 text-caption-1-medium text-text-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
