import { Github, Star, BookOpen, Users } from "lucide-react";
import { Suspense } from "react";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/content";

async function GitHubInner() {
  const username = profile.socials.github.handle;
  try {
    const stats = await getGitHubStats(username);
    return (
      <>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-surface-2 grid place-items-center text-fg-muted">
            <Github className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-fg truncate">@{stats.login}</div>
            <div className="text-xs text-fg-subtle truncate">{stats.bio ?? "—"}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat icon={<Users className="size-3.5" />} label="Followers" value={stats.followers} />
          <Stat icon={<BookOpen className="size-3.5" />} label="Repos" value={stats.publicRepos} />
          <Stat icon={<Star className="size-3.5" />} label="Stars" value={stats.stars} />
        </div>
        {stats.topLanguages.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {stats.topLanguages.slice(0, 4).map((lang) => (
              <span
                key={lang.name}
                className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-fg-muted"
              >
                {lang.name}
              </span>
            ))}
          </div>
        )}
      </>
    );
  } catch {
    return <GitHubFallback />;
  }
}

function GitHubFallback() {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-surface-2 grid place-items-center text-fg-muted">
          <Github className="size-5" />
        </div>
        <div className="min-w-0">
          <div className="font-medium text-fg">@{profile.socials.github.handle}</div>
          <div className="text-xs text-fg-subtle">GitHub</div>
        </div>
      </div>
      <div className="mt-6 text-xs text-fg-muted">Loading stats…</div>
    </>
  );
}

function GitHubSkeleton() {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-surface-2" />
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-surface-2" />
          <div className="h-2.5 w-36 rounded bg-surface-2" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-surface-2 h-12" />
        ))}
      </div>
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-surface-2 px-2.5 py-2">
      <div className="flex items-center gap-1 text-fg-subtle text-[10px] font-mono uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-mono text-lg text-fg tabular-nums">{value.toLocaleString()}</div>
    </div>
  );
}

export function HeroGithubCard() {
  return (
    <a
      href={`https://github.com/${profile.socials.github.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-fg-subtle"
    >
      <Suspense fallback={<GitHubSkeleton />}>
        <GitHubInner />
      </Suspense>
    </a>
  );
}
