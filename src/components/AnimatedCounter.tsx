"use client"

import { useEffect, useRef, useState } from "react"
import { animate, eases } from "animejs"

interface AnimatedCounterProps {
    value: string
    label: string
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [displayValue, setDisplayValue] = useState("0")
    const hasAnimated = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const numValue = parseInt(value, 10)
        if (isNaN(numValue)) {
            setDisplayValue(value)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    const obj = { val: 0 }
                    animate(obj, {
                        val: numValue,
                        duration: 1500,
                        ease: eases.outExpo,
                        onUpdate: () => {
                            setDisplayValue(String(Math.round(obj.val)))
                        },
                    })
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [value])

    return (
        <div ref={ref} className="flex items-center gap-4 px-8">
            <span className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter">
                {displayValue}
            </span>
            <span className="text-sm md:text-lg uppercase tracking-widest opacity-70">
                {label}
            </span>
        </div>
    )
}
