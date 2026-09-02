import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { StackTile } from "./stack-tile";
import { stack, stackByGroup, stackGroups } from "@/content";

export function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="stack"
          title="The tools behind the work."
          sub="Every entry is backed by my repositories: the note under each name says where it is used. Logos are the official marks, loaded from Simple Icons."
        />
      </Reveal>

      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          {/* Top rail */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            <span className="flex items-center gap-2">
              <span className="text-accent">⌗</span>
              inventory · toolchain
            </span>
            <span className="tabular-nums">
              {stack.length.toString().padStart(2, "0")} entries · {stackGroups.length} groups
            </span>
          </div>

          <div className="divide-y divide-border/60">
            {stackGroups.map((group) => {
              const items = stackByGroup(group.id);
              if (items.length === 0) return null;
              return (
                <Reveal
                  key={group.id}
                  as="section"
                  stagger={0.04}
                  selector="[data-stack-tile]"
                  aria-labelledby={`stack-${group.id}`}
                  className="grid grid-cols-1 gap-x-8 gap-y-4 px-5 py-6 sm:px-6 md:grid-cols-[180px_1fr] md:py-7"
                >
                  {/* Group label */}
                  <div className="flex items-start gap-3 md:sticky md:top-(--sticky-offset) md:self-start">
                    <span aria-hidden className="font-mono text-[11px] text-accent">
                      {group.glyph}
                    </span>
                    <div>
                      <h3
                        id={`stack-${group.id}`}
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle"
                      >
                        {group.title}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] tabular-nums text-fg-subtle/70">
                        {items.length.toString().padStart(2, "0")} entries
                      </div>
                    </div>
                  </div>

                  {/* Tiles */}
                  <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((item) => (
                      <StackTile key={item.id} item={item} />
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom rail */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-surface-2/30 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
            <span>— counts from a gh audit of my repositories</span>
            <span className="tabular-nums">rev · 2026.09</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
