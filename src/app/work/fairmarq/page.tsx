import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { FairmarqStory } from "./story";
import "./fairmarq.css";

export const metadata: Metadata = pageMetadata({
  title: "Fairmarq",
  description:
    "A self-initiated design story: the psychology behind money decisions across borders, and a decision-support app built around it.",
  path: "/work/fairmarq",
  ogTitle: "Fairmarq · Money decisions are never just maths",
  images: ["/work/fairmarq/og.png"],
});

export default function FairmarqPage() {
  return <FairmarqStory />;
}
