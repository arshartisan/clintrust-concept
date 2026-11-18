import Image from "next/image";
import { RiUser3Fill } from "@remixicon/react";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";

interface PhotoStickerProps {
  role: string;
  tag?: string;
  /** Path under /public, e.g. "/people/site-coordinator.jpg". Without one, a silhouette. */
  photo?: string | null;
  /** object-position for the crop, e.g. "60% 30%". */
  focus?: string;
  /** Tilt in degrees. */
  tilt?: number;
  tone?: "sun" | "coral" | "teal";
  /** Rendered width in the layout, for next/image's `sizes`. */
  sizes?: string;
  className?: string;
}

const TONES = {
  sun: "bg-sun-100 text-sun-500",
  coral: "bg-coral-100 text-coral-300",
  teal: "bg-teal-100 text-teal-300",
} as const;

/**
 * A photo styled as a sticker: ink outline, hard shadow, slight tilt, a role
 * caption and an optional tag (the brief: "real people: coordinators, finance
 * leads, investigators"). With no `photo` the slot shows a silhouette and says
 * a photo is to come. The photo is decorative (the caption names the role),
 * so its alt text is empty.
 */
export function PhotoSticker({ role, tag, photo, focus = "50% 30%", tilt = 0, tone = "sun", sizes = "200px", className }: PhotoStickerProps) {
  return (
    <figure
      className={cx(
        "relative rounded-[1.75rem] border-2 border-text-primary bg-background-primary-default p-2.5 shadow-sticker",
        className,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      <div className={cx("relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[1.25rem]", TONES[tone])}>
        {photo ? (
          <Image src={photo} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: focus }} />
        ) : (
          <RiUser3Fill className="size-[78%] translate-y-[12%]" aria-hidden="true" />
        )}
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-2 px-1.5 pt-2.5 pb-1">
        <span className="font-display text-headline-semibold text-text-primary">{role}</span>
        {photo ? null : <span className="text-caption-1-medium text-text-tertiary">{hero.photoNote}</span>}
      </figcaption>
      {tag ? (
        <span className="concept-pop absolute -end-3 -top-3 rotate-6 rounded-full border-2 border-text-primary bg-coral-600 px-3 py-1 font-display text-body-2-semibold text-text-white">
          {tag}
        </span>
      ) : null}
    </figure>
  );
}
