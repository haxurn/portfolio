"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, GitPullRequest, Github, ExternalLink, BookOpen } from "lucide-react";
import type { Project, ProjectImage, ProjectLink } from "@/content";
import { useMotion } from "@/lib/gsap/match-media";

const linkIcon = {
  repo: Github,
  pr: GitPullRequest,
  live: ExternalLink,
  docs: BookOpen,
} as const;

type Variant = "hero" | "site" | "compact";

const TYPE_TAG: Record<Project["type"], { label: string; className: string }> = {
  project: { label: "own", className: "text-fg-muted" },
  plugin: { label: "plugin", className: "text-accent/90" },
  contribution: { label: "fork → upstream", className: "text-amber-400/90" },
};

/** Sets --spot-x/--spot-y on the card for the cursor spotlight. Fine pointers + motion only. */
function useSpotlight(ref: React.RefObject<HTMLElement | null>) {
  useMotion(ref, {
    "ok fine": () => {
      const el = ref.current;
      if (!el) return;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      };
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
  });
}

export function ProjectCard({
  project,
  variant = "compact",
}: {
  project: Project;
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement>(null);
  useSpotlight(ref);

  const primaryLink: ProjectLink = project.links[0];
  const isHero = variant === "hero";
  const isCompact = variant === "compact";
  const tag = TYPE_TAG[project.type];

  return (
    <article
      ref={ref}
      id={`project-${project.slug}`}
      className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-[3px] hover:border-accent/40 ${
        isHero ? "p-5 sm:p-7 lg:p-10" : isCompact ? "p-5" : "p-5 sm:p-6"
      }`}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), oklch(0.74 0.17 152 / 0.08), transparent 60%)",
        }}
      />

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
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`rounded-sm border border-border bg-surface-2 px-1.5 py-0.5 ${tag.className}`}
          >
            {tag.label}
          </span>
          <span className="text-border">·</span>
          <StatusBadge status={project.status} />
        </div>
        <Link
          href={primaryLink.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={primaryLink.label}
          className="relative shrink-0 rounded-md p-1 text-fg-muted transition-colors hover:bg-surface-2 hover:text-accent"
        >
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </header>

      {project.image && (
        <ProjectPlate image={project.image} slug={project.slug} isHero={isHero} />
      )}

      <div className="relative mt-5 flex-1">
        {/* Classification numeral for hero */}
        {isHero && (
          <div
            aria-hidden
            className="absolute -top-2 right-0 font-display text-[72px] font-bold leading-none tracking-tighter text-fg-subtle/[0.06] tabular-nums lg:text-[120px]"
          >
            {project.year}
          </div>
        )}

        <h3
          className={
            isHero
              ? "font-display text-[26px] font-semibold leading-[1.05] tracking-tight text-fg sm:text-[30px] md:text-[44px]"
              : isCompact
                ? "font-display text-lg font-medium leading-tight tracking-tight text-fg"
                : "font-display text-xl font-medium leading-tight tracking-tight text-fg md:text-2xl"
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

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-subtle">
          {project.role}
          <span className="mx-1.5 text-border">·</span>
          <span className="tabular-nums">{project.year}</span>
        </p>

        <p
          className={
            isHero
              ? "mt-4 max-w-[58ch] text-base leading-relaxed text-fg-muted md:text-lg"
              : "mt-3 text-sm leading-relaxed text-fg-muted"
          }
        >
          {isCompact ? project.summary : project.description}
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
    </article>
  );
}

/** Framed capture of a shipped surface — a photo plate clipped into the file. */
function ProjectPlate({
  image,
  slug,
  isHero,
}: {
  image: ProjectImage;
  slug: string;
  isHero: boolean;
}) {
  return (
    <figure className="relative mt-5 overflow-hidden rounded-lg border border-border bg-surface-2">
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.26em] text-fg-subtle">
        <span>plate · 01</span>
        <span className="tabular-nums">{slug}</span>
      </div>

      <div className={`relative overflow-hidden ${isHero ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        {/* data-plate wrapper takes the parallax transform; the <img> keeps its CSS hover zoom. */}
        <div data-plate="" className="size-full will-change-transform">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={isHero ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
            priority={isHero}
            className="size-full object-cover object-top saturate-[0.55] transition-[transform,filter] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] group-hover:saturate-100"
          />
        </div>

        {/* Registration corner marks */}
        <span aria-hidden className="pointer-events-none absolute left-2 top-2 size-3 border-l border-t border-accent/70" />
        <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 size-3 border-b border-r border-accent/70" />
      </div>
    </figure>
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
