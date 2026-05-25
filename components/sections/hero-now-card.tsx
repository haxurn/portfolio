"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";

export function HeroNowCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
        .formatToParts(now)
        .reduce<Record<string, string>>((acc, p) => {
          if (p.type !== "literal") acc[p.type] = p.value;
          return acc;
        }, {})
    : { hour: "--", minute: "--", second: "--" };

  const secondsAngle = now ? (now.getSeconds() / 60) * 360 : 0;

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-card">
      {/* corner tick */}
      <span
        aria-hidden
        className="absolute right-3 top-3 size-1.5 rounded-full bg-accent/60"
      />

      <div className="flex items-start justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
          ◴ local · realtime
        </div>
      </div>

      <div className="mt-4 flex items-end gap-4">
        {/* Tick ring */}
        <div className="relative size-16 shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i / 60) * 360;
              const isHour = i % 5 === 0;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="6"
                  x2="50"
                  y2={isHour ? "12" : "9"}
                  stroke="currentColor"
                  strokeWidth={isHour ? 1.2 : 0.6}
                  className={isHour ? "text-fg-muted" : "text-border"}
                  transform={`rotate(${angle} 50 50)`}
                />
              );
            })}
            {/* Second hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-accent drop-shadow-[0_0_3px_var(--color-accent)]"
              transform={`rotate(${secondsAngle} 50 50)`}
              style={{ transition: "transform 0.9s linear" }}
            />
            <circle cx="50" cy="50" r="2" className="fill-accent" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline font-mono text-2xl tabular-nums text-fg sm:text-3xl">
            <span>{parts.hour}</span>
            <span className="mx-0.5 animate-pulse text-accent">:</span>
            <span>{parts.minute}</span>
            <span className="ml-1 text-base text-fg-subtle">{parts.second}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-fg-muted">
            <span>{profile.location.toLowerCase()}</span>
            <span className="text-border">·</span>
            <span>9.03° N · 38.74° E</span>
          </div>
        </div>
      </div>
    </div>
  );
}
