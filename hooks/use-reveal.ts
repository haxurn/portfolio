"use client";

import type { RefObject } from "react";
import { gsap } from "@/lib/gsap/register";
import { DUR, EASE, REVEAL_START } from "@/lib/gsap/defaults";
import { useMotion } from "@/lib/gsap/match-media";
import { revealVars } from "@/lib/animation/reveal-vars";

export type RevealPreset = "fade" | "header";

export type UseRevealOptions = {
  delay?: number;
  y?: number;
  /** When set, animate `selector` descendants with this stagger instead of the element itself. */
  stagger?: number;
  selector?: string;
  preset?: RevealPreset;
};

const DEFAULT_SELECTOR = "[data-reveal-child]";

function scrollTriggerFor(el: HTMLElement) {
  return { trigger: el, start: REVEAL_START, once: true } as const;
}

function fade(el: HTMLElement, options: UseRevealOptions) {
  const { stagger, selector = DEFAULT_SELECTOR } = options;
  const vars = revealVars(options);

  if (stagger === undefined) {
    gsap.fromTo(el, vars.from, { ...vars.to, scrollTrigger: scrollTriggerFor(el) });
    return;
  }

  // Parent shows immediately; children carry the motion.
  gsap.set(el, { autoAlpha: 1 });
  const children = el.querySelectorAll(selector);
  if (children.length === 0) return;
  gsap.fromTo(children, vars.from, { ...vars.to, scrollTrigger: scrollTriggerFor(el) });
}

/** Section header: rail line draws, title words rise, barcode bars grow, numeral slides in. */
function header(el: HTMLElement, options: UseRevealOptions) {
  gsap.set(el, { autoAlpha: 1 });
  const tl = gsap.timeline({
    delay: options.delay ?? 0,
    scrollTrigger: scrollTriggerFor(el),
  });
  tl.from(el.querySelectorAll("[data-line]"), {
    scaleX: 0,
    transformOrigin: "left center",
    duration: DUR.slow,
    ease: EASE.inOut,
  })
    .from(
      el.querySelectorAll("[data-numeral]"),
      { autoAlpha: 0, x: -12, duration: DUR.reveal },
      "<0.1",
    )
    .from(
      el.querySelectorAll("[data-word]"),
      { yPercent: 110, autoAlpha: 0, duration: 0.6, stagger: 0.04 },
      "<0.05",
    )
    .from(
      el.querySelectorAll("[data-bar]"),
      { scaleY: 0, transformOrigin: "bottom", duration: DUR.base, stagger: 0.015 },
      "<0.2",
    )
    .from(
      el.querySelectorAll("[data-sub]"),
      { autoAlpha: 0, y: 6, duration: DUR.reveal },
      "<0.1",
    );
}

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseRevealOptions = {},
) {
  useMotion(ref, {
    ok: () => {
      const el = ref.current;
      if (!el) return;
      if (options.preset === "header") header(el, options);
      else fade(el, options);
    },
  });
}
