import { describe, expect, test } from "vitest";
import { stack, stackByGroup, stackGroups, stackIconUrl } from "./stack";

describe("stack content", () => {
  test("ids and icon slugs are unique", () => {
    const ids = stack.map((s) => s.id);
    const icons = stack.map((s) => s.icon);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(icons).size).toBe(icons.length);
  });

  test("brand colours are 6-digit hex without a hash", () => {
    for (const item of stack) expect(item.brand, item.id).toMatch(/^[0-9A-F]{6}$/);
  });

  test("icon slugs are Simple Icons slugs (lowercase, alphanumeric)", () => {
    for (const item of stack) expect(item.icon, item.id).toMatch(/^[a-z0-9]+$/);
    expect(stackIconUrl(stack[0])).toBe(`https://cdn.simpleicons.org/${stack[0].icon}`);
  });

  test("every item belongs to a declared group and every group is non-empty", () => {
    const groupIds = new Set(stackGroups.map((g) => g.id));
    for (const item of stack) expect(groupIds.has(item.group), item.id).toBe(true);
    for (const group of stackGroups) expect(stackByGroup(group.id).length, group.id).toBeGreaterThan(0);
  });

  test("every item cites where it is used", () => {
    for (const item of stack) expect(item.evidence.length, item.id).toBeGreaterThan(5);
  });
});
