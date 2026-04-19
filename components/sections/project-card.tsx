"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, GitPullRequest, Github, ExternalLink } from "lucide-react";
import { useState } from "react";
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
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const isHero = variant === "hero";

  const handleMove = reduced
    ? undefined
    : (e: React.MouseEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCoords({ x: e.clientX - r.left, y: e.clientY - r.top });
      };

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={() => setCoords(null)}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-accent/40 ${
        isHero ? "p-7 lg:p-10" : "p-6"
      }`}
    >
      {/* Spotlight follow cursor */}
      {coords && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, oklch(0.74 0.17 152 / 0.08), transparent 60%)`,
          }}
        />
      )}

      {/* Crosshatch diagonal in hero */}
      {isHero && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-[18deg] opacity-[0.06]"
          style={{
            background:
              "repeating-linear-gradient(135deg, var(--color-accent) 0 1.5px, transparent 1.5px 10px)",
          }}
        />
      )}

      {/* Top strip */}
      <header className="relative flex items-center justify-between gap-4 border-b border-border/60 pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
        <div className="flex items-center gap-2">
          <span className="rounded-sm border border-border bg-surface-2 px-1.5 py-0.5 text-fg-muted">
            {project.type === "contribution" ? "contrib" : "project"}
          </span>
          <span className="text-border">·</span>
          <StatusBadge status={project.status} />
        </div>
        <Link
          href={primaryLink.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={primaryLink.label}
          className="relative rounded-md p-1 text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent"
        >
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </header>

      <div className="relative mt-5 flex-1">
        {/* Classification numeral for hero */}
        {isHero && (
          <div
            aria-hidden
            className="absolute -top-2 right-0 font-display text-[72px] font-bold leading-none tracking-tighter text-fg-subtle/[0.06] tabular-nums lg:text-[120px]"
          >
            {String(project.slug.length).padStart(2, "0")}
          </div>
        )}

        <h3
          className={
            isHero
              ? "font-display text-[30px] font-semibold leading-[1.05] tracking-tight text-fg md:text-[44px]"
              : "font-display text-xl font-medium leading-tight tracking-tight text-fg"
          }
        >
          {project.title}
        </h3>

        {/* Mini hand-drawn rule under the title */}
        <div className="mt-2 flex items-center gap-1">
          <span className="h-px w-6 bg-accent" />
          <span className="h-px w-2 bg-accent/50" />
          <span className="h-px w-1 bg-accent/30" />
        </div>

        <p
          className={
            isHero
              ? "mt-4 max-w-[58ch] text-base leading-relaxed text-fg-muted md:text-lg"
              : "mt-3 text-sm leading-relaxed text-fg-muted"
          }
        >
          {isHero ? project.description : project.summary}
        </p>
      </div>

      <footer className="relative mt-6 space-y-4 border-t border-border/60 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface-2/60 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
            >
              <span className="size-1 rounded-full bg-accent/60" />
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.links.map((link) => {
            const Icon = linkIcon[link.kind];
            return (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-accent"
              >
                <Icon className="size-3" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </footer>
    </motion.article>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    shipped: {
      dot: "bg-accent shadow-[0_0_8px_var(--color-accent)]",
      label: "shipped",
    },
    ongoing: {
      dot: "bg-amber-400 shadow-[0_0_6px_#fbbf24] animate-pulse",
      label: "in motion",
    },
    archived: {
      dot: "bg-fg-subtle",
      label: "archived",
    },
  } as const;
  const cfg = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-fg-muted">
      <span aria-hidden className={`size-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
