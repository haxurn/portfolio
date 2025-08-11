"use client"

import { useEffect, useRef } from 'react'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    life: number
    maxLife: number
    color: { r: number; g: number; b: number }
}

export default function AdvancedParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: 0, y: 0 })
    const isInitializedRef = useRef(false)

    useEffect(() => {
        const initTimer = setTimeout(() => {
            if (isInitializedRef.current) return
            isInitializedRef.current = true

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

            const colors = [
                { r: 16, g: 185, b: 129 },   // Green
                { r: 6, g: 214, b: 160 },    // Light Green
                { r: 34, g: 211, b: 153 },   // Cyan
                { r: 52, g: 211, b: 153 },   // Emerald
                { r: 16, g: 215, b: 140 },   // Light Emerald
            ]

            const createParticle = (x?: number, y?: number): Particle => {
                const color = colors[Math.floor(Math.random() * colors.length)]
                return {
                    x: x ?? Math.random() * canvas.width,
                    y: y ?? Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.4 + 0.2,
                    life: 0,
                    maxLife: Math.random() * 300 + 200,
                    color
                }
            }

            for (let i = 0; i < 80; i++) {
                particlesRef.current.push(createParticle())
            }

            const handleMouseMove = (e: MouseEvent) => {
                mouseRef.current.x = e.clientX
                mouseRef.current.y = e.clientY
            }

            window.addEventListener('mousemove', handleMouseMove, { passive: true })

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                particlesRef.current.forEach((particle, index) => {
                    particle.x += particle.vx
                    particle.y += particle.vy
                    particle.life++

                    const dx = mouseRef.current.x - particle.x
                    const dy = mouseRef.current.y - particle.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        const force = (150 - distance) / 150 * 0.01
                        particle.vx += (dx / distance) * force
                        particle.vy += (dy / distance) * force
                    }

                    if (particle.x < 0 || particle.x > canvas.width) {
                        particle.vx *= -0.8
                        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                    }
                    if (particle.y < 0 || particle.y > canvas.height) {
                        particle.vy *= -0.8
                        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
                    }

                    const lifeRatio = particle.life / particle.maxLife
                    const currentOpacity = particle.opacity * (1 - lifeRatio)

                    if (currentOpacity > 0.01) {
                        const gradient = ctx.createRadialGradient(
                            particle.x, particle.y, 0,
                            particle.x, particle.y, particle.size * 3
                        )
                        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${currentOpacity})`)
                        gradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${currentOpacity * 0.3})`)
                        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`)

                        ctx.fillStyle = gradient
                        ctx.beginPath()
                        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
                        ctx.fill()

                        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${currentOpacity * 0.8})`
                        ctx.beginPath()
                        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                        ctx.fill()
                    }

                    if (particle.life >= particle.maxLife) {
                        particlesRef.current[index] = createParticle()
                    }
                })

                particlesRef.current.forEach((particle, i) => {
                    particlesRef.current.slice(i + 1).forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x
                        const dy = particle.y - otherParticle.y
                        const distance = Math.sqrt(dx * dx + dy * dy)

                        if (distance < 120) {
                            const opacity = (1 - distance / 120) * 0.15
                            const gradient = ctx.createLinearGradient(
                                particle.x, particle.y,
                                otherParticle.x, otherParticle.y
                            )
                            gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${opacity})`)
                            gradient.addColorStop(1, `rgba(${otherParticle.color.r}, ${otherParticle.color.g}, ${otherParticle.color.b}, ${opacity})`)

                            ctx.strokeStyle = gradient
                            ctx.lineWidth = 0.5
                            ctx.beginPath()
                            ctx.moveTo(particle.x, particle.y)
                            ctx.lineTo(otherParticle.x, otherParticle.y)
                            ctx.stroke()
                        }
                    })
                })

                animationId = requestAnimationFrame(animate)
            }

            animate()

            window.addEventListener('resize', resizeCanvas, { passive: true })

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('resize', resizeCanvas)
                if (animationId) {
                    cancelAnimationFrame(animationId)
                }
            }
    }, 2000)

        return () => {
            clearTimeout(initTimer)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: 'transparent',
                opacity: 0.6
            }}
        />
    )
}