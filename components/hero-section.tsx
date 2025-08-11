"use client"

import TerminalText from "@/components/terminal-text"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

export default function HeroSection() {
  const [line1Complete, setLine1Complete] = useState(false)
  const [line2Complete, setLine2Complete] = useState(false)
  const [line3Complete, setLine3Complete] = useState(false)

  return (
    <section id="home" className="py-20 md:py-32 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border border-green-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-8 bg-gradient-to-b from-green-400/20 to-transparent"></div>
      </div>

      <div className="flex-1 space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-400 to-cyan-400 bg-clip-text text-transparent">
            Hey, I'm <span className="text-green-400 drop-shadow-lg">Sami</span>{" "}
            <span className="text-gray-400 text-2xl md:text-3xl">(aka Haxurn)</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Passionate about <span className="text-green-400 font-semibold">cybersecurity</span>,
            <span className="text-cyan-400 font-semibold"> coding</span>, and
            <span className="text-green-400 font-semibold"> music production</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-2 border-green-500/30 rounded-lg p-6 font-mono text-sm backdrop-blur-sm shadow-2xl shadow-green-500/20 hover:border-green-400/50 hover:shadow-green-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-1 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="space-y-1">
            <TerminalText prefix="haxurn@tech:~$ " text="whoami" onComplete={() => setLine1Complete(true)} />

            {line1Complete && (
              <TerminalText
                text="A tech enthusiast navigating the world of CTF challenges, penetration testing, and music production."
                typingSpeed={20}
                onComplete={() => setLine2Complete(true)}
              />
            )}

            {line2Complete && (
              <TerminalText
                prefix="haxurn@tech:~$ "
                text="echo 'Welcome to my portfolio!'"
                onComplete={() => setLine3Complete(true)}
              />
            )}

            {line3Complete && <div className="text-green-400">Welcome to my portfolio!</div>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4"
        >
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {
              document.documentElement.classList.add("smooth-scroll-enabled")
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              setTimeout(() => {
                document.documentElement.classList.remove("smooth-scroll-enabled")
              }, 1000)
            }}
          >
            Get in Touch
          </Button>
          <Button
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-500/10"
            onClick={() => {
              document.documentElement.classList.add("smooth-scroll-enabled")
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              setTimeout(() => {
                document.documentElement.classList.remove("smooth-scroll-enabled")
              }, 1000)
            }}
          >
            View Projects
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 max-w-md"
      >
        <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-2 border-green-500/30 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-green-500/20 hover:border-green-400/50 hover:shadow-green-500/30 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl font-bold">
              H
            </div>
            <div>
              <h3 className="font-bold">Haxurn</h3>
              <p className="text-sm text-gray-400">Cybersecurity Enthusiast</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-green-400">
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
                >
                  <path d="M17 6.1H3"></path>
                  <path d="M21 12.1H3"></path>
                  <path d="M15.1 18H3"></path>
                </svg>
              </div>
              <div>CTF Challenges & Penetration Testing</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-green-400">
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
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <div>Aspiring Music Producer</div>
            </div>


            <div className="flex items-center gap-2">
              <div className="text-green-400">
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
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <div>Web, RE, Crypto, Pwn</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
