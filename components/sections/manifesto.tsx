import { Reveal } from "@/components/reveal";

type Tenet = {
  index: string;
  title: string;
  body: string;
  glyph: string;
};

const TENETS: Tenet[] = [
  {
    index: "I",
    title: "Read the binary, then the specification.",
    glyph: "▚",
    body:
      "Documentation says what a system is meant to do. The code says what it actually does. Before I trust a system, I read the code, even if that takes a weekend and a debugger.",
  },
  {
    index: "II",
    title: "Exploit to understand. Build to protect.",
    glyph: "◈",
    body:
      "Attacking systems shows you weaknesses that defenders rarely see. I do both, but the code I write exists to close doors, not open them.",
  },
  {
    index: "III",
    title: "Small improvements, compounded.",
    glyph: "✦",
    body:
      "A stricter check. A clearer error message. A plugin released on a quiet Sunday. Small wins add up, and a year is worth the sum of them.",
  },
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-label="Manifesto"
      className="py-10 md:py-14"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          {/* Top rail */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-accent animate-pulse" />
              manifesto · operator doctrine
            </span>
            <span className="hidden sm:inline">three tenets · unsigned</span>
          </div>

          {/* Watermark seal */}
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="pointer-events-none absolute -right-10 -bottom-10 size-52 text-accent/[0.06]"
          >
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="100" y="106" textAnchor="middle" className="font-display" fontSize="72" fontWeight="700" fill="currentColor">
              H
            </text>
          </svg>

          <div className="relative grid grid-cols-1 gap-0 md:grid-cols-3">
            {TENETS.map((t, i) => (
              <article
                key={t.index}
                className={`relative p-6 md:p-8 ${
                  i < TENETS.length - 1
                    ? "border-b border-border/60 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                {/* Huge Roman numeral */}
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className="font-display text-[64px] font-semibold leading-[0.8] tracking-tighter text-accent/80 md:text-[88px]"
                  >
                    {t.index}
                  </span>
                  <span
                    aria-hidden
                    className="mt-2 font-mono text-xs tracking-[0.22em] text-fg-subtle"
                  >
                    §{String(i + 1).padStart(2, "0")}/03
                  </span>
                </div>

                {/* Rule */}
                <div className="mt-3 flex items-center gap-1">
                  <span className="h-px w-8 bg-accent" />
                  <span className="h-px w-3 bg-accent/50" />
                  <span className="font-mono text-xs text-accent">{t.glyph}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-medium leading-[1.2] tracking-tight text-fg md:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-fg-muted md:text-base">
                  {t.body}
                </p>
              </article>
            ))}
          </div>

          {/* Bottom signature rail */}
          <div className="flex items-center justify-between border-t border-border/60 bg-surface-2/30 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            <span>— haxurn · addis ababa</span>
            <span
              aria-hidden
              className="flex items-center gap-[2px] opacity-60"
            >
              {[1, 2, 3, 1, 4, 1, 2, 1, 3, 1].map((w, i) => (
                <span
                  key={i}
                  className="h-2 bg-fg-subtle"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
