import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { heroConcepts } from "@/content/landing";
import { cx } from "@/utils/cx";

/**
 * The strip above each concept: which concept this is, and links to the
 * others. Only on the review routes; the chosen hero ships without it.
 */
export function ConceptBar({ slug }: { slug: string }) {
  return (
    <div className="border-b border-separator-border bg-sun-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-4 gap-y-2 px-6 py-3 sm:px-8 lg:px-12">
        <Link
          href="/concepts"
          className="inline-flex items-center gap-1.5 rounded-md text-body-2-medium text-text-secondary outline-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring"
        >
          <RiArrowLeftLine className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {heroConcepts.backLabel}
        </Link>
        <span className="hidden text-body-2-regular text-text-tertiary sm:inline">{heroConcepts.reviewLabel}</span>
        <nav aria-label="Concepts" className="ms-auto flex gap-1.5">
          {heroConcepts.items.map((item) => {
            const current = item.slug === slug;
            return (
              <Link
                key={item.slug}
                href={`/concepts/${item.slug}`}
                aria-current={current ? "page" : undefined}
                title={item.name}
                className={cx(
                  "flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-text-primary px-2.5 font-display text-body-2-semibold outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                  current ? "bg-text-primary text-text-white" : "bg-background-primary-default text-text-primary hover:bg-sun-200",
                )}
              >
                {item.letter}
                <span className="sr-only">: {item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
