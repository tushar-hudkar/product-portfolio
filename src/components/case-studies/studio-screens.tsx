"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STEP_MS = 1500;

/**
 * The Design Studio workflow, one screen at a time, in an iMac-like frame: every 1.5s the next
 * screen fades in over the current one, and the progress lines in the frame's chin fill as
 * each one plays (clicking a line jumps to it). Playback waits until the frame is on screen
 * and pauses while it's hovered. The fill's animation end is what advances the step, so with
 * reduced motion (no animation) the screens change only on click.
 */
export function StudioScreens({ screens, alt, href, className = "" }: { screens: string[]; alt: string; href: string; className?: string }) {
  const [active, setActive] = useState(0);
  // The screen being replaced stays fully opaque underneath while the next one fades in on
  // top, so nothing shows through mid-change: no dip, and the parts both screens share
  // never move.
  const [prev, setPrev] = useState<number | null>(null);
  const go = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !hover;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`overflow-hidden rounded-[14px] border border-line bg-white ${className}`}
    >
      <Link href={href} aria-label={`${alt} Read case study`} className="block p-[1.6%] pb-[1.2%]">
        <div className="relative overflow-hidden rounded-[4px] ring-1 ring-black/5" style={{ aspectRatio: "1024 / 590" }}>
          {screens.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? alt : ""}
              fill
              unoptimized
              loading={i === 0 ? "eager" : "lazy"}
              className={
                i === active
                  ? "z-[2] opacity-100 motion-safe:transition-opacity motion-safe:duration-[600ms] motion-safe:ease-in-out"
                  : i === prev
                    ? "z-[1] opacity-100"
                    : "z-0 opacity-0"
              }
            />
          ))}
        </div>
      </Link>
      {/* The chin: one progress line per screen. */}
      <div className="flex h-[22px] items-center justify-center border-t border-line bg-[#f1efeb]">
        <div className="grid w-[34%] gap-1.5" style={{ gridTemplateColumns: `repeat(${screens.length}, 1fr)` }}>
          {screens.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show step ${i + 1} of ${screens.length}`}
              aria-current={i === active ? "step" : undefined}
              className="group flex h-[22px] cursor-pointer items-center"
            >
              <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-black/10 transition-colors group-hover:bg-black/25">
                {i === active && (
                  <span
                    key={active}
                    className="process-fill absolute inset-0 origin-left bg-foreground/70"
                    style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                    onAnimationEnd={() => go((active + 1) % screens.length)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
