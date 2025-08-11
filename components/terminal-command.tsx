"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalCommandProps {
  command: string
  output: string[]
  delay?: number
  typingSpeed?: number
  onComplete?: () => void
}

export default function TerminalCommand({
  command,
  output,
  delay = 0,
  typingSpeed = 30,
  onComplete,
}: TerminalCommandProps) {
  const [showCommand, setShowCommand] = useState(false)
  const [currentOutputLine, setCurrentOutputLine] = useState(-1)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([])

  // Start showing the command after the initial delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCommand(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  // Start showing output after command is fully displayed
  useEffect(() => {
    if (showCommand) {
      const timer = setTimeout(
        () => {
          setCurrentOutputLine(0)
        },
        command.length * typingSpeed + 500,
      ) // Wait for command to finish typing + a pause

      return () => clearTimeout(timer)
    }
  }, [showCommand, command.length, typingSpeed])

  // Handle typing animation for output
  useEffect(() => {
    if (currentOutputLine >= 0 && currentOutputLine < output.length) {
      if (currentCharIndex < output[currentOutputLine].length) {
        // Still typing current line
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1)
          setDisplayedOutput((prev) => {
            const newOutput = [...prev]
            if (newOutput.length <= currentOutputLine) {
              newOutput.push("")
            }
            newOutput[currentOutputLine] = output[currentOutputLine].substring(0, currentCharIndex + 1)
            return newOutput
          })
        }, typingSpeed / 2)

        return () => clearTimeout(timer)
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setCurrentOutputLine(currentOutputLine + 1)
          setCurrentCharIndex(0)
        }, 100)

        return () => clearTimeout(timer)
      }
    } else if (currentOutputLine === output.length && onComplete) {
      // All output displayed
      onComplete()
    }
  }, [currentOutputLine, currentCharIndex, output, typingSpeed, onComplete])

  return (
    <div className="font-mono text-sm">
      {showCommand && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
          <span className="text-green-400 mr-2">$</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-white"
          >
            {command}
          </motion.span>
        </motion.div>
      )}

      {displayedOutput.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-gray-300"
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}
