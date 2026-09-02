const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

type BrandIconProps = {
  /** Simple Icons slug, or a full https URL to an SVG. */
  icon: string;
  /** Tailwind size class for the glyph, e.g. "size-5". */
  className?: string;
};

export function isIconUrl(icon: string): boolean {
  return icon.startsWith("https://");
}

export function brandIconUrl(icon: string): string {
  return isIconUrl(icon) ? icon : `${SIMPLE_ICONS_CDN}/${icon}`;
}

/**
 * A brand mark drawn in `currentColor`. Monochrome Simple Icons slugs render
 * as a CSS mask so they follow the theme and recolour on hover; full-colour
 * SVG URLs render as an image, greyscale until the parent `.group` is hovered.
 */
export function BrandIcon({ icon, className = "size-5" }: BrandIconProps) {
  const url = brandIconUrl(icon);

  if (isIconUrl(icon)) {
    return (
      // Plain <img>: an SVG from a CDN, nothing for the image pipeline to do.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
        className={`${className} object-contain opacity-70 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0`}
      />
    );
  }

  return (
    <span
      aria-hidden
      style={{ "--brand-icon": `url("${url}")` } as React.CSSProperties}
      className={`block ${className} bg-current [mask-image:var(--brand-icon)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:var(--brand-icon)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]`}
    />
  );
}
