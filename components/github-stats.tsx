"use client"

import AdvancedCard from "@/components/advanced-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, useAnimation, useInView } from "framer-motion"
import { BookOpen, Code, GitBranch, GitCommit, GitPullRequest, Star, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface GitHubStats {
  followers: number
  following: number
  public_repos: number
  stars: number
  username: string
  contributions?: number
  languages?: { name: string; percentage: number; color: string }[]
  commits?: number
  pullRequests?: number
  issues?: number
}

export default function GitHubStats({ username = "haxurn" }: { username?: string }) {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "contributions" | "languages">("overview")
  const [audioEnabled, setAudioEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  // Sound effects
  const playHoverSound = () => {
    if (!audioEnabled) return
    const audio = new Audio("/sounds/hover.mp3")
    audio.volume = 0.2
    audio.play().catch((e) => console.log("Audio play prevented:", e))
  }

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

    return () => {
      document.removeEventListener("click", handleUserInteraction)
    }
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data")
        }
        const userData = await userResponse.json()

        // Fetch repos to calculate stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!reposResponse.ok) {
          throw new Error("Failed to fetch GitHub repos data")
        }
        const reposData = await reposResponse.json()

        // Calculate total stars
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)

        // Mock data for contributions, languages, etc. (in a real app, you'd fetch this from GitHub API)
        const mockLanguages = [
          { name: "TypeScript", percentage: 40, color: "#3178c6" },
          { name: "Python", percentage: 25, color: "#3572A5" },
          { name: "JavaScript", percentage: 20, color: "#f1e05a" },
          { name: "C++", percentage: 10, color: "#f34b7d" },
          { name: "Other", percentage: 5, color: "#ededed" },
        ]

        setStats({
          followers: userData.followers,
          following: userData.following,
          public_repos: userData.public_repos,
          stars: totalStars,
          username: userData.login,
          contributions: 427, // Mock data
          languages: mockLanguages,
          commits: 532, // Mock data
          pullRequests: 48, // Mock data
          issues: 29, // Mock data
        })
      } catch (err) {
        console.error("Error fetching GitHub stats:", err)
        setError("Could not load GitHub stats. Using demo data instead.")

        // Fallback to demo data
        setStats({
          followers: 31,
          following: 27,
          public_repos: 23,
          stars: 43,
          username,
          contributions: 427,
          languages: [
            { name: "TypeScript", percentage: 40, color: "#3178c6" },
            { name: "Python", percentage: 25, color: "#3572A5" },
            { name: "JavaScript", percentage: 20, color: "#f1e05a" },
            { name: "C++", percentage: 10, color: "#f34b7d" },
            { name: "Other", percentage: 5, color: "#ededed" },
          ],
          commits: 532,
          pullRequests: 48,
          issues: 29,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username])

  // Draw contribution graph
  useEffect(() => {
    if (!canvasRef.current || !stats || activeTab !== "contributions") return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate mock contribution data (in a real app, fetch from GitHub)
    const weeks = 52
    const days = 7
    const contributions = Array(weeks * days)
      .fill(0)
      .map(() => Math.floor(Math.random() * 5))

    // Draw contribution cells
    const cellSize = Math.min(10, canvas.width / weeks - 1)
    const cellGap = 1
    const startX = (canvas.width - weeks * (cellSize + cellGap)) / 2
    const startY = (canvas.height - days * (cellSize + cellGap)) / 2

    contributions.forEach((count, i) => {
      const week = Math.floor(i / days)
      const day = i % days

      const x = startX + week * (cellSize + cellGap)
      const y = startY + day * (cellSize + cellGap)

      // Determine color based on contribution count
      let color
      if (count === 0) color = "#1a1a1a"
      else if (count === 1) color = "#0e4429"
      else if (count === 2) color = "#006d32"
      else if (count === 3) color = "#26a641"
      else color = "#39d353"

      ctx.fillStyle = color
      ctx.fillRect(x, y, cellSize, cellSize)
    })
  }, [stats, activeTab])

  const statItems = [
    { icon: <Users className="h-5 w-5" />, label: "Followers", value: stats?.followers || 0 },
    { icon: <Users className="h-5 w-5" />, label: "Following", value: stats?.following || 0 },
    { icon: <BookOpen className="h-5 w-5" />, label: "Repos", value: stats?.public_repos || 0 },
    { icon: <Star className="h-5 w-5" />, label: "Stars", value: stats?.stars || 0 },
  ]

  const advancedStatItems = [
    { icon: <GitCommit className="h-5 w-5" />, label: "Commits", value: stats?.commits || 0 },
    { icon: <GitPullRequest className="h-5 w-5" />, label: "PRs", value: stats?.pullRequests || 0 },
    { icon: <Code className="h-5 w-5" />, label: "Issues", value: stats?.issues || 0 },
    { icon: <GitBranch className="h-5 w-5" />, label: "Contrib", value: stats?.contributions || 0 },
  ]

  return (
    <AdvancedCard variant="cyber" className="overflow-hidden" ref={ref}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub Stats
        </CardTitle>

        <div className="flex justify-center mt-4 space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound()
              setActiveTab("overview")
            }}
            onMouseEnter={playHoverSound}
            className={`px-3 py-1 rounded-md text-sm ${activeTab === "overview" ? "bg-green-500 text-black" : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
              } transition-colors`}
          >
            Overview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound()
              setActiveTab("contributions")
            }}
            onMouseEnter={playHoverSound}
            className={`px-3 py-1 rounded-md text-sm ${activeTab === "contributions"
              ? "bg-green-500 text-black"
              : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
              } transition-colors`}
          >
            Contributions
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playClickSound()
              setActiveTab("languages")
            }}
            onMouseEnter={playHoverSound}
            className={`px-3 py-1 rounded-md text-sm ${activeTab === "languages" ? "bg-green-500 text-black" : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
              } transition-colors`}
          >
            Languages
          </motion.button>
        </div>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {loading
                ? // Loading skeletons
                Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton className="h-8 w-8 rounded-full mb-2" />
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                  ))
                : // Actual stats
                statItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      className="bg-[#1a1a1a] p-2 rounded-full mb-2"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-xs text-gray-400 mb-1">{item.label}</span>
                    <motion.span
                      className="text-lg font-bold text-green-400"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {item.value}
                    </motion.span>
                  </motion.div>
                ))}
            </div>

            <motion.div
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {!loading &&
                advancedStatItems.map((item, index) => (
                  <motion.div key={index} className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                    <motion.div
                      className="bg-[#1a1a1a] p-2 rounded-full mb-2"
                      whileHover={{
                        boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-xs text-gray-400 mb-1">{item.label}</span>
                    <motion.span
                      className="text-lg font-bold text-green-400"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {item.value}
                    </motion.span>
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}

        {activeTab === "contributions" && (
          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-green-400">Contribution Activity</h3>
              <p className="text-xs text-gray-400">Last 12 months</p>
            </div>

            <div className="relative h-40 w-full">
              <canvas ref={canvasRef} className="w-full h-full"></canvas>

              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-20"></div>
              </motion.div>

              <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-gray-500">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]"></div>
                <span className="text-xs text-gray-400">None</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>
                <span className="text-xs text-gray-400">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>
                <span className="text-xs text-gray-400">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>
                <span className="text-xs text-gray-400">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>
                <span className="text-xs text-gray-400">Peak</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "languages" && (
          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-green-400">Language Distribution</h3>
              <p className="text-xs text-gray-400">Based on repository code</p>
            </div>

            <div className="space-y-4">
              {stats?.languages?.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{lang.name}</span>
                    <span className="text-sm text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-xs text-gray-400">
                Based on {stats?.public_repos} repositories and {stats?.commits} commits
              </p>
            </motion.div>
          </motion.div>
        )}

        <div className="mt-4 pt-4 border-t-2 border-green-500/30 text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
          >
            @{stats?.username || username}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </CardContent>
    </AdvancedCard>
  )
}
