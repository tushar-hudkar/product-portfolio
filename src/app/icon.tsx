import { ImageResponse } from "next/og";
import { BRAND, brandFonts } from "./brand-fonts";

// Browser-tab icon: "th" in the site's serif on the hero's dark green-black, with a green dot.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram px={64} />, { ...size, fonts: brandFonts });
}

/** Shared with apple-icon.tsx; everything scales with `px`. */
export function Monogram({ px, radius = 0.22 }: { px: number; radius?: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.bg,
        borderRadius: px * radius,
        color: BRAND.fg,
        fontFamily: "Editors Note",
        fontSize: px * 0.74,
        letterSpacing: -px * 0.02,
        paddingBottom: px * 0.1,
      }}
    >
      th
      <span style={{ color: BRAND.green }}>.</span>
    </div>
  );
}
