"use client"

import AdvancedCard from "@/components/advanced-card"
import TerminalCommand from "@/components/terminal-command"
import { CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function TerminalWindow() {
  const [activeCommand, setActiveCommand] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show terminal after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const commands = [
    {
      command: "whoami",
      output: ["haxurn - Security Researcher & Developer"],
    },
    {
      command: "ls -la ./skills/",
      output: [
        "total 8",
        "drwxr-xr-x  2 haxurn users 4096 May 15 2025 .",
        "drwxr-xr-x 10 haxurn users 4096 May 15 2025 ..",
        "-rw-r--r--  1 haxurn users  982 May 10 2025 cybersecurity.md",
        "-rw-r--r--  1 haxurn users  754 May 12 2025 programming.md",
        "-rw-r--r--  1 haxurn users  340 May 14 2025 music-production.md",
      ],
    },
    {
      command: "cat ./skills/cybersecurity.md | head -n 5",
      output: [
        "# Cybersecurity Skills",
        "",
        "- Web Penetration Testing (85%)",
        "- Reverse Engineering (70%)",
        "- Cryptography (75%)",
      ],
    },
    {
      command: "nmap -sV --script=vuln target.example.com",
      output: [
        "Starting Nmap 7.94 ( https://nmap.org ) at 2025-05-15 23:52 UTC",
        "Scanning target.example.com (192.168.1.1) [1000 ports]",
        "Discovered open port 80/tcp on 192.168.1.1",
        "Discovered open port 443/tcp on 192.168.1.1",
        "Discovered open port 22/tcp on 192.168.1.1",
        "...",
        "Scan completed in 15.32s",
      ],
    },
    {
      command: "git clone https://github.com/haxurn/portfolio.git",
      output: [
        "Cloning into 'portfolio'...",
        "remote: Enumerating objects: 124, done.",
        "remote: Counting objects: 100% (124/124), done.",
        "remote: Compressing objects: 100% (80/80), done.",
        "remote: Total 124 (delta 40), reused 120 (delta 36), pack-reused 0",
        "Receiving objects: 100% (124/124), 2.5 MiB | 8.2 MiB/s, done.",
        "Resolving deltas: 100% (40/40), done.",
      ],
    },
    {
      command: "echo 'Thanks for visiting my portfolio!'",
      output: ["Thanks for visiting my portfolio!"],
    },
  ]

  const handleCommandComplete = () => {
    if (activeCommand < commands.length - 1) {
      setTimeout(() => {
        setActiveCommand(activeCommand + 1)
      }, 1000)
    }
  }

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <AdvancedCard variant="cyber" className="overflow-hidden">
        <CardHeader className="bg-[#1a1a1a] py-2 px-4 flex flex-row items-center space-y-0">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-center flex-1 text-gray-400">haxurn@terminal:~</div>
        </CardHeader>
        <CardContent className="p-4 bg-[#0a0a0a] font-mono text-sm">
          {commands.slice(0, activeCommand + 1).map((cmd, index) => (
            <div key={index} className="mb-4">
              <TerminalCommand
                command={cmd.command}
                output={cmd.output}
                delay={index === 0 ? 500 : 0}
                onComplete={index === activeCommand ? handleCommandComplete : undefined}
              />
            </div>
          ))}
          <div className="h-4 w-2 bg-green-400 inline-block animate-pulse"></div>
        </CardContent>
      </AdvancedCard>
    </motion.div>
  )
}
