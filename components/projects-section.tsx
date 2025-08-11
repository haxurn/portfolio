"use client"

import AdvancedCard from "@/components/advanced-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { Code, GitPullRequest, Shield } from "lucide-react"
import { useRef } from "react"

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const projects = [
    {
      icon: <GitPullRequest className="h-10 w-10 text-green-400" />,
      title: "Better Auth Integration",
      description: "Added integration documentation for Fastify to the Better Auth project.",
      tags: ["Documentation", "Open Source", "Fastify"],
      link: "https://github.com/better-auth/better-auth/pull/2006",
      type: "Contribution",
    },
    {
      icon: <Shield className="h-10 w-10 text-green-400" />,
      title: "Haxurn Core",
      description:
        "Central monorepo and foundational codebase for developing cybersecurity-focused tools and applications.",
      tags: ["TypeScript", "Hono", "Next.js", "Monorepo"],
      link: "https://github.com/haxurn/haxurn-core",
      type: "Project",
      status: "Ongoing",
    },
    {
      icon: <Code className="h-10 w-10 text-green-400" />,
      title: "VulnChamp",
      description:
        "Performance-driven platform that ranks and rewards team members based on discovered vulnerabilities.",
      tags: ["TypeScript", "Hono", "Next.js", "Cybersecurity"],
      link: "https://github.com/haxurn/vuln-champ",
      type: "Project",
      status: "Ongoing",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" className="py-20" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">
          My <span className="text-green-400">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of my open-source contributions and ongoing projects in the cybersecurity space.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={item}>
            <AdvancedCard variant="glow" className="h-full flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-4">{project.icon}</div>
                <CardTitle className="text-xl text-center">{project.title}</CardTitle>
                {project.type && (
                  <div className="flex justify-center mt-2">
                    <Badge variant="outline" className="bg-[#0f172a] text-green-400 border-green-400/30">
                      {project.type}
                    </Badge>
                    {project.status && (
                      <Badge variant="outline" className="bg-[#0f172a] text-green-400 border-green-400/30 ml-2">
                        {project.status}
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-300 text-center mb-4">{project.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-[#0f172a] hover:bg-[#1a2234]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-400 border-green-400 hover:bg-green-400/10"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  View on GitHub
                </Button>
              </CardFooter>
            </AdvancedCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center mt-8"
      >
        <Button
          variant="outline"
          className="border-green-400 text-green-400 hover:bg-green-400/10"
          onClick={() => window.open("https://github.com/haxurn", "_blank")}
        >
          View All Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Button>
      </motion.div>
    </section>
  )
}
