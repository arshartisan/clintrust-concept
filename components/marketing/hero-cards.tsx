import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { RiCalendarCheckLine, RiCursorFill } from "@remixicon/react";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const floatDelay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

const [coordinator, financeLead, investigator] = hero.people;
const { cards } = hero;

function Avatar({ photo, focus }: { photo: string; focus: string }) {
  return (
    <span className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-text-primary bg-accent-100">
      <Image src={photo} alt="" fill sizes="40px" className="object-cover" style={{ objectPosition: focus }} />
    </span>
  );
}

function Progress({ value, tone }: { value: number; tone: "accent" | "teal" }) {
  return (
    <span className="mt-3 block h-2 overflow-hidden rounded-full bg-background-tertiary-default">
      <span
        className={cx("block h-full rounded-full", tone === "accent" ? "bg-accent-400" : "bg-teal-400")}
        style={{ width: `${value}%` }}
      />
    </span>
  );
}

/** One floating card: positioned by the caller, settles in, then bobs gently. */
function Float({ className, enter, bob, children }: { className: string; enter: number; bob: number; children: ReactNode }) {
  return (
    <div className={cx("hero-in absolute", className)} style={delay(enter)}>
      <div className="concept-float" style={floatDelay(bob)}>
        {children}
      </div>
    </div>
  );
}

/**
 * The cards floating round the centred hero headline (sprint 9, after the
 * client's reference): two progress cards (a site coordinator, a finance
 * lead), two name pills with a pointer (an investigator, a sponsor) and a
 * tilted "pre-invoice ready" card. Sticker shapes, stock-photo avatars.
 *
 * Desktop only (lg and up): on smaller screens they would sit on top of the
 * headline. Purely illustrative, so the whole layer is hidden from assistive
 * technology. Entrance and bobbing are off under reduced motion.
 */
export function HeroCards() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* Top left: site coordinator, visits verified. */}
      <Float className="start-[2%] top-[9%] w-[236px] -rotate-3" enter={200} bob={0}>
        <div className="rounded-2xl border-2 border-text-primary bg-background-primary-default p-3.5 shadow-sticker">
          <div className="flex items-center gap-3">
            <Avatar photo={coordinator.photo} focus={coordinator.focus} />
            <div className="min-w-0">
              <p className="font-display text-headline-semibold text-text-primary">{cards.coordinator.title}</p>
              <p className="text-caption-1-medium text-text-secondary">{cards.coordinator.meta}</p>
            </div>
          </div>
          <Progress value={cards.coordinator.progress} tone="accent" />
        </div>
      </Float>

      {/* Top right: finance lead, month-end reconciled. */}
      <Float className="end-[2%] top-[12%] w-[236px] rotate-2" enter={350} bob={-2.5}>
        <div className="rounded-2xl border-2 border-text-primary bg-background-primary-default p-3.5 shadow-sticker">
          <div className="flex items-center gap-3">
            <Avatar photo={financeLead.photo} focus={financeLead.focus} />
            <div className="min-w-0">
              <p className="font-display text-headline-semibold text-text-primary">{cards.financeLead.title}</p>
              <p className="text-caption-1-medium text-text-secondary">{cards.financeLead.meta}</p>
            </div>
          </div>
          <Progress value={cards.financeLead.progress} tone="teal" />
        </div>
      </Float>

      {/* Bottom left: investigator pill, ink, with a pointer. */}
      <Float className="start-[4%] top-[58%]" enter={500} bob={-1.2}>
        <div className="relative">
          <div className="flex items-center gap-2.5 rounded-full border-2 border-text-primary bg-text-primary py-1.5 ps-1.5 pe-5 shadow-sticker-sm">
            <Avatar photo={investigator.photo} focus={investigator.focus} />
            <div>
              <p className="font-display text-body-semibold text-text-white">{cards.investigator.title}</p>
              <p className="text-caption-2-medium text-text-white/70">{cards.investigator.meta}</p>
            </div>
          </div>
          <RiCursorFill className="absolute -end-5 -top-5 size-6 rotate-90 text-text-primary" />
        </div>
      </Float>

      {/* Bottom right: sponsor pill, coral, with a pointer. */}
      <Float className="end-[5%] top-[62%]" enter={650} bob={-3.4}>
        <div className="relative">
          <RiCursorFill className="absolute -start-5 -top-5 size-6 text-coral-600" />
          <div className="flex items-center gap-2.5 rounded-full border-2 border-text-primary bg-coral-600 py-2 ps-2 pe-5 shadow-sticker-sm">
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-text-primary bg-background-primary-default font-display text-body-semibold text-text-primary">
              {cards.sponsor.title[0]}
            </span>
            <div>
              <p className="font-display text-body-semibold text-text-white">{cards.sponsor.title}</p>
              <p className="text-caption-2-medium text-text-white/80">{cards.sponsor.meta}</p>
            </div>
          </div>
        </div>
      </Float>

      {/* Tilted pre-invoice card, right side, between the finance card and the sponsor pill. */}
      <Float className="end-[4%] top-[36%] w-[200px] rotate-[7deg]" enter={800} bob={-4.2}>
        <div className="overflow-hidden rounded-2xl border-2 border-text-primary bg-background-primary-default shadow-sticker-lg">
          <div className="bg-accent-300 px-3.5 pt-3 pb-3.5">
            <p className="text-caption-1-semibold text-text-primary/70">{cards.invoice.eyebrow}</p>
            <p className="font-display text-headline-semibold text-text-primary">{cards.invoice.title}</p>
            <div className="mt-2 flex gap-1.5">
              {cards.invoice.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border-2 border-text-primary bg-background-primary-default px-2 py-0.5 text-caption-2-semibold text-text-primary"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <p className="flex items-center gap-2 border-t-2 border-text-primary px-3.5 py-2.5 text-caption-1-semibold text-text-primary">
            <RiCalendarCheckLine className="size-4 text-teal-600" />
            {cards.invoice.footer}
          </p>
        </div>
      </Float>
    </div>
  );
}
