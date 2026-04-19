import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { SkillBar } from "./skill-bar";
import { skills } from "@/content";

const GLYPHS = ["◢", "◤", "◈"] as const;

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Reveal>
        <SectionHeader
          number="05"
          label="Skills"
          title="What I work with day-to-day."
        />
      </Reveal>

      <div className="@container">
        <div className="grid grid-cols-1 gap-4 @3xl:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.id} delay={0.05 * gi}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-accent/40">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                    <span className="text-accent">{GLYPHS[gi % GLYPHS.length]}</span>
                    <span>module · {String(gi + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="font-mono text-[10px] text-fg-subtle tabular-nums">
                    {group.items.length.toString().padStart(2, "0")} items
                  </span>
                </div>

                <div className="flex-1 p-6">
                  {/* Header */}
                  <div className="mb-5 border-b border-dashed border-border/70 pb-4">
                    <h3 className="font-display text-xl font-semibold text-fg">
                      {group.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                      // {group.tagline}
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <SkillBar label={item.label} pct={item.pct} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer barcode */}
                <div
                  aria-hidden
                  className="flex items-center gap-[2px] border-t border-border/60 bg-surface-2/30 px-5 py-2 opacity-50"
                >
                  {[2, 1, 3, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2].map((w, i) => (
                    <span
                      key={i}
                      className="h-2 bg-fg-subtle"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  ))}
                  <span className="ml-auto font-mono text-[9px] tracking-[0.28em] text-fg-subtle">
                    ◇ {group.id}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
