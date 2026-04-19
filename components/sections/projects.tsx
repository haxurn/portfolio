import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { ProjectCard } from "./project-card";
import { projects, profile } from "@/content";

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <section id="projects" className="py-24 md:py-32">
      <Reveal>
        <SectionHeader
          number="02"
          label="Projects"
          title="Things I'm building in public."
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <ProjectCard project={featured} variant="hero" />
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:col-span-4">
          {rest.slice(0, 2).map((p, i) => (
            <Reveal key={p.slug} delay={0.08 + i * 0.04}>
              <ProjectCard project={p} variant="compact" />
            </Reveal>
          ))}
        </div>
        <div className="lg:col-span-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {rest.slice(2).map((p, i) => (
            <Reveal key={p.slug} delay={0.05 + i * 0.04}>
              <ProjectCard project={p} variant="compact" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
