import { Zap } from "lucide-react";
import { profile } from "@/content";

export function HeroFocusCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-fg-subtle">Currently</span>
        <Zap className="size-3.5 text-accent" />
      </div>
      <div className="mt-4">
        <div className="font-medium text-fg leading-snug">{profile.focus}</div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-[38%] rounded-full bg-accent" />
        </div>
        <div className="mt-2 text-[10px] font-mono text-fg-subtle tabular-nums">
          ~38% / core v0.1
        </div>
      </div>
    </div>
  );
}
