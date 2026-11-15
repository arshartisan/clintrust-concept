import { cx } from "@/utils/cx";
import { container } from "./frame";

/** Opening block for inner pages: left-aligned title and lead inside the page rails. */
export function PageHero({ title, lead }: { title: string; lead: string }) {
  return (
    <section>
      <div className={cx(container, "pt-16 pb-20 lg:pt-24 lg:pb-28")}>
        {/* hero-settle, not a fade: this is the page's LCP. */}
        <h1 className="hero-settle max-w-[20ch] text-hero text-balance text-text-primary">{title}</h1>
        <p className="hero-settle mt-6 max-w-[62ch] text-lead text-pretty text-text-secondary">{lead}</p>
      </div>
    </section>
  );
}
