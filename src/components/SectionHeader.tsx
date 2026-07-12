"use client"

import { motion, useReducedMotion } from "framer-motion"

interface SectionHeaderProps {
    title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
    const reduced = useReducedMotion()

    return (
        <div className="mb-12 pt-32">
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-heading font-bold uppercase tracking-tighter leading-[0.8] relative inline-block">
                {title}
                <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: reduced ? "100%" : "100%" }}
                    viewport={{ once: true }}
                    transition={{
                        duration: reduced ? 0 : 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </h2>
        </div>
    )
}
