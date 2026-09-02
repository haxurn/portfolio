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
  name: "Sami",
  alias: "Haxurn",
  role: "Cybersecurity + full-stack developer",
  tagline:
    "Security engineer and full-stack developer, co-founder of Solvix Labs PLC, and a music producer in training.",
  bio: [
    "My name is Sami, and online I go by Haxurn. I am a security engineer and full-stack developer based in Addis Ababa. Most of my week is spent reading binaries, writing TypeScript, and looking for the small improvements that make a system safer or an interface calmer.",
    "I joined the Information Network Security Administration in 2023 and learned the discipline from analysts who had practised it for a decade. In early 2024 I began programming in Python and competing in capture-the-flag events. By the middle of that year I had moved into full-time TypeScript development.",
    "Today I am co-founder and engineer at Solvix Labs PLC, where we build Axova, a unified commerce platform for Ethiopian merchants. Alongside that work I author and maintain plugins for the Better Auth ecosystem and contribute to open-source projects.",
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
