import { describe, expect, test } from "vitest";
import { profiles } from "./profiles";

describe("external profiles", () => {
  test("ids and urls are unique", () => {
    const ids = profiles.map((p) => p.id);
    const urls = profiles.map((p) => p.url);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(urls).size).toBe(urls.length);
  });

  test("every url is https and every handle points at haxurn", () => {
    for (const p of profiles) {
      expect(p.url, p.id).toMatch(/^https:\/\//);
      expect(p.handle.toLowerCase(), p.id).toContain("haxurn");
    }
  });

  test("icons are Simple Icons slugs or null", () => {
    for (const p of profiles) {
      if (p.icon !== null) expect(p.icon, p.id).toMatch(/^[a-z0-9]+$/);
    }
  });

  test("every profile has a note", () => {
    for (const p of profiles) expect(p.note.length, p.id).toBeGreaterThan(5);
  });
});
