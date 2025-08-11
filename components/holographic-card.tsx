"use client"

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface HolographicCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
}

export default function HolographicCard({
    children,
    className = '',
    glowColor = '16, 185, 129'
}: HolographicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      translateZ(0)
    `
    }

    const handleMouseLeave = () => {
        if (!cardRef.current) return
        cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(0deg) 
      rotateY(0deg)
      translateZ(0)
    `
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
        relative group cursor-pointer
        transition-all duration-300 ease-out
        ${className}
      `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
            }}
        >
            {/* Holographic border effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 blur-sm group-hover:blur-none transition-all duration-300" />

            {/* Main card */}
            <div className={`
        relative bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 
        backdrop-blur-xl border border-green-500/30 rounded-lg
        shadow-2xl group-hover:shadow-green-500/20
        transition-all duration-300
      `}>
                {/* Holographic scan line */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <motion.div
                        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
                        animate={{
                            y: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>

                {/* Corner indicators */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-green-400/50 rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-green-400/50 rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-green-400/50 rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-green-400/50 rounded-br-sm" />
            </div>

            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at center, rgba(${glowColor}, 0.1) 0%, transparent 70%)`,
                    filter: 'blur(20px)'
                }}
            />
        </motion.div>
    )
}