import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { profile } from "@/content";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Reveal>
        <SectionHeader
          number="01"
          label="About"
          title="Hacker by day, producer by night."
        />
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[180px_1fr]">
          <aside className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            2026 / now
          </aside>
          <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-fg-muted">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
