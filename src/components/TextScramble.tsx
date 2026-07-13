"use client"

import { useEffect, useRef, useCallback } from "react"
import { animate, splitText, stagger } from "animejs"

interface TextScrambleProps {
    text: string
    className?: string
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

export default function TextScramble({ text, className }: TextScrambleProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const hasAnimated = useRef(false)

    const scramble = useCallback(() => {
        if (!ref.current || hasAnimated.current) return
        hasAnimated.current = true

        const el = ref.current
        const original = text.toUpperCase()

        el.textContent = original

        const { chars } = splitText(el, { words: false, chars: true })

        if (!chars || chars.length === 0) return

        animate(chars, {
            opacity: [0, 1],
            y: [8, 0],
            delay: stagger(30),
            duration: 400,
            ease: "outExpo",
        })

        let frame = 0
        const totalFrames = 12
        const interval = setInterval(() => {
            if (frame >= totalFrames) {
                clearInterval(interval)
                el.textContent = original
                return
            }

            const scrambled = original
                .split("")
                .map((char, i) => {
                    if (char === " ") return " "
                    if (frame < i * 0.8) return CHARS[Math.floor(Math.random() * CHARS.length)]
                    return char
                })
                .join("")

            el.textContent = scrambled
            frame++
        }, 40)

        return () => clearInterval(interval)
    }, [text])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    scramble()
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [scramble])

    return (
        <span ref={ref} className={className}>
            {text.toUpperCase()}
        </span>
    )
}
