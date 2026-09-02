import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { ProjectCard } from "./project-card";
import { ProjectLedger } from "./project-ledger";
import { ProjectsStage } from "./projects-stage";
import {
  featuredProject,
  openSourceProjects,
  profile,
  projects,
  siteProjects,
} from "@/content";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="projects"
          title="Things I've shipped, and where they live."
          sub="Client sites carry a screenshot. Open-source rows say whether the repo is mine or a fork I sent work upstream to — the PR links are the receipt."
          meta={
            <Link
              href={`https://github.com/${profile.socials.github.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors"
            >
              All repos <ArrowUpRight className="size-4" />
            </Link>
          }
        />
      </Reveal>

      <ProjectsStage>
        {/* Featured plate + ledger index */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8" data-featured="">
            <Reveal delay={0.05}>
              <ProjectCard project={featuredProject} variant="hero" />
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <ProjectLedger projects={projects} />
            </Reveal>
          </div>
        </div>

        {/* Shipped sites — 2×2 bento */}
        <SubRail label="shipped · sites" count={siteProjects.length} />
        <Reveal
          stagger={0.08}
          selector="[data-site-card]"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {siteProjects.map((p, i) => (
            <div
              key={p.slug}
              data-site-card=""
              data-reveal-child=""
              className={i % 3 === 0 ? "md:row-span-1" : undefined}
            >
              <ProjectCard project={p} variant="site" />
            </div>
          ))}
        </Reveal>

        {/* Open source — compact strip */}
        <SubRail label="open source · repos + upstream" count={openSourceProjects.length} />
        <Reveal
          stagger={0.06}
          selector="[data-os-card]"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {openSourceProjects.map((p) => (
            <div key={p.slug} data-os-card="" data-reveal-child="">
              <ProjectCard project={p} variant="compact" />
            </div>
          ))}
        </Reveal>
      </ProjectsStage>
    </section>
  );
}

function SubRail({ label, count }: { label: string; count: number }) {
  return (
    <div className="mt-10 mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
      <span className="text-accent">▸</span>
      <span>{label}</span>
      <span
        aria-hidden
        className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_4px,transparent_4px_8px)] text-border/80"
      />
      <span className="tabular-nums">{count.toString().padStart(2, "0")}</span>
    </div>
  );
}
