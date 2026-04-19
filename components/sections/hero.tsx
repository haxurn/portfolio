import { HeroIdentityCard } from "./hero-identity-card";
import { HeroGithubCard } from "./hero-github-card";
import { HeroNowCard } from "./hero-now-card";
import { HeroFocusCard } from "./hero-focus-card";

export function Hero() {
  return (
    <section id="home" className="py-12 md:py-20">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        <div className="lg:col-span-7 lg:row-span-2">
          <HeroIdentityCard />
        </div>
        <div className="lg:col-span-5">
          <HeroGithubCard />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          <HeroNowCard />
          <HeroFocusCard />
        </div>
      </div>
    </section>
  );
}
