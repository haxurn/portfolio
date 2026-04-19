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
    <header className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[180px_1fr] md:items-end">
      <div className="space-y-2">
        <div className="font-display text-[44px] leading-none tracking-tighter text-fg-subtle/35 tabular-nums">
          {number}
          <span className="text-fg-subtle/20">/{total}</span>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-subtle">
          § {label}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="font-display text-3xl tracking-tight text-fg md:text-4xl max-w-[44ch]">
          {title}
        </h2>
        {sub && (
          <p className="max-w-[62ch] text-base text-fg-muted md:text-lg">
            {sub}
          </p>
        )}
        {meta}
      </div>
    </header>
  );
}
