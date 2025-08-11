"use client"

import AdvancedCard from "@/components/advanced-card"
import TerminalContactForm from "@/components/terminal-contact-form"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Github, Instagram, Mail, MessageCircle } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">
          Get in <span className="text-green-400">Touch</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AdvancedCard variant="glow" className="h-full">
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Feel free to reach out if you want to collaborate on projects, discuss tech, or just chat about music!
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">samitesfaye726@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">@haxurn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <Github className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">github.com/haxurn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-full">
                    <Instagram className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">instagram.com/haxurn</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-green-500/30">
                <p className="text-sm text-gray-400">
                  <span className="text-green-400">Note:</span> The contact form sends emails directly to me. I
                  typically respond within 24-48 hours.
                </p>
              </div>
            </CardContent>
          </AdvancedCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AdvancedCard variant="glow">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <p className="text-gray-300">Use this terminal-style form to send me an email directly.</p>
            </CardHeader>
            <CardContent>
              <TerminalContactForm />
            </CardContent>
          </AdvancedCard>
        </motion.div>
      </div>
    </section>
  )
}
