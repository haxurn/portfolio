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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
          {/* Dossier side panel */}
          <aside className="relative">
            <div className="space-y-4 md:sticky md:top-28">
              <div className="rounded-md border border-border bg-surface/60 p-4 shadow-card">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  ◉ subject
                </div>
                <dl className="mt-3 space-y-2 text-[11px]">
                  <Row k="codename" v={profile.alias} />
                  <Row k="status" v="active" />
                  <Row k="base" v="addis ababa" />
                  <Row k="since" v="2023" />
                  <Row k="modus" v="ts-first" />
                </dl>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
                ▚ 2026 / now
              </div>
            </div>
          </aside>

          {/* Bio column */}
          <div className="relative max-w-[68ch] space-y-6 text-lg leading-relaxed text-fg-muted">
            {/* Ornamental drop-cap on first paragraph */}
            {profile.bio.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[76px] first-letter:font-semibold first-letter:leading-[0.82] first-letter:text-accent"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}

            {/* Asterism divider */}
            <div
              aria-hidden
              className="flex items-center justify-center gap-3 py-4 text-fg-subtle/60"
            >
              <span className="h-px w-12 bg-border" />
              <span className="font-mono text-xs">✦ ✦ ✦</span>
              <span className="h-px w-12 bg-border" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-2 font-mono">
      <dt className="text-fg-subtle uppercase tracking-[0.18em]">{k}</dt>
      <span
        aria-hidden
        className="flex-1 border-b border-dotted border-border/80"
      />
      <dd className="text-fg">{v}</dd>
    </div>
  );
}
