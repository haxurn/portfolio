"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

type MagneticLinkProps = ComponentPropsWithoutRef<"a"> & {
  strength?: number;
};

/**
 * An anchor that leans toward the pointer. Wrap it in a parent with some
 * padding — the pull is measured against the parent so the pointer can be
 * nearby, not only on top.
 */
export function MagneticLink({ strength, children, ...rest }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { strength });
  return (
    <a ref={ref} {...rest}>
      {children}
    </a>
  );
}
