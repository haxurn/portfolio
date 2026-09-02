"use client";

import type { Skill, SkillGroup } from "@/content";
import type { SkillTier, SkillTierId } from "@/lib/skill-tier";

/** Diamond fill per tier — tokens only, so the light theme keeps working. */
const TIER_NODE_CLASS: Record<SkillTierId, string> = {
  deep: "border-accent bg-accent",
  fluent: "border-accent bg-accent/55",
  working: "border-accent/70 bg-accent/25",
  exposure: "border-fg-subtle/60 bg-surface-2",
};

const DIAMOND_BASE =
  "pointer-events-none block size-[13px] rotate-45 border transition-[background-color,border-color,box-shadow,scale] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]";

const SELECTED_CLASS =
  "scale-[1.35] border-accent bg-accent shadow-[0_0_12px_var(--color-accent)]";

const HOVER_CLASS = "group-hover:scale-125 group-hover:border-accent";

type SkillNodeProps = {
  skill: Skill;
  group: SkillGroup;
  tier: SkillTier;
  selected: boolean;
  tabId: string;
  panelId: string;
  onSelect: (skillId: string) => void;
  ref?: React.Ref<HTMLButtonElement>;
};

/** One diamond in the index. Entrance stagger is driven by skill-matrix.tsx via data-skill-node. */
export function SkillNode({
  skill,
  group,
  tier,
  selected,
  tabId,
  panelId,
  onSelect,
  ref,
}: SkillNodeProps) {
  return (
    <button
      ref={ref}
      type="button"
      id={tabId}
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(skill.id)}
      data-skill-node=""
      className="group relative grid size-11 place-items-center sm:size-10"
    >
      <span className="sr-only">
        {skill.label} — {group.title}, {tier.label}
      </span>

      {/* Selection reticle */}
      <span
        aria-hidden
        className={`pointer-events-none absolute size-7 rotate-45 border border-dashed border-accent/60 transition-opacity duration-200 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
      />

      <span
        aria-hidden
        className={`${DIAMOND_BASE} ${
          selected ? SELECTED_CLASS : `${TIER_NODE_CLASS[tier.id]} ${HOVER_CLASS}`
        }`}
      />

      {/* Label tooltip — below, so the card's overflow-hidden never clips it */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[calc(100%+4px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {skill.label}
      </span>
    </button>
  );
}
