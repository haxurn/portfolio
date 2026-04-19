"use client";

import { useId, useState } from "react";

const levelClasses = [
  "bg-[oklch(0.22_0.008_240)]",
  "bg-[oklch(0.34_0.07_152)]",
  "bg-[oklch(0.48_0.11_152)]",
  "bg-[oklch(0.62_0.15_152)]",
  "bg-[oklch(0.76_0.17_152)]",
] as const;

export function ContributionCell({
  date,
  level,
}: {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}) {
  const tipId = useId();
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <span
        aria-describedby={tipId}
        tabIndex={0}
        className={`block size-[11px] rounded-[3px] outline-none ring-1 ring-inset ring-black/10 focus-visible:ring-accent ${levelClasses[level]}`}
      />
      {show && (
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-fg shadow-card"
        >
          <span className="text-fg-subtle">lvl {level}</span>
          <span className="mx-1 text-border">·</span>
          {date}
        </span>
      )}
    </span>
  );
}
