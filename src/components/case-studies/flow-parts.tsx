
// Shared data, timing and SVG definitions for the Listing intelligence flow (listing-flow.tsx).
// One 10s loop (SVG SMIL): dots travel from the sources to their own row in the output card.

export const T = 10;
export const INK = "#161514";
export const MUTED = "#8a857d";
export const LINE = "#ddd8ce";
export const CARD = "#ffffff";
export const GREEN = "#19c37d";
const DEEP = "#0b0d0c";
export const sans = { fontFamily: "var(--font-geist-sans), system-ui, sans-serif" };
export const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };

export const kt = (...secs: number[]) => secs.map((s) => Math.min(1, Math.max(0, s / T)).toFixed(3)).join(";");

export type IconKind = "file" | "csv" | "market" | "brand" | "template";
type Box = { title: string; sub: string; sub2?: string; icon: IconKind; x: number; y: number; w: number };

export const imports: Omit<Box, "x" | "y" | "w">[] = [
  { title: "Import a file", sub: "Upload product data", icon: "file" },
  { title: "Import a CSV", sub: "Bulk catalogue upload", icon: "csv" },
  { title: "Import from marketplace", sub: "Account integration", icon: "market" },
];
export const brand = { title: "Brand setup", sub: "Moodboard · Social media", icon: "brand" } as const;
export const template = { title: "System template", sub: "Visual hierarchy · Category", icon: "template" } as const;

export const checks = [
  { title: "Quality check", items: ["Category mapping", "Content completeness", "Listing score"], y: 118 },
  { title: "System checks", items: ["Product ranking", "Data validation", "Brand validation"], y: 330 },
];
export const rows = [
  { id: "OT_1720010", tag: "Lifestyle", score: 15 },
  { id: "OT_2924410", tag: "Infographics", score: 35 },
  { id: "OT_3474510", tag: "A+ None", score: 45 },
  { id: "OT_2320110", tag: "A+ Premium", score: 90 },
  { id: "OT_4420110", tag: "A+ Basic", score: 70 },
];
export const tone = (s: number) =>
  s >= 70
    ? { fg: "#12955f", bg: "#e4f6ed" }
    : s >= 35
      ? { fg: "#b7791f", bg: "#fbf0dc" }
      : { fg: "#d2553f", bg: "#fbe6e1" };

/** Engine → one of the checks → row `i` of the output card. */
export const START = (i: number) => 0.2 + i * 0.55;
export const TRAVEL = 4.6;
export const ARRIVE = (i: number) => START(i) + TRAVEL;

/** Shared SVG definitions; ids are prefixed per diagram so two diagrams never collide. */
export function Defs({ id, width }: { id: string; width: number }) {
  return (
    <defs>
      <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
        <rect x={10} y={10} width={1.6} height={1.6} fill={INK} fillOpacity={0.12} />
      </pattern>
      <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="60%">
        <stop offset="40%" stopColor="#fff" />
        <stop offset="100%" stopColor="#fff" stopOpacity={0} />
      </radialGradient>
      <mask id={`${id}-mask`}>
        <rect width={width} height="560" fill={`url(#${id}-fade)`} />
      </mask>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#161514" floodOpacity="0.08" />
      </filter>
      <filter id={`${id}-soft`} x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#161514" floodOpacity="0.05" />
      </filter>
      <radialGradient id={`${id}-engine`} cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#1d2421" />
        <stop offset="100%" stopColor={DEEP} />
      </radialGradient>
      <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}
