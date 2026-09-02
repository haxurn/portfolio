import { Suspense } from "react";
import { Activity, Calendar } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  getContributions,
  type ContributionCalendar,
} from "@/lib/github";
import { profile } from "@/content";
import { ContributionCell } from "./contribution-cell";
import { SectionHeader } from "./section-header";

const WEEKDAYS = ["Mon", "Wed", "Fri"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function monthLabels(data: ContributionCalendar): {
  col: number;
  label: string;
}[] {
  const out: { col: number; label: string }[] = [];
  let lastMonth = -1;
  data.weeks.forEach((week, idx) => {
    const first = week.days[0];
    if (!first) return;
    const month = parseInt(first.date.split("-")[1], 10) - 1;
    if (month !== lastMonth && idx < data.weeks.length - 1) {
      out.push({ col: idx, label: MONTHS[month] });
      lastMonth = month;
    }
  });
  return out;
}

async function HeatmapGrid() {
  const data = await getContributions(profile.socials.github.handle);
  if (!data) return <HeatmapFallback />;

  const months = monthLabels(data);
  const rangeStart = new Date(data.start);
  const rangeEnd = new Date(data.end);

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
            Contributions
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl text-fg tabular-nums md:text-4xl">
              {data.total.toLocaleString()}
            </span>
            <span className="font-mono text-sm text-fg-muted">
              commits & PRs · last 12 months
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
          <Calendar className="size-3" />
          <span>{formatDate(rangeStart)}</span>
          <span className="text-border">→</span>
          <span>{formatDate(rangeEnd)}</span>
        </div>
      </header>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-max">
          {/* month row */}
          <div
            className="grid gap-[3px] pl-[32px]"
            style={{
              gridTemplateColumns: `repeat(${data.weeks.length}, 11px)`,
            }}
            aria-hidden
          >
            {data.weeks.map((_, i) => {
              const label = months.find((m) => m.col === i);
              return (
                <div
                  key={i}
                  className="h-3 font-mono text-[10px] text-fg-subtle"
                >
                  {label?.label}
                </div>
              );
            })}
          </div>

          {/* grid */}
          <div className="mt-1 flex">
            <div
              className="mr-2 grid gap-[3px]"
              aria-hidden
              style={{ gridTemplateRows: "repeat(7, 11px)" }}
            >
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div
                  key={i}
                  className="h-[11px] font-mono text-[10px] leading-[11px] text-fg-subtle"
                >
                  {d}
                </div>
              ))}
            </div>

            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${data.weeks.length}, 11px)`,
                gridTemplateRows: "repeat(7, 11px)",
                gridAutoFlow: "column",
              }}
            >
              {data.weeks.flatMap((week) =>
                Array.from({ length: 7 }).map((_, row) => {
                  const day = week.days.find((d) => d.weekday === row);
                  if (!day) {
                    return (
                      <span
                        key={`${week.days[0]?.date ?? "w"}-${row}`}
                        aria-hidden
                        className="size-[11px]"
                      />
                    );
                  }
                  return (
                    <ContributionCell
                      key={day.date}
                      date={day.date}
                      level={day.level}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
          <Activity className="size-3" />
          <span>pulled from github · cached for 1h</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-fg-subtle">
          <span>less</span>
          <div className="flex gap-[3px]">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className={`size-[11px] rounded-[3px] ring-1 ring-inset ring-black/10 ${levelClass(lvl)}`}
              />
            ))}
          </div>
          <span>more</span>
        </div>
      </footer>
    </div>
  );
}

function HeatmapFallback() {
  return (
    <div className="flex items-center justify-center p-12 text-sm text-fg-muted">
      Couldn&apos;t load contributions right now.
    </div>
  );
}

function HeatmapSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-surface-2" />
      <div className="flex flex-wrap gap-[3px]">
        {Array.from({ length: 53 * 7 }).map((_, i) => (
          <span
            key={i}
            className="size-[11px] rounded-[3px] bg-surface-2 animate-pulse"
            style={{ animationDelay: `${(i % 10) * 40}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ContributionHeatmapSection() {
  return (
    <section id="github" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="github"
          title="Every green cell is a small win."
          sub="A year of commits, pulled live from my public GitHub profile."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="rounded-xl border border-border bg-surface p-6 shadow-card md:p-8">
          <Suspense fallback={<HeatmapSkeleton />}>
            <HeatmapGrid />
          </Suspense>
        </div>
      </Reveal>
    </section>
  );
}

function levelClass(lvl: number) {
  return [
    "bg-[oklch(0.22_0.008_240)]",
    "bg-[oklch(0.34_0.07_152)]",
    "bg-[oklch(0.48_0.11_152)]",
    "bg-[oklch(0.62_0.15_152)]",
    "bg-[oklch(0.76_0.17_152)]",
  ][lvl];
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
