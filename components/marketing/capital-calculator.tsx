import { capital } from "@/content/landing";
import { Section, SectionHeading } from "./frame";
import { LazyCapitalWidget } from "./lazy-widgets";
import { Reveal } from "./reveal";

// Must match `capitalCardClass` in capital-widget.tsx. Repeated here rather
// than imported so this server component does not pull the widget's chunk.
const placeholderClass =
  "min-h-[434px] sm:min-h-[459px] lg:min-h-[474px] rounded-3xl border border-border-button-default bg-background-secondary-default p-6 sm:p-8";

/**
 * The one dark band on the page. `dark` on the section flips every BoardUI
 * token inside it to the navy palette from styles/brand.css; nothing in here
 * hardcodes a dark colour. The heading is server-rendered; the interactive
 * model loads on demand.
 */
export function CapitalCalculator() {
  return (
    <Section id="capital" className="dark bg-background-full">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading title={capital.title} continuation={capital.continuation} className="max-w-[20ch]" />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <LazyCapitalWidget fallback={<div className={placeholderClass} aria-hidden="true" />} />
          <p className="mt-4 max-w-[70ch] text-caption-1-regular text-text-secondary">{capital.note}</p>
        </div>
      </div>
    </Section>
  );
}
