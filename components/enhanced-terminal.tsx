"use client"

import AdvancedCard from "@/components/advanced-card"
import { CardContent, CardHeader } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Command {
    input: string
    output: string[]
    isError?: boolean
    timestamp?: string
}

export default function EnhancedTerminal() {
    const [commands, setCommands] = useState<Command[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [showCursor, setShowCursor] = useState(true)
    const terminalRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Cursor blink effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(interval)
    }, [])

    // Initialize with welcome message
    useEffect(() => {
        const welcomeCommand: Command = {
            input: "",
            output: [
                "┌──(haxurn@portfolio)-[~]",
                "└─$ Welcome to my interactive terminal",
                "",
                "Type 'help' to see available commands",
                "Type 'clear' to clear the screen",
                ""
            ],
            timestamp: new Date().toLocaleTimeString()
        }
        setCommands([welcomeCommand])
    }, [])

    const executeCommand = async (cmd: string) => {
        if (!cmd.trim()) return

        setIsTyping(true)
        const timestamp = new Date().toLocaleTimeString()
        let output: string[] = []
        let isError = false

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 100))

        switch (cmd.toLowerCase().trim()) {
            case "help":
                output = [
                    "Available commands:",
                    "",
                    "  about       - Learn about me",
                    "  skills      - View my technical skills",
                    "  projects    - See my projects",
                    "  contact     - How to reach me",
                    "  social      - My social media links",
                    "  experience  - My work experience",
                    "  education   - My educational background",
                    "  clear       - Clear the terminal",
                    "  matrix      - Enter the Matrix",
                    "  whoami      - Current user info",
                    "  date        - Current date and time",
                    "  neofetch    - System information",
                    "",
                    "Pro tip: Use Tab for autocompletion (coming soon!)",
                    ""
                ]
                break

            case "about":
                output = [
                    "╭─ About Haxurn ─────────────────────────────╮",
                    "│                                            │",
                    "│  👨‍💻 Security Researcher & Developer        │",
                    "│  🎵 Aspiring Music Producer                │",
                    "│  🚀 Passionate about Cybersecurity         │",
                    "│                                            │",
                    "│  I'm passionate about exploring the        │",
                    "│  depths of cybersecurity, building         │",
                    "│  secure applications, and creating         │",
                    "│  music in my spare time.                   │",
                    "│                                            │",
                    "│  Currently working on various CTF          │",
                    "│  challenges and building tools for         │",
                    "│  the security community.                   │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "skills":
                output = [
                    "╭─ Technical Skills ─────────────────────────╮",
                    "│                                            │",
                    "│ 🔐 Security Skills:                        │",
                    "│   ├─ Web Application Security     [████▓░] │",
                    "│   ├─ Penetration Testing          [███▓▓░] │",
                    "│   ├─ Reverse Engineering          [███▓░░] │",
                    "│   ├─ Cryptography                 [███▓▓░] │",
                    "│   └─ Binary Exploitation          [██▓░░░] │",
                    "│                                            │",
                    "│ 💻 Programming Languages:                  │",
                    "│   ├─ TypeScript/JavaScript        [████▓░] │",
                    "│   ├─ Python                       [████▓░] │",
                    "│   ├─ C/C++                        [███▓░░] │",
                    "│   ├─ Go                           [██▓░░░] │",
                    "│   └─ Rust                         [██░░░░] │",
                    "│                                            │",
                    "│ 🛠️ Tools & Technologies:                   │",
                    "│   ├─ Linux/Unix Systems           [████▓░] │",
                    "│   ├─ Docker & Kubernetes          [███▓░░] │",
                    "│   ├─ Git & Version Control        [████▓░] │",
                    "│   └─ FL Studio (Music)            [███▓▓░] │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "projects":
                output = [
                    "╭─ Featured Projects ────────────────────────╮",
                    "│                                            │",
                    "│ 🛡️ Haxurn Core                            │",
                    "│   Central monorepo for cybersecurity      │",
                    "│   tools and research                       │",
                    "│   → github.com/haxurn/haxurn-core         │",
                    "│                                            │",
                    "│ 🏆 VulnChamp                              │",
                    "│   Platform for ranking team members       │",
                    "│   based on discovered vulnerabilities     │",
                    "│   → github.com/haxurn/vuln-champ          │",
                    "│                                            │",
                    "│ 🔗 Better Auth Integration                │",
                    "│   Added Fastify integration docs          │",
                    "│   → github.com/better-auth/better-auth    │",
                    "│                                            │",
                    "│ 🎵 Music Production Portfolio             │",
                    "│   Collection of original tracks           │",
                    "│   → soundcloud.com/haxurn                  │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "contact":
                output = [
                    "╭─ Contact Information ──────────────────────╮",
                    "│                                            │",
                    "│ 📧 Email: samitesfaye726@gmail.com         │",
                    "│ 💬 Discord: @haxurn                        │",
                    "│ 🐦 Twitter: @haxurn                        │",
                    "│ 📱 Telegram: @haxurn                       │",
                    "│                                            │",
                    "│ 🌍 Based in: Ethiopia                      │",
                    "│ ⏰ Timezone: EAT (UTC+3)                   │",
                    "│                                            │",
                    "│ 💼 Open for:                               │",
                    "│   ├─ Security Research Collaboration      │",
                    "│   ├─ CTF Team Participation               │",
                    "│   ├─ Open Source Contributions            │",
                    "│   └─ Music Production Projects            │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "social":
                output = [
                    "╭─ Social Media & Platforms ─────────────────╮",
                    "│                                            │",
                    "│ 🐙 GitHub: github.com/haxurn               │",
                    "│ 🐦 Twitter: twitter.com/haxurn             │",
                    "│ 📷 Instagram: instagram.com/haxurn         │",
                    "│ 📱 Telegram: t.me/haxurn                   │",
                    "│ 🎵 SoundCloud: soundcloud.com/haxurn       │",
                    "│ 💼 LinkedIn: Coming Soon...                │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "experience":
                output = [
                    "╭─ Work Experience ──────────────────────────╮",
                    "│                                            │",
                    "│ 🏢 Information Network Security Admin      │",
                    "│    Penetration Tester                     │",
                    "│    📅 Current Position                     │",
                    "│    📍 INSA, Ethiopia                       │",
                    "│                                            │",
                    "│    🔍 Responsibilities:                    │",
                    "│    ├─ Web Application Security Testing    │",
                    "│    ├─ Network Penetration Testing         │",
                    "│    ├─ Vulnerability Assessment            │",
                    "│    └─ Security Report Writing             │",
                    "│                                            │",
                    "│ 🎵 Freelance Music Producer               │",
                    "│    📅 2+ years experience                  │",
                    "│    🎧 Electronic & Hip-Hop genres         │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "education":
                output = [
                    "╭─ Education & Learning ─────────────────────╮",
                    "│                                            │",
                    "│ 🎓 Self-Taught Developer                   │",
                    "│    📚 Continuous Learning Philosophy      │",
                    "│    🔄 2+ years of intensive study         │",
                    "│                                            │",
                    "│ 📖 Key Learning Resources:                 │",
                    "│    ├─ CTF Platforms (HackTheBox, etc.)   │",
                    "│    ├─ OWASP Documentation                 │",
                    "│    ├─ Security Research Papers            │",
                    "│    ├─ Open Source Projects                │",
                    "│    └─ Music Production Tutorials          │",
                    "│                                            │",
                    "│ 🏆 Certifications & Achievements:         │",
                    "│    ├─ Multiple CTF Competition Wins       │",
                    "│    ├─ Open Source Contributions           │",
                    "│    └─ Security Research Publications      │",
                    "│                                            │",
                    "╰────────────────────────────────────────────╯",
                    ""
                ]
                break

            case "clear":
                setCommands([])
                setIsTyping(false)
                return

            case "matrix":
                output = [
                    "🔴 Entering the Matrix...",
                    "",
                    "⠀⠀⠀⠀⠀⠀⠀⣠⡤⠒⠒⠒⠒⠒⠒⠒⠤⣄⠀⠀⠀⠀⠀⠀⠀",
                    "⠀⠀⠀⠀⠀⢀⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠀⠀",
                    "⠀⠀⠀⠀⢀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠀⠀⠀⠀",
                    "⠀⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀⠀",
                    "⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⠀⠀",
                    "",
                    "💊 Red pill taken. Welcome to reality, Neo.",
                    ""
                ]
                break

            case "whoami":
                output = [
                    "┌─[haxurn@portfolio]",
                    "├─[UID: 1337]",
                    "├─[GID: security]",
                    "├─[Groups: hackers, musicians, developers]",
                    "├─[Shell: /bin/zsh]",
                    "├─[Home: /home/haxurn]",
                    "└─[Status: Online and caffeinated ☕]",
                    ""
                ]
                break

            case "date":
                output = [
                    `📅 ${new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}`,
                    `⏰ ${new Date().toLocaleTimeString('en-US')}`,
                    `🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                    ""
                ]
                break

            case "neofetch":
                output = [
                    "                    ██████████████████                    haxurn@portfolio",
                    "                ████░░░░░░░░░░░░░░░░████                ──────────────────",
                    "              ██░░░░░░░░░░░░░░░░░░░░░░██              OS: Web Portfolio v2.0",
                    "            ██░░░░░░░░░░░░░░░░░░░░░░░░░░██            Host: GitHub Pages",
                    "          ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██          Kernel: React 18.2.0",
                    "        ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██        Uptime: Since deployment",
                    "        ██░░░░░░░░████████████░░░░░░░░░░░░░░██        Packages: pnpm packages",
                    "      ██░░░░░░██                ██░░░░░░░░░░██      Shell: Enhanced Terminal",
                    "      ██░░░░██                    ██░░░░░░░░██      Resolution: Responsive",
                    "      ██░░██                        ██░░░░░░██      DE: Next.js + TypeScript",
                    "      ████                            ████░░██      WM: Framer Motion",
                    "      ██                                ██░░██      Theme: Hacker Matrix",
                    "      ██                                  ████      Icons: Lucide React",
                    "      ██                                  ██        Terminal: Enhanced v1.0",
                    "        ██                              ██          CPU: Caffeine Powered",
                    "        ██                            ██            Memory: ∞ GB of creativity",
                    "          ██                        ██              ",
                    "            ██                    ██                ",
                    "              ████            ████                  ",
                    "                  ████████████                      ",
                    ""
                ]
                break

            default:
                output = [
                    `Command not found: ${cmd}`,
                    "",
                    "Did you mean:",
                    `  • help     - Show all commands`,
                    `  • about    - Learn about me`,
                    `  • skills   - View my skills`,
                    "",
                    "Type 'help' for a full list of commands.",
                    ""
                ]
                isError = true
                break
        }

        const newCommand: Command = {
            input: cmd,
            output,
            isError,
            timestamp
        }

        setCommands(prev => [...prev, newCommand])
        setCurrentInput("")
        setIsTyping(false)

        // Scroll to bottom of terminal only (not page)
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }
        }, 100)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isTyping) {
            executeCommand(currentInput)
        }
    }

    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }

    return (
        <AdvancedCard variant="cyber" className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-800/90 via-gray-700/90 to-gray-800/90 py-3 px-4 flex flex-row items-center space-y-0 backdrop-blur-sm border-b-2 border-green-500/40">
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"
                        animate={{ boxShadow: ["0 0 10px rgba(34,197,94,0.5)", "0 0 20px rgba(34,197,94,0.8)", "0 0 10px rgba(34,197,94,0.5)"] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </div>
                <div className="text-sm text-center flex-1 text-green-400 font-mono tracking-wider">
                    haxurn@portfolio:~
                </div>
                <div className="text-xs text-green-400/70 font-mono">
                    {new Date().toLocaleTimeString()}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div
                    ref={terminalRef}
                    className="h-96 overflow-y-auto p-4 font-mono text-sm bg-gradient-to-b from-black/95 to-gray-900/95 cursor-text backdrop-blur-sm"
                    onClick={handleTerminalClick}
                >
                    <AnimatePresence>
                        {commands.map((command, cmdIndex) => (
                            <motion.div
                                key={cmdIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: cmdIndex * 0.05 }}
                                className="mb-2"
                            >
                                {command.input && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-green-400">┌──(haxurn@portfolio)-[~]</span>
                                    </div>
                                )}
                                {command.input && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-green-400">└─$</span>
                                        <span className="text-white">{command.input}</span>
                                        {command.timestamp && (
                                            <span className="text-gray-500 text-xs ml-auto">
                                                [{command.timestamp}]
                                            </span>
                                        )}
                                    </div>
                                )}

                                {command.output.map((line, lineIndex) => (
                                    <motion.div
                                        key={`${cmdIndex}-${lineIndex}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.1, delay: lineIndex * 0.02 }}
                                        className={`leading-relaxed ${command.isError
                                            ? "text-red-400"
                                            : line.includes('╭') || line.includes('├') || line.includes('└') || line.includes('│')
                                                ? "text-cyan-400"
                                                : "text-gray-300"
                                            }`}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-green-400">┌──(haxurn@portfolio)-[~]</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">└─$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none flex-grow text-white"
                            disabled={isTyping}
                            placeholder={isTyping ? "Processing..." : "Type a command..."}
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <motion.span
                            animate={{ opacity: showCursor ? 1 : 0 }}
                            className="text-green-400 text-lg"
                        >
                            ▋
                        </motion.span>
                    </div>
                </div>
            </CardContent>
        </AdvancedCard>
    )
}