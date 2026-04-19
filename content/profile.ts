export type Social = {
  handle: string;
  url?: string;
  label: string;
};

export type Profile = {
  name: string;
  alias: string;
  role: string;
  tagline: string;
  bio: readonly string[];
  location: string;
  timezone: string;
  email: string;
  focus: string;
  socials: {
    github: Social;
    instagram: Social;
    discord: Social;
  };
};

export const profile: Profile = {
  name: "Sami",
  alias: "Haxurn",
  role: "Cybersecurity + full-stack developer",
  tagline:
    "Cybersecurity enthusiast, full-stack developer, and aspiring music producer.",
  bio: [
    "I'm Sami — online I go by Haxurn. I spend most of my week reading binaries, writing TypeScript, and chasing small discoveries that make systems safer or interfaces calmer.",
    "Joined INSA in 2023 while still in grade 9 — youngest in the room, learning security from people who'd been doing it for a decade. Picked up Python and CTFs in early 2024, then shifted to full-time TypeScript development by mid-year.",
    "Today I'm an engineer at Solvix Labs LLC, working on a private product. On the side, I build and maintain plugins for the Better Auth ecosystem and contribute to open source.",
  ],
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  email: "haxurn@gmail.com",
  focus: "Engineer @ Solvix Labs · building in private",
  socials: {
    github: {
      handle: "haxurn",
      url: "https://github.com/haxurn",
      label: "GitHub",
    },
    instagram: {
      handle: "haxurn",
      url: "https://instagram.com/haxurn",
      label: "Instagram",
    },
    discord: {
      handle: "haxurn",
      label: "Discord",
    },
  },
};
