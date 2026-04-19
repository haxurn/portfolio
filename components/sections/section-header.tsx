type Props = {
  number: string;
  total?: string;
  label: string;
  title: string;
  sub?: string;
  meta?: React.ReactNode;
};

export function SectionHeader({
  number,
  total = "07",
  label,
  title,
  sub,
  meta,
}: Props) {
  return (
    <header className="mb-14 md:mb-20">
      {/* Top rail: classification strip */}
      <div className="mb-8 flex items-center gap-3 border-y border-border/60 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent/80">
          ▚ {label}
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_4px,transparent_4px_8px)] text-border/80"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle tabular-nums">
          file · {label.toLowerCase()}-{number}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:items-end">
        {/* Oversized numeral block */}
        <div className="relative">
          <div className="flex items-start gap-1 font-display font-semibold leading-[0.82] tracking-tighter">
            <span
              aria-hidden
              className="text-[clamp(86px,14vw,148px)] text-fg [text-shadow:3px_3px_0_var(--color-accent)] tabular-nums"
            >
              {number}
            </span>
            <span className="mt-2 rotate-[8deg] font-mono text-xs text-fg-subtle">
              /{total}
            </span>
          </div>
          {/* Registration mark */}
          <div
            aria-hidden
            className="absolute -bottom-1 left-0 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle"
          >
            <span className="relative inline-block size-2.5">
              <span className="absolute inset-0 rounded-full border border-accent/70" />
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent/70" />
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-accent/70" />
            </span>
            chapter {number}
          </div>
        </div>

        {/* Title block */}
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-fg md:text-[44px] max-w-[22ch]">
            {title.split(" ").map((word, i, arr) => {
              const isLast = i === arr.length - 1;
              const italic = i === Math.floor(arr.length / 2);
              return (
                <span
                  key={i}
                  className={
                    italic
                      ? "italic font-light text-fg-muted"
                      : isLast
                        ? "text-accent"
                        : undefined
                  }
                >
                  {word}
                  {i < arr.length - 1 && " "}
                </span>
              );
            })}
          </h2>

          {/* Barcode rule */}
          <div
            aria-hidden
            className="flex items-center gap-[3px] opacity-70"
          >
            {[2, 1, 3, 1, 2, 1, 1, 4, 1, 2, 1, 3, 1, 1, 2, 5, 1, 2].map(
              (w, i) => (
                <span
                  key={i}
                  className="h-2 bg-fg-subtle"
                  style={{ width: `${w * 2}px` }}
                />
              ),
            )}
            <span className="ml-2 font-mono text-[9px] tracking-[0.3em] text-fg-subtle">
              §{number}·{total}
            </span>
          </div>

          {sub && (
            <p className="max-w-[62ch] text-base leading-relaxed text-fg-muted md:text-lg">
              {sub}
            </p>
          )}
          {meta}
        </div>
      </div>
    </header>
  );
}
