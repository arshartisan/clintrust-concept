import { ButtonLink } from "@/components/base/buttons/button";
import { demo } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container } from "./frame";

/**
 * Closing call to action: one dark, rounded panel with a single action
 * (sprint 3). The form itself lives on /contact, so no form code is loaded
 * on pages that only show this panel.
 */
export function CtaBand() {
  return (
    <section className="border-t border-separator-border">
      <div className={cx(container, "pt-16 lg:pt-24")}>
        <div className="dark relative overflow-hidden rounded-[2rem] bg-background-full px-6 py-20 text-center sm:rounded-[2.5rem] sm:py-28">
          {/* Light falling into the panel from its top edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-3/4 [background:radial-gradient(75%_100%_at_50%_0%,color-mix(in_srgb,var(--color-brand-blue-500)_60%,transparent),transparent)]"
          />
          <div className="relative flex flex-col items-center">
            <h2 className="max-w-[18ch] text-section text-balance text-text-primary">{demo.title}</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-pretty text-text-secondary">{demo.text}</p>
            <ButtonLink href="/contact" className="mt-9">
              Request a demo
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
