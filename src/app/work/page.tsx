import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectRow } from "@/components/project-row";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in AI-powered product design for e-commerce teams.",
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
    </section>
  );
}
