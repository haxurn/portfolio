"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AdvancedCardProps {
    children: ReactNode
    className?: string
    variant?: 'default' | 'cyber' | 'glow'
    hover?: boolean
}

export default function AdvancedCard({
    children,
    className = '',
    variant = 'default',
    hover = true
}: AdvancedCardProps) {
    const getVariantClasses = () => {
        switch (variant) {
            case 'cyber':
                return `
          bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 
          border-2 border-green-500/40 
          hover:border-green-400/60 
          shadow-2xl shadow-green-500/20 
          hover:shadow-green-500/30
          backdrop-blur-xl
        `
            case 'glow':
                return `
          bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] 
          border-2 border-green-500/30 
          hover:border-green-400/50 
          shadow-2xl shadow-green-500/20 
          hover:shadow-green-500/30
          backdrop-blur-sm
        `
            default:
                return `
          bg-gradient-to-br from-gray-900/50 to-black/50 
          border-2 border-green-500/20 
          hover:border-green-400/40 
          shadow-xl shadow-black/50
          backdrop-blur-sm
        `
        }
    }

    const hoverProps = hover ? {
        whileHover: { scale: 1.02, y: -5 },
        transition: { duration: 0.3, ease: "easeOut" }
    } : {}

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...hoverProps}
            className={`
        relative rounded-lg overflow-hidden
        transition-all duration-300 ease-out
        ${getVariantClasses()}
        ${className}
      `}
        >
            {/* Corner indicators */}
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-green-400/30" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-green-400/30" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-green-400/30" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-green-400/30" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}