import Link from "next/link";
import { cacheLife } from "next/cache";
import { nav, site } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { LinkedInIcon, MailIcon } from "./icons";

// Cached at build time, so the year refreshes with each deploy.
async function currentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="mt-32 bg-[#161514] text-[#f2efe9]">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="font-hand text-3xl text-highlight">say hello</p>
        <h2 className="mt-2 font-serif text-5xl sm:text-7xl">Let&apos;s Connect</h2>
        <p className="mt-4 text-[#a8a39b]">
          Always up for collaborations, projects, or anything design!
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <CopyEmail
            email={site.email}
            className="border-[#3a3835] text-base hover:border-[#f2efe9]"
          />
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-sm text-[#a8a39b] hover:text-[#f2efe9]"
            >
              Call: {site.phone}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-[#2c2a27]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm text-[#a8a39b] sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-serif text-lg font-bold text-[#f2efe9] lowercase">{site.name}</span> · © {year}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-[#f2efe9]">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#f2efe9]">
                {item.label}
              </Link>
            ))}
            <a
              href={site.resume || "#"}
              target={site.resume ? "_blank" : undefined}
              rel="noreferrer"
              className="hover:text-[#f2efe9]"
            >
              Resume
            </a>
          </nav>
          <div className="flex gap-2">
            <a
              href={site.linkedin || "#"}
              target={site.linkedin ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full bg-[#f2efe9] text-[#161514] hover:opacity-85"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full bg-[#f2efe9] text-[#161514] hover:opacity-85"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
