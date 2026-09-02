import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import {
  chapterNumber,
  chapterTotal,
  chapters,
  sectionIds,
  sections,
} from "./sections";

describe("sections registry", () => {
  test("ids are unique", () => {
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
  });

  test("home is the first chapter and numbered 00", () => {
    expect(chapters[0].id).toBe("home");
    expect(chapterNumber("home")).toBe("00");
  });

  test("chapter numbers are sequential and total matches the last one", () => {
    const numbers = chapters.map((c) => chapterNumber(c.id));
    expect(numbers).toEqual(numbers.map((_, i) => i.toString().padStart(2, "0")));
    expect(chapterTotal).toBe(numbers[numbers.length - 1]);
  });

  test("interstitials are unnumbered", () => {
    for (const s of sections.filter((s) => s.kind === "interstitial")) {
      expect(chapterNumber(s.id)).toBe("·");
    }
  });

  test("every registered id is rendered by a section component", () => {
    const dir = join(process.cwd(), "components", "sections");
    const source = [
      "hero.tsx",
      "about.tsx",
      "manifesto.tsx",
      "projects.tsx",
      "craft.tsx",
      "journey.tsx",
      "credentials.tsx",
      "skills.tsx",
      "contribution-heatmap.tsx",
      "contact.tsx",
    ]
      .map((f) => readFileSync(join(dir, f), "utf8"))
      .join("\n");
    for (const id of sectionIds) {
      expect(source, `section id="${id}"`).toContain(`id="${id}"`);
    }
  });
});
