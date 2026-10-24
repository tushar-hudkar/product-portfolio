import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="border-b border-line first:border-t">
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-6 py-8 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:px-4 sm:hover:bg-surface/70"
      >
        <span className="font-serif text-3xl text-[#cfc9be] transition-colors group-hover:text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-xs tracking-wide text-muted uppercase">
            {project.company} · {project.year} · {project.platform}
          </p>
          <h3 className="mt-2 font-sans text-2xl font-normal leading-tight sm:text-[1.75rem]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {project.highlight && (
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                {project.highlight.value} {project.highlight.label.toLowerCase()}
              </span>
            )}
          </div>
        </div>
        <span
          aria-hidden
          className="hidden text-2xl text-muted transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
        >
          →
        </span>
      </Link>
    </li>
  );
}
