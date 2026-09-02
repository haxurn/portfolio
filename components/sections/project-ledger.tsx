import type { Project } from "@/content";

const TYPE_LABEL: Record<Project["type"], string> = {
  project: "own",
  plugin: "plugin",
  contribution: "upstream",
};

/**
 * Mono-font index of every project. Each row anchors to its card, so the
 * ledger doubles as in-section navigation.
 */
export function ProjectLedger({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
        <span className="flex items-center gap-2">
          <span className="text-accent">≡</span>
          ledger
        </span>
        <span className="tabular-nums">
          {projects.length.toString().padStart(2, "0")} entries
        </span>
      </div>

      <ol className="flex-1 divide-y divide-border/50 font-mono text-[11px]">
        {projects.map((p, i) => (
          <li key={p.slug} data-ledger-row="" className="group relative">
            <a
              href={`#project-${p.slug}`}
              className="grid grid-cols-[2ch_1fr_auto] items-baseline gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2/50"
            >
              <span className="text-fg-subtle tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span className="truncate text-fg group-hover:text-accent transition-colors">
                {p.title}
              </span>
              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-fg-subtle">
                <span
                  className={
                    p.type === "contribution"
                      ? "text-amber-400/80"
                      : "text-accent/70"
                  }
                >
                  {TYPE_LABEL[p.type]}
                </span>
                <span className="text-border">·</span>
                <span className="tabular-nums">{p.year}</span>
              </span>
            </a>
            <span
              aria-hidden
              data-ledger-line=""
              className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-accent/50 transition-transform duration-300 group-hover:scale-x-100"
            />
          </li>
        ))}
      </ol>

      <div className="flex items-center justify-between border-t border-border/60 bg-surface-2/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-fg-subtle">
        <span>
          <span className="text-accent/70">own</span> · repo I author
        </span>
        <span>
          <span className="text-amber-400/80">upstream</span> · fork, PR merged
        </span>
      </div>
    </div>
  );
}
