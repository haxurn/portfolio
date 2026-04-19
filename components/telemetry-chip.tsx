"use client";

import { useEffect, useState } from "react";

const SECTIONS: { id: string; label: string; code: string }[] = [
  { id: "home", label: "Home", code: "00" },
  { id: "about", label: "About", code: "01" },
  { id: "projects", label: "Projects", code: "02" },
  { id: "craft", label: "Craft", code: "03" },
  { id: "journey", label: "Journey", code: "04" },
  { id: "credentials", label: "Credentials", code: "·" },
  { id: "skills", label: "Skills", code: "05" },
  { id: "github", label: "GitHub", code: "06" },
  { id: "contact", label: "Contact", code: "07" },
];

export function TelemetryChip() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(SECTIONS[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (scrolled / height) * 100) : 0);
      setVisible(scrolled > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map((s) => ({
      section: s,
      el: document.getElementById(s.id),
    })).filter((x): x is { section: (typeof SECTIONS)[number]; el: HTMLElement } => !!x.el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry most-in-view
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) {
            best = e;
          }
        }
        if (!best || !best.isIntersecting) return;
        const hit = elements.find((x) => x.el === best!.target);
        if (hit) setCurrent(hit.section);
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((x) => observer.observe(x.el));
    return () => observer.disconnect();
  }, []);

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
          <span className="text-accent tabular-nums">§{current.code}</span>
          <span className="text-fg">{current.label}</span>
        </div>

        {/* Progress segment */}
        <div className="relative flex items-center border-l border-border/80 bg-surface-2/60 px-3 py-1.5">
          <span className="tabular-nums text-fg">
            {progress.toFixed(0).padStart(2, "0")}
            <span className="text-fg-subtle">%</span>
          </span>
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] bg-accent/80"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
