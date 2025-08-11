"use client"

import { useEffect, useRef } from 'react'

export default function CyberGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()

        // Grid properties
        const gridSize = 40
        const gridLines: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number; pulsePhase: number }> = []

        // Initialize grid lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            gridLines.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: canvas.height,
                opacity: Math.random() * 0.3 + 0.1,
                pulsePhase: Math.random() * Math.PI * 2
            })
        }

        for (let y = 0; y <= canvas.height; y += gridSize) {
            gridLines.push({
                x1: 0,
                y1: y,
                x2: canvas.width,
                y2: y,
                opacity: Math.random() * 0.3 + 0.1,
                pulsePhase: Math.random() * Math.PI * 2
            })
        }

        let time = 0

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.02

            // Draw animated grid
            gridLines.forEach((line, index) => {
                const pulseOpacity = line.opacity + Math.sin(time + line.pulsePhase) * 0.1
                const lineOpacity = Math.max(0, Math.min(1, pulseOpacity))

                // Random line activation
                if (Math.random() < 0.001) {
                    line.opacity = Math.random() * 0.5 + 0.2
                }

                // Fade lines over time
                line.opacity *= 0.999

                ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity})`
                ctx.lineWidth = 0.5
                ctx.beginPath()
                ctx.moveTo(line.x1, line.y1)
                ctx.lineTo(line.x2, line.y2)
                ctx.stroke()

                // Add glow effect to some lines
                if (lineOpacity > 0.3) {
                    ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity * 0.3})`
                    ctx.lineWidth = 2
                    ctx.beginPath()
                    ctx.moveTo(line.x1, line.y1)
                    ctx.lineTo(line.x2, line.y2)
                    ctx.stroke()
                }
            })

            // Add scanning effect
            const scanY = (time * 50) % (canvas.height + 100) - 50
            const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0)')
            gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)')
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')

            ctx.fillStyle = gradient
            ctx.fillRect(0, scanY - 50, canvas.width, 100)

            animationId = requestAnimationFrame(animate)
        }

        // Delay start to prevent scroll issues
        const startTimer = setTimeout(() => {
            animate()
        }, 3000)

        window.addEventListener('resize', resizeCanvas, { passive: true })

        return () => {
            clearTimeout(startTimer)
            window.removeEventListener('resize', resizeCanvas)
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: 'transparent',
                opacity: 0.4
            }}
        />
    )
}