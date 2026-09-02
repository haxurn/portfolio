export type JourneyEntry = {
  date: string;
  rawDate: string;
  title: string;
  body: string;
};

export const journey: readonly JourneyEntry[] = [
  {
    date: "2022",
    rawDate: "2022",
    title: "First lines of code, self-taught",
    body:
      "At fifteen I wrote my first HTML and CSS with no course and no mentor, just documentation and a browser. I made small pages for friends and spent more time breaking them than styling them. Wanting to know what happens underneath a page set the direction for everything since.",
  },
  {
    date: "2023",
    rawDate: "2023",
    title: "Security at sixteen: joined INSA",
    body:
      "At sixteen I joined INSA, Ethiopia's national security agency, to learn how systems fail. I was trained by analysts with a decade of experience.",
  },
  {
    date: "2024 / early",
    rawDate: "2024-01",
    title: "First code: Python and CTF",
    body:
      "I wrote my first real programs in Python and started competing in capture-the-flag events: reverse engineering, cryptography, binary exploitation. Once I could automate the work, I could do far more of it.",
  },
  {
    date: "2024",
    rawDate: "2024-03",
    title: "Red team at INSA",
    body:
      "I joined INSA's red team. The work: attack real systems with permission, test web applications, and write reports so the weaknesses get fixed. This is where security became my profession.",
  },
  {
    date: "2024 / mid",
    rawDate: "2024-06",
    title: "Moved into TypeScript development",
    body:
      "I moved into software development full time: TypeScript everywhere, with React, Next.js, and Hono. Around the same time I started contributing to Better Auth and building plugins for it.",
  },
  {
    date: "2024 → now",
    rawDate: "2024-09",
    title: "Co-founded Solvix Labs PLC",
    body:
      "In 2024 I co-founded Solvix Labs PLC. We build Axova, a commerce platform for Ethiopian merchants. The stack is TypeScript end to end, and security is built in from the start. I now ship the kind of systems I used to only test.",
  },
] as const;
