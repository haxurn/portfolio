export type StackGroupId =
  | "languages"
  | "frameworks"
  | "data"
  | "infra"
  | "tooling";

export type StackItem = {
  readonly id: string;
  readonly name: string;
  /** Simple Icons slug — rendered from https://cdn.simpleicons.org/<slug>. */
  readonly icon: string;
  /** Brand colour, 6-digit hex without '#'. Shown on hover only. */
  readonly brand: string;
  readonly group: StackGroupId;
  /** Where it shows up. Counts come from a `gh` audit of my repositories (Sep 2026). */
  readonly evidence: string;
};

export type StackGroup = {
  readonly id: StackGroupId;
  readonly title: string;
  readonly glyph: string;
};

export const stackGroups: readonly StackGroup[] = [
  { id: "languages", title: "Languages", glyph: "◢" },
  { id: "frameworks", title: "Frameworks & libraries", glyph: "◤" },
  { id: "data", title: "Data & auth", glyph: "◈" },
  { id: "infra", title: "Infrastructure", glyph: "▚" },
  { id: "tooling", title: "Tooling & security", glyph: "✦" },
] as const;

export const stack: readonly StackItem[] = [
  // Languages
  { id: "typescript", name: "TypeScript", icon: "typescript", brand: "3178C6", group: "languages", evidence: "43 repositories · primary language" },
  { id: "javascript", name: "JavaScript", icon: "javascript", brand: "F7DF1E", group: "languages", evidence: "42 repositories" },
  { id: "python", name: "Python", icon: "python", brand: "3776AB", group: "languages", evidence: "14 repositories · CTF tooling, automation" },
  { id: "bash", name: "Bash", icon: "gnubash", brand: "4EAA25", group: "languages", evidence: "10 repositories · scripts, dotfiles" },
  { id: "dart", name: "Dart / Flutter", icon: "flutter", brand: "02569B", group: "languages", evidence: "Axova Rider mobile app" },
  { id: "go", name: "Go", icon: "go", brand: "00ADD8", group: "languages", evidence: "2 repositories · services" },
  { id: "c", name: "C", icon: "c", brand: "A8B9CC", group: "languages", evidence: "bhnet network utility · exploitation" },
  { id: "solidity", name: "Solidity", icon: "solidity", brand: "363636", group: "languages", evidence: "voting-dapp" },

  // Frameworks & libraries
  { id: "nextjs", name: "Next.js", icon: "nextdotjs", brand: "000000", group: "frameworks", evidence: "10 projects · every shipped site" },
  { id: "react", name: "React", icon: "react", brand: "61DAFB", group: "frameworks", evidence: "12 projects" },
  { id: "tailwind", name: "Tailwind CSS", icon: "tailwindcss", brand: "06B6D4", group: "frameworks", evidence: "12 projects · v4, token-driven" },
  { id: "hono", name: "Hono", icon: "hono", brand: "E36002", group: "frameworks", evidence: "5 projects · typed API edges" },
  { id: "trpc", name: "tRPC", icon: "trpc", brand: "2596BE", group: "frameworks", evidence: "5 projects · end-to-end types" },
  { id: "tanstack", name: "TanStack Query", icon: "reactquery", brand: "FF4154", group: "frameworks", evidence: "8 projects · server state" },
  { id: "zod", name: "Zod", icon: "zod", brand: "3E67B1", group: "frameworks", evidence: "16 projects · every system boundary" },
  { id: "radix", name: "Radix / shadcn", icon: "shadcnui", brand: "000000", group: "frameworks", evidence: "7 projects · accessible primitives" },
  { id: "gsap", name: "GSAP", icon: "gsap", brand: "0AE448", group: "frameworks", evidence: "This site · scroll choreography" },

  // Data & auth
  { id: "postgres", name: "PostgreSQL", icon: "postgresql", brand: "4169E1", group: "data", evidence: "Axova, Geez Security, SchoolHub" },
  { id: "prisma", name: "Prisma", icon: "prisma", brand: "2D3748", group: "data", evidence: "4 projects" },
  { id: "drizzle", name: "Drizzle ORM", icon: "drizzle", brand: "C5F74F", group: "data", evidence: "5 projects" },
  { id: "neon", name: "Neon", icon: "neon", brand: "00E599", group: "data", evidence: "4 projects · serverless Postgres" },
  { id: "supabase", name: "Supabase", icon: "supabase", brand: "3FCF8E", group: "data", evidence: "Mamy Opticians" },
  { id: "redis", name: "Redis · BullMQ", icon: "redis", brand: "FF4438", group: "data", evidence: "Axova · queues and caching" },
  { id: "betterauth", name: "Better Auth", icon: "betterauth", brand: "000000", group: "data", evidence: "7 projects · 2 published plugins · upstream contributor" },

  // Infrastructure
  { id: "docker", name: "Docker", icon: "docker", brand: "2496ED", group: "infra", evidence: "7 Dockerfiles · Compose for local stacks" },
  { id: "terraform", name: "Terraform", icon: "terraform", brand: "844FBA", group: "infra", evidence: "Axova infrastructure" },
  { id: "vercel", name: "Vercel", icon: "vercel", brand: "000000", group: "infra", evidence: "5 live sites" },
  { id: "railway", name: "Railway", icon: "railway", brand: "0B0D0E", group: "infra", evidence: "Axova services" },
  { id: "gha", name: "GitHub Actions", icon: "githubactions", brand: "2088FF", group: "infra", evidence: "CI on Axova, Geez Security, this site" },
  { id: "turborepo", name: "Turborepo · Nx", icon: "turborepo", brand: "EF4444", group: "infra", evidence: "Monorepos: Axova, Siranet, Karivo" },

  // Tooling & security
  { id: "bun", name: "Bun", icon: "bun", brand: "000000", group: "tooling", evidence: "Default runtime and package manager" },
  { id: "pnpm", name: "pnpm", icon: "pnpm", brand: "F69220", group: "tooling", evidence: "Axova monorepo, this site" },
  { id: "vitest", name: "Vitest", icon: "vitest", brand: "6E9F18", group: "tooling", evidence: "5 projects" },
  { id: "oxc", name: "Oxlint · Oxfmt", icon: "oxc", brand: "000000", group: "tooling", evidence: "7 projects · lint and format" },
  { id: "neovim", name: "Neovim · tmux · zsh", icon: "neovim", brand: "57A143", group: "tooling", evidence: "dotfiles · daily editor" },
  { id: "git", name: "Git", icon: "git", brand: "F05032", group: "tooling", evidence: "Every project" },
  { id: "burp", name: "Burp Suite", icon: "burpsuite", brand: "FF6633", group: "tooling", evidence: "Web penetration testing" },
  { id: "linux", name: "Linux", icon: "linux", brand: "FCC624", group: "tooling", evidence: "Primary OS · servers" },
] as const;

export const STACK_ICON_CDN = "https://cdn.simpleicons.org";

export function stackIconUrl(item: StackItem): string {
  return `${STACK_ICON_CDN}/${item.icon}`;
}

export function stackByGroup(groupId: StackGroupId): readonly StackItem[] {
  return stack.filter((item) => item.group === groupId);
}
