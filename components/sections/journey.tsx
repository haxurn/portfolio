import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { journey } from "@/content";

export function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="journey"
          title="A short timeline, with the milestones that matter."
        />
      </Reveal>

      <Reveal>
        <div className="relative rounded-xl border border-border bg-surface p-6 shadow-card md:p-10">
          {/* Field log strip */}
          <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              field log · personal
            </span>
            <span className="tabular-nums">
              {journey.length.toString().padStart(2, "0")} entries · classified
            </span>
          </div>

          <ol className="space-y-0">
            {journey.map((entry, i) => {
              const isLast = i === journey.length - 1;
              return (
                <Reveal
                  key={entry.rawDate}
                  delay={0.05 * i}
                  as="li"
                  className="group relative grid grid-cols-[56px_1fr] gap-4 py-6 md:grid-cols-[72px_120px_1fr] md:gap-6"
                >
                  {/* Index numeral */}
                  <div className="flex flex-col items-start">
                    <div className="relative font-display text-3xl font-semibold leading-none text-accent/80 tabular-nums md:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                      <span
                        aria-hidden
                        className="absolute -right-2 top-0 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-subtle"
                      >
                        /{String(journey.length).padStart(2, "0")}
                      </span>
                    </div>
                    {!isLast && (
                      <span
                        aria-hidden
                        className="mt-3 w-px flex-1 bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0_3px,transparent_3px_7px)]"
                        style={{ minHeight: "60px" }}
                      />
                    )}
                  </div>

                  {/* Date column */}
                  <div className="md:col-start-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                      ▸ timestamp
                    </div>
                    <div className="mt-1 font-display text-lg font-medium text-fg">
                      {entry.date}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-fg-subtle">
                      #{entry.rawDate}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="md:col-start-3">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
                      <span>✦</span>
                      <span>entry.{String(i + 1).padStart(2, "0")}</span>
                      <span
                        aria-hidden
                        className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_3px,transparent_3px_6px)] opacity-40"
                      />
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight text-fg md:text-2xl">
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-fg-muted">
                      {entry.body}
                    </p>
                  </div>

                  {/* Row divider */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 right-0 h-px bg-[repeating-linear-gradient(to_right,var(--color-border)_0_4px,transparent_4px_10px)] opacity-40"
                    />
                  )}
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
