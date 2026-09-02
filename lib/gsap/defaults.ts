/** Durations in seconds. Mirrors --duration-* tokens in globals.css. */
export const DUR = {
  fast: 0.18,
  base: 0.28,
  reveal: 0.5,
  slow: 0.8,
} as const;

export const EASE = {
  /** Registered as a CustomEase in register.ts — cubic-bezier(0.25, 1, 0.5, 1). */
  out: "outQuart",
  inOut: "power3.inOut",
  none: "none",
  snap: "back.out(2)",
} as const;

/** ScrollTrigger `start` for one-shot reveals — fires when the top of the element crosses 90% viewport height. */
export const REVEAL_START = "top 90%";

/** Media queries used with gsap.matchMedia. Keys double as handler names in useMotion. */
export const MQ = {
  ok: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export type MqKey = keyof typeof MQ;

/** Default vertical offset in px for fade-up reveals. */
export const REVEAL_Y = 8;

/** Pixels a magnetic element may travel in any direction. */
export const MAGNETIC_MAX_PX = 12;
