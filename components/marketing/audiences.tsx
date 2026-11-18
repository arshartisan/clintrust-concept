"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { RiFundsLine, RiHospitalLine, RiQuestionLine, RiTeamLine } from "@remixicon/react";
import { audienceCta, audiences } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";
import { ArrowLink } from "./arrow-link";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

const ICONS = { sponsors: RiFundsLine, cros: RiTeamLine, sites: RiHospitalLine } as const;

/**
 * Audience tabs (sprint 8; replaces the three side-by-side columns): Sponsors,
 * CROs and Sites, each with its own questions and one benefit (the figures
 * were dropped in sprint 9 to narrow the content).
 *
 * A hand-built ARIA tabs pattern rather than BoardUI's segmented control: the
 * segmented control rides on react-aria, which the site deliberately keeps out
 * of the first-load bundle (docs/sop/05-performance.md). Arrow keys, Home and
 * End move between tabs; all panels are server-rendered, inactive ones hidden.
 */
export function Audiences() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setActive(index);
    track("audience_tab", { label: audiences[index].id });
    if (focus) tabs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = audiences.length - 1;
    // Read from layout, not useDirection(): that hook pulls react-aria into first load.
    const direction = getComputedStyle(event.currentTarget).direction;
    const forward = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    const back = direction === "rtl" ? "ArrowRight" : "ArrowLeft";
    const next =
      event.key === forward ? (active === last ? 0 : active + 1)
      : event.key === back ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <Section id="audiences">
      <Reveal>
        <SectionHeading title="Sponsor, CRO or site?" continuation="Same record, different headaches." />
      </Reveal>

      <div
        role="tablist"
        aria-label="Who you are"
        onKeyDown={onKeyDown}
        className="mt-12 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-border-button-default bg-background-secondary-default p-1"
      >
        {audiences.map((audience, index) => {
          const Icon = ICONS[audience.id];
          const selected = index === active;
          return (
            <button
              key={audience.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`audience-tab-${audience.id}`}
              aria-selected={selected}
              aria-controls={`audience-panel-${audience.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              className={cx(
                "inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                selected
                  ? "bg-background-primary-default text-body-medium text-text-primary shadow-card"
                  : "text-body-regular text-text-secondary hover:text-text-primary",
              )}
            >
              <Icon className={cx("size-[18px]", selected ? "text-coral-600" : "text-foreground-icon-tertiary")} aria-hidden="true" />
              {audience.label}
            </button>
          );
        })}
      </div>

      {audiences.map((audience, index) => (
        <div
          key={audience.id}
          role="tabpanel"
          id={`audience-panel-${audience.id}`}
          aria-labelledby={`audience-tab-${audience.id}`}
          hidden={index !== active}
          className="audience-panel mt-6 grid gap-3 lg:grid-cols-12"
        >
          {/* Questions: numbered cards that stretch to the benefit card's height. */}
          <ol className="flex flex-col gap-3 lg:col-span-7">
            {audience.questions.map((question, questionIndex) => (
              <li
                key={question}
                className="flex flex-1 flex-col justify-between gap-8 rounded-[2rem] border-2 border-text-primary shadow-sticker bg-coral-50 p-6 sm:p-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span aria-hidden="true" className="text-figure text-text-tertiary tabular-nums">
                    {String(questionIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-primary-default text-foreground-icon-secondary shadow-xs">
                    <RiQuestionLine className="size-5" aria-hidden="true" />
                  </span>
                </span>
                <p className="max-w-[26ch] text-subsection text-balance text-text-primary">{question}</p>
              </li>
            ))}
          </ol>

          {/* Benefit: the same pale teal card as Proof, figure set large. */}
          <div className="@container flex flex-col rounded-[2rem] border-2 border-text-primary shadow-sticker bg-teal-100 p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="inline-flex items-center gap-2 self-start rounded-md bg-background-primary-default/70 px-2.5 py-1.5 text-caption-1-semibold tracking-wider text-text-primary uppercase">
              <span aria-hidden="true" className="size-2.5 rounded-[2px] bg-teal-500" />
              For {audience.label}
            </p>
            <p className="mt-10 mb-10 max-w-[24ch] text-subsection text-balance text-text-primary">{audience.benefit}</p>
            <ArrowLink
              href={audienceCta.href}
              data-track="request_demo_click"
              data-track-location={`audiences-${audience.id}`}
              className="mt-auto"
            >
              {audienceCta.label}
            </ArrowLink>
          </div>
        </div>
      ))}
    </Section>
  );
}
