"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GitPullRequest, Github, ExternalLink } from "lucide-react";
import type { Project, ProjectLink } from "@/content";

const linkIcon = {
  repo: Github,
  pr: GitPullRequest,
  live: ExternalLink,
  docs: ExternalLink,
} as const;

type Variant = "hero" | "compact";

export function ProjectCard({
  project,
  variant = "compact",
}: {
  project: Project;
  variant?: Variant;
}) {
  const reduced = useReducedMotion();
  const primaryLink: ProjectLink = project.links[0];

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:border-fg-subtle hover:shadow-glow lg:p-8"
    >
      {/* Accent glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      
      <header className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
          <span>{project.type === "contribution" ? "contribution" : "project"}</span>
          <span className="text-border">/</span>
          <StatusDot status={project.status} />
          <span>{project.status}</span>
        </div>
        <Link
          href={primaryLink.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={primaryLink.label}
          className="relative rounded-md p-1 text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <ArrowUpRight className="size-4" />
        </Link>
      </header>

      <div className="relative mt-6 flex-1">
        <h3
          className={
            variant === "hero"
              ? "font-display text-3xl font-medium tracking-tight text-fg md:text-4xl"
              : "font-display text-xl font-medium tracking-tight text-fg"
          }
        >
          {project.title}
        </h3>
        <p
          className={
            variant === "hero"
              ? "mt-4 max-w-[58ch] text-base leading-relaxed text-fg-muted md:text-lg"
              : "mt-3 text-sm leading-relaxed text-fg-muted"
          }
        >
          {variant === "hero" ? project.description : project.summary}
        </p>
      </div>

      <footer className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-fg-muted"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => {
            const Icon = linkIcon[link.kind];
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-accent transition-colors"
              >
                <Icon className="size-3.5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </footer>
    </motion.article>
  );
}

function StatusDot({ status }: { status: Project["status"] }) {
  const color =
    status === "shipped"
      ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
      : status === "ongoing"
        ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]"
        : "bg-fg-subtle";
  
  return (
    <span 
      className={`size-1.5 rounded-full ${color}`}
      aria-hidden
    />
  );
}