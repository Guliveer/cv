"use client"

import { motion, useReducedMotion } from "framer-motion"

interface SectionHeaderProps {
    title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
    const reduced = useReducedMotion()

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight relative inline-block">
                {title}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20" />
                <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: reduced ? "2.5rem" : "2.5rem" }}
                    animate={{ width: "2.5rem" }}
                    whileHover={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
            </h2>
        </div>
    )
}
