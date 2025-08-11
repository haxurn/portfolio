"use client"

import AdvancedCard from "@/components/advanced-card"
import AnimatedSkillBar from "@/components/animated-skill-bar"
import { Badge } from "@/components/ui/badge"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { Code, Music, Shield } from "lucide-react"
import { useRef } from "react"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const cybersecuritySkills = [
    { name: "Web Security", value: 85 },
    { name: "Reverse Engineering", value: 70 },
    { name: "Cryptography", value: 75 },
    { name: "Binary Exploitation", value: 60 },
  ]

  const programmingSkills = [
    { name: "Python", value: 90 },
    { name: "JavaScript", value: 75 },
    { name: "C/C++", value: 65 },
    { name: "HTML/CSS", value: 80 },
  ]

  const musicSkills = [
    { name: "DAW Software", value: 40 },
    { name: "Beat Making", value: 35 },
    { name: "Sound Design", value: 25 },
  ]

  const skillCategories = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cybersecurity",
      skills: cybersecuritySkills,
      badges: [
        "Web Penetration Testing",
        "Reverse Engineering",
        "Cryptography",
        "CTF Challenges",
        "Binary Exploitation",
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Programming",
      skills: programmingSkills,
      badges: ["Python", "JavaScript", "C/C++", "HTML/CSS", "Bash"],
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Music Production",
      skills: musicSkills,
      badges: ["DAW Software", "Beat Making", "Sound Design", "Mixing"],
    },
  ]

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">
          My <span className="text-green-400">Skills</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <AdvancedCard variant="cyber" className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-green-400">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {category.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="bg-[#0f172a] hover:bg-[#1a2234]">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium text-green-400">{skill.value}%</span>
                    </div>
                    <AnimatedSkillBar
                      value={skill.value}
                      isInView={isInView}
                      delay={0.3 + skillIndex * 0.15 + categoryIndex * 0.1}
                    />
                  </div>
                ))}
                {category.title === "Music Production" && (
                  <p className="text-sm italic text-gray-400 mt-2">
                    Still learning, but passionate about improving! 🎵
                  </p>
                )}
              </CardContent>
            </AdvancedCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
