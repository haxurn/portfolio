export type Skill = {
  label: string;
  pct: number;
};

export type SkillGroup = {
  id: string;
  title: string;
  tagline: string;
  items: readonly Skill[];
};

export const skills: readonly SkillGroup[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    tagline: "Day job.",
    items: [
      { label: "Web penetration testing", pct: 90 },
      { label: "Web security", pct: 85 },
      { label: "Cryptography", pct: 75 },
      { label: "Reverse engineering", pct: 70 },
      { label: "Binary exploitation", pct: 60 },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    tagline: "Daily driver.",
    items: [
      { label: "TypeScript / JavaScript", pct: 92 },
      { label: "Python", pct: 90 },
      { label: "React / Next.js", pct: 88 },
      { label: "HTML / CSS", pct: 80 },
      { label: "Hono", pct: 75 },
      { label: "Bash", pct: 70 },
      { label: "C / C++", pct: 65 },
    ],
  },
  {
    id: "music",
    title: "Music production",
    tagline: "Still learning.",
    items: [
      { label: "DAW", pct: 40 },
      { label: "Beat making", pct: 35 },
      { label: "Sound design", pct: 25 },
    ],
  },
] as const;
