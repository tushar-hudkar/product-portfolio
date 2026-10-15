import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="reveal mx-auto max-w-6xl px-6 pt-20">
      <p className="font-hand text-2xl text-highlight">get in touch</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-7xl">
        Have a product problem worth solving?{" "}
        <span className="font-serif font-normal italic">Let&apos;s talk.</span>
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        I&apos;m open to product design roles and collaborations — especially around AI,
        e-commerce and complex B2B workflows. The fastest way to reach me is email; I
        usually reply within a couple of days.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-line p-8">
          <p className="text-xs uppercase tracking-widest text-muted">Email</p>
          <p className="mt-3 text-2xl font-medium tracking-tight break-all">{site.email}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyEmail email={site.email} className="border-line hover:border-foreground" />
            <a
              href={`mailto:${site.email}?subject=Hello%20Tushar`}
              className="rounded-full bg-accent px-4 py-2 text-sm text-white hover:opacity-85"
            >
              Write an email →
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-line p-8">
          <p className="text-xs uppercase tracking-widest text-muted">Elsewhere</p>
          <ul className="mt-3 space-y-3 text-lg">
            {site.linkedin && (
              <li>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                  LinkedIn ↗
                </a>
              </li>
            )}
            {site.resume && (
              <li>
                <a href={site.resume} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Resume ↗
                </a>
              </li>
            )}
            {!site.linkedin && !site.resume && (
              <li className="text-muted">Email is the best way to reach me.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
