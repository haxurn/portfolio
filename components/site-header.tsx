"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { chapters, profile, sections } from "@/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { gsap } from "@/lib/gsap/register";

/** Nav shows chapters only; interstitials resolve to the chapter above them. */
function activeChapterIndex(activeId: string): number {
  const position = sections.findIndex((s) => s.id === activeId);
  const chapterIds = chapters.map((c) => c.id);
  for (let i = position; i >= 0; i -= 1) {
    const idx = chapterIds.indexOf(sections[i].id);
    if (idx !== -1) return idx;
  }
  return 0;
}

export function SiteHeader() {
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Close the mobile menu on Escape and lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Progress bar: transform only, no React state, no CSS transition to fight.
  useScrollProgress((p) => {
    if (barRef.current) gsap.set(barRef.current, { scaleX: p });
  });

  const activeIndex = activeChapterIndex(activeId);
  const total = chapters.length;
  const activeLabel = chapters[activeIndex]?.label ?? "Home";
  const activeChapterId = chapters[activeIndex]?.id;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-md supports-[backdrop-filter]:bg-bg/55">
      {/* top status strip */}
      <div className="hidden sm:block border-b border-border/40">
        <div className="mx-auto flex h-7 w-full max-w-6xl items-center justify-between gap-4 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-block size-1.5 rounded-full bg-accent" />
            </span>
            <span>{profile.alias}@tech</span>
            <span className="text-border">/</span>
            <span>online</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="text-border">/</span>
              {String(total).padStart(2, "0")}
            </span>
            <span className="text-border">—</span>
            <span className="text-fg-muted normal-case tracking-normal">
              {activeLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 tabular-nums">
            <span>uptime 3y</span>
            <span className="text-border">·</span>
            <span>v2026.09</span>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="group inline-flex items-center gap-1 font-mono text-sm font-medium tracking-tight text-fg"
        >
          <span className="text-accent transition-transform group-hover:-translate-x-0.5">❯</span>
          <span>{profile.alias}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary">
          {chapters.slice(1, -1).map((item) => {
            const isActive = activeChapterId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg hover:bg-surface"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-1 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <CommandPaletteTrigger />
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface-2/60 text-fg-muted transition-colors hover:border-accent/40 hover:text-accent md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* mobile nav panel */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-border/60 bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-1 px-4 py-4 sm:px-6"
        >
          {chapters.map((item, i) => {
            const isActive = activeChapterId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-md px-3 py-3 font-mono text-sm transition-colors ${
                  isActive
                    ? "bg-surface text-fg"
                    : "text-fg-muted hover:bg-surface hover:text-fg"
                }`}
              >
                <span className="text-[10px] tabular-nums text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* scroll progress */}
      <div className="h-px w-full overflow-hidden bg-transparent" aria-hidden>
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/80 to-accent/40"
        />
      </div>
    </header>
  );
}
