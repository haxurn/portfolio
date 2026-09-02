"use client";

import { useSyncExternalStore } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap/register";

type Listener = () => void;

let activeId = "home";
const listeners = new Set<Listener>();

function setActive(id: string) {
  if (id === activeId) return;
  activeId = id;
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string {
  return activeId;
}

function getServerSnapshot(): string {
  return "home";
}

/**
 * Creates one ScrollTrigger per section id and publishes whichever section
 * currently spans the 40–60% band of the viewport. Mount once (GsapRoot).
 */
export function useSectionTracking(ids: readonly string[]) {
  useGSAP(
    () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        });
      }
    },
    { dependencies: [ids] },
  );
}

/** Subscribe to the active section id. Any number of consumers. */
export function useActiveSection(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
