import { CounterValue } from "@/components/counter-value";
import { profile } from "@/content";

const PCT = 38;
const SEGMENTS = 24;
const COUNTER_DELAY_S = 0.9;

/** Server component. Segment entrance is choreographed by hero-stage.tsx via data-hero="seg". */
export function HeroFocusCard() {
  const filled = Math.round((PCT / 100) * SEGMENTS);

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card">
      {/* crosshair */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 size-3 text-accent/50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="0" x2="12" y2="24" />
        <line x1="0" y1="12" x2="24" y2="12" />
      </svg>

      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
        ⌗ objective · v0.1
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <div className="font-display text-lg font-medium leading-snug text-fg">
            {profile.focus}
          </div>
        </div>

        {/* Segmented progress */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex flex-1 gap-[2px]">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                data-hero="seg"
                className={`h-4 flex-1 rounded-[1px] ${
                  i < filled
                    ? i === filled - 1
                      ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
                      : "bg-accent/80"
                    : "bg-surface-2"
                }`}
              />
            ))}
          </div>
          <CounterValue
            value={`${PCT}%`}
            delay={COUNTER_DELAY_S}
            start={null}
            className="font-mono text-[11px] tabular-nums text-accent"
          />
        </div>

        <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-fg-subtle">
          <span>▸ eta · 2026-Q4</span>
          <span className="text-accent/70">building</span>
        </div>
      </div>
    </div>
  );
}
