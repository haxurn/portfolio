"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SmoothRevealProps {
    children: React.ReactNode
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
    delay?: number
    duration?: number
    distance?: number
    className?: string
    once?: boolean
}

export default function SmoothReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    distance = 60,
    className = '',
    once = true
}: SmoothRevealProps) {
    const ref = useRef(null)
    // Use a large margin to ensure animations don't trigger scrolling
    const isInView = useInView(ref, {
        once,
        margin: "-10% 0px -10% 0px"
    })

    const getVariants = () => {
        const variants = {
            hidden: {},
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.4, 0.25, 1]
                }
            }
        }

        switch (direction) {
            case 'up':
                variants.hidden = { opacity: 0, y: distance }
                break
            case 'down':
                variants.hidden = { opacity: 0, y: -distance }
                break
            case 'left':
                variants.hidden = { opacity: 0, x: distance }
                break
            case 'right':
                variants.hidden = { opacity: 0, x: -distance }
                break
            case 'scale':
                variants.hidden = { opacity: 0, scale: 0.8 }
                break
            case 'fade':
                variants.hidden = { opacity: 0 }
                break
            default:
                variants.hidden = { opacity: 0, y: distance }
        }

        return variants
    }

    const variants = getVariants()

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}