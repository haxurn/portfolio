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
    tagline: "Day job.",
    glyph: "◢",
    items: [
      {
        id: "web-pentest",
        label: "Web penetration testing",
        pct: 90,
        since: 2023,
        note: "Burp open, notes in the margin. Most findings start as a parameter that looked boring.",
        tags: ["burp", "recon", "authz"],
      },
      {
        id: "web-security",
        label: "Web security",
        pct: 85,
        since: 2023,
        note: "I would rather kill the bug class than patch the one instance of it.",
        tags: ["appsec", "threat-model", "code-review"],
      },
      {
        id: "cryptography",
        label: "Cryptography",
        pct: 75,
        since: 2024,
        note: "Padding oracles and reused nonces taught me more than any textbook chapter.",
        tags: ["ctf", "rsa", "aes"],
      },
      {
        id: "reverse-engineering",
        label: "Reverse engineering",
        pct: 70,
        since: 2023,
        note: "Ghidra open, coffee cold, reconstructing what the author meant to say.",
        tags: ["ghidra", "static-analysis", "x86"],
      },
      {
        id: "binary-exploitation",
        label: "Binary exploitation",
        pct: 60,
        since: 2024,
        note: "Comfortable with a ROP chain. Still regularly humbled by modern mitigations.",
        tags: ["pwn", "rop", "gdb"],
      },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    tagline: "Daily driver.",
    glyph: "◤",
    items: [
      {
        id: "typescript",
        label: "TypeScript / JavaScript",
        pct: 92,
        since: 2024,
        note: "Strict mode, no escape hatches. The types are the spec I write first.",
        tags: ["strict-mode", "zod", "better-auth"],
      },
      {
        id: "python",
        label: "Python",
        pct: 90,
        since: 2024,
        note: "First language I got fluent in. Still what I reach for when the clock is running.",
        tags: ["scripting", "automation", "ctf-tooling"],
      },
      {
        id: "react-next",
        label: "React / Next.js",
        pct: 88,
        since: 2024,
        note: "Server components by default. Client only where the DOM genuinely demands it.",
        tags: ["app-router", "rsc", "motion"],
      },
      {
        id: "html-css",
        label: "HTML / CSS",
        pct: 80,
        since: 2024,
        note: "Semantic markup, token-driven Tailwind, focus states that actually exist.",
        tags: ["tailwind-v4", "a11y", "layout"],
      },
      {
        id: "hono",
        label: "Hono",
        pct: 75,
        since: 2025,
        note: "Small typed edges. Most of my backends start as a Hono router now.",
        tags: ["edge", "rpc", "middleware"],
      },
      {
        id: "bash",
        label: "Bash",
        pct: 70,
        since: 2023,
        note: "Glue for everything else. Written quickly, read very slowly.",
        tags: ["pipes", "tooling", "ci"],
      },
      {
        id: "c-cpp",
        label: "C / C++",
        pct: 65,
        since: 2024,
        note: "I read far more of it than I write — usually to find out what breaks.",
        tags: ["memory", "source-dive", "pwn"],
      },
    ],
  },
  {
    id: "music",
    title: "Music production",
    tagline: "Still learning.",
    glyph: "◈",
    items: [
      {
        id: "daw",
        label: "DAW",
        pct: 40,
        since: 2025,
        note: "FL Studio open most Sundays. Mostly still learning where things live.",
        tags: ["fl-studio", "arrangement", "mixing"],
      },
      {
        id: "beat-making",
        label: "Beat making",
        pct: 35,
        since: 2025,
        note: "Loops that never quite become songs. Currently working on the never.",
        tags: ["drums", "sampling", "groove"],
      },
      {
        id: "sound-design",
        label: "Sound design",
        pct: 25,
        since: 2026,
        note: "Turning knobs until something sounds deliberate instead of accidental.",
        tags: ["synthesis", "fx", "texture"],
      },
    ],
  },
] as const;
