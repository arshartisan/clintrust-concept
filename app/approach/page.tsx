import type { Metadata } from "next";
import { RiPlayCircleLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { CommandCenter } from "@/components/marketing/command-center";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/frame";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SettlementLedger } from "@/components/marketing/settlement-ledger";
import { StatMeters } from "@/components/marketing/stat-meters";
import { VideoPlayer } from "@/components/marketing/video-player";
import { approach } from "@/content/pages";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
  title: "Our approach",
  description: approach.hero.lead,
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        {...approach.hero}
        actions={approach.roles.map((role) => (
          <ButtonLink key={role.id} href={`#${role.id}`} variant="secondary">
            {role.label}
          </ButtonLink>
        ))}
      />

      {/* Platform overview: the video gets the full width of the column. */}
      <Section id="overview" className="border-t-0" innerClassName="pt-0 lg:pt-0">
        <figure>
          {/* Intro above the player, with room to breathe; the video itself
              runs the full width of the column. */}
          <figcaption className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
            <span className="flex items-center gap-2 text-body-medium text-accent-600 lg:col-span-4">
              <RiPlayCircleLine aria-hidden="true" className="size-5" />
              {approach.video.eyebrow}
            </span>
            <span className="max-w-[60ch] text-lead text-pretty text-text-secondary lg:col-span-8">
              {approach.video.caption}
            </span>
          </figcaption>
          <VideoPlayer
            className="mt-10"
            sources={approach.video.sources}
            poster={approach.video.poster}
            label={approach.video.label}
          />
        </figure>
      </Section>

      {approach.roles.map((role, index) => (
        <Section key={role.id} id={role.id} className={index === 1 ? "bg-background-secondary-default" : undefined}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-body-medium text-accent-600">{role.label}</p>
              <Reveal className="mt-3">
                <SectionHeading title={role.title} className="max-w-[20ch]" />
              </Reveal>
            </div>
            <p className="max-w-[56ch] text-lead text-text-secondary lg:col-span-6 lg:pt-9">{role.text}</p>
          </div>

          {role.stats.length > 0 ? <StatMeters stats={role.stats} /> : null}

          <h3 className="mt-16 text-subsection text-text-primary">{role.experienceTitle}</h3>

          {role.id === "sites" ? (
            // Sites: a numbered list beside the site's own ledger.
            <div className="mt-8 grid gap-12 lg:grid-cols-12">
              <ol className="lg:col-span-7">
                {role.features.map((feature, index) => (
                  <li
                    key={feature.name}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-t border-separator-border py-6 first:border-t-0 first:pt-0"
                  >
                    <span aria-hidden="true" className="text-title-3-semibold tabular-nums text-accent-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-headline-medium text-text-primary">{feature.name}</p>
                      <p className="mt-1.5 max-w-[48ch] text-body-regular text-text-secondary">{feature.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="lg:col-span-5">
                <SettlementLedger />
              </div>
            </div>
          ) : (
            <div className={cx("mt-8 grid gap-6", role.id === "sponsors" && "lg:grid-cols-12 lg:items-start")}>
              <ul
                className={cx(
                  "grid gap-4 sm:grid-cols-2",
                  role.id === "sponsors" ? "lg:col-span-7" : "lg:grid-cols-3",
                )}
              >
                {role.features.map((feature) => (
                  <li
                    key={feature.name}
                    className="rounded-3xl border-2 border-text-primary shadow-sticker bg-background-full p-6"
                  >
                    {"icon" in feature ? (
                      <span
                        aria-hidden="true"
                        className="flex size-10 items-center justify-center rounded-xl border border-accent-200 bg-accent-50 text-accent-600"
                      >
                        <feature.icon className="size-5" />
                      </span>
                    ) : null}
                    <p className="mt-4 text-headline-medium text-text-primary">{feature.name}</p>
                    <p className="mt-1.5 text-body-regular text-text-secondary">{feature.text}</p>
                  </li>
                ))}
              </ul>
              {/* The sponsor's view of the same record. */}
              {role.id === "sponsors" ? (
                <div className="lg:sticky lg:top-24 lg:col-span-5">
                  <CommandCenter />
                </div>
              ) : null}
            </div>
          )}
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
