import type { CSSProperties, ReactNode } from "react";
import { RiCalendarCheckLine, RiCheckLine, RiStethoscopeLine, RiTestTubeLine } from "@remixicon/react";
import { steps } from "@/content/landing";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

/**
 * Record, Reconcile, Pay as three animated cards (sprint 4).
 *
 * This replaced the scroll-pinned step list from sprint 3. Each card has a
 * step label, a small animated scene, then the step's name and one line.
 * The steps are a real sequence, so they are numbered.
 *
 * A server component: no script of its own. The scenes are markup plus the
 * `how-*` classes in styles/brand.css, switched on by the card's InView wrapper
 * while it is on screen.
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const SCENES = [RecordScene, ReconcileScene, PayScene];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          title="Record, reconcile, pay."
          continuation="Three plain steps. One record. Nothing to chase."
        />
      </Reveal>

      <ol className="mt-14 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const Scene = SCENES[index];
          return (
            <li key={step.id} className="min-w-0">
              <InView className="flex h-full flex-col rounded-3xl border-2 border-text-primary shadow-sticker bg-background-primary-default p-5">
                <div className="flex items-center justify-between">
                  <p className="text-body-2-medium text-text-secondary">Step {index + 1}</p>
                  {/* Three ticks; the lit ones show how far along the chain this step is. */}
                  <span className="flex gap-0.5" aria-hidden="true">
                    {steps.map((other, tick) => (
                      <span
                        key={other.id}
                        className={cx(
                          "h-3 w-0.5 rounded-full",
                          tick <= index ? "bg-accent-400" : "bg-background-tertiary-default",
                        )}
                      />
                    ))}
                  </span>
                </div>

                <div className="relative mt-4 h-56 overflow-hidden rounded-2xl bg-background-secondary-default">
                  <Scene />
                </div>

                <h3 className="mt-6 text-title-2-medium text-text-primary">{step.name}</h3>
                <p className="mt-2 mb-2 max-w-[38ch] text-body-regular text-pretty text-text-secondary">{step.text}</p>
              </InView>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scenes                                                                     */
/* -------------------------------------------------------------------------- */

/** Record: completed work arriving along an arc. Blue = recorded, not yet verified. */
function RecordScene() {
  // Badge centres on the ring: 420px circle, 197px to the middle of its band.
  const badges: { Icon: typeof RiStethoscopeLine; left: number; top: number }[] = [
    { Icon: RiCalendarCheckLine, left: 106, top: 43 },
    { Icon: RiStethoscopeLine, left: 210, top: 13 },
    { Icon: RiTestTubeLine, left: 314, top: 43 },
  ];

  return (
    <>
      <div className="how-sway absolute top-9 left-1/2 -ml-[210px] size-[420px]" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border-[26px] border-brand-blue-100 [mask-image:linear-gradient(to_bottom,black_12%,transparent_36%)]" />
        {badges.map(({ Icon, left, top }) => (
          <span
            key={left}
            style={{ left: left - 22, top: top - 22 }}
            className="absolute flex size-11 items-center justify-center rounded-full bg-brand-blue-500 text-text-white shadow-md ring-4 ring-brand-blue-200"
          >
            <Icon className="size-5" />
          </span>
        ))}
      </div>
      <Caption>6 procedures logged</Caption>
    </>
  );
}

/** Reconcile: each line is matched to the budget in turn; one needs a person. */
function ReconcileScene() {
  const rows = [
    { item: "Cycle visit", score: "99% match", flagged: false },
    { item: "PK sampling", score: "97% match", flagged: false },
    { item: "CT scan", score: "Needs review", flagged: true },
  ];

  return (
    <ul className="flex h-full flex-col justify-center gap-2.5 px-4 xl:px-7">
      {rows.map((row, index) => (
        <li
          key={row.item}
          style={delay(index * 2000)}
          className="how-row relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-border-button-default bg-background-primary-default px-3 py-2.5 shadow-card"
        >
          {/* The focus tint, faded in while this row has its turn. */}
          <span
            aria-hidden="true"
            style={delay(index * 2000)}
            className={cx("how-row-tint absolute inset-0", row.flagged ? "bg-status-yellow-background" : "bg-accent-100")}
          />
          <span
            className={cx(
              "relative flex size-6 shrink-0 items-center justify-center rounded-full",
              row.flagged ? "bg-chart-8 text-text-primary" : "bg-accent-300 text-text-primary",
            )}
            aria-hidden="true"
          >
            {row.flagged ? <span className="text-caption-1-bold">!</span> : <RiCheckLine className="size-3.5" />}
          </span>
          <span className="relative min-w-0 flex-1 text-body-medium text-text-primary">{row.item}</span>
          <span className="relative text-caption-1-medium whitespace-nowrap text-text-secondary">{row.score}</span>
        </li>
      ))}
    </ul>
  );
}

/** Pay: after the 5-day review (T+5) the final invoice goes out, paid in the site's own currency. */
function PayScene() {
  const currencies = ["USD", "KRW", "SGD", "AUD", "THB"];

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-[210px] max-w-[80%] rounded-xl border border-border-button-default bg-background-primary-default px-4 py-3 shadow-md">
        <p className="text-body-medium text-text-primary">Final invoice sent</p>
        <p className="mt-0.5 flex items-center justify-between gap-3 text-body-2-regular text-text-secondary">
          <span className="tabular-nums">S$3,611.03</span>
          <span>T+5</span>
        </p>
      </div>
      <span aria-hidden="true" className="h-6 w-px bg-accent-300" />
      <ul className="flex items-center gap-1.5 rounded-full bg-accent-100 p-1.5" aria-label="Paid in the site's currency">
        {currencies.map((code) =>
          code === "SGD" ? (
            <li key={code} className="relative mx-0.5 flex size-12 items-center justify-center">
              <span aria-hidden="true" className="how-ring absolute inset-0 rounded-full bg-accent-400" />
              <span className="relative flex size-12 items-center justify-center rounded-full bg-accent-600 text-caption-1-semibold text-text-white shadow-md">
                {code}
              </span>
            </li>
          ) : (
            <li
              key={code}
              className="flex size-9 items-center justify-center rounded-full bg-accent-200 text-caption-2-semibold text-accent-800"
            >
              {code}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="absolute inset-x-0 bottom-6 text-center text-body-medium text-text-secondary">{children}</p>
  );
}
