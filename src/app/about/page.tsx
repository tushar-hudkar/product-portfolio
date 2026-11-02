import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: experience, lessons from 10+ years of product design, and writing.`,
  path: "/about",
});

const lessons = [
  {
    title: "Think like a founder",
    detail:
      "Building products for the long term requires a founder’s mindset. Understanding business goals, challenging assumptions, and engaging deeply with stakeholders are just as important as understanding user needs.",
  },
  {
    title: "Understand the difference between B2C and B2B",
    detail:
      "B2C products often allow faster iterations through frequent customer feedback. B2B products demand a stronger foundation in business needs, workflows, and value creation before meaningful iterations can happen.",
  },
  {
    title: "Simplify the experience, not the system",
    detail:
      "Breaking complex tasks into simple, step-by-step interactions can make products easier to use. But simplicity at the interface level must be balanced with scalability and operational efficiency behind the scenes.",
  },
  {
    title: "Design for the ecosystem, not just the journey",
    detail:
      "Moving users from one environment to another is rarely straightforward. Optimizing a single journey in isolation can create friction elsewhere, so design decisions must account for the broader product ecosystem.",
  },
];

// Matches the resume and LinkedIn (Nov 2025): titles, dates and points. `freelance` adds a tag beside the company.
const experience: { period: string; role: string; company: string; freelance?: boolean; label: string; points: string[] }[] = [
  {
    period: "Nov 2025 – Present",
    role: "Product Design Consultant",
    company: "Maayka",
    freelance: true,
    label: "Role",
    points: [
      "Led user research and interviews for a premium hyperlocal marketplace, to understand the target market and shape the product direction.",
      "Partnered with the founders and team on business strategy, identifying where design can drive growth and trust.",
      "Developed product concepts from research insights, from early ideas to design direction.",
    ],
  },
  {
    period: "Dec 2021 – Mar 2025",
    role: "Senior Product Designer",
    company: "Dresma",
    label: "Business impact · Sep 2023 – Nov 2024",
    points: [
      "220% growth in average monthly users.",
      "Churn down from 75% to 54%.",
      "Conversion up from 0.8% to 1.4%.",
    ],
  },
  {
    period: "Sep 2021 – Nov 2021",
    role: "Senior UX Engineer",
    company: "Codvo.ai",
    freelance: true,
    label: "Role",
    points: [
      "Researched, designed and tested a hiring platform built for engineers and software developers.",
      "Designed the first phase of an employee management system, with a Figma component library for consistency.",
    ],
  },
  {
    period: "May 2018 – Aug 2021",
    role: "Senior UX Designer",
    company: "Angara Ecommerce",
    label: "Business impact",
    points: [
      "Raised conversion from ~1.5% to ~2.5% across key journeys, varying with seasonal and festival peaks.",
      "Reduced cart abandonment from 70–75% to 50–55% by redesigning cart and checkout.",
      "Increased average session duration from 2–3 to 4–5 minutes.",
    ],
  },
  {
    period: "Dec 2016 – Apr 2018",
    role: "UX Designer & Front-End Developer",
    company: "Foodraveller",
    label: "Role",
    points: [
      "Designed and built the complete UI for a responsive web app, from research and wireframes to front-end code.",
      "Designed gamification features to drive user engagement.",
      "Built to WCAG accessibility standards with cross-browser support.",
      "Used analytics and qualitative testing to guide design decisions.",
    ],
  },
  {
    period: "Sep 2015 – Dec 2016",
    role: "UX Researcher & Front-End Developer",
    company: "Onething Design",
    label: "Role",
    points: [
      "Worked on client projects at a UX design agency, covering the full product design process.",
      "User research through observation and interviews, concept design, and front-end builds in JavaScript and CSS frameworks.",
    ],
  },
];

// Add a `url` to make an article clickable.
const writing: { title: string; url?: string }[] = [
  {
    title: "Human cognition and its effect on design",
    url: "https://medium.com/muzli-design-inspiration/human-cognition-and-its-effect-on-design-ed23cfff7f18",
  },
  {
    title: "How can we bring empathy into our design process?",
    url: "https://medium.com/muzli-design-inspiration/how-can-we-bring-empathy-in-our-design-process-43fa717ec235",
  },
];

export default function AboutPage() {
  return (
    <div className="reveal mx-auto max-w-6xl px-6 pt-14">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← Back to home
      </Link>
      <section className="mt-6 grid gap-12 md:grid-cols-[1fr_320px] md:items-start">
        <div>
          <p className="font-hand text-2xl text-brand">about me</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl">
            An observer by nature.{" "}
            <span className="font-serif font-normal italic">A thinker by instinct.</span>
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <p>
              From research and front-end development to leading product design, the
              constant has been solving real problems through thoughtful, outcome-driven
              design.
            </p>
            <p>
              I value empathy and transparent collaboration. They help teams align on what
              matters and create products that serve both the people who use them and the
              organisations that build them.
            </p>
          </div>
          {site.resume && (
            // Text link, like the homepage's "Read case study →": the underline darkens and the arrow nudges.
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="group/cta mt-8 inline-flex items-center gap-2 text-base text-foreground underline decoration-line underline-offset-[6px] transition-colors hover:decoration-foreground"
            >
              View resume
              <span aria-hidden="true" className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
        {/* Black and white at rest; on hover the colour photo (same shot) fades in over it.
            The sources are 1200px masters; Next serves 640/750/1080px versions (q85) to fit
            the 320px slot at 1x–3x screens, so each photo is compressed only once. */}
        <div className="group relative w-full max-w-xs overflow-hidden rounded-3xl bg-[#111]">
          <Image
            src="/about/my-photo-bw.webp"
            alt="Portrait of Tushar Hudkar"
            width={1200}
            height={1600}
            sizes="320px"
            quality={85}
            priority
            className="block w-full"
          />
          <Image
            src="/about/my-photo-colour.webp"
            alt=""
            width={1200}
            height={1600}
            sizes="320px"
            quality={85}
            className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        </div>
      </section>

      <section className="mt-32">
        <h2 className="border-b border-line pb-6 font-serif text-4xl">
          Experience
        </h2>
        <ol>
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid gap-4 border-b border-line py-10 md:grid-cols-[260px_1fr]"
            >
              <div>
                <p className="text-sm text-muted">{job.period}</p>
                <p className="mt-2 font-medium">{job.role}</p>
                <p className="flex flex-wrap items-center gap-2 text-muted">
                  {job.company}
                  {job.freelance && (
                    <span className="rounded-full border border-line px-2 py-0.5 text-xs">Freelance</span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">{job.label}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-muted">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-32">
        <h2 className="border-b border-line pb-6 font-serif text-4xl">
          What experience has taught me
        </h2>
        <ol className="grid border-b border-line sm:grid-cols-2">
          {lessons.map((l, i) => (
            <li key={l.title} className="py-8 pr-8">
              <p className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-xl font-medium">{l.title}</p>
              <p className="mt-2 leading-relaxed text-muted">{l.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="writing" className="mt-32 scroll-mt-24">
        <h2 className="border-b border-line pb-6 font-serif text-4xl">
          Writing
        </h2>
        <ul>
          {writing.map((w) => (
            <li key={w.title} className="border-b border-line">
              {w.url ? (
                <a
                  href={w.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-6 py-8 transition-colors hover:text-accent"
                >
                  <span className="font-serif text-xl leading-snug sm:text-2xl">
                    {w.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-sm text-muted transition-colors group-hover:text-accent">
                    <span className="hidden sm:inline">Read on Medium</span>
                    <span className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </a>
              ) : (
                <p className="flex items-center justify-between gap-6 py-8">
                  <span className="font-serif text-xl leading-snug sm:text-2xl">
                    {w.title}
                  </span>
                  <span className="text-sm text-muted">Coming soon</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
