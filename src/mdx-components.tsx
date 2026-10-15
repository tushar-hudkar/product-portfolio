import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/figure";
import { Metrics, Callout, Cards, Card } from "@/components/case-study";

const isRight = (props: { align?: string; style?: { textAlign?: string } }) =>
  props.align === "right" || props.style?.textAlign === "right";

const components: MDXComponents = {
  h2: (props) => (
    <h2 className="cs-h2 mt-24 mb-6 scroll-mt-24 font-serif text-4xl leading-tight sm:text-5xl" {...props} />
  ),
  h3: (props) => <h3 className="mt-12 mb-3 text-xl font-medium" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed text-foreground/85" {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 marker:text-muted" {...props} />
  ),
  li: (props) => <li className="leading-relaxed text-foreground/85" {...props} />,
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  a: (props) => (
    <a className="underline decoration-1 underline-offset-4 hover:text-accent" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-2 border-accent pl-5 font-serif text-xl italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-16 border-line" />,
  table: (props) => (
    <div className="my-10 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm tabular-nums" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className={`border-b border-line bg-surface px-5 py-2.5 align-bottom font-medium ${isRight(props) ? "whitespace-nowrap" : ""}`}
      {...props}
    />
  ),
  td: (props) => (
    <td
      className={`border-b border-line px-5 py-2.5 text-muted ${isRight(props) ? "whitespace-nowrap" : ""}`}
      {...props}
    />
  ),
  Figure,
  Metrics,
  Callout,
  Cards,
  Card,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
