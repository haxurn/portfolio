export type ProjectLink = {
  label: string;
  href: string;
  kind: "repo" | "pr" | "live" | "docs";
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: readonly string[];
  status: "shipped" | "ongoing" | "archived";
  type: "contribution" | "project" | "plugin" | "sdk";
  links: readonly ProjectLink[];
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "better-hub",
    title: "better-hub",
    summary:
      "Re-imagining code collaboration for humans and agents.",
    description:
      "A collaboration surface designed from the ground up for mixed human + AI-agent workflows. Treats agents as first-class teammates — shared context, durable state, auditable actions. Private preview, TypeScript end-to-end.",
    stack: ["TypeScript", "Next.js", "AI agents"],
    status: "ongoing",
    type: "project",
    links: [
      { label: "View repository", href: "https://github.com/haxurn/better-hub", kind: "repo" },
    ],
    featured: true,
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
    links: [
      { label: "View repository", href: "https://github.com/haxurn/better-waitlist", kind: "repo" },
    ],
  },
  {
    slug: "chapa-nodejs",
    title: "chapa-nodejs",
    summary:
      "Typed NodeJS SDK for Chapa — Ethiopia's payment gateway.",
    description:
      "A strongly-typed Node/TypeScript SDK around Chapa's API. Handles initialization, verification, webhooks, and refunds — with zod-validated payloads and a minimal footprint. Built because the ecosystem deserved better.",
    stack: ["TypeScript", "Node.js", "Payments"],
    status: "ongoing",
    type: "sdk",
    links: [
      { label: "View repository", href: "https://github.com/haxurn/chapa-nodejs", kind: "repo" },
    ],
  },
  {
    slug: "better-auth",
    title: "Better Auth — contributions",
    summary:
      "Upstream work on the most comprehensive authentication framework for TypeScript.",
    description:
      "Ongoing contributions to Better Auth — patches, plugins, and docs. Most visible work: the Fastify integration (PR #2006) documenting the adapter path end-to-end, hook ordering, and TS inference edges.",
    stack: ["TypeScript", "Open Source", "Auth"],
    status: "ongoing",
    type: "contribution",
    links: [
      { label: "My fork", href: "https://github.com/haxurn/better-auth", kind: "repo" },
      { label: "PR #2006", href: "https://github.com/better-auth/better-auth/pull/2006", kind: "pr" },
    ],
  },
  {
    slug: "loglib",
    title: "loglib",
    summary:
      "Privacy-first, open-source web analytics — crafted with care.",
    description:
      "Analytics you can self-host, with no third-party tracking and no PII. Small bundle, typed events, and a dashboard that actually respects the visitor.",
    stack: ["TypeScript", "Analytics", "Privacy"],
    status: "ongoing",
    type: "project",
    links: [
      { label: "View repository", href: "https://github.com/haxurn/loglib", kind: "repo" },
    ],
  },
] as const;
