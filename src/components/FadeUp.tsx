"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

interface FadeUpProps {
    children: ReactNode
    delay?: number
    className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
    const reduced = useReducedMotion()

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: reduced ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration: reduced ? 0 : 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    )
}
