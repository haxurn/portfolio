"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Briefcase, Code, Home, Mail, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [audioEnabled, setAudioEnabled] = useState(false)
  const initialRenderRef = useRef(true)

  // Sound effects
  const playClickSound = () => {
    if (!audioEnabled) return
    const audio = new Audio("/sounds/click.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play prevented:", e))
  }

  useEffect(() => {
    // Initialize audio context on user interaction
    const handleUserInteraction = () => {
      setAudioEnabled(true)
      document.removeEventListener("click", handleUserInteraction)
    }
    document.addEventListener("click", handleUserInteraction)

    // Track scroll position to update active section
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      // Find which section is currently in view
      let currentSection = "home" // default

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY

          if (scrollPosition >= elementTop - 200) {
            currentSection = sections[i]
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Mark initial render as complete
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      // Set initial active section
      setActiveSection("home")
    }

    // Delay scroll handling to prevent interference with page load
    const scrollTimer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true })

      // Initial check to set correct active section after delay
      handleScroll()
    }, 1000)

    return () => {
      clearTimeout(scrollTimer)
      document.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "home", href: "#home", icon: <Home className="h-5 w-5" /> },
    { name: "about", href: "#about", icon: <User className="h-5 w-5" /> },
    { name: "skills", href: "#skills", icon: <Code className="h-5 w-5" /> },
    { name: "projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
    { name: "contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionName: string) => {
    e.preventDefault()
    playClickSound()
    setActiveSection(sectionName)

    const section = document.getElementById(sectionName)
    if (section) {
      // Temporarily enable smooth scrolling for navigation
      document.documentElement.classList.add('smooth-scroll-enabled')

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })

      // Remove smooth scrolling after a delay
      setTimeout(() => {
        document.documentElement.classList.remove('smooth-scroll-enabled')
      }, 1000)
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="backdrop-blur-xl py-4 bg-gradient-to-t from-black/20 to-transparent">
        {/* Navigation bar that matches the screenshot */}
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#0a0a0a]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 backdrop-blur-xl rounded-full px-8 py-3 flex items-center gap-6 shadow-2xl shadow-green-500/20 border-2 border-green-500/30 hover:border-green-400/50 hover:shadow-green-500/30 transition-all duration-300">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.name)}
                  className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 ${activeSection === item.name
                    ? "text-green-400 bg-green-400/10 shadow-lg shadow-green-400/50"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                >
                  {item.icon}
                  {activeSection === item.name && (
                    <>
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/70"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-green-400/20 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    </>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
