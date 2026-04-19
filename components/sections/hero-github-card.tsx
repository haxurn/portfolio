import { Github, Star, BookOpen, Users, ExternalLink } from "lucide-react";
import { Suspense } from "react";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/content";

async function GitHubInner() {
  const username = profile.socials.github.handle;
  try {
    const stats = await getGitHubStats(username);
    // Normalize top-language % into a decorative sparkline.
    const values = stats.topLanguages.slice(0, 8).map((l) => l.count);
    const max = Math.max(...values, 1);

    return (
      <>
        <Header
          avatar={stats.login.charAt(0).toUpperCase()}
          login={stats.login}
          bio={stats.bio ?? "low-level security. high-level typescript."}
        />

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat icon={<Users className="size-3" />} label="Followers" value={stats.followers} />
          <Stat icon={<BookOpen className="size-3" />} label="Repos" value={stats.publicRepos} />
          <Stat icon={<Star className="size-3" />} label="Stars" value={stats.stars} />
        </div>

        {/* Decorative bar chart from language % */}
        {values.length > 0 && (
          <div className="mt-5">
            <div className="flex items-end gap-[3px] h-8">
              {values.map((v, i) => (
                <span
                  key={i}
                  className="flex-1 bg-accent/70 rounded-[1px]"
                  style={{
                    height: `${Math.max(15, (v / max) * 100)}%`,
                    opacity: 1 - i * 0.08,
                  }}
                />
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-fg-subtle">
              <span>lang·dist</span>
              <span className="text-border">▓▒░</span>
              <span>{values.length} langs</span>
            </div>
          </div>
        )}

        {stats.topLanguages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stats.topLanguages.slice(0, 4).map((lang) => (
              <span
                key={lang.name}
                className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
              >
                <span className="size-1 rounded-full bg-accent/70" />
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

function Header({
  avatar,
  login,
  bio,
}: {
  avatar: string;
  login: string;
  bio: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-md border border-accent/40 bg-gradient-to-br from-surface-2 to-bg">
        <span className="absolute inset-0 grid place-items-center font-display text-lg font-semibold text-accent">
          {avatar}
        </span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-[repeating-linear-gradient(45deg,var(--color-accent)_0_1px,transparent_1px_3px)] opacity-30"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Github className="size-3 text-fg-subtle" />
          <span className="font-mono text-[11px] text-fg-subtle">
            github.com/
          </span>
          <span className="font-medium text-fg">{login}</span>
        </div>
        <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-fg-muted">
          {bio}
        </div>
      </div>
      <ExternalLink className="size-3.5 shrink-0 text-fg-subtle" />
    </div>
  );
}

function GitHubFallback() {
  return (
    <>
      <Header
        avatar="H"
        login={profile.socials.github.handle}
        bio="GitHub · connecting"
      />
      <div className="mt-6 font-mono text-xs text-fg-muted">▹ loading stats…</div>
    </>
  );
}

function GitHubSkeleton() {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="size-11 rounded-md bg-surface-2" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 rounded bg-surface-2" />
          <div className="h-2.5 w-40 rounded bg-surface-2" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-md bg-surface-2" />
        ))}
      </div>
      <div className="mt-5 h-8 rounded bg-surface-2" />
    </>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="relative rounded-md border border-border bg-surface-2/50 px-2 py-1.5">
      <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-subtle">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 font-display text-lg font-semibold text-fg tabular-nums">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

export function HeroGithubCard() {
  return (
    <a
      href={`https://github.com/${profile.socials.github.handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card transition-all hover:border-accent/40"
    >
      {/* header strip */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-border/60 bg-surface-2/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-fg-subtle"
      >
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#ff5f56]" />
          <span className="size-1.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-1.5 rounded-full bg-accent" />
        </span>
        <span>~/profile/github</span>
      </div>
      <div className="mt-6 flex h-full flex-col">
        <Suspense fallback={<GitHubSkeleton />}>
          <GitHubInner />
        </Suspense>
      </div>
    </a>
  );
}
