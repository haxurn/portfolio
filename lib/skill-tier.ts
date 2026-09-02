export type SkillTierId = "exposure" | "working" | "fluent" | "deep";

export const TIER_MIN_EXPOSURE = 0;
export const TIER_MIN_WORKING = 50;
export const TIER_MIN_FLUENT = 70;
export const TIER_MIN_DEEP = 85;

export const SKILL_TIER_COUNT = 4;

export type SkillTier = {
  readonly id: SkillTierId;
  readonly rank: 1 | 2 | 3 | 4;
  readonly label: string;
  readonly blurb: string;
  readonly minPct: number;
};

/** Ascending by rank — index === rank - 1. */
export const SKILL_TIERS: readonly SkillTier[] = [
  {
    id: "exposure",
    rank: 1,
    label: "Exposure",
    blurb: "Learning in public.",
    minPct: TIER_MIN_EXPOSURE,
  },
  {
    id: "working",
    rank: 2,
    label: "Working",
    blurb: "Productive with a reference open.",
    minPct: TIER_MIN_WORKING,
  },
  {
    id: "fluent",
    rank: 3,
    label: "Fluent",
    blurb: "Ships without supervision.",
    minPct: TIER_MIN_FLUENT,
  },
  {
    id: "deep",
    rank: 4,
    label: "Deep",
    blurb: "Where I'm actually useful.",
    minPct: TIER_MIN_DEEP,
  },
] as const;

/** Highest tier whose threshold the score clears. */
export function tierForPct(pct: number): SkillTier {
  for (let i = SKILL_TIERS.length - 1; i >= 0; i -= 1) {
    const tier = SKILL_TIERS[i];
    if (pct >= tier.minPct) return tier;
  }
  return SKILL_TIERS[0];
}
