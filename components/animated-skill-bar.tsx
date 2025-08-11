"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface AnimatedSkillBarProps {
  value: number
  isInView: boolean
  delay?: number
}

export default function AnimatedSkillBar({ value, isInView, delay = 0 }: AnimatedSkillBarProps) {
  const [hovered, setHovered] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let animationId: number
    let position = -100

    const animateGlow = () => {
      if (position > 100) {
        position = -100
      } else {
        position += 1
      }

      setGlowPosition(position)
      animationId = requestAnimationFrame(animateGlow)
    }

    const startAnimation = setTimeout(
      () => {
        animationId = requestAnimationFrame(animateGlow)
      },
      delay * 1000 + 1000,
  )

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(startAnimation)
    }
  }, [isInView, delay])

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="h-2.5 w-full bg-[#0f172a] rounded-full overflow-hidden">
        <motion.div
          ref={barRef}
          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
          }}
        >
          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(16, 185, 129, 0) ${glowPosition - 10}%, 
                rgba(16, 185, 129, 0.5) ${glowPosition}%, 
                rgba(16, 185, 129, 0) ${glowPosition + 10}%, 
                transparent 100%)`,
            }}
          />
        </motion.div>
      </div>

      {isInView && (
        <motion.div
          className="absolute top-1/2 -mt-1 h-2 w-2 rounded-full bg-green-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          style={{ left: `${value}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.2, 0.8],
            boxShadow: ["0 0 4px rgba(16,185,129,0.5)", "0 0 8px rgba(16,185,129,0.8)", "0 0 4px rgba(16,185,129,0.5)"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay + 1.5, // Start after the bar has filled
          }}
        />
      )}

      {hovered && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0f172a] px-2 py-1 rounded text-xs font-mono text-green-400 border-2 border-green-400/40 hover:border-green-400/60 transition-colors duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex items-center gap-1">
            <span className="text-green-400 opacity-70">[</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="inline-block"
              >
                {Math.floor((value / 100) * 10) * 10 + i * 3}
              </motion.span>
            ))}
            <span className="text-green-400 opacity-70">]</span>
          </div>
        </motion.div>
      )}

      <div className="absolute -bottom-4 left-0 w-full">
        <div className="flex justify-between">
          {[0, 25, 50, 75, 100].map((mark) => (
            <motion.div
              key={mark}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: mark <= value ? 0.5 : 0.2 } : { opacity: 0 }}
              transition={{ delay: delay + mark / 100 }}
              className={`text-[8px] font-mono ${mark <= value ? "text-green-400" : "text-gray-500"}`}
            >
              {mark === 0 ? "|" : mark}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
