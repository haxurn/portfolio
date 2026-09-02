/** Blinking block caret. Pure CSS (see `caret-blink` in globals.css); the reduced-motion rule freezes it. */
export function MonoCaret({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block align-baseline bg-accent animate-caret ${className}`}
      style={{ width: "0.55ch", height: "1em" }}
    />
  );
}
