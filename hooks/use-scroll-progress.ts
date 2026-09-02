"use client";

import { ScrollTrigger, useGSAP } from "@/lib/gsap/register";

/**
 * Calls `onProgress` with 0..1 as the page scrolls. One ScrollTrigger, no
 * React state — write to the DOM inside the callback.
 */
export function useScrollProgress(onProgress: (progress: number) => void) {
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => onProgress(self.progress),
      onRefresh: (self) => onProgress(self.progress),
    });
  });
}
