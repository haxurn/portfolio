import Link from "next/link";
import { ArrowUpRight, Flag } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { PROFILE_KIND_LABEL, profiles } from "@/content";

/** Secondary presence: code, CTF, writing and social profiles beyond the main channels. */
export function ProfileGrid() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
        <span className="flex items-center gap-2">
          <span className="text-accent">⌘</span>
          elsewhere · profiles
        </span>
        <span className="tabular-nums">
          {profiles.length.toString().padStart(2, "0")} nodes
        </span>
      </div>

      <ul className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
        {profiles.map((p, i) => (
          <li
            key={p.id}
            data-reveal-child=""
            className={`sm:border-b sm:border-border/60 ${
              i % 2 === 0 ? "sm:border-r" : ""
            } lg:border-r lg:[&:nth-child(5n)]:border-r-0 lg:[&:nth-child(n+6)]:border-b-0`}
          >
            <Link
              href={p.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="group flex h-full items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2/40"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-border/60 bg-bg/60 text-fg-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                {p.icon ? (
                  <BrandIcon icon={p.icon} className="size-4" />
                ) : (
                  <Flag className="size-4" aria-hidden />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-fg">{p.label}</span>
                <span className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-fg-muted">
                  <span className="truncate">{p.handle}</span>
                  <span className="shrink-0 rounded-sm border border-accent/30 bg-accent/10 px-1 py-px text-[8px] uppercase tracking-[0.2em] text-accent">
                    {PROFILE_KIND_LABEL[p.kind]}
                  </span>
                </span>
                <span className="mt-1 line-clamp-2 font-mono text-[10px] leading-snug text-fg-subtle">
                  {p.note}
                </span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
