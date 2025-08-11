"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FormState {
  name: string
  email: string
  message: string
  [key: string]: string
}

export default function TerminalContactForm() {
  const [currentField, setCurrentField] = useState<string | null>(null)
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Start the form interaction after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      addToHistory("Starting contact form...")
      setTimeout(() => {
        addToHistory("Please enter your information when prompted.")
        setTimeout(() => {
          setCurrentField("name")
        }, 500)
      }, 800)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const addToHistory = (text: string) => {
    setCommandHistory((prev) => [...prev, text])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [currentField as string]: e.target.value,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentField) {
      e.preventDefault()
      const value = formState[currentField]

      // Simple validation
      if (!value.trim()) {
        addToHistory(`Error: ${currentField} cannot be empty. Please try again.`)
        return
      }

      if (currentField === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        addToHistory("Error: Please enter a valid email address.")
        return
      }

      // Add the input to history
      addToHistory(`${currentField}: ${value}`)

      // Move to next field
      if (currentField === "name") {
        setCurrentField("email")
      } else if (currentField === "email") {
        setCurrentField("message")
      } else if (currentField === "message") {
        setCurrentField(null)
        submitForm()
      }
    }
  }

  const submitForm = async () => {
    setIsSubmitting(true)
    addToHistory("Sending message...")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (data.success) {
        addToHistory("✓ Message sent successfully!")
        addToHistory("Thank you for your message! I'll get back to you soon.")
        setSubmitted(true)
        setShowPrompt(false)
        setError(null)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      addToHistory(`✗ Error: ${errorMessage}`)
      addToHistory("Please try again later or contact me directly at samitesfaye726@gmail.com")
      setError(errorMessage)
      setCurrentField("name") // Reset to start
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      message: "",
    })
    setCommandHistory([])
    setCurrentField(null)
    setSubmitted(false)
    setError(null)

    // Restart the form
    setTimeout(() => {
      addToHistory("Starting contact form...")
      setTimeout(() => {
        addToHistory("Please enter your information when prompted.")
        setTimeout(() => {
          setCurrentField("name")
        }, 500)
      }, 800)
    }, 500)
  }

  const handleSubmitClick = () => {
    if (!currentField) return

    const fakeEvent = { key: "Enter", preventDefault: () => {} } as React.KeyboardEvent
    handleKeyDown(fakeEvent)
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#0f172a] rounded-lg overflow-hidden font-mono">
      <div className="bg-[#0f172a] py-2 px-4 flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-center flex-1 text-gray-400">contact@haxurn:~</div>
      </div>

      <div className="p-4 h-80 overflow-y-auto flex flex-col">
        {/* Command history */}
        <div className="flex-grow">
          {commandHistory.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-1 ${cmd.includes("Error:") ? "text-red-400" : cmd.includes("✓") ? "text-green-400" : "text-gray-300"}`}
            >
              {cmd}
            </motion.div>
          ))}
        </div>

        {/* Current input */}
        {currentField && showPrompt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
            <span className="text-green-400 mr-2">{`${currentField}>`}</span>
            <input
              type={currentField === "email" ? "email" : "text"}
              value={formState[currentField]}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-transparent border-none outline-none flex-grow text-white"
              placeholder={`Enter your ${currentField}...`}
              disabled={isSubmitting}
            />
            <div className="w-2 h-5 bg-green-400 animate-pulse"></div>
          </motion.div>
        )}

        {/* Loading indicator */}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-green-400"
          >
            <div className="animate-spin h-4 w-4 border-2 border-green-400 rounded-full border-t-transparent"></div>
            <span>Processing...</span>
          </motion.div>
        )}

        {/* Submit button for mobile users */}
        {currentField && showPrompt && !isSubmitting && (
          <div className="mt-2 md:hidden">
            <Button
              onClick={handleSubmitClick}
              className="w-full bg-green-500 hover:bg-green-600"
              disabled={isSubmitting}
            >
              Submit {currentField}
            </Button>
          </div>
        )}

        {/* Reset button after submission or error */}
        {(submitted || error) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400/10"
              disabled={isSubmitting}
            >
              {submitted ? "Start New Message" : "Try Again"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
