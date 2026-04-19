"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";

const SEGMENTS = 14;

export function SkillBar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const filled = Math.round((pct / 100) * SEGMENTS);

  const animate = inView || reduced;

  return (
    <div ref={ref} className="group space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg group-hover:text-accent transition-colors">
          {label}
        </span>
        <span className="font-mono text-[10px] text-fg-subtle tabular-nums">
          <span className="text-accent">[</span>
          {pct.toString().padStart(2, "0")}
          <span className="text-accent">]</span>
        </span>
      </div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const isFilled = i < filled;
          const isEdge = i === filled - 1;
          return (
            <motion.span
              key={i}
              initial={{ opacity: reduced ? 1 : 0, scaleY: reduced ? 1 : 0.2 }}
              animate={
                animate
                  ? { opacity: 1, scaleY: 1 }
                  : { opacity: 0, scaleY: 0.2 }
              }
              transition={{
                duration: 0.25,
                delay: reduced ? 0 : i * 0.03,
                ease: [0.25, 1, 0.5, 1],
              }}
              className={`h-3 flex-1 rounded-[1px] ${
                isFilled
                  ? isEdge
                    ? "bg-accent shadow-[0_0_6px_var(--color-accent)]"
                    : "bg-accent/75"
                  : "bg-surface-2"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
