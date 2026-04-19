const KEYWORDS = [
  "security-minded",
  "typescript first",
  "better auth",
  "ctf · web · crypto · pwn",
  "reverse engineering",
  "shipping in the open",
  "addis ababa",
  "hono · next · drizzle",
  "insa alum",
  "aspiring producer",
  "read the binary",
  "small discoveries",
];

export function Marquee() {
  const items = [...KEYWORDS, ...KEYWORDS]; // duplicate for seamless loop

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-3 my-6"
    >
      {/* edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.28em] text-fg-muted">
        {items.map((kw, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-fg">{kw}</span>
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-slide 48s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
