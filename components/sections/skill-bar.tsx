"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function SkillBar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-fg">{label}</span>
        <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{pct}%</span>
      </div>
      <div className="h-[2px] w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: reduced ? `${pct}%` : 0 }}
          animate={{ width: inView || reduced ? `${pct}%` : 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
    </div>
  );
}
