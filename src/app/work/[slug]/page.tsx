import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GithubSlugger from "github-slugger";
import { Figure } from "@/components/figure";
import { Toc } from "@/components/toc";
import { getNextProject, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.shortTitle,
    description: project.summary,
    openGraph: { images: [project.cover] },
  };
}

// Section list for the contents sidebar; ids match rehype-slug's output.
function getSections(slug: string) {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/content/work", `${slug}.mdx`),
    "utf8",
  );
  const slugger = new GithubSlugger();
  return [...source.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = m[1].trim();
    return { id: slugger.slug(text), text };
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Content } = await import(`@/content/work/${slug}.mdx`);
  const next = getNextProject(slug);
  const sections = getSections(slug);
  const impactId = sections.find((s) => s.text === project.highlight?.section)?.id;

  const facts = [
    { label: "Role", value: project.role },
    { label: "Company", value: project.company },
    { label: "Platform", value: project.platform },
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.team },
  ].filter((f) => f.value);

  return (
    <article>
      <header className="reveal mx-auto max-w-6xl px-6 pt-14">
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          ← All case studies
        </Link>
        <div
          className={`mt-10 grid gap-10 ${project.highlight ? "lg:grid-cols-[1.4fr_1fr] lg:items-end" : ""}`}
        >
          <div>
            <p className="flex flex-wrap items-center gap-2 text-xs tracking-widest text-muted uppercase">
              <span className="inline-flex items-center gap-1.5 text-highlight">
                <span className="size-1.5 rounded-full bg-highlight" />
                {project.company}
              </span>
              · {project.year} · {project.platform}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-6xl">{project.title}</h1>
            {!project.hideHeroSummary && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
            )}
          </div>
          <div className="space-y-4">
            {project.highlight && (
              <div className="rounded-3xl bg-highlight/10 p-6">
                <p className="font-serif text-3xl whitespace-nowrap text-highlight sm:text-4xl">{project.highlight.value}</p>
                <p className="mt-1 text-sm text-foreground/70">{project.highlight.label}</p>
                {impactId && (
                  <a
                    href={`#${impactId}`}
                    className="mt-4 inline-block text-sm text-highlight underline underline-offset-4"
                  >
                    See the impact data ↓
                  </a>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-6 rounded-3xl bg-surface p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className={f.label === "Team" ? "sm:col-span-2" : ""}>
              <dt className="text-xs tracking-widest text-muted uppercase">{f.label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{f.value}</dd>
            </div>
          ))}
          {(project.link || project.figma) && (
            <div className="sm:col-span-2">
              <dt className="text-xs tracking-widest text-muted uppercase">Links</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">
                    Web app ↗
                  </a>
                )}
                {project.figma && (
                  <a href={project.figma} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">
                    Figma file ↗
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>

        {!project.hideHeroCover && (
          <Figure src={project.cover} alt={`${project.shortTitle} — hero screen`} tone={project.coverTone} priority />
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-24 pb-8">
            <Toc items={sections} />
          </div>
        </aside>
        <div className="cs-body min-w-0 max-w-3xl">
          <Content />
        </div>
      </div>

      <nav aria-label="Next case study" className="mx-auto mt-32 max-w-6xl px-6">
        <Link
          href={`/work/${next.slug}`}
          className="group grid gap-4 rounded-3xl bg-surface p-8 transition-colors hover:bg-[#ebe7df] sm:p-12"
        >
          <p className="font-hand text-2xl text-highlight">next case study</p>
          <p className="font-serif text-3xl leading-tight sm:text-5xl">
            {next.title}{" "}
            <span className="inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
          </p>
          <p className="max-w-2xl text-muted">{next.summary}</p>
        </Link>
      </nav>
    </article>
  );
}
