import type { CSSProperties, ReactNode } from "react";

// Hero backdrop: a still field of square dots that slowly fade in and out in scattered groups,
// across three depth layers (far: tiny and soft; mid: a halftone wave; near: large and blurred).

// Deterministic pseudo-random so server and client render the same field.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const k = (2 * Math.PI) / 1200;
const wave = (x: number) => (Math.sin(x * k * 2 + 1.4) * 22.8 + Math.sin(x * k - 0.8) * 30) * 2.2;

const GROUPS = 8;
const layers = [
  { gap: 16, size: [0.6, 1.4], opacity: 0.1, blur: 0.4 }, // far
  { gap: 26, size: [0.8, 3], opacity: 0.16, blur: 0 }, // mid: the halftone wave
  { gap: 64, size: [3, 7], opacity: 0.06, blur: 2.5 }, // near
];

export function TwinkleSquares() {
  return (
    <svg
      className="twinkle-field absolute inset-0 size-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {layers.map((layer, li) => {
        // Dots are dealt into groups; each group breathes on its own slow cycle.
        const groups: ReactNode[][] = Array.from({ length: GROUPS }, () => []);
        for (let y = layer.gap / 2; y < 700; y += layer.gap) {
          for (let x = layer.gap / 2; x < 1200; x += layer.gap) {
            const seed = li * 100000 + y * 1000 + x;
            if (li === 2 && rand(seed + 1) > 0.35) continue;
            const crest = 350 + wave(x);
            const near = Math.exp(-(((y - crest) / 170) ** 2));
            const t = li === 1 ? near : rand(seed);
            const r = (layer.size[0] + (layer.size[1] - layer.size[0]) * t) / 2 + 0.3;
            groups[Math.floor(rand(seed + 2) * GROUPS)].push(
              <rect
                key={`${x}-${y}`}
                x={(x - r).toFixed(1)}
                y={(y - r).toFixed(1)}
                width={(2 * r).toFixed(1)}
                height={(2 * r).toFixed(1)}
              />,
            );
          }
        }
        return (
          <g
            key={li}
            fill="currentColor"
            fillOpacity={layer.opacity}
            style={layer.blur ? { filter: `blur(${layer.blur}px)` } : undefined}
          >
            {groups.map((g, gi) => (
              <g
                key={gi}
                className="twinkle"
                style={
                  {
                    "--dur": `${7 + rand(li * 10 + gi) * 6}s`,
                    "--delay": `${-rand(li * 10 + gi + 50) * 13}s`,
                  } as CSSProperties
                }
              >
                {g}
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
