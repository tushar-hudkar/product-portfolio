import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — lessons, experience and writing.`,
};

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

const experience = [
  {
    period: "Dec 2021 – Mar 2025",
    role: "Senior Product Designer",
    company: "Dresma",
    label: "Business impact",
    points: [
      "Drove 220% growth in Average Monthly Users (AMU).",
      "Reduced web app churn from 75% to 54%.",
      "Improved activation rate from 28% to 64%.",
      "Increased conversion rate from 0.8% to 1.4%.",
    ],
  },
  {
    period: "Sep 2021 – Dec 2021",
    role: "Senior UX Designer",
    company: "Codvo",
    label: "Business outcomes",
    points: [
      "Reduced operational costs by contributing to the design and rollout of an employee management system.",
      "Built a detailed Figma design system for the tool to keep it consistent and ready to scale.",
    ],
  },
  {
    period: "May 2018 – Sep 2021",
    role: "Senior UX Designer",
    company: "Angara E-commerce",
    label: "Business impact",
    points: [
      "Increased conversion rates by 1.5–2.5%, varying with seasonal and festival peaks.",
      "Grew average session duration from 2–3 minutes to 4–5 minutes.",
      "Reduced cart abandonment from 70–75% to 50–55%.",
    ],
  },
  {
    period: "Dec 2016 – Apr 2018",
    role: "UX Designer & Front-End Developer",
    company: "Foodraveller",
    label: "Achievements",
    points: [
      "Designed visual layouts aligned with brand guidelines and WCAG accessibility standards, and built them with robust cross-browser support.",
      "Partnered with a graphic designer on motion graphics and micro-interactions across web and mobile.",
    ],
  },
  {
    period: "Sep 2015 – Dec 2016",
    role: "UX Researcher & Front-End Developer",
    company: "Onething Design",
    label: "Role",
    points: [
      "Ran research that generated new product ideas and delivered concept-driven designs across all project phases.",
      "Observed and interviewed users to understand and document their needs.",
      "Facilitated design reviews with internal and external teams to confirm solutions met product goals.",
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
          <p className="font-hand text-2xl text-highlight">about me</p>
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
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-85"
            >
              View resume ↗
            </a>
          )}
        </div>
        <Image
          src="/about/my-photo.webp"
          alt="Portrait of Tushar Hudkar"
          width={576}
          height={728}
          priority
          className="w-full max-w-xs rounded-3xl bg-[#111] object-cover"
        />
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
                <p className="text-muted">{job.company}</p>
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
              <p className="font-mono text-sm text-highlight">{String(i + 1).padStart(2, "0")}</p>
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
