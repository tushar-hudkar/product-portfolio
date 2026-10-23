"use client";

import { useEffect } from "react";
import { storyHtml } from "./story-html";
import { runStory } from "./story-script";

/** The Fairmarq story: static markup, with scroll reveals, the live app and the full-screen overlay. */
export function FairmarqStory() {
  useEffect(() => runStory(), []);
  return <div className="fq" dangerouslySetInnerHTML={{ __html: storyHtml }} />;
}
