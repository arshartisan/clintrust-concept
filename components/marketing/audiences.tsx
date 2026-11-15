import { RiCheckLine, RiFundsLine, RiHospitalLine, RiTeamLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { audiences } from "@/content/landing";
import { cx } from "@/utils/cx";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

const ICONS = { sponsors: RiFundsLine, cros: RiTeamLine, sites: RiHospitalLine } as const;

type Audience = (typeof audiences)[number];

/**
 * Three audiences side by side inside one tinted panel (sprint 3; replaces
 * the Sponsors / CROs / Sites switch). The first column, the buyer, sits
 * directly on the tint with the primary action; the other two share a raised
 * white card. Everything is visible at once, so nothing is hidden behind a
 * control and the whole section is server-rendered.
 */
export function Audiences() {
  const [lead, ...rest] = audiences;

  return (
    <Section id="audiences">
      <Reveal>
        <SectionHeading
          title="One record, three points of view."
          continuation="Each party sees the same data, shaped for the decisions they make."
        />
      </Reveal>

      <div className="mt-14 rounded-[2rem] border border-border-button-default bg-background-secondary-default p-2 sm:p-3">
        <div className="grid gap-2 lg:grid-cols-3 lg:gap-0">
          <Column audience={lead} primary className="p-6 sm:p-7" />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border-button-default bg-separator-border shadow-lg sm:grid-cols-2 lg:col-span-2">
            {rest.map((audience) => (
              <Column key={audience.id} audience={audience} className="bg-background-primary-default p-6 sm:p-7" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Column({ audience, primary, className }: { audience: Audience; primary?: boolean; className?: string }) {
  const Icon = ICONS[audience.id];

  return (
    <div className={cx("flex flex-col", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl border border-border-button-default bg-background-primary-default shadow-card">
          <Icon className="size-5 text-foreground-icon-primary" aria-hidden="true" />
        </span>
        <h3 className="text-title-3-medium text-text-primary">{audience.label}</h3>
      </div>

      <p className="mt-7 text-display-4-medium tracking-tight text-text-primary">{audience.stat}</p>
      <p className="text-body-medium text-text-secondary">{audience.statLabel}</p>

      <p className="mt-4 max-w-[36ch] text-body-regular text-text-secondary">{audience.summary}</p>

      <ul className="mt-7 mb-8 flex flex-col gap-3">
        {audience.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-body-medium text-text-primary">
            <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
              <RiCheckLine className="size-3" aria-hidden="true" />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={audience.href}
        variant={primary ? "primary" : "secondary"}
        className={cx("mt-auto", primary ? "w-full" : "self-start")}
      >
        {audience.cta}
      </ButtonLink>
    </div>
  );
}
