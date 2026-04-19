"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MonoCaret } from "@/components/mono-caret";
import { profile } from "@/content";

export function HeroIdentityCard() {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-8 shadow-card lg:p-10 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        className="relative space-y-6"
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
      >
        <motion.span 
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-fg-muted"
          initial={reduced ? undefined : { opacity: 0, x: -10 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.span 
            className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" 
            animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Available for freelance + collab
        </motion.span>

        <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block text-fg-subtle text-xl font-mono mb-3 tracking-normal">
            haxurn@tech:~$ whoami
          </span>
          {profile.name}
          <span className="text-fg-muted"> — </span>
          <span className="text-accent">{profile.alias}</span>
          <MonoCaret className="ml-1.5" />
        </h1>

        <p className="max-w-[52ch] text-lg leading-relaxed text-fg-muted lg:text-xl">
          {profile.tagline}
        </p>
      </motion.div>

      <motion.div 
        className="relative mt-8 flex flex-wrap gap-3"
        initial={reduced ? undefined : { opacity: 0, y: 10 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <motion.a
          href="#contact"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg"
          whileHover={reduced ? undefined : { scale: 1.02, opacity: 0.9 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <Mail className="size-4" />
          Get in touch
        </motion.a>
        <motion.a
          href="#projects"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface-2 px-5 text-sm text-fg hover:bg-surface transition-colors"
          whileHover={reduced ? undefined : { scale: 1.02 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          View projects
          <ArrowRight className="size-4" />
        </motion.a>
      </motion.div>
    </div>
  );
}