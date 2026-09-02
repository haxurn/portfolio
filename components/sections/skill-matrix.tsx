"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { Skill, SkillGroup } from "@/content";
import { tierForPct, type SkillTier } from "@/lib/skill-tier";
import { gsap } from "@/lib/gsap/register";
import { DUR, REVEAL_START } from "@/lib/gsap/defaults";
import { useMotion } from "@/lib/gsap/match-media";
import { SkillDetail } from "./skill-detail";
import { SkillNode } from "./skill-node";

const NODE_STAGGER_S = 0.025;
const GROUP_STAGGER_S = 0.08;

type FlatEntry = {
  readonly skill: Skill;
  readonly group: SkillGroup;
  readonly groupIndex: number;
  readonly tier: SkillTier;
};

function flattenGroups(groups: readonly SkillGroup[]): readonly FlatEntry[] {
  return groups.flatMap((group, groupIndex) =>
    group.items.map((skill) => ({
      skill,
      group,
      groupIndex,
      tier: tierForPct(skill.pct),
    })),
  );
}

/** First entry of the group `offset` groups away, clamped to the ends. */
function groupJumpIndex(
  flat: readonly FlatEntry[],
  current: number,
  offset: number,
): number {
  const targetGroup = flat[current].groupIndex + offset;
  const found = flat.findIndex((entry) => entry.groupIndex === targetGroup);
  if (found !== -1) return found;
  return offset > 0 ? flat.length - 1 : 0;
}

type SkillMatrixProps = {
  groups: readonly SkillGroup[];
};

export function SkillMatrix({ groups }: SkillMatrixProps) {
  const flat = useMemo(() => flattenGroups(groups), [groups]);
  const indexOf = useMemo(
    () => new Map(flat.map((entry, i) => [entry.skill.id, i] as const)),
    [flat],
  );
  const [selectedId, setSelectedId] = useState(() => flat[0]?.skill.id ?? "");
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const uid = useId();
  const panelId = `${uid}-skill-panel`;
  const tabId = (skillId: string) => `${uid}-skill-tab-${skillId}`;

  // Diamonds pop in group by group when the index scrolls into view.
  useMotion(listRef, {
    ok: () => {
      const list = listRef.current;
      if (!list) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: list, start: REVEAL_START, once: true },
      });
      groups.forEach((group, i) => {
        tl.from(
          list.querySelectorAll(`[data-group="${group.id}"] [data-skill-node]`),
          { autoAlpha: 0, scale: 0.5, duration: DUR.base, stagger: NODE_STAGGER_S },
          i * GROUP_STAGGER_S,
        );
      });
    },
  });

  if (flat.length === 0) return null;

  const currentIndex = Math.max(
    0,
    flat.findIndex((entry) => entry.skill.id === selectedId),
  );
  const current = flat[currentIndex];

  function moveTo(index: number) {
    setSelectedId(flat[index].skill.id);
    nodeRefs.current[index]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = flat.length - 1;
    let next: number;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = currentIndex === last ? 0 : currentIndex + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = currentIndex === 0 ? last : currentIndex - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      case "PageDown":
        next = groupJumpIndex(flat, currentIndex, 1);
        break;
      case "PageUp":
        next = groupJumpIndex(flat, currentIndex, -1);
        break;
      default:
        return;
    }

    event.preventDefault();
    moveTo(next);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
      {/* Index card */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
          <span>index</span>
          <span className="tabular-nums">
            {flat.length.toString().padStart(2, "0")} entries
          </span>
        </div>

        <div
          ref={listRef}
          role="tablist"
          aria-label="Skill index"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="space-y-7 p-5 sm:p-6"
        >
          {groups.map((group) => (
            <div key={group.id} role="presentation" data-group={group.id}>
              <div
                role="presentation"
                aria-hidden
                className="mb-2 flex items-center gap-3"
              >
                <span className="font-mono text-[11px] text-accent">
                  {group.glyph}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  {group.title}
                </span>
                <span className="hidden font-mono text-[10px] italic text-fg-subtle/70 sm:inline">
                  {group.tagline}
                </span>
                <span className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_4px,transparent_4px_8px)] text-border/80" />
                <span className="font-mono text-[10px] text-fg-subtle tabular-nums">
                  {group.items.length.toString().padStart(2, "0")}
                </span>
              </div>

              <div role="presentation" className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => {
                  const index = indexOf.get(skill.id) ?? 0;
                  return (
                    <SkillNode
                      key={skill.id}
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      skill={skill}
                      group={group}
                      tier={flat[index].tier}
                      selected={skill.id === selectedId}
                      tabId={tabId(skill.id)}
                      panelId={panelId}
                      onSelect={setSelectedId}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dossier pane — sticky wrapper must not have overflow-hidden */}
      <div className="md:sticky md:top-(--sticky-offset)">
        <SkillDetail
          skill={current.skill}
          group={current.group}
          tier={current.tier}
          position={currentIndex + 1}
          total={flat.length}
          panelId={panelId}
          activeTabId={tabId(current.skill.id)}
        />
      </div>
    </div>
  );
}
