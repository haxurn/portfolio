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
      "Started at the Information Network Security Administration while still in grade 9. Youngest in the room, learning from people who'd been doing this for a decade.",
  },
  {
    date: "2024 / early",
    rawDate: "2024-01",
    title: "Started coding — Python + CTF",
    body:
      "Wrote my first real scripts in Python. Went deep on CTFs and cybersecurity — reversing, crypto, binary exploitation. The work mattered more once I could automate it.",
  },
  {
    date: "2024 / mid",
    rawDate: "2024-06",
    title: "Shifted to TypeScript",
    body:
      "Pivoted hard into development — TypeScript across the stack, React, Next.js, Hono. Started contributing to Better Auth and building plugins for its ecosystem.",
  },
  {
    date: "2026 / now",
    rawDate: "2026",
    title: "Co-founder, Solvix Labs PLC",
    body:
      "Co-founded Solvix Labs PLC and build Axova there, the unified commerce system for Ethiopia. Security-minded, TypeScript end-to-end. Shipping code, not just exploiting it.",
  },
] as const;
