import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  connections: number[]
}

export default function AnimateBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  // Colors for the tech theme
  const colors = ["#57dd2f", "#57dd2f", "#57dd2f", "#57dd2f"]

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = []
    const particleCount = Math.floor((width * height) / 15000) // Adjust density based on screen size

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      })
    }

    particlesRef.current = particles
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth
        const height = window.innerHeight
        canvasRef.current.width = width
        canvasRef.current.height = height
        setDimensions({ width, height })
        initParticles(width, height)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      const particles = particlesRef.current

      // Reset connections
      particles.forEach((p) => {
        p.connections = []
      })

      // Find connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            particles[i].connections.push(j)
            particles[j].connections.push(i)
          }
        }
      }

      // Draw connections first (so they appear behind particles)
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.connections.forEach((j) => {
          if (i < j) {
            // Avoid drawing the same connection twice
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 116, 139, ${1 - distance / 150})`
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Mouse interaction
        const dx = mousePosition.x - p.x
        const dy = mousePosition.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = 0.2 * (1 - distance / 200)
          p.speedX -= (dx * force) / distance
          p.speedY -= (dy * force) / distance
        }

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Dampen speed
        p.speedX *= 0.99
        p.speedY *= 0.99

        // Boundary check
        if (p.x < 0) {
          p.x = 0
          p.speedX *= -1
        } else if (p.x > dimensions.width) {
          p.x = dimensions.width
          p.speedX *= -1
        }

        if (p.y < 0) {
          p.y = 0
          p.speedY *= -1
        } else if (p.y > dimensions.height) {
          p.y = dimensions.height
          p.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, mousePosition])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed left-0 w-full -z-10 bg-white"
      style={{ height: "calc(100dvh - 70px)",top: "70px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

