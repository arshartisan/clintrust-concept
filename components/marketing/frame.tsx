import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Page frame. Every section shares one 1200px column. Sprint 9 (client
 * feedback): no hairline rails down its sides and no hairlines between
 * sections; the sticker cards and section spacing tell sections apart.
 */
export const container =
  "mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12";

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
    <section id={id} className={cx("scroll-mt-16", className)}>
      <div className={cx(container, "py-20 lg:py-28", innerClassName)}>{children}</div>
    </section>
  );
}

/** Sticker-box colours for a title's highlighted phrase. */
const MARK_TONES = {
  coral: "bg-coral-500 text-text-white",
  sun: "bg-accent-300 text-text-primary",
  teal: "bg-teal-300 text-text-primary",
} as const;

export type MarkTone = keyof typeof MARK_TONES;

/**
 * Text with one phrase set on a tilted sticker box (`.title-mark`), after the
 * Moxie reference's "DOESN'T". The box never wraps, so keep the phrase to
 * a word or two. Matches the first occurrence, case-sensitive;
 * if the phrase is not in the text, the text renders plain.
 */
export function MarkedText({ text, mark, tone = "coral" }: { text: string; mark?: string; tone?: MarkTone }) {
  const at = mark ? text.indexOf(mark) : -1;
  if (!mark || at < 0) return <>{text}</>;
  // Punctuation right after the phrase stays on the box's line.
  const rest = text.slice(at + mark.length);
  const stuck = rest.match(/^[.,!?;:]+/)?.[0] ?? "";
  return (
    <>
      {text.slice(0, at)}
      <span className="whitespace-nowrap">
        <span className={cx("title-mark", MARK_TONES[tone])}>{mark}</span>
        {stuck}
      </span>
      {rest.slice(stuck.length)}
    </>
  );
}

interface SectionHeadingProps {
  title: string;
  /** Second sentence, set in the quieter tone directly after the title. */
  continuation?: string;
  /** A phrase of the title or the continuation to set on a sticker box. */
  mark?: string;
  markTone?: MarkTone;
  className?: string;
}

/**
 * Chunky two-tone heading (sprint 9): Bricolage Grotesque, extra-bold, sentence case (`.title-chunky`).
 * The claim in the primary ink, its continuation in the tertiary tone, set as
 * one running block of text, with one phrase on a sticker box.
 */
export function SectionHeading({ title, continuation, mark, markTone, className }: SectionHeadingProps) {
  return (
    <h2 className={cx("title-chunky max-w-[22ch] text-section text-balance text-text-primary", className)}>
      <MarkedText text={title} mark={mark} tone={markTone} />
      {continuation ? (
        <span className="text-text-tertiary">
          {" "}
          <MarkedText text={continuation} mark={mark} tone={markTone} />
        </span>
      ) : null}
    </h2>
  );
}
