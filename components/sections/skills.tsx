import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { SkillBar } from "./skill-bar";
import { skills } from "@/content";

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
        <div className="grid grid-cols-1 gap-6 @3xl:grid-cols-3">
          {skills.map((group) => (
            <Reveal key={group.id} delay={0.05}>
              <article className="rounded-xl border border-border bg-surface p-6 shadow-card h-full">
                <div className="mb-6">
                  <h3 className="font-display text-lg font-medium text-fg">{group.title}</h3>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                    {group.tagline}
                  </p>
                </div>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <SkillBar label={item.label} pct={item.pct} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
