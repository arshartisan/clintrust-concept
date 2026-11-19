import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Chunky sticker pieces for the hero (sprint 10, after the client's flat
 * "3D icon" reference: ink outline, a hard dark side, flat two-tone fills, a
 * few plus-sparkles). Each one is about the product:
 *   InvoiceSticker  a clean invoice, stamped PAID
 *   CardBubble      a payment card in a chat bubble (paid, and told)
 *   RecordShield    one verified record
 *   CoinBuddy       a coin with eyes that follow the cursor
 *
 * They are drawn at rest as finished pictures. Clicking one (hero-play.tsx)
 * adds `.is-poked` to its `[data-poke]` wrapper, which replays a small
 * reaction in styles/brand.css (`.poke-*`). Decorative: the hero decor layer
 * is aria-hidden.
 */

const ink = { className: "stroke-text-primary", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** A plus-shaped sparkle, outlined like the reference. */
function Plus({ x, y, s = 7, className = "fill-background-primary-default" }: { x: number; y: number; s?: number; className?: string }) {
  const k = s * 0.22;
  return (
    <path
      {...ink}
      strokeWidth={1.75}
      className={cx(ink.className, className)}
      d={`M${x} ${y - s} Q${x + k} ${y - k} ${x + s} ${y} Q${x + k} ${y + k} ${x} ${y + s} Q${x - k} ${y + k} ${x - s} ${y} Q${x - k} ${y - k} ${x} ${y - s} Z`}
    />
  );
}

/** Short lines that flash round a piece when it is clicked. */
function Rays({ d }: { d: string }) {
  return <path {...ink} strokeWidth={2} className={cx(ink.className, "poke-rays fill-none")} d={d} />;
}

export function InvoiceSticker({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 124" className={cx("block overflow-visible", className)} aria-hidden="true">
      <rect x={4} y={4} width={84} height={108} rx={10} className="fill-text-primary" transform="translate(5 6)" />
      <rect {...ink} x={4} y={4} width={84} height={108} rx={10} className={cx(ink.className, "fill-background-primary-default")} />
      <rect {...ink} strokeWidth={2} x={13} y={14} width={34} height={10} rx={5} className={cx(ink.className, "fill-accent-300")} />
      <g className="fill-text-tertiary" opacity={0.45}>
        <rect x={13} y={34} width={44} height={5} rx={2.5} />
        <rect x={64} y={34} width={15} height={5} rx={2.5} />
        <rect x={13} y={45} width={36} height={5} rx={2.5} />
        <rect x={64} y={45} width={15} height={5} rx={2.5} />
        <rect x={13} y={56} width={40} height={5} rx={2.5} />
        <rect x={64} y={56} width={15} height={5} rx={2.5} />
      </g>
      <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-none")} d="M13 69 H79" />
      <rect {...ink} strokeWidth={2} x={13} y={76} width={26} height={9} rx={3} className={cx(ink.className, "fill-teal-300")} />
      <rect x={55} y={77} width={24} height={7} rx={3.5} className="fill-text-primary" />
      <g className="inv-stamp" transform="rotate(-12 58 101)">
        <rect x={32} y={91} width={52} height={20} rx={5} strokeWidth={3} className="fill-background-primary-default stroke-coral-500" />
        <text x={58} y={105.5} textAnchor="middle" className="fill-coral-500 font-display text-[12px] font-extrabold tracking-[0.12em]">
          PAID
        </text>
      </g>
      <Plus x={94} y={10} s={8} className="fill-accent-300" />
    </svg>
  );
}

export function CardBubble({ className }: { className?: string }) {
  const body = "M14 4h92a10 10 0 0 1 10 10v42a10 10 0 0 1-10 10H36L16 82l4-16h-6A10 10 0 0 1 4 56V14A10 10 0 0 1 14 4Z";
  return (
    <svg viewBox="0 0 120 86" className={cx("block overflow-visible", className)} aria-hidden="true">
      <Rays d="M60 -4V-11M40 -1L35 -7M80 -1L85 -7M122 30H129M-2 30H-9" />
      <path d={body} className="fill-text-primary" transform="translate(5 6)" />
      <path {...ink} d={body} className={cx(ink.className, "fill-teal-300")} />
      <rect {...ink} strokeWidth={2} x={16} y={17} width={21} height={16} rx={3} className={cx(ink.className, "fill-accent-300")} />
      <path {...ink} strokeWidth={1.5} className={cx(ink.className, "fill-none")} d="M16 25H37M26.5 17V33" />
      <circle {...ink} strokeWidth={2} cx={86} cy={24} r={8} className={cx(ink.className, "fill-coral-400")} />
      <circle {...ink} strokeWidth={2} cx={97} cy={24} r={8} className={cx(ink.className, "fill-background-primary-default")} fillOpacity={0.7} />
      <rect x={16} y={44} width={62} height={7} rx={3.5} className="fill-text-primary" />
    </svg>
  );
}

export function RecordShield({ className }: { className?: string }) {
  const outer = "M40 4L72 14V44C72 66 58 80 40 88C22 80 8 66 8 44V14Z";
  return (
    <svg viewBox="0 0 80 92" className={cx("block overflow-visible", className)} aria-hidden="true">
      <Rays d="M40 -4V-11M14 4L9 -1M66 4L71 -1" />
      <path d={outer} className="fill-text-primary" transform="translate(5 6)" />
      <path {...ink} d={outer} className={cx(ink.className, "fill-accent-300")} />
      <path {...ink} strokeWidth={2} d="M40 15L62 22V44C62 60 52 71 40 77C28 71 18 60 18 44V22Z" className={cx(ink.className, "fill-background-primary-default")} />
      <path strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-teal-500 poke-tick" pathLength={1} d="M29 45L37 53L52 36" />
      <Plus x={76} y={8} s={7} />
      <Plus x={4} y={70} s={5} className="fill-coral-300" />
    </svg>
  );
}

/** Eyes follow the cursor through `--lx` / `--ly`, set by hero-play.tsx on the `[data-look]` wrapper. */
export function CoinBuddy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cx("block overflow-visible", className)} aria-hidden="true">
      <circle cx={40} cy={40} r={34} className="fill-text-primary" transform="translate(4 5)" />
      <circle {...ink} cx={40} cy={40} r={34} className={cx(ink.className, "fill-accent-400")} />
      <circle cx={40} cy={40} r={27} strokeWidth={2} strokeDasharray="3 5" className="fill-none stroke-accent-700" />
      <g className="coin-eyes">
        <ellipse {...ink} strokeWidth={2} cx={30} cy={35} rx={7} ry={8.5} className={cx(ink.className, "fill-background-primary-default")} />
        <ellipse {...ink} strokeWidth={2} cx={50} cy={35} rx={7} ry={8.5} className={cx(ink.className, "fill-background-primary-default")} />
        <circle cx={30} cy={35} r={3.4} className="coin-pupil fill-text-primary" />
        <circle cx={50} cy={35} r={3.4} className="coin-pupil fill-text-primary" />
      </g>
      <circle cx={22} cy={49} r={3.5} className="fill-coral-400" opacity={0.7} />
      <circle cx={58} cy={49} r={3.5} className="fill-coral-400" opacity={0.7} />
      <path {...ink} className={cx(ink.className, "fill-none")} d="M32 51Q40 59 48 51" />
    </svg>
  );
}

/**
 * One positioned piece of an inner-page hero scene (about, insights): enters
 * with `.hero-in` after `enter` ms, follows the mouse by `depth` px
 * (`.hero-par`, negative moves against the pointer), bobs if `bob` is given,
 * and reacts to a click (`poke`). Wrap the scene in <HeroPlay> for the mouse
 * and click handling. `look` lets a CoinBuddy's eyes follow the cursor.
 */
export function SceneBit({
  className,
  depth,
  poke = "wiggle",
  look = false,
  bob,
  enter,
  children,
}: {
  className: string;
  depth: number;
  poke?: "wiggle" | "flip" | "spin" | "blink" | "stamp";
  look?: boolean;
  bob?: number;
  enter: number;
  children: ReactNode;
}) {
  return (
    <div className={cx("hero-in absolute", className)} style={{ "--d": `${enter}ms` } as CSSProperties}>
      <div className="hero-par" style={{ "--depth": depth } as CSSProperties}>
        <div className={cx(bob !== undefined && "concept-float")} style={{ animationDelay: `${bob ?? 0}s` }}>
          <div data-poke={poke} data-look={look || undefined} className="hero-poke pointer-events-auto cursor-pointer">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
