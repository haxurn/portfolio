"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { useMotion } from "@/lib/gsap/match-media";

const ORB_DRIFT_S = 4;
const ORB_STAGGER_S = 2;

export function SiteBackground() {
  const ref = useRef<HTMLDivElement>(null);

  // Orbs always render (no hydration mismatch); they only drift on desktop
  // with motion allowed — three blurred layers are too heavy for phones.
  useMotion(ref, {
    "ok desktop": () => {
      gsap.to("[data-orb]", {
        y: -30,
        x: 15,
        opacity: 0.5,
        duration: ORB_DRIFT_S,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: ORB_STAGGER_S },
        force3D: true,
      });
    },
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient wash with green accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 90% -10%, oklch(0.74 0.17 152 / 0.08), transparent 60%), radial-gradient(ellipse 60% 50% at 0% 100%, oklch(0.74 0.17 152 / 0.04), transparent 50%), var(--color-bg)",
        }}
      />

      {/* Floating ambient orbs */}
      <FloatingOrb className="top-[20%] left-[10%]" />
      <FloatingOrb className="top-[60%] right-[5%]" />
      <FloatingOrb className="bottom-[20%] left-[30%]" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 35%, transparent 100%)",
        }}
      />

      {/* Corner cross-hairs — micro detail */}
      <CrossHair className="top-8 left-8" />
      <CrossHair className="top-8 right-8" />
      <CrossHair className="bottom-8 left-8" />
      <CrossHair className="bottom-8 right-8" />

      {/* Horizontal scanline - extremely subtle */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, oklch(1 0 0 / 1) 2px, oklch(1 0 0 / 1) 3px)",
        }}
      />

      {/* Grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}

function FloatingOrb({ className = "" }: { className?: string }) {
  return (
    <div
      data-orb=""
      className={`absolute size-[300px] rounded-full blur-[80px] pointer-events-none opacity-30 ${className}`}
      style={{
        background: "radial-gradient(circle, oklch(0.74 0.17 152 / 0.08), transparent 70%)",
      }}
    />
  );
}

function CrossHair({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute size-3 text-fg-subtle/25 ${className}`}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
    </div>
  );
}
