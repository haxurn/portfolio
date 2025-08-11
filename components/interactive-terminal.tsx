"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Command {
  input: string
  output: string[]
  isError?: boolean
  isHtml?: boolean
}

export default function InteractiveTerminal() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sound effects
  const playKeystrokeSound = () => {
    if (!audioEnabled) return
    const audio = new Audio("/sounds/keystroke.mp3")
    audio.volume = 0.1
    audio.play().catch((e) => console.log("Audio play prevented:", e))
  }

  const playEnterSound = () => {
    if (!audioEnabled) return
    const audio = new Audio("/sounds/enter.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play prevented:", e))
  }

  const playErrorSound = () => {
    if (!audioEnabled) return
    const audio = new Audio("/sounds/error.mp3")
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

    return () => {
      document.removeEventListener("click", handleUserInteraction)
    }
  }, [])

  // Initial welcome message
  useEffect(() => {
    const initialCommands: Command[] = [
      {
        input: "",
        output: ["Welcome to Haxurn's Interactive Terminal", "Type 'help' to see available commands", ""],
      },
    ]
    setCommands(initialCommands)

    // NEVER auto-focus to prevent scrolling
    // Only focus if user specifically clicks on the terminal
  }, [])

  // Auto-scroll to bottom when commands change (only within terminal, not page)
  useEffect(() => {
    if (terminalRef.current && commands.length > 1) {
      // Only scroll terminal content, not the page
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  // Handle command execution
  const executeCommand = (cmd: string) => {
    playEnterSound()

    const commandLower = cmd.trim().toLowerCase()
    let output: string[] = []
    let isError = false
    let isHtml = false

    // Add to command history
    if (cmd.trim() !== "") {
      setCommandHistory((prev) => [cmd, ...prev])
      setHistoryIndex(-1)
    }

    // Process commands
    switch (commandLower) {
      case "":
        output = [""]
        break

      case "help":
        output = [
          "Available commands:",
          "",
          "about       - Learn about me",
          "skills      - View my technical skills",
          "projects    - See my projects",
          "contact     - How to reach me",
          "social      - My social media links",
          "clear       - Clear the terminal",
          "matrix      - Activate the matrix",
          "whoami      - Who am I?",
          "date        - Display current date and time",
          "echo [text] - Echo text back to terminal",
          "help        - Show this help message",
          "",
        ]
        break

      case "about":
        output = [
          "Hi, I'm Sami (aka Haxurn)!",
          "",
          "I'm assionate about cybersecurity,",
          "coding, and music production. I enjoy participating in",
          "CTF competitions, building web applications, and exploring",
          "new technologies.",
          "",
          "My main interests include:",
          "- Web Security & Penetration Testing",
          "- Full-Stack Development",
          "- Reverse Engineering",
          "- Music Production",
          "",
        ]
        break

      case "skills":
        output = [
          "Technical Skills:",
          "",
          "Programming Languages:",
          "- TypeScript/JavaScript (90%)",
          "- Python (85%)",
          "- C/C++ (65%)",
          "",
          "Cybersecurity:",
          "- Web Security (85%)",
          "- Reverse Engineering (70%)",
          "- Cryptography (75%)",
          "- Binary Exploitation (60%)",
          "",
          "Tools & Technologies:",
          "- Next.js, React, Node.js",
          "- VSCode, Bash, Git",
          "- FL Studio (Music Production)",
          "",
        ]
        break

      case "projects":
        output = [
          "My Projects:",
          "",
          "1. Haxurn Core",
          "   Central monorepo for cybersecurity tools",
          "   https://github.com/haxurn/haxurn-core",
          "",
          "2. VulnChamp",
          "   Platform for ranking team members based on discovered vulnerabilities",
          "   https://github.com/haxurn/vuln-champ",
          "",
          "3. Better Auth Integration",
          "   Added integration documentation for Fastify",
          "   https://github.com/better-auth/better-auth/pull/2006",
          "",
        ]
        break

      case "contact":
        output = [
          "Contact Information:",
          "",
          "Email: samitesfaye726@gmail.com",
          "Discord: @haxurn",
          "",
          "Feel free to reach out for collaboration or just to chat!",
          "",
        ]
        break

      case "social":
        output = [
          "Social Media Links:",
          "",
          "GitHub: https://github.com/haxurn",
          "Twitter: https://twitter.com/haxurn",
          "Instagram: https://instagram.com/haxurn",
          "Telegram: https://t.me/haxurn",
          "",
        ]
        break

      case "clear":
        setCommands([])
        return

      case "matrix":
        output = ["Activating the Matrix..."]
        isHtml = true

        // Trigger matrix animation elsewhere on the page
        const event = new CustomEvent("activateMatrix")
        window.dispatchEvent(event)
        break

      case "whoami":
        output = ["haxurn - Security Researcher & Developer"]
        break

      case "date":
        output = [new Date().toString()]
        break

      default:
        // Handle echo command
        if (commandLower.startsWith("echo ")) {
          const text = cmd.substring(5)
          output = [text]
        } else {
          output = [`Command not found: ${cmd}. Type 'help' for available commands.`]
          isError = true
          playErrorSound()
        }
    }

    // Add command to history
    setCommands((prev) => [...prev, { input: cmd, output, isError, isHtml }])

    // Clear input
    setCurrentInput("")
  }

  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput("")
      }
    } else {
      playKeystrokeSound()
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  }

  // Focus input when clicking anywhere in the terminal (prevent scroll)
  const handleTerminalClick = () => {
    if (inputRef.current) {
      // Prevent focus from causing page scroll
      const scrollY = window.scrollY
      inputRef.current.focus({ preventScroll: true })
      window.scrollTo(0, scrollY)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-[#0a0a0a]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border-[#1a1a1a] overflow-hidden backdrop-blur-lg shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-[#1a1a1a]/80 via-[#1d1d1d]/80 to-[#1a1a1a]/80 py-3 px-4 flex flex-row items-center space-y-0 backdrop-blur-sm border-b border-green-500/20">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
        </div>
        <div className="text-xs text-center flex-1 text-green-400 font-mono">haxurn@terminal:~</div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm bg-gradient-to-b from-[#0a0a0a]/90 to-[#050505]/90 cursor-text backdrop-blur-sm"
          onClick={handleTerminalClick}
        >
          <AnimatePresence>
            {commands.map((command, cmdIndex) => (
              <motion.div
                key={cmdIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {command.input !== "" && (
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">$</span>
                    <span className="text-white">{command.input}</span>
                  </div>
                )}

                {command.output.map((line, lineIndex) => (
                  <motion.div
                    key={`${cmdIndex}-${lineIndex}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: lineIndex * 0.03 }}
                    className={`mt-1 ${command.isError ? "text-red-400" : "text-gray-300"}`}
                  >
                    {line}
                  </motion.div>
                ))}

                {command.isHtml && cmdIndex === commands.length - 1 && command.input === "matrix" && (
                  <div className="mt-4 text-green-400 font-mono">
                    <div className="animate-pulse">Wake up, Neo...</div>
                    <div className="h-20 overflow-hidden">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="text-xs opacity-70"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            animation: "matrixRain 2s linear infinite",
                          }}
                        >
                          {Array.from({ length: 40 }).map((_, j) => (
                            <span key={j} className="inline-block">
                              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex items-start mt-2">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-grow text-white w-full"

            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
