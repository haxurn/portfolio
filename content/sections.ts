export type SectionKind = "chapter" | "interstitial";

export type Section = {
  readonly id: string;
  readonly label: string;
  readonly kind: SectionKind;
};

/**
 * Single source of truth for page order. `chapter` sections get a numbered
 * header and a nav entry; `interstitial` sections are unnumbered strips.
 */
export const sections: readonly Section[] = [
  { id: "home", label: "Home", kind: "chapter" },
  { id: "about", label: "About", kind: "chapter" },
  { id: "manifesto", label: "Manifesto", kind: "interstitial" },
  { id: "projects", label: "Projects", kind: "chapter" },
  { id: "craft", label: "Craft", kind: "chapter" },
  { id: "journey", label: "Journey", kind: "chapter" },
  { id: "credentials", label: "Credentials", kind: "interstitial" },
  { id: "skills", label: "Skills", kind: "chapter" },
  { id: "stack", label: "Stack", kind: "chapter" },
  { id: "github", label: "GitHub", kind: "chapter" },
  { id: "contact", label: "Contact", kind: "chapter" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const chapters: readonly Section[] = sections.filter(
  (s) => s.kind === "chapter",
);

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Chapter numeral ("00" for home, "01" for about, …). Interstitials get "·". */
export function chapterNumber(id: SectionId): string {
  const index = chapters.findIndex((s) => s.id === id);
  return index === -1 ? "·" : pad2(index);
}

/** Highest chapter numeral — what a header shows after the slash. */
export const chapterTotal: string = pad2(chapters.length - 1);

export function sectionById(id: SectionId): Section {
  const found = sections.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown section id: ${id}`);
  return found;
}
