"use client";

import { motion, useReducedMotion } from "motion/react";

export function MonoCaret({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`inline-block align-baseline bg-accent ${className}`}
      style={{ width: "0.55ch", height: "1em" }}
      initial={{ opacity: reduced ? 1 : 0.25 }}
      animate={reduced ? undefined : { opacity: [0.25, 1, 0.25] }}
      transition={reduced ? undefined : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
