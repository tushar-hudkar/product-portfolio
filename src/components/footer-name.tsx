"use client";

import { useRef } from "react";

/**
 * The oversized footer name: a faint outline that fills in with the site green around the cursor on hover
 * (CSS variables drive a radial gradient clipped to the text; see .name-spot in globals.css).
 * Touch screens keep the plain outline; reduced-motion settings drop the gliding.
 */
export function FooterName({ name }: { name: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const frame = useRef(0);

  function move(e: React.PointerEvent<HTMLParagraphElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--x", `${clientX - r.left}px`);
      el.style.setProperty("--y", `${clientY - r.top}px`);
    });
  }

  function enter(e: React.PointerEvent<HTMLParagraphElement>) {
    if (e.pointerType !== "mouse") return;
    // Start the spotlight where the cursor came in, so it doesn't slide in from the middle.
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transition = "none";
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    void el.offsetWidth;
    el.style.transition = "";
    el.style.setProperty("--spot", "1");
  }

  function leave() {
    ref.current?.style.setProperty("--spot", "0");
  }

  return (
    <p
      ref={ref}
      aria-hidden="true"
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      className="name-spot mt-16 -mb-[0.1em] sm:mt-24 text-center font-serif text-[17vw] leading-none tracking-tight whitespace-nowrap lowercase select-none"
    >
      {name}
    </p>
  );
}
