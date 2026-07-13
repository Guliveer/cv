"use client"

import { useRef, useCallback, type ReactNode } from "react"

interface MagneticHoverProps {
    children: ReactNode
    strength?: number
    className?: string
}

export default function MagneticHover({ children, strength = 0.3, className }: MagneticHoverProps) {
    const ref = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        el.style.transition = "transform 0.2s ease-out"
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = "translate(0px, 0px)"
        el.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
    }, [])

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </div>
    )
}
