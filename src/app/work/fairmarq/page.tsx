import type { Metadata } from "next";
import { site } from "@/lib/site";
import { FairmarqStory } from "./story";
import "./fairmarq.css";

export const metadata: Metadata = {
  title: "Fairmarq",
  description:
    "A self-initiated design story: the psychology behind money decisions across borders, and a decision-support app built around it.",
  // A page-level openGraph replaces the layout's whole object, so siteName is repeated here;
  // LinkedIn shows it under the title (and falls back to the URL without it).
  openGraph: {
    siteName: site.name,
    title: "Fairmarq · Money decisions are never just maths",
    description:
      "The psychology behind money decisions across borders, and a decision-support app built around it.",
    images: ["/work/fairmarq/og.png"],
  },
};

export default function FairmarqPage() {
  return <FairmarqStory />;
}
