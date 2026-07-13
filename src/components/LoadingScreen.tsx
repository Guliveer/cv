"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { animate, stagger, splitText } from "animejs"

interface LoadingScreenProps {
    onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const firstNameRef = useRef<HTMLSpanElement>(null)
    const lastNameRef = useRef<HTMLSpanElement>(null)
    const [count, setCount] = useState(0)
    const phaseRef = useRef<"idle" | "counting" | "revealing" | "exiting">("idle")
    const animatedRef = useRef({ counter: false, reveal: false, exit: false })

    useEffect(() => {
        if (animatedRef.current.counter) return
        animatedRef.current.counter = true
        phaseRef.current = "counting"

        const obj = { val: 0 }
        animate(obj, {
            val: 100,
            duration: 1600,
            ease: "inOut(2)",
            onUpdate: () => setCount(Math.round(obj.val)),
            onComplete: () => {
                if (animatedRef.current.reveal) return
                animatedRef.current.reveal = true
                phaseRef.current = "revealing"

                const elements = [firstNameRef.current, lastNameRef.current].filter(Boolean)
                if (elements.length === 0) {
                    triggerExit()
                    return
                }

                let completed = 0
                elements.forEach((el, idx) => {
                    if (!el) return
                    const { chars } = splitText(el, { words: false, chars: true })
                    if (!chars || chars.length === 0) {
                        completed++
                        if (completed === elements.length) triggerExit()
                        return
                    }
                    animate(chars, {
                        opacity: [0, 1],
                        y: [30, 0],
                        delay: stagger(30, { start: idx * 200 }),
                        duration: 600,
                        ease: "outExpo",
                        onComplete: () => {
                            completed++
                            if (completed === elements.length) {
                                setTimeout(triggerExit, 500)
                            }
                        },
                    })
                })
            },
        })
    }, [])

    const triggerExit = useCallback(() => {
        if (animatedRef.current.exit) return
        animatedRef.current.exit = true
        phaseRef.current = "exiting"

        const el = containerRef.current
        if (!el) {
            onComplete()
            return
        }

        const sliceCount = 10
        const sliceHeight = window.innerHeight / sliceCount
        const wrapper = document.createElement("div")
        wrapper.style.cssText = "position:fixed;inset:0;z-index:9998;pointer-events:none;"
        document.body.appendChild(wrapper)

        for (let i = 0; i < sliceCount; i++) {
            const slice = document.createElement("div")
            slice.style.cssText = `
                position:fixed; left:0; right:0;
                top:${i * sliceHeight}px; height:${sliceHeight + 1}px;
                background:#09090B; z-index:9998;
                transform:translateX(0);
            `
            wrapper.appendChild(slice)
        }

        el.style.opacity = "0"

        const slices = wrapper.children
        let completed = 0
        for (let i = 0; i < slices.length; i++) {
            const slice = slices[i] as HTMLElement
            const direction = i % 2 === 0 ? -1 : 1
            setTimeout(() => {
                slice.style.transition = "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
                slice.style.transform = `translateX(${direction * 100}%)`
                completed++
                if (completed === slices.length) {
                    setTimeout(() => {
                        wrapper.remove()
                        onComplete()
                    }, 300)
                }
            }, i * 50)
        }
    }, [onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-8"
        >
            {/* Counter */}
            <div className="text-[clamp(6rem,20vw,16rem)] font-heading font-bold text-muted leading-none tabular-nums select-none">
                {String(count).padStart(3, "0")}
            </div>

            {/* Name - two separate lines with clear gap */}
            <div className="flex flex-col items-center gap-2">
                <span
                    ref={firstNameRef}
                    className="block text-[clamp(2rem,6vw,5rem)] font-heading font-bold text-foreground uppercase tracking-tighter leading-none"
                >
                    OLIWER
                </span>
                <span className="block w-12 h-1 bg-accent" />
                <span
                    ref={lastNameRef}
                    className="block text-[clamp(2rem,6vw,5rem)] font-heading font-bold text-accent uppercase tracking-tighter leading-none"
                >
                    PAWELSKI
                </span>
            </div>
        </div>
    )
}
