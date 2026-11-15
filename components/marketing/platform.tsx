import type { ReactNode } from "react";
import { modules, region } from "@/content/landing";
import { cx } from "@/utils/cx";
import { BorderGlow } from "./border-glow";
import { Section, SectionHeading } from "./frame";
import {
  BudgetVisual,
  CaptureVisual,
  FundingVisual,
  PayableVisual,
  PayoutVisual,
  ReconcileVisual,
} from "./iso-visuals";
import { Reveal } from "./reveal";

/**
 * Bento layout. Same order as `modules` in content/landing.ts.
 *   lg (6 columns):  2 + 4  /  3 + 3  /  2 + 4
 *   md (2 columns):  the two wide tiles span both columns; `grid-flow-dense`
 *                    lets the next narrow tile fill the gap beside the first.
 *   below md:        one column.
 * The two wide tiles hold the flow diagrams, which need the width.
 */
const TILES: { visual: ReactNode; span: string }[] = [
  { visual: <BudgetVisual />, span: "lg:col-span-2" },
  { visual: <CaptureVisual />, span: "md:col-span-2 lg:col-span-4" },
  { visual: <ReconcileVisual />, span: "lg:col-span-3" },
  { visual: <PayableVisual />, span: "lg:col-span-3" },
  { visual: <FundingVisual />, span: "lg:col-span-2" },
  { visual: <PayoutVisual />, span: "md:col-span-2 lg:col-span-4" },
];

export function Platform() {
  return (
    <Section id="platform">
      <Reveal>
        <SectionHeading
          title="Six modules, one payment layer."
          continuation="Adopt the whole platform or connect it to the systems you already run."
        />
      </Reveal>

      <ul className="mt-14 grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-6">
        {modules.map((module, index) => (
          <li key={module.name} className={cx("min-w-0", TILES[index].span)}>
            {/* BorderGlow draws the cursor-following edge and switches the
                illustration's animation on while the card is visible. */}
            <BorderGlow
              sweepDelay={index * 140}
              className="h-full rounded-3xl border border-border-button-default bg-background-full"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[inherit]">
                <div className="h-52 border-b border-separator-border bg-background-secondary-default px-4 py-3">
                  {TILES[index].visual}
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-headline-medium text-text-primary">{module.name}</h3>
                  <p className="mt-1.5 max-w-[46ch] text-body-regular text-text-secondary">{module.text}</p>
                </div>
              </div>
            </BorderGlow>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Region() {
  return (
    <Section id="apac">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <SectionHeading title={region.title} continuation={region.continuation} className="max-w-[24ch]" />
        </Reveal>

        <dl className="lg:col-span-6">
          {region.points.map((point) => (
            <div
              key={point.name}
              className="grid gap-1 border-t border-separator-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[200px_1fr] sm:gap-6"
            >
              <dt className="text-headline-medium text-text-primary">{point.name}</dt>
              <dd className="max-w-[48ch] text-body-regular text-text-secondary">{point.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
