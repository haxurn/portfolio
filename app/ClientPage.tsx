"use client"

import AboutSection from "@/components/about-section"
import AdvancedParticles from "@/components/advanced-particles"
import CommunityBadges from "@/components/community-badges"
import ContactSection from "@/components/contact-section"
import CyberGrid from "@/components/cyber-grid"
import EnhancedTerminal from "@/components/enhanced-terminal"
import GitHubStats from "@/components/github-stats"
import HeroSection from "@/components/hero-section"
import JourneySection from "@/components/journey-section"
import MatrixBackground from "@/components/matrix-background"
import ProgrammingIcons from "@/components/programming-icons"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import SmoothReveal from "@/components/smooth-reveal"
import { useEffect } from "react"

export default function ClientPage() {
  // Simple, clean scroll control
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0)

    // Disable smooth scrolling by default
    document.documentElement.style.scrollBehavior = "auto"
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#030303] via-[#050505] to-[#020202] text-white overflow-hidden">
      <MatrixBackground />
      <CyberGrid />
      <AdvancedParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeroSection />

        <SmoothReveal delay={0.1} direction="fade">
          <div className="my-12">
            <EnhancedTerminal />
          </div>
        </SmoothReveal>

        <SmoothReveal delay={0.2} direction="scale">
          <div className="my-12 space-y-6">
            <GitHubStats username="haxurn" />
            <ProgrammingIcons />
          </div>
        </SmoothReveal>

        <SmoothReveal delay={0.1} direction="up">
          <AboutSection />
        </SmoothReveal>

        <SmoothReveal delay={0.2} direction="left">
          <JourneySection />
        </SmoothReveal>

        <SmoothReveal delay={0.1} direction="right">
          <SkillsSection />
        </SmoothReveal>

        <SmoothReveal delay={0.2} direction="up">
          <ProjectsSection />
        </SmoothReveal>

        <SmoothReveal delay={0.1} direction="scale">
          <CommunityBadges />
        </SmoothReveal>

        <SmoothReveal delay={0.2} direction="fade">
          <ContactSection />
        </SmoothReveal>
      </div>
    </main>
  )
}
