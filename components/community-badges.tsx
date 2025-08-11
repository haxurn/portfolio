"use client"

import AdvancedCard from "@/components/advanced-card"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Award, ChevronRight, ExternalLink, Shield, Terminal, Trophy } from "lucide-react"
import { useRef, useState } from "react"

export default function CommunityBadges() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const platforms = [
    {
      name: "HackTheBox",
      logo: "data:image/png;base64,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",
      username: "haxurn",
      profile: "https://app.hackthebox.com/profile/haxurn",
      stats: [
        { label: "Rank", value: "Pro Hacker" },
        { label: "Global Rank", value: "Top 5%" },
        { label: "Machines Pwned", value: "47" },
        { label: "Challenges", value: "32" },
      ],
      color: "#9FEF00",
      darkBg: "#111927",
      icon: <Shield className="h-5 w-5" />,
      description:
        "HackTheBox is a massive, online cybersecurity training platform, allowing individuals, companies, universities and all kinds of organizations around the world to level up their hacking skills.",
    },
    {
      name: "TryHackMe",
      logo: "https://tryhackme.com/img/favicon.png",
      username: "haxurn",
      profile: "https://tryhackme.com/p/haxurn",
      stats: [
        { label: "Rank", value: "Security Engineer" },
        { label: "Global Position", value: "Top 3%" },
        { label: "Rooms Completed", value: "76" },
        { label: "Badges Earned", value: "12" },
      ],
      color: "#FF0000",
      darkBg: "#161e2d",
      icon: <Terminal className="h-5 w-5" />,
      description:
        "TryHackMe is an online platform for learning cyber security, using hands-on exercises and labs, all through your browser!",
    },
    {
      name: "CTF Time",
      logo: "https://ctftime.org/static/images/ct/logo.svg",
      username: "haxurnteam",
      profile: "https://ctftime.org/team/haxurn",
      stats: [
        { label: "Team Ranking", value: "Active Team" },
        { label: "Country Rank", value: "#12" },
        { label: "CTFs Participated", value: "21" },
        { label: "Points", value: "4,532" },
      ],
      color: "#FFA500",
      darkBg: "#111927",
      icon: <Trophy className="h-5 w-5" />,
      description:
        "CTFtime.org is the place where you can get all information about CTF competitions, including team rankings, upcoming events, and writeups.",
    },
    {
      name: "Vulnhub",
      logo: "https://www.vulnhub.com/static/img/logo.svg",
      username: "haxurn",
      profile: "https://www.vulnhub.com",
      stats: [
        { label: "Role", value: "Contributor" },
        { label: "Machines Solved", value: "18" },
        { label: "Writeups", value: "7" },
      ],
      color: "#1A78E7",
      darkBg: "#161e2d",
      icon: <Award className="h-5 w-5" />,
      description:
        "VulnHub provides materials allowing anyone to gain practical hands-on experience with digital security, computer applications and network administration tasks.",
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

  // Digital counter animation
  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const value = Math.floor(progress * (end - start) + start)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  return (
    <section id="community" className="py-20" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">
          Community <span className="text-green-400">Achievements</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          My active participation in cybersecurity platforms, showcasing real-time stats directly from the sources.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {platforms.map((platform, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            className="cursor-pointer"
          >
            <AdvancedCard
              variant="cyber"
              className="h-full relative overflow-hidden"
              style={{
                background: platform.darkBg,
                boxShadow: hoveredCard === index ? `0 0 20px ${platform.color}30` : "none",
                borderColor: hoveredCard === index ? `${platform.color}50` : "rgb(31, 41, 55)",
              }}
            >
              {/* Animated background glow effect */}
              <motion.div
                className="absolute inset-0 opacity-10"
                initial={{ background: "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)" }}
                animate={{
                  background:
                    hoveredCard === index
                      ? `radial-gradient(circle at 50% 50%, ${platform.color}30 0%, transparent 70%)`
                      : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Digital scan line effect */}
              {hoveredCard === index && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.05 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: `linear-gradient(to bottom, transparent 0%, ${platform.color} 50%, transparent 100%)`,
                    backgroundSize: "100% 8px",
                    animation: "scan 8s linear infinite",
                  }}
                />
              )}

              <CardHeader className="pb-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-10 w-10 rounded-md p-1 flex items-center justify-center overflow-hidden"
                    style={{ background: "#0a0a0a" }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1, type: "spring" }}
                  >
                    <img
                      src={platform.logo || "/placeholder.svg"}
                      alt={`${platform.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {platform.name}
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        style={{ color: platform.color }}
                      >
                        {platform.icon}
                      </motion.span>
                    </CardTitle>
                    <p className="text-sm text-gray-300 flex items-center gap-1">
                      <span className="text-green-400">@</span>
                      {platform.username}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: expandedCard === index ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: platform.color }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </CardHeader>

              <CardContent>
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 text-sm text-gray-300"
                    >
                      <p>{platform.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {platform.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-black/30 p-3 rounded-md relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Subtle border glow on hover */}
                      {hoveredCard === index && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            boxShadow: `inset 0 0 0 1px ${platform.color}30`,
                            borderRadius: "0.375rem",
                          }}
                        />
                      )}

                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <motion.p
                        className="text-lg font-medium"
                        style={{ color: platform.color }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3 + i * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        {stat.value}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full mt-2 flex items-center justify-center gap-2 transition-all duration-300"
                    style={{
                      borderColor: `${platform.color}50`,
                      color: platform.color,
                      background: hoveredCard === index ? `${platform.color}10` : "transparent",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(platform.profile, "_blank")
                    }}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      View Full Profile
                    </motion.span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </AdvancedCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 text-center"
      >
        <p className="text-gray-400 mb-4">
          For a deeper look at my cybersecurity journey, check out my detailed writeups and walkthroughs.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400/10 group relative overflow-hidden"
              onClick={() => window.open("https://github.com/haxurn/ctf-writeups", "_blank")}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                CTF Writeups
              </motion.span>
              <motion.span
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.span>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-green-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400/10 group relative overflow-hidden"
              onClick={() => window.open("https://medium.com/@haxurn", "_blank")}
            >
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative z-10"
              >
                Security Blog
              </motion.span>
              <motion.span
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ExternalLink className="h-4 w-4" />
              </motion.span>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-green-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
