import { Reveal } from "@/components/reveal";

type SealPattern = "dashed" | "serrated" | "double" | "starburst" | "gear";

type Credential = {
  id: string;
  glyph: string;
  name: string;
  role: string;
  meta: string;
  status: "active" | "current" | "contributor" | "shipped" | "ongoing";
  tilt: number;
  pattern: SealPattern;
  href?: string;
};

const CREDENTIALS: Credential[] = [
  {
    id: "insa",
    glyph: "IS",
    name: "INSA",
    role: "Information Network Security · analyst",
    meta: "since 2023 · analyst",
    status: "active",
    tilt: -4,
    pattern: "dashed",
  },
  {
    id: "solvix",
    glyph: "SL",
    name: "Solvix Labs PLC",
    role: "Co-founder · engineer · Axova",
    meta: "founded 2024 → now",
    status: "current",
    tilt: 3,
    pattern: "double",
  },
  {
    id: "betterauth",
    glyph: "BA",
    name: "Better Auth",
    role: "Contributor · upstream",
    meta: "PR #2006 · merged",
    href: "https://github.com/better-auth/better-auth/pull/2006",
    status: "contributor",
    tilt: -2,
    pattern: "serrated",
  },
  {
    id: "ctf",
    glyph: "CTF",
    name: "Capture the Flag",
    role: "Web · crypto · pwn",
    meta: "80+ solves",
    status: "ongoing",
    tilt: 4,
    pattern: "starburst",
  },
  {
    id: "oss",
    glyph: "OS",
    name: "Open Source",
    role: "Author · Better Auth plugins",
    meta: "waitlist · middleware · MIT",
    status: "shipped",
    tilt: -3,
    pattern: "gear",
  },
];

export function Credentials() {
  return (
    <section
      id="credentials"
      aria-label="Credentials"
      className="py-10 md:py-14"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          {/* Top rail */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
            <span className="flex items-center gap-2">
              <span className="text-accent">◉</span>
              credentials · sealed
            </span>
            <span>
              {CREDENTIALS.length.toString().padStart(2, "0")} endorsements · verified
            </span>
          </div>

          {/* Watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[220px] font-bold leading-none tracking-tighter text-fg-subtle/[0.025] sm:text-[320px]"
          >
            VOUCHED
          </div>

          {/* Seals row */}
          <Reveal
            stagger={0.08}
            className="relative grid grid-cols-2 gap-x-3 gap-y-8 p-6 sm:grid-cols-3 sm:gap-x-4 sm:p-8 md:px-10 md:py-12 lg:grid-cols-5"
          >
            {CREDENTIALS.map((c) => (
              <SealTile key={c.id} credential={c} />
            ))}
          </Reveal>

          {/* Bottom rail — signature + tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-surface-2/30 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
            <span>— countersigned · haxurn</span>
            <span
              aria-hidden
              className="flex items-center gap-[2px] opacity-50"
            >
              {[2, 1, 3, 1, 1, 4, 1, 2, 3, 1, 2, 1].map((w, i) => (
                <span
                  key={i}
                  className="h-2 bg-fg-subtle"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </span>
            <span className="tabular-nums">rev · 2026.09</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * Tilt lives in a CSS variable so Tailwind's `rotate`/`scale` (independent
 * transform properties) never fight GSAP's translate on the same element.
 */
function SealTile({ credential }: { credential: Credential }) {
  return (
    <div
      data-reveal-child=""
      className="group relative flex flex-col items-center text-center"
    >
      {/* Seal */}
      <div
        style={{ "--tilt": `${credential.tilt}deg` } as React.CSSProperties}
        className="relative rotate-(--tilt) transition-[rotate,scale] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-0 group-hover:scale-[1.06]"
      >
        <SealFrame href={credential.href} name={credential.name}>
          <Seal glyph={credential.glyph} pattern={credential.pattern} />
        </SealFrame>

        {/* Status pin */}
        <span
          aria-hidden
          className="absolute -right-1 -top-1 rounded-full border-2 border-bg bg-accent px-1.5 py-px font-mono text-[8px] uppercase tracking-[0.2em] text-accent-fg shadow-[0_0_8px_var(--color-accent)]"
        >
          {credential.status}
        </span>
      </div>

      {/* Caption */}
      <div className="mt-4 space-y-1">
        <div className="font-display text-sm font-semibold leading-tight tracking-tight text-fg md:text-base">
          {credential.name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
          {credential.role}
        </div>
        <div className="font-mono text-[10px] text-fg-subtle">
          {credential.meta}
        </div>
      </div>

      {/* Connector ticks */}
      <span
        aria-hidden
        className="absolute inset-x-0 -top-2 mx-auto h-px w-8 bg-accent/40"
      />
    </div>
  );
}

/** Wraps a seal in a link when the credential has a verifiable source. */
function SealFrame({
  href,
  name,
  children,
}: {
  href?: string;
  name: string;
  children: React.ReactNode;
}) {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — view source`}
      className="block rounded-full"
    >
      {children}
    </a>
  );
}

function Seal({ glyph, pattern }: { glyph: string; pattern: SealPattern }) {
  const accent = "var(--color-accent)";

  return (
    <svg
      viewBox="0 0 100 100"
      className="size-[78px] drop-shadow-[0_4px_12px_oklch(0.74_0.17_152/0.18)] transition-transform duration-500 group-hover:drop-shadow-[0_6px_20px_oklch(0.74_0.17_152/0.35)] sm:size-[92px] md:size-[100px]"
      role="img"
    >
      {/* Base disc */}
      <defs>
        <radialGradient id={`grad-${glyph}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="oklch(0.84 0.18 152)" />
          <stop offset="55%" stopColor="oklch(0.72 0.17 152)" />
          <stop offset="100%" stopColor="oklch(0.48 0.12 152)" />
        </radialGradient>
      </defs>

      {/* Outer decorations per pattern */}
      {pattern === "dashed" && (
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.5"
        />
      )}

      {pattern === "serrated" && (
        <g opacity="0.6">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * 360;
            return (
              <line
                key={i}
                x1="50"
                y1="2"
                x2="50"
                y2="8"
                stroke={accent}
                strokeWidth="1.5"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </g>
      )}

      {pattern === "double" && (
        <>
          <circle cx="50" cy="50" r="49" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.4" />
        </>
      )}

      {pattern === "starburst" && (
        <g opacity="0.45">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * 360;
            return (
              <line
                key={i}
                x1="50"
                y1="4"
                x2="50"
                y2="10"
                stroke={accent}
                strokeWidth={i % 2 === 0 ? 2 : 1}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </g>
      )}

      {pattern === "gear" && (
        <g opacity="0.5">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            return (
              <rect
                key={i}
                x="48"
                y="2"
                width="4"
                height="6"
                fill={accent}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </g>
      )}

      {/* Main disc */}
      <circle cx="50" cy="50" r="38" fill={`url(#grad-${glyph})`} />

      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="oklch(0.22 0.05 152)"
        strokeWidth="0.8"
        opacity="0.6"
      />

      {/* Tick marks in inner ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360;
        return (
          <line
            key={i}
            x1="50"
            y1="16"
            x2="50"
            y2="19"
            stroke="oklch(0.22 0.05 152)"
            strokeWidth="0.6"
            opacity="0.5"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}

      {/* Glyph */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Syne, ui-sans-serif, system-ui"
        fontSize={glyph.length > 2 ? 16 : 22}
        fontWeight="700"
        fill="oklch(0.16 0.05 152)"
        letterSpacing="0.02em"
      >
        {glyph}
      </text>

      {/* Signature wax drip (decorative) */}
      <circle cx="80" cy="76" r="3" fill={accent} opacity="0.7" />
      <circle cx="80" cy="76" r="1.2" fill="oklch(0.18 0.05 152)" />
    </svg>
  );
}
