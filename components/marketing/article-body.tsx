import type { ArticleBlock } from "@/content/articles";
import { cx } from "@/utils/cx";

/** Anchor id for an article section heading, shared by the body and its contents list. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ArticleBodyProps {
  blocks: ArticleBlock[];
  className?: string;
}

/**
 * The running text of an article, set for reading: one 65ch column, 18px
 * paragraphs at 1.6 leading, the opening paragraph in the primary ink, and
 * extra space above each section heading so the sections read as chapters.
 */
export function ArticleBody({ blocks, className }: ArticleBodyProps) {
  return (
    <div className={cx("flex max-w-[65ch] flex-col gap-6", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "intro":
            return (
              <p key={i} className="text-lead text-pretty text-text-primary">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={headingId(block.text)}
                className="mt-8 scroll-mt-28 text-subsection text-balance text-text-primary"
              >
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="text-lead text-pretty text-text-secondary">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
