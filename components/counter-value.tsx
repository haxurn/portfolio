"use client";

import { useRef } from "react";
import { useCounter } from "@/hooks/use-counter";

type CounterValueProps = {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** ScrollTrigger start; null plays on mount (hero). */
  start?: string | null;
};

/** Renders `value` server-side, counts up to it client-side when motion is allowed. */
export function CounterValue({
  value,
  className,
  duration,
  delay,
  start,
}: CounterValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useCounter(ref, { value, duration, delay, start });
  return (
    <span ref={ref} className={className} data-counter="">
      {value}
    </span>
  );
}
