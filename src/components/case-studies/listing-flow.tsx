import type { ReactNode } from "react";
import {
  ARRIVE,
  CARD,
  Defs,
  GREEN,
  INK,
  LINE,
  MUTED,
  START,
  T,
  TRAVEL,
  brand,
  checks,
  imports,
  kt,
  mono,
  rows,
  sans,
  template,
  tone,
} from "./flow-parts";

// The homepage visual for "AI Powered Marketplace Listing Platform": product data from the
// sources runs through the AI engine and both checks into scored listings. FlowE is the wide
// version (from 1024px); FlowEVertical runs top to bottom for narrower screens.

// Type scale. BUMP nudges every size up for readability.
const BUMP = 1;
const TY = Object.fromEntries(
  Object.entries({ caption: 12, title: 15, sub: 12, checkTitle: 16, item: 13, rowId: 13, tag: 10.5, score: 19, unit: 11, header: 15, engine: 15, engineSub: 12 }).map(
    ([k, v]) => [k, v + BUMP],
  ),
) as Record<"caption" | "title" | "sub" | "checkTitle" | "item" | "rowId" | "tag" | "score" | "unit" | "header" | "engine" | "engineSub", number>;

// ── Shared parts ──────────────────────────────────────────────────────────────────────────

function Port({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={4} fill={CARD} stroke={INK} strokeWidth={1.3} />;
}
function Junction({ x, y }: { x: number; y: number }) {
  return <rect x={x - 6} y={y - 6} width={12} height={12} fill={CARD} stroke={INK} strokeWidth={1.3} />;
}
function Caption({ x, y, children, anchor }: { x: number; y: number; children: ReactNode; anchor?: "end" }) {
  return (
    <text x={x} y={y} fontSize={TY.caption} letterSpacing={1.8} fill={MUTED} textAnchor={anchor} style={mono}>
      {children}
    </text>
  );
}

const CHECK_W = 240;
const itemGap = TY.item + 12;
const checkH = 20 + TY.checkTitle + 18 + itemGap * 2 + TY.item + 22;

function CheckCard({ x, y, ci, pass, id }: { x: number; y: number; ci: number; pass: number; id: string }) {
  const c = checks[ci];
  const titleY = y + 20 + TY.checkTitle;
  return (
    <g filter={`url(#${id}-soft)`}>
      <rect x={x} y={y} width={CHECK_W} height={checkH} rx={18} fill={CARD} stroke={LINE} />
      <text x={x + 20} y={titleY} fontSize={TY.checkTitle} fill={INK} style={sans}>
        {c.title}
      </text>
      {c.items.map((item, k) => {
        const at = pass + k * 0.3;
        const iy = titleY + 18 + TY.item + k * itemGap;
        return (
          <g key={item}>
            <rect x={x + 20} y={iy - 12} width={14} height={14} rx={3.5} fill="#f2efe9" stroke={LINE} />
            <g opacity={0}>
              <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" values="0;0;1;1;0" keyTimes={kt(0, at, at + 0.2, 9.4, T)} />
              <rect x={x + 20} y={iy - 12} width={14} height={14} rx={3.5} fill={GREEN} />
              <path d={`M${x + 23.5} ${iy - 5}l2.8 2.8 5-5.2`} fill="none" stroke="#fff" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x={x + 44} y={iy} fontSize={TY.item} fill="#4a4741" style={mono}>
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
}

const OUT_W = 340;
const OUT_HEAD = 56;
const ROW = 62;
const outH = OUT_HEAD + rows.length * ROW + 10;

function OutputCard({ x, top, id }: { x: number; top: number; id: string }) {
  return (
    <g>
      <g filter={`url(#${id}-shadow)`}>
        <rect x={x} y={top} width={OUT_W} height={outH} rx={22} fill={CARD} stroke={LINE} />
      </g>
      <circle cx={x + 24} cy={top + 29} r={4.5} fill={GREEN}>
        <animate attributeName="opacity" dur="1.6s" repeatCount="indefinite" values="1;0.3;1" />
      </circle>
      <text x={x + 38} y={top + 34} fontSize={TY.header} fill={INK} style={sans}>
        Marketplace-ready listings
      </text>
      <line x1={x} y1={top + OUT_HEAD - 4} x2={x + OUT_W} y2={top + OUT_HEAD - 4} stroke={LINE} />
      {rows.map((r, i) => {
        const cy = top + OUT_HEAD + ROW / 2 + i * ROW;
        const at = ARRIVE(i);
        const t = tone(r.score);
        const bar = (r.score / 100) * 96;
        const right = x + OUT_W - 18;
        return (
          <g key={r.id}>
            {i > 0 && <line x1={x + 18} y1={cy - ROW / 2} x2={right} y2={cy - ROW / 2} stroke="#efebe4" />}
            <g>
              <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" values="1;1;0;0;1" keyTimes={kt(0, at, at + 0.3, 9.4, T)} />
              <rect x={x + 18} y={cy - 16} width={32} height={32} rx={9} fill="#f2efe9" />
              <rect x={x + 62} y={cy - 11} width={88} height={8} rx={4} fill="#efebe4" />
              <rect x={x + 62} y={cy + 5} width={56} height={7} rx={3.5} fill="#f4f1eb" />
              <rect x={right - 76} y={cy - 11} width={76} height={8} rx={4} fill="#efebe4" />
            </g>
            <g opacity={0}>
              <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" values="0;0;1;1;0" keyTimes={kt(0, at, at + 0.35, 9.4, T)} />
              <rect x={x + 18} y={cy - 16} width={32} height={32} rx={9} fill={t.bg} />
              <rect x={x + 29} y={cy - 5} width={10} height={10} rx={2} fill={t.fg} />
              <text x={x + 62} y={cy - 3} fontSize={TY.rowId} fill={INK} style={mono}>
                {r.id}
              </text>
              <rect x={x + 62} y={cy + 4} width={r.tag.length * TY.tag * 0.63 + 16} height={17} rx={8.5} fill={t.bg} />
              <text x={x + 70} y={cy + 16} fontSize={TY.tag} fill={t.fg} style={mono}>
                {r.tag}
              </text>
              <text x={right} y={cy - 1} textAnchor="end" fontSize={TY.score} fill={t.fg} style={sans}>
                {r.score}
                <tspan fontSize={TY.unit} fill={MUTED} style={mono}>
                  {" "}/100
                </tspan>
              </text>
              <rect x={right - 96} y={cy + 10} width={96} height={4} rx={2} fill="#f2efe9" />
              <rect x={right - 96} y={cy + 10} width={0} height={4} rx={2} fill={t.fg}>
                <animate attributeName="width" dur={`${T}s`} repeatCount="indefinite" values={`0;0;${bar};${bar};0`} keyTimes={kt(0, at + 0.1, at + 0.9, 9.4, T)} />
              </rect>
            </g>
          </g>
        );
      })}
    </g>
  );
}

/** A dot travelling `path` between `from` and `to` seconds. */
function Dot({ path, from, to, id, size = 8 }: { path: string; from: number; to: number; id: string; size?: number }) {
  const h = size / 2;
  return (
    <g opacity={0}>
      <animateMotion path={path} dur={`${T}s`} repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes={kt(0, from, to, T)} />
      <animate attributeName="opacity" dur={`${T}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={kt(0, from - 0.01, from, to - 0.04, to, T)} />
      <rect x={-h - 3} y={-h - 3} width={size + 6} height={size + 6} rx={3} fill={GREEN} opacity={0.42} filter={`url(#${id}-glow)`} />
      <rect x={-h} y={-h} width={size} height={size} rx={size / 5} fill={GREEN} />
    </g>
  );
}

/** The SVG canvas: dot-grid backdrop, shared defs, and an accessible label. */
function Frame({
  id,
  w,
  h,
  label,
  view = `0 0 ${w} ${h}`,
  children,
}: {
  id: string;
  w: number;
  h: number;
  label: string;
  view?: string; // viewBox, when the drawing should be cropped to its content
  children: ReactNode;
}) {
  const [vx, vy, vw, vh] = view.split(" ").map(Number);
  // overflow-visible lets card shadows spill past a viewBox cropped to the content; the dot
  // grid stays inside the viewBox.
  return (
    <svg viewBox={view} className="h-auto w-full overflow-visible" role="img" aria-label={label}>
      <Defs id={id} width={w} />
      <rect x={vx} y={vy} width={vw} height={vh} fill={`url(#${id}-dots)`} mask={`url(#${id}-mask)`} />
      {children}
    </svg>
  );
}

const ARIA =
  "Product data from files, CSVs and marketplaces travels along one line: brand setup and system templates are applied, an AI engine processes it, quality and system checks run, and it comes out as scored, marketplace-ready listings.";

const BRAIN =
  "M5.00041 3.00004C4.64575 2.99994 4.29743 3.09415 3.99117 3.27303C3.68491 3.4519 3.43173 3.70899 3.25757 4.01796C3.08341 4.32692 2.99455 4.67664 3.00009 5.03127C3.00562 5.38589 3.10536 5.73266 3.28908 6.03604C2.83277 6.12421 2.4214 6.36849 2.12558 6.72693C1.82977 7.08538 1.66797 7.53563 1.66797 8.00037C1.66797 8.46512 1.82977 8.91537 2.12558 9.27382C2.4214 9.63226 2.83277 9.87654 3.28908 9.96471M5.00041 3.00004C5.00041 2.55801 5.17601 2.13409 5.48857 1.82153C5.80113 1.50897 6.22505 1.33337 6.66708 1.33337C7.10911 1.33337 7.53303 1.50897 7.84559 1.82153C8.15815 2.13409 8.33375 2.55801 8.33375 3.00004V4.00004M5.00041 3.00004C5.00041 3.54537 5.26241 4.02937 5.66708 4.33337M4.33375 9.11337C3.89763 9.26759 3.52845 9.56887 3.28908 9.96471C3.10553 10.2681 3.00593 10.6148 3.00048 10.9693C2.99503 11.3238 3.08393 11.6734 3.25807 11.9823C3.4322 12.2911 3.68532 12.5482 3.99148 12.727C4.29764 12.9058 4.64585 13.0001 5.00041 13C5.00041 13.4421 5.17601 13.866 5.48857 14.1786C5.80113 14.4911 6.22505 14.6667 6.66708 14.6667C7.10911 14.6667 7.53303 14.4911 7.84559 14.1786C8.15815 13.866 8.33375 13.4421 8.33375 13V12M10.0004 10V11.3334M12.0004 10V11.3334M10.0004 4.66671V6.00004M12.0004 4.66671V6.00004M9.00041 7.00004H7.66708M9.00041 9.00004H7.66708M14.3337 7.00004H13.0004M14.3337 9.00004H13.0004M11.6671 6.00004H10.3337C9.70508 6.00004 9.39108 6.00004 9.19575 6.19537C9.00041 6.39071 9.00041 6.70471 9.00041 7.33337V8.66671C9.00041 9.29537 9.00041 9.60937 9.19575 9.80471C9.39108 10 9.70508 10 10.3337 10H11.6671C12.2957 10 12.6097 10 12.8051 9.80471C13.0004 9.60937 13.0004 9.29537 13.0004 8.66671V7.33337C13.0004 6.70471 13.0004 6.39071 12.8051 6.19537C12.6097 6.00004 12.2957 6.00004 11.6671 6.00004Z";

const textCardH = (sub2?: string) => 20 + TY.title + 8 + TY.sub + (sub2 ? 6 + TY.sub : 0) + 20;

// Sources: one clean white card; the three options are rows split by an "OR" divider.
const SRC_ROW = textCardH() + 28;
const SRC_H = SRC_ROW * 3;

function SourcesCard({ x, top, w, id }: { x: number; top: number; w: number; id: string }) {
  return (
    <g>
      <g filter={`url(#${id}-soft)`}>
        <rect x={x} y={top} width={w} height={SRC_H} rx={18} fill={CARD} stroke={LINE} />
      </g>
      {imports.map((s, k) => {
        const rowTop = top + k * SRC_ROW;
        const titleY = rowTop + (SRC_ROW - TY.title - 8 - TY.sub) / 2 + TY.title - 2;
        return (
          <g key={s.title}>
            <text x={x + 20} y={titleY} fontSize={TY.title} fill={INK} style={sans}>
              {s.title}
            </text>
            <text x={x + 20} y={titleY + 8 + TY.sub} fontSize={TY.sub} fill={MUTED} style={mono}>
              {s.sub}
            </text>
            {k < 2 && (
              <g>
                <line x1={x + 20} y1={rowTop + SRC_ROW} x2={x + w - 20} y2={rowTop + SRC_ROW} stroke="#efebe4" />
                <rect x={x + w / 2 - 16} y={rowTop + SRC_ROW - 9} width={32} height={18} rx={9} fill="#f4f1eb" />
                <text x={x + w / 2} y={rowTop + SRC_ROW + 4} textAnchor="middle" fontSize={10} letterSpacing={1.2} fill={MUTED} style={mono}>
                  OR
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

// AI engine: green ripples spread from a light core with the brain icon.
const R = 38;

function AiEngine({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <circle
          key={k}
          className="flow-ripple"
          style={{ animationDelay: `${k * -1}s` }}
          cx={x}
          cy={y}
          r={R}
          fill={GREEN}
          fillOpacity={0.05}
          stroke={GREEN}
          strokeOpacity={0.55}
          strokeWidth={1}
        />
      ))}
      <circle className="flow-spin" cx={x} cy={y} r={R + 11} fill="none" stroke={GREEN} strokeOpacity={0.6} strokeDasharray="2 7" />
      <circle cx={x} cy={y} r={R} fill={CARD} stroke={LINE} filter={`url(#${id}-soft)`} />
      <g transform={`translate(${x - 17.6} ${y - 17.6}) scale(2.2)`}>
        <path d={BRAIN} fill="none" stroke={INK} strokeWidth={0.68} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Text-only card: title and mono subtitle(s). */
function TextCard({ x, top, w, title, sub, sub2, id, flat }: { x: number; top: number; w: number; title: string; sub: string; sub2?: string; id: string; flat?: boolean }) {
  const titleY = top + 20 + TY.title;
  const subY = titleY + 8 + TY.sub;
  return (
    <g filter={flat ? undefined : `url(#${id}-soft)`}>
      <rect x={x} y={top} width={w} height={textCardH(sub2)} rx={14} fill={CARD} stroke={LINE} />
      <text x={x + 18} y={titleY} fontSize={TY.title} fill={INK} style={sans}>
        {title}
      </text>
      <text x={x + 18} y={subY} fontSize={TY.sub} fill={MUTED} style={mono}>
        {sub}
      </text>
      {sub2 && (
        <text x={x + 18} y={subY + 6 + TY.sub} fontSize={TY.sub} fill={MUTED} style={mono}>
          {sub2}
        </text>
      )}
    </g>
  );
}

export function FlowE() {
  const id = "mf-e";
  const W = 1568;
  const H = 510; // content ends ~482
  const Y = 290; // spine: column captions sit ~55 units above the first boxes
  // Crop to the drawing, flush left and right so it lines up with the text. Above and below,
  // the same GAP separates caption → first box and last box → separator, and the captions
  // sit GAP below the top separator. Boxes span y 99–481; caption caps are ~10 units tall.
  const GAP = 28;
  const CAP = 99 - GAP; // column caption baseline
  const viewTop = CAP - 10 - GAP;
  const view = `30 ${viewTop} ${1544 - 30} ${481 + GAP - viewTop}`;

  const srcX = 30;
  const srcW = 240;
  const srcTop = Y - SRC_H / 2;
  const srcR = srcX + srcW;

  // Prepare: brand above the spine, template below, close together
  const prepW = 200;
  const prepH = textCardH("x");
  const brandX = 306;
  const tplX = 400;
  const brandJ = brandX + prepW / 2;
  const tplJ = tplX + prepW / 2;
  const brandBottom = Y - 58;
  const tplTop = Y + 58;

  // AI engine, then the checks branching up and down from it
  const engineX = 694;
  const checksX = 846;
  const checkJ = checksX + CHECK_W / 2;
  const qTop = Y - 48 - checkH;
  const sTop = Y + 48;
  const qY = qTop + checkH / 2;
  const sY = sTop + checkH / 2;

  const outX = W - 24 - OUT_W;
  const outTop = Y - outH / 2;
  const end = outX + 14;

  // Each product travels as one dot to the engine, splits so both checks run at the same
  // time, then the halves rejoin below / above the checks and carry on to the output.
  const route = (up: boolean) => {
    const by = up ? qY : sY;
    return `M${srcR} ${Y} L${engineX} ${Y} L${engineX} ${by} L${checkJ} ${by} L${checkJ} ${Y} L${end} ${Y}`;
  };
  const rise = Y - qY;
  const total = engineX - srcR + rise + (checkJ - engineX) + rise + (end - checkJ);
  const at = (i: number, dist: number) => START(i) + (TRAVEL * dist) / total;
  const checksAt = at(0, engineX - srcR + rise + (checksX - engineX)) + 0.3;

  return (
    <Frame id={id} w={W} h={H} label={ARIA} view={view}>
      <Caption x={srcX} y={CAP}>SOURCES</Caption>
      <Caption x={brandX} y={CAP}>PREPARE</Caption>
      <Caption x={engineX - 34} y={CAP}>AI ENGINE</Caption>
      <Caption x={checksX} y={CAP}>CHECKS</Caption>
      <Caption x={outX} y={CAP}>OUTPUT</Caption>

      {/* Lines */}
      <g fill="none" stroke={LINE} strokeWidth={1.3}>
        <path d={`M${srcR} ${Y} H${engineX - R}`} />
        <path d={`M${brandJ} ${brandBottom} V${Y}`} />
        <path d={`M${tplJ} ${Y} V${tplTop}`} />
        <path d={`M${engineX} ${Y - R} V${qY} H${checksX}`} />
        <path d={`M${engineX} ${Y + R} V${sY} H${checksX}`} />
        <path d={`M${checkJ} ${qTop + checkH} V${sTop}`} />
        <path d={`M${checkJ} ${Y} H${end}`} />
        {/* engine → junction between the checks, so the main line reads as continuous */}
        <path d={`M${engineX + R} ${Y} H${checkJ}`} />
      </g>

      <g className="flow-packets">
        {rows.map((_, i) => (
          <g key={i}>
            <Dot path={route(true)} from={START(i)} to={ARRIVE(i)} id={id} />
            <Dot path={route(false)} from={START(i)} to={ARRIVE(i)} id={id} />
            {i % 2 === 0 ? (
              <Dot path={`M${brandJ} ${brandBottom} V${Y}`} from={at(i, brandJ - srcR) - 0.4} to={at(i, brandJ - srcR)} id={id} size={6} />
            ) : (
              <Dot path={`M${tplJ} ${tplTop} V${Y}`} from={at(i, tplJ - srcR) - 0.4} to={at(i, tplJ - srcR)} id={id} size={6} />
            )}
          </g>
        ))}
      </g>

      <SourcesCard x={srcX} top={srcTop} w={srcW} id={id} />
      <Port x={srcR} y={Y} />

      {/* Prepare */}
      <TextCard x={brandX} top={brandBottom - prepH} w={prepW} title={brand.title} sub="Moodboard" sub2="Social media" id={id} />
      <Port x={brandJ} y={brandBottom} />
      <Junction x={brandJ} y={Y} />
      <TextCard x={tplX} top={tplTop} w={prepW} title={template.title} sub="Visual hierarchy" sub2="Category" id={id} />
      <Port x={tplJ} y={tplTop} />
      <Junction x={tplJ} y={Y} />

      <AiEngine x={engineX} y={Y} id={id} />
      <Junction x={engineX} y={qY} />
      <Junction x={engineX} y={sY} />

      {/* Checks run together */}
      <CheckCard x={checksX} y={qTop} ci={0} pass={checksAt} id={id} />
      <Port x={checksX} y={qY} />
      <Port x={checkJ} y={qTop + checkH} />
      <CheckCard x={checksX} y={sTop} ci={1} pass={checksAt} id={id} />
      <Port x={checksX} y={sY} />
      <Port x={checkJ} y={sTop} />
      <Junction x={checkJ} y={Y} />

      <OutputCard x={outX} top={outTop} id={id} />
      <Port x={outX} y={Y} />
    </Frame>
  );
}

// ── Option E, vertical: phones and tablets ───────────────────────────────────────────────
// The same story top to bottom on a narrow canvas (340 units, about the width of a phone
// column), so the type stays readable: sources → prepare (brand left, template right) →
// engine → the two checks in turn → output, all on one centre spine.

export function FlowEVertical() {
  const id = "mf-ev";
  const W = OUT_W; // 340: the output card spans the full width
  const X = W / 2; // spine
  const GAP = 28; // separator → caption, caption → box, box → next caption's space
  const STEP = 44; // box bottom → next caption baseline
  const CAP_H = 10; // caption cap height

  // Each section: a caption, then its box GAP below the caption.
  const srcCap = CAP_H;
  const srcTop = srcCap + GAP;
  const srcBottom = srcTop + SRC_H;

  const prepCap = srcBottom + STEP;
  const prepW = 158; // "Visual hierarchy" needs ~153
  const prepH = textCardH("x");
  const brandTop = prepCap + GAP;
  const tplTop = brandTop + 40;
  const brandY = brandTop + prepH / 2;
  const tplY = tplTop + prepH / 2;
  const tplX = W - prepW;

  const engineCap = tplTop + prepH + STEP;
  const engineY = engineCap + GAP + R + 11;

  const checksCap = engineY + R + 11 + STEP;
  const checkX = X - CHECK_W / 2;
  const qTop = checksCap + GAP;
  const sTop = qTop + checkH + 40;

  const outCap = sTop + checkH + STEP;
  const outTop = outCap + GAP;
  const outBottom = outTop + outH;
  const view = `0 ${-GAP} ${W} ${outBottom + GAP * 2}`;

  // One dot per product down the spine; it passes under the engine and the checks.
  const spine = `M${X} ${srcBottom} V${outTop}`;
  const at = (i: number, y: number) => START(i) + (TRAVEL * (y - srcBottom)) / (outTop - srcBottom);

  return (
    <Frame id={id} w={W} h={outBottom} label={ARIA} view={view}>
      <Caption x={0} y={srcCap}>SOURCES</Caption>
      <Caption x={0} y={prepCap}>PREPARE</Caption>
      <Caption x={0} y={engineCap}>AI ENGINE</Caption>
      <Caption x={0} y={checksCap}>CHECKS</Caption>
      <Caption x={0} y={outCap}>OUTPUT</Caption>

      <g fill="none" stroke={LINE} strokeWidth={1.3}>
        <path d={spine} />
        <path d={`M${prepW} ${brandY} H${X}`} />
        <path d={`M${tplX} ${tplY} H${X}`} />
      </g>

      <g className="flow-packets">
        {rows.map((_, i) => (
          <g key={i}>
            <Dot path={spine} from={START(i)} to={ARRIVE(i)} id={id} />
            {i % 2 === 0 ? (
              <Dot path={`M${prepW} ${brandY} H${X}`} from={at(i, brandY) - 0.4} to={at(i, brandY)} id={id} size={6} />
            ) : (
              <Dot path={`M${tplX} ${tplY} H${X}`} from={at(i, tplY) - 0.4} to={at(i, tplY)} id={id} size={6} />
            )}
          </g>
        ))}
      </g>

      <SourcesCard x={0} top={srcTop} w={W} id={id} />
      <Port x={X} y={srcBottom} />

      <TextCard x={0} top={brandTop} w={prepW} title={brand.title} sub="Moodboard" sub2="Social media" id={id} />
      <Port x={prepW} y={brandY} />
      <Junction x={X} y={brandY} />
      <TextCard x={tplX} top={tplTop} w={prepW} title={template.title} sub="Visual hierarchy" sub2="Category" id={id} />
      <Port x={tplX} y={tplY} />
      <Junction x={X} y={tplY} />

      <AiEngine x={X} y={engineY} id={id} />

      <CheckCard x={checkX} y={qTop} ci={0} pass={at(0, qTop) + 0.3} id={id} />
      <Port x={X} y={qTop} />
      <Port x={X} y={qTop + checkH} />
      <CheckCard x={checkX} y={sTop} ci={1} pass={at(0, sTop) + 0.3} id={id} />
      <Port x={X} y={sTop} />
      <Port x={X} y={sTop + checkH} />

      <OutputCard x={0} top={outTop} id={id} />
      <Port x={X} y={outTop} />
    </Frame>
  );
}
