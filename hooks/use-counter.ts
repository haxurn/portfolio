"use client";

import type { RefObject } from "react";
import { gsap } from "@/lib/gsap/register";
import { useMotion } from "@/lib/gsap/match-media";
import {
  formatCounter,
  parseCounterValue,
} from "@/lib/animation/parse-counter";

type CounterOptions = {
  value: string;
  duration?: number;
  delay?: number;
  /** ScrollTrigger start. Pass null to play immediately on mount. */
  start?: string | null;
};

/**
 * Counts the element's text up from 0 to the number inside `value`,
 * keeping any prefix/suffix. SSR renders the final string, so with motion
 * off nothing changes.
 */
export function useCounter(
  ref: RefObject<HTMLElement | null>,
  { value, duration = 1.2, delay = 0, start = "top 85%" }: CounterOptions,
) {
  useMotion(
    ref,
    {
      ok: () => {
        const el = ref.current;
        const parts = parseCounterValue(value);
        if (!el || !parts) return;

        const state = { n: 0 };
        el.textContent = formatCounter(parts, 0);
        gsap.to(state, {
          n: parts.value,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = formatCounter(parts, state.n);
          },
          onComplete: () => {
            el.textContent = value;
          },
          ...(start ? { scrollTrigger: { trigger: el, start, once: true } } : {}),
        });
      },
    },
    { dependencies: [value], revertOnUpdate: true },
  );
}
