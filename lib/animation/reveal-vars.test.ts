import { describe, expect, test } from "vitest";
import { DUR, REVEAL_Y } from "@/lib/gsap/defaults";
import { revealVars } from "./reveal-vars";

describe("revealVars", () => {
  test("defaults", () => {
    expect(revealVars()).toEqual({
      from: { autoAlpha: 0, y: REVEAL_Y },
      to: { autoAlpha: 1, y: 0, duration: DUR.reveal, delay: 0 },
    });
  });

  test("passes delay and y through", () => {
    const vars = revealVars({ delay: 0.2, y: 24 });
    expect(vars.from.y).toBe(24);
    expect(vars.to.delay).toBe(0.2);
  });

  test("only includes stagger when requested", () => {
    expect(revealVars()).not.toHaveProperty("to.stagger");
    expect(revealVars({ stagger: 0.08 }).to.stagger).toBe(0.08);
  });
});
