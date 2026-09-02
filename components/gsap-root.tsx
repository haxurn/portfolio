"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap/register";
import { useSectionTracking } from "@/hooks/use-active-section";
import { sectionIds } from "@/content";

const REFRESH_DEBOUNCE_MS = 150;

/**
 * Mounted once in the root layout. Owns the things that must happen exactly
 * once per page: section tracking, and ScrollTrigger refreshes when fonts
 * finish loading or streamed content (the GitHub heatmap) changes page height.
 */
export function GsapRoot() {
  useSectionTracking(sectionIds);

  useEffect(() => {
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE_MS);
    };

    document.fonts?.ready.then(refresh).catch(() => undefined);

    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
