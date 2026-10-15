import type { CSSProperties } from "react";

// My design process — six steps from discovery to validation.
const steps = [
  { title: "Strategy & Discovery", detail: "Stakeholder alignment · Research · AI-assisted research synthesis" },
  { title: "Scope & Prioritize", detail: "Problem framing · User value · Success metrics" },
  { title: "Architecture & Flows", detail: "IA · User journeys · Workflow mapping · Interaction models" },
  { title: "Explore & Prototype", detail: "Design exploration · AI-assisted ideation · Rapid prototyping" },
  { title: "Build & Collaborate", detail: "Design systems · Visual design · Engineering collaboration" },
  { title: "Validate & Evolve", detail: "Usability testing · User feedback · Product analytics" },
];

export function AiProcess() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface/60 p-6 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          My Process
        </div>
        <div className="typing flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-muted" />
          <span className="size-1.5 rounded-full bg-muted" />
          <span className="size-1.5 rounded-full bg-muted" />
        </div>
      </div>
      <ol className="relative isolate mt-4 space-y-2">
        {steps.map((s, i) => (
          <li
            key={s.title}
            style={{ "--i": i } as CSSProperties}
            className="ai-step relative flex items-start gap-4 rounded-2xl border border-transparent px-3 py-2.5"
          >
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute top-[21.5px] left-[17px] -z-10 h-[calc(100%+10px)] w-px bg-line" />
            )}
            <span
              style={{ "--i": i } as CSSProperties}
              className="ai-dot relative z-10 mt-1.5 size-[11px] shrink-0 rounded-full bg-[#cfc9be]"
            />
            <div>
              <p className="text-sm font-medium">
                <span className="mr-2 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </p>
              <p className="ai-detail mt-0.5 text-xs leading-relaxed text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
