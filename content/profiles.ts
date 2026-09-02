export type ProfileKind = "code" | "ctf" | "writing" | "social";

export type ExternalProfile = {
  readonly id: string;
  readonly label: string;
  readonly handle: string;
  readonly url: string;
  /** Simple Icons slug for the mark, or null when the platform has none. */
  readonly icon: string | null;
  readonly kind: ProfileKind;
  /** One line on what lives there. Verified Sep 2026 by fetching each profile. */
  readonly note: string;
};

/**
 * Profiles beyond the primary contact channels. Every URL was fetched and
 * confirmed to resolve to Samson Tesfaye / haxurn before being listed.
 */
export const profiles: readonly ExternalProfile[] = [
  {
    id: "npm",
    label: "npm",
    handle: "~haxurn",
    url: "https://www.npmjs.com/~haxurn",
    icon: "npm",
    kind: "code",
    note: "3 published packages · better-waitlist, better-middleware, conduithub",
  },
  {
    id: "gitlab",
    label: "GitLab",
    handle: "@haxurn",
    url: "https://gitlab.com/haxurn",
    icon: "gitlab",
    kind: "code",
    note: "Mirror and private work",
  },
  {
    id: "leetcode",
    label: "LeetCode",
    handle: "haxurn",
    url: "https://leetcode.com/u/haxurn/",
    icon: "leetcode",
    kind: "code",
    note: "Algorithm practice",
  },
  {
    id: "codeforces",
    label: "Codeforces",
    handle: "haxurn",
    url: "https://codeforces.com/profile/haxurn",
    icon: "codeforces",
    kind: "code",
    note: "Competitive programming",
  },
  {
    id: "tryhackme",
    label: "TryHackMe",
    handle: "haxurn",
    url: "https://tryhackme.com/p/haxurn",
    icon: "tryhackme",
    kind: "ctf",
    note: "Level 65 · Guru · top 2% · 114 rooms · 15 badges",
  },
  {
    id: "bunabyte",
    label: "Buna Byte CTF",
    handle: "haxurn",
    url: "https://ctf.bunabyte.com/p/haxurn",
    icon: null,
    kind: "ctf",
    note: "Ethiopian CTF platform · 17 solves",
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    handle: "haxurn",
    url: "https://huggingface.co/haxurn",
    icon: "huggingface",
    kind: "code",
    note: "Models and experiments",
  },
  {
    id: "devto",
    label: "DEV Community",
    handle: "@haxurn",
    url: "https://dev.to/haxurn",
    icon: "devdotto",
    kind: "writing",
    note: "Technical writing",
  },
  {
    id: "medium",
    label: "Medium",
    handle: "@haxurn",
    url: "https://medium.com/@haxurn",
    icon: "medium",
    kind: "writing",
    note: "Longer-form essays",
  },
  {
    id: "x",
    label: "X",
    handle: "@haxurn",
    url: "https://x.com/haxurn",
    icon: "x",
    kind: "social",
    note: "Notes in public",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@haxurn",
    url: "https://t.me/haxurn",
    icon: "telegram",
    kind: "social",
    note: "Direct messages",
  },
] as const;

export const PROFILE_KIND_LABEL: Record<ProfileKind, string> = {
  code: "code",
  ctf: "ctf",
  writing: "writing",
  social: "social",
};
