import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { BRAND, brandFonts } from "./brand-fonts";

// The card shown when the site's link is shared (LinkedIn, WhatsApp, Slack, iMessage...):
// the homepage hero in miniature, on its dark palette.
export const alt = `${site.name}, ${site.role}: I design products people understand — and systems that last.`;
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
          justifyContent: "space-between",
          padding: "64px 72px",
          background: BRAND.bg,
          color: BRAND.fg,
          fontFamily: "Editors Note",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -0.5 }}>
          tushar hudkar<span style={{ color: BRAND.green }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 74, lineHeight: 1.08, letterSpacing: -1.5 }}>
          <div style={{ display: "flex" }}>
            I design products people&nbsp;<span style={{ color: BRAND.green, fontStyle: "italic" }}>understand</span>
          </div>
          <div style={{ display: "flex" }}>— and systems that last.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${BRAND.line}`,
            paddingTop: 28,
            fontSize: 28,
            color: BRAND.muted,
          }}
        >
          <span>
            {site.role} · AI products for e-commerce
          </span>
          <span style={{ color: BRAND.fg }}>{host}</span>
        </div>
      </div>
    ),
    { ...size, fonts: brandFonts },
  );
}
