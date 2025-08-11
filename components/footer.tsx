"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Twitter, MessageCircle, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex space-x-6 mb-2">
            <Link
              href="https://github.com/haxurn"
              target="_blank"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/haxurn"
              target="_blank"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://t.me/haxurn"
              target="_blank"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Telegram</span>
            </Link>
            <Link
              href="https://instagram.com/haxurn"
              target="_blank"
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>

          <p className="text-xs text-gray-400">© {currentYear} Haxurn. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
