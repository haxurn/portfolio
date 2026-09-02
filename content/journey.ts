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
      "At fifteen I opened a text editor and wrote my first HTML and CSS, with no course and no mentor, only documentation and a browser. I built small pages for friends and spent more time breaking them than styling them. That curiosity about what happens underneath a page set the direction for everything since.",
  },
  {
    date: "2023",
    rawDate: "2023",
    title: "Security at sixteen: joined INSA",
    body:
      "Wanting to understand how systems fail, I joined the Information Network Security Administration at sixteen and learned security practice from analysts with a decade of experience.",
  },
  {
    date: "2024 / early",
    rawDate: "2024-01",
    title: "First code: Python and CTF",
    body:
      "I wrote my first real programs in Python and committed to capture-the-flag competitions: reverse engineering, cryptography, and binary exploitation. Being able to automate the work changed how much of it I could do.",
  },
  {
    date: "2024",
    rawDate: "2024-03",
    title: "Red team at INSA",
    body:
      "I began working on INSA's red team: authorised offensive engagements, web application testing and reporting findings so they could be fixed. Testing systems for a living is where my security practice became professional.",
  },
  {
    date: "2024 / mid",
    rawDate: "2024-06",
    title: "Moved into TypeScript development",
    body:
      "I shifted my focus to software development: TypeScript across the stack, with React, Next.js, and Hono. In the same period I began contributing to Better Auth and building plugins for its ecosystem.",
  },
  {
    date: "2024 → now",
    rawDate: "2024-09",
    title: "Co-founded Solvix Labs PLC",
    body:
      "In 2024 I co-founded Solvix Labs PLC, where we build Axova, a unified commerce platform for Ethiopia. The work is TypeScript end to end and security-minded by default: I now ship the systems I once only tested.",
  },
] as const;
