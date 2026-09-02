export type Skill = {
  readonly id: string;
  readonly label: string;
  readonly pct: number;
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
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Professional practice.",
    glyph: "◢",
    items: [
      {
        id: "web-pentest",
        label: "Web penetration testing",
        pct: 90,
        since: 2023,
        note: "Methodical testing with Burp Suite and careful notes. Most of my findings begin with a parameter that looked unremarkable.",
        tags: ["burp", "recon", "authz"],
      },
      {
        id: "web-security",
        label: "Web security",
        pct: 85,
        since: 2023,
        note: "I prefer to eliminate a class of vulnerability rather than patch a single instance of it.",
        tags: ["appsec", "threat-model", "code-review"],
      },
      {
        id: "cryptography",
        label: "Cryptography",
        pct: 75,
        since: 2024,
        note: "Padding oracles and reused nonces taught me more than any textbook chapter did.",
        tags: ["ctf", "rsa", "aes"],
      },
      {
        id: "reverse-engineering",
        label: "Reverse engineering",
        pct: 70,
        since: 2023,
        note: "Working in Ghidra to reconstruct what a program actually does, as opposed to what its documentation claims.",
        tags: ["ghidra", "static-analysis", "x86"],
      },
      {
        id: "binary-exploitation",
        label: "Binary exploitation",
        pct: 60,
        since: 2024,
        note: "Comfortable constructing ROP chains, and regularly reminded how effective modern mitigations are.",
        tags: ["pwn", "rop", "gdb"],
      },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    tagline: "Primary tools.",
    glyph: "◤",
    items: [
      {
        id: "typescript",
        label: "TypeScript / JavaScript",
        pct: 92,
        since: 2024,
        note: "Strict mode, no escape hatches. I write the types first and treat them as the specification.",
        tags: ["strict-mode", "zod", "better-auth"],
      },
      {
        id: "python",
        label: "Python",
        pct: 90,
        since: 2024,
        note: "The first language I became fluent in, and still my choice when time is short.",
        tags: ["scripting", "automation", "ctf-tooling"],
      },
      {
        id: "react-next",
        label: "React / Next.js",
        pct: 88,
        since: 2024,
        note: "Server components by default, with client components only where the DOM genuinely requires them.",
        tags: ["app-router", "rsc", "motion"],
      },
      {
        id: "html-css",
        label: "HTML / CSS",
        pct: 80,
        since: 2024,
        note: "Semantic markup, token-driven Tailwind, and focus states that are designed rather than left to the browser.",
        tags: ["tailwind-v4", "a11y", "layout"],
      },
      {
        id: "hono",
        label: "Hono",
        pct: 75,
        since: 2025,
        note: "Small, fully typed services. Most of my backends now begin as a Hono router.",
        tags: ["edge", "rpc", "middleware"],
      },
      {
        id: "bash",
        label: "Bash",
        pct: 70,
        since: 2023,
        note: "The glue between everything else. Written quickly and read with care.",
        tags: ["pipes", "tooling", "ci"],
      },
      {
        id: "c-cpp",
        label: "C / C++",
        pct: 65,
        since: 2024,
        note: "I read far more of it than I write, usually to understand where a program fails.",
        tags: ["memory", "source-dive", "pwn"],
      },
    ],
  },
  {
    id: "music",
    title: "Music production",
    tagline: "In progress.",
    glyph: "◈",
    items: [
      {
        id: "daw",
        label: "DAW",
        pct: 40,
        since: 2025,
        note: "FL Studio, most Sundays. I am still learning the fundamentals of the workflow.",
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
