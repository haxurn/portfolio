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
  "pointer-events-none block size-[10px] shrink-0 rotate-45 border transition-[background-color,border-color,box-shadow,scale] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]";

const SELECTED_DIAMOND =
  "scale-[1.25] border-accent bg-accent shadow-[0_0_10px_var(--color-accent)]";

const HOVER_DIAMOND = "group-hover:scale-110 group-hover:border-accent";

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
      className={`group inline-flex min-h-10 items-center gap-2 rounded-md border px-2.5 py-1.5 text-left transition-[border-color,background-color] duration-200 sm:min-h-9 ${
        selected
          ? "border-accent/60 bg-accent/10"
          : "border-border/70 bg-surface-2/30 hover:border-accent/40 hover:bg-surface-2/60"
      }`}
    >
      <span
        aria-hidden
        className={`${DIAMOND_BASE} ${
          selected ? SELECTED_DIAMOND : `${TIER_NODE_CLASS[tier.id]} ${HOVER_DIAMOND}`
        }`}
      />
      <span className={`text-[12px] leading-tight ${selected ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>
        {skill.label}
      </span>
      <span className="sr-only">
        — {group.title}, {tier.label}
      </span>
    </button>
  );
}
