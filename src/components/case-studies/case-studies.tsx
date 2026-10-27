import Link from "next/link";
import type { ReactNode } from "react";
import { projects, type Project } from "@/lib/projects";
import { FlowE, FlowEVertical } from "./listing-flow";
import { HandPhone } from "./hand-phone";
import { PhoneFrame } from "./phone-frame";
import { StudioScreens } from "./studio-screens";

// Display order on the homepage.
const ORDER = [
  "ai-marketplace-listing",
  "saas-content-platform",
  "product-capture-app",
  "agentic-ai-workflow",
  "design-studio",
];

const CAPTURE = {
  screen: "/work/product-capture-app/camera-screen.svg",
  alt: "The app's camera screen on an iPhone: a product in the viewfinder, angle guides, the shutter button and the upload option",
};

const STUDIO = {
  // Vector exports (text and UI stay sharp at any size): the workflow step by step.
  screens: [1, 2, 3, 4, 5].map((n) => `/work/design-studio/studio-0${n}.svg`),
  alt: "Design Studio editor: a prompt generator (setting, mood, lighting, colour palette) on the left, a red dress on the canvas, and editing tools on the right.",
};

// Visual per case study and where it sits: below the text (wide flow), or right of it.
const visuals: Record<
  string,
  {
    node: ReactNode;
    place: "below" | "right";
    name?: { title: string; sub: string };
    bleed?: boolean; // the visual drops through the right and bottom padding to the card's border
    headingAbove?: boolean; // meta and title span the card; the visual sits under them
    ownLink?: boolean; // the visual has its own link and controls, so it isn't wrapped in one
  }
> = {
  "ai-marketplace-listing": {
    // Wide flow from 1024px; below that the vertical version keeps the type readable.
    node: (
      <>
        <div className="hidden lg:block">
          <FlowE />
        </div>
        <div className="mx-auto max-w-[340px] lg:hidden">
          <FlowEVertical />
        </div>
      </>
    ),
    place: "below",
    name: { title: "Listing intelligence", sub: "maps · writes · scores" },
  },
  // From 1024px: the phone in a hand, the hand running into the card's right and bottom
  // border. The photo is 413px wide so its phone matches the hand-free one (a 232px screen,
  // which fills 1055 / 1880 of the photo). Below 1024px: the phone alone, no hand.
  "product-capture-app": {
    node: (
      <>
        <div className="hidden lg:block">
          <HandPhone screen={CAPTURE.screen} alt={`${CAPTURE.alt}, held in a hand.`} className="w-[413px] lg:mr-0" bleed />
        </div>
        <div className="lg:hidden">
          <PhoneFrame screen={CAPTURE.screen} alt={`${CAPTURE.alt}.`} className="w-[min(250px,70vw)]" />
        </div>
      </>
    ),
    place: "right",
    bleed: true,
  },
  // Heading across the card; under it the story on the left (top-aligned) and the five
  // workflow screens playing in an iMac-like frame (thin white bezel, light chin holding the
  // progress lines, hairline edge), 620px wide. From 1024px it runs into the card's right and
  // bottom border, so only its top and left edges are drawn there.
  "design-studio": {
    node: (
      <StudioScreens
        screens={STUDIO.screens}
        alt={STUDIO.alt}
        href="/work/design-studio"
        className="mx-auto w-full max-w-[540px] shadow-[0_18px_40px_-30px_rgba(22,21,20,0.18)] lg:w-[620px] lg:max-w-none lg:rounded-none lg:rounded-tl-[14px] lg:border-r-0 lg:border-b-0 lg:shadow-none"
      />
    ),
    place: "right",
    headingAbove: true,
    bleed: true,
    ownLink: true,
  },
};

function Meta({ p, extra }: { p: Project; extra?: string }) {
  return (
    <p className="text-xs tracking-[0.14em] text-muted uppercase">
      {p.company} · {p.year} · {p.platform}
      {extra && ` · ${extra}`}
    </p>
  );
}

function Title({ p, large }: { p: Project; large?: boolean }) {
  return (
    <h3
      // Editor's Note (the hero's serif). Only Regular is loaded, so emphasis comes from size, not weight.
      // Normal wrapping: lines fill the available width and break where the screen size makes them.
      className={`mt-3 font-serif font-normal tracking-tight ${
        large ? "text-[1.75rem] leading-[1.12] sm:text-[2.5rem] sm:leading-[1.08]" : "text-[1.75rem] leading-[1.12] sm:text-[2.25rem] sm:leading-[1.1]"
      }`}
    >
      {p.title}
    </h3>
  );
}

function Tags({ p }: { p: Project }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {p.tags.map((t) => (
        <li key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The result as plain green text, e.g. "28% → 64% activation rate". */
function Metric({ p }: { p: Project }) {
  if (!p.highlight) return null;
  return (
    <p className="text-sm font-medium text-brand">
      {p.highlight.value} {p.highlight.label.toLowerCase()}
    </p>
  );
}

function Cta({ p }: { p: Project }) {
  return (
    // Fairmarq's "View the story" on a light band: stays black, the underline darkens and the arrow nudges.
    <Link
      href={`/work/${p.slug}`}
      className="cs-cta group/cta inline-flex items-center gap-2 text-base text-foreground underline decoration-line underline-offset-[6px] transition-colors hover:decoration-foreground"
    >
      Read case study
      <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Summary, then the tags, then the result just above the link. */
function Details({ p }: { p: Project }) {
  return (
    <>
      <p className="text-[17px] leading-relaxed text-muted">{p.summary}</p>
      <Tags p={p} />
      <Metric p={p} />
      <Cta p={p} />
    </>
  );
}

// Each case study is a bordered box the width of the page column, lined up with the
// "featured work" label and the rest of the page; 32px padding (24px on phones).
// On hover it takes the live site's row tint, and hovering the visual darkens the CTA underline.
const ITEM = "mx-auto max-w-6xl px-6";
const BOX =
  "rounded-3xl border border-line p-6 sm:p-8 transition-colors duration-300 sm:hover:bg-surface/70 [&:has(.cs-visual:hover)_.cs-cta]:decoration-foreground";

function CaseStudy({ p }: { p: Project }) {
  const v = visuals[p.slug];

  // Text only: stacked full width like the Marketplace row, minus the diagram.
  if (!v) {
    return (
      <li className={ITEM}>
        <div className={BOX}>
          <Meta p={p} />
          <Title p={p} large />
          <div className="mt-6 space-y-6">
            <Details p={p} />
          </div>
        </div>
      </li>
    );
  }

  // Wide flow: meta with the diagram's name beside it, the diagram, then the title and story.
  if (v.place === "below") {
    return (
      <li className={ITEM}>
        <div className={BOX}>
          <Meta p={p} extra={v.name && `${v.name.title} — ${v.name.sub}`} />
          <Link
            href={`/work/${p.slug}`}
            aria-label={`${p.title}: read case study`}
            className="cs-visual mt-5 block border-y border-line"
          >
            {v.node}
          </Link>
          <div className="mt-7">
            <Title p={p} large />
          </div>
          <div className="mt-6 space-y-6">
            <Details p={p} />
          </div>
        </div>
      </li>
    );
  }

  // Visual right of the text. The visual takes the width it needs, bottom-aligned; the text
  // gets the rest. A bleeding visual (the hand) drops through the right and bottom padding,
  // cut by the border.
  const visualClass = `cs-visual block lg:order-2 lg:self-end ${v.bleed ? "lg:-mr-8 lg:-mb-8" : ""}`;
  const visual = v.ownLink ? (
    <div className={visualClass}>{v.node}</div>
  ) : (
    <Link href={`/work/${p.slug}`} aria-label={`${p.title}: read case study`} className={visualClass}>
      {v.node}
    </Link>
  );
  const grid = `grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12`;

  if (v.headingAbove) {
    return (
      <li className={ITEM}>
        <div className={`${BOX} ${v.bleed ? "overflow-hidden" : ""}`}>
          <Meta p={p} />
          <Title p={p} large />
          <div className={`mt-6 ${grid}`}>
            {visual}
            <div className="space-y-6 lg:self-start">
              <Details p={p} />
            </div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={ITEM}>
      <div className={`${BOX} ${grid} ${v.bleed ? "overflow-hidden" : ""}`}>
        {visual}
        <div className="space-y-6">
          <div>
            <Meta p={p} />
            <Title p={p} />
          </div>
          <Details p={p} />
        </div>
      </div>
    </li>
  );
}

export function CaseStudies() {
  const ordered = ORDER.map((slug) => projects.find((p) => p.slug === slug)).filter((p): p is Project => !!p);
  return (
    <section id="work" className="scroll-mt-20 pt-28">
      {/* 27px + the ~5px the handwriting leaves under its letters = the 32px gap between cards. */}
      <div className="mx-auto mb-[27px] max-w-6xl px-6">
        <h2 className="font-hand text-2xl text-brand">featured work</h2>
      </div>
      <ol className="space-y-8">
        {ordered.map((p) => (
          <CaseStudy key={p.slug} p={p} />
        ))}
      </ol>
    </section>
  );
}
