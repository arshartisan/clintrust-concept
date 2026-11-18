"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { RiArrowRightLine, RiFundsLine, RiHospitalLine, RiQuestionLine, RiTeamLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { audiences } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

const ICONS = { sponsors: RiFundsLine, cros: RiTeamLine, sites: RiHospitalLine } as const;

/**
 * Audience tabs (sprint 8; replaces the three side-by-side columns): Sponsors,
 * CROs and Sites, each with its own questions, one benefit and one figure.
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
              <Icon className={cx("size-[18px]", selected ? "text-accent-600" : "text-foreground-icon-tertiary")} aria-hidden="true" />
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
          className="audience-panel mt-6 grid gap-4 lg:grid-cols-12"
        >
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {audience.questions.map((question) => (
              <li
                key={question}
                className="flex items-start gap-4 rounded-3xl border border-border-button-default bg-background-primary-default p-6 sm:p-7"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                  <RiQuestionLine className="size-5" aria-hidden="true" />
                </span>
                <p className="text-title-3-medium text-balance text-text-primary">{question}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col rounded-3xl border border-accent-200 bg-accent-50 p-6 sm:p-7 lg:col-span-5">
            <p className="text-display-4-medium tracking-tight text-text-primary">{audience.stat}</p>
            <p className="text-body-medium text-text-secondary">{audience.statLabel}</p>
            <p className="mt-6 mb-8 max-w-[44ch] text-headline-regular text-pretty text-text-primary">{audience.benefit}</p>
            <ButtonLink href={audience.href} variant="secondary" trailingIcon={RiArrowRightLine} className="mt-auto self-start">
              {audience.cta}
            </ButtonLink>
          </div>
        </div>
      ))}
    </Section>
  );
}
