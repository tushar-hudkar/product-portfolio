import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Editor's Note (the site's serif) for the generated favicon and link-preview images.
// ImageResponse needs TTF/OTF data, not the web fonts next/font serves. Read once at build,
// with literal paths so the files are traced into the build.
const [regular, italic] = await Promise.all([
  readFile(join(process.cwd(), "src/fonts/TTF/Editor'sNote-Regular.ttf")),
  readFile(join(process.cwd(), "src/fonts/TTF/Editor'sNote-Italic.ttf")),
]);

export const brandFonts = [
  { name: "Editors Note", data: regular, style: "normal" as const, weight: 400 as const },
  { name: "Editors Note", data: italic, style: "italic" as const, weight: 400 as const },
];

// The hero's dark palette.
export const BRAND = { bg: "#0b0d0c", fg: "#f2f4f3", muted: "#9ba19d", line: "#2c312e", green: "#19c37d" };
