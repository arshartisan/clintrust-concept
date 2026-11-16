import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiArrowLeftLine } from "@remixicon/react";
import { ArticleBody, headingId } from "@/components/marketing/article-body";
import { ArticleCard } from "@/components/marketing/article-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { container, Section, SectionHeading } from "@/components/marketing/frame";
import { Reveal } from "@/components/marketing/reveal";
import { articleBodies, articleLabels } from "@/content/articles";
import { insights } from "@/content/pages";
import { cx } from "@/utils/cx";

type Props = { params: Promise<{ slug: string }> };

function getArticle(slug: string) {
  const article = insights.articles.find((a) => a.slug === slug);
  const body = articleBodies[slug];
  return article && body ? { article, body } : null;
}

export function generateStaticParams() {
  return insights.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getArticle(slug);
  if (!found) return {};
  return {
    title: found.article.title,
    description: found.article.teaser,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const found = getArticle(slug);
  if (!found) notFound();
  const { article, body } = found;

  const sections = body.filter((block) => block.type === "h2");
  const others = insights.articles.filter((a) => a.slug !== slug);

  return (
    <>
      <section>
        <div className={cx(container, "pt-12 pb-16 lg:pt-16 lg:pb-20")}>
          <Link
            href="/insights"
            className="group inline-flex items-center gap-1.5 rounded-md text-body-medium text-text-secondary transition-colors duration-150 hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <RiArrowLeftLine className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5" />
            {articleLabels.back}
          </Link>

          <p className="mt-10 flex items-center gap-3 text-body-2-medium lg:mt-14">
            <span className="text-accent-600">{article.category}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-foreground-icon-quaternary" />
            <span className="text-text-secondary">{article.readingTime}</span>
          </p>
          <h1 className="hero-settle mt-5 max-w-[22ch] text-hero text-balance text-text-primary">{article.title}</h1>
          <p className="hero-settle mt-6 max-w-[62ch] text-lead text-pretty text-text-secondary">{article.teaser}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border-button-default px-2.5 py-1 text-caption-1-medium text-text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section innerClassName="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label={articleLabels.contents} className="sticky top-28">
            <p className="text-body-2-medium text-text-tertiary">{articleLabels.contents}</p>
            <ol className="mt-4 flex flex-col gap-1 border-s border-separator-border">
              {sections.map((block) => (
                <li key={block.text}>
                  <a
                    href={`#${headingId(block.text)}`}
                    className="-ms-px block rounded-e-md border-s border-transparent py-1.5 ps-4 pe-2 text-body-regular text-text-secondary transition-colors duration-150 hover:border-border-button-hover hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                  >
                    {block.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <article className="lg:col-span-9">
          <ArticleBody blocks={body} />
        </article>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading title={articleLabels.more} />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug}>
              <ArticleCard article={other} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
