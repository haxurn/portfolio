"use client";

import type { RefObject } from "react";
import { gsap } from "@/lib/gsap/register";
import { MAGNETIC_MAX_PX } from "@/lib/gsap/defaults";
import { useMotion } from "@/lib/gsap/match-media";

type MagneticOptions = {
  /** Fraction of the pointer offset the element follows. */
  strength?: number;
  /** Pixels beyond the element's edge where the pull still applies. */
  radius?: number;
};

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/**
 * Pulls the element a few pixels toward the pointer while it hovers nearby.
 * Only active for fine pointers with motion allowed.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  { strength = 0.35, radius = 96 }: MagneticOptions = {},
) {
  useMotion(ref, {
    "ok fine": () => {
      const el = ref.current;
      if (!el) return;

      const toX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const toY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const outside =
          Math.abs(dx) > rect.width / 2 + radius ||
          Math.abs(dy) > rect.height / 2 + radius;
        if (outside) {
          toX(0);
          toY(0);
          return;
        }
        toX(clamp(dx * strength, MAGNETIC_MAX_PX));
        toY(clamp(dy * strength, MAGNETIC_MAX_PX));
      };
      const onLeave = () => {
        toX(0);
        toY(0);
      };

      const parent = el.parentElement ?? el;
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
      return () => {
        parent.removeEventListener("pointermove", onMove);
        parent.removeEventListener("pointerleave", onLeave);
      };
    },
  });
}
