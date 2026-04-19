import { Reveal } from "@/components/reveal";
import {
  Code2,
  ShieldAlert,
  GitPullRequest,
  Puzzle,
  Terminal,
  Braces,
} from "lucide-react";

type Signal = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
};

const signals: Signal[] = [
  { icon: Code2, label: "Years coding", value: "3", hint: "since 2024" },
  { icon: ShieldAlert, label: "Years on security", value: "3", hint: "INSA · 2023→" },
  { icon: GitPullRequest, label: "PRs upstream", value: "12+", hint: "Better Auth ecosystem" },
  { icon: Puzzle, label: "Plugins shipped", value: "4", hint: "auth · waitlist · mw" },
  { icon: Terminal, label: "CTF solves", value: "80+", hint: "web · crypto · pwn" },
  { icon: Braces, label: "TS stack", value: "Hono·Next", hint: "strict mode only" },
];

export function SignalsStrip() {
  return (
    <section aria-label="Signals" className="py-10 md:py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          {/* Top rail */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-accent animate-pulse" />
              signals · intake
            </span>
            <span className="hidden sm:block">06 indicators · live</span>
            <span>updated · 2026·04</span>
          </div>

          {/* accent stripe */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-[33px] h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />

          <ul className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {signals.map((s, i) => (
              <li
                key={s.label}
                className="group relative flex flex-col gap-1.5 p-5 transition-colors hover:bg-surface-2/40 lg:p-6"
              >
                {/* corner index */}
                <span
                  aria-hidden
                  className="absolute right-3 top-2 font-mono text-[9px] tabular-nums text-fg-subtle/60"
                >
                  0{i + 1}
                </span>

                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
                  <s.icon className="size-3 text-accent/70" />
                  <span className="truncate">{s.label}</span>
                </div>

                <div className="flex items-baseline gap-1 font-display text-2xl font-semibold text-fg tabular-nums tracking-tight lg:text-3xl">
                  {s.value}
                  <span className="text-[10px] font-normal text-accent/60">◆</span>
                </div>

                <div className="font-mono text-[10px] text-fg-muted">{s.hint}</div>
              </li>
            ))}
          </ul>

          {/* Bottom barcode rail */}
          <div
            aria-hidden
            className="flex items-center gap-[2px] border-t border-border/60 bg-surface-2/20 px-4 py-1.5 opacity-40"
          >
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="h-1 bg-fg-subtle"
                style={{ width: `${(i % 4) + 1}px` }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
