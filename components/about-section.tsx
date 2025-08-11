"use client";

import AdvancedCard from "@/components/advanced-card";
import AnimatedSkillBar from "@/components/animated-skill-bar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Braces,
  Code,
  Cpu,
  Music,
  Server,
  Shield,
  Terminal,
  Zap
} from "lucide-react";
import { useRef, useState } from "react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Technical Skills" },
    { id: "journey", label: "Journey" },
  ];

  const overviewCards = [
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: " Enthusiast",
      content:
        "Passionate about identifying vulnerabilities, participating in CTF competitions, and developing tools to enhance security posture.",
    },
    {
      icon: <Code className="h-8 w-8 text-green-400" />,
      title: "Full-Stack Developer",
      content:
        "Experienced in building modern web applications with TypeScript, React, Next.js, and Hono. I focus on creating secure, performant, and scalable solutions.",
    },
  ];

  const technicalSkills = [
    {
      category: "Languages & Frameworks",
      skills: [
        {
          name: "TypeScript/JavaScript",
          icon: <Braces className="h-4 w-4" />,
          value: 92,
        },
        {
          name: "React & Next.js",
          icon: <Zap className="h-4 w-4" />,
          value: 88,
        },
        { name: "Hono", icon: <Server className="h-4 w-4" />, value: 75 },
        { name: "Python", icon: <Code className="h-4 w-4" />, value: 85 },
      ],
    },
    {
      category: "Cybersecurity",
      skills: [
        {
          name: "Web Penetration Testing",
          icon: <Shield className="h-4 w-4" />,
          value: 90,
        },
        {
          name: "Vulnerability Assessment",
          icon: <Shield className="h-4 w-4" />,
          value: 82,
        },
        {
          name: "CTF Challenges",
          icon: <Terminal className="h-4 w-4" />,
          value: 78,
        },
        {
          name: "Security Tool Development",
          icon: <Cpu className="h-4 w-4" />,
          value: 70,
        },
      ],
    },
    {
      category: "Other Skills",
      skills: [
        {
          name: "Open Source Contribution",
          icon: <Code className="h-4 w-4" />,
          value: 65,
        },
        {
          name: "Technical Documentation",
          icon: <Terminal className="h-4 w-4" />,
          value: 80,
        },
        {
          name: "Music Production",
          icon: <Music className="h-4 w-4" />,
          value: 40,
        },
      ],
    },
  ];

  const journeyItems = [
    {
      title: "Started Coding",
      date: "2 years ago",
      description:
        "Began my journey into the world of programming and cybersecurity.",
    },
    {
      title: "Joined INSA",
      date: "1 year ago",
      description:
        "Got employed as a penetration tester at the Information Network Security Administration (INSA).",
    },
    {
      title: "Music Production",
      date: "2 months ago",
      description: "Started exploring music production as a creative outlet.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-20" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-green-400">About</span> Me
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          I'm a cybersecurity enthusiast and developer passionate about building
          secure applications and finding vulnerabilities.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-[#0f172a]">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-green-400/10 data-[state=active]:text-green-400"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="mt-8">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {overviewCards.map((card, index) => (
                  <motion.div key={index} variants={item}>
                    <AdvancedCard variant="glow" className="h-full">
                      <CardHeader>
                        <div className="mb-2">{card.icon}</div>
                        <CardTitle>{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{card.content}</p>
                      </CardContent>
                    </AdvancedCard>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <Button
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400/10"
                  onClick={() => setActiveTab("skills")}
                >
                  View My Technical Skills
                </Button>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <AdvancedCard variant="default">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Technical Proficiencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {technicalSkills.map((category, categoryIndex) => (
                        <motion.div
                          key={categoryIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: categoryIndex * 0.2 }}
                        >
                          <h3 className="text-lg font-medium text-green-400 mb-3">
                            {category.category}
                          </h3>
                          <div className="space-y-6">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + skillIndex * 0.1 }}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="text-green-400 bg-[#0f172a] p-1.5 rounded-md">
                                    {skill.icon}
                                  </div>
                                  <div className="flex justify-between w-full">
                                    <span>{skill.name}</span>
                                    <span className="text-green-400">
                                      {skill.value}%
                                    </span>
                                  </div>
                                </div>
                                <AnimatedSkillBar
                                  value={skill.value}
                                  isInView={isInView && activeTab === "skills"}
                                  delay={0.3 + skillIndex * 0.1}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </AdvancedCard>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center"
                >
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400/10"
                    onClick={() => setActiveTab("journey")}
                  >
                    Explore My Journey
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="journey" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <AdvancedCard variant="default">
                  <CardHeader>
                    <CardTitle className="text-xl">My Journey So Far</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-green-500/30 pl-6 ml-3 space-y-10">
                      {journeyItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative"
                        >
                          <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full bg-green-400"></div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <span className="text-green-400 font-mono">
                              {item.date}
                            </span>
                            <h3 className="text-xl font-semibold text-white">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-300 mt-2">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </AdvancedCard>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center"
                >
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400/10"
                    onClick={() => setActiveTab("overview")}
                  >
                    Back to Overview
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </section>
  );
}
