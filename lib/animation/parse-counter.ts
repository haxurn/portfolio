export type CounterParts = {
  readonly value: number;
  readonly prefix: string;
  readonly suffix: string;
};

const COUNTER_RE = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Split a display string like "80+" or "$1.5k" into a numeric target and the
 * text around it, so a counter can tween the number and keep the decoration.
 * Returns null when there is no leading number to animate ("Hono·Next").
 */
export function parseCounterValue(input: string): CounterParts | null {
  const match = COUNTER_RE.exec(input.trim());
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const value = Number(digits);
  if (!Number.isFinite(value)) return null;
  return { value, prefix, suffix };
}

/** Render the counter at an intermediate value, preserving decimals of the target. */
export function formatCounter(parts: CounterParts, current: number): string {
  const decimals = countDecimals(parts.value);
  return `${parts.prefix}${current.toFixed(decimals)}${parts.suffix}`;
}

function countDecimals(n: number): number {
  const text = n.toString();
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : text.length - dot - 1;
}
