import { DUR, REVEAL_Y } from "@/lib/gsap/defaults";

export type RevealOptions = {
  readonly delay?: number;
  readonly y?: number;
  readonly stagger?: number;
};

export type RevealVars = {
  readonly from: { readonly autoAlpha: 0; readonly y: number };
  readonly to: {
    readonly autoAlpha: 1;
    readonly y: 0;
    readonly duration: number;
    readonly delay: number;
    readonly stagger?: number;
  };
};

/** Pure: build the from/to tween vars for a fade-up reveal. */
export function revealVars(options: RevealOptions = {}): RevealVars {
  const { delay = 0, y = REVEAL_Y, stagger } = options;
  return {
    from: { autoAlpha: 0, y },
    to: {
      autoAlpha: 1,
      y: 0,
      duration: DUR.reveal,
      delay,
      ...(stagger !== undefined ? { stagger } : {}),
    },
  };
}
