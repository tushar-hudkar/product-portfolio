import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { imageSize } from "image-size";

type Props = {
  src: string; // path inside /public, e.g. "/work/slug/image.webp"
  alt: string;
  caption?: string;
  wide?: boolean;
  priority?: boolean;
  tone?: "dark" | "light";
  fill?: boolean; // portrait images span the full container instead of a narrow column
  hideOnMobile?: boolean; // dense diagrams whose text is unreadable below tablet width
};

// Cached so the file read happens once at build time and lands in the static shell.
// Keyed on mtime too, so replacing an image under the same name picks up its new size.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- mtime only varies the cache key
async function dimensions(src: string, mtime: number) {
  "use cache";
  const file = await readFile(path.join(process.cwd(), "public", src));
  const { width = 1600, height = 1000 } = imageSize(file);
  return { width, height };
}

export async function Figure({ src, alt, caption, wide = true, priority, tone, fill, hideOnMobile }: Props) {
  const { mtimeMs } = await stat(path.join(process.cwd(), "public", src));
  const { width, height } = await dimensions(src, mtimeMs);
  const portrait = height > width && !fill;
  return (
    <figure className={`my-14 ${wide ? "-mx-6 sm:mx-0" : ""} ${hideOnMobile ? "hidden md:block" : ""}`}>
      <div
        className={`overflow-hidden sm:rounded-3xl ${
          tone === "dark" ? "bg-[#161514]" : "bg-surface"
        } ${portrait ? "py-8" : ""}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 960px, 100vw"
          className={portrait ? "mx-auto h-auto w-full max-w-md" : "h-auto w-full"}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 px-6 text-sm italic text-muted sm:px-0">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
