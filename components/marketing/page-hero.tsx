import type { ReactNode } from "react";
import { cx } from "@/utils/cx";
import { container } from "./frame";

interface PageHeroProps {
  /** Small accent label above the title. */
  eyebrow?: string;
  title: string;
  lead: string;
  /** Under the lead, e.g. jump links to the page's sections. */
  actions?: ReactNode;
  /** A second column beside the text from `lg` up (e.g. the approach video). */
  aside?: ReactNode;
  /** One size up on the title (text-hero-lg), for a page with a scene beside it. */
  large?: boolean;
}

/** Opening block for inner pages: left-aligned title and lead inside the page rails. */
export function PageHero({ eyebrow, title, lead, actions, aside, large = false }: PageHeroProps) {
  return (
    <section>
      <div
        className={cx(
          container,
          "pt-16 pb-20 lg:pt-24 lg:pb-28",
          aside && "grid items-center gap-12 lg:grid-cols-12 lg:gap-10",
        )}
      >
        <div className={cx(aside && "lg:col-span-6")}>
          {eyebrow ? <p className="mb-4 text-body-medium text-accent-600">{eyebrow}</p> : null}
          {/* hero-settle, not a fade: this is the page's LCP. */}
          <h1 className={cx("hero-settle text-balance text-text-primary", large ? "max-w-[16ch] text-hero-lg" : "max-w-[20ch] text-hero")}>{title}</h1>
          <p className="hero-settle mt-6 max-w-[62ch] text-lead text-pretty text-text-secondary">{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-6">{aside}</div> : null}
      </div>
    </section>
  );
}
