import Image from "next/image";

// Hand-held iPhone 14 Pro (Mockuuups Studio), cropped to 1880 × 2700 source px. The phone's
// screen sits at x 263, y 58, 1055 × 2286 with a ~150px corner radius; the island at
// x 360–694, y 29–126 within the screen. The app screen is a vector SVG layered on top,
// so its UI stays sharp; the photo underneath is prepared at 2× display size.
const SRC = { w: 1880, h: 2700 };
const SCREEN = { x: 263, y: 58, w: 1055, h: 2286, r: 150 };
const ISLAND = { x: 360, y: 29, w: 335, h: 98 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// The wrist is cut by the crop at the bottom and right edges: fade both, keeping the thumb
// (which reaches ~90% of the width) and the phone fully visible. With `bleed`, the hand runs
// into the container's bottom and right edges from 1024px up, which cut it cleanly instead.
const FADE =
  "[mask-image:linear-gradient(to_bottom,#000_88%,transparent),linear-gradient(to_right,#000_91%,transparent)] [mask-composite:intersect]";
const NO_FADE_LG = "lg:[mask-image:none]";

export function HandPhone({
  screen,
  alt,
  className = "w-[min(392px,78vw)]",
  bleed,
}: {
  screen: string;
  alt: string;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div className={`relative mx-auto ${FADE} ${bleed ? NO_FADE_LG : ""} ${className}`} style={{ aspectRatio: `${SRC.w} / ${SRC.h}` }}>
      <Image src="/work/product-capture-app/hand-frame.webp" alt="" fill unoptimized className="select-none" />
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          left: pct(SCREEN.x, SRC.w),
          top: pct(SCREEN.y, SRC.h),
          width: pct(SCREEN.w, SRC.w),
          height: pct(SCREEN.h, SRC.h),
          borderRadius: `${pct(SCREEN.r, SCREEN.w)} / ${pct(SCREEN.r, SCREEN.h)}`,
        }}
      >
        <Image src={screen} alt={alt} fill unoptimized />
        {/* Dynamic Island. No visible lens: on the app's black status bar the pill disappears,
            and a lone lens dot at its right end read as a misplaced mark. */}
        <span
          className="absolute rounded-full bg-black"
          style={{
            left: pct(ISLAND.x, SCREEN.w),
            top: pct(ISLAND.y, SCREEN.h),
            width: pct(ISLAND.w, SCREEN.w),
            height: pct(ISLAND.h, SCREEN.h),
          }}
        />
      </div>
    </div>
  );
}
