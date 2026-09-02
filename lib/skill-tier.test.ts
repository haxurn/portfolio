import { describe, expect, test } from "vitest";
import { SKILL_TIERS, SKILL_TIER_COUNT, tierForPct } from "./skill-tier";

describe("tierForPct", () => {
  test.each([
    [0, "exposure"],
    [49, "exposure"],
    [50, "working"],
    [69, "working"],
    [70, "fluent"],
    [84, "fluent"],
    [85, "deep"],
    [100, "deep"],
  ])("maps %i%% to the %s tier", (pct, expected) => {
    expect(tierForPct(pct).id).toBe(expected);
  });

  test("ranks are 1..N in ascending threshold order", () => {
    const ranks = SKILL_TIERS.map((t) => t.rank);
    expect(ranks).toEqual(ranks.map((_, i) => i + 1));
    expect(SKILL_TIER_COUNT).toBe(SKILL_TIERS.length);
  });
});
