"use client";

import AdvancedCard from "@/components/advanced-card";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function JourneySection() {
  const journeyItems = [
    {
      title: "Started Coding",
      date: "2 years ago",
      description:
        "Began my journey into the world of programming and cybersecurity.",
    },
    {
      title: "First CTF Competition",
      date: "Joined INSA",
      description:
        "Got employed as a penetration tester at the Information Network Security Administration (INSA).",
    },
    {
      title: "Music Production",
      date: "2 months ago",
      description: "Started exploring music production as a creative outlet.",
    },
  ];

  return (
    <section id="journey" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <AdvancedCard variant="glow">
          <CardHeader>
            <CardTitle className="text-2xl">My Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-green-500/30 pl-6 ml-3 space-y-10">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full bg-green-400"></div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <time className="text-sm text-gray-400 mb-2 block">
                    {item.date}
                  </time>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </AdvancedCard>
      </motion.div>
    </section>
  );
}
