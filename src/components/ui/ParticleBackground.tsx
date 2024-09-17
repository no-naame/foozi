import {useEffect, useRef} from "react";

export const ParticleBackground = ({ debug = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const particlesRef = useRef<Array<{ x: number; y: number; size: number; speedX: number; speedY: number }>>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Initialize particles
        for (let i = 0; i < 38; i++) {
            particlesRef.current.push({
                x: Math.random() * canvas.width*20,
                y: Math.random() * canvas.height*20,
                size: Math.random() * 20 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            })
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "rgba(249, 115, 22, 0.7)";
            ctx.shadowBlur = 15;
            // ctx.shadowColor = "rgba(249, 115, 22, 1)";

            particlesRef.current.forEach(particle => {
                const dx = particle.x - mouseRef.current.x
                const dy = particle.y - mouseRef.current.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 80) {
                    const angle = Math.atan2(dy, dx)
                    const force = 2 * (1 - distance / 100)
                    particle.x += Math.cos(angle) * force
                    particle.y += Math.sin(angle) * force
                }

                ctx.fillStyle = 'rgba(249, 115, 22, 0.5)'
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fill()

                particle.x += particle.speedX
                particle.y += particle.speedY

                // Wrap particles around the screen
                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleMouseMove = (event: MouseEvent) => {
            mouseRef.current = { x: event.clientX, y: event.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [debug])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    )
}

