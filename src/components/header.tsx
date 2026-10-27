import Link from "next/link";
import { nav, site } from "@/lib/site";
import { HeaderTheme } from "./header-theme";
import { LinkedInIcon, MailIcon } from "./icons";

export function Header() {
  return (
    <header className="header sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur transition-colors duration-300">
      <HeaderTheme />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          aria-label={site.name}
          className="font-serif text-2xl leading-none font-bold lowercase"
        >
          tushar hudkar
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm">
          <div className="hidden items-center gap-5 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.resume || "#"}
              target={site.resume ? "_blank" : undefined}
              rel="noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              Resume
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={site.linkedin || "#"}
              target={site.linkedin ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-line/50 hover:text-foreground"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-line/50 hover:text-foreground"
            >
              <MailIcon />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
