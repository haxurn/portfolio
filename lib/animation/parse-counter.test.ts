import { describe, expect, test } from "vitest";
import { formatCounter, parseCounterValue } from "./parse-counter";

describe("parseCounterValue", () => {
  test("plain integer", () => {
    expect(parseCounterValue("3")).toEqual({ value: 3, prefix: "", suffix: "" });
  });

  test("keeps a trailing suffix", () => {
    expect(parseCounterValue("80+")).toEqual({ value: 80, prefix: "", suffix: "+" });
    expect(parseCounterValue("38%")).toEqual({ value: 38, prefix: "", suffix: "%" });
  });

  test("keeps a leading prefix and decimals", () => {
    expect(parseCounterValue("$1.5k")).toEqual({ value: 1.5, prefix: "$", suffix: "k" });
  });

  test("returns null when there is no number", () => {
    expect(parseCounterValue("Hono·Next")).toBeNull();
    expect(parseCounterValue("")).toBeNull();
  });
});

describe("formatCounter", () => {
  test("renders intermediate values with the target's decimal places", () => {
    const parts = parseCounterValue("80+");
    expect(parts).not.toBeNull();
    expect(formatCounter(parts!, 12.7)).toBe("13+");
  });

  test("keeps decimals when the target has them", () => {
    const parts = parseCounterValue("$1.5k");
    expect(formatCounter(parts!, 0.25)).toBe("$0.3k");
  });
});
