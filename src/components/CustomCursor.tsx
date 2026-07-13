"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type CursorVariant = "default" | "link" | "project" | "heading"

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const [variant, setVariant] = useState<CursorVariant>("default")
    const mouse = useRef({ x: 0, y: 0 })
    const pos = useRef({ x: 0, y: 0 })
    const raf = useRef<number>(0)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouse.current = { x: e.clientX, y: e.clientY }
    }, [])

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target) return

            if (target.closest("h1, h2, h3, h4, h5, h6")) {
                setVariant("heading")
            } else if (target.closest(".project-card")) {
                setVariant("project")
            } else if (target.closest("a, button, [role='button']")) {
                setVariant("link")
            } else {
                setVariant("default")
            }
        }

        const animate = () => {
            const spring = 0.5
            pos.current.x += (mouse.current.x - pos.current.x) * spring
            pos.current.y += (mouse.current.y - pos.current.y) * spring

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
            }

            raf.current = requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseover", handleMouseOver)
        raf.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
            cancelAnimationFrame(raf.current)
        }
    }, [handleMouseMove])

    const getCursorStyle = () => {
        switch (variant) {
            case "link":
                return "w-10 h-10 border-2 border-accent bg-transparent shadow-[0_0_0_2px_#09090B]"
            case "project":
                return "w-auto h-auto px-3 py-1 bg-accent text-accent-foreground shadow-[0_0_0_2px_#09090B]"
            case "heading":
                return "w-8 h-8 border-2 border-accent bg-transparent shadow-[0_0_0_2px_#09090B]"
            default:
                return "w-2 h-2 bg-accent shadow-[0_0_0_1px_#09090B]"
        }
    }

    return (
        <>
            <style>{`
                *, *::before, *::after {
                    cursor: none !important;
                }
            `}</style>
            <div
                ref={dotRef}
                className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,padding,background,border] duration-200 ease-out flex items-center justify-center ${getCursorStyle()}`}
                style={{ willChange: "transform" }}
            >
                {variant === "heading" && (
                    <span className="text-accent text-lg font-bold">+</span>
                )}
                {variant === "project" && (
                    <span className="text-[10px] font-bold uppercase tracking-wider">VIEW</span>
                )}
            </div>
        </>
    )
}
