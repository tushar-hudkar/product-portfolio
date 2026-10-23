import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectRow } from "@/components/project-row";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in AI-powered product design for e-commerce teams, and a self-initiated fintech project.",
};

export default function WorkPage() {
  return (
    <section className="reveal mx-auto max-w-6xl px-6 pt-14">
      <Link href="/" className="text-sm text-muted hover:text-foreground">
        ← Back to home
      </Link>
      <p className="mt-6 font-hand text-2xl text-highlight">selected work</p>
      <h1 className="max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
        Case studies, from research to measurable outcomes.
      </h1>
      <ol className="mt-14">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </ol>

      {/* Self-initiated work sits apart from the client case studies. */}
      <p className="mt-24 font-hand text-2xl text-highlight">self-initiated</p>
      <ul className="mt-4">
        <li className="border-y border-line">
          <Link
            href="/work/fairmarq"
            className="group grid gap-6 py-8 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:px-4 sm:hover:bg-surface/70"
          >
            <span aria-hidden className="grid size-10 place-items-center rounded-full bg-[#0b0d0c] font-sans text-lg font-bold text-[#19c37d]">
              q
            </span>
            <div>
              <p className="text-xs tracking-wide text-muted uppercase">Fairmarq · 2026 · iOS · Android · Web</p>
              <h3 className="mt-2 font-sans text-2xl font-normal leading-tight sm:text-[1.75rem]">
                Money decisions are never just maths
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                A decision-support app for people who send money home, travel or get paid from abroad, built on
                the psychology of money decisions, from user interviews to a working app.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {["Fintech", "Decision support", "Solo, with AI"].map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <span aria-hidden className="hidden text-2xl text-muted transition-all group-hover:translate-x-1 group-hover:text-accent sm:block">
              →
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
