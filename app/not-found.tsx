import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 — signal lost",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center py-24">
      <div className="relative w-full max-w-2xl">
        {/* Classification strip */}
        <div className="mb-6 flex items-center gap-3 border-y border-border/60 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-danger">
            ▚ signal lost
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_4px,transparent_4px_8px)] text-border/80"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            file · missing
          </span>
        </div>

        {/* Giant 404 */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center font-display text-[18rem] font-bold leading-none tracking-tighter text-fg-subtle/[0.05]"
          >
            404
          </div>
          <div className="relative py-16 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
              status · 404 · no route
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
              This page isn&apos;t on the map.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-fg-muted md:text-lg">
              The URL you followed doesn&apos;t resolve. The route was renamed, retired,
              or never existed — pick a direction and try again.
            </p>

            {/* Prompt */}
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-fg-muted shadow-card">
              <span className="text-accent">▸</span>
              <span>operator@haxurn:~$</span>
              <span className="text-fg">cd ~</span>
              <span className="ml-1 inline-block h-3 w-[6px] animate-pulse bg-accent" />
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                <ArrowLeft className="size-4" />
                Return to base
              </Link>
              <Link
                href="/#projects"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface-2 px-5 text-sm text-fg transition-colors hover:bg-surface hover:border-accent/40"
              >
                Browse projects
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
          <span>{"// stack trace suppressed"}</span>
          <span>retry · 0</span>
        </div>
      </div>
    </section>
  );
}
