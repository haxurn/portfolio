"use client";

import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content";

export function HeroNowCard() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: profile.timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-card">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-fg-subtle">Local time</span>
        <Clock className="size-3.5 text-fg-subtle" />
      </div>
      <div>
        <div className="font-mono text-3xl tabular-nums text-fg">
          {time || "--:--"}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-fg-muted">
          <MapPin className="size-3" />
          {profile.location}
        </div>
      </div>
    </div>
  );
}
