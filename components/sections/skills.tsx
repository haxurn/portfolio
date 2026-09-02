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
          title="What I can do, and how well."
          sub="Select any entry to read what it means in practice and where I have used it. Each one is rated on a four-step scale, from learning it now to where I do my best work."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <SkillMatrix groups={skills} />
      </Reveal>
    </section>
  );
}
