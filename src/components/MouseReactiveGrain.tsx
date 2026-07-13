"use client"

import { useEffect, useRef } from "react"

export default function MouseReactiveGrain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouse = useRef({ x: 0, y: 0 })
    const frame = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth / 2
            canvas.height = window.innerHeight / 2
        }
        resize()
        window.addEventListener("resize", resize)

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX / window.innerWidth
            mouse.current.y = e.clientY / window.innerHeight
        }
        window.addEventListener("mousemove", handleMouseMove)

        const renderGrain = () => {
            const { width, height } = canvas
            const imageData = ctx.createImageData(width, height)
            const data = imageData.data

            const offsetX = mouse.current.x * 100
            const offsetY = mouse.current.y * 100

            for (let i = 0; i < data.length; i += 4) {
                const x = (i / 4) % width
                const y = Math.floor(i / 4 / width)

                const noise = Math.random() * 255
                const shift = Math.sin((x + offsetX) * 0.01) * Math.cos((y + offsetY) * 0.01) * 20

                data[i] = noise + shift
                data[i + 1] = noise + shift
                data[i + 2] = noise + shift
                data[i + 3] = 12
            }

            ctx.putImageData(imageData, 0, 0)
            frame.current = requestAnimationFrame(renderGrain)
        }

        frame.current = requestAnimationFrame(renderGrain)

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(frame.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay opacity-[0.03]"
            style={{ imageRendering: "pixelated" }}
        />
    )
}
