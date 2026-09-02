"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap/register";
import { useMotion } from "@/lib/gsap/match-media";

const PLATE_TRAVEL_PCT = 6;
const PLATE_SCALE = 1.12;

/**
 * Scroll choreography for the Projects grid, desktop only:
 * the featured plate drifts as the page scrolls (parallax on the wrapper,
 * never on the <img>, so the CSS hover zoom keeps working).
 */
export function ProjectsStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(ref, {
    "ok desktop": () => {
      const scope = ref.current;
      if (!scope) return;
      const featured = scope.querySelector("[data-featured]");
      const plate = featured?.querySelector("[data-plate]");
      if (!featured || !plate) return;

      gsap.fromTo(
        plate,
        { yPercent: -PLATE_TRAVEL_PCT, scale: PLATE_SCALE },
        {
          yPercent: PLATE_TRAVEL_PCT,
          scale: PLATE_SCALE,
          ease: "none",
          scrollTrigger: {
            trigger: featured,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    },
  });

  return <div ref={ref}>{children}</div>;
}
