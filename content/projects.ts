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
      "Site for a full-cycle film and video production house in Addis Ababa.",
    description:
      "Television, commercials, music videos and multi-camera live broadcast — one studio, seven disciplines. The site is cinema-first: film stills lead every fold, serif display type carries the voice, and the work index is built so a producer can reach a reel in one tap.",
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
      "The unified commerce system for Ethiopia — storefront, POS, marketplace, delivery.",
    description:
      "The product I work on at Solvix Labs. Merchants open a store in minutes, sell in person through Axova POS, reach shoppers on Axova Market and ship through Axova Go — one account, every channel. I build across the web app and the platform underneath it.",
    stack: ["TypeScript", "Next.js", "Commerce", "Monorepo"],
    status: "ongoing",
    type: "project",
    role: "Engineer · Solvix Labs",
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
      "Storefront for a Kenyan eyewear retailer — three brands, one checkout.",
    description:
      "An eyewear storefront built around the frames rather than the chrome: full-bleed editorial hero, three brand tiers in one catalogue, and a checkout that stays out of the way. Shipped and serving customers across Kenya.",
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
      "Cybersecurity academy for Ethiopia — certifications, course modules, bilingual.",
    description:
      "A training platform teaching security in Amharic and English: certification tracks, module-by-module progress, and embedded lab video. Built for people learning the field where I learned it.",
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
    slug: "mstradingx",
    title: "M_S Trading",
    summary:
      "Forex education and mentorship — structure, risk management, market psychology.",
    description:
      "A mentorship-focused trading school: programs, a published curriculum, and a process page that sets expectations before anyone pays. Clean, light, and built to convert serious learners rather than gamblers.",
    stack: ["TypeScript", "Next.js", "Education"],
    status: "shipped",
    type: "project",
    role: "Design + build",
    year: 2026,
    links: [
      { label: "Visit site", href: "https://mstradingx.vercel.app", kind: "live" },
    ],
    image: {
      src: "/work/mstradingx.jpg",
      alt: "M_S Trading homepage — light hero reading Trade with structure, discipline, and a clear plan.",
      width: 1200,
      height: 650,
    },
  },
  {
    slug: "better-middleware",
    title: "better-middleware",
    summary:
      "Framework-agnostic auth middleware for Better Auth — session validation, smart caching, structured errors.",
    description:
      "Plug-in middleware that wraps any backend (Hono, Fastify, Express, Next route handlers) with Better Auth session validation. Caches sessions safely, fails loudly with typed errors, and never leaks tokens.",
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
      "Drop-in waitlist plugin for Better Auth — email verification, queue control, referrals.",
    description:
      "A Better Auth plugin that turns sign-ups into a gated waitlist: verification emails, position tracking, referrals, and one-line admin invites. Ships with the types you'd expect from a first-party feature.",
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
      "The base I build security tooling on: one monorepo, shared architecture, reusable packages. Exists so each new CTF script or scanner starts from a standard instead of a blank file.",
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
    slug: "better-hub",
    title: "better-hub",
    summary:
      "Two merged PRs upstream on Better Auth's collaboration surface for humans and agents.",
    description:
      "Upstream work on better-auth/better-hub, a collaboration surface designed for mixed human + AI-agent workflows. I added Firefox support to the browser extension across two merged pull requests.",
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
      "Two merged PRs upstream on the Node SDK for Chapa, Ethiopia's payment gateway.",
    description:
      "Upstream work on fireayehu/chapa-nodejs, the TypeScript SDK for Chapa. Refunds, typed error handling, a build system and tests — two merged pull requests on the library Ethiopian developers reach for when they wire up payments.",
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
