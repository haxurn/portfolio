"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalTextProps {
  text: string
  prefix?: string
  typingSpeed?: number
  className?: string
  onComplete?: () => void
}

export default function TerminalText({
  text,
  prefix = "",
  typingSpeed = 50,
  className = "",
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, typingSpeed, isComplete, onComplete])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-mono ${className}`}>
      {prefix && <span className="text-green-400">{prefix}</span>}
      <span className={isComplete ? "" : "terminal-text"}>{displayedText}</span>
    </motion.div>
  )
}
