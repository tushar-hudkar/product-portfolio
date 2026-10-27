"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Marks the header `data-over-dark` while a `[data-dark-hero]` section sits under it. */
export function HeaderTheme() {
  const pathname = usePathname();

  // Re-runs on every route change, since the header persists across pages.
  useEffect(() => {
    const header = document.querySelector("header");
    const hero = document.querySelector("[data-dark-hero]");
    if (!header) return;
    if (!hero) {
      header.removeAttribute("data-over-dark");
      return;
    }
    // One rect read per scroll event is cheap, and unlike rAF it also runs in background tabs.
    const update = () => {
      const over = hero.getBoundingClientRect().bottom > header.offsetHeight;
      header.toggleAttribute("data-over-dark", over);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return null;
}
