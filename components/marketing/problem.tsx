import type { CSSProperties } from "react";
import { problem } from "@/content/landing";
import { cx } from "@/utils/cx";
import { Section, SectionHeading } from "./frame";
import { InView } from "./in-view";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";

/**
 * The problem, as a flow (sprint 3; replaces the comparison table).
 *
 * Top: today's payment chain as a four-step timeline, with a light travelling
 * along it. Below: the same four frictions flow into ClinTrust and come out
 * as two results. Dark band; every colour comes from the `.dark` tokens.
 *
 * Animation is CSS only and runs while the section is on screen.
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Connector lines between a column of `count` items and a single point.
 * The viewBox is unitless and stretches to whatever space the layout gives
 * it; `non-scaling-stroke` keeps the lines 1px and the dashes even.
 */
function Fan({
  count,
  direction,
  tone,
}: {
  count: number;
  direction: "in" | "out";
  tone: "blue" | "accent";
}) {
  const paths = Array.from({ length: count }, (_, index) => {
    const y = ((index + 0.5) / count) * 100;
    return direction === "in"
      ? `M0 ${y} C 55 ${y}, 45 50, 100 50`
      : `M0 50 C 55 50, 45 ${y}, 100 ${y}`;
  });

  return (
    // The wrapper takes the row's full height; the SVG fills the wrapper. An
    // <svg> sized directly by flexbox keeps its own aspect ratio instead.
    <div
      aria-hidden="true"
      className="relative hidden min-w-10 flex-1 self-stretch xl:block"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-0 size-full"
      >
        {paths.map((d) => (
          <g key={d}>
            <path
              d={d}
              className="stroke-border-button-default"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={d}
              className={cx(
                "flow-dash",
                tone === "accent"
                  ? "stroke-accent-400"
                  : "stroke-brand-blue-400",
              )}
              strokeWidth="1.5"
              strokeDasharray="4 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** The connector on phones and tablets, where the diagram stacks vertically. */
function Drop({ tone }: { tone: "blue" | "accent" }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "mx-auto block h-8 w-px xl:hidden",
        tone === "accent" ? "bg-accent-400" : "bg-brand-blue-400",
      )}
    />
  );
}

const panel =
  "rounded-2xl border border-border-button-default bg-background-secondary-default";

export function Problem() {
  return (
    <Section id="problem" className="dark bg-background-full" innerClassName="relative">
      {/* Blue light rising from the bottom edge of the band. It is anchored to
          the section, not the diagram, so it never ends in a hard line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] [background:radial-gradient(75%_100%_at_50%_100%,color-mix(in_srgb,var(--color-brand-blue-600)_45%,transparent),transparent)]"
      />
      <Reveal>
        <SectionHeading
          title={problem.title}
          continuation={problem.continuation}
        />
      </Reveal>

      <InView className="relative mt-14">

        {/* Today's chain: a real sequence, so the steps are numbered. */}
        <ol className="relative grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-[5px] hidden h-px overflow-hidden bg-border-button-default lg:block"
          >
            <span className="chain-pulse block h-px w-1/5 bg-linear-to-r from-transparent via-brand-blue-300 to-transparent" />
          </span>
          {problem.chain.map((step, index) => (
            <li key={step.name} className="relative">
              <span
                aria-hidden="true"
                style={delay(index * 900)}
                className="iso-blink block size-[11px] rounded-full bg-brand-blue-400 ring-4 ring-brand-blue-400/20"
              />
              <p className="mt-5 inline-flex rounded-md border border-border-button-default bg-background-secondary-default px-2 py-0.5 text-caption-1-medium text-text-secondary">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-headline-medium text-text-primary">
                {step.name}
              </h3>
              <p className="mt-1 max-w-[30ch] text-body-regular text-text-secondary">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        {/* What ClinTrust does with it. */}
        <div className="relative mt-14 flex flex-col xl:mt-16 xl:flex-row xl:items-center">
          {/* The inputs and their fan share one row, so the fan is exactly as
              tall as the panel and its lines start at the dots. */}
          <div className="flex flex-col xl:flex-1 xl:flex-row">
          {/* Equal-height cells and no vertical padding on the panel, so each
              item's centre lands exactly on the fan's (i + 0.5) / n stop. */}
          <div className={cx(panel, "relative px-3 xl:w-[260px] xl:shrink-0")}>
            <p className="absolute -top-7 start-1 text-caption-1-medium text-text-secondary">
              {problem.flow.inputsLabel}
            </p>
            <ul className="grid auto-rows-fr">
              {problem.flow.inputs.map((input) => (
                <li
                  key={input}
                  className="relative flex py-1.5 first:pt-3 last:pb-3 xl:first:pt-1.5 xl:last:pb-1.5"
                >
                  <span className="flex-1 rounded-xl border border-border-button-default bg-background-primary-default px-3.5 py-2.5 text-body-medium text-text-primary">
                    {input}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -end-[17px] hidden size-2 -translate-y-1/2 rounded-full bg-brand-blue-400 ring-4 ring-brand-blue-400/20 xl:block"
                  />
                </li>
              ))}
            </ul>
          </div>

          <Fan count={problem.flow.inputs.length} direction="in" tone="blue" />
          </div>
          <Drop tone="blue" />

          <div
            className={cx(
              panel,
              "flex shrink-0 flex-col items-center gap-3 p-4 text-center sm:flex-row sm:justify-center",
            )}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white">
              <LogoMark className="h-7" />
            </span>
            {problem.flow.core.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-5 bg-accent-400 sm:block"
                  />
                ) : null}
                <span className="rounded-xl border border-border-button-default bg-background-primary-default px-3.5 py-2.5 text-body-medium whitespace-nowrap text-text-primary">
                  {item}
                </span>
              </span>
            ))}
          </div>

          <Drop tone="accent" />
          <div className="flex flex-col xl:flex-1 xl:flex-row">
          <Fan
            count={problem.flow.results.length}
            direction="out"
            tone="accent"
          />

          <ul className="grid auto-rows-fr gap-4 xl:w-[270px] xl:shrink-0 xl:gap-0">
            {problem.flow.results.map((result) => (
              <li key={result.who} className="relative flex xl:py-2">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -start-[5px] z-10 hidden size-2 -translate-y-1/2 rounded-full bg-accent-400 ring-4 ring-accent-400/20 xl:block"
                />
                <div className={cx(panel, "flex-1 p-5")}>
                  <p className="text-caption-1-medium text-text-secondary">
                    {result.who}
                  </p>
                  <p className="mt-1 text-subsection text-accent-300">
                    {result.figure}
                  </p>
                  <p className="mt-1 text-body-regular text-text-secondary">
                    {result.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </InView>
    </Section>
  );
}
