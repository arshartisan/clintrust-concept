"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { audienceCta, audienceLabels, audiences } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";
import { Section, SectionHeading } from "./frame";
import { InView } from "./in-view";
import { Reveal } from "./reveal";

/**
 * One light tint per role (client: lighter panel colours). The panel and its
 * active tab share `panel`; an inactive tab previews its role in `tab`, a step
 * deeper. `accent` colours the eyebrow and the numbers (AA on the tint).
 */
const TONES = [
  { panel: "bg-accent-100", tab: "bg-accent-200", hover: "hover:bg-accent-100", accent: "text-accent-700" },
  { panel: "bg-teal-100", tab: "bg-teal-200", hover: "hover:bg-teal-100", accent: "text-teal-700" },
  { panel: "bg-coral-100", tab: "bg-coral-200", hover: "hover:bg-coral-100", accent: "text-coral-700" },
] as const;

const number = (index: number) => String(index + 1).padStart(2, "0");

/** The panel's number in its top corner, with a ring of text turning round it. */
function RingBadge({ id, value }: { id: string; value: string }) {
  return (
    <InView className="absolute end-8 top-8 size-28 max-sm:hidden lg:size-32">
      <span aria-hidden="true" className="absolute inset-0 rounded-full border-2 border-text-primary bg-background-primary-default" />
      <svg viewBox="0 0 200 200" className="ring-spin absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <path id={`ring-${id}`} d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
        </defs>
        <text className="fill-text-primary font-display text-[19px] font-bold tracking-[0.2em] uppercase">
          <textPath href={`#ring-${id}`} textLength="455" lengthAdjust="spacing">
            {audienceLabels.ring}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full border-2 border-text-primary bg-accent-300 font-display text-title-3-bold text-text-primary">
        {value}
      </span>
    </InView>
  );
}

/**
 * Audience tabs (sprint 8; replaces the three side-by-side columns): Sponsors,
 * CROs and Sites, each with its own questions and one benefit (the figures
 * were dropped in sprint 9 to narrow the content).
 *
 * Sprint 9 layout, after the client's Moxie curriculum reference: folder tabs
 * ("01 Sponsors") sitting on one big panel, lightly tinted per role (TONES);
 * the active tab takes the panel's tint so it reads as the front folder. Inside: an eyebrow, the
 * benefit as a chunky title, the questions as a numbered list, a yellow
 * action on the start side, the questions as a numbered list on the end
 * side, and a turning "role by role" badge in the top corner. (A photo was
 * tried there and removed at the client's request.)
 *
 * A hand-built ARIA tabs pattern rather than BoardUI's segmented control: the
 * segmented control rides on react-aria, which the site deliberately keeps out
 * of the first-load bundle (docs/sop/05-performance.md). Arrow keys, Home and
 * End move between tabs; all panels are server-rendered, inactive ones hidden.
 *
 * Switching is animated (sprint 10): the tint lives on one persistent panel
 * box and cross-fades; the tabs are all one height and the inactive ones
 * slide down behind the panel (translate only); the new panel's content
 * settles in, staggered (`.audience-in`, styles/brand.css).
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
        <SectionHeading title="Sponsor, CRO or site?" continuation="Same record, different headaches." mark="headaches" markTone="teal" />
      </Reveal>

      {/* Folder tabs. The row overlaps the panel's top border by its 2px
          (-mb-0.5). Every tab is the same height; inactive tabs sit lower,
          tucked behind the panel (z-0 under the panel's z-10), so they look
          shorter. The active tab rises above the panel (z-20) with no bottom
          border, and its fill covers the panel's border so it joins the
          panel. Only translate and colour change, so the switch is smooth.
          The first tab is flush with the panel's start edge, whose top corner
          is square. */}
      <div
        role="tablist"
        aria-label="Who you are"
        onKeyDown={onKeyDown}
        className="relative mt-12 -mb-0.5 flex max-w-full items-end gap-1 sm:gap-2"
      >
        {audiences.map((audience, index) => {
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
                "relative inline-flex h-13 shrink-0 cursor-pointer items-center gap-2 rounded-t-2xl border-2 border-text-primary px-3 text-body-medium text-text-primary transition-[translate,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-15 sm:gap-2.5 sm:px-5 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                selected
                  ? cx(TONES[index % TONES.length].panel, "z-20 border-b-0")
                  : cx(TONES[index % TONES.length].tab, "z-0 translate-y-2 hover:translate-y-1", TONES[index % TONES.length].hover),
              )}
            >
              <span className={cx("font-display text-body-semibold tabular-nums", selected ? TONES[index % TONES.length].accent : "text-text-primary")}>
                {number(index)}
              </span>
              {audience.label}
            </button>
          );
        })}
      </div>

      <div
        className={cx(
          "relative z-10 rounded-[2rem] rounded-ss-none border-2 border-text-primary shadow-sticker-lg transition-colors duration-300 ease-out motion-reduce:transition-none",
          TONES[active % TONES.length].panel,
        )}
      >
        {audiences.map((audience, index) => (
          <div
            key={audience.id}
            role="tabpanel"
            id={`audience-panel-${audience.id}`}
            aria-labelledby={`audience-tab-${audience.id}`}
            hidden={index !== active}
            className="audience-panel relative grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12"
          >
            <div className="flex flex-col">
              <p className={cx("text-caption-1-semibold tracking-wider uppercase", TONES[index % TONES.length].accent)}>
                {audienceLabels.eyebrow} {audience.label} · {number(index)}
              </p>
              <h3 className="title-chunky mt-5 max-w-[16ch] text-section text-balance text-text-primary sm:pe-28 lg:pe-0">{audience.benefit}</h3>
              <ButtonLink
                href={audienceCta.href}
                trailingIcon={RiArrowRightUpLine}
                className="mt-8 self-start max-lg:hidden"
                data-track="request_demo_click"
                data-track-location={`audiences-${audience.id}`}
              >
                {audienceCta.label}
              </ButtonLink>
            </div>

            <div className="flex flex-col lg:justify-end lg:pt-32">
              {/* The questions, as a numbered list with hairlines between. */}
              <ol className="border-b border-text-primary/15">
                {audience.questions.map((question, questionIndex) => (
                  <li key={question} className="flex gap-5 border-t border-text-primary/15 py-5">
                    <span aria-hidden="true" className={cx("font-display text-body-semibold tabular-nums", TONES[index % TONES.length].accent)}>
                      {number(questionIndex)}
                    </span>
                    <span className="text-lead text-text-primary">{question}</span>
                  </li>
                ))}
              </ol>
              {/* Phones and tablets: the action after the questions. */}
              <ButtonLink
                href={audienceCta.href}
                trailingIcon={RiArrowRightUpLine}
                className="mt-8 self-start lg:hidden"
                data-track="request_demo_click"
                data-track-location={`audiences-${audience.id}`}
              >
                {audienceCta.label}
              </ButtonLink>
            </div>

            <RingBadge id={audience.id} value={number(index)} />
          </div>
        ))}
      </div>
    </Section>
  );
}
