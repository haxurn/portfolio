import { HeroIdentityCard } from "./hero-identity-card";
import { HeroGithubCard } from "./hero-github-card";
import { HeroNowCard } from "./hero-now-card";
import { HeroFocusCard } from "./hero-focus-card";
import { HeroStage } from "./hero-stage";

export function Hero() {
  return (
    <section id="home" className="py-12 md:py-20">
      <HeroStage>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <div data-hero="card-identity" className="lg:col-span-7 lg:row-span-2">
            <HeroIdentityCard />
          </div>
          <div data-hero="card-github" className="lg:col-span-5">
            <HeroGithubCard />
          </div>
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:col-span-5">
            <div data-hero="card-now">
              <HeroNowCard />
            </div>
            <div data-hero="card-focus">
              <HeroFocusCard />
            </div>
          </div>
        </div>
      </HeroStage>
    </section>
  );
}
