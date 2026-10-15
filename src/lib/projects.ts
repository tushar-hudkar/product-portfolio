export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  company: string;
  year: string;
  platform: string;
  role: string;
  timeline?: string;
  team?: string;
  // section: case study heading the card links to
  highlight?: { value: string; label: string; section?: string };
  tags: string[];
  cover: string;
  coverTone: "dark" | "light";
  link?: string; // live product
  hideHeroSummary?: boolean; // omit summary under the title on the case study page
  hideHeroCover?: boolean; // omit cover image on the case study page (still used on cards)
  figma?: string; // Figma file or prototype
};

export const projects: Project[] = [
  {
    slug: "ai-marketplace-listing",
    title: "AI Powered Marketplace Listing Platform",
    shortTitle: "AI-powered marketplace listing",
    summary:
      "Designing an end-to-end AI experience that transforms fragmented seller workflows into a unified marketplace listing platform.",
    company: "Dresma",
    year: "2024–25",
    platform: "Web app",
    role: "Product Designer — research, strategy, IA, interaction design",
    timeline: "Aug 2024 – Jun 2025",
    team: "Founders, Product, Engineering, AI, Marketing, Sales",
    figma: "https://www.figma.com/design/xPGfi8h5cuGjY1dyFsUeIA/Portfolio?node-id=1-2&t=mNh4QivyKWs1ISYh-1",
    highlight: {
      value: "28% → 64%",
      label: "Activation rate",
      section: "Impact & Reflection",
    },
    tags: ["Generative AI", "B2B SaaS", "E-commerce"],
    cover: "/work/ai-marketplace-listing/cover.webp",
    coverTone: "dark",
  },
  {
    slug: "design-studio",
    title: "Design Studio: Bringing asset creation and production workflows into a more structured, transactional environment",
    shortTitle: "Design Studio",
    summary:
      "Reducing the friction between submitting a creative requirement and receiving a production-ready e-commerce asset.",
    company: "Dresma",
    year: "2022–24",
    platform: "Web app",
    role: "Research, end-to-end UX & UI design",
    timeline: "Oct 2022 – Nov 2024",
    team: "Product Manager, Frontend Engineers, Creative Team and junior UI Designer",
    figma: "https://www.figma.com/design/xPGfi8h5cuGjY1dyFsUeIA/Portfolio?node-id=0-1&t=VOs2457bD7hf5NTq-1",
    highlight: {
      value: "9.7% → 58.8%",
      label: "In-studio activation",
      section: "Measuring Success / Metric",
    },
    tags: ["Creative tools", "Workflow design", "AI editing"],
    cover: "/work/design-studio/cover.webp",
    coverTone: "dark",
    hideHeroSummary: true,
  },
  {
    slug: "product-capture-app",
    title: "Mobile-first product photography solution from product capture to publish-ready content",
    shortTitle: "Mobile-first product photography",
    summary:
      "Manage product assets without relying entirely on studios and professional photographers.",
    company: "Dresma",
    year: "2023–24",
    platform: "iOS & Android",
    role: "Lead Product Designer — Product strategy",
    timeline: "Sep 2023 – Apr 2024",
    team: "Product, Engineering, AI/ML, Business and Design",
    figma: "https://www.figma.com/design/xPGfi8h5cuGjY1dyFsUeIA/Portfolio?node-id=1-3&t=VOs2457bD7hf5NTq-1",
    highlight: { value: "9 → 4 min", label: "Time to asset", section: "Measuring success" },
    tags: ["Mobile", "AI UX", "Camera"],
    cover: "/work/product-capture-app/cover.webp",
    coverTone: "light",
    hideHeroSummary: true,
    hideHeroCover: true,
  },
  {
    slug: "saas-content-platform",
    title: "A SaaS platform empowering brands to deliver high-impact content across multiple channels",
    shortTitle: "Multichannel content platform",
    summary:
      "Designed a scalable automation and data retention system to power data-driven decisions across teams.",
    company: "Dresma",
    year: "2022–24",
    platform: "Web app · customer & internal",
    role: "Lead Product Designer — Product strategy",
    team: "Product, Marketing, Technology, Sales, Customer Success",
    highlight: { value: "−48%", label: "Task completion time", section: "Impact" },
    tags: ["B2B SaaS", "Operations", "Systems design"],
    cover: "/work/saas-content-platform/cover.webp",
    coverTone: "dark",
    hideHeroSummary: true,
  },
  {
    slug: "agentic-ai-workflow",
    title: "Workflow that unifies separate linear journeys through an agentic conversational interface",
    shortTitle: "Agentic AI workflow",
    summary:
      "Design a chat-based agentic system with collaborative agents operating in shared context for a seamless user experience.",
    company: "Dresma",
    year: "2024",
    platform: "Web app",
    role: "Product Designer — AI experience & system design",
    tags: ["Agentic AI", "Conversational UX", "Multi-agent"],
    cover: "/work/agentic-ai-workflow/cover.webp",
    coverTone: "dark",
    hideHeroSummary: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
