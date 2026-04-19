import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Manifesto } from "@/components/sections/manifesto";
import { Projects } from "@/components/sections/projects";
import { SignalsStrip } from "@/components/sections/signals-strip";
import { Craft } from "@/components/sections/craft";
import { Journey } from "@/components/sections/journey";
import { Credentials } from "@/components/sections/credentials";
import { Skills } from "@/components/sections/skills";
import { ContributionHeatmapSection } from "@/components/sections/contribution-heatmap";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Manifesto />
      <Projects />
      <SignalsStrip />
      <Craft />
      <Journey />
      <Credentials />
      <Skills />
      <ContributionHeatmapSection />
      <Contact />
    </>
  );
}
