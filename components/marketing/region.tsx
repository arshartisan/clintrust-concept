import type { CSSProperties } from "react";
import { RiCheckLine } from "@remixicon/react";
import { region } from "@/content/landing";
import { cx } from "@/utils/cx";
import { Section } from "./frame";
import { InView } from "./in-view";
import { Reveal } from "./reveal";

/**
 * "Built in Singapore for APAC" as a dark bento (sprint 5; replaces the plain
 * three-row list). Four tiles, each a short claim with a quiet, mostly
 * monochrome illustration: one tall tile, a big-figure tile, a small dial
 * tile, and a wide tile along the bottom.
 *
 * Server component. The illustrations are markup and inline SVG, animated by
 * classes from styles/brand.css while the tile is on screen (each tile is an
 * InView wrapper).
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const tile = "h-full rounded-3xl border border-border-button-default bg-background-secondary-default";
const title = "text-title-1-medium text-balance text-text-primary";
const body = "mt-2 text-body-regular text-pretty text-text-secondary";
/** The neutral shape colour for illustrations on a dark tile. */
const shape = "bg-background-tertiary-default";

export function Region() {
  const [regulatory, rails, fx] = region.points;

  return (
    <Section id="apac" className="dark bg-background-full">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="text-section text-balance text-text-primary">{region.title}</h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lead text-pretty text-text-secondary">{region.continuation}</p>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Tall tile: every market's requirements, each one met. */}
        <div className="lg:col-span-4 lg:row-span-2">
          <InView className={tile}>
            <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[inherit]">
              <div className="p-7">
                <h3 className={title}>{regulatory.name}</h3>
                <p className={body}>{regulatory.text}</p>
              </div>
              <div className="relative mt-auto h-56" aria-hidden="true">
                <span className="absolute inset-y-0 start-9 w-px bg-border-button-default" />
                <span className="iso-blink absolute start-[30px] top-6 size-3.5 rounded-full bg-accent-400 ring-4 ring-accent-400/20" />
                <span className={cx("absolute start-[27px] bottom-8 size-5 rounded-full", shape)} />
                <div className="absolute start-16 top-2 -end-px bottom-0 rounded-ss-[2rem] border-s-2 border-t-2 border-border-button-hover px-5 pt-6">
                  <ul className="flex flex-col gap-3">
                    {[0, 1, 2].map((row) => (
                      <li key={row} className={cx("flex h-11 items-center gap-3 rounded-full ps-3 pe-4", shape)}>
                        <span
                          style={delay(row * 900)}
                          className="iso-blink flex size-6 items-center justify-center rounded-full bg-accent-500 text-text-white"
                        >
                          <RiCheckLine className="size-3.5" />
                        </span>
                        <span
                          className="h-2 rounded-full bg-border-button-hover"
                          style={{ width: `${68 - row * 16}%` }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </InView>
        </div>

        {/* Figure tile: settlement over regional rails. */}
        <div className="lg:col-span-5">
          <InView className={tile}>
            <div className="flex h-full flex-col overflow-hidden rounded-[inherit] pb-7">
              <div className="flex flex-col gap-3 pt-7" aria-hidden="true">
                <span
                  style={delay(0)}
                  className={cx("how-row flex h-10 w-[88%] items-center justify-end gap-2 rounded-e-full pe-2", shape)}
                >
                  <span className="size-2 rounded-full bg-border-button-hover" />
                  <span className="size-4 rounded-full bg-border-button-hover" />
                  <span className="size-7 rounded-full bg-accent-400" />
                </span>
                <span
                  style={delay(2000)}
                  className={cx("how-row flex h-10 w-[30%] items-center justify-end rounded-e-full pe-2", shape)}
                >
                  <span className="size-7 rounded-full bg-border-button-hover" />
                </span>
              </div>
              <div className="mt-auto px-7 pt-8">
                <p className="text-figure tabular-nums text-text-primary">T+5</p>
                <h3 className="mt-3 text-headline-medium text-text-primary">{rails.name}</h3>
                <p className={cx(body, "mt-1")}>{rails.text}</p>
              </div>
            </div>
          </InView>
        </div>

        {/* Dial tile: the rate is shown before the money moves. */}
        <div className="lg:col-span-3">
          <InView className={tile}>
            <div className="flex h-full flex-col overflow-hidden rounded-[inherit]">
              <svg viewBox="0 0 200 112" className="w-full" aria-hidden="true">
                <path d="M4 112 A96 96 0 0 1 196 112 Z" className="fill-background-tertiary-default" />
                {[-60, -40, -20, 20, 40, 60].map((angle) => (
                  <line
                    key={angle}
                    x1={100}
                    y1={30}
                    x2={100}
                    y2={42}
                    transform={`rotate(${angle} 100 112)`}
                    className="stroke-border-button-hover"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                  />
                ))}
                {/* The needle rocks around the dial's centre. */}
                <g className="how-sway" style={{ transformOrigin: "100px 112px" }}>
                  <line x1={100} y1={112} x2={100} y2={26} className="stroke-accent-400" strokeWidth={3} strokeLinecap="round" />
                  <circle cx={100} cy={26} r={6} className="fill-accent-400" />
                </g>
                <circle cx={100} cy={112} r={11} className="fill-border-button-hover" />
              </svg>
              <div className="mt-auto p-7">
                <h3 className="text-headline-medium text-text-primary">{fx.name}</h3>
                <p className={cx(body, "mt-1")}>{fx.text}</p>
              </div>
            </div>
          </InView>
        </div>

        {/* Wide tile: one payable, paid out along the region in local currency. */}
        <div className="lg:col-span-8">
          <InView className={tile}>
            <div className="flex h-full flex-col overflow-hidden rounded-[inherit]">
              <div className="p-7 pb-0">
                <h3 className={title}>Paid in the site&apos;s own currency</h3>
                <p className={cx(body, "max-w-[52ch]")}>
                  One verified payable in, local-currency payouts out, from a Singapore base across the region.
                </p>
              </div>
              <svg viewBox="0 0 600 190" className="mt-auto w-full" aria-hidden="true">
                <path
                  d="M-20 190 C 150 60, 450 60, 620 190"
                  fill="none"
                  className="stroke-background-tertiary-default"
                  strokeWidth={38}
                />
                <path
                  d="M-20 190 C 150 60, 450 60, 620 190"
                  fill="none"
                  className="flow-dash stroke-accent-400"
                  strokeWidth={2}
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                />
                {(
                  [
                    ["KRW", 96, 128, 21],
                    ["AUD", 398, 100, 21],
                    ["THB", 530, 138, 21],
                  ] as const
                ).map(([code, x, y, radius]) => (
                  <g key={code}>
                    <circle cx={x} cy={y} r={radius} className="fill-border-button-hover" />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-text-primary text-caption-2-semibold max-sm:hidden"
                    >
                      {code}
                    </text>
                  </g>
                ))}
                <circle cx={244} cy={95} r={40} className="iso-blink fill-accent-400 opacity-25" />
                <circle cx={244} cy={95} r={30} className="fill-accent-600" />
                <text
                  x={244}
                  y={95}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-text-white text-body-semibold max-sm:hidden"
                >
                  SGD
                </text>
              </svg>
            </div>
          </InView>
        </div>
      </div>
    </Section>
  );
}
