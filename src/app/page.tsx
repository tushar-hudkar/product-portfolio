import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { companies, site } from "@/lib/site";
import { ProcessSteps } from "@/components/process-steps";
import { TwinkleSquares } from "@/components/twinkle-squares";
import { FairmarqFeature } from "@/components/fairmarq-feature";
import { CaseStudies } from "@/components/case-studies/case-studies";
import { LinkedInIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

// The lead belief is shown large; the rest are a list beside it.
const leadBelief = "The real user journey runs through the user's mind, not on the screen.";
const beliefs = [
  "Observation is the biggest tool.",
  "Language is more important than structure.",
  "Breaking rules while keeping the harmony — that's what excites me most about design.",
  "UX isn't always about making things easy — sometimes the simplest design can ruin the essence of the product.",
  "Fast doesn't always mean right. Embrace the uncertainty — dig a little, give it a thought, and you'll surprise yourself.",
];

const questions = [
  "Do I direct users to follow a certain path — or do the users guide me to make it?",
  "Do I make users think, or do I make them feel?",
  "Did I spend enough time with my solution without the designer's lens — just as a consumer?",
];

export default function Home() {
  return (
    <>
      {/* Hero: dark, in the Fairmarq palette, over a slowly twinkling square-dot field.
          On laptop/desktop screens that are tall enough it fills the window below the header (.hero-full). */}
      <section data-dark-hero className="hero-full dark-scope relative isolate flex items-center overflow-hidden bg-background text-foreground">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <TwinkleSquares />
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 pt-16 pb-24 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-20">
          <div className="reveal">
            <p className="-rotate-2 font-hand text-3xl text-brand">Hi, I&apos;m Tushar Hudkar.</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
              I design products people <em className="text-brand">understand</em> — and systems
              that&nbsp;last.
            </h1>
            <p className="mt-8 max-w-xl leading-relaxed text-muted">
              {/* The role leads the sentence, a step brighter than the rest, so it reads as who I am
                  without adding a label to the hero. */}
              <span className="text-foreground">{site.role}</span> with 10+ years turning complex B2B
              and B2C products into experiences that drive real outcomes. I integrate AI into my
              process and continuously evolve how I design.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <MailIcon /> Contact
              </a>
              <a
                href={site.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted decoration-1 underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
          <div className="reveal [animation-delay:150ms]">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Case studies */}
      <CaseStudies />

      {/* Fairmarq: self-initiated project */}
      <FairmarqFeature />

      {/* Previously worked with: small and centred. Logos are drawn a step smaller here. */}
      <section aria-labelledby="clients" className="mx-auto mt-20 max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 id="clients" className="text-[11px] tracking-widest text-muted uppercase">
            Previously worked with
          </h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {companies.map((c) => (
              <li key={c.name}>
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  className={`${"size" in c ? "h-3.5" : "h-5"} w-auto opacity-60 transition-opacity hover:opacity-100`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <hr className="border-line" />
      </div>

      {/* Questions: a compact row of three. */}
      <section aria-labelledby="questions" className="mx-auto mt-20 max-w-6xl px-6">
        <h2 id="questions" className="font-hand text-2xl text-brand">
          the questions I keep asking myself
        </h2>
        <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
          {questions.map((q, i) => (
            <li key={q} className="group flex gap-4">
              <span aria-hidden="true" className="font-mono text-xs text-muted pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground">
                {q}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* A line separates the questions from the philosophy. */}
      <div className="mx-auto mt-20 max-w-6xl px-6">
        <hr className="border-line" />
      </div>

      {/* Philosophy: the lead belief large on the left, the rest as a list beside it. */}
      <section aria-labelledby="philosophy" className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="font-hand text-2xl text-brand">who I am as a designer</p>
            <h2 id="philosophy" className="mt-1 font-serif text-5xl leading-tight tracking-tight">
              What I believe about design.
            </h2>
            <blockquote className="mt-10 border-l-2 border-brand pl-6 font-serif text-3xl leading-snug">
              {leadBelief}
            </blockquote>
          </div>
          <ul className="divide-y divide-line">
            {beliefs.map((b) => (
              <li key={b} className="group py-5 first:pt-0 last:pb-0">
                <p className="text-lg leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground">
                  {b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
