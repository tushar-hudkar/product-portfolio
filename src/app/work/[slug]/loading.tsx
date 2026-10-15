// Fallback shell for the case study route; known slugs are prerendered, so this rarely shows.
export default function Loading() {
  return <div className="mx-auto min-h-screen max-w-6xl px-6 pt-14" aria-busy="true" />;
}
