import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import {
  featuredProject,
  openSourceProjects,
  projects,
  siteProjects,
} from "./projects";

const PUBLIC_DIR = join(process.cwd(), "public");

describe("projects content", () => {
  test("slugs are unique and url-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  test("exactly one featured project, and it has a screenshot", () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].image).toBeDefined();
    expect(featuredProject.slug).toBe(featured[0].slug);
  });

  test.each(projects.map((p) => [p.slug, p] as const))(
    "%s has at least one link, a role and a plausible year",
    (_slug, project) => {
      expect(project.links.length).toBeGreaterThan(0);
      expect(project.role.length).toBeGreaterThan(0);
      expect(project.year).toBeGreaterThanOrEqual(2023);
      expect(project.year).toBeLessThanOrEqual(new Date().getFullYear());
    },
  );

  test("every screenshot exists under public/ with matching dimensions declared", () => {
    for (const project of projects) {
      if (!project.image) continue;
      expect(existsSync(join(PUBLIC_DIR, project.image.src)), project.image.src).toBe(true);
      expect(project.image.width).toBeGreaterThan(0);
      expect(project.image.height).toBeGreaterThan(0);
      expect(project.image.alt.length).toBeGreaterThan(10);
    }
  });

  test("contributions (forks) are proven by at least one PR link", () => {
    for (const project of projects.filter((p) => p.type === "contribution")) {
      expect(project.links.some((l) => l.kind === "pr"), project.slug).toBe(true);
    }
  });

  test("own repos and plugins never masquerade as upstream PRs", () => {
    for (const project of projects.filter((p) => p.type !== "contribution")) {
      expect(project.links.some((l) => l.kind === "pr"), project.slug).toBe(false);
    }
  });

  test("shipped sites link to a live URL", () => {
    for (const project of projects.filter((p) => p.type === "project" && p.image)) {
      expect(project.links.some((l) => l.kind === "live"), project.slug).toBe(true);
    }
  });

  test("site + open-source + featured partition covers every project once", () => {
    const all = [featuredProject, ...siteProjects, ...openSourceProjects].map((p) => p.slug);
    expect(new Set(all).size).toBe(all.length);
    expect(all.length).toBe(projects.length);
  });
});
