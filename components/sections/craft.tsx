import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { CraftTerminal } from "./craft-terminal";
import { CraftEditor } from "./craft-editor";

export function Craft() {
  return (
    <section id="craft" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="craft"
          title="Two windows open at any given time."
          sub="The work happens in two places: a terminal, where I look for weak signals, and an editor, where those lessons become typed and tested code."
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Reveal delay={0.05}>
          <CraftTerminal />
        </Reveal>
        <Reveal delay={0.1}>
          <CraftEditor />
        </Reveal>
      </div>
    </section>
  );
}
