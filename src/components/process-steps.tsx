"use client";

import { useEffect, useState } from "react";

// My design process — six steps from discovery to validation.
const steps = [
  { title: "Strategy & Discovery", detail: "Stakeholder alignment · Research · AI-assisted research synthesis" },
  { title: "Scope & Prioritize", detail: "Problem framing · User value · Success metrics" },
  { title: "Architecture & Flows", detail: "IA · User journeys · Workflow mapping · Interaction models" },
  { title: "Explore & Prototype", detail: "Design exploration · AI-assisted ideation · Rapid prototyping" },
  { title: "Build & Collaborate", detail: "Design systems · Visual design · Engineering collaboration" },
  { title: "Validate & Evolve", detail: "Usability testing · User feedback · Product analytics" },
];

const STEP_MS = 3000;

/** One step at a time; auto-advances every 3s, and each progress segment jumps to its step. */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  // Restarts whenever the step changes, so a click gives the chosen step its full 3s.
  useEffect(() => {
    // With reduced motion, steps change only on click.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active]);

  const step = steps[active];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">The process</p>
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {String(active + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
        </p>
      </div>
      <div className="mt-5 h-32">
        <div key={active} className="process-in">
          <p className="text-2xl leading-tight">{step.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted italic">{step.detail}</p>
        </div>
      </div>
      {/* Each button is 20px tall with the 2px line centred, matching the Contact / LinkedIn row. */}
      <div className="grid grid-cols-6 gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Step ${i + 1}: ${s.title}`}
            aria-current={i === active ? "step" : undefined}
            className="group flex h-5 cursor-pointer items-center"
          >
            <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-line transition-colors group-hover:bg-muted/40">
              {i === active && (
                <span
                  key={active}
                  className="process-fill absolute inset-0 origin-left bg-brand"
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
