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
          {/* accent strip */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />
          <ul className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {signals.map((s, i) => (
              <li
                key={s.label}
                className="relative flex flex-col gap-2 p-5 lg:p-6"
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                  <s.icon className="size-3" />
                  <span className="truncate">{s.label}</span>
                </div>
                <div className="font-display text-2xl text-fg tabular-nums tracking-tight lg:text-3xl">
                  {s.value}
                </div>
                <div className="font-mono text-[11px] text-fg-muted">{s.hint}</div>
                {i < signals.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-border to-transparent lg:block"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
