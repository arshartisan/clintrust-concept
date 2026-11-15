import type { CSSProperties, ReactNode } from "react";
import { capital } from "@/content/landing";
import { cx } from "@/utils/cx";
import { Section } from "./frame";
import { InView } from "./in-view";
import { Reveal } from "./reveal";

/**
 * The capital argument as three result cards (sprint 5).
 *
 * This replaced the slider calculator. Three figures, each in a card at a
 * different height with its own small chart, over one sweeping curve in the
 * brand colours. Light section: it used to be a dark band.
 *
 * Server component with no script of its own. The curve, the gauge and the
 * bars draw themselves in once, when the section scrolls into view
 * (`.draw-in` and `.grow-in` in styles/brand.css).
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const card =
  "relative rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-lg sm:p-7";

function Card({
  lead,
  rest,
  label,
  figure,
  className,
  children,
}: {
  lead: string;
  rest: string;
  label: string;
  figure: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx(card, className)}>
      <p className="max-w-[30ch] text-body-regular text-pretty text-text-secondary">
        <span className="text-body-medium text-accent-600">{lead}</span> {rest}
      </p>
      <p className="mt-8 text-body-2-regular text-text-secondary">{label}</p>
      <p className="mt-1 text-display-4-medium tracking-tight tabular-nums text-text-primary">{figure}</p>
      {children}
    </div>
  );
}

export function Capital() {
  const [idle, less, released] = capital.cards;

  return (
    <Section id="capital" className="bg-background-secondary-default" innerClassName="relative overflow-hidden">
      <InView once rootMargin="0px 0px -25% 0px">
        {/* The sweep: one soft stroke rising from the cards to the top right. */}
        <svg
          viewBox="0 0 1100 560"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          fill="none"
        >
          <defs>
            <linearGradient id="capital-sweep" gradientUnits="userSpaceOnUse" x1="360" y1="560" x2="1060" y2="20">
              <stop offset="0" style={{ stopColor: "var(--color-accent-400)", stopOpacity: 0.9 }} />
              <stop offset="0.6" style={{ stopColor: "var(--color-brand-blue-400)", stopOpacity: 0.55 }} />
              <stop offset="1" style={{ stopColor: "var(--color-brand-blue-400)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path
            d="M330 560 C 640 470, 990 330, 1070 10"
            pathLength={100}
            stroke="url(#capital-sweep)"
            strokeWidth={30}
            strokeLinecap="round"
            className="draw-in blur-[7px]"
          />
        </svg>

        <div className="relative grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="max-w-[20ch] text-section text-balance text-text-primary">
              {capital.title}
              <span className="text-text-tertiary"> {capital.continuation}</span>
            </h2>
          </Reveal>
          <p className="max-w-[30ch] text-lead text-pretty text-text-secondary lg:col-span-4 lg:col-start-9 lg:pt-16">
            <span className="text-text-primary">{capital.aside.lead}</span> {capital.aside.rest}
          </p>
        </div>

        {/* Cards step down from left to right on desktop; stacked on phones. */}
        <div className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:items-start">
          <Card {...idle}>
            {/* Where today's escrow sits on a 0 to 30% scale of the portfolio. */}
            <div className="mt-6" aria-hidden="true">
              <div className="relative h-7">
                <span className="absolute inset-x-0 top-1/2 h-px bg-border-button-default" />
                <span className="grow-in absolute top-0 left-[50%] h-full w-[33%] origin-left rounded-sm bg-linear-to-r from-accent-100 to-accent-300" />
                <span className="absolute top-0 left-[66%] h-full w-1 rounded-full bg-accent-500" />
              </div>
              <div className="mt-2 flex justify-between text-caption-2-medium text-text-secondary">
                <span>0%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
          </Card>

          <Card {...less}>
            {/* Three quarters of a half-circle gauge. */}
            <svg viewBox="0 0 200 118" className="mx-auto mt-6 w-full max-w-[260px]" aria-hidden="true" fill="none">
              <path
                d="M20 110 A80 80 0 0 1 180 110"
                className="stroke-background-tertiary-default"
                strokeWidth={14}
                strokeLinecap="round"
              />
              <path
                d="M20 110 A80 80 0 0 1 156.6 53.4"
                pathLength={100}
                className="draw-in stroke-accent-400"
                style={delay(250)}
                strokeWidth={14}
                strokeLinecap="round"
              />
            </svg>
          </Card>

          <Card {...released} className="lg:mt-24">
            {/* Escrow today against the buffer that replaces it. */}
            <div className="mt-6 flex flex-col gap-3">
              {capital.bars.map((bar, index) => (
                <div key={bar.label}>
                  <div className="flex items-baseline justify-between gap-4 text-body-2-regular">
                    <p className="text-text-secondary">{bar.label}</p>
                    <p className="tabular-nums text-text-primary">{bar.value}</p>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background-tertiary-default" aria-hidden="true">
                    <div
                      style={{ width: `${bar.percent}%`, ...delay(300 + index * 200) }}
                      className={cx(
                        "grow-in h-full origin-left rounded-full",
                        index === 0 ? "bg-foreground-icon-tertiary" : "bg-accent-400",
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p className="relative mt-8 max-w-[76ch] text-caption-1-regular text-text-secondary">{capital.note}</p>
      </InView>
    </Section>
  );
}
