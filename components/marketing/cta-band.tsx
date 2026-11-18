import { demo } from "@/content/landing";
import { cx } from "@/utils/cx";
import { demoFormClass } from "./demo-form-class";
import { container } from "./frame";
import { InView } from "./in-view";
import { LazyDemoForm } from "./lazy-widgets";

/**
 * Closing call to action with the demo form (sprint 8: "Bring us your
 * messiest reconciliation." and the form itself, in place of a link to
 * /contact). Every "Request a demo" button on the landing page scrolls here.
 *
 * One sunny yellow sticker panel (sprint 9: the dot grid, corner glows and
 * circuit-board hairlines were removed on client feedback). The form's code
 * loads only as it nears the viewport (lazy-widgets.tsx); a same-size
 * placeholder holds its place.
 */
export function CtaBand() {
  return (
    <section id="demo" className="scroll-mt-16 border-t border-separator-border">
      <div className={cx(container, "pt-16 lg:pt-24")}>
        <InView className="relative rounded-3xl border-2 border-text-primary bg-accent-100 p-3 shadow-sticker-lg sm:rounded-[2.5rem] sm:p-8 lg:p-12">
          <div className="relative grid gap-10 text-start lg:grid-cols-12 lg:gap-12">
            <div className="px-3 pt-6 sm:px-0 sm:pt-0 lg:col-span-5 lg:pt-4">
              <h2 className="max-w-[16ch] text-section text-balance text-text-primary">{demo.title}</h2>
              <p className="mt-4 max-w-[44ch] text-headline-regular text-pretty sm:mt-5 sm:text-lead text-text-primary">{demo.text}</p>
            </div>
            <LazyDemoForm
              source="landing"
              className="lg:col-span-7"
              fallback={<div className={demoFormClass} aria-hidden="true" />}
            />
          </div>
        </InView>
      </div>
    </section>
  );
}
