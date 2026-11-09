import Link from "next/link";
import { cacheLife } from "next/cache";
import { nav, site } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { FooterName } from "./footer-name";

// Cached at build time, so the year refreshes with each deploy.
async function currentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

const pages = [{ label: "Home", href: "/" }, ...nav];

/**
 * Dark footer (the hero palette, via dark-scope): a closing line that echoes the hero ("understand" → "understood"),
 * the email as the main link, small link lists, and the name oversized along the bottom edge.
 */
export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="dark-scope mt-32 overflow-hidden bg-background">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 pt-24 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="font-hand text-2xl text-brand">say hello</p>
          <h2 className="mt-2 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Got a complex product? Let&apos;s make it{" "}
            <em className="text-brand">understood.</em>
          </h2>
          {/* The email opens the mail app; Copy is there for visitors without one set up.
              On mouse devices Copy appears on hover (or keyboard focus); on touch screens it is always shown. */}
          <div className="email-row mt-10 flex w-fit flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-xl underline decoration-line underline-offset-8 transition-colors hover:decoration-foreground sm:text-2xl"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
            <CopyEmail
              email={site.email}
              label="Copy"
              className="border-line text-muted hover:border-foreground hover:text-foreground copy-reveal"
            />
          </div>
        </div>

        <div className="flex gap-16 text-sm lg:pt-10">
          <nav aria-label="Footer">
            <p className="mb-4 text-xs tracking-widest text-muted uppercase">
              Pages
            </p>
            <ul className="space-y-2.5">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.resume || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="mb-4 text-xs tracking-widest text-muted uppercase">
              Elsewhere
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={site.linkedin || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl justify-between gap-6 px-6 text-xs text-muted">
        <span>© {year}</span>
        <span>Designed &amp; built with AI</span>
      </div>

      {/* The name, oversized in a soft grey and cropped slightly by the bottom edge; sized in vw, so it spans
          the width on every screen. A green spotlight follows the cursor on hover. */}
      <FooterName name={site.name} />
    </footer>
  );
}
