"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={(resolvedTheme ?? "dark") as ToasterProps["theme"]}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] rounded-[var(--radius-md)]",
          description: "text-[var(--color-fg-muted)]",
          actionButton: "bg-[var(--color-accent)] text-[var(--color-accent-fg)]",
          cancelButton: "bg-[var(--color-surface-2)] text-[var(--color-fg-muted)]",
          success: "text-[var(--color-accent)]",
          error: "text-[var(--color-danger)]",
        },
      }}
      {...props}
    />
  );
}
