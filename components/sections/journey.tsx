import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { journey } from "@/content";

export function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32">
      <Reveal>
        <SectionHeader
          number="04"
          label="Journey"
          title="A short timeline, long enough to matter."
        />
      </Reveal>

      <ol className="grid grid-cols-1 gap-10 md:grid-cols-[180px_1fr]">
        {journey.map((entry, i) => (
          <Reveal key={entry.rawDate} delay={0.04 * i} as="li" className="contents">
            <div className="md:col-start-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle pt-1">
              {entry.date}
            </div>
            <div className="md:col-start-2 relative border-l border-border pl-6 pb-2">
              <span
                aria-hidden
                className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_10px_var(--color-accent)]"
              />
              <h3 className="font-display text-xl font-medium tracking-tight text-fg">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-fg-muted">
                {entry.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
