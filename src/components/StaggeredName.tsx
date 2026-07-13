"use client"

import { useEffect, useRef } from "react"
import { animate, splitText, stagger, spring } from "animejs"

interface StaggeredNameProps {
    firstName: string
    lastName: string
}

export default function StaggeredName({ firstName, lastName }: StaggeredNameProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el || hasAnimated.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    hasAnimated.current = true
                    const spans = el.querySelectorAll("[data-letter]")
                    if (spans.length === 0) return

                    animate(spans, {
                        opacity: [0, 1],
                        y: [-40, 0],
                        rotateX: [-90, 0],
                        delay: stagger(50),
                        duration: 800,
                        ease: spring({ stiffness: 100, damping: 12 }),
                    })
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-12">
            <h1 className="text-[clamp(3rem,12vw,14rem)] font-heading font-bold uppercase leading-[0.8] tracking-tighter">
                <span className="block">
                    {firstName.split("").map((char, i) => (
                        <span
                            key={i}
                            data-letter
                            className="inline-block opacity-0"
                            style={{ perspective: "600px" }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
                <span className="block text-accent">
                    {lastName.split("").map((char, i) => (
                        <span
                            key={i}
                            data-letter
                            className="inline-block opacity-0"
                            style={{ perspective: "600px" }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            </h1>
        </div>
    )
}
