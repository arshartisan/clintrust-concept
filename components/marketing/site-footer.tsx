import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { brand, demoCta, footer } from "@/content/landing";
import { cx } from "@/utils/cx";
import { CoinDoodle, PaidStamp, SparkleDoodle, SquiggleDoodle, TickDoodle } from "./doodles";
import { container } from "./frame";
import { InView } from "./in-view";
import { LogoMark } from "./logo";

/** A small white pill over each column (the reference's "office", "contact"). */
function Label({ children }: { children: ReactNode }) {
  return (
    <h2 className="inline-flex rounded-full border-2 border-text-primary bg-background-primary-default px-3 py-0.5 text-caption-1-semibold text-text-primary">
      {children}
    </h2>
  );
}

// Big display links. The label rolls up on hover (.roll in brand.css).
const bigLink =
  "roll-host inline-flex min-h-7 items-center rounded-md font-display text-title-2-bold text-text-white outline-none focus-visible:ring-2 focus-visible:ring-text-white sm:text-title-1-bold";

/** A sticker on the wordmark: enters as the footer scrolls in, then bobs. */
function Sticker({ className, index, children }: { className: string; index: number; children: ReactNode }) {
  return (
    <span className={cx("ft-sticker absolute", className)} style={{ "--i": index } as CSSProperties}>
      <span className="ft-bob block" style={{ animationDelay: `${index * -1.3}s` }}>
        {children}
      </span>
    </span>
  );
}

/** The footer's starburst, smaller than the hero's. */
function Burst({ label }: { label: string }) {
  const points = Array.from({ length: 24 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 24 - Math.PI / 2;
    const radius = index % 2 === 0 ? 50 : 40;
    return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
  return (
    <span className="relative flex size-20 -rotate-12 items-center justify-center sm:size-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <polygon points={points} className="fill-coral-500 stroke-text-primary" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <span className="relative font-display text-caption-1-semibold text-text-white sm:text-body-semibold">{label}</span>
    </span>
  );
}

/**
 * Footer (sprint 9, after the client's "truus" footer reference): one bold
 * rounded panel in the logo's blue. Small white pill labels sit over big
 * display links; the bottom of the panel is a huge cream wordmark, cropped by
 * the panel's edge, with stickers stuck on it (the brief's coins, ticks, a
 * PAID stamp and a starburst).
 *
 * The wordmark's letters rise in one after another as the footer scrolls into
 * view, and the stickers pop on and then bob (`.ft-*` in styles/brand.css,
 * gated on InView, off under reduced motion). At rest everything is in place.
 * Wordmark and stickers are decorative: hidden from assistive technology.
 *
 * No social row: ClinTrust has no public social accounts on record. The
 * standards the platform is built to sit in the contact column instead.
 */
export function SiteFooter() {
  return (
    <footer className={cx(container, "pt-12 pb-6 lg:pt-16")}>
      <InView once className="relative overflow-hidden rounded-[2rem] border-2 border-text-primary bg-brand-blue-500 shadow-sticker-lg">
        <div className="grid gap-10 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-3 lg:p-12">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <Label>{column.title}</Label>
              <ul className="mt-4 flex flex-col gap-1">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={bigLink}>
                      <span className="roll" data-text={link.label}>
                        <span>{link.label}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <Label>{footer.contactLabel}</Label>
            <Link
              href={demoCta.href}
              data-track="request_demo_click"
              data-track-location="footer"
              data-track-label={demoCta.label}
              className={cx(bigLink, "mt-4 flex w-fit gap-1.5")}
            >
              <span className="roll" data-text={demoCta.label}>
                <span>{demoCta.label}</span>
              </span>
              <RiArrowRightUpLine className="size-6 shrink-0" aria-hidden="true" />
            </Link>
            <SquiggleDoodle aria-hidden="true" className="mt-1 w-32 text-accent-300" />
            <p className="mt-2 max-w-[30ch] text-body-2-regular text-brand-blue-100">{footer.contactLine}</p>

            <h2 className="mt-8 text-caption-1-semibold text-brand-blue-100">{footer.standardsLabel}</h2>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Standards">
              {footer.certifications.map((item) => (
                <li key={item} className="rounded-full border-2 border-text-white/70 px-2.5 py-0.5 text-caption-1-semibold text-text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The wordmark, one span per letter so they can rise in turn. Pulled
            down so the panel's edge crops the bottoms of the letters. */}
        <div aria-hidden="true" className="pointer-events-none relative mt-14 select-none sm:-mt-4">
          <div dir="ltr" className="flex translate-y-[16%] justify-center text-wordmark text-accent-50">
            {brand.name.split("").map((letter, index) => (
              <span key={`${letter}-${index}`} className="ft-letter inline-block" style={{ "--i": index } as CSSProperties}>
                {letter}
              </span>
            ))}
          </div>

          <Sticker index={0} className="start-[3%] top-[2%] max-sm:-top-[38%]">
            <Burst label={footer.stickers.burst} />
          </Sticker>
          <Sticker index={1} className="start-[27%] -top-[6%] max-sm:hidden">
            <span className="flex size-14 items-center justify-center rounded-full border-2 border-text-primary bg-accent-300 shadow-sticker sm:size-20">
              <CoinDoodle className="size-9 text-text-primary sm:size-12" />
            </span>
          </Sticker>
          <Sticker index={2} className="start-[48%] top-[30%] max-sm:hidden">
            <PaidStamp label={footer.stickers.stamp} className="rotate-[-8deg] bg-coral-100 text-headline-semibold sm:text-title-2-semibold" />
          </Sticker>
          <Sticker index={3} className="end-[22%] top-[0%] max-sm:-top-[30%] max-sm:end-[8%]">
            <span className="flex size-14 rotate-6 items-center justify-center rounded-2xl border-2 border-text-primary bg-teal-300 shadow-sticker sm:size-20">
              <TickDoodle className="size-9 text-text-primary sm:size-12" />
            </span>
          </Sticker>
          <Sticker index={4} className="end-[4%] top-[34%] max-sm:hidden">
            <span className="flex size-12 items-center justify-center rounded-full border-2 border-text-primary bg-background-primary-default shadow-sticker sm:size-16">
              <LogoMark className="h-7 sm:h-9" />
            </span>
          </Sticker>
          <Sticker index={5} className="start-[16%] top-[58%] max-sm:hidden">
            <SparkleDoodle className="size-10 text-accent-300" />
          </Sticker>
        </div>
      </InView>

      <p className="mt-5 px-2 text-body-2-regular text-text-secondary">{footer.legal}</p>
    </footer>
  );
}
