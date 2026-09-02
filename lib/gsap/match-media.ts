"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "./register";
import { MQ, type MqKey } from "./defaults";

/**
 * A handler key is one or more MQ names separated by spaces, e.g. "ok" or
 * "ok desktop". All named queries must match for the handler to run.
 */
export type MotionHandlers = Partial<
  Record<MqKey | `${MqKey} ${MqKey}` | `${MqKey} ${MqKey} ${MqKey}`, MotionHandler>
>;

export type MotionHandler = (
  context: gsap.Context,
) => void | (() => void);

type MotionConfig = {
  dependencies?: unknown[];
  revertOnUpdate?: boolean;
};

export function mediaQueryFor(key: string): string {
  return key
    .split(" ")
    .filter(Boolean)
    .map((name) => {
      const query = MQ[name as MqKey];
      if (!query) throw new Error(`Unknown media query key: ${name}`);
      return query;
    })
    .join(" and ");
}

/**
 * useGSAP + gsap.matchMedia in one call. Every tween created inside a handler
 * is scoped to `scope` and reverted when the query stops matching or the
 * component unmounts. Reduced-motion users never run an `ok` handler.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  handlers: MotionHandlers,
  config: MotionConfig = {},
) {
  return useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);
      for (const [key, handler] of Object.entries(handlers)) {
        if (!handler) continue;
        mm.add(mediaQueryFor(key), (context) => handler(context));
      }
    },
    { scope, ...config },
  );
}
