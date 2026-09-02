"use client";

import { useRef } from "react";
import type { Skill, SkillGroup } from "@/content";
import {
  SKILL_TIERS,
  SKILL_TIER_COUNT,
  type SkillTier,
} from "@/lib/skill-tier";
import { gsap } from "@/lib/gsap/register";
import { DUR } from "@/lib/gsap/defaults";
import { useMotion } from "@/lib/gsap/match-media";

const PANEL_IN_OFFSET_PX = 6;

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

function TierLadder({ tier }: { tier: SkillTier }) {
  const activeIndex = tier.rank - 1;

  return (
    <div aria-hidden className="flex items-center gap-1">
      {SKILL_TIERS.map((step, i) => {
        const isActive = i === activeIndex;
        const isFilled = i <= activeIndex;
        return (
          <span
            key={step.id}
            className={`h-2 flex-1 rounded-[1px] transition-colors duration-200 ${
              isFilled
                ? isActive
                  ? "bg-accent shadow-[0_0_8px_var(--color-accent)]"
                  : "bg-accent/60"
                : "bg-surface-2"
            }`}
          />
        );
      })}
    </div>
  );
}

type SkillDetailProps = {
  skill: Skill;
  group: SkillGroup;
  tier: SkillTier;
  position: number;
  total: number;
  panelId: string;
  activeTabId: string;
};

export function SkillDetail({
  skill,
  group,
  tier,
  position,
  total,
  panelId,
  activeTabId,
}: SkillDetailProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Re-runs on every selection; revertOnUpdate keeps old tweens from stacking.
  useMotion(
    bodyRef,
    {
      ok: () => {
        gsap.fromTo(
          bodyRef.current,
          { autoAlpha: 0, y: PANEL_IN_OFFSET_PX },
          { autoAlpha: 1, y: 0, duration: DUR.fast },
        );
      },
    },
    { dependencies: [skill.id], revertOnUpdate: true },
  );

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={activeTabId}
      tabIndex={0}
      className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card"
    >
      {/* Top rail */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-subtle">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          dossier
        </span>
        <span className="tabular-nums">
          {pad2(position)} / {pad2(total)}
        </span>
      </div>

      <div className="min-h-[19rem] p-5 sm:p-6">
        <div ref={bodyRef} className="flex h-full flex-col">
          {/* Identity */}
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
            <span className="text-accent">{group.glyph}</span>
            {group.title}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-fg">
            {skill.label}
          </h3>

          <div
            aria-hidden
            className="my-5 h-px w-full bg-[repeating-linear-gradient(to_right,currentColor_0_4px,transparent_4px_8px)] text-border/80"
          />

          {/* Tier */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-lg font-medium text-fg">
                {tier.label}
              </span>
              <span className="font-mono text-[10px] text-fg-subtle tabular-nums">
                <span className="text-accent">[</span>
                {skill.pct}
                <span className="text-accent">]</span>
              </span>
            </div>
            <TierLadder tier={tier} />
            <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
              <span>{tier.blurb}</span>
              <span className="tabular-nums">
                tier {pad2(tier.rank)} / {pad2(SKILL_TIER_COUNT)}
              </span>
            </div>
          </div>

          {/* Note */}
          <p className="mt-6 text-sm leading-relaxed text-fg-muted">
            {skill.note}
          </p>

          {/* Footer meta */}
          <div className="mt-auto pt-6">
            <ul className="flex flex-wrap gap-1.5">
              {skill.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm border border-border/70 bg-surface-2/50 px-2 py-0.5 font-mono text-[10px] lowercase tracking-[0.14em] text-fg-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
              since <span className="text-fg tabular-nums">{skill.since}</span>
              <span className="mx-2 text-border">·</span>
              ref <span className="tabular-nums">{group.id}-{skill.id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
