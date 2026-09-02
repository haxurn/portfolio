"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** true after hydration, false during SSR — without a setState-in-effect. */
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center size-9 rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
