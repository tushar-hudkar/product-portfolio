import Image from "next/image";
import Link from "next/link";

const screens = [
  { src: "/work/fairmarq/breakdown.jpg", alt: "Fairmarq provider breakdown showing the hidden markup in rupees" },
  { src: "/work/fairmarq/home.jpg", alt: "Fairmarq home: $500 converts to ₹47,450, with the after-fees range" },
  { src: "/work/fairmarq/trends.jpg", alt: "Fairmarq trends: today's rate in context of the last three months" },
];

/**
 * Homepage feature for the self-initiated Fairmarq project: a full-width dark band leading to its story page.
 * Two links: the "View the story" text and the stack of screens. Hovering the screens fans
 * them out and brightens the text link, so it's clear where they lead.
 */
export function FairmarqFeature() {
  return (
    <section
      aria-labelledby="fairmarq"
      className="mt-28 overflow-hidden bg-[#0b0d0c] text-[#f2f4f3] [&:has(.fq-stack:hover)_.fq-cta]:text-[#19c37d] [&:has(.fq-stack:hover)_.fq-cta]:decoration-[#19c37d]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6">
        <div className="max-w-md">
          <p className="font-hand text-2xl text-[#9ba19d]">self-initiated</p>
          <h2 id="fairmarq" className="mt-1 font-sans text-4xl font-bold tracking-tight">
            Fairmar<span className="text-[#19c37d]">q</span>
          </h2>
          <p className="mt-6 font-serif text-3xl leading-tight">
            Money decisions are never just <em className="text-[#19c37d]">maths.</em>
          </p>
          <p className="mt-5 leading-relaxed text-[#9ba19d]">
            A decision-support app for people who send money home, travel or get paid from abroad.
            Built on the psychology of money decisions, from user interviews to a working app.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs text-[#9ba19d]">
            {["Fintech", "Decision support", "iOS · Android · Web", "Solo, with AI"].map((t) => (
              <li key={t} className="rounded-full border border-[#232725] px-3 py-1.5">
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/work/fairmarq"
            className="fq-cta group/cta mt-9 inline-flex items-center gap-2 text-sm text-[#9ba19d] underline decoration-[#2c312e] underline-offset-[6px] transition-colors hover:text-[#19c37d] hover:decoration-[#19c37d]"
          >
            View the story
            <span aria-hidden="true" className="transition-transform group-hover/cta:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <Link
          href="/work/fairmarq"
          aria-label="Fairmarq: view the story"
          className="fq-stack group relative mx-auto flex h-[420px] w-full max-w-[520px] cursor-pointer items-center justify-center outline-offset-4 sm:h-[500px]"
        >
          {screens.map((s, i) => (
            <div
              key={s.src}
              className={`absolute w-[44%] overflow-hidden rounded-[28px] border border-[#2c312e] bg-[#151816] p-1.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out motion-reduce:transition-none ${
                i === 1
                  ? "z-10 w-[50%] group-hover:-translate-y-2"
                  : i === 0
                    ? "-translate-x-[58%] translate-y-6 -rotate-3 group-hover:-translate-x-[64%] group-hover:-rotate-6"
                    : "translate-x-[58%] translate-y-6 rotate-3 group-hover:translate-x-[64%] group-hover:rotate-6"
              }`}
            >
              <Image src={s.src} alt="" width={640} height={1387} className="rounded-[22px]" sizes="(min-width: 1024px) 260px, 45vw" />
            </div>
          ))}
        </Link>
      </div>
    </section>
  );
}
