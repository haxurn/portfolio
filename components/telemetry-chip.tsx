"use client";

import { useRef, useState } from "react";
import { chapterNumber, sectionById, type SectionId } from "@/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { gsap } from "@/lib/gsap/register";

/** Chip appears once the reader has scrolled past this fraction of the page. */
const SHOW_AFTER = 0.04;

export function TelemetryChip() {
  const activeId = useActiveSection();
  const [visible, setVisible] = useState(false);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lastPct = useRef(-1);

  useScrollProgress((p) => {
    const pct = Math.round(p * 100);
    setVisible(p > SHOW_AFTER);
    if (barRef.current) gsap.set(barRef.current, { scaleX: p });
    if (pct !== lastPct.current && pctRef.current) {
      lastPct.current = pct;
      pctRef.current.textContent = pct.toString().padStart(2, "0");
    }
  });

  const section = sectionById(activeId as SectionId);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-5 right-5 z-40 hidden md:block transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className="flex items-stretch overflow-hidden rounded-md border border-border bg-surface/90 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted shadow-card backdrop-blur">
        {/* Pulse segment */}
        <div className="flex items-center gap-2 border-r border-border/80 bg-surface-2/60 px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
          <span className="text-fg-subtle">viewing</span>
        </div>

        {/* Section */}
        <div className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-accent tabular-nums">§{chapterNumber(section.id)}</span>
          <span className="text-fg">{section.label}</span>
        </div>

        {/* Progress segment */}
        <div className="relative flex items-center border-l border-border/80 bg-surface-2/60 px-3 py-1.5">
          <span className="tabular-nums text-fg">
            <span ref={pctRef}>00</span>
            <span className="text-fg-subtle">%</span>
          </span>
          <span
            ref={barRef}
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent/80"
          />
        </div>
      </div>
    </div>
  );
}
