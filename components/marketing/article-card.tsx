import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import type { insights } from "@/content/pages";
import { articleLabels } from "@/content/articles";
import { cx } from "@/utils/cx";

export type InsightArticle = (typeof insights.articles)[number];

interface ArticleCardProps {
  article: InsightArticle;
  /** h2 on /insights, h3 under the "More insights" heading on an article. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * Summary card for one Insights article. The whole card is clickable through
 * a stretched link on the title (so the link's accessible name is the title,
 * not the whole card), and the focus ring is drawn on the card itself.
 * "Read article" is drawn as the yellow sticker button (sprint 10).
 */
export function ArticleCard({ article, headingLevel: Heading = "h2", className }: ArticleCardProps) {
  return (
    <article
      className={cx(
        "group relative flex h-full flex-col rounded-3xl border-2 border-text-primary shadow-sticker bg-background-full p-7 transition-[translate,box-shadow,background-color] duration-200 hover:translate-x-px hover:translate-y-px hover:shadow-sticker-sm hover:bg-background-secondary-default",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-border-focus-ring",
        className,
      )}
    >
      <p className="flex items-center justify-between gap-4 text-body-2-medium">
        <span className="text-accent-600">{article.category}</span>
        <span className="text-text-secondary">{article.readingTime}</span>
      </p>
      <Heading className="mt-5 text-subsection text-balance text-text-primary">
        <Link
          href={`/insights/${article.slug}`}
          className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {article.title}
        </Link>
      </Heading>
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
      {/* Looks like the primary button (the yellow sticker, `.button-glow`)
          but is a label: the whole card is already the link, so a second link
          here would be invalid. It presses in when the card is hovered
          (`.group:hover .card-cta`, styles/brand.css). */}
      <span aria-hidden="true" className="mt-6 border-t border-separator-border pt-5">
        <span className="button-glow card-cta inline-flex h-10 items-center gap-2 rounded-full px-5 text-body-2-semibold text-text-primary">
          {articleLabels.readArticle}
          <RiArrowRightLine className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </span>
      </span>
    </article>
  );
}
