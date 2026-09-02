import { isIconUrl, stackIconUrl, type StackItem } from "@/content";

/**
 * One toolchain entry. The logo is a CSS mask over `currentColor`, so it
 * follows the theme (muted by default) and takes the brand colour on hover
 * or focus. No JavaScript, no image optimisation pipeline needed for SVG.
 */
/** Relative luminance of a 6-digit hex colour, 0..1. */
function luminance(hex: string): number {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Black-on-black brands (Next.js, Vercel, Bun…) fall back to the foreground token on hover. */
const DARK_BRAND_THRESHOLD = 0.18;

export function StackTile({ item }: { item: StackItem }) {
  const iconUrl = stackIconUrl(item);
  const hoverColor =
    luminance(item.brand) < DARK_BRAND_THRESHOLD
      ? "var(--color-fg)"
      : `#${item.brand}`;
  const style = {
    "--brand": hoverColor,
    "--stack-icon": `url("${iconUrl}")`,
  } as React.CSSProperties;

  return (
    <li
      data-stack-tile=""
      data-reveal-child=""
      style={style}
      className="group relative flex items-start gap-3 rounded-md border border-border/70 bg-surface-2/30 px-3 py-2.5 transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-surface-2/60 focus-within:border-accent/40"
    >
      {/* Logo plate */}
      <span
        aria-hidden
        className="grid size-9 shrink-0 place-items-center rounded-sm border border-border/60 bg-bg/60 text-fg-muted transition-colors duration-200 group-hover:text-(--brand)"
      >
        {isIconUrl(item.icon) ? (
          // Colour mark: greyscale until hover. Plain <img> — it is an SVG from a CDN, nothing to optimise.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt=""
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            className="size-5 object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span className="block size-5 bg-current [mask-image:var(--stack-icon)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:var(--stack-icon)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]" />
        )}
      </span>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-fg">{item.name}</div>
        <div className="line-clamp-2 font-mono text-[10px] leading-snug text-fg-subtle">
          {item.evidence}
        </div>
      </div>

      {/* Corner tick */}
      <span
        aria-hidden
        className="absolute right-1.5 top-1.5 size-1 rounded-full bg-accent/0 transition-colors duration-200 group-hover:bg-accent/70"
      />
    </li>
  );
}
