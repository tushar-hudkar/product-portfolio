import Image from "next/image";
import { companies, site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { AiProcess } from "@/components/ai-process";
import { FairmarqFeature } from "@/components/fairmarq-feature";
import { ProjectRow } from "@/components/project-row";
import { LinkedInIcon, MailIcon } from "@/components/icons";

const philosophy = [
  [
    "The real user journey runs through the user's mind, not on the screen.",
    "Observation is the biggest tool.",
  ],
  [
    "Fast does not always mean right.",
    "Language is more important than structure.",
    "Breaking rules while keeping the harmony — that's what gets me high on design.",
  ],
  [
    "UX isn't always about making things easy — sometimes the simplest design can ruin the essence of the product.",
    "Embrace the uncertainty — dig a little, give it a thought, and you'll surprise yourself.",
  ],
];

const questions = [
  "Do I direct users to follow a certain path — or do the users guide me to make it?",
  "Do I make users think, or do I make them feel?",
  "Did I spend enough time with my solution without the designer's lens — just as a consumer?",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="-rotate-2 font-hand text-3xl text-brand">Hi, I&apos;m Tushar Hudkar.</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            I design products people <em className="text-brand">understand</em> — and systems
            that&nbsp;last.
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed text-muted">
            10+ years turning complex B2B and B2C products into experiences that drive real
            outcomes. I integrate AI into my process and continuously evolve how I design.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm decoration-1 underline-offset-4 hover:text-accent hover:underline"
            >
              <MailIcon /> Contact
            </a>
            <a
              href={site.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm decoration-1 underline-offset-4 hover:text-accent hover:underline"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </div>
        <div className="reveal [animation-delay:150ms]">
          <AiProcess />
        </div>
      </section>

      {/* Case studies */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 pt-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-hand text-2xl text-brand">selected work</p>
            <h2 className="font-serif text-5xl">Case studies</h2>
          </div>
          <p className="max-w-xs text-right text-sm text-muted">
            AI products for e-commerce — from research to measurable outcomes.
          </p>
        </div>
        <ol>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </section>

      {/* Fairmarq: self-initiated project */}
      <FairmarqFeature />

      {/* Previously worked with */}
      <section aria-labelledby="clients" className="mx-auto mt-28 max-w-6xl px-6">
        <div className="flex flex-col gap-6 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
          <h2 id="clients" className="shrink-0 text-xs tracking-widest text-muted uppercase">
            Previously worked with
          </h2>
          <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
            {companies.map((c) => (
              <li key={c.name}>
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  className={`${"size" in c ? c.size : "h-6"} w-auto opacity-60 transition-opacity hover:opacity-100`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <p className="font-hand text-2xl text-brand">who I am as a designer</p>
        <h2 className="max-w-3xl font-serif text-5xl leading-tight">
          My design philosophy — and what I&apos;ve learned along the way.
        </h2>
        <div className="mt-12 grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {philosophy.map((column, c) =>
            c === 0 ? (
              <div key={c} className="flex min-h-[28rem] flex-col justify-between gap-24 bg-surface p-10">
                <p className="font-sans text-2xl leading-relaxed text-muted">{column[0]}</p>
                <p className="font-sans text-lg italic leading-relaxed text-muted">{column[1]}</p>
              </div>
            ) : (
              <ul key={c} className="flex flex-col divide-y divide-line">
                {column.map((p, i) => (
                  <li key={p} className={`flex flex-1 p-7 ${i === column.length - 1 ? "items-end" : ""}`}>
                    <p className="font-sans text-lg leading-relaxed text-muted">{p}</p>
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="bg-[#161514] px-7 py-14 text-[#f2efe9] sm:px-14">
          <p className="font-hand text-2xl text-brand">the questions I keep asking myself</p>
          <ul className="mt-8 space-y-8">
            {questions.map((q) => (
              <li key={q} className="border-b border-[#2c2a27] pb-8 font-serif text-[#f2efe9]/65 transition-colors duration-300 hover:text-[#f2efe9] text-3xl leading-snug italic last:border-0 last:pb-0 sm:text-4xl">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
