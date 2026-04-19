"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

type Shortcut = {
  keys: string[];
  label: string;
};

type Group = {
  title: string;
  shortcuts: Shortcut[];
};

const GROUPS: Group[] = [
  {
    title: "Navigate",
    shortcuts: [
      { keys: ["g", "h"], label: "Jump to home" },
      { keys: ["g", "a"], label: "Jump to about" },
      { keys: ["g", "p"], label: "Jump to projects" },
      { keys: ["g", "j"], label: "Jump to journey" },
      { keys: ["g", "s"], label: "Jump to skills" },
      { keys: ["g", "c"], label: "Jump to contact" },
    ],
  },
  {
    title: "Actions",
    shortcuts: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["?"], label: "Toggle this help" },
      { keys: ["Esc"], label: "Close any overlay" },
      { keys: ["t"], label: "Toggle dark / light" },
    ],
  },
];

const SECTION_MAP: Record<string, string> = {
  h: "home",
  a: "about",
  p: "projects",
  j: "journey",
  s: "skills",
  c: "contact",
};

export function ShortcutsOverlay() {
  const [open, setOpen] = useState(false);
  const pendingG = useRef<number | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const isEditable = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      const tag = t.tagName.toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        t.isContentEditable
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;

      // Question mark toggles overlay (Shift+/ on most layouts)
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }

      // Toggle theme with `t`
      if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        return;
      }

      // Two-stroke: g then [h|a|p|j|s|c]
      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        if (pendingG.current) window.clearTimeout(pendingG.current);
        pendingG.current = window.setTimeout(() => {
          pendingG.current = null;
        }, 900);
        return;
      }

      if (pendingG.current) {
        const targetId = SECTION_MAP[e.key.toLowerCase()];
        if (targetId) {
          e.preventDefault();
          const el = document.getElementById(targetId);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${targetId}`);
        }
        window.clearTimeout(pendingG.current);
        pendingG.current = null;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (pendingG.current) window.clearTimeout(pendingG.current);
    };
  }, [open, resolvedTheme, setTheme]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-50 grid place-items-center px-4 py-10"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close shortcuts"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />

      {/* Sheet — terminal manpage */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/60 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#ff5f56]" />
            <span className="size-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              man haxurn · shortcuts
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-fg-subtle transition-colors hover:bg-surface hover:text-fg"
            aria-label="Close"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="border-b border-border/60 px-4 py-2 font-mono text-[11px] text-fg-subtle">
          <span className="text-accent">▸</span>{" "}
          <span>operator@haxurn:~$ </span>
          <span className="text-fg">man shortcuts</span>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                <span>◈</span>
                {group.title}
                <span
                  aria-hidden
                  className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_3px,transparent_3px_6px)] opacity-40"
                />
              </div>
              <ul className="space-y-2.5">
                {group.shortcuts.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-fg">{s.label}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && (
                            <span className="font-mono text-[10px] text-fg-subtle">
                              then
                            </span>
                          )}
                          <kbd className="inline-flex min-w-[22px] items-center justify-center rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] leading-none text-fg">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/60 bg-surface-2/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
          <span>press ? anywhere to toggle · esc to close</span>
          <span>rev · 2026.04</span>
        </div>
      </div>
    </div>
  );
}
