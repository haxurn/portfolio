export type JourneyEntry = {
  date: string;
  rawDate: string;
  title: string;
  body: string;
};

export const journey: readonly JourneyEntry[] = [
  {
    date: "2023",
    rawDate: "2023",
    title: "Joined INSA",
    body:
      "I joined the Information Network Security Administration and learned security practice from analysts with a decade of experience.",
  },
  {
    date: "2024 / early",
    rawDate: "2024-01",
    title: "First code: Python and CTF",
    body:
      "I wrote my first real programs in Python and committed to capture-the-flag competitions: reverse engineering, cryptography, and binary exploitation. Being able to automate the work changed how much of it I could do.",
  },
  {
    date: "2024 / mid",
    rawDate: "2024-06",
    title: "Moved into TypeScript development",
    body:
      "I shifted my focus to software development: TypeScript across the stack, with React, Next.js, and Hono. In the same period I began contributing to Better Auth and building plugins for its ecosystem.",
  },
  {
    date: "2026 / now",
    rawDate: "2026",
    title: "Co-founded Solvix Labs PLC",
    body:
      "I co-founded Solvix Labs PLC, where we build Axova, a unified commerce platform for Ethiopia. The work is TypeScript end to end and security-minded by default: I now ship the systems I once only tested.",
  },
] as const;
