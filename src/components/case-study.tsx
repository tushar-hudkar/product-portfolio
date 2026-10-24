import type { ReactNode } from "react";

/** Big-number impact callouts. */
export function Metrics({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="my-10 grid gap-3 sm:grid-cols-3">
      {items.map((m) => (
        <div key={m.label} className="rounded-3xl bg-brand/10 p-6">
          <p className="font-serif text-2xl whitespace-nowrap text-brand">{m.value}</p>
          <p className="mt-1 text-sm text-muted">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Highlighted insight, question or "How might we". */
export function Callout({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="my-10 rounded-3xl border-l-4 border-brand bg-surface p-6 sm:p-8">
      {label && (
        <p className="mb-2 text-xs font-medium tracking-widest text-brand uppercase">
          {label}
        </p>
      )}
      <div className="font-serif text-2xl leading-snug sm:text-[1.75rem] [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/** Two- or three-column grid of short titled blocks. */
export function Cards({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div
      className={`my-8 grid gap-4 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {children}
    </div>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl bg-surface p-6">
      <p className="font-serif text-2xl leading-tight">{title}</p>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-muted [&>p]:m-0 [&_ul]:mt-0">
        {children}
      </div>
    </div>
  );
}
