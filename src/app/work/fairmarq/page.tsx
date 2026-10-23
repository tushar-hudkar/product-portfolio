import type { Metadata } from "next";
import { FairmarqStory } from "./story";
import "./fairmarq.css";

export const metadata: Metadata = {
  title: "Fairmarq",
  description:
    "A self-initiated design story: the psychology behind money decisions across borders, and a decision-support app built around it.",
  openGraph: {
    title: "Fairmarq · Money decisions are never just maths",
    description:
      "The psychology behind money decisions across borders, and a decision-support app built around it.",
    images: ["/work/fairmarq/og.png"],
  },
};

export default function FairmarqPage() {
  return <FairmarqStory />;
}
