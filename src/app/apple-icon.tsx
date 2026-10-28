import { ImageResponse } from "next/og";
import { brandFonts } from "./brand-fonts";
import { Monogram } from "./icon";

// Home-screen icon on iPhone/iPad. iOS rounds the corners itself, so the square stays square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram px={180} radius={0} />, { ...size, fonts: brandFonts });
}
