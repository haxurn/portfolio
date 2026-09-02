export type Skill = {
  readonly id: string;
  readonly label: string;
  /** Self-assessed confidence, 0–100. Mapped to a tier in lib/skill-tier.ts. */
  readonly pct: number;
  /** Plain-language note for visitors: what I can do with this, and where I have done it. */
  readonly note: string;
  readonly since: number;
  readonly tags: readonly string[];
};

export type SkillGroup = {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly glyph: string;
  readonly items: readonly Skill[];
};

export const skills: readonly SkillGroup[] = [
  {
    id: "delivery",
    title: "What I build",
    tagline: "Backed by shipped projects.",
    glyph: "▚",
    items: [
      {
        id: "web-apps",
        label: "Full-stack web applications",
        pct: 90,
        since: 2024,
        note: "I design and build complete websites and web applications, from the database to the interface. Shipped examples: YES Multimedia, Mamy Opticians, Geez Security and the Axova web app.",
        tags: ["next.js", "postgres", "design"],
      },
      {
        id: "commerce",
        label: "E-commerce and payments",
        pct: 82,
        since: 2025,
        note: "Storefronts, checkout flows, point-of-sale and payment integrations. Axova is a full commerce platform; Mamy Opticians is a live storefront; I contributed refunds to the Chapa payment SDK.",
        tags: ["axova", "checkout", "chapa"],
      },
      {
        id: "auth",
        label: "Authentication systems",
        pct: 88,
        since: 2024,
        note: "Login, sessions, permissions and plugins on top of Better Auth. I publish two Better Auth packages on npm and have code merged into the framework itself.",
        tags: ["better-auth", "sessions", "npm"],
      },
      {
        id: "backend",
        label: "APIs and backend services",
        pct: 86,
        since: 2024,
        note: "Typed HTTP APIs and background services with Hono, tRPC, PostgreSQL and Redis queues. Most of Axova's services follow this pattern.",
        tags: ["hono", "trpc", "bullmq"],
      },
      {
        id: "mobile",
        label: "Mobile apps",
        pct: 74,
        since: 2025,
        note: "Cross-platform iOS and Android apps with React Native and Expo. Nine apps so far, including Axova POS, Axova Go and Axova Marketplace.",
        tags: ["expo", "react-native", "eas"],
      },
      {
        id: "cloud",
        label: "Cloud infrastructure",
        pct: 72,
        since: 2025,
        note: "Provisioning and running production systems on AWS with Terraform, Kubernetes and Helm: clusters, databases, caches, storage and CI/CD pipelines for Axova.",
        tags: ["aws", "terraform", "kubernetes"],
      },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Professional practice since 2023.",
    glyph: "◢",
    items: [
      {
        id: "web-pentest",
        label: "Web penetration testing",
        pct: 90,
        since: 2023,
        note: "I test web applications for security weaknesses and write reports that developers can act on. This is my day-to-day work on INSA's red team.",
        tags: ["burp", "recon", "authz"],
      },
      {
        id: "red-team",
        label: "Red team operations",
        pct: 80,
        since: 2024,
        note: "Authorised offensive engagements against real systems: planning, exploitation, documenting the path in, and briefing the people who need to close it.",
        tags: ["insa", "engagements", "reporting"],
      },
      {
        id: "web-security",
        label: "Secure development",
        pct: 85,
        since: 2023,
        note: "Building software so it is hard to attack in the first place: threat modelling, secure code review and fixing whole classes of bugs rather than single instances.",
        tags: ["appsec", "threat-model", "code-review"],
      },
      {
        id: "cryptography",
        label: "Applied cryptography",
        pct: 75,
        since: 2024,
        note: "Practical understanding of how encryption is used and misused: padding oracles, reused nonces, weak key handling. Mostly learned by breaking it in CTFs.",
        tags: ["ctf", "rsa", "aes"],
      },
      {
        id: "reverse-engineering",
        label: "Reverse engineering",
        pct: 70,
        since: 2023,
        note: "Taking compiled programs apart in Ghidra to find out what they really do, as opposed to what their documentation says.",
        tags: ["ghidra", "static-analysis", "x86"],
      },
      {
        id: "binary-exploitation",
        label: "Binary exploitation",
        pct: 60,
        since: 2024,
        note: "Memory-corruption exploits and ROP chains in CTF settings. Comfortable with the fundamentals; modern mitigations still keep me humble.",
        tags: ["pwn", "rop", "gdb"],
      },
    ],
  },
  {
    id: "programming",
    title: "Languages and frameworks",
    tagline: "Daily tools.",
    glyph: "◤",
    items: [
      {
        id: "typescript",
        label: "TypeScript / JavaScript",
        pct: 92,
        since: 2024,
        note: "My primary language, used in strict mode across 43 repositories. I write the types first and treat them as the specification.",
        tags: ["strict-mode", "zod", "node"],
      },
      {
        id: "react-next",
        label: "React / Next.js",
        pct: 88,
        since: 2024,
        note: "Every shipped site runs on Next.js. Server components by default, client code only where the browser genuinely needs it.",
        tags: ["app-router", "rsc", "tailwind"],
      },
      {
        id: "python",
        label: "Python",
        pct: 90,
        since: 2024,
        note: "The first language I became fluent in. My choice for security tooling, automation and anything that has to exist by tonight.",
        tags: ["scripting", "automation", "ctf-tooling"],
      },
      {
        id: "html-css",
        label: "HTML / CSS",
        pct: 80,
        since: 2022,
        note: "Where I started. Semantic markup, accessible focus states and a token-driven Tailwind setup like the one behind this site.",
        tags: ["tailwind-v4", "a11y", "layout"],
      },
      {
        id: "hono",
        label: "Hono",
        pct: 75,
        since: 2025,
        note: "Small, fully typed web services. Most of my backends now start as a Hono router.",
        tags: ["edge", "rpc", "middleware"],
      },
      {
        id: "bash",
        label: "Bash",
        pct: 70,
        since: 2023,
        note: "The glue between everything else: scripts, CI steps and my dotfiles.",
        tags: ["pipes", "tooling", "ci"],
      },
      {
        id: "c-cpp",
        label: "C / C++",
        pct: 65,
        since: 2024,
        note: "I read far more of it than I write, usually to understand where a program fails. bhnet, my network utility, is written in C.",
        tags: ["memory", "source-dive", "pwn"],
      },
    ],
  },
  {
    id: "music",
    title: "Music production",
    tagline: "Learning, on weekends.",
    glyph: "◈",
    items: [
      {
        id: "daw",
        label: "FL Studio",
        pct: 40,
        since: 2025,
        note: "Most Sundays. Still learning the fundamentals of arrangement and mixing.",
        tags: ["fl-studio", "arrangement", "mixing"],
      },
      {
        id: "beat-making",
        label: "Beat making",
        pct: 35,
        since: 2025,
        note: "Loops that have not yet become finished songs. Finishing them is the current goal.",
        tags: ["drums", "sampling", "groove"],
      },
      {
        id: "sound-design",
        label: "Sound design",
        pct: 25,
        since: 2026,
        note: "Shaping sounds until they feel deliberate rather than accidental.",
        tags: ["synthesis", "fx", "texture"],
      },
    ],
  },
] as const;
