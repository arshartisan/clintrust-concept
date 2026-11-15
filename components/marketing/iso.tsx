import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/utils/cx";

/**
 * Isometric drawing toolkit.
 *
 * Every isometric illustration on the site (the hero scene and the six
 * platform visuals) is drawn with these helpers rather than hand-plotted, so
 * they all share one projection, one line weight and one set of tones.
 *
 * Coordinates are in "units" on a 3D grid: x runs down-right, y runs
 * down-left, z runs straight up. `S` is how many SVG pixels one unit is.
 * Server-safe: pure functions and markup, no client code.
 */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

/** Round to 0.1px: keeps the generated SVG small and stable between renders. */
const r = (value: number) => Math.round(value * 10) / 10;

export type Point3 = [x: number, y: number, z?: number];

/** Project a 3D grid point to 2D SVG coordinates. */
export function project(
  [x, y, z = 0]: Point3,
  scale: number,
): [number, number] {
  return [r((x - y) * COS * scale), r((x + y) * SIN * scale - z * scale)];
}

type P2 = [number, number];

const fmt = ([x, y]: P2) => `${r(x)} ${r(y)}`;
const mid = (a: P2, b: P2): P2 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const down = ([x, y]: P2, by: number): P2 => [x, y + by];

/** The point `distance` px from `from`, heading toward `to`. */
function toward(from: P2, to: P2, distance: number): P2 {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy) || 1;
  return [
    from[0] + (dx / length) * distance,
    from[1] + (dy / length) * distance,
  ];
}

/** Midpoint (t = 0.5) of the quadratic curve from `a` to `b` with control `c`. */
const curveMid = (a: P2, c: P2, b: P2): P2 => [
  a[0] / 4 + c[0] / 2 + b[0] / 4,
  a[1] / 4 + c[1] / 2 + b[1] / 4,
];

/** A closed outline through `points` with every corner rounded to `radius` px. */
function roundedLoop(points: P2[], radius: number) {
  const count = points.length;
  const parts = points.map((corner, index) => {
    const enter = toward(corner, points[(index + count - 1) % count], radius);
    const leave = toward(corner, points[(index + 1) % count], radius);
    return `${index === 0 ? "M" : "L"}${fmt(enter)} Q${fmt(corner)} ${fmt(leave)}`;
  });
  return `${parts.join(" ")} Z`;
}

/** An open line through `points` with its bends rounded to `radius` px. */
function roundedLine(points: P2[], radius: number) {
  const last = points.length - 1;
  return points
    .map((point, index) => {
      if (index === 0) return `M${fmt(point)}`;
      if (index === last) return `L${fmt(point)}`;
      const before = points[index - 1];
      const after = points[index + 1];
      // Never round more than half of either neighbouring segment.
      const reach = Math.min(
        radius,
        Math.hypot(point[0] - before[0], point[1] - before[1]) / 2,
        Math.hypot(point[0] - after[0], point[1] - after[1]) / 2,
      );
      return `L${fmt(toward(point, before, reach))} Q${fmt(point)} ${fmt(toward(point, after, reach))}`;
    })
    .join(" ");
}

/** Unrounded projection, for geometry that is rounded once at the end. */
const flat = ([x, y, z = 0]: Point3, scale: number): P2 => [
  (x - y) * COS * scale,
  (x + y) * SIN * scale - z * scale,
];

/** SVG path `d` for a line through 3D points, with softened bends. */
export function isoLine(points: Point3[], scale: number, bend = 0) {
  return roundedLine(
    points.map((point) => flat(point, scale)),
    bend * scale,
  );
}

/** Line weight for every isometric drawing. 1px hairlines alias on the
 * 30-degree diagonals; 1.25px with round joins reads as a clean line. */
const STROKE = 1.25;

/**
 * Tones. Blueprint style: white tops, pale blue sides, blue line work.
 * "accent" marks whatever is verified or paid; "wire" is an outline only.
 */
const TONES = {
  paper: {
    top: "fill-background-primary-default",
    left: "fill-brand-blue-50",
    right: "fill-brand-blue-100",
    stroke: "stroke-brand-blue-400",
  },
  blue: {
    top: "fill-brand-blue-200",
    left: "fill-brand-blue-400",
    right: "fill-brand-blue-500",
    stroke: "stroke-brand-blue-600",
  },
  accent: {
    top: "fill-accent-300",
    left: "fill-accent-400",
    right: "fill-accent-500",
    stroke: "stroke-accent-600",
  },
  amber: {
    top: "fill-chart-8",
    left: "fill-chart-8-active",
    right: "fill-chart-8-active",
    stroke: "stroke-chart-8-active",
  },
  wire: {
    top: "fill-transparent",
    left: "fill-transparent",
    right: "fill-transparent",
    stroke: "stroke-brand-blue-300",
  },
} as const;

export type IsoTone = keyof typeof TONES;

interface IsoBoxProps {
  /** Centre of the box on the ground plane. */
  at: [x: number, y: number];
  /** Width (along x), depth (along y), height (along z), in units. */
  size: [w: number, d: number, h: number];
  /** Height of the box's underside above the ground. */
  z?: number;
  scale: number;
  tone?: IsoTone;
  dashed?: boolean;
  /** Paint server for the two side faces, e.g. `url(#gradient-id)`. Overrides the tone. */
  sideFill?: { left: string; right: string };
  /** Corner radius in units. Defaults to 14% of the shorter side, at most 0.3. */
  radius?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * A box seen from above-front, with rounded vertical edges: a rounded top
 * face, and a skirt (the two visible sides) that follows the same curve.
 *
 * The skirt is the lower half of the top outline dropped by the box's height
 * and joined back up at the leftmost and rightmost points of the corners.
 * It is filled in two pieces, split at the front corner, so the left and
 * right faces keep their own shade.
 */
export function IsoBox({
  at,
  size,
  z = 0,
  scale,
  tone = "paper",
  dashed,
  sideFill,
  radius,
  className,
  style,
  children,
}: IsoBoxProps) {
  const [cx0, cy0] = at;
  const [w, d, h] = size;
  const x0 = cx0 - w / 2;
  const x1 = cx0 + w / 2;
  const y0 = cy0 - d / 2;
  const y1 = cy0 + d / 2;
  const zt = z + h;
  const t = TONES[tone];
  const drop = h * scale;
  const rad = (radius ?? Math.min(0.3, Math.min(w, d) * 0.14)) * scale;

  // Top face corners on screen: back (top), right, front (bottom), left.
  const back = flat([x0, y0, zt], scale);
  const right = flat([x1, y0, zt], scale);
  const front = flat([x1, y1, zt], scale);
  const left = flat([x0, y1, zt], scale);

  // The same corners on the box's underside.
  const rightLow = down(right, drop);
  const frontLow = down(front, drop);
  const leftLow = down(left, drop);
  const backLow = down(back, drop);

  // Where each rounded corner of the underside starts and ends.
  const leftOut = toward(leftLow, frontLow, rad);
  const frontIn = toward(frontLow, leftLow, rad);
  const frontOut = toward(frontLow, rightLow, rad);
  const rightIn = toward(rightLow, frontLow, rad);

  // Extreme points of the rounded corners: where the silhouette turns.
  const leftEdgeLow = curveMid(toward(leftLow, backLow, rad), leftLow, leftOut);
  const rightEdgeLow = curveMid(
    rightIn,
    rightLow,
    toward(rightLow, backLow, rad),
  );
  const frontEdgeLow = curveMid(frontIn, frontLow, frontOut);
  const leftEdge = down(leftEdgeLow, -drop);
  const rightEdge = down(rightEdgeLow, -drop);
  const frontEdge = down(frontEdgeLow, -drop);

  // Underside outline, left extreme to front extreme to right extreme.
  const lowLeft = `Q${fmt(mid(leftLow, leftOut))} ${fmt(leftOut)} L${fmt(frontIn)} Q${fmt(mid(frontIn, frontLow))} ${fmt(frontEdgeLow)}`;
  const lowRight = `Q${fmt(mid(frontLow, frontOut))} ${fmt(frontOut)} L${fmt(rightIn)} Q${fmt(mid(rightIn, rightLow))} ${fmt(rightEdgeLow)}`;

  return (
    <g
      className={cx(t.stroke, className)}
      style={style}
      strokeWidth={STROKE}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={dashed ? "3 4" : undefined}
    >
      {/* Left and right faces: fills only, the outline is drawn once below. */}
      <path
        stroke="none"
        className={sideFill ? undefined : t.left}
        fill={sideFill?.left}
        d={`M${fmt(leftEdge)} L${fmt(leftEdgeLow)} ${lowLeft} L${fmt(frontEdge)} Z`}
      />
      <path
        stroke="none"
        className={sideFill ? undefined : t.right}
        fill={sideFill?.right}
        d={`M${fmt(frontEdge)} L${fmt(frontEdgeLow)} ${lowRight} L${fmt(rightEdge)} Z`}
      />
      {/* Silhouette of the skirt: down the left, round the underside, up the right. */}
      <path
        fill="none"
        d={`M${fmt(leftEdge)} L${fmt(leftEdgeLow)} ${lowLeft} ${lowRight} L${fmt(rightEdge)}`}
      />
      {/* Top face. */}
      <path
        className={t.top}
        d={roundedLoop([back, right, front, left], rad)}
      />
      {children}
    </g>
  );
}

interface IsoWireProps {
  /** Path through 3D grid points, in the direction the signal travels. */
  points: Point3[];
  scale: number;
  /** blue = raw input on its way in; accent = verified output on its way out. */
  tone?: "blue" | "accent";
  /** Stagger for the travelling pulse, in ms. */
  delay?: number;
  /** Draw the wire itself thick and in colour: the one route being highlighted. */
  strong?: boolean;
}

/**
 * A connector on the ground with one pulse travelling along it. The pulse is a
 * single dash on a path normalised to length 100, moved with
 * stroke-dashoffset (`.iso-pulse` in styles/brand.css), so every wire pulses
 * at the same speed whatever its length.
 */
export function IsoWire({
  points,
  scale,
  tone = "blue",
  delay = 0,
  strong,
}: IsoWireProps) {
  // Bends are rounded so a pulse sweeps round a corner instead of snapping.
  const d = isoLine(points, scale, 0.45);
  const [ex, ey] = project(points[points.length - 1], scale);

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d={d}
        className={
          strong
            ? tone === "accent"
              ? "stroke-accent-400"
              : "stroke-brand-blue-400"
            : "stroke-border-button-hover"
        }
        strokeWidth={strong ? 4.5 : STROKE}
      />
      <path
        d={d}
        pathLength={100}
        className={cx(
          "iso-pulse",
          // On a strong wire the pulse is white, so it shows against the colour.
          strong ? "stroke-text-white" : tone === "accent" ? "stroke-accent-400" : "stroke-brand-blue-400",
        )}
        style={{ "--d": `${delay}ms` } as CSSProperties}
        strokeWidth={2.5}
        strokeDasharray="12 88"
        strokeDashoffset={12}
      />
      <circle
        cx={ex}
        cy={ey}
        r={2.5}
        strokeWidth={STROKE}
        className="fill-background-primary-default stroke-border-button-hover"
      />
    </g>
  );
}

interface IsoLabelProps {
  /** Grid point the label sits above. */
  at: Point3;
  scale: number;
  children: string;
  /** Extra lift above the point, in px. */
  lift?: number;
  className?: string;
}

interface IsoStampProps {
  /** Grid point at the centre of the stamp (use the top of the surface for z). */
  at: Point3;
  scale: number;
  /** Width of the logo along the surface, in px (before projection). */
  width: number;
}

/**
 * The logo printed flat on a horizontal surface, in true isometric
 * projection: its edges run parallel to the edges of the tile it sits on.
 *
 * The image's own axes are mapped onto the two ground axes of the drawing.
 * Its width runs up-and-right (30 degrees above horizontal) and its height
 * runs down-and-right (30 degrees below), the standard orientation for
 * artwork on the top face of an isometric object. Both axis vectors have
 * length 1, so the logo keeps its size along the surface.
 *
 * (Sprint 3 first shipped this as a plain vertical squash, which kept the
 * logo upright on screen and so at 45 degrees to the tile. That was wrong.)
 */
export function IsoStamp({ at, scale, width }: IsoStampProps) {
  const [x, y] = project(at, scale);
  const height = width * (80 / 77);
  const c = r(COS * 1000) / 1000;
  return (
    <image
      href="/logo.webp"
      width={width}
      height={r(height)}
      // Read right to left: centre the image on its own origin, lay it on
      // the ground plane, then move it to the stamp point.
      transform={`translate(${x} ${y}) matrix(${c} ${-SIN} ${c} ${SIN} 0 0) translate(${r(-width / 2)} ${r(-height / 2)})`}
    />
  );
}

/** A flat pill label floating above a grid point. Not skewed, so it stays readable. */
export function IsoLabel({
  at,
  scale,
  children,
  lift = 22,
  className,
}: IsoLabelProps) {
  const [x, y] = project(at, scale);
  const width = children.length * 6.6 + 18;

  return (
    <g className={className} transform={`translate(${x} ${r(y - lift)})`}>
      <rect
        x={r(-width / 2)}
        y={-11}
        width={r(width)}
        height={22}
        rx={7}
        className="fill-background-primary-default stroke-border-button-default"
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-text-primary text-caption-1-medium"
      >
        {children}
      </text>
    </g>
  );
}

interface IsoDiscProps {
  /** Centre on the ground plane. */
  at: [x: number, y: number];
  /** Radius and height, in units. */
  radius: number;
  height: number;
  z?: number;
  scale: number;
  tone?: IsoTone;
  className?: string;
  style?: CSSProperties;
}

/**
 * A short cylinder (a coin, a puck). A circle lying on the ground projects
 * to an ellipse 1.2247 times its radius wide and 0.7071 times tall.
 */
export function IsoDisc({ at, radius, height, z = 0, scale, tone = "paper", className, style }: IsoDiscProps) {
  const t = TONES[tone];
  const [x, top] = project([at[0], at[1], z + height], scale);
  const bottom = r(top + height * scale);
  const rx = r(radius * scale * Math.SQRT2 * COS);
  const ry = r(radius * scale * Math.SQRT2 * SIN);

  return (
    <g className={cx(t.stroke, className)} style={style} strokeWidth={STROKE} strokeLinejoin="round">
      <path
        className={t.right}
        d={`M${r(x - rx)} ${top} L${r(x - rx)} ${bottom} A${rx} ${ry} 0 0 0 ${r(x + rx)} ${bottom} L${r(x + rx)} ${top} Z`}
      />
      <ellipse cx={x} cy={top} rx={rx} ry={ry} className={t.top} />
    </g>
  );
}

interface IsoPanelProps {
  /** Bottom-left corner of the panel. It stands in the x-z plane, facing the viewer's left. */
  at: Point3;
  /** Width along x and height along z, in units. */
  size: [w: number, h: number];
  scale: number;
  className?: string;
  style?: CSSProperties;
  /** Drawn in the panel's own flat coordinates: x from 0 to width px, y from -height px (top) to 0 (bottom). */
  children?: ReactNode;
}

/**
 * An upright card standing in the scene, like a screen. Its content is drawn
 * flat and sheared 30 degrees with the panel, so text on it stays legible.
 */
export function IsoPanel({ at, size, scale, className, style, children }: IsoPanelProps) {
  const [x, y] = project(at, scale);
  const width = r(size[0] * scale);
  const height = r(size[1] * scale);
  const c = r(COS * 1000) / 1000;

  return (
    <g className={className} style={style}>
      <g transform={`translate(${x} ${y}) matrix(${c} ${SIN} 0 1 0 0)`}>
        <rect
          x={0}
          y={-height}
          width={width}
          height={height}
          rx={10}
          strokeWidth={STROKE}
          className="fill-background-primary-default stroke-brand-blue-400"
        />
        {children}
      </g>
    </g>
  );
}

interface IsoShieldProps {
  /** Grid point at the centre of the icon (use the top of the surface for z). */
  at: Point3;
  scale: number;
  /** Size of the icon along the surface, in px. */
  size: number;
  /** Paint for the shield, e.g. `url(#gradient-id)`. Defaults to the accent. */
  fill?: string;
}

/**
 * A shield with a tick, printed flat on a horizontal surface with the same
 * projection as IsoStamp. A plain icon reads more clearly than the full logo
 * at this size and angle, where the logo's fine detail closes up.
 */
export function IsoShield({ at, scale, size, fill }: IsoShieldProps) {
  const [x, y] = project(at, scale);
  const c = r(COS * 1000) / 1000;
  const k = r((size / 24) * 1000) / 1000;
  return (
    <g transform={`translate(${x} ${y}) matrix(${c} ${-SIN} ${c} ${SIN} 0 0) scale(${k}) translate(-12 -12)`}>
      <path
        d="M12 2.5 4 5.4v6.1c0 4.7 3.2 8.6 8 10 4.8-1.4 8-5.3 8-10V5.4l-8-2.9Z"
        className={fill ? undefined : "fill-accent-500"}
        fill={fill}
      />
      <path
        d="m8.4 12.2 2.5 2.5 4.8-5.2"
        fill="none"
        className="stroke-text-white"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
