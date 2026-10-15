import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-32">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">
        This page wandered off.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block underline decoration-1 underline-offset-4 hover:text-accent"
      >
        Back home →
      </Link>
    </section>
  );
}
