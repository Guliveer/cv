"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface LineRevealProps {
    children: ReactNode
    delay?: number
    className?: string
}

export default function LineReveal({ children, delay = 0, className }: LineRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: reduced ? 0 : 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    )
}
