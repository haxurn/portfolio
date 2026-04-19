import "server-only";
import { cacheTag, cacheLife } from "next/cache";

export type GitHubStats = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  stars: number;
  topLanguages: readonly { name: string; count: number }[];
  url: string;
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "haxurn-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

type GhRepo = {
  stargazers_count: number;
  fork: boolean;
  language: string | null;
};

export type ContributionDay = {
  date: string;
  weekday: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = { days: ContributionDay[] };

export type ContributionCalendar = {
  total: number;
  weeks: ContributionWeek[];
  start: string;
  end: string;
};

export async function getContributions(
  username: string,
): Promise<ContributionCalendar | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(`github-contribs:${username}`);

  try {
    const res = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          "User-Agent": "haxurn-portfolio",
          Accept: "text/html",
        },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();

    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );
    const total = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
      : 0;

    const cellRe =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="contribution-day-component-(\d+)-(\d+)"[^>]*data-level="(\d)"/g;

    const byWeek = new Map<number, ContributionDay[]>();
    let m: RegExpExecArray | null;
    while ((m = cellRe.exec(html))) {
      const date = m[1];
      const col = parseInt(m[2], 10);
      const row = parseInt(m[3], 10);
      const level = Math.max(0, Math.min(4, parseInt(m[4], 10))) as
        | 0
        | 1
        | 2
        | 3
        | 4;
      const weekDays = byWeek.get(col) ?? [];
      weekDays.push({ date, weekday: row, level });
      byWeek.set(col, weekDays);
    }

    if (byWeek.size === 0) return null;

    const weeks: ContributionWeek[] = Array.from(byWeek.keys())
      .sort((a, b) => a - b)
      .map((col) => ({
        days: (byWeek.get(col) ?? []).sort((a, b) => a.weekday - b.weekday),
      }));

    const allDays = weeks.flatMap((w) => w.days);
    const dates = allDays.map((d) => d.date).sort();

    return {
      total,
      weeks,
      start: dates[0] ?? "",
      end: dates[dates.length - 1] ?? "",
    };
  } catch {
    return null;
  }
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  "use cache";
  cacheLife("hours");
  cacheTag(`github:${username}`);

  const user = await fetchJson<GhUser>(`https://api.github.com/users/${username}`);
  const repos = await fetchJson<GhRepo[]>(
    `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
  );

  const owned = repos.filter((r) => !r.fork);
  const stars = owned.reduce((acc, r) => acc + r.stargazers_count, 0);

  const langCounts = new Map<string, number>();
  for (const repo of owned) {
    if (!repo.language) continue;
    langCounts.set(repo.language, (langCounts.get(repo.language) ?? 0) + 1);
  }
  const topLanguages = Array.from(langCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    login: user.login,
    name: user.name,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    stars,
    topLanguages,
    url: user.html_url,
  };
}
