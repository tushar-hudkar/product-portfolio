"use client";

import { useEffect, useState } from "react";

export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections">
      <p className="mb-3 text-xs tracking-widest text-muted uppercase">Contents</p>
      <ol className="space-y-0.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`flex gap-3 rounded-lg px-2 py-1.5 text-sm leading-snug transition-colors ${
                active === item.id
                  ? "bg-surface text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span className={`font-mono text-xs leading-5 ${active === item.id ? "text-brand" : ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
