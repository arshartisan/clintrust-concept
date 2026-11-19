import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Hand-drawn doodle icons (sprint 10), replacing the Remix line icons in the
 * site's decorative icon tiles (contact channels, about values, approach
 * features, the home pain cards). Functional icons (arrows, ticks, close,
 * menu) stay Remix.
 *
 * Each glyph is a slightly wobbly ink outline (`currentColor`) with one area
 * filled in the tile's colour through `--doodle-fill`, so a tile's tone sets
 * it. 32 x 32 grid. All decorative: aria-hidden; the label beside the tile
 * carries the meaning.
 */

export type DoodleIcon = (props: { className?: string }) => ReactNode;

const fill: CSSProperties = { fill: "var(--doodle-fill, var(--color-accent-300))" };
const paper: CSSProperties = { fill: "var(--color-background-primary-default)" };

function Glyph({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cx("overflow-visible", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const DoodlePin: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M16 29C10.5 22.5 7 17.5 7.2 12.4C7.4 7.4 11.2 3.4 16.2 3.6C21.2 3.8 25 7.8 24.8 12.7C24.6 17.4 21.4 22.4 16 29Z" />
    <circle style={paper} cx={16} cy={12.6} r={3.6} />
  </Glyph>
);

export const DoodleMail: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M5 8.2C12.4 7.6 19.8 7.7 27.2 8.3C27.7 13.6 27.6 19 27 24.4C19.6 25 12.3 24.9 5 24.2C4.4 18.9 4.5 13.5 5 8.2Z" />
    <path d="M5.5 9.5L16 17.8L26.6 9.6" />
  </Glyph>
);

export const DoodleBriefcase: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M12 10V7.6C12 6.6 12.8 6 13.8 6H18.2C19.2 6 20 6.6 20 7.6V10" />
    <path style={fill} d="M4.6 10.4C12.2 9.8 19.8 9.8 27.4 10.4C27.9 15.6 27.8 20.8 27.2 26C19.8 26.6 12.3 26.5 4.8 26C4.2 20.8 4.1 15.6 4.6 10.4Z" />
    <path d="M4.8 16.6C12.2 18.6 19.8 18.6 27.2 16.6" />
    <rect style={paper} x={14.3} y={15.6} width={3.4} height={3.6} rx={1} />
  </Glyph>
);

export const DoodleLock: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M10.6 14V10.6C10.6 7.2 13 4.8 16 4.8C19 4.8 21.4 7.2 21.4 10.6V14" />
    <path style={fill} d="M6.4 14.2C12.8 13.6 19.2 13.6 25.6 14.2C26.1 18.8 26 23.4 25.4 28C19.1 28.5 12.8 28.5 6.6 28C6 23.4 5.9 18.8 6.4 14.2Z" />
    <path d="M16 19.4V23.2" strokeWidth={2.6} />
  </Glyph>
);

export const DoodleLayers: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M4.6 21.2L16 27.2L27.4 21.2" />
    <path d="M4.6 15.8L16 21.8L27.4 15.8" />
    <path style={fill} d="M16 4.2L27.6 10.2L16 16.4L4.4 10.2Z" />
  </Glyph>
);

export const DoodleTarget: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M15.6 4.4C22.4 4.2 27.6 9.4 27.6 16.2C27.6 22.6 22.4 27.8 15.8 27.6C9.4 27.4 4.4 22.4 4.4 16C4.4 9.6 9.4 4.6 15.6 4.4Z" />
    <circle style={paper} cx={16} cy={16} r={6.6} />
    <circle cx={16} cy={16} r={2} style={{ fill: "currentColor" }} />
    <path d="M17.8 14.2L26.4 5.6M22.6 5.2H26.8V9.4" />
  </Glyph>
);

export const DoodleShieldCheck: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M16 3.6L26.4 7.4C26.6 10 26.6 12.6 26.4 15.2C26 21.4 21.8 25.8 16 28.4C10.2 25.8 6 21.4 5.6 15.2C5.4 12.6 5.4 10 5.6 7.4Z" />
    <path d="M11 16.2L14.6 19.6L21.2 12.4" strokeWidth={2.6} />
  </Glyph>
);

export const DoodleGlobe: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M16.2 4.2C22.8 4.4 27.8 9.6 27.6 16.2C27.4 22.6 22.4 27.8 15.8 27.6C9.2 27.4 4.2 22.2 4.4 15.8C4.6 9.4 9.8 4 16.2 4.2Z" />
    <path d="M16 4.4C11.6 8.8 11.4 22.6 16 27.4M16 4.4C20.4 8.8 20.6 22.6 16 27.4M5 12.2C12.4 11.4 19.6 11.4 27 12.2M5 19.8C12.4 20.6 19.6 20.6 27 19.8" strokeWidth={1.6} />
  </Glyph>
);

export const DoodleChartUp: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M7.6 21.6L12.8 15.4L17.4 18.8L25.8 9.6V26H7.6Z" strokeWidth={0} />
    <path d="M5 4.8C4.8 12.2 4.8 19.6 5.2 27C12.4 27.2 19.6 27.2 27 26.8" />
    <path d="M8 21.4L12.8 15.4L17.4 18.8L25.8 9.6M21 9.4H26V14.2" />
  </Glyph>
);

export const DoodleGauge: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M4.2 22.6C4 15.6 9.4 9.8 16.2 9.8C22.8 9.8 28 15.4 27.8 22.6Z" />
    <path d="M16 22.4L21.8 14.2" strokeWidth={2.6} />
    <circle cx={16} cy={22.4} r={1.8} style={{ fill: "currentColor" }} />
    <path d="M8.6 15.2L10 16.6M16 12.4V14.4M23.4 15.2L22 16.6" strokeWidth={1.6} />
  </Glyph>
);

export const DoodleMerge: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M9 9V23M9.2 12.2C9.4 16.2 13 16.2 19.6 16" />
    <circle style={fill} cx={9} cy={6.2} r={3.2} />
    <circle style={fill} cx={9} cy={25.8} r={3.2} />
    <circle style={fill} cx={23} cy={16} r={3.4} />
  </Glyph>
);

export const DoodleFlow: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M9.2 12.4C9 16.4 9 20.4 9.4 24.2H17.6M14.6 21.2L17.8 24.2L14.6 27.2" />
    <path style={fill} d="M4.4 4.6C7.8 4.2 11.2 4.2 14.4 4.6C14.8 7.2 14.8 9.8 14.4 12.4C11.2 12.8 7.8 12.8 4.4 12.4C4 9.8 4 7.2 4.4 4.6Z" />
    <path style={fill} d="M18.6 19.6C21.8 19.2 25 19.2 28 19.6C28.4 22.4 28.4 25.2 28 28C25 28.4 21.8 28.4 18.6 28C18.2 25.2 18.2 22.4 18.6 19.6Z" />
  </Glyph>
);

function Page({ children }: { children?: ReactNode }) {
  return (
    <>
      <path style={fill} d="M8.2 3.6C12 3.4 15.8 3.4 19.6 3.6L25 9.2C25.3 15.4 25.2 21.6 24.8 27.8C19.2 28.4 13.6 28.4 8 28C7.4 19.8 7.4 11.8 8.2 3.6Z" />
      <path d="M19.4 3.8C19.2 5.6 19.2 7.4 19.6 9.2C21.4 9.4 23.2 9.4 24.8 9.2" />
      {children}
    </>
  );
}

export const DoodleFileList: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <Page>
      <path d="M11.4 14.2H21M11.4 18.6H20.4M11.4 23H16.8" strokeWidth={1.8} />
    </Page>
  </Glyph>
);

export const DoodleFileShield: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <Page>
      <path d="M11.4 14.2H19M11.4 18.6H16" strokeWidth={1.8} />
    </Page>
    <path style={paper} d="M22.4 17.6L28.4 19.8C28.6 22.6 27.6 26.2 22.4 28.6C17.2 26.2 16.2 22.6 16.4 19.8Z" />
    <path d="M19.8 22.8L21.8 24.6L25 21.2" strokeWidth={1.8} />
  </Glyph>
);

export const DoodleClock: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M15.6 4.6C22.2 4.2 27.6 9.4 27.6 16.2C27.6 22.8 22.4 27.8 16 27.6C9.4 27.4 4.4 22.4 4.4 15.8C4.4 9.6 9.4 4.8 15.6 4.6Z" />
    <path d="M16 9.4V16.2L21.2 19.2" strokeWidth={2.4} />
  </Glyph>
);

export const DoodleTimer: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M12.8 2.8H19.2M16 2.8V6.2M25 8.4L26.8 6.6" />
    <path style={fill} d="M15.8 6.6C21.8 6.4 26.6 11.2 26.6 17.4C26.6 23.4 21.8 28.2 15.8 28C9.8 27.8 5.2 23 5.4 17.2C5.6 11.4 10.2 6.8 15.8 6.6Z" />
    <path d="M16 11.4V17.4L19.6 19.6" strokeWidth={2.4} />
  </Glyph>
);

export const DoodleBuilding: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path style={fill} d="M7.4 6.2C13.2 5.6 19 5.6 24.6 6.2C25 13.4 25 20.6 24.6 27.8H7.4C7 20.6 7 13.4 7.4 6.2Z" />
    <path d="M11.2 11H13.2M18.8 11H20.8M11.2 16H13.2M18.8 16H20.8" strokeWidth={2.2} />
    <path style={paper} d="M13.8 27.8V22H18.2V27.8" />
    <path d="M4.4 27.8H27.6" />
  </Glyph>
);

export const DoodleScales: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M16 5V27M10.4 27.4H21.6M6 9.2C12.6 8.6 19.4 8.6 26 9.2M6 9.4L3.2 18M6 9.4L8.8 18M26 9.4L23.2 18M26 9.4L28.8 18" />
    <path style={fill} d="M2.8 18C3 21.2 8.8 21.4 9.2 18Z" />
    <path style={fill} d="M22.8 18C23 21.2 28.8 21.4 29.2 18Z" />
    <circle style={paper} cx={16} cy={5.4} r={1.8} />
  </Glyph>
);

export const DoodleStethoscope: DoodleIcon = ({ className }) => (
  <Glyph className={className}>
    <path d="M9 4.4V12C9 16 11.4 18.6 14 18.6C16.6 18.6 19 16 19 12V4.4M7 4.2H11M17 4.2H21" />
    <path d="M14 18.6V22.2C14 25.6 16.4 28 19.6 28C22.8 28 25 25.6 25 22.2V19.8" />
    <circle style={fill} cx={25} cy={16.4} r={3.8} />
  </Glyph>
);

const TILE_TONES = {
  sun: "bg-accent-100 [--doodle-fill:var(--color-accent-300)]",
  teal: "bg-teal-100 [--doodle-fill:var(--color-teal-300)]",
  coral: "bg-coral-100 [--doodle-fill:var(--color-coral-300)]",
  blue: "bg-brand-blue-50 [--doodle-fill:var(--color-brand-blue-200)]",
} as const;
export type TileTone = keyof typeof TILE_TONES;
export const TILE_TONE_ORDER: TileTone[] = ["sun", "teal", "coral", "blue"];

/**
 * A doodle icon on a sticker tile: ink outline, the tone's tint, a small hard
 * shadow, a slight tilt that straightens and wiggles on hover. Decorative.
 */
export function DoodleTile({ icon: Icon, tone = "sun", className }: { icon: DoodleIcon; tone?: TileTone; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "doodle-tile flex size-12 shrink-0 items-center justify-center rounded-2xl border-2 border-text-primary text-text-primary shadow-sticker-sm",
        TILE_TONES[tone],
        className,
      )}
    >
      <Icon className="size-9" />
    </span>
  );
}
