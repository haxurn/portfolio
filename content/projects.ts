export type ProjectLink = {
  label: string;
  href: string;
  kind: "repo" | "pr" | "live" | "docs";
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectType = "contribution" | "project" | "plugin";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: readonly string[];
  status: "shipped" | "ongoing" | "archived";
  /**
   * `project`  — a repo or site I own.
   * `plugin`   — a library I author and publish.
   * `contribution` — upstream work on a repo I forked; the PRs are the proof.
   */
  type: ProjectType;
  role: string;
  year: number;
  links: readonly ProjectLink[];
  image?: ProjectImage;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "yes-multimedia",
    title: "YES Multimedia",
    summary:
      "Website for a full-service film and video production company in Addis Ababa.",
    description:
      "YES Multimedia makes television, commercials, music videos, and live broadcasts. I designed and built a site that puts their work first: film stills open every section, and a producer can reach any showreel in one tap.",
    stack: ["TypeScript", "Next.js", "Editorial design"],
    status: "shipped",
    type: "project",
    role: "Design + build",
    year: 2026,
    links: [
      {
        label: "Visit site",
        href: "https://yesmultimediaandcommunication.com/",
        kind: "live",
      },
    ],
    image: {
      src: "/work/yes-multimedia.jpg",
      alt: "YES Multimedia homepage — dark cinematic hero reading Unleashing Creativity beside the studio's illuminated signage.",
      width: 1200,
      height: 650,
    },
    featured: true,
  },
  {
    slug: "axova",
    title: "Axova",
    summary:
      "A unified commerce platform for Ethiopia: online storefront, point of sale, marketplace, and delivery.",
    description:
      "Axova is the product we build at Solvix Labs PLC, the company I co-founded. A merchant opens an online store in minutes, sells in person with Axova POS, reaches shoppers on Axova Market, and ships with Axova Go, all from one account. I work on the web app and the platform under it.",
    stack: ["TypeScript", "Next.js", "Commerce", "Monorepo"],
    status: "ongoing",
    type: "project",
    role: "Co-founder · Solvix Labs PLC",
    year: 2025,
    links: [{ label: "Visit site", href: "https://www.axova.io", kind: "live" }],
    image: {
      src: "/work/axova.jpg",
      alt: "Axova homepage — warm paper background with the headline Create your online store in minutes.",
      width: 1200,
      height: 650,
    },
  },
  {
    slug: "mamy-opticians",
    title: "Mamy Opticians",
    summary:
      "E-commerce storefront for a Kenyan eyewear retailer with three brands and a single checkout.",
    description:
      "An online eyewear store designed around the glasses, not the interface: large photography, three brands in one catalogue, and a checkout that stays out of the way. Live and serving customers across Kenya.",
    stack: ["TypeScript", "Next.js", "E-commerce"],
    status: "shipped",
    type: "project",
    role: "Design + build",
    year: 2026,
    links: [
      { label: "Visit site", href: "https://www.mamy-opticians.com/", kind: "live" },
    ],
    image: {
      src: "/work/mamy-opticians.jpg",
      alt: "Mamy Opticians storefront homepage — split editorial hero of two models wearing frames.",
      width: 1200,
      height: 641,
    },
  },
  {
    slug: "geezsec",
    title: "Geez Security",
    summary:
      "Bilingual cybersecurity academy for Ethiopia with certification tracks and course modules.",
    description:
      "A training platform that teaches security in Amharic and English, with certification tracks, progress tracking, and lab videos. I built it for people learning the field where I learned it.",
    stack: ["TypeScript", "Next.js", "Security education"],
    status: "shipped",
    type: "project",
    role: "Design + build",
    year: 2026,
    links: [
      { label: "Visit site", href: "https://geezsec.vercel.app", kind: "live" },
    ],
    image: {
      src: "/work/geezsec.jpg",
      alt: "Geez Security homepage — dark hero reading Ethiopia's Premier Cybersecurity Academy above a course module panel.",
      width: 1200,
      height: 649,
    },
  },
  {
    slug: "better-middleware",
    title: "better-middleware",
    summary:
      "Framework-agnostic authentication middleware for Better Auth with session validation, caching, and typed errors.",
    description:
      "Adds Better Auth login checks to any backend: Hono, Fastify, Express, or Next.js. It caches sessions safely, returns clear typed errors, and never leaks tokens.",
    stack: ["TypeScript", "Better Auth", "Security"],
    status: "ongoing",
    type: "plugin",
    role: "Author",
    year: 2025,
    links: [
      { label: "View repository", href: "https://github.com/haxurn/better-middleware", kind: "repo" },
    ],
  },
  {
    slug: "better-waitlist",
    title: "better-waitlist",
    summary:
      "Waitlist plugin for Better Auth with email verification, queue management, and referrals.",
    description:
      "A Better Auth plugin that turns sign-ups into a managed waitlist: verification emails, queue positions, referral links, and one-line admin invites. Fully typed, like a built-in feature.",
    stack: ["TypeScript", "Better Auth", "Plugin"],
    status: "ongoing",
    type: "plugin",
    role: "Author · npm",
    year: 2026,
    links: [
      { label: "View repository", href: "https://github.com/haxurn/better-waitlist", kind: "repo" },
      { label: "npm", href: "https://www.npmjs.com/package/better-waitlist", kind: "docs" },
    ],
  },
  {
    slug: "haxurn-core",
    title: "haxurn-core",
    summary:
      "Monorepo foundation for a suite of cybersecurity tools and shared packages.",
    description:
      "The base I build security tools on: one monorepo, shared structure, reusable packages. Each new scanner or CTF utility starts from a standard instead of an empty file.",
    stack: ["TypeScript", "Monorepo", "CTF"],
    status: "ongoing",
    type: "project",
    role: "Author",
    year: 2025,
    links: [
      { label: "View repository", href: "https://github.com/haxurn/haxurn-core", kind: "repo" },
    ],
  },
  {
    slug: "better-auth",
    title: "better-auth",
    summary:
      "Merged upstream documentation for Better Auth's Fastify integration, plus the waitlist plugin proposal that became better-waitlist.",
    description:
      "Contributions to Better Auth, the TypeScript authentication framework. My Fastify integration guide was merged into the official docs. I also proposed a built-in waitlist plugin; that work now ships as my better-waitlist package.",
    stack: ["TypeScript", "Open Source", "Authentication"],
    status: "shipped",
    type: "contribution",
    role: "Contributor · fork → upstream",
    year: 2025,
    links: [
      { label: "PR #2006 · merged", href: "https://github.com/better-auth/better-auth/pull/2006", kind: "pr" },
      { label: "PR #3400 · waitlist proposal", href: "https://github.com/better-auth/better-auth/pull/3400", kind: "pr" },
    ],
  },
  {
    slug: "better-hub",
    title: "better-hub",
    summary:
      "Two merged upstream pull requests on Better Auth's collaboration platform for humans and AI agents.",
    description:
      "Contributions to better-hub, Better Auth's collaboration platform for people and AI agents. In two merged pull requests I added Firefox support to the browser extension, including downloads for both Chrome and Firefox.",
    stack: ["TypeScript", "Open Source", "Browser extension"],
    status: "shipped",
    type: "contribution",
    role: "Contributor · fork → upstream",
    year: 2026,
    links: [
      { label: "PR #87", href: "https://github.com/better-auth/better-hub/pull/87", kind: "pr" },
      { label: "PR #71", href: "https://github.com/better-auth/better-hub/pull/71", kind: "pr" },
    ],
  },
  {
    slug: "chapa-nodejs",
    title: "chapa-nodejs",
    summary:
      "Two merged upstream pull requests on the Node.js SDK for Chapa, Ethiopia's payment gateway.",
    description:
      "Contributions to chapa-nodejs, the TypeScript SDK for Chapa, Ethiopia's payment gateway. In two merged pull requests I added refunds, typed error handling, a build system, and tests.",
    stack: ["TypeScript", "Open Source", "Payments"],
    status: "shipped",
    type: "contribution",
    role: "Contributor · fork → upstream",
    year: 2026,
    links: [
      { label: "PR #17", href: "https://github.com/fireayehu/chapa-nodejs/pull/17", kind: "pr" },
      { label: "PR #14", href: "https://github.com/fireayehu/chapa-nodejs/pull/14", kind: "pr" },
    ],
  },
] as const;

export const featuredProject: Project =
  projects.find((p) => p.featured) ?? projects[0];

/** Shipped or in-flight sites with a screenshot, minus the featured one. */
export const siteProjects: readonly Project[] = projects.filter(
  (p) => p.type === "project" && p.image && !p.featured,
);

/** Repos, plugins and upstream contributions — no screenshot. */
export const openSourceProjects: readonly Project[] = projects.filter(
  (p) => !p.image,
);

export function countByType(type: ProjectType): number {
  return projects.filter((p) => p.type === type).length;
}
