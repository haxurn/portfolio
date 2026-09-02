"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap/register";
import { DUR, EASE, MQ } from "@/lib/gsap/defaults";

const FONT_WAIT_MS = 800;
const MOBILE_SPEED = 0.8;

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function buildIntro(scope: HTMLElement, speed: number, withStamp: boolean) {
  const q = gsap.utils.selector(scope);
  const tl = gsap.timeline({ defaults: { ease: EASE.out } });
  const s = (v: number) => v * speed;

  tl.from(q("[data-hero=card-identity]"), { autoAlpha: 0, y: 24, duration: s(0.7) }, 0)
    .from(q("[data-hero=prompt]"), { autoAlpha: 0, x: -8, duration: s(0.35) }, s(0.15))
    // Name block: set visible, then let SplitText chars rise through line masks.
    .set(q("[data-hero=name]"), { autoAlpha: 1 }, s(0.25))
    .from(
      q("[data-hero=card-github], [data-hero=card-now], [data-hero=card-focus]"),
      { autoAlpha: 0, y: 18, duration: s(0.55), stagger: s(0.1) },
      s(0.45),
    )
    .from(q("[data-hero=alias]"), { autoAlpha: 0, y: 12, duration: s(0.5) }, s(0.55))
    .from(q("[data-hero=pill]"), { autoAlpha: 0, x: -8, duration: s(0.4) }, s(0.6))
    .from(q("[data-hero=tagline]"), { autoAlpha: 0, y: 8, duration: s(0.5) }, s(0.7))
    // Traits wrapper is CSS-hidden like every [data-hero]; show it, then stagger its children.
    .set(q("[data-hero=traits]"), { autoAlpha: 1 }, s(0.8))
    .from(
      q("[data-hero=traits] > span"),
      { autoAlpha: 0, y: 6, duration: s(0.35), stagger: s(0.05) },
      s(0.8),
    )
    .from(q("[data-hero=actions]"), { autoAlpha: 0, y: 10, duration: s(0.4) }, s(0.85))
    .from(
      q("[data-hero=seg]"),
      {
        autoAlpha: 0,
        scaleY: 0.4,
        transformOrigin: "bottom",
        duration: s(0.3),
        stagger: s(0.02),
        ease: "power2.out",
      },
      s(0.85),
    );

  if (withStamp) {
    tl.from(
      q("[data-hero=stamp]"),
      { autoAlpha: 0, scale: 1.4, rotate: 20, duration: s(0.35), ease: EASE.snap },
      s(0.95),
    );
  }

  return tl;
}

/**
 * Client wrapper that choreographs the hero cards' entrance. Children stay
 * server components; everything is targeted via data-hero attributes.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: ref });

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;

      const mm = gsap.matchMedia(scope);
      mm.add(
        { ok: MQ.ok, desktop: MQ.desktop },
        (context) => {
          const { ok, desktop } = context.conditions ?? {};
          if (!ok) return;

          let cancelled = false;
          const speed = desktop ? 1 : MOBILE_SPEED;

          // Fonts must be loaded before SplitText measures lines.
          Promise.race([document.fonts?.ready, sleep(FONT_WAIT_MS)]).then(
            contextSafe(() => {
              if (cancelled) return;
              const tl = buildIntro(scope, speed, Boolean(desktop));
              const name = scope.querySelector<HTMLElement>("[data-hero=name]");
              if (!name) return;

              SplitText.create(name, {
                type: "lines,chars",
                mask: "lines",
                linesClass: "split-line",
                autoSplit: true,
                onSplit: (self) => {
                  const chars = gsap.from(self.chars, {
                    yPercent: 110,
                    duration: DUR.slow * speed,
                    stagger: 0.035 * speed,
                    ease: "power4.out",
                  });
                  tl.add(chars, 0.25 * speed);
                  return chars;
                },
              });
            }),
          );

          return () => {
            cancelled = true;
          };
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-hero-stage="">
      {children}
    </div>
  );
}
