import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { SignalsStrip } from "@/components/sections/signals-strip";
import { Craft } from "@/components/sections/craft";
import { Journey } from "@/components/sections/journey";
import { Skills } from "@/components/sections/skills";
import { ContributionHeatmapSection } from "@/components/sections/contribution-heatmap";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <SignalsStrip />
      <Craft />
      <Journey />
      <Skills />
      <ContributionHeatmapSection />
      <Contact />
    </>
  );
}
