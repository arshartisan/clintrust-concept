import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Page frame. Every section shares one 1200px column whose left and right
 * edges are drawn as hairline rails on desktop, and sections are separated by
 * hairlines. The rails are the page's structural device: they replace cards
 * and background washes as the way sections are told apart.
 */
export const container =
  "mx-auto w-full max-w-[1200px] border-separator-border px-6 sm:px-8 lg:border-x lg:px-12";

interface SectionProps {
  id?: string;
  /** Classes for the full-bleed <section> (e.g. `dark bg-background-full`). */
  className?: string;
  /** Classes for the inner railed column. */
  innerClassName?: string;
  children: ReactNode;
}

export function Section({ id, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cx("scroll-mt-16 border-t border-separator-border", className)}>
      <div className={cx(container, "py-20 lg:py-28", innerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  /** Second sentence, set in the quieter tone directly after the title. */
  continuation?: string;
  className?: string;
}

/**
 * Two-tone heading: the claim in the primary ink, its continuation in the
 * tertiary tone, set as one running block of text.
 */
export function SectionHeading({ title, continuation, className }: SectionHeadingProps) {
  return (
    <h2 className={cx("max-w-[26ch] text-section text-balance text-text-primary", className)}>
      {title}
      {continuation ? <span className="text-text-tertiary"> {continuation}</span> : null}
    </h2>
  );
}
