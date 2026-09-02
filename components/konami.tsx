"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const GLITCH_MS = 4200;
const BANNER_MS = 3200;

export function Konami() {
  const [active, setActive] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const posRef = useRef(0);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    const isEditable = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      const tag = t.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || t.isContentEditable;
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      const expected = SEQUENCE[posRef.current];
      const got =
        e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected) {
        posRef.current += 1;
        if (resetTimer.current) window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => {
          posRef.current = 0;
        }, 2200);
        if (posRef.current === SEQUENCE.length) {
          posRef.current = 0;
          trigger();
        }
      } else {
        posRef.current = got === SEQUENCE[0] ? 1 : 0;
      }
    };

    const trigger = () => {
      try {
        localStorage.setItem("haxurn:konami", new Date().toISOString());
      } catch {}
      setActive(true);
      setShowBanner(true);
      window.setTimeout(() => setShowBanner(false), BANNER_MS);
      window.setTimeout(() => setActive(false), GLITCH_MS);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {/* Chromatic aberration + scanlines layer */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-60 konami-glitch"
        style={{
          background:
            "linear-gradient(transparent 50%, oklch(1 0 0 / 0.04) 50%), linear-gradient(90deg, oklch(0.75 0.25 22 / 0.06), oklch(0.74 0.17 152 / 0.06), oklch(0.6 0.25 260 / 0.06))",
          backgroundSize: "100% 3px, 100% 100%",
        }}
      />

      {/* RGB shift overlay */}
      <div className="absolute inset-0 konami-rgb-shift" />

      {/* Banner */}
      {showBanner && (
        <div className="absolute left-1/2 top-[38%] w-[min(640px,90vw)] -translate-x-1/2 konami-banner">
          <div className="relative overflow-hidden rounded-md border-2 border-accent bg-bg/95 p-6 shadow-[0_0_60px_oklch(0.74_0.17_152/0.5)] backdrop-blur">
            {/* Corner ticks */}
            <Tick className="left-2 top-2" />
            <Tick className="right-2 top-2 rotate-90" />
            <Tick className="left-2 bottom-2 -rotate-90" />
            <Tick className="right-2 bottom-2 rotate-180" />

            <div className="flex items-center justify-between border-b border-accent/40 pb-2 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                access granted
              </span>
              <span>konami · 10/10</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl konami-scramble">
              Classified clearance elevated.
            </h2>
            <p className="mt-3 font-mono text-xs leading-relaxed text-fg-muted">
              {"// welcome, operator. you've found the back door."}
              <br />
              {`// this signal will self-terminate in ${Math.round(BANNER_MS / 1000)}s.`}
            </p>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
              <span>unlocked · persisted to local</span>
              <span className="text-accent">◉ achievement.01</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes konami-jitter {
          0% { transform: translate(0,0); }
          20% { transform: translate(-1px,1px); }
          40% { transform: translate(1px,-1px); }
          60% { transform: translate(-1px,-1px); }
          80% { transform: translate(1px,1px); }
          100% { transform: translate(0,0); }
        }
        .konami-glitch { animation: konami-jitter 0.18s steps(2, end) infinite; }

        @keyframes konami-shift {
          0%, 100% { box-shadow: inset 2px 0 0 oklch(0.75 0.25 22 / 0.4), inset -2px 0 0 oklch(0.6 0.25 260 / 0.4); }
          50%      { box-shadow: inset 4px 0 0 oklch(0.75 0.25 22 / 0.3), inset -4px 0 0 oklch(0.6 0.25 260 / 0.3); }
        }
        .konami-rgb-shift { animation: konami-shift 0.3s ease-in-out infinite; }

        @keyframes konami-appear {
          from { opacity: 0; transform: translate(-50%, -40%) scale(0.95); filter: blur(8px); }
          to   { opacity: 1; transform: translate(-50%, 0) scale(1);    filter: blur(0); }
        }
        .konami-banner { animation: konami-appear 0.35s ease-out both; }

        @keyframes konami-flicker {
          0%, 100% { opacity: 1; }
          48% { opacity: 1; }
          50% { opacity: 0.4; }
          52% { opacity: 1; }
        }
        .konami-scramble { animation: konami-flicker 0.9s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .konami-glitch, .konami-rgb-shift, .konami-scramble { animation: none; }
        }
      `}</style>
    </div>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute size-3 ${className}`}>
      <span className="absolute left-0 top-0 h-px w-full bg-accent" />
      <span className="absolute left-0 top-0 h-full w-px bg-accent" />
    </span>
  );
}
