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
  /** Merged pull requests on repositories I don't own. Verified via `gh search prs --author haxurn --merged`. */
  upstream: { mergedPrs: number; repos: number };
  socials: {
    github: Social;
    instagram: Social;
    discord: Social;
  };
};

export const profile: Profile = {
  name: "Samson Tesfaye",
  alias: "Haxurn",
  role: "Cybersecurity + full-stack developer",
  tagline:
    "I build web and mobile products, test their security, and co-founded Solvix Labs PLC. On weekends I make music.",
  bio: [
    "My name is Samson Tesfaye. Online I go by Haxurn. I am a security engineer and full-stack developer in Addis Ababa. Most of my week goes into two things: building software in TypeScript, and testing software to find out how it breaks.",
    "I taught myself. At fifteen I wrote my first HTML and CSS, made small pages for friends, and kept taking them apart to see why they broke. That curiosity led to security. At sixteen I joined INSA, Ethiopia's national security agency, and learned from analysts with a decade of experience. In 2024 I joined INSA's red team, where I test real systems with permission and report what I find. The same year I learned Python, started competing in capture-the-flag events, and moved into full-time TypeScript development.",
    "Today I am co-founder and engineer at Solvix Labs PLC, which we started in 2024. We build Axova, a platform that lets Ethiopian merchants sell online, in store, and through a marketplace from one account. Alongside that, I publish plugins for Better Auth and contribute to open-source projects.",
  ],
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  email: "haxurn@gmail.com",
  focus: "Co-founder, Solvix Labs PLC · building Axova",
  upstream: { mergedPrs: 6, repos: 4 },
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
