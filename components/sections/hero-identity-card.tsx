"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MonoCaret } from "@/components/mono-caret";
import { profile } from "@/content";

const SIGIL = [
  "   ╲   ╱ ",
  "    ╲ ╱  ",
  "  ───✦───",
  "    ╱ ╲  ",
  "   ╱   ╲ ",
];

export function HeroIdentityCard() {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-card lg:p-10">
      {/* Corner registration marks */}
      <Corner className="left-3 top-3" />
      <Corner className="right-3 top-3 rotate-90" />
      <Corner className="left-3 bottom-3 -rotate-90" />
      <Corner className="right-3 bottom-3 rotate-180" />

      {/* Diagonal accent stripe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rotate-[18deg] opacity-[0.08]"
        style={{
          background:
            "repeating-linear-gradient(135deg, var(--color-accent) 0 2px, transparent 2px 14px)",
        }}
      />

      {/* Classified stamp */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-8 hidden sm:block"
      >
        <div className="rotate-[8deg] rounded-sm border-2 border-accent/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.32em] text-accent/70">
          cleared · 2026
        </div>
      </div>

      {/* Vertical tape label */}
      <div
        aria-hidden
        className="absolute left-0 top-0 hidden h-full w-6 border-r border-border/60 bg-surface-2/40 lg:block"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.42em] text-fg-subtle">
          dossier · #07 · operator · haxurn
        </div>
      </div>

      <motion.div
        className="relative space-y-7 lg:pl-8"
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
      >
        {/* Status pill */}
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted backdrop-blur"
          initial={reduced ? undefined : { opacity: 0, x: -8 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.span
            className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
            animate={
              reduced ? undefined : { scale: [1, 1.25, 1], opacity: [1, 0.6, 1] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          freelance + collab — channel open
        </motion.span>

        {/* Prompt line */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">
          <span className="text-accent">▸</span>
          <span>operator@haxurn.tech:~$ whoami</span>
          <span
            aria-hidden
            className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_3px,transparent_3px_6px)] text-border"
          />
        </div>

        {/* Identity block */}
        <h1 className="font-display text-[42px] font-semibold leading-[0.98] tracking-tight sm:text-5xl lg:text-[68px]">
          <span className="block">
            {profile.name}
            <span className="italic font-light text-fg-muted">.</span>
          </span>
          <span className="mt-2 block text-[28px] lg:text-4xl">
            <span className="italic font-light text-fg-subtle">also known as</span>{" "}
            <span className="relative inline-block text-accent">
              {profile.alias}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-accent/40"
              />
            </span>
            <MonoCaret className="ml-1.5" />
          </span>
        </h1>

        <p className="max-w-[52ch] border-l-2 border-accent/50 pl-4 text-lg leading-relaxed text-fg-muted lg:text-xl">
          {profile.tagline}
        </p>

        {/* Traits row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent" /> addis ababa · ET
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent/70" /> age 18
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent/50" /> stack · ts-first
          </span>
        </div>
      </motion.div>

      {/* Actions + sigil */}
      <motion.div
        className="relative mt-10 flex flex-wrap items-end justify-between gap-6 lg:pl-8"
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <div className="flex flex-wrap gap-3">
          <motion.a
            href="#contact"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Mail className="size-4" />
            Get in touch
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 w-8 translate-x-full bg-accent-fg/10 transition-transform duration-500 group-hover:-translate-x-48"
            />
          </motion.a>
          <motion.a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface-2 px-5 text-sm text-fg transition-colors hover:bg-surface hover:border-accent/40"
            whileHover={reduced ? undefined : { scale: 1.02 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            View dossier
            <ArrowRight className="size-4" />
          </motion.a>
        </div>

        {/* ASCII sigil */}
        <pre
          aria-hidden
          className="hidden font-mono text-[10px] leading-[1.1] text-accent/50 sm:block"
        >
          {SIGIL.join("\n")}
        </pre>
      </motion.div>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-4 ${className}`}
    >
      <span className="absolute left-0 top-0 h-px w-full bg-fg-subtle/40" />
      <span className="absolute left-0 top-0 h-full w-px bg-fg-subtle/40" />
    </span>
  );
}
