"use client"

import Marquee from "react-fast-marquee"
import { getProfile } from "@/lib/data"

export function SkillsMarquee() {
    const profile = getProfile()
    const skills = [...new Set(profile.skills)].sort((a, b) => a.localeCompare(b))

    return (
        <div className="border-y-2 border-border py-4">
            <Marquee speed={40}>
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        className="text-lg md:text-2xl uppercase tracking-wider px-6 text-muted-foreground hover:text-accent transition-colors duration-200 cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </Marquee>
        </div>
    )
}
