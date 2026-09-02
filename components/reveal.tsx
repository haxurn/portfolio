"use client";

import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useReveal, type RevealPreset } from "@/hooks/use-reveal";

type RevealTag = "div" | "section" | "article" | "header" | "footer" | "li";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Animate `[data-reveal-child]` descendants with this stagger instead of the wrapper. */
  stagger?: number;
  selector?: string;
  preset?: RevealPreset;
  className?: string;
  as?: RevealTag;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

/**
 * Fade-up on scroll. Hidden by CSS until GSAP reveals it; with
 * prefers-reduced-motion the CSS rule doesn't apply and nothing runs.
 */
export function Reveal({
  children,
  delay,
  y,
  stagger,
  selector,
  preset,
  className,
  as = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { delay, y, stagger, selector, preset });

  // Every allowed tag is an HTMLElement; narrowing to "div" keeps the ref type simple.
  const Tag = as as "div";

  return (
    <Tag ref={ref} data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}
