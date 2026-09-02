import { Reveal } from "@/components/reveal";
import { skills } from "@/content";
import { SectionHeader } from "./section-header";
import { SkillMatrix } from "./skill-matrix";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="skills"
          title="Fifteen entries, one open dossier."
          sub="Every line I actually use, ranked by how far I'd trust myself with the docs closed."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <SkillMatrix groups={skills} />
      </Reveal>
    </section>
  );
}
