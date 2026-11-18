import type { CSSProperties, ReactNode } from "react";
import { RiCalendarCheckLine, RiCheckLine, RiStethoscopeLine, RiTestTubeLine } from "@remixicon/react";
import { steps } from "@/content/landing";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

/**
 * Record, Reconcile, Pay as three cards (sprint 4; restyled in sprint 9 after
 * the client's Moxie card reference).
 *
 * Each card is a bold colour block: a small "01" number, the step's animated
 * scene on a white panel, the step name in chunky caps and one line. A
 * scalloped badge with one word overhangs the top corner, tilted, and pops on
 * as the card scrolls in. The steps are a real sequence, so they are numbered.
 *
 * A server component: no script of its own. The scenes are markup plus the
 * `how-*` classes in styles/brand.css, switched on by the card's InView wrapper
 * while it is on screen; the badge uses `.step-badge`.
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const SCENES = [RecordScene, ReconcileScene, PayScene];

/**
 * Card fill, text colours and badge colour per step. The dark card uses the
 * ink as its fill with white text (not `.dark`, so the white scene panel keeps
 * its light tokens).
 */
const CARD_STYLES = [
  { card: "bg-accent-300", number: "text-text-primary", title: "text-text-primary", text: "text-text-primary", badge: "fill-coral-500", badgeText: "text-text-white" },
  { card: "bg-text-primary", number: "text-text-white", title: "text-text-white", text: "text-navy-300", badge: "fill-accent-300", badgeText: "text-text-primary" },
  { card: "bg-teal-300", number: "text-text-primary", title: "text-text-primary", text: "text-text-primary", badge: "fill-coral-500", badgeText: "text-text-white" },
] as const;

/** A scalloped disc: arcs bulging out between points on a circle. */
const SCALLOP = (() => {
  const bumps = 14;
  const radius = 44;
  const point = (index: number) => {
    const angle = (Math.PI * 2 * index) / bumps - Math.PI / 2;
    return [50 + radius * Math.cos(angle), 50 + radius * Math.sin(angle)].map((n) => n.toFixed(2)).join(" ");
  };
  const bump = (radius * Math.sin(Math.PI / bumps)) * 1.08;
  let d = `M${point(0)}`;
  for (let index = 1; index <= bumps; index++) d += ` A${bump.toFixed(2)} ${bump.toFixed(2)} 0 0 1 ${point(index)}`;
  return `${d} Z`;
})();

function StepBadge({ label, fill, text, index }: { label: string; fill: string; text: string; index: number }) {
  return (
    <span
      aria-hidden="true"
      style={delay(300 + index * 150)}
      className="step-badge absolute -end-2 -top-7 flex size-24 sm:-end-4 items-center justify-center sm:size-28"
    >
      <svg viewBox="0 0 100 100" className="step-badge-disc absolute inset-0 size-full overflow-visible">
        <path d={SCALLOP} className={cx("stroke-text-primary", fill)} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <span className={cx("relative -rotate-12 font-display text-title-3-bold sm:text-title-2-bold", text)}>{label}</span>
    </span>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          title="Record, reconcile, pay."
          continuation="Three plain steps. One record. Nothing to chase."
          mark="chase"
          markTone="coral"
        />
      </Reveal>

      {/* pt: room for the badges that overhang the cards' top edge. */}
      <ol className="mt-10 grid gap-x-5 gap-y-12 pt-6 xl:grid-cols-3">
        {steps.map((step, index) => {
          const Scene = SCENES[index];
          const style = CARD_STYLES[index % CARD_STYLES.length];
          return (
            <li key={step.id} className="scroll-pop min-w-0">
              <InView
                className={cx(
                  "relative flex h-full flex-col rounded-[2rem] border-2 border-text-primary p-6 shadow-sticker-lg sm:p-7",
                  // Hover presses the card down into its shadow, as if tapped.
                  "transition-[translate,box-shadow] duration-150 ease-out hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none motion-reduce:transition-none",
                  style.card,
                )}
              >
                <StepBadge label={step.badge} fill={style.badge} text={style.badgeText} index={index} />

                <p className={cx("text-body-medium tabular-nums", style.number)}>
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="relative mt-5 h-52 overflow-hidden rounded-2xl border-2 border-text-primary bg-background-primary-default">
                  <Scene />
                </div>

                <h3 className={cx("title-chunky mt-7 text-title-1-bold", style.title)}>{step.name}</h3>
                <p className={cx("mt-3 max-w-[38ch] text-lead text-pretty", style.text)}>{step.text}</p>
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
        <div className="absolute inset-0 rounded-full border-[26px] border-accent-100 [mask-image:linear-gradient(to_bottom,black_12%,transparent_36%)]" />
        {badges.map(({ Icon, left, top }) => (
          <span
            key={left}
            style={{ left: left - 22, top: top - 22 }}
            className="absolute flex size-11 items-center justify-center rounded-full border-2 border-text-primary bg-accent-300 text-text-primary ring-4 ring-accent-100"
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
            className={cx("how-row-tint absolute inset-0", row.flagged ? "bg-coral-50" : "bg-teal-100")}
          />
          <span
            className={cx(
              "relative flex size-6 shrink-0 items-center justify-center rounded-full",
              row.flagged ? "bg-coral-300 text-text-primary" : "bg-teal-300 text-text-primary",
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
      <span aria-hidden="true" className="h-6 w-px bg-teal-300" />
      <ul className="flex items-center gap-1.5 rounded-full bg-teal-100 p-1.5" aria-label="Paid in the site's currency">
        {currencies.map((code) =>
          code === "SGD" ? (
            <li key={code} className="relative mx-0.5 flex size-12 items-center justify-center">
              <span aria-hidden="true" className="how-ring absolute inset-0 rounded-full bg-teal-400" />
              <span className="relative flex size-12 items-center justify-center rounded-full bg-teal-600 text-caption-1-semibold text-text-white shadow-md">
                {code}
              </span>
            </li>
          ) : (
            <li
              key={code}
              className="flex size-9 items-center justify-center rounded-full bg-teal-200 text-caption-2-semibold text-teal-800"
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
