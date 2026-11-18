"use client";

import { useState } from "react";
import { RiAddLine, RiArrowGoBackLine, RiCheckLine } from "@remixicon/react";
import { pains } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";

const face =
  "flex h-full flex-col rounded-3xl border-2 border-text-primary p-5 text-start shadow-sticker transition-[translate,box-shadow] duration-150 group-hover:translate-x-px group-hover:translate-y-px group-hover:shadow-sticker-sm group-active:translate-x-[3px] group-active:translate-y-[3px] group-active:shadow-none motion-reduce:transition-none sm:p-6";

/**
 * "Which one is you?" as four tappable flip cards (sprint 9, per the brief:
 * "Four tappable pain cards … Each opens a one-line fix").
 *
 * Each card is a toggle button with two faces: the front shows the worry, the
 * back (sunny yellow) shows the fix. Tapping turns the card over in 3D (the
 * `.concept-flip` recipe in styles/brand.css: perspective, preserved 3D,
 * hidden back faces, 800ms ease-out); tapping again turns it back. Both faces
 * share one grid cell, so the card is the height of the taller face and
 * nothing moves. Under reduced motion the faces swap without turning.
 * Several cards can be open at once. Plain buttons, no react-aria.
 */
export function PainCards({ className }: { className?: string }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    const opening = !open.has(id);
    if (opening) track("pain_card_click", { location: "pain-picker", label: id });
    setOpen((current) => {
      const next = new Set(current);
      if (opening) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  return (
    <ul className={cx("grid gap-4 sm:grid-cols-2", className)}>
      {pains.items.map((pain) => {
        const isOpen = open.has(pain.id);
        return (
          <li key={pain.id} className="scroll-pop flex">
            <button
              type="button"
              aria-pressed={isOpen}
              onClick={() => toggle(pain.id)}
              className="group concept-flip flex w-full cursor-pointer rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-4"
            >
              <span className="concept-flip-inner w-full" data-flipped={isOpen}>
                {/* Front: the worry. */}
                <span aria-hidden={isOpen} className={cx(face, "bg-background-primary-default")}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl border-2 border-text-primary bg-coral-100">
                      <pain.icon className="size-5 text-text-primary" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full border-2 border-text-primary text-text-primary transition-[rotate] duration-200 group-hover:rotate-90"
                    >
                      <RiAddLine className="size-4" />
                    </span>
                  </span>
                  <span className="mt-6 font-display text-title-2-semibold text-text-primary">{pain.label}</span>
                  <span className="mt-2 text-body-regular text-pretty text-text-secondary">{pain.worry}</span>
                  <span className="mt-auto pt-5 text-caption-1-semibold text-text-primary">{pains.cardHint}</span>
                </span>

                {/* Back: the fix. */}
                <span aria-hidden={!isOpen} className={cx(face, "bg-teal-300")}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-2xl border-2 border-text-primary bg-text-primary text-text-white">
                      <RiCheckLine className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-8 items-center justify-center rounded-full border-2 border-text-primary bg-background-primary-default text-text-primary"
                    >
                      <RiArrowGoBackLine className="size-4" />
                    </span>
                  </span>
                  <span className="mt-6 font-display text-title-2-semibold text-text-primary">{pain.label}</span>
                  <span className="mt-2 text-body-medium text-pretty text-text-primary">{pain.fix}</span>
                  <span className="mt-auto pt-5 text-caption-1-semibold text-text-primary">{pains.cardOpenHint}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
