"use client";

// A client component on purpose, although it has no state or effects.
// These drawings are generated from a few lines of code into a lot of SVG.
// As a server component that SVG is sent twice: once as HTML and once in the
// page's serialized component tree. As a client component it is sent once as
// HTML, plus the small generator in the script bundle. On the homepage that
// was the difference between 50 KB and the HTML budget (docs/sop/05-performance.md).

import type { CSSProperties } from "react";
import { IsoBox, IsoLabel, IsoStamp, IsoWire, type Point3 } from "./iso";

/**
 * The hero illustration: ClinTrust as a platform sitting between the parties.
 *
 * Inputs arrive from the left (sponsor, CRO, EDC, CTMS) as blue pulses, are
 * verified on the platform (tiles lighting up teal around the ClinTrust mark,
 * which is printed on the centre tile), and leave on the right
 * as teal pulses to sites in their own currency and to the audit trail.
 *
 * One inline SVG, server-rendered, animated only with CSS (`iso-*` classes in
 * styles/brand.css) while it is on screen. It scales with its container;
 * below `sm` the text labels are hidden because they would be too small to
 * read, and the scene works as a pure illustration.
 */

const S = 40;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

interface Node {
  label: string;
  at: [number, number];
  /** Path from the node to the platform edge (inputs) or back out (outputs). */
  wire: Point3[];
}

// Left of the platform: where the data comes from.
const INPUTS: Node[] = [
  {
    label: "Sponsor",
    at: [-7.2, 0.6],
    wire: [
      [-6.4, 0.6],
      [-3.3, 0.6],
    ],
  },
  {
    label: "CRO",
    at: [-5.4, 4.4],
    wire: [
      [-5.4, 3.8],
      [-5.4, 2],
      [-3.3, 2],
    ],
  },
  {
    label: "EDC",
    at: [-1.8, 6.8],
    wire: [
      [-1.8, 6.2],
      [-1.8, 3.3],
    ],
  },
  {
    label: "CTMS",
    at: [1.2, 7.6],
    wire: [
      [1.2, 7],
      [1.2, 3.3],
    ],
  },
];

// Right of the platform: where the verified result goes.
const OUTPUTS: Node[] = [
  {
    label: "Audit trail",
    at: [0.6, -7.2],
    wire: [
      [0.6, -3.3],
      [0.6, -6.4],
    ],
  },
  {
    label: "Site, KRW",
    at: [4.4, -5.4],
    wire: [
      [2, -3.3],
      [2, -5.4],
      [3.8, -5.4],
    ],
  },
  {
    label: "Site, SGD",
    at: [6.8, -1.8],
    wire: [
      [3.3, -1.8],
      [6.2, -1.8],
    ],
  },
  {
    label: "Site, AUD",
    at: [7.6, 1.2],
    wire: [
      [3.3, 1.2],
      [7, 1.2],
    ],
  },
];

// 3 x 3 tiles on the platform. `lit` tiles are verified payables.
const TILE = 1.5;
const GAP = 0.36;
const TILES = [-1, 0, 1].flatMap((row) =>
  [-1, 0, 1].map((col) => ({
    at: [col * (TILE + GAP), row * (TILE + GAP)] as [number, number],
    lit: (row + col + 3) % 2 === 0 && !(row === 0 && col === 0),
    order: (row + 1) * 3 + (col + 1),
  })),
);

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      shapeRendering="geometricPrecision"
      viewBox="-420 -232 840 452"
      className={className}
      role="img"
      aria-label="Diagram: sponsor, CRO, EDC and CTMS data flow into the ClinTrust platform, which pays sites in their own currency and writes the audit trail."
    >
      <defs>
        {/* The logo's own gradient, used for the platform's base. */}
        <linearGradient id="hero-base-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-accent-400)" }} />
          <stop
            offset="1"
            style={{ stopColor: "var(--color-brand-blue-500)" }}
          />
        </linearGradient>
        <linearGradient id="hero-base-right" x1="0" y1="0" x2="1" y2="0">
          <stop
            offset="0"
            style={{ stopColor: "var(--color-brand-blue-500)" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "var(--color-brand-blue-600)" }}
          />
        </linearGradient>
      </defs>

      {/* Ground: connectors first, so everything else sits on top of them. */}
      {INPUTS.map((node, index) => (
        <IsoWire
          key={node.label}
          points={node.wire}
          scale={S}
          tone="blue"
          delay={index * 450}
        />
      ))}
      {OUTPUTS.map((node, index) => (
        <IsoWire
          key={node.label}
          points={node.wire}
          scale={S}
          tone="accent"
          delay={900 + index * 450}
        />
      ))}

      {/* Back nodes (drawn before the platform, which overlaps them). */}
      {[INPUTS[0], OUTPUTS[0], OUTPUTS[1]].map((node) => (
        <IsoBox
          key={node.label}
          at={node.at}
          size={[1.6, 1.2, 0.34]}
          scale={S}
        />
      ))}

      {/* Platform: gradient base, white deck, tiles. */}
      <IsoBox
        at={[0, 0]}
        size={[6.6, 6.6, 0.36]}
        scale={S}
        tone="blue"
        sideFill={{
          left: "url(#hero-base-left)",
          right: "url(#hero-base-right)",
        }}
      />
      <IsoBox at={[0, 0]} size={[6.2, 6.2, 0.22]} z={0.36} scale={S} />
      {TILES.map((tile) => (
        <IsoBox
          key={tile.order}
          at={tile.at}
          size={[TILE, TILE, 0.12]}
          z={0.58}
          scale={S}
          tone={tile.lit ? "accent" : "paper"}
          className={tile.lit ? "iso-blink" : undefined}
          style={tile.lit ? delay(tile.order * 380) : undefined}
        />
      ))}

      {/* Front nodes. */}
      {[INPUTS[1], INPUTS[2], INPUTS[3], OUTPUTS[2], OUTPUTS[3]].map((node) => (
        <IsoBox
          key={node.label}
          at={node.at}
          size={[1.6, 1.2, 0.34]}
          scale={S}
        />
      ))}

      {/* The mark, printed flat on the raised centre tile. */}
      <IsoBox at={[0, 0]} size={[TILE, TILE, 0.26]} z={0.58} scale={S} />
      <IsoStamp at={[0, 0, 0.84]} scale={S} width={38} />

      {/* Labels: hidden on phones, where they would be too small to read. */}
      <g className="max-sm:hidden">
        {[...INPUTS, ...OUTPUTS].map((node) => (
          <IsoLabel
            key={node.label}
            at={[node.at[0], node.at[1], 0.34]}
            scale={S}
          >
            {node.label}
          </IsoLabel>
        ))}
      </g>
    </svg>
  );
}
