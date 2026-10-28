import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { BRAND, brandFonts } from "./brand-fonts";

// The card shown when the site's link is shared (LinkedIn, WhatsApp, Slack, iMessage...).
// Platforms show it at about 500px wide, so it holds only three large things: the name, the
// role and the address, with nothing small enough to blur.
export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const host = new URL(site.url).host;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: BRAND.bg,
          color: BRAND.fg,
        }}
      >
        <div style={{ display: "flex", fontFamily: "Editors Note", fontSize: 136, lineHeight: 1, letterSpacing: -3 }}>
          Tushar Hudkar<span style={{ color: BRAND.green }}>.</span>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontFamily: "Geist", fontSize: 52, color: BRAND.green }}>
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 72,
            paddingTop: 36,
            borderTop: `2px solid ${BRAND.line}`,
            fontFamily: "Geist",
            fontSize: 40,
            color: BRAND.fg,
          }}
        >
          {host}
        </div>
      </div>
    ),
    { ...size, fonts: brandFonts },
  );
}
